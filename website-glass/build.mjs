// Builds the static site into ./site  →  run:  node build.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { company as C, services, testimonials, industries, process as steps, why, areas } from './data.mjs';

const OUT = new URL('./site/', import.meta.url);
mkdirSync(OUT, { recursive: true });
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const tel = 'tel:' + C.phone.replace(/[^+\d]/g, '');
const wa = `https://wa.me/${C.whatsapp}?text=${encodeURIComponent('Hello ' + C.name + ', I would like to discuss a project.')}`;
const svcFile = s => `${s.slug}-pune-mumbai.html`;
const allAreas = [...areas.primary, ...areas.secondary];
// Content-Security-Policy: only our own scripts run; fonts and the map are the only outside sources.
const CSP = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; frame-src https://www.google.com https://maps.google.com; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'";

// drawn placeholder (pane grid) for services that have no photograph yet
const art = (seed = 1) => {
  let r = seed * 9301; const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
  const cols = 3 + (seed % 3), rows = 4 + (seed % 4), w = 400 / cols, h = 520 / rows; let p = '';
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) p += `<rect x="${x * w + 3}" y="${y * h + 3}" width="${w - 6}" height="${h - 6}" fill="${rnd() > .72 ? '#9A7B4F' : '#FFFFFF'}" opacity="${(.12 + rnd() * .4).toFixed(2)}"/>`;
  return `<svg viewBox="0 0 400 520" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Decorative pane pattern"><rect width="400" height="520" fill="#DCD3C3"/>${p}</svg>`;
};
const img = (name, alt, eager) => `<img src="assets/photos/${name}.jpg" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}>`;
const ph = (name, alt, ratio = 'r34', seed = 1) => `<div class="ph ${ratio}">${name ? img(name, alt) : art(seed)}</div>`;
const btn = (href, text, fill) => `<a class="btn${fill ? ' fill' : ''}" href="${href}">${text}<i></i></a>`;
const waIcon = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.700 6.700 0 0 1-2-1.200 7.400 7.400 0 0 1-1.400-1.700c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.5.5 0 0 0 0-.4c0-.1-.6-1.400-.8-1.900s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.900 2.900 0 0 0-.9 2.100 5 5 0 0 0 1.100 2.700 11.500 11.500 0 0 0 4.400 3.900c.6.300 1.100.400 1.500.500a3.600 3.600 0 0 0 1.600.100 2.700 2.700 0 0 0 1.800-1.200 2.200 2.200 0 0 0 .1-1.200c0-.2-.2-.200-.4-.300Z"/></svg>';
const callIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>';

const nav = [['services.html', 'Services'], ['about.html', 'About'], ['industries.html', 'Industries'], ['contact.html', 'Contact']];
const socials = Object.entries(C.social).filter(([, v]) => v);

