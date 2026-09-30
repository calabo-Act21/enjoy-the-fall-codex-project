const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = nav.querySelectorAll('a');
const year = document.getElementById('year');

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  menuToggle.setAttribute('aria-label', open ? 'Ouvrir le menu' : 'Fermer le menu');
  nav.classList.toggle('open', !open);
  document.body.classList.toggle('menu-open', !open);
});

navLinks.forEach(link => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
}));

const revealItems = document.querySelectorAll('.reveal');
revealItems.forEach(item => {
  const delay = item.dataset.delay;
  if (delay) item.style.setProperty('--delay', `${delay}ms`);
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

year.textContent = new Date().getFullYear();
