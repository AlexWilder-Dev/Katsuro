// Everything the site says about Katsuro lives here: contact, links, hours,
// both menus, and the real review lines and Instagram posts it quotes.
// Sources are listed in research/notes.md.

export const contact = {
  name: 'Katsuro',
  tagline: 'Japanese restaurant',
  address: ['189 St John’s Hill', 'London SW11 1TH'],
  addressLine: '189 St John’s Hill, London SW11 1TH',
  phoneDisplay: '0207 854 6666',
  phoneHref: 'tel:+442078546666',
  email: 'hello@katsurolondon.com',
  instagram: '@katsurolondon',
  instagramUrl: 'https://www.instagram.com/katsurolondon/',
  googleRating: 4.8,
  googleReviewCount: 319,
  lat: 51.4599075,
  lng: -0.1779082,
}

const placeId = 'ChIJW2cgt90FdkgRsgt2EwTIEMU'
const q = encodeURIComponent('Katsuro, 189 St John’s Hill, London SW11 1TH')

export const links = {
  dojo: 'https://web.dojo.app/create_booking/vendor/Pmu5z3BZxT4WBdd2N6TCXT7FbL98xS9qB0L0NfrZy8g_restaurant',
  deliveroo: 'https://deliveroo.co.uk/menu/london/battersea/katsuro-st-johns-hill-189-st-johns-hill',
  uberEats: 'https://www.ubereats.com/gb/store/katsuro/EEVzrgTqR5yLYf2popvv5w',
  googleMaps: `https://www.google.com/maps/search/?api=1&query=${q}&query_place_id=${placeId}`,
  googleWalk: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent('Clapham Junction station, London')}&destination=${q}&destination_place_id=${placeId}&travelmode=walking`,
  appleMaps: `https://maps.apple.com/?daddr=${encodeURIComponent('189 St John’s Hill, London SW11 1TH')}&saddr=${encodeURIComponent('Clapham Junction')}&dirflg=w`,
  citymapper: `https://citymapper.com/directions?endcoord=51.4599075%2C-0.1779082&endname=Katsuro&endaddress=${encodeURIComponent('189 St John’s Hill, London SW11 1TH')}`,
}

// ---------------------------------------------------------------------------
// Hours. Homepage hours, confirmed by their live Dojo booking page.
// Times are minutes after midnight, London time. Day 0 = Sunday.

export type Session = { open: number; close: number; label: 'lunch' | 'dinner' | 'all day' }

const h = (hh: number, mm = 0) => hh * 60 + mm

export const weekHours: Record<number, Session[]> = {
  0: [{ open: h(12), close: h(21), label: 'all day' }],
  1: [{ open: h(12), close: h(15), label: 'lunch' }, { open: h(17, 30), close: h(22), label: 'dinner' }],
  2: [{ open: h(12), close: h(15), label: 'lunch' }, { open: h(17, 30), close: h(22), label: 'dinner' }],
  3: [{ open: h(12), close: h(15), label: 'lunch' }, { open: h(17, 30), close: h(22), label: 'dinner' }],
  4: [{ open: h(12), close: h(15), label: 'lunch' }, { open: h(17, 30), close: h(22), label: 'dinner' }],
  5: [{ open: h(12), close: h(15), label: 'lunch' }, { open: h(17, 30), close: h(22), label: 'dinner' }],
  6: [{ open: h(12), close: h(22), label: 'all day' }],
}

/** How the hours read on the page, grouped the way their homepage groups them. */
export const hoursRows = [
  { days: 'Mon – Fri', dayNums: [1, 2, 3, 4, 5], times: ['12pm – 3pm', '5.30pm – 10pm'] },
  { days: 'Saturday', dayNums: [6], times: ['12pm – 10pm'] },
  { days: 'Sunday', dayNums: [0], times: ['12pm – 9pm'] },
]

/** The lunch menu runs Mon–Fri 12–3 (printed lunch menu, Oct 2025). */
export const lunchMenuDays = [1, 2, 3, 4, 5]
export const lunchMenuHours = { open: h(12), close: h(15) }
export const lunchMenuLabel = 'Mon – Fri, 12pm – 3pm only'

// ---------------------------------------------------------------------------
// Menus. Main menu: katsurolondon.com/menu, with the sections that only
// appear on the printed menu (Jan 2026). Lunch: the printed lunch menu
// (Oct 2025), which is newer than the web lunch page.

export type Mark = 'V' | 'GF'