function page({ file, title, desc, body, schema = '', cls = '' }) {
  const html = `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${C.url ? `<link rel="canonical" href="${C.url}/${file === 'index.html' ? '' : file}">\n` : ''}<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
${C.url ? `<meta property="og:image" content="${C.url}/assets/photos/golden-hour.jpg">\n` : ''}<meta name="theme-color" content="#F6F1E7">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css">
${schema}
</head>
<body${cls ? ` class="${cls}"` : ''} data-name="${esc(C.name)}" data-whatsapp="${esc(C.whatsapp)}" data-email="${esc(C.email)}">
<div class="loader" aria-hidden="true"><b></b><b></b><span>${esc(C.name)}<small>GLASS · ALUMINIUM · INTERIORS</small></span></div>
<header class="hdr">
  <a class="logo" href="index.html" aria-label="${esc(C.name)} home">${esc(C.short)} <small>Works</small></a>
  <nav class="nav" aria-label="Main">${nav.map(([h, t]) => `<a href="${h}"${h === file ? ' class="on"' : ''}>${t}</a>`).join('')}<a class="btn" href="contact.html">Discuss your project</a></nav>
  <button class="burger" aria-label="Menu"></button>
</header>
<div class="menu">
  <a class="m" href="index.html">Home</a>${nav.map(([h, t]) => `<a class="m" href="${h}">${t}</a>`).join('')}
  <div class="sub">${services.map(s => `<a href="${svcFile(s)}">${s.name}</a>`).join('')}</div>
  <div class="btns">${btn(tel, 'Call ' + C.phone, true)}${btn(wa, 'WhatsApp')}</div>
</div>
<main>
${body}
</main>
<footer class="ftr">
  <div class="wm">${esc(C.short)} <em>Works</em></div>
  <div class="cols">
    <div><h4>${esc(C.tagline)}</h4><p>Architectural glass, aluminium, glazing, interior finishing and turnkey execution. ${C.legacyYears} years of family-business experience.</p>${C.address ? `<p>${esc(C.address)}</p>` : ''}<p><a href="${tel}">${C.phone}</a>${C.email ? `<br><a href="mailto:${C.email}">${C.email}</a>` : ''}</p></div>
    <div><h4>Services</h4><ul>${services.map(s => `<li><a href="${svcFile(s)}">${s.name}</a></li>`).join('')}</ul></div>
    <div><h4>Company</h4><ul><li><a href="about.html">About us</a></li><li><a href="industries.html">Industries we serve</a></li><li><a href="contact.html">Contact</a></li><li><a href="privacy.html">Privacy policy</a></li><li><a href="terms.html">Terms and conditions</a></li></ul></div>
    <div><h4>Service areas</h4><ul>${allAreas.map(a => `<li>${a}</li>`).join('')}</ul>${socials.length ? `<h4 style="margin-top:24px">Follow</h4><ul>${socials.map(([k, v]) => `<li><a href="${v}" rel="noopener" target="_blank">${k[0].toUpperCase() + k.slice(1)}</a></li>`).join('')}</ul>` : ''}</div>
  </div>
  <div class="base"><span>© ${new Date().getFullYear()} ${esc(C.name)}. All rights reserved.</span><span>Pune · Pimpri-Chinchwad · Mumbai · Thane · Navi Mumbai</span></div>
</footer>
<div class="fab"><a class="call" data-t="Call" href="${tel}" aria-label="Call ${esc(C.name)}">${callIcon}</a><a class="wa" data-t="WhatsApp" href="${wa}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${waIcon}</a></div>
<script src="assets/main.js" defer></script>
</body>
</html>`;
  writeFileSync(new URL(file, OUT), html);
  return file;
}

const hero = ({ label, h1, text, photo, sub, crumbs, extra = '' }) => `<section class="hero${sub ? ' sub' : ''}">
  <div class="txt">${crumbs ? `<div class="crumbs">${crumbs}</div>` : ''}<div class="label">${label}</div><h1>${h1}</h1><p>${text}</p>${extra}</div>
  <div class="bg ph">${photo ? img(photo, '', true) : art(7)}</div>
</section>`;
const cta = (title = 'Let’s discuss <em>your</em> project.', svc) => `<section class="cta ink">
  <div class="label rv">Start a conversation</div><h2 class="rv d1">${title}</h2>
  <div class="btns rv d2">${btn('contact.html' + (svc ? '?service=' + svc : ''), 'Send an enquiry', true)}${btn(wa, 'WhatsApp us')}${btn(tel, 'Call ' + C.phone)}</div>
</section>`;
const files = [];

