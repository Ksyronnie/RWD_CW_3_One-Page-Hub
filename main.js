/* Wspólne elementy strony. Edytujesz je raz – zmieniają się na każdej podstronie. */
function dodajHeader() {
  const miejsce = document.getElementById('site-header');
  if (!miejsce) return;
  miejsce.outerHTML = `
<header>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top site-nav" id="nawigacja" aria-label="Nawigacja główna">
    <div class="container">
      <a class="navbar-brand brand" href="index.html#hero" aria-label="Puls Digital – strona główna">
        <svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="18"/><path d="M8 34h12l5-12 8 22 6-16 4 6h13"/></svg>
        <span>Puls<span class="text-primary-brand">.</span>Digital</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuGlowne" aria-controls="menuGlowne" aria-expanded="false" aria-label="Otwórz menu"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="menuGlowne">
        <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-3">
          <li class="nav-item"><a class="nav-link" href="index.html#o-nas">O nas</a></li>
          <li class="nav-item"><a class="nav-link" href="index.html#oferta">Oferta</a></li>
          <li class="nav-item"><a class="nav-link active" href="blog.html" aria-current="page">Blog</a></li>
          <li class="nav-item"><a class="nav-link" href="sklep.html">Sklep</a></li>
          <li class="nav-item"><a class="nav-link" href="index.html#kontakt">Kontakt</a></li>
        </ul>
        <div class="nav-actions d-flex align-items-center gap-2 ms-lg-4 py-2 py-lg-0">
          <a href="konto.html" class="nav-icon" aria-label="Konto klienta" title="Konto klienta"><i class="bi bi-person" aria-hidden="true"></i></a>
          <a href="koszyk.html" class="nav-icon cart-nav-icon" aria-label="Koszyk" title="Koszyk"><i class="bi bi-bag" aria-hidden="true"></i><span class="badge cart-count" id="cartCount">2</span></a>
          <a class="btn btn-cta btn-sm ms-2 nav-cta" href="index.html#kontakt"><span>Zapytaj o ofertę</span><i class="cta-dot" aria-hidden="true"></i></a>
        </div>
      </div>
    </div>
  </nav>
</header>
`;
}

function dodajFooter() {
  const miejsce = document.getElementById('site-footer');
  if (!miejsce) return;
  miejsce.outerHTML = `
<footer class="site-footer">
  <div class="container">
    <p class="footer-word" aria-hidden="true">Puls<span class="text-primary-brand">.</span>Digital</p>
    <div class="row g-3 align-items-end">
      <div class="col-md-7">
        <p class="mb-1 small">Puls Digital · Agencja marketingowa · Warszawa</p>
        <p class="mb-0 small">ul. Przykładowa 12, 00-001 Warszawa · Dane demonstracyjne</p>
      </div>
      <div class="col-md-5 text-md-end">
        <p class="mb-0 small">&copy; <span id="rok">2026</span> Puls Digital. Wszelkie prawa zastrzeżone.</p>
      </div>
    </div>
  </div>
</footer>
`;
}