export type MenuItem = {
  name: string
  desc?: string
  price: number | { label: string; price: number }[]
  marks?: Mark[]
  cold?: boolean
  note?: string
}

export type MenuSection = {
  id: string
  title: string
  intro?: string
  items: MenuItem[]
}

export const setIncludes = [
  'rice',
  'cabbage salad',
  'katsu sauce',
  'miso soup',
  'pink salt',
  'pickles',
  'wasabi',
] as const

export const setIncludesLine =
  'All Katsu sets are served with rice, cabbage salad, katsu sauce, miso soup, pink salt, pickles and wasabi'

export const premiumNote = 'Our premium tonkatsu is intentionally cooked medium, with a slight pink centre for tenderness'

export const mainMenu: MenuSection[] = [
  {
    id: 'sets',
    title: 'Signature Set Menu',
    intro: setIncludesLine,
    items: [
      {
        name: 'Premium Tonkatsu',
        desc: 'Premium cut of pork loin, tender and richly marbled, truffle oil',
        price: 24,
        note: 'Only a limited number of portions available daily',
      },
      { name: 'Tonkatsu', desc: 'Pork Loin', price: 18.5 },
      { name: 'Menchi Katsu', desc: 'Homemade minced pork katsu (3pcs)', price: 18 },
      { name: 'Katsuro Special Combo', desc: 'Tonkatsu set + Menchi (1pc)', price: 22 },
      { name: 'Cheese Katsu', desc: 'Pork loin, mozzarella cheese', price: 22 },
      { name: 'Chicken Katsu', desc: 'Chicken thigh', price: 18.5 },
      { name: 'Ebi Katsu', desc: 'Extra large king prawns (4pcs), tartare sauce', price: 24 },
      { name: 'Veg Katsu Combo', desc: 'Crumbed tofu (6pcs), tamago Katsu (2pcs)', price: 20, marks: ['V'] },
      { name: 'Tamago Katsu', desc: 'Egg omelette katsu', price: 16, marks: ['V'] },
      { name: 'Tofu Katsu', desc: 'Crumbed tofu (6pcs)', price: 16, marks: ['V'] },
    ],
  },
  {
    id: 'add-ons',
    title: 'Add on Katsu / Extra',
    intro: 'For add-on only - not available on their own',
    items: [
      { name: 'Curry sauce', price: 4 },
      { name: 'Menchi Katsu (1pc)', desc: 'Minced pork katsu', price: 4.5 },
      { name: 'Chicken Katsu (1pc)', price: 7 },
      { name: 'Cheese Katsu (2pcs)', price: 9 },
      { name: 'Kaki Fry (2pcs)', desc: 'Deep fried oyster katsu', price: 6 },
      { name: 'Ebi Katsu (1pc)', price: 5.5 },
      { name: 'Tamago Katsu (2pcs)', desc: 'Egg omelette katsu', price: 6, marks: ['V'] },
      { name: 'Tofu Katsu (2pcs)', price: 4, marks: ['V'] },
      { name: 'Pumpkin croquettes (1pc)', price: 4.5, marks: ['V'] },
    ],
  },
  {
    id: 'curry',
    title: 'Katsu Curry Don / Udon (+£2)',
    intro: 'Served over rice - or switch to Udon for +£2.',
    items: [
      { name: 'Pork Loin', price: 16.5 },
      { name: 'Menchi (minced pork)', price: 15.5 },
      { name: 'Chicken Thigh', price: 16 },
      { name: 'Tamago', price: 15, marks: ['V'] },
      { name: 'Tofu', price: 15, marks: ['V'] },
    ],
  },
  {
    id: 'donburi',
    title: 'Donburi',
    items: [
      { name: 'Salmon Don', desc: 'Fresh salmon over rice (served raw)', price: 18, marks: ['GF'] },
      { name: 'Aburi Salmon Don', desc: 'Lightly seared fresh salmon over rice', price: 18.5, marks: ['GF'] },
    ],
  },
  {
    id: 'noodles',
    title: 'Noodles',
    intro: 'Add extra noodles (+£5)',
    items: [
      {
        name: 'Zaru Soba',
        desc: 'Cold dipping sauce, nori, wasabi, grated radish, spring onion, sesame seeds',
        price: 12,
        cold: true,
      },
      {
        name: 'Zaru Udon',
        desc: 'Cold dipping sauce, nori, wasabi, grated radish, spring onion, sesame seeds',
        price: 12,
        cold: true,
      },
      { name: 'Plain Udon', desc: 'Seaweed, warm kakejiru broth, bonito flake, tenkasu, sesame seeds', price: 12 },
    ],
  },
  {
    id: 'sashimi',
    title: 'Konbujime Salmon Sashimi',
    intro:
      'KONBUJIME is a technique used to enhance the taste of sashimi fish through ageing the fish between two sheets of kelp',
    items: [
      {
        name: 'Konbujime Salmon Sashimi',
        price: [
          { label: '4pcs', price: 12 },
          { label: '8pcs', price: 21 },
        ],
        marks: ['GF'],
      },
    ],
  },
  {
    id: 'hosomaki',
    title: 'Hosomaki',
    intro: '6pcs small sushi roll',
    items: [
      { name: 'Salmon Hosomaki', price: 6.5, marks: ['GF'] },
      { name: 'Cucumber Hosomaki', price: 5, marks: ['GF', 'V'] },
      { name: 'Avocado Hosomaki', price: 5, marks: ['GF', 'V'] },
    ],
  },
  {
    id: 'sides',
    title: 'Sides',
    items: [
      { name: 'Edamame', price: 6, marks: ['V'] },
      { name: 'Lotus Chips', desc: 'Served with edamame dip', price: 6.5, marks: ['V'] },
      { name: 'Chicken Karaage (5pcs)', price: 9.5 },
      { name: 'Menchi Katsu (1pc)', desc: 'Homemade minced pork katsu', price: 4.5 },
      { name: 'Ebi Katsu (1pc)', price: 5.5 },
      { name: 'Kaki Fry (2pcs)', desc: 'Deep fried oyster katsu', price: 6 },
      { name: 'Pork Gyoza (5pcs)', price: 6.5 },
      { name: 'Veg Gyoza (5pcs)', price: 6, marks: ['V'] },
      { name: 'Pumpkin croquettes (1pc)', price: 4.5, marks: ['V'] },
      { name: 'Takoyaki (5pcs)', price: 7.5 },
      { name: 'Miso Soup', price: 3, marks: ['V'] },
      { name: 'Steamed Rice', price: 3.5, marks: ['GF', 'V'] },
      { name: 'Sliced Cabbage', price: 3, marks: ['V'] },
    ],
  },
  {
    id: 'dessert',
    title: 'Dessert',
    items: [
      { name: 'Matcha Ice Cream', price: 4.5, marks: ['GF', 'V'] },
      { name: 'Mango Ice Cream', price: 4.8, marks: ['GF', 'V'] },
      { name: 'Red bean Dorayaki', price: 6.5, marks: ['V'] },
      {
        name: 'Custard Cream Dorayaki',
        desc: 'A classic Japanese dessert : fluffy pancakes with a gently sweet red bean/custard cream centre',
        price: 6.5,
        marks: ['V'],
      },
    ],
  },
]