/* ---------- SERVICES INDEX ---------- */
files.push(page({
  file: 'services.html',
  title: `Services | Glass, Aluminium, Partitions, ACP and Turnkey Interiors | ${C.name}`,
  desc: `All services from ${C.name} in Pune and Mumbai: architectural glazing, aluminium windows and doors, shower enclosures, office partitions, ACP cladding, furniture, flooring, painting, electrical, air-conditioning and turnkey projects.`,
  body: hero({ sub: 1, label: 'Our services', h1: 'Complete architectural <em>solutions.</em>', text: services.length + ' services, each offered on its own. Choose one, or combine several into a single turnkey project.', photo: 'glass-office', crumbs: '<a href="index.html">Home</a> / Services' }) +
    `<section class="wrap"><div class="pgrid">${services.map((s, i) => `<a class="pc" href="${svcFile(s)}">${ph(s.photos[0], s.name + ' in Pune and Mumbai', 'r45', i + 1)}<small style="display:block;margin-top:16px">${String(i + 1).padStart(2, '0')}</small><h3 style="margin-top:4px">${s.name}</h3><p>${s.line}</p></a>`).join('')}</div></section>` + cta(),
}));

/* ---------- SERVICE PAGES ---------- */
services.forEach((s, i) => {
  files.push(page({
    file: svcFile(s),
    title: `${s.seo} | ${C.name}`,
    desc: `${s.name} by ${C.name}, serving Pune, Pimpri-Chinchwad, Mumbai, Thane and Navi Mumbai. ${s.line}`,
    schema: `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Service', name: s.name, serviceType: s.name, provider: { '@type': 'GeneralContractor', name: C.name, telephone: C.phone, url: C.url }, areaServed: allAreas, description: s.intro })}</script>`,
    body: hero({ sub: 1, label: `Service ${String(i + 1).padStart(2, '0')} · Pune and Mumbai`, h1: s.name.replace(/(\S+)$/, '<em>$1</em>'), text: s.line, photo: s.photos[0], crumbs: `<a href="index.html">Home</a> / <a href="services.html">Services</a> / ${s.name}`, extra: `<div class="btns">${btn('contact.html?service=' + s.slug, 'Enquire about this service', true)}</div>` }) +
      `<section class="wrap"><div class="intro"><div><div class="label rv">Introduction</div><p class="big" style="margin-top:22px">${s.intro.split('. ')[0]}.</p></div><p class="lead rv">${s.intro.split('. ').slice(1).join('. ')}</p></div></section>
<section class="wrap" style="padding-top:0"><div class="strip">${[0, 1, 2].map(k => ph(s.photos[k], s.name + ', representative image', 'r34', i * 3 + k + 1)).join('')}</div></section>
<section class="wrap" style="padding-top:0"><div class="label rv">Scope of work</div><h2 class="h2 rv d1">What we <em>deliver.</em></h2><ul class="scope">${s.scope.map(x => `<li>${x}</li>`).join('')}</ul></section>
<section class="wrap dark"><div class="tri">
  <div class="rv"><div class="label">Where it is used</div><h3>Applications</h3><ul>${s.apps.map(x => `<li>${x}</li>`).join('')}</ul></div>
  <div class="rv d1"><div class="label">What we work with</div><h3>Materials and systems</h3><ul>${s.materials.map(x => `<li>${x}</li>`).join('')}</ul></div>
  <div class="rv d2"><div class="label">What you get</div><h3>Benefits</h3><ul>${s.benefits.map(x => `<li>${x}</li>`).join('')}</ul></div>
</div></section>` + cta(`Planning ${/^[aeiou]/.test(s.mega) ? 'an' : 'a'} <em>${s.mega}</em> project?`, s.slug),
  }));
});

