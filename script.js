// ---- Sticky nav background ----
const nav = document.querySelector('.nav');
const onScroll = () => {
  if(!nav) return;
  if(window.scrollY > 12) nav.classList.add('is-scrolled');
  else nav.classList.remove('is-scrolled');
};
window.addEventListener('scroll', onScroll, { passive:true });
onScroll();

// ---- Mobile menu ----
const burger = document.querySelector('.nav-burger');
const mobileMenu = document.querySelector('.mobile-menu');
if(burger && mobileMenu){
  burger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      burger.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window && revealEls.length){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold:0.14, rootMargin:'0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ---- Resume download (no real file attached — friendly notice) ----
document.querySelectorAll('[data-resume]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    btn.classList.add('is-loading');
    const original = btn.innerHTML;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.classList.remove('is-loading');
      alert('Add your resume PDF and link it here — this button is wired up and ready to go.');
    }, 500);
  });
});
