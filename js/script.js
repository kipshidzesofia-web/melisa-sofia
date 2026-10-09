const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

// Barra de navegación: transparente arriba, sólida al bajar
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Menú móvil
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
  if (open) nav.classList.add('scrolled'); else onScroll();
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  onScroll();
}));

// Aparición al hacer scroll
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  items.forEach(el => io.observe(el));
} else {
  items.forEach(el => el.classList.add('in'));
}

// Testimonios
const slides = document.querySelectorAll('#slider blockquote');
const dotsBox = document.getElementById('dots');
let current = 0, timer;
slides.forEach((_, i) => {
  const b = document.createElement('button');
  b.setAttribute('aria-label', 'Testimonio ' + (i + 1));
  b.addEventListener('click', () => { show(i); restart(); });
  dotsBox.appendChild(b);
});
function show(i) {
  current = i;
  slides.forEach((s, n) => s.classList.toggle('active', n === i));
  dotsBox.querySelectorAll('button').forEach((d, n) => d.classList.toggle('on', n === i));
}
function restart() {
  clearInterval(timer);
  timer = setInterval(() => show((current + 1) % slides.length), 6000);
}
show(0); restart();

// Formulario: abre el correo con el mensaje
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  const subject = encodeURIComponent('Consulta web de ' + f.nombre.value);
  const body = encodeURIComponent(f.mensaje.value + '\n\n' + f.nombre.value + ' (' + f.email.value + ')');
  window.location.href = 'mailto:info@melisaworkoutsourcing.com?subject=' + subject + '&body=' + body;
  document.getElementById('ok').hidden = false;
});

document.getElementById('year').textContent = new Date().getFullYear();