/* ---------- ABOUT ---------- */
files.push(page({
  file: 'about.html',
  title: `About Us | ${C.legacyYears} Years in Glass and Aluminium | ${C.name}`,
  desc: `${C.name} is a family-run architectural solutions company with ${C.legacyYears} years of industry experience, now led by the next generation and serving Pune and Mumbai.`,
  body: hero({ sub: 1, label: 'About us', h1: `A family business, <em>${C.legacyYears} years</em> in the making.`, text: C.tagline, photo: 'facade-corner', crumbs: '<a href="index.html">Home</a> / About' }) +
    `<section class="wrap"><div class="intro"><div><div class="label rv">Our background</div><p class="big" style="margin-top:22px">We began with glass and aluminium. Three and a half decades later, we deliver <em>complete</em> architectural finishing.</p></div><p class="lead rv">${C.name} is an established, family-run business. The technical knowledge built over ${C.legacyYears} years is still at the centre of how we specify, fabricate and install.</p></div></section>
<section class="wrap" style="padding-top:0"><div class="two">${ph('office-glass', 'Glass-walled office', 'r169')}<div><div class="label rv">Next-generation leadership</div><h2 class="h2 rv d1">Entering the <em>next</em> phase.</h2><p class="lead rv d2">The next generation of the family now leads the business, with hands-on experience on sites and with clients. The aim is clear: a professionally managed architectural solutions and turnkey execution company serving residential, commercial, corporate, industrial and hospitality projects across Pune and Mumbai.</p></div></div></section>
<section class="wrap dark"><div class="label rv">What guides us</div><h2 class="h2 rv d1">Expertise, philosophy, <em>commitment.</em></h2><div class="cards">
  <div class="rv"><b>EXPERTISE</b><h3>Technical knowledge</h3><p>Glass types, aluminium systems, fixing details and site conditions: we recommend what suits the span, the load and the use, and we explain why.</p></div>
  <div class="rv"><b>PHILOSOPHY</b><h3>Do it once, do it right</h3><p>Accurate measurement, careful fabrication and tidy installation cost less than rework. We plan for the first, so clients are spared the second.</p></div>
  <div class="rv"><b>QUALITY</b><h3>Workmanship in the details</h3><p>Straight lines, even joints, clean sealant and smooth hardware. These are the details clients live with, and the ones we check before handover.</p></div>
  <div class="rv"><b>COORDINATION</b><h3>Reliable on site</h3><p>We work to the architect’s drawings, coordinate with other agencies and keep the client informed at each stage of the job.</p></div>
  <div class="rv"><b>CAPABILITY</b><h3>One roof, many trades</h3><p>Glass, aluminium, cladding, furniture, flooring, painting, electrical and air-conditioning, delivered separately or as one turnkey project.</p></div>
  <div class="rv"><b>VISION</b><h3>Built for the long term</h3><p>To grow into a leading, professionally managed architectural solutions company in Maharashtra, trusted by architects, developers and homeowners.</p></div>
</div></section>
<section class="wrap"><div class="strip">${ph('glass-grid', 'Glass façade', 'r34')}${ph('villa-doors', 'Glazed sliding doors', 'r34')}${ph('framed-partition', 'Glass partition corridor', 'r34')}</div></section>
<section class="wrap dark"><div class="label rv">Project process</div><h2 class="h2 rv d1">Five clear steps, <em>one</em> point of contact.</h2><div class="steps">${steps.map(([t, d]) => `<div class="rv"><h3>${t}</h3><p>${d}</p></div>`).join('')}</div></section>` + cta(),
}));