export const lunchMenu: MenuSection[] = [
  {
    id: 'sando',
    title: 'Katsu Sando',
    intro: 'Japanese style katsu sandwich served with cabbage salad',
    items: [
      { name: 'Pork Katsu Sando', price: 11 },
      { name: 'Chicken Katsu Sando', price: 10 },
      { name: 'Tamago Katsu Sando', price: 10, marks: ['V'] },
    ],
  },
  {
    id: 'lunch-don',
    title: 'Donburi',
    intro: 'Served with pickles and miso soup',
    items: [
      { name: 'Pork Katsu Don', price: 13 },
      { name: 'Chicken Katsu Don', price: 12 },
      { name: 'Tofu Katsu Don', price: 12, marks: ['V'] },
      { name: 'Pork Katsu Mayo Don', price: 13 },
      { name: 'Chicken Katsu Mayo Don', price: 12 },
      { name: 'Chicken Karaage Mayo Don', price: 12 },
    ],
  },
  {
    id: 'lunch-curry',
    title: 'Curry Don / Udon (+£2)',
    intro: 'Served with pickles and miso soup',
    items: [
      { name: 'Pork Katsu', price: 13 },
      { name: 'Chicken Katsu', price: 12 },
      { name: 'Chicken Karaage', price: 12 },
      { name: 'Tofu Katsu', price: 12, marks: ['V'] },
    ],
  },
  {
    id: 'lunch-add',
    title: 'Add on Katsu',
    intro: 'For add-on only - not available on their own',
    items: [
      { name: 'Menchi Katsu (1pc)', desc: 'Minced pork katsu', price: 5 },
      { name: 'Chicken Katsu (1pc)', price: 7 },
      { name: 'Cheese Katsu (2pcs)', price: 9 },
      { name: 'Ebi Katsu (1pc)', price: 5.5 },
      { name: 'Tamago Katsu (2pcs)', desc: 'Egg omelette katsu', price: 6, marks: ['V'] },
      { name: 'Tofu Katsu (2pcs)', price: 4, marks: ['V'] },
    ],
  },
]

