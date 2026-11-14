(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const C = document.body.dataset;

  // loader: full on first page of a visit, skipped afterwards
  let seen = false; try { seen = sessionStorage.getItem('seen'); sessionStorage.setItem('seen', 1); } catch (e) {}
  if (seen) document.body.classList.add('seen', 'ready');
  else { const go = () => setTimeout(() => document.body.classList.add('ready'), 700); document.readyState === 'complete' ? go() : addEventListener('load', go); setTimeout(() => document.body.classList.add('ready'), 3000); }

  // header state + menu
  const hdr = $('.hdr');
  const onScroll = () => hdr.classList.toggle('solid', scrollY > 30);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  $('.burger').addEventListener('click', () => document.body.classList.toggle('nav-open'));
  $$('.menu a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('nav-open')));

  // split big statements into words
  $$('.big').forEach(el => { el.innerHTML = el.innerHTML.split(/(<[^>]+>|\s+)/).map(t => !t || /^\s+$/.test(t) || t[0] === '<' ? t : `<span class="w">${t}</span>`).join(''); });

  // reveals
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .14, rootMargin: '0px 0px -6% 0px' });
  $$('.rv,.ph,.ch').forEach(el => io.observe(el));

  // landing page: count-up numbers and chapter dots
  const cio = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; cio.unobserve(e.target); const el = e.target, to = +el.dataset.count, t0 = performance.now(); const step = t => { const k = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }), { threshold: .6 });
  $$('[data-count]').forEach(el => cio.observe(el));
  const dots = $('.dots');
  if (dots) { const secs = $$('.ch,.lpform'); secs.forEach((s, i) => { const a = document.createElement('a'); a.href = '#'; a.addEventListener('click', e => { e.preventDefault(); s.scrollIntoView(); }); dots.appendChild(a); }); const dio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) [...dots.children].forEach((d, i) => d.classList.toggle('on', secs[i] === e.target)); }), { threshold: .5 }); secs.forEach(s => dio.observe(s)); }

  // scroll-linked: word fade + image parallax
  const bigs = $$('.big'), pars = $$('.ph img, .ph svg');
  let tick = false;
  const frame = () => {
    tick = false; const vh = innerHeight;
    bigs.forEach(el => { const r = el.getBoundingClientRect(); const p = (vh * .86 - r.top) / (r.height + vh * .36); const ws = $$('.w', el); const n = Math.floor(p * ws.length * 1.15); ws.forEach((w, i) => w.classList.toggle('on', i < n)); });
    pars.forEach(el => { const r = el.parentElement.getBoundingClientRect(); if (r.bottom < -100 || r.top > vh + 100) return; const k = ((r.top + r.height / 2) - vh / 2) / vh; el.style.transform = `scale(1.14) translateY(${k * -5}%)`; });
  };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(frame); } }, { passive: true }); frame();

  // services hover preview
  const pv = $('.svc .pv');
  if (pv) { const ims = $$(':scope > *', pv); const set = i => ims.forEach((m, k) => m.classList.toggle('on', k === i)); set(0); $$('.svc li a').forEach((a, i) => a.addEventListener('mouseenter', () => set(i))); }

  // drag to scroll the project rail
  $$('.rail').forEach(r => { let d = false, x = 0, s = 0, moved = 0; r.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; d = true; x = e.clientX; s = r.scrollLeft; moved = 0; }); addEventListener('pointermove', e => { if (!d) return; moved = Math.abs(e.clientX - x); r.scrollLeft = s - (e.clientX - x); }); addEventListener('pointerup', () => d = false); r.addEventListener('click', e => { if (moved > 8) { e.preventDefault(); e.stopPropagation(); } }, true); });

  // project filters
  $$('.filters button').forEach(b => b.addEventListener('click', () => { $$('.filters button').forEach(x => x.classList.toggle('on', x === b)); const c = b.dataset.c; $$('.pgrid .pc').forEach(p => p.classList.toggle('hide', c !== 'all' && p.dataset.c !== c)); }));

  // project gallery
  const lb = $('.lb');
  if (lb) {
    $$('.pc[data-photos]').forEach(p => p.addEventListener('click', e => { e.preventDefault(); $('h3', lb).textContent = p.dataset.t; $('p', lb).textContent = p.dataset.d; $('.shots', lb).innerHTML = p.dataset.photos.split(',').map(f => `<img src="assets/photos/${f}.jpg" alt="${p.dataset.t}">`).join(''); $('.shots', lb).scrollLeft = 0; lb.classList.add('on'); document.body.style.overflow = 'hidden'; }));
    const close = () => { lb.classList.remove('on'); document.body.style.overflow = ''; };
    $('.x', lb).addEventListener('click', close); addEventListener('keydown', e => e.key === 'Escape' && close());
  }

  // enquiry form: no server needed. Opens WhatsApp or the visitor's email app with the message filled in.
  const f = $('#enq');
  if (f) {
    const s = new URLSearchParams(location.search).get('service'); if (s && f.service) [...f.service.options].forEach(o => { if (o.dataset.slug === s) o.selected = true; });
    const text = () => `Project enquiry for ${C.name}\n\nName: ${f.name.value}\nPhone: ${f.phone.value}\nEmail: ${f.email.value || '-'}\nCity: ${f.city.value}\nService: ${f.service.value}\n\n${f.message.value}`;
    f.addEventListener('submit', e => { e.preventDefault(); const via = e.submitter && e.submitter.value; if (via === 'email') location.href = `mailto:${C.email}?subject=${encodeURIComponent('Project enquiry: ' + f.service.value)}&body=${encodeURIComponent(text())}`; else window.open(`https://wa.me/${C.whatsapp}?text=${encodeURIComponent(text())}`, '_blank', 'noopener'); });
  }
})();