/* ---------- INDUSTRIES ---------- */
files.push(page({
  file: 'industries.html',
  title: `Industries We Serve | Residential, Commercial and Corporate | ${C.name}`,
  desc: `${C.name} serves residential, commercial, corporate, hospitality, retail, industrial, healthcare and educational projects across Pune and Mumbai.`,
  body: hero({ sub: 1, label: 'Industries we serve', h1: 'Built for <em>every</em> kind of space.', text: 'We work with architects, interior designers, builders, developers, corporates, contractors and homeowners.', photo: 'lobby', crumbs: '<a href="index.html">Home</a> / Industries' }) +
    `<section class="wrap paper"><div class="label rv">Sectors</div><h2 class="h2 rv d1">Eight sectors, <em>one</em> standard of work.</h2><div class="chips">${industries.map(x => `<div class="rv"><h3>${x.name}</h3><p>${x.text}</p></div>`).join('')}</div></section>
<section class="wrap dark"><div class="label rv">Who we work with</div><h2 class="h2 rv d1">A dependable partner for <em>professionals.</em></h2><div class="cards">
  <div class="rv"><b>01</b><h3>Architects and interior designers</h3><p>We execute to your drawings and details, advise on systems and glass specifications, and protect the design intent on site.</p></div>
  <div class="rv"><b>02</b><h3>Builders and developers</h3><p>Glazing, windows, cladding and railings across towers and complexes, planned around your construction schedule.</p></div>
  <div class="rv"><b>03</b><h3>Corporates and businesses</h3><p>Office partitions, workstations and complete fit-outs for offices, showrooms, restaurants, hotels and facilities.</p></div>
  <div class="rv"><b>04</b><h3>PMCs and contractors</h3><p>A specialist agency for glass, aluminium and finishing packages, with clear scope, coordination and reporting.</p></div>
  <div class="rv"><b>05</b><h3>Fit-out contractors</h3><p>Reliable supply and installation of partitions, doors, glazing and furniture within larger commercial fit-outs.</p></div>
  <div class="rv"><b>06</b><h3>Homeowners</h3><p>Windows, shower enclosures, railings, wardrobes, kitchens and complete home interiors, handled with care.</p></div>
</div></section>` + cta(),
}));

/* ---------- CONTACT ---------- */
files.push(page({
  file: 'contact.html',
  title: `Contact | Discuss Your Project in Pune or Mumbai | ${C.name}`,
  desc: `Contact ${C.name} for architectural glass, aluminium, partitions, cladding and turnkey interior projects in Pune, Pimpri-Chinchwad, Mumbai, Thane and Navi Mumbai.`,
  body: hero({ sub: 1, label: 'Contact us', h1: 'Discuss your <em>project.</em>', text: 'Tell us what you are planning. We will respond with the next steps, a site visit where needed, and a clear quotation.', photo: 'glass-tower-sky', crumbs: '<a href="index.html">Home</a> / Contact' }) +
    `<section class="wrap"><div class="two" style="align-items:start">
  <div><div class="label">Project enquiry</div><h2 class="h2" style="font-size:clamp(36px,4.4vw,68px)">Send us the <em>details.</em></h2>
  <form class="form" id="enq">
    <label>Name<input name="name" required autocomplete="name"></label>
    <label>Phone<input name="phone" type="tel" required autocomplete="tel"></label>
    <label>Email (optional)<input name="email" type="email" autocomplete="email"></label>
    <label>City<select name="city">${allAreas.map(a => `<option>${a}</option>`).join('')}<option>Other</option></select></label>
    <label class="full">Service<select name="service">${services.map(s => `<option data-slug="${s.slug}">${s.name}</option>`).join('')}<option>Multiple services / not sure</option></select></label>
    <label class="full">Project details<textarea name="message" rows="4" placeholder="Type of space, approximate size, timeline"></textarea></label>
    <div class="full btns" style="margin-top:8px"><button class="btn fill" value="whatsapp">Send on WhatsApp<i></i></button>${C.email ? `<button class="btn" value="email">Send by email<i></i></button>` : btn(tel, 'Call us instead')}</div>
    <small class="full">Your message opens in WhatsApp, ready to send. Nothing is stored on this website.</small>
  </form></div>
  <dl class="info"><div class="label">Reach us directly</div>
    <dt>Phone</dt><dd><a href="${tel}">${C.phone}</a></dd>
    <dt>WhatsApp</dt><dd><a href="${wa}" target="_blank" rel="noopener">Chat with us</a></dd>
    ${C.email ? `<dt>Email</dt><dd><a href="mailto:${C.email}">${C.email}</a></dd>` : ''}
    ${C.address ? `<dt>Office</dt><dd>${esc(C.address)}</dd>` : ''}
    <dt>Primary service area</dt><dd>${areas.primary.join(' · ')}</dd>
    <dt>Also serving</dt><dd>${areas.secondary.join(' · ')}</dd>
  </dl>
</div></section>
<iframe class="map" title="Map: ${esc(C.name)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${encodeURIComponent(C.mapQuery)}&output=embed"></iframe>`,
}));

