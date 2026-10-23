(function () {
  document.getElementById('rok').textContent = new Date().getFullYear();
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Płynne przewijanie (Lenis)
  var lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    var raf = function (t) { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }

  var menu = document.getElementById('menuGlowne');
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
      if (lenis) lenis.scrollTo(target, { offset: -70 });
      else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    });
  });

  // Nawigacja po przewinięciu
  var nav = document.getElementById('nawigacja');
  var bg = document.querySelector('[data-parallax]');
  var onScroll = function () {
    var y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    if (bg && !reduce && y < window.innerHeight * 1.2) bg.style.transform = 'translate3d(0,' + y * 0.35 + 'px,0) scale(1.12)';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Moment 3D w hero: tilt + reflektor za kursorem
  var hero = document.getElementById('hero');
  var inner = document.getElementById('heroInner');
  var spot = document.getElementById('heroSpot');
  if (!reduce && window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      inner.style.transform = 'perspective(1200px) rotateY(' + x * 6 + 'deg) rotateX(' + -y * 6 + 'deg)';
      spot.style.setProperty('--sx', (x + 0.5) * 100 + '%');
      spot.style.setProperty('--sy', (y + 0.5) * 100 + '%');
    });
    hero.addEventListener('pointerleave', function () { inner.style.transform = ''; });
  }

  // Reflektor na kartach oferty
  document.querySelectorAll('.offer-card').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', e.clientX - r.left + 'px');
      card.style.setProperty('--my', e.clientY - r.top + 'px');
    });
  });

  // Odsłanianie sekcji (Motion)
  if (window.Motion && !reduce) {
    var M = window.Motion;
    document.documentElement.classList.add('has-motion');
    M.inView('[data-reveal]', function (info) {
      var el = info.target || info;
      M.animate(el, { opacity: [0, 1], transform: ['translateY(48px)', 'translateY(0px)'] }, { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] });
    }, { amount: 0.15 });
    var fig = document.getElementById('aboutFigure');
    if (M.scroll && fig) {
      M.scroll(M.animate(fig.querySelector('img'), { transform: ['translateY(-6%) scale(1.15)', 'translateY(6%) scale(1.15)'] }), { target: fig });
    }
  }

  // Formularz
  var form = document.getElementById('formularzKontaktowy');
  var status = document.getElementById('statusFormularza');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      status.textContent = '';
      return;
    }
    form.reset();
    form.classList.remove('was-validated');
    status.textContent = 'Dziękujemy! Odezwiemy się w ciągu 24 godzin.';
  });
})();