/* Puls Digital – proste interakcje bez frameworków. Wszystkie ceny są demonstracyjne. */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const PRODUCTS = {
    1: { id: 1, name: 'Planer Social Media 2027', price: 89, img: 'img/produkt-1.jpg' },
    2: { id: 2, name: 'Workbook Strategia Marki', price: 129, img: 'img/produkt-2.jpg' },
    3: { id: 3, name: 'Notatnik Content Creatora', price: 49, img: 'img/produkt-3.jpg' },
    4: { id: 4, name: 'Karty pomysłów na Reels', price: 69, img: 'img/produkt-4.jpg' },
    5: { id: 5, name: 'Przewodnik Meta Ads', price: 99, img: 'img/produkt-5.jpg' },
    6: { id: 6, name: 'Zestaw Startowy Marki', price: 179, img: 'img/produkt-6.jpg' }
  };
  const storeKey = 'puls-demo-cart-v1';
  const promoKey = 'puls-demo-promo-v1';
  const get = (id) => document.getElementById(id);
  const format = (number) => Number(number).toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' });
  function readCart() {
    try {
      const raw = localStorage.getItem(storeKey);
      if (raw === null) return [{ id: 1, qty: 1 }, { id: 2, qty: 1 }];
      const cart = JSON.parse(raw);
      if (!Array.isArray(cart)) return [];
      return cart.filter(p => PRODUCTS[p.id] && Number.isInteger(p.qty) && p.qty > 0 && p.qty <= 99);
    } catch { return [{ id: 1, qty: 1 }, { id: 2, qty: 1 }]; }
  }
  function saveCart(cart) {
    try { localStorage.setItem(storeKey, JSON.stringify(cart)); } catch { /* Tryb prywatny: dane tylko w ramach strony. */ }
    updateCounter(cart);
  }
  function updateCounter(cart = readCart()) {
    const qty = cart.reduce((total, item) => total + item.qty, 0);
    document.querySelectorAll('.cart-count').forEach(el => { el.textContent = qty; });
  }
  const isPromo = () => { try { return sessionStorage.getItem(promoKey) === 'yes'; } catch { return false; } };
  const totals = (cart) => {
    const subtotal = cart.reduce((sum, row) => sum + PRODUCTS[row.id].price * row.qty, 0);
    const discount = isPromo() ? Math.round(subtotal * 10) / 100 : 0;
    return { subtotal, discount, total: subtotal - discount };
  };

  // Nawigacja + bieżący rok
  const year = get('rok'); if (year) year.textContent = new Date().getFullYear();
  updateCounter();
  const nav = get('nawigacja');
  const onScroll = () => { if (nav) nav.classList.toggle('is-scrolled', !get('hero') || scrollY > 40); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  document.querySelectorAll('#menuGlowne a').forEach(a => a.addEventListener('click', () => {
    const menu = get('menuGlowne');
    if (menu && menu.classList.contains('show') && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  }));

  // Formularz kontaktowy: tylko walidacja i komunikat (brak backendu)
  const contact = get('formularzKontaktowy');
  if (contact) contact.addEventListener('submit', event => {
    event.preventDefault();
    contact.classList.add('was-validated');
    if (!contact.checkValidity()) return;
    get('statusFormularza').textContent = 'Formularz demonstracyjny — wiadomość nie została wysłana. Aby odbierać zapytania, podłącz obsługę formularza.';
    contact.reset(); contact.classList.remove('was-validated');
  });

  // Wyszukiwanie tekstowe artykułów na stronie bloga
  const blogForm = get('blogSearch');
  if (blogForm) blogForm.addEventListener('submit', event => {
    event.preventDefault();
    const query = get('blogQuery').value.trim().toLocaleLowerCase('pl-PL');
    let shown = 0;
    document.querySelectorAll('#blogGrid > div').forEach(card => {
      const match = card.textContent.toLocaleLowerCase('pl-PL').includes(query);
      card.classList.toggle('d-none', !match); if (match) shown++;
    });
    get('blogEmpty').classList.toggle('d-none', shown > 0);
  });

  // Filtry sklepu; sztywna paginacja wynika z wymagań makiety
  const filters = get('shopFilters');
  if (filters) {
    const grid = get('productGrid');
    const cards = Array.from(grid.children);
    const apply = () => {
      const selected = Array.from(filters.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
      const max = Number(get('priceLimit').value);
      get('priceValue').textContent = max + ' zł';
      const sale = get('onSale').checked;
      let visible = 0;
      cards.forEach(card => {
        const matches = (!selected.length || selected.includes(card.dataset.category)) && Number(card.dataset.price) <= max && (!sale || !!card.querySelector('.product-badge')?.textContent.includes('−'));
        card.classList.toggle('d-none', !matches);
        if (matches) visible++;
      });
      get('resultsCount').textContent = `Znaleziono ${visible} produktów`;
      get('noProducts').classList.toggle('d-none', visible > 0);
    };
    filters.addEventListener('input', apply);
    filters.addEventListener('reset', () => requestAnimationFrame(apply));
    get('sortProducts').addEventListener('change', event => {
      const type = event.target.value;
      cards.sort((a,b) => {
        if (type === 'price-asc') return Number(a.dataset.price) - Number(b.dataset.price);
        if (type === 'price-desc') return Number(b.dataset.price) - Number(a.dataset.price);
        if (type === 'name') return a.dataset.name.localeCompare(b.dataset.name, 'pl');
        return Number(a.querySelector('.product-image img').src.match(/produkt-(\d+)/)?.[1] || 0) - Number(b.querySelector('.product-image img').src.match(/produkt-(\d+)/)?.[1] || 0);
      });
      cards.forEach(card => grid.append(card));
    });
    apply();
  }

  // Galeria produktu oraz dodawanie do koszyka
  document.querySelectorAll('[data-gallery]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-gallery]').forEach(b => b.classList.remove('is-active'));
    button.classList.add('is-active');
    const main = get('detailMain');
    main.classList.toggle('zoom', button.dataset.gallery === '1');
    main.classList.toggle('variant', button.dataset.gallery === '2');
  }));
  const add = get('addToCart');
  if (add) add.addEventListener('click', () => {
    const qty = Math.max(1, Math.min(99, parseInt(get('productQuantity').value, 10) || 1));
    const cart = readCart(); const item = cart.find(p => p.id === 1);
    if (item) item.qty = Math.min(99, item.qty + qty);
    else cart.push({ id: 1, qty });
    saveCart(cart);
  });

  function renderCart() {
    const root = get('cartRows'); if (!root) return;
    const cart = readCart();
    root.replaceChildren();
    cart.forEach(item => {
      const p = PRODUCTS[item.id];
      const row = document.createElement('tr');
      row.innerHTML = `<td><div class="cart-product"><img src="${p.img}" alt="" width="1000" height="800"><span>${p.name}</span></div></td><td>${format(p.price)}</td><td><input type="number" class="form-control cart-qty" min="1" max="99" value="${item.qty}" aria-label="Ilość: ${p.name}"></td><td>${format(p.price * item.qty)}</td><td><button class="icon-button" type="button" aria-label="Usuń: ${p.name}"><i class="bi bi-trash"></i></button></td>`;
      row.querySelector('input').addEventListener('change', event => {
        item.qty = Math.max(1, Math.min(99, parseInt(event.target.value, 10) || 1));
        saveCart(cart); renderCart();
      });
      row.querySelector('button').addEventListener('click', () => { saveCart(cart.filter(r => r.id !== item.id)); renderCart(); });
      root.append(row);
    });
    const info = totals(cart);
    get('cartSubtotal').textContent = format(info.subtotal);
    get('cartDiscount').textContent = '−' + format(info.discount);
    get('cartTotal').textContent = format(info.total);
    get('emptyCart').classList.toggle('d-none', cart.length > 0);
    get('goCheckout').classList.toggle('disabled', !cart.length);
    get('goCheckout').setAttribute('aria-disabled', String(!cart.length));
  }
  if (get('cartRows')) {
    renderCart();
    get('applyPromo').addEventListener('click', () => {
      const code = get('promoCode').value.trim().toUpperCase();
      if (code === 'PULS10') {
        try { sessionStorage.setItem(promoKey, 'yes'); } catch {}
        get('promoStatus').textContent = 'Zastosowano rabat 10%.';
      } else get('promoStatus').textContent = 'Nieprawidłowy kod. W makiecie działa PULS10.';
      renderCart();
    });
  }

  // Kasa: przeliczenie kosztów dostawy, walidacja, fikcyjny sukces
  const checkout = get('checkoutForm');
  if (checkout) {
    const items = readCart(); const info = totals(items);
    get('checkoutItems').replaceChildren(...items.map(item => {
      const p = document.createElement('p');
      p.textContent = `${PRODUCTS[item.id].name} × ${item.qty}`;
      return p;
    }));
    get('checkoutSubtotal').textContent = format(info.subtotal);
    get('checkoutDiscount').textContent = '−' + format(info.discount);
    const delivery = () => {
      const ship = Number(checkout.querySelector('input[name="delivery"]:checked').value);
      get('checkoutShipping').textContent = format(ship);
      get('checkoutTotal').textContent = format(info.total + ship);
    };
    checkout.querySelectorAll('input[name="delivery"]').forEach(input => input.addEventListener('change', delivery));
    delivery();
    const invoice = get('invoiceToggle');
    invoice.addEventListener('change', () => {
      get('invoiceFields').classList.toggle('d-none', !invoice.checked);
      get('companyName').required = invoice.checked;
      get('companyNip').required = invoice.checked;
    });
    checkout.addEventListener('submit', event => {
      event.preventDefault(); checkout.classList.add('was-validated');
      if (!items.length) { get('checkoutStatus').textContent = 'Koszyk jest pusty. Wróć do sklepu.'; return; }
      if (!checkout.checkValidity()) { get('checkoutStatus').textContent = 'Uzupełnij wymagane pola i zaakceptuj regulamin.'; checkout.reportValidity(); return; }
      saveCart([]);
      location.href = 'konto.html?demo=success';
    });
  }

  // Linki udostępniania korzystają z bieżącego adresu strony po wdrożeniu.
  document.querySelectorAll('[data-share]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    const url = encodeURIComponent(location.href);
    const title = encodeURIComponent(document.title);
    const platform = link.dataset.share;
    const target = platform === 'facebook' ? `https://www.facebook.com/sharer/sharer.php?u=${url}`
      : platform === 'linkedin' ? `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
      : `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    window.open(target, '_blank', 'noopener,noreferrer');
  }));

  // Makieta panelu konta
  if (location.pathname.endsWith('/konto.html') && new URLSearchParams(location.search).get('demo') === 'success') get('orderSuccess')?.classList.remove('d-none');
  const edit = get('editAddress');
  if (edit) edit.addEventListener('click', () => { get('addressForm').classList.toggle('d-none'); });
  const address = get('addressForm');
  if (address) address.addEventListener('submit', event => {
    event.preventDefault();
    get('addressStatus').textContent = 'Adres zmieniony tylko w demonstracyjnym widoku.';
    address.classList.add('d-none');
  });
  const comment = get('commentForm');
  if (comment) comment.addEventListener('submit', event => {
    event.preventDefault();
    if (!comment.reportValidity()) return;
    get('commentStatus').textContent = 'Komentarz nie został opublikowany — to statyczna makieta.';
    comment.reset();
  });
});
