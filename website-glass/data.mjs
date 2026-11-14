// EDIT THIS FILE, then run:  node build.mjs
// Everything marked TODO is a placeholder until the owner sends the real detail.

export const company = {
  name: 'Ashirwad Works',
  short: 'Ashirwad',
  tagline: 'One company. Complete architectural solutions.',
  phone: '+91 72493 87511',
  whatsapp: '917249387511',           // same number as the phone; change if WhatsApp is on another number
  email: '',                          // empty = hidden everywhere
  address: '',                        // empty = hidden everywhere
  mapQuery: 'Pune, Maharashtra',      // TODO exact address or Google Maps place name
  url: 'https://ashirwadworks.github.io',                            // final site address, no trailing slash, e.g. https://username.github.io/ashirwad-works (empty = no canonical/sitemap)
  social: { instagram: '', facebook: '', linkedin: '', youtube: '' }, // TODO full links; empty = hidden
  legacyYears: 35,
};

// photos = file names (without .jpg) inside site/assets/photos/. They are free-licence stock images
// (see site/assets/photos/CREDITS.txt) used as representative pictures. Swap in your own any time.
export const services = [
  {
    slug: 'architectural-glass', mega: 'glass', photos: ['glass-grid', 'railing-stairs', 'glass-office'],
    name: 'Architectural Glass',
    seo: 'Architectural Glass Work in Pune and Mumbai',
    line: 'Toughened, laminated, decorative and performance glass, cut and installed to size.',
    intro: 'Glass sets the character of a space. We supply and install architectural glass for doors, shopfronts, railings, canopies and interiors, and we match the glass type and thickness to the span, the load and the look each project calls for.',
    scope: ['Toughened glass', 'Laminated glass', 'Float glass', 'Frosted glass', 'Decorative glass', 'Lacquered glass', 'Tinted glass', 'Reflective glass', 'Insulated glass units (DGU)', 'Low-E glass', 'Glass railings', 'Glass canopies', 'Glass doors', 'Glass shopfronts', 'Custom glass installations'],
    apps: ['Showroom and retail shopfronts', 'Staircase, balcony and terrace railings', 'Entrance doors and canopies', 'Residential feature glass', 'Interior wall and back-painted glass'],
    materials: ['Toughened and laminated safety glass', 'DGU and Low-E glass for heat and sound control', 'Lacquered, frosted and tinted finishes', 'Stainless steel fittings and hardware'],
    benefits: ['Glass specified for safety and span', 'Clean edges and accurate alignment', 'More daylight with controlled heat gain', 'One team from site measurement to installation'],
  },
  {
    slug: 'structural-glazing', mega: 'glazing', photos: ['glass-towers', 'glass-roof', 'glass-tower-sky'],
    name: 'Structural Glazing',
    seo: 'Structural Glazing and Glass Façades in Pune and Mumbai',
    line: 'Glass façades, structural and spider glazing, skylights and curtain walls.',
    intro: 'A glazed façade is the face of a building. We design the fixing system with the architect, fabricate to the measured structure and install structural glazing, spider glazing and skylights that stay aligned, sealed and safe.',
    scope: ['Structural glazing', 'Spider glazing', 'Glass façades', 'Glass skylights', 'Aluminium curtain walls', 'Aluminium façade systems', 'Glazed entrances and lobbies'],
    apps: ['Commercial and corporate building façades', 'Lift lobbies and staircase shafts', 'Showroom frontages', 'Atriums and skylights', 'Residential towers'],
    materials: ['Toughened, laminated, reflective and DGU glass', 'Structural silicone systems', 'Spider fittings and stainless steel supports', 'Aluminium sub-frames and curtain wall sections'],
    benefits: ['Systems chosen for wind load and building height', 'Consistent joints across the elevation', 'Weather-tight sealing', 'Coordinated with cladding and windows'],
  },
  {
    slug: 'aluminium-windows', mega: 'windows', photos: ['window-row', 'window-frame', 'window-shade'],
    name: 'Aluminium Windows',
    seo: 'Aluminium Windows in Pune and Mumbai',
    line: 'Sliding, casement and slim-profile aluminium windows, louvers and custom fabrication.',
    intro: 'We fabricate and install aluminium windows for homes, offices and commercial buildings. Each opening is measured on site and the window is made to fit, so it slides, seals and locks the way it should.',
    scope: ['Aluminium sliding windows', 'Aluminium casement windows', 'Slim-profile aluminium windows', 'Aluminium louvers', 'Fixed glass windows', 'Custom aluminium fabrication'],
    apps: ['Apartments, villas and bungalows', 'Office and commercial buildings', 'Balcony and terrace openings', 'Service areas needing ventilation'],
    materials: ['Standard and slim-profile aluminium sections', 'Powder-coated and anodised finishes', 'Toughened, laminated and DGU glazing', 'Quality rollers, locks and gaskets'],
    benefits: ['Fabricated to the measured opening', 'Smooth operation and reliable sealing', 'Low maintenance and long service life', 'Slim frames that let in more light'],
  },
  {
    slug: 'aluminium-doors', mega: 'doors', photos: ['villa-doors', 'framed-partition', 'balcony'],
    name: 'Aluminium Doors',
    seo: 'Aluminium Doors and Shopfronts in Pune and Mumbai',
    line: 'Sliding, hinged and folding aluminium door systems and aluminium shopfronts.',
    intro: 'A door is used every day, so it has to be built well. We make aluminium sliding, hinged and folding doors and complete aluminium shopfronts, with hardware selected for the size and weight of each panel.',
    scope: ['Aluminium hinged doors', 'Aluminium sliding doors', 'Aluminium folding systems', 'Aluminium shopfronts', 'Balcony and terrace doors', 'Custom door fabrication'],
    apps: ['Living room and balcony openings', 'Office entrances and cabins', 'Shops and showrooms', 'Terraces and enclosures'],
    materials: ['Aluminium door sections', 'Toughened and laminated glass', 'Floor springs, hinges and sliding gear', 'Locks, handles and weather seals'],
    benefits: ['Wide openings with slim frames', 'Hardware matched to panel weight', 'Secure locking', 'Neat thresholds and finishing'],
  },
  {
    slug: 'shower-enclosures', mega: 'shower', photos: ['shower-marble', 'shower-walkin', 'shower-bath'],
    name: 'Shower Enclosures',
    seo: 'Shower Enclosures and Shower Cubicles in Pune and Mumbai',
    line: 'Frameless and semi-frameless enclosures, sliding and hinged doors, bathroom glass.',
    intro: 'A well-made shower enclosure keeps the bathroom dry and makes it feel larger. We design, cut and install enclosures and bathroom glass to the exact size of the space, with hardware chosen to last in wet conditions.',
    scope: ['Frameless shower enclosures', 'Semi-frameless shower enclosures', 'Sliding shower doors', 'Hinged shower doors', 'Fixed glass shower panels', 'Custom shower cubicles', 'Bathroom mirrors', 'Glass bathroom partitions', 'Premium bathroom glass solutions'],
    apps: ['Apartment and villa bathrooms', 'Hotel and serviced-apartment bathrooms', 'Compact bathrooms needing a fixed panel', 'Gym, club and spa shower areas'],
    materials: ['Toughened safety glass', 'Clear, frosted and tinted options', 'Corrosion-resistant hinges, sliders and handles', 'Water seals and threshold profiles'],
    benefits: ['Made to the measured bathroom, including out-of-square walls', 'Dry floors outside the shower area', 'Easy-to-clean surfaces', 'Neat silicone work and aligned hardware'],
  },
  {
    slug: 'office-partitions', mega: 'partition', photos: ['office-glass', 'framed-partition', 'conference'],
    name: 'Office Partitions',
    seo: 'Office Glass Partitions in Pune and Mumbai',
    line: 'Frameless, aluminium, double-glazed, acoustic and wooden partitions for workplaces.',
    intro: 'Partitions decide how an office works: who has privacy, where light reaches, how sound travels. We build glass, aluminium and wooden partition systems for cabins, conference rooms and open floors, and we coordinate them with ceilings, flooring and services.',
    scope: ['Frameless glass partitions', 'Aluminium glass partitions', 'Double-glazed partitions', 'Acoustic partitions', 'Wooden partitions', 'Executive cabin partitions', 'Conference room partitions', 'Office glass doors', 'Commercial space divisions'],
    apps: ['Corporate and IT offices', 'Executive cabins and meeting rooms', 'Co-working floors', 'Clinics, banks and showrooms', 'Reception and waiting areas'],
    materials: ['Toughened and laminated glass', 'Aluminium profile systems', 'Double glazing for sound control', 'Patch fittings, floor springs and door hardware', 'Frosted films and privacy bands'],
    benefits: ['Daylight carried deep into the floor', 'Privacy and sound control where it matters', 'Clean detailing at floor, ceiling and door junctions', 'Installation planned around working hours'],
  },
  {
    slug: 'acp-cladding', mega: 'cladding', photos: ['cladding-panels', 'stone-cladding', 'cladding-fins'],
    name: 'ACP Cladding',
    seo: 'ACP Panel Work and Exterior Cladding in Pune and Mumbai',
    line: 'ACP façades, building and shopfront cladding, signage backing structures.',
    intro: 'Cladding is the first thing people see and the layer that protects the wall behind it. We install aluminium composite panels and exterior finishes on a properly aligned framework, with attention to joints, corners and water management.',
    scope: ['ACP panel installation', 'Aluminium composite panel façades', 'Commercial building cladding', 'Exterior wall cladding', 'Shopfront cladding', 'Signage backing structures', 'Decorative exterior finishes'],
    apps: ['Commercial building elevations', 'Showroom and shopfront fascias', 'Building renovations and re-cladding', 'Signage and branding structures', 'Canopies and entrance features'],
    materials: ['Aluminium composite panels in a range of finishes', 'Aluminium and MS support framework', 'Weather sealants and backer rods', 'Combination with glazing and louvers'],
    benefits: ['Straight lines and consistent joint widths', 'A refreshed elevation without heavy civil work', 'Weather protection for the structure', 'Glazing and cladding handled by one team'],
  },
  {
    slug: 'custom-furniture', mega: 'furniture', photos: ['wardrobe-grey', 'wardrobe-open', 'wardrobe-wood'],
    name: 'Custom Furniture',
    seo: 'Custom Furniture and Interior Work in Pune and Mumbai',
    line: 'Workstations, reception counters, wardrobes, kitchens and wall panelling.',
    intro: 'We make furniture for the space it will live in. From office workstations and reception counters to wardrobes and kitchens, each piece is built to the site dimensions and finished to sit cleanly with the glass, flooring and walls around it.',
    scope: ['Custom furniture', 'Office workstations', 'Reception counters', 'Conference tables', 'Executive desks', 'Storage units', 'Modular furniture', 'Wardrobes', 'Kitchen furniture', 'Custom interior furniture', 'Wall panelling'],
    apps: ['Corporate offices and cabins', 'Reception and conference areas', 'Bedrooms, kitchens and living areas', 'Retail counters and display units'],
    materials: ['Plywood, MDF and engineered boards', 'Laminates, veneers and lacquered finishes', 'Glass and aluminium accents', 'Quality hinges, channels and hardware'],
    benefits: ['Built to the exact site dimensions', 'Finishes coordinated with the rest of the interior', 'Storage planned around how the space is used', 'Furniture and fit-out delivered together'],
  },
  {
    slug: 'flooring', mega: 'flooring', photos: ['lobby', 'floor-checker', 'floor-pattern'],
    name: 'Flooring',
    seo: 'Flooring and Tiling Contractors in Pune and Mumbai',
    line: 'Vitrified, ceramic and large-format tiling for floors, walls and bathrooms.',
    intro: 'Good tiling starts below the tile. We prepare the surface, plan the layout so cuts fall where they look right, and lay floors and walls level, with even joints and clean edges.',
    scope: ['Floor tiling', 'Wall tiling', 'Vitrified tiles', 'Ceramic tiles', 'Large-format tiles', 'Commercial flooring', 'Bathroom tiling', 'Complete flooring execution'],
    apps: ['Homes and apartments', 'Offices and commercial floors', 'Bathrooms and wet areas', 'Showrooms, restaurants and lobbies'],
    materials: ['Vitrified and ceramic tiles', 'Large-format slabs', 'Tile adhesives and levelling systems', 'Grouts and edge trims'],
    benefits: ['Level floors and aligned joints', 'Layouts planned before the first tile is laid', 'Proper slopes in wet areas', 'Coordinated with doors, partitions and furniture'],
  },
  {
    slug: 'painting', mega: 'painting', photos: ['paint-roller-blue', 'paint-roller', 'painting-wall'],
    name: 'Painting',
    seo: 'Painting and Finishing Contractors in Pune and Mumbai',
    line: 'Interior, exterior, texture and decorative finishes with proper preparation.',
    intro: 'A paint finish is only as good as the surface under it. We repair, fill and prepare walls before applying interior, exterior, texture and decorative finishes, so the result is even and lasts.',
    scope: ['Interior painting', 'Exterior painting', 'Texture painting', 'Decorative finishes', 'Commercial painting', 'Industrial painting', 'Wall finishing and surface preparation'],
    apps: ['Homes and apartments', 'Offices and commercial interiors', 'Building exteriors', 'Industrial and warehouse spaces'],
    materials: ['Interior and exterior emulsions', 'Texture and decorative coatings', 'Primers, putty and crack fillers', 'Industrial coatings where required'],
    benefits: ['Surface preparation done properly', 'Even colour and clean edges', 'Furniture, glass and floors protected during work', 'Sequenced with the other finishing trades'],
  },
  {
    slug: 'electrical-work', mega: 'electrical', photos: ['pendant', 'lights-truss', 'lights-restaurant'],
    name: 'Electrical Work',
    seo: 'Electrical Work for Homes and Offices in Pune and Mumbai',
    line: 'Wiring, power distribution, lighting, switches and electrical finishing.',
    intro: 'Electrical work has to be planned before walls, ceilings and furniture close it in. We carry out wiring, distribution, lighting and fittings for homes, offices and commercial spaces, coordinated with every other trade on the project.',
    scope: ['Residential electrical installations', 'Commercial electrical installations', 'Office electrical work', 'Lighting installation', 'Electrical wiring', 'Power distribution', 'Switches and fittings', 'Electrical finishing'],
    apps: ['Homes and apartments', 'Offices and workstations', 'Retail, restaurant and showroom lighting', 'Commercial fit-outs'],
    materials: ['Wires, cables and conduits', 'Distribution boards and protection devices', 'Modular switches and sockets', 'LED and architectural lighting'],
    benefits: ['Points planned around furniture and partitions', 'Neat, labelled distribution', 'Lighting that suits the space', 'No rework after the interiors are finished'],
  },
  {
    slug: 'air-conditioning', mega: 'cooling', photos: ['ac-living', 'ac-unit', 'lounge'],
    name: 'Air Conditioning',
    seo: 'Air Conditioning Installation in Pune and Mumbai',
    line: 'Split, cassette and ductable systems with HVAC coordination and finishing.',
    intro: 'Air-conditioning affects ceilings, electrical loads and partitions, so it works best when planned with them. We install split, cassette and ductable systems and coordinate piping, drainage and finishing with the rest of the interior.',
    scope: ['Split AC installation', 'Cassette AC installation', 'Ductable AC systems', 'Commercial air-conditioning', 'HVAC coordination', 'AC installation and related finishing'],
    apps: ['Homes and apartments', 'Offices, cabins and conference rooms', 'Showrooms, restaurants and clinics', 'Commercial floors'],
    materials: ['Split, cassette and ductable units', 'Copper piping and insulation', 'Drain lines and ducting', 'Grilles and diffusers'],
    benefits: ['Units placed for even cooling', 'Piping and drains concealed cleanly', 'Electrical load planned in advance', 'Ceilings and walls finished after installation'],
  },
  {
    slug: 'turnkey-projects', mega: 'turnkey', photos: ['lounge', 'reception', 'meeting'],
    name: 'Turnkey Projects',
    seo: 'Turnkey Interior Contractors in Pune and Mumbai',
    line: 'Glass, aluminium, furniture, flooring, painting, electrical and AC as one project.',
    intro: 'When several trades share one site, most delays come from the gaps between them. On a turnkey project we take responsibility for the full scope: one plan, one schedule and one point of contact, from the bare shell to the finished space. You can also hire us for any single service.',
    scope: ['Glass and glazing', 'Aluminium systems', 'Office partitions', 'ACP panels', 'Furniture', 'Flooring and tiling', 'Painting', 'Electrical installations', 'Air-conditioning', 'Interior finishing', 'Complete commercial interior execution'],
    apps: ['Corporate and IT office fit-outs', 'Retail showrooms and restaurants', 'Hotels and hospitality spaces', 'Clinics and educational spaces', 'Homes and villas'],
    materials: ['All glass, aluminium and cladding systems we install', 'Furniture and panelling built for the project', 'Flooring, paint and decorative finishes', 'Electrical and air-conditioning services'],
    benefits: ['One company accountable for the whole scope', 'Trades sequenced on one schedule', 'Fewer gaps and less rework between contractors', 'A single point of contact for the client and the architect'],
  },
];