/* ---------- HOME (cinematic chapters) ---------- */
const svcBy = slug => svcFile(services.find(s => s.slug === slug));
const chapter = ({ no, label, h, text, photo, links = [], stats = [] }) => `<section class="ch">
  <div class="im">${img(photo, '')}</div>
  <div class="box"><div class="no rv">${no}</div><div class="label rv">${label}</div>
  <h2 class="rv d1">${h}</h2><p class="rv d2">${text}</p>
  ${links.length ? `<div class="lk rv d3">${links.map(([slug, t]) => `<a href="${svcBy(slug)}">${t} <span>↗</span></a>`).join('')}</div>` : ''}
  ${stats.length ? `<div class="st rv d3">${stats.map(([n, t]) => `<div><strong data-count="${n}">${n}</strong><span>${t}</span></div>`).join('')}</div>` : ''}</div>
  <small class="rep">Representative image</small>
</section>`;
files.push(page({
  file: 'index.html', cls: 'lp',
  schema: `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'GeneralContractor', name: C.name, ...(C.url ? { url: C.url, image: C.url + '/assets/photos/golden-hour.jpg' } : {}), telephone: C.phone, ...(C.email ? { email: C.email } : {}), address: { '@type': 'PostalAddress', ...(C.address ? { streetAddress: C.address } : {}), addressLocality: 'Pune', addressRegion: 'Maharashtra', addressCountry: 'IN' }, areaServed: allAreas, slogan: C.tagline, makesOffer: services.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name } })) })}</script>`,
  title: `${C.name} | Glass, Aluminium and Interiors by One Team | Pune and Mumbai`,
  desc: `Architectural glass, structural glazing, aluminium windows and doors, office partitions, shower enclosures and turnkey interiors from one accountable team with ${C.legacyYears} years of family-business experience.`,
  body: `<section class="ch first">
  <div class="im">${img('golden-hour', 'Glass building at golden hour', true)}</div>
  <div class="box"><h1><span><b>One company.</b></span><span><b><em>Complete spaces.</em></b></span></h1>
  <p>Glass, aluminium and interiors, measured, made and installed by one team. ${C.legacyYears} years of family-business experience.</p>
  <div class="btns"><a class="btn fill" href="#enquire">Discuss your project<i></i></a><a class="btn" href="services.html">See all ${services.length} services<i></i></a></div></div>
  <small class="rep">Representative image</small>
</section>
${chapter({ no: '01', label: 'The idea', h: 'Many trades.<br><em>One team.</em>', text: 'Most delays on a site come from the gaps between contractors. We close them: glass, aluminium, cladding, furniture, flooring, painting, electrical and air-conditioning under one roof.', photo: 'lobby', stats: [[C.legacyYears, 'Years of family legacy'], [services.length, 'Services under one roof'], [1, 'Point of contact']] })}
${chapter({ no: '02', label: 'Glass and glazing', h: 'Walls of light.<br><em>Built to last.</em>', text: 'Structural and spider glazing, glass façades, skylights, railings, canopies and shopfronts, with glass specified for the span, the load and the look.', photo: 'glass-tower-sky', links: [['structural-glazing', 'Structural Glazing'], ['architectural-glass', 'Architectural Glass'], ['acp-cladding', 'ACP Cladding']] })}
${chapter({ no: '03', label: 'Aluminium systems', h: 'Open wide.<br><em>Close tight.</em>', text: 'Sliding, casement, folding and slim-profile systems, fabricated to the measured opening so they slide, seal and lock the way they should.', photo: 'villa-doors', links: [['aluminium-windows', 'Aluminium Windows'], ['aluminium-doors', 'Aluminium Doors']] })}
${chapter({ no: '04', label: 'Workplaces', h: 'Offices that work.<br><em>Quietly.</em>', text: 'Frameless, aluminium, double-glazed and acoustic partitions, with workstations, reception counters and conference tables built for the same floor.', photo: 'office-glass', links: [['office-partitions', 'Office Partitions'], ['custom-furniture', 'Custom Furniture']] })}
${chapter({ no: '05', label: 'Bathrooms', h: 'Clear glass.<br><em>Dry floors.</em>', text: 'Frameless and semi-frameless shower enclosures made to the exact size of the bathroom, with hardware chosen to last in wet conditions.', photo: 'shower-walkin', links: [['shower-enclosures', 'Shower Enclosures']] })}
${chapter({ no: '06', label: 'Turnkey execution', h: 'One plan.<br><em>One handover.</em>', text: 'Hand us the bare shell. We bring every trade, sequence the work on one schedule and hand back a finished space. Or hire us for any single service.', photo: 'lounge', links: [['turnkey-projects', 'Turnkey Projects'], ['flooring', 'Flooring'], ['painting', 'Painting'], ['electrical-work', 'Electrical Work'], ['air-conditioning', 'Air Conditioning']] })}
<section class="ch last">
  <div class="im">${img('glass-fins', '')}</div>
  <div class="box" style="text-align:center;align-items:center;margin:auto"><div class="label rv" style="justify-content:center">Start a conversation</div>
  <h2 class="rv d1">Let’s discuss<br><em>your project.</em></h2>
  <div class="btns rv d2" style="justify-content:center"><a class="btn fill" href="#enquire">Send an enquiry<i></i></a>${btn(wa, 'WhatsApp us')}${btn(tel, 'Call ' + C.phone)}</div></div>
</section>
<section class="lpform" id="enquire">
  <div><div class="label rv">Free site visit and quotation</div><h2 class="h2 rv d1">Tell us what you are <em>building.</em></h2>
  <p class="lead rv d2">Share a few details and we will call you back to understand the requirement, arrange a site visit where needed and send a clear quotation.</p>
  <p class="lead rv d2" style="margin-top:18px"><a href="${tel}"><b>${C.phone}</b></a></p></div>
  <form class="form rv d1" id="enq">
    <label>Name<input name="name" required autocomplete="name"></label>
    <label>Phone<input name="phone" type="tel" required autocomplete="tel"></label>
    <label>City<select name="city">${allAreas.map(a => `<option>${a}</option>`).join('')}<option>Other</option></select></label>
    <label>Service<select name="service">${services.map(s => `<option data-slug="${s.slug}">${s.name}</option>`).join('')}<option>Multiple services / not sure</option></select></label>
    <input type="hidden" name="email" value=""><input type="hidden" name="message" value="Enquiry from the landing page.">
    <div class="full btns" style="margin-top:8px"><button class="btn fill" value="whatsapp">Send on WhatsApp<i></i></button><a class="btn" href="${tel}">Request a call<i></i></a></div>
    <small class="full">No spam. Your message opens in WhatsApp, ready to send. Nothing is stored on this website.</small>
  </form>
</section>
<nav class="dots" aria-hidden="true"></nav>`,
}));