export const lunchUpgrade = 'Upgrade your donburi with fluffy tamago (Japanese scrambled egg) +£3 - not available with udon'

export const serviceNote =
  'A discretionary 12.5% service charge will be added to your bill. Please inform our staff of any allergies or dietary restrictions - we’ll do our best to accommodate you.'

export const refillNote = 'Get free rice & salad refill'

/** Seen on the counter or named in reviews. There's no published drinks list or prices. */
export const drinksSeen = ['draught beer', 'sake', 'umeshu', 'lemon sour', 'wine', 'tea']

// ---------------------------------------------------------------------------
// The set picker: each katsu set, how it's drawn on the tray, and a photo
// where Katsuro has one of that dish.

export type KatsuShape = 'cutlet' | 'menchi' | 'combo' | 'ebi' | 'veg-combo' | 'tamago' | 'tofu' | 'cheese' | 'chicken' | 'premium'

export type SetChoice = {
  id: string
  name: string
  short: string
  shape: KatsuShape
  photo?: { src: string; alt: string }
}

export const setChoices: SetChoice[] = [
  { id: 'premium', name: 'Premium Tonkatsu', short: 'Premium', shape: 'premium' },
  {
    id: 'tonkatsu',
    name: 'Tonkatsu',
    short: 'Tonkatsu',
    shape: 'cutlet',
    photo: { src: 'tonkatsu', alt: 'Tonkatsu cut into strips beside sesame-dressed cabbage on a ridged blue plate' },
  },
  { id: 'menchi', name: 'Menchi Katsu', short: 'Menchi', shape: 'menchi' },
  { id: 'combo', name: 'Katsuro Special Combo', short: 'Special Combo', shape: 'combo' },
  {
    id: 'cheese',
    name: 'Cheese Katsu',
    short: 'Cheese',
    shape: 'cheese',
    photo: { src: 'cheese', alt: 'Cheese katsu on a wire rack, mozzarella running from the cut' },
  },
  {
    id: 'chicken',
    name: 'Chicken Katsu',
    short: 'Chicken',
    shape: 'chicken',
    photo: { src: 'chicken', alt: 'A piece of chicken katsu lifted with chopsticks over the set' },
  },
  {
    id: 'ebi',
    name: 'Ebi Katsu',
    short: 'Ebi',
    shape: 'ebi',
    photo: { src: 'ebi-tray', alt: 'The Ebi Katsu set from above on its red-brown tray' },
  },
  { id: 'veg-combo', name: 'Veg Katsu Combo', short: 'Veg Combo', shape: 'veg-combo' },
  { id: 'tamago', name: 'Tamago Katsu', short: 'Tamago', shape: 'tamago' },
  {
    id: 'tofu',
    name: 'Tofu Katsu',
    short: 'Tofu',
    shape: 'tofu',
    photo: { src: 'tofu', alt: 'Six pieces of tofu katsu with black sesame on a wire rack' },
  },
]

/** The extras a set can take, from the printed "Add on Katsu / Extra" list. */
export const setAddOnIds = [
  'Curry sauce',
  'Cheese Katsu (2pcs)',
  'Menchi Katsu (1pc)',
  'Chicken Katsu (1pc)',
  'Kaki Fry (2pcs)',
  'Ebi Katsu (1pc)',
  'Tamago Katsu (2pcs)',
  'Tofu Katsu (2pcs)',
  'Pumpkin croquettes (1pc)',
]

// ---------------------------------------------------------------------------
// Real Google reviews, as shown in the reviews widget on katsurolondon.com.
// Quoted exactly; trimmed with an ellipsis where marked.

export type Quote = { text: string; name: string; date: string }

