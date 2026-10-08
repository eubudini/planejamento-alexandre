const menuToggle = document.getElementById('menu-toggle');
const navigation = document.getElementById('nav');
const navLinks = [...navigation.querySelectorAll('a[href^="#"]')];

function closeMenu() {
  navigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
  const opened = navigation.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(opened));
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const observer = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach((link) => {
    const active = link.getAttribute('href') === `#${visible.target.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}, { rootMargin: '-82px 0px -55% 0px', threshold: [0, 0.2, 0.5] });

observedSections.forEach((section) => observer.observe(section));