/* ---------- LEGAL (drafts: have them reviewed before launch) ---------- */
const legal = (file, title, inner) => files.push(page({ file, title: `${title} | ${C.name}`, desc: `${title} for the ${C.name} website.`, body: `<section class="wrap" style="padding-top:170px"><div class="label">Legal</div><h1 class="h2">${title}</h1><div class="prose">${inner}</div></section>` }));
legal('privacy.html', 'Privacy policy', `<p>This policy explains how ${C.name} ("we") handles information when you use this website.</p>
<h2>Information you send us</h2><p>The enquiry form does not store anything on this website. When you press send, your message opens in WhatsApp or in your own email app, and reaches us only if you send it. We then hold the name, phone number, email address and project details you chose to share.</p>
<h2>How we use it</h2><p>We use your details only to respond to your enquiry, prepare quotations and carry out any work you engage us for. We do not sell your information or share it for marketing.</p>
<h2>Third-party services</h2><p>This website loads fonts from Google Fonts and a map from Google Maps, and links to WhatsApp. These services may receive technical data such as your IP address under their own privacy policies.</p>
<h2>Cookies</h2><p>We do not set advertising or tracking cookies. The site keeps one small note in your browser so the opening animation plays only once per visit.</p>
<h2>Your choices</h2><p>You can ask us to correct or delete the details you sent us at any time by contacting us${C.email ? ` at <a href="mailto:${C.email}">${C.email}</a>` : ` on ${C.phone}`}.</p>
<h2>Contact</h2><p>${esc(C.name)}${C.address ? `, ${esc(C.address)}` : ''}. Phone ${C.phone}.</p>`);
legal('terms.html', 'Terms and conditions', `<p>By using this website you agree to the terms below.</p>
<h2>Website content</h2><p>The content here is general information about the services of ${C.name}. It is not a quotation or an offer. Scope, specifications, prices and timelines are confirmed only in a written quotation or agreement for each project.</p>
<h2>Photographs</h2><p>Photographs on this website are representative images used for illustration. They are not photographs of specific ${C.name} projects. Finishes and results vary with site conditions, materials and design.</p>
<h2>Intellectual property</h2><p>The text, photographs and design of this website belong to ${C.name} and may not be reused without written permission.</p>
<h2>External links</h2><p>This website links to third-party services such as WhatsApp and Google Maps. We are not responsible for their content or availability.</p>
<h2>Liability</h2><p>We take care to keep this website accurate, but we do not guarantee that it is free of errors, and we are not liable for loss arising from reliance on it.</p>
<h2>Governing law</h2><p>These terms are governed by the laws of India, with jurisdiction in the courts of Pune, Maharashtra.</p>
<h2>Contact</h2><p>Questions about these terms: ${C.email ? `<a href="mailto:${C.email}">${C.email}</a>` : `call ${C.phone}`}.</p>`);