export const quotes = {
  best: { text: 'This place is hands down the best Tonkatsu in London.', name: 'Alex Mann', date: 'Feb 2026' },
  premium: {
    text: 'Highly recommend the premium tonkatsu, but be warned that they run out of this very quickly!',
    name: 'Chris Leong',
    date: 'Feb 2026',
  },
  soldOutByOne: {
    text: 'I visited around 1pm, and the Premium Katsu had already sold out, so I went for the Pork Katsu Curry instead — it was absolutely delicious.',
    name: 'Garry Goh',
    date: 'Dec 2025',
  },
  lunch: { text: 'Best katsu I have had outside of Japan. Lunch is unbelievable value.', name: 'L', date: 'Dec 2025' },
  lunchDeal: {
    text: 'delicious! service was quick (immediately got a table) and kind. katsu exceptionally crispy. lunch deal is great',
    name: 'Zakariya Saeed',
    date: 'Nov 2025',
  },
  book: {
    text: 'Don’t forget to make a reservation because the restaurant is very full.',
    name: 'Martin Law',
    date: 'Nov 2025',
  },
  walk: {
    text: 'I especially liked the open kitchen interior… Very good transport links too as the restaurant was situated only a 10-minute walk from Clapham Junction station.',
    name: 'Jungmin Yang',
    date: 'Feb 2026',
  },
  trek: {
    text: 'Made my way from Kingscross to try out Japanese style donkatsu… The best cheese katsu in London without a doubt.',
    name: 'SJ',
    date: 'Feb 2026',
  },
  twentyYears: {
    text: 'I’ve been dreaming of a proper tonkatsu place in London for about 20 years. This is it!',
    name: 'Euan Millar',
    date: 'Dec 2025',
  },
  dog: {
    text: 'One of the best Katsu’s I’ve had in London and the service was outstanding (+ you can bring your dog)',
    name: 'Antonio Beretsos',
    date: 'Dec 2025',
  },
  udon: { text: 'The warm broth healed my soul.', name: 'J C', date: 'Nov 2025' },
  tofu: { text: 'Great veggie option (tofu katsu)', name: 'Ollie Shires', date: 'Dec 2025' },
  local: {
    text: 'We are so lucky to have this five minute walk from where we live.',
    name: 'Helen Pinnington',
    date: 'Nov 2025',
  },
} satisfies Record<string, Quote>

// ---------------------------------------------------------------------------
// Their six latest Instagram posts (as of 18 Oct 2026), captions verbatim.

export const instagramPosts = [
  { code: 'DeeXS92DEw0', date: '14 Oct 2026', img: 'ebi', caption: 'Sea-riously (😉🌊) good crunch.\nEbi Katsu, golden, crispy and satisfying.\n\nOne for the prawn lovers!' },
  { code: 'DeURwzvMjft', date: '10 Oct 2026', img: 'aburi', caption: 'WOOO 🔥🔥\n\nThings are heating up around here…\nAburi Salmon Don, coming in hot.' },
  { code: 'DeOfjbcMjH-', date: '8 Oct 2026', img: 'tofu-curry', caption: 'Crispy outside. Soft inside.\nMeet our Tofu Katsu. 😉' },
  { code: 'Ddgyp7rM0L6', date: '20 Sep 2026', img: 'panko-reel', caption: 'The secret behind the crispy katsu 😉 the home made breadcurmbs using Japanese panko machine' },
  { code: 'DdY1gcCskHN', date: '17 Sep 2026', img: 'cheese-pull', caption: 'That moment when the cheese just keeps going… 🧀😂\nDiscover the joy of our iconic cheese katsu' },
  { code: 'DdEP5XNjD_p', date: '9 Sep 2026', img: 'table', caption: 'A table full of katsu, a few drinks, and good people around it.\nHere’s a little glimpse of you enjoying Katsuro😉' },
]

// ---------------------------------------------------------------------------
// Getting there. TfL walking route from Clapham Junction (639 m, 8 min) and
// the bus stops on St John's Hill either side of the restaurant.

export const walk = {
  minutes: 8,
  metres: 639,
  from: 'Clapham Junction',
  path: [
    [51.46301, -0.17048], [51.46293, -0.17076], [51.46288, -0.17096], [51.46285, -0.17108],
    [51.46275, -0.17143], [51.4626, -0.17178], [51.46245, -0.17214], [51.46233, -0.17239],
    [51.46215, -0.17262], [51.46191, -0.17309], [51.46176, -0.17335], [51.46165, -0.17355],
    [51.46154, -0.17376], [51.46141, -0.17399], [51.46117, -0.17443], [51.46096, -0.17479],
    [51.46084, -0.17501], [51.46075, -0.17523], [51.46066, -0.17549], [51.46052, -0.17612],
    [51.46035, -0.17682], [51.46005, -0.17776], [51.45999, -0.178],
  ] as [number, number][],
}

export const busStops = [
  { name: 'Brussels Road', lat: 51.46062, lng: -0.17553 },
  { name: 'Marcilly Road', lat: 51.45972, lng: -0.17922 },
]
export const busRoutes = ['37', '39', '87', '156', '170', '337']