export const projectCats = ['Architectural glazing', 'Aluminium windows', 'Shower enclosures', 'Office partitions', 'ACP and façade', 'Furniture', 'Commercial interiors', 'Residential interiors', 'Turnkey projects'];

// PROJECTS: your own completed work only (never stock photos). Put the photos in site/assets/projects/
// and list them here. The Projects page fills itself in; while this list is empty it shows a short note.
// { title: 'Office fit-out', location: 'Baner, Pune', category: 'Office partitions', description: '...', photos: ['baner-1.jpg', 'baner-2.jpg'] }
export const projects = [];

// TESTIMONIALS: real client words only. The section stays hidden while this list is empty.
// { quote: '...', name: 'Name', role: 'Architect, Firm name' }
export const testimonials = [];

export const industries = [
  { name: 'Residential', text: 'Apartments, villas and bungalows: windows, shower enclosures, railings, furniture and complete home interiors.' },
  { name: 'Commercial', text: 'Commercial buildings and complexes: façades, shopfronts, cladding and common-area finishing.' },
  { name: 'Corporate', text: 'Corporate and IT offices: partitions, cabins, conference rooms, workstations and full fit-outs.' },
  { name: 'Hospitality', text: 'Hotels, restaurants and cafés: glazing, bathroom glass, furniture and interior finishing.' },
  { name: 'Retail', text: 'Showrooms and stores: glass shopfronts, ACP fascias, display units and lighting.' },
  { name: 'Industrial', text: 'Factories and facilities: office blocks, louvers, glazing, industrial painting and electrical work.' },
  { name: 'Healthcare', text: 'Clinics and hospitals: easy-to-clean partitions, doors, flooring and coordinated services.' },
  { name: 'Educational', text: 'Schools, colleges and institutes: safe glazing, durable furniture and practical finishes.' },
];