/* ---------- SEO FILES ---------- */
if (C.url) writeFileSync(new URL('sitemap.xml', OUT), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${files.map(f => `<url><loc>${C.url}/${f === 'index.html' ? '' : f}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(new URL('robots.txt', OUT), `User-agent: *\nAllow: /\n${C.url ? `Sitemap: ${C.url}/sitemap.xml\n` : ''}`);
writeFileSync(new URL('.nojekyll', OUT), '');
writeFileSync(new URL('assets/favicon.svg', OUT), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#171411"/><text x="32" y="46" text-anchor="middle" font-family="Georgia,serif" font-size="40" fill="#B38F5B">${C.short[0]}</text></svg>`);
const base = C.url ? new URL(C.url + '/').pathname : '/';
writeFileSync(new URL('404.html', OUT), `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found | ${C.name}</title><link rel="stylesheet" href="${base}assets/style.css"><body class="ink" style="min-height:100vh;display:grid;place-items:center;text-align:center;padding:24px"><div><h1 style="font-size:clamp(60px,12vw,160px)">Page not <em>found.</em></h1><p style="margin:20px 0"><a class="btn fill" href="${base}">Back to home<i></i></a></p></div>`);
// Security headers, read by Cloudflare Pages and Netlify (GitHub Pages ignores this file; the meta tag above still applies there).
writeFileSync(new URL('_headers', OUT), `/*
  Content-Security-Policy: ${CSP}; frame-ancestors 'none'
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Cross-Origin-Opener-Policy: same-origin
`);
console.log('built', files.length, 'pages');
