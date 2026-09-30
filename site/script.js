"use strict";

// Dates ISO ; une date au mois près reste au format YYYY-MM.
const shows = [
  { date: "2026-10-03", event: "Le Survolté Festival", city: "", note: "", url: "https://lesurvoltefestival.org/", urlLabel: "Site du festival" },
  { date: "2026-06-25", event: "Little O’Clock", city: "Toulouse", note: "", url: "" },
  { date: "2026-05-07", event: "L’Engrenage", city: "Balma", note: "", url: "" },
  { date: "2026-04-25", event: "L’Acoustic Bar", city: "Montauban", note: "", url: "" },
  { date: "2025-11", event: "AlamZic", city: "Bagnères-de-Bigorre", note: "", url: "" }
];

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
const mobileViewport = window.matchMedia("(max-width: 899px)");

function closeMenu(returnFocus = false) {
  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  if (returnFocus) menuToggle.focus();
}

function syncMenu() {
  if (!mobileViewport.matches && document.activeElement === menuToggle) {
    navigation.querySelector("a").focus();
  }
  if (mobileViewport.matches && navigation.contains(document.activeElement)) {
    menuToggle.hidden = false;
    menuToggle.focus();
  }
  menuToggle.hidden = !mobileViewport.matches;
  closeMenu();
}

header.classList.add("enhanced");
syncMenu();
mobileViewport.addEventListener("change", syncMenu);
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  navigation.classList.toggle("is-open", isOpen);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") closeMenu(true);
});
navigation.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;
  closeMenu();
  if (mobileViewport.matches && link.hash && link.origin === location.origin) {
    const target = document.querySelector(link.hash);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }
});

const dateParts = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit"
}).formatToParts(new Date());
const datePart = (type) => dateParts.find((part) => part.type === type).value;
const today = `${datePart("year")}-${datePart("month")}-${datePart("day")}`;
const upcoming = shows.filter((show) => (show.date.length === 7 ? `${show.date}-31` : show.date) >= today)
  .sort((a, b) => a.date.localeCompare(b.date));
const past = shows.filter((show) => !upcoming.includes(show)).sort((a, b) => b.date.localeCompare(a.date));

function createShow(show) {
  const row = document.createElement("li");
  const date = document.createElement("time");
  date.dateTime = show.date;
  const dateValue = new Date(`${show.date.length === 7 ? `${show.date}-01` : show.date}T12:00:00Z`);
  date.textContent = new Intl.DateTimeFormat("fr-FR", {
    day: show.date.length === 7 ? undefined : "2-digit",
    month: "long", year: "numeric", timeZone: "Europe/Paris"
  }).format(dateValue);
  const details = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = show.event;
  details.append(title);
  if (show.city) {
    const city = document.createElement("p");
    city.textContent = show.city;
    details.append(city);
  }
  row.append(date, details);
  if (show.note) {
    const note = document.createElement("span");
    note.className = "show-note";
    note.textContent = show.note;
    row.append(note);
  }
  if (show.url) {
    const url = new URL(show.url);
    if (url.protocol !== "https:") throw new Error(`Lien de concert non HTTPS : ${show.event}`);
    const link = document.createElement("a");
    link.className = "show-note text-link";
    link.href = url.href;
    link.textContent = show.urlLabel || `Infos / billets — ${show.event}`;
    row.append(link);
  }
  return row;
}

document.querySelector("#upcoming-shows").append(...upcoming.map(createShow));
document.querySelector("#past-shows").append(...past.map(createShow));
document.querySelector("#past-count").textContent = `(${past.length})`;
document.querySelector("#no-shows").hidden = upcoming.length > 0;
document.querySelector(".past-shows").hidden = past.length === 0;
document.querySelector("#live-static").hidden = true;
document.querySelector("#live-dynamic").hidden = false;

const player = document.querySelector("#video-player");
const status = document.querySelector("#video-status");
const externalVideo = document.querySelector("#video-external");
const videoOptions = [...document.querySelectorAll(".video-option")].map((link, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = link.className;
  for (const [key, value] of Object.entries(link.dataset)) button.dataset[key] = value;
  button.append(...link.childNodes);
  button.setAttribute("aria-pressed", String(index === 0));
  button.setAttribute("aria-controls", "video-player");
  link.replaceWith(button);
  return button;
});
let selectedVideo = videoOptions[0].dataset;

function loadPlayer() {
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/${selectedVideo.videoId}?rel=0&playsinline=1`;
  iframe.title = `Enjoy The Fall — ${selectedVideo.title}`;
  iframe.allow = "encrypted-media; picture-in-picture; fullscreen";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.addEventListener("error", () => {
    status.textContent = "Le lecteur n’a pas pu être chargé. Utilisez le lien YouTube sous les vidéos.";
  });
  player.replaceChildren(iframe);
  iframe.focus();
  status.textContent = `Lecteur ${selectedVideo.title} chargé. Lancez la lecture dans le lecteur, ou utilisez le lien YouTube ci-dessous.`;
}

function showFacade() {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "video-facade";
  button.setAttribute("aria-describedby", "video-help");
  const image = document.createElement("img");
  image.src = selectedVideo.image;
  image.alt = "";
  image.width = 480;
  image.height = 360;
  image.loading = "lazy";
  const play = document.createElement("span");
  play.className = "play-icon";
  play.textContent = "▶";
  play.setAttribute("aria-hidden", "true");
  const caption = document.createElement("span");
  caption.className = "facade-caption";
  caption.textContent = `${selectedVideo.title} `;
  const action = document.createElement("span");
  action.textContent = "Charger le lecteur YouTube";
  caption.append(action);
  button.append(image, play, caption);
  button.addEventListener("click", loadPlayer);
  player.replaceChildren(button);
}

videoOptions.forEach((button) => {
  button.addEventListener("click", () => {
    selectedVideo = button.dataset;
    videoOptions.forEach((option) => option.setAttribute("aria-pressed", String(option === button)));
    externalVideo.href = `https://youtu.be/${selectedVideo.videoId}`;
    externalVideo.textContent = `Voir ${selectedVideo.title} sur YouTube ↗`;
    showFacade();
    status.textContent = `${selectedVideo.title} sélectionnée. Activez « Charger le lecteur YouTube » pour la regarder.`;
  });
});
showFacade();