export const process = [
  ['Consultation', 'We listen to the requirement, visit the site where needed and understand the drawings, the budget and the timeline.'],
  ['Measurement', 'We take site measurements, suggest suitable glass, systems and materials, and share a clear scope with a quotation.'],
  ['Fabrication', 'Glass, aluminium and furniture are prepared to the approved sizes and finishes before they reach the site.'],
  ['Installation', 'Our team installs and coordinates each trade in sequence, keeping the site clean and the schedule visible.'],
  ['Handover', 'We check alignment, operation and finish with you, close any snags and hand over the completed work.'],
];

export const why = [
  ['35 years of family legacy', 'The business has worked with glass and aluminium for three and a half decades. That knowledge sits behind every specification we recommend.'],
  ['Next-generation leadership', 'The next generation of the family now leads the company into professionally managed, larger-scale execution.'],
  ['Everything under one roof', 'Glass, aluminium, cladding, furniture, flooring, painting, electrical and air-conditioning from one accountable team.'],
  ['Attention to detail', 'Joints, alignments, sealant lines and hardware are where quality shows. We check them before you have to.'],
  ['Reliable coordination', 'We work to the architect’s drawings, coordinate with other agencies and keep clients informed at each stage.'],
  ['Projects of every size', 'From a single shower enclosure to a complete commercial fit-out, each job gets the same care.'],
];

export const areas = { primary: ['Pune', 'Pimpri-Chinchwad'], secondary: ['Mumbai', 'Thane', 'Navi Mumbai'] };
