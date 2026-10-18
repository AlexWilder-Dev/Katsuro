# Katsuro: research notes

Researched 18 October 2026. Everything below comes from a source named next to it. Anything not found is listed under "Unknowns".

## Still trading?

Yes.

- Instagram @katsurolondon (4,534 followers, 105 posts) posted on 14 Oct, 10 Oct, 8 Oct, 20 Sep, 17 Sep and 9 Sep 2026 (`research/instagram-latest.json`).
- Their Dojo booking page is live. On 18 Oct 2026 it showed bookings enabled for parties of 1 to 8, with availability for two on every day from 19 Oct to 1 Nov 2026.
- Their Google reviews widget (googrev on the Wix site) reports **4.8 from 319 Google reviews**. The cached reviews run from 28 Oct 2025 to 19 Feb 2026 (`research/google-reviews-widget.json`). The widget only shows reviews rated 3 stars and above.
- Open since about late summer 2025. Menu items were created on Wix on 24 Jun 2025, and a blog post dated 8 Sep 2025 calls it "brand new" (rollinjoint.com).

## Sources

| Source | Result |
|---|---|
| katsurolondon.com (home, menu JSON, about, order, menus, book) | Read in full. The menu JSON is embedded in the page. |
| Wix static media and video | All 14 listed images, plus 2 About-page photos, the hero video and the 4 Order-page images (not used) |
| Instagram | The embed view worked: bio counts, 6 latest posts with captions and images |
| Google reviews | Read through their own site's widget API: 100 reviews, with names, dates and ratings |
| Dojo | GraphQL responses: opening times, party sizes, availability |
| Thatsup (updated 6 Jun 2026) | Hours (gives 5pm, not 5.30pm, for the evening), Google 4.8 from 248 reviews, "Dog-friendly", "Accessible toilet", "Takeaway", "Walk-in" |
| WagIt | "Dogs are very welcome inside the restaurant, provided they remain on a lead." |
| Luxeat Guide | Counter, "Open daily", chef-owner with experience in Korea, Japan and Australia, "Call in advance to make sure they premium tonkatsu that day" |
| TfL API | Walking route from Clapham Junction (639 m, 8 min, all along St John's Hill) and nearby bus stops |
| Nominatim (OSM) | 51.4599075, -0.1779082 |
| **Could not reach** | Google Maps place panel (captcha, 403 on the maps JS), Square Meal, TripAdvisor, Restaurant Guru, Deliveroo and Uber Eats (403 or Cloudflare), Nappy Valley Net (Cloudflare), YouTube (429). Their content reached me only as search-engine snippets: Square Meal "compact... long counter where chefs prepare and plate", "soft drinks and tea to a modest list of beer and sake"; TripAdvisor 5.0 from 6 reviews. |

## Photos: what each one shows and where it goes

Wix originals are in `research/images/`, Instagram images in `research/instagram/`, and the video in `research/video/`.

| File | What it shows | Use |
|---|---|---|
| `74ef0d…png` logo | Orange sliced cutlet (6 slices, ragged edges), KATSURO in black Noto Sans CJK Bold, "Japanese restaurant", a red stamp with カツ路 in white | Header, favicon, og.jpg; the traced cutlet becomes the video mask and the tray katsu |
| `65909c…f000.jpg` hero poster | Cheese katsu lifted with chopsticks on a wire rack, ridged grey-teal plate, low amber light, letterboxed | Poster for the video, cheese katsu in the set picker |
| hero video `ca4f4f_65909c…` (18 s, 1080p) | Cheese katsu; plating with greens; katsu draining on a rack over the fryer; the cream noren over the pass; tonkatsu on a ridged plate | First screen, cut into the cutlet shape |
| `59b74e…jpg` share image | Tonkatsu, cut side showing, sesame-dressed cabbage, lemon, ridged blue plate | Tonkatsu / Premium Tonkatsu photo; og.jpg base |
| `ca9ad3…png`, `af1714…png`, `641ffb…png` | Painted top-down set trays (Premium, Cheese, Ebi): rice, miso, sauce, salt and wasabi on a slate, pickles, plate of katsu on a wooden tray | Composition reference only. Probably commissioned or generated art. The real Ebi tray photo below is better evidence. |
| `cc442b…jpg` | Two chefs in black T-shirts and denim aprons with tan leather straps and brass rings; the apron carries the orange cutlet and the カツ路 tag; one spoons sauce into a small white flower dish; stainless kitchen, warm light | Story / team |
| `42ba20…jpg` | Pounding pork loin flat on red boards, tray of cutlets, egg trays, stainless counter | Story ("every plate starts with quality ingredients") |
| `7baccf…jpg` | Chicken katsu lifted with chopsticks; rice with black sesame in a black bowl; pickles in a flower dish; wasabi and salt behind | Chicken katsu photo |
| `c3f431…jpg` | Shopfront at dusk: black fascia, black awning with white KATSURO / Japanese restaurant, lit sign with the cutlet in yellow-orange, brass plaque, oak chairs, menus in the window, Deliveroo and "DOG FRIENDLY" stickers | Visit page |
| `0eecfd…jpg` | Bottles on the oak counter: Dassai 45, Choya Original umeshu, Crescendo Pinot Grigio, Dominio de la Fuente Garnacha, Ormarine Picpoul de Pinet; cast-iron teapot | Drinks note |
| `27924d…jpg` | Tofu katsu (6 pieces, black sesame) on a wire rack, red-brown tray, miso | Tofu / Veg combo photo |
| `cd97b1…jpg`, `de854c…jpg` (About page) | Two of the team in Katsuro aprons (denim, tan) outside the shop; inside, a KATSURO wall sign, a lightbox of the cutlet and a red カツ路 sign | Story / team. **Names not published anywhere, so none are used.** |
| `716c50…jpg`, `a7eec8…jpg` printed menus | Main and lunch menus (transcribed below) | Data |
| IG `DdEP5XNjD_p_2` | **The counter**: diners on stools at a pale-oak counter facing the open stainless kitchen; cream noren panels over the pass printed KATSURO / カツ路 / outlined cutlet; stacks of black and red bowls; orange poster "GET FREE RICE & SALAD REFILL" | Room / counter |
| IG `DdEP5XNjD_p_1` | Narrow room: ledge seating along the wall, oak tables and chairs, wall sconces, framed posters, server in a tan apron, daylight from the front | Room |
| IG `DeeXS92DEw0_2` | **Top-down Ebi Katsu set** on a red-brown tray over an oak table: pickles in a flower dish (top left), wasabi and pink salt on a small grey dish (top right), tartare (right), miso (bottom right), rice with black sesame (bottom left), ridged plate with rack, cabbage, lemon, cherry tomato | The layout the "set, laid out" tray copies |
| IG `DeeXS92DEw0_0/1`, `DeOfjbcMjH-`, `DeURwzvMjft`, `DdY1gcCskHN`, `Ddgyp7rM0L6`, `DdEP5XNjD_p_0` | Ebi katsu set; ebi close-up; tofu katsu curry with lotus chip; aburi salmon don being torched; cheese pull with udon spread; reel cover (ebi, chef cutting, tonkatsu, curry); table spread | Instagram strip, dish photos |
| Order page `08d1b8…png`, `494b88…png` | Computer-generated images (delivery box, phone "calling") | **Not used**. Kept in `research/order-page-not-used/`. The other two files there are the Deliveroo and Uber Eats app logos. |

## The room

- Black shopfront: black fascia and awning, white KATSURO and "Japanese restaurant", a lit sign with the cutlet, a brass plaque by the door. A "DOG FRIENDLY" sticker is on the glass.
- Inside: **pale oak everywhere** (counter front, tables, Scandinavian-style chairs, wall ledge), set against **stainless steel** in the open kitchen. Over the pass hang **cream noren panels** printed in black with KATSURO, a カツ路 stamp and an **outline of the cutlet**. Sets come on **red-brown trays** with **ridged blue-grey glazed plates**, **wire racks**, **black bowls**, and a **flower-shaped pickle dish**.
- Light: warm and amber at night (spotlights, sconces, the lit sign); bright and oak-coloured by day (Instagram).
- Reviewers: "clean, minimalist décor" (Elena T.), "bright, with tasteful Japanese décor and well-spaced seating" (Garry Goh), "No frills about the restaurant but clean and authentic inside" (Callum Campbell), "cosy", "calm, tidy atmosphere", "I especially liked the open kitchen interior" (Jungmin Yang).
- Counter seating faces the kitchen: confirmed by the IG counter photo and by Square Meal.

## How they talk about themselves

- Site: "We make real Japanese Katsu - crispy, tender, unforgettable." "Bringing a taste of Tokyo to Clapham Junction."
- About: "we do one thing, and we do it well: Japanese Katsu, our head chef / owner's soul food." "crispy pork loin, juicy chicken thigh, or fresh breadcrumbs". "We're not trying to be fancy. We just want to make honest, good food in a place where you'll always feel welcome, whether it's your first visit or your fiftieth." "small but almighty team… kitchens across Japan, Korea and Australia".
- Instagram: short lines, puns and winks. "Crispy outside. Soft inside. Meet our Tofu Katsu. 😉" "Sea-riously (😉🌊) good crunch." "Aburi Salmon Don, coming in hot." "The secret behind the crispy katsu 😉 the home made breadcurmbs using Japanese panko machine" "A table full of katsu, a few drinks, and good people around it."
- So: plain, warm and a bit cheeky. Never grand. The new copy keeps to short sentences, their phrases, and no flourish.

## Who comes when

- **Weekday lunch (12–3)**: locals and people near Clapham Junction. The lunch menu (sandos £10–11, dons £12–13) is the value draw: "Lunch is unbelievable value." (L), "lunch deal is great" (Zakariya Saeed), "At £12/13 it felt reasonable" (Callum Campbell), "We would return to try their lunch as well, because the lunch menu is different." (katie man). The Premium Tonkatsu can be gone by 1pm (Garry Goh). Solo diners are common.
- **Evenings**: the busy shift. "Don't forget to make a reservation because the restaurant is very full." (Martin Law). "booked online which I would suggest as they do get quite busy" (Shesaid Hesaid). Couples, families, friends, and a lot of people who travel in: from King's Cross (SJ), a little over 30 minutes on the Overground (Kyumin, translated from Korean), "Worth the trek" (J L), "worth coming all the way to this neighborhood" (Jiwon Kokomong Kim). There's a large Korean and East Asian following.
- **Weekends**: open all day, sets only. "should consider offering katsu don on weekends too" (Tenshi Lau) confirms the lunch dons are weekday-only.
- **Takeaway**: Deliveroo, Uber Eats, and phone-ahead collection ("Place your order to collect them when you arrive", from the Order page). Takeaway is good too, but katsu eaten hot is better (Kyumin, translated from Korean).
- **Dog owners**: welcome on a lead (WagIt, window sticker, Thatsup, and reviews by Garry Goh, Antonio Beretsos and Dan Webb).

## What reviewers praise

Crisp, light, "not greasy" panko and juicy pork; cheese katsu ("The best cheese katsu in London without a doubt", SJ); the Premium Tonkatsu and its truffle oil; generous portions; value; friendly, quick service; the open kitchen; sesame-dressed cabbage; the plain udon ("The warm broth healed my soul.", J C); tofu katsu as the veggie option; kaki fry (oyster) and desserts (red bean); draught beer, sake, umeshu and lemon sour; "only a 10-minute walk from Clapham Junction station" (Jungmin Yang).

## What reviewers complain about

- Premium Tonkatsu sold out (John O'Brien twice, Garry Goh at 1pm, Soyeon P, Shesaid Hesaid).
- Service sometimes curt: "Most (but not all) staff were surly" (John O'Brien), "very average service… the male waiter" (Will), told to wait outside when early for a booking, "almost thrown out the door" at 10pm (Eloise).
- Slippery floor (Ivan, Diane Dejaño, Jonathan M); music too loud (Shami Ahmad).
- Pork loin sometimes dry, miso a bit plain, curry sauce thin or mild (a minority).
- Add-on portions small (Nk Wong); non-alcoholic drinks "a bit meh" (Jonathan M).

The site can't fix service or floors. It can set expectations that help: book for evenings, come early or ring ahead for the Premium, and use the counter for solo walk-ins.

## Hours: sources and the call

| Source | Mon–Fri | Sat | Sun |
|---|---|---|---|
| Homepage | 12–3pm, 5.30–10pm | 12–10pm | 12–9pm |
| Dojo (live, 18 Oct 2026) | 12:00–15:00, 17:30–22:00 (Monday included) | 12:00–22:00 | 12:00–21:00 |
| Thatsup (Jun 2026) | 12–3pm, 5–10pm | 12–10pm | 12–9pm |
| Web lunch menu (Wix, updated 22 Aug 2025) | Lunch "Tue - Fri 12:00 - 15:00 Only" | – | – |
| Printed lunch menu (uploaded 11 Oct 2025) | Lunch "Mon - Fri. 12:00 - 15:00 Only" | – | – |

**Decision**: show the homepage hours, which the live Dojo hours confirm. Label the lunch menu **Mon–Fri 12–3pm**, following the newer printed lunch menu, which also matches the homepage and Dojo's Monday lunch slot. The web lunch page's "Tue – Fri" is older (Aug 2025). This is flagged for the owner. Google Maps itself could not be reached.

## Menus: web vs print

- **Main**: the web menu (Wix) and the print menu (uploaded 26 Jan 2026, the same day the web Noodles section was edited) **agree on every shared price**. The print menu adds the Premium Tonkatsu note ("intentionally cooked medium, with a slight pink centre for tenderness"), "Homemade" on the Menchi, and whole sections that are only in print: Add on Katsu / Extra (incl. curry sauce £4), Konbujime Salmon Sashimi, Hosomaki, Dessert, Sides, and the 12.5% service charge line.
- **Dietary marks differ**: the web marks Zaru Soba and Zaru Udon as Vegetarian, but the print menu doesn't (it gives them a blue snowflake, meaning cold). The site follows print and shows **no V on the zaru noodles**. Flagged.
- **Lunch**: print (Oct 2025) is **£1 higher** than the web (Aug 2025) on every don and curry don: Pork Katsu Don 13 vs 12, Chicken Katsu Don 12 vs 11, Tofu Katsu Don 12 vs 11, Pork Katsu Mayo Don 13 vs 12, Chicken Katsu Mayo Don 12 vs 11, Chicken Karaage (Mayo) Don 12 vs 11, Pork Katsu Curry 13 vs 12, Chicken Katsu Curry 12 vs 11, Chicken Karaage Curry 12 vs 11, Tofu Katsu Curry 12 vs 11. Sandos match (11 / 10 / 10). The web says "Chicken Karaage Don" where print says "Chicken Karaage Mayo Don". Only print has the tamago upgrade (+£3, not with udon) and the lunch add-ons. A review from 10 Nov 2025 quotes "£12/13", so **print prices are used**.
- **Add-on Menchi** is £5 on the lunch menu and £4.50 on the main menu. Both are shown as printed.
- **Drinks**: not on either menu. Seen or mentioned: draught beer, sake (Dassai 45 bottle), umeshu (Choya), lemon sour, wine (Pinot Grigio, Garnacha, Picpoul bottles), tea, soft drinks. No prices anywhere, so the site lists none.

## Other facts used

- Free rice and salad refills: orange poster on the counter, IG 9 Sep 2026: "GET FREE RICE & SALAD REFILL" (small print unreadable).
- Homemade panko from their own Japanese panko machine (IG reel, 20 Sep 2026).
- Online booking for 1–8 through Dojo; Dojo offers an enquiry route for bigger parties.
- 12.5% discretionary service charge; allergy line (print menus).
- Walk: 639 m, about 8 minutes, all along St John's Hill (TfL). Buses 37, 39, 87, 156, 170 and 337 stop at Brussels Road and Marcilly Road on St John's Hill (TfL). Google place ID ChIJW2cgt90FdkgRsgt2EwTIEMU.

## Unknowns (left out of the site)

Staff names, including the owner's; founding date; drinks list and prices; last-orders times; whether the lunch menu can be collected; whether there's step-free access (Thatsup says "Accessible", unverified, so it's left out); seat count; refill conditions; Deliveroo and Uber Eats ratings (blocked).

## Design reasoning

- **Palette** comes from the logo and the room. Cutlet orange `#EE9145` and stamp red `#B50000` are sampled from the logo PNG; ink black is the shopfront and logo type. Noren cream `#EADBB9` is from the curtain over the pass, pale oak from the counter and tables, red-brown from the set trays, and blue-grey glaze from the ridged plates. Wix's CSS adds the peach `#F9DDB1` and burnt orange `#D24E01`. The cream replaces the peach, because the peach is a Wix theme colour that isn't in the room.
- **Type**: the logo's KATSURO is Noto Sans CJK Bold (checked by rendering it side by side), and "Japanese restaurant", the printed menus and the noren lettering are the same family. So the whole site uses Noto Sans JP, which also sets カツ路 properly. The Wix CSS fonts (Avenir Heavy, Helvetica, DIN Next) are template defaults, not brand.
- **Layout** comes from the print menus (dotted leaders, red section heads, the green sprig for Vegetarian, the circled GF), the noren (three cream panels as the header) and the tray (the set picker copies the real top-down Ebi set photo). The first screen cuts their own hero video into the logo's six slices.
- **Shift**: weekday lunch uses the bright oak and cream of their daytime Instagram photos. From 5.30pm the site goes to the black and amber of the shopfront at night.

## What the owner most wants this site to do

1. Fill the counter and tables through Dojo, with booking one tap away for the busy evenings and weekends ("very full, make a reservation").
2. Put the whole menu, sides and desserts included, in readable text on a phone, replacing a JPG with a "look elsewhere" note.
3. Sell weekday lunch (sandos from £10, dons from £12, 12–3) and get people ringing ahead, to collect or to check the limited Premium Tonkatsu is still on.
