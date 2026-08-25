import { GoogleCalendarApiEvent } from '../types/calendar';

export const MOCK_GOOGLE_CALENDAR_EVENTS: GoogleCalendarApiEvent[] = [
  // =========================================================================
  // 🟦 22 SEPTEMBER 2026 (Tuesday) — ARRIVAL / SIRKECI
  // =========================================================================
  {
    id: 'ist26-0922-1',
    summary: '[IST26] Arrive at IST Airport',
    location: 'Istanbul Airport (IST), Tayakadın, 34283 Arnavutköy/İstanbul',
    start: { dateTime: '2026-09-22T17:00:00+03:00' },
    end: { dateTime: '2026-09-22T18:45:00+03:00' },
    description: `type: transport
fixed: true
what: Arrival, immigration, baggage collection and transfer into Istanbul.
why: The trip starts with a long airport-to-city transition, so the first evening should be intentionally light.
web: https://www.istairport.com/en/

notes: Clear immigration, collect luggage, use Havaist/private transfer, and head directly to Sirkeci.
Avoid: Do not schedule sightseeing before dinner.`
  },
  {
    id: 'ist26-0922-2',
    summary: '[IST26] Check-in — Sirkeci Hotel',
    location: 'Sirkeci, Fatih, 34110 İstanbul',
    start: { dateTime: '2026-09-22T19:00:00+03:00' },
    end: { dateTime: '2026-09-22T19:45:00+03:00' },
    description: `type: rest
fixed: true
what: Base for the full trip.
why: Sirkeci gives excellent access to Sultanahmet, Eminönü, ferries, T1 tram, Karaköy and Galata while retaining an old-Istanbul atmosphere.
web: https://www.regieottoman.com/

facts:
- Hotel style: Small, historic or Ottoman-style boutique property rather than a large chain.
- Current shortlist: Ferman Konak, Régie Ottoman, Sarnıç Hotel Ottoman Mansion, Sirkeci Mansion Hotel.

notes: Check in, drop luggage, freshen up and leave only for dinner.`
  },
  {
    id: 'ist26-0922-3',
    summary: '[IST26] Şehzade Cağ Kebap',
    location: 'Hobyar, Hoca Paşa Sk. No:6 D:4, 34112 Fatih/İstanbul',
    start: { dateTime: '2026-09-22T20:00:00+03:00' },
    end: { dateTime: '2026-09-22T21:00:00+03:00' },
    description: `type: food
fixed: false
what: Erzurum-style lamb cooked on a horizontal rotating spit and sliced onto small skewers.
why: A strong introduction to the fact that Turkish meat culture is regional and far broader than döner.
web: https://www.sehzadecagkebap.com
ig: sehzadecagkebap

facts:
- Marinated with onion, salt, and black pepper, cooked over wood embers.
- The horizontal spit and carving technique are unique to eastern Anatolia.

food: Start with 2–3 skewers each, eat with lavaş, onions and ezme, then add more if wanted.
notes: Look for: The horizontal spit and carving technique. Avoid: Keep dinner simple after the flight.`
  },
  {
    id: 'ist26-0922-4',
    summary: '[IST26] Return to hotel',
    location: 'Sirkeci, Fatih, 34110 İstanbul',
    start: { dateTime: '2026-09-22T21:05:00+03:00' },
    end: { dateTime: '2026-09-22T21:30:00+03:00' },
    description: `type: rest
fixed: false
what: Short walk back and end of the day.
why: Preserves energy for the first full historical day.

notes: Unpack and sleep early. Avoid: No additional sightseeing.`
  },

  // =========================================================================
  // 🟨 23 SEPTEMBER 2026 (Wednesday) — IMPERIAL ISTANBUL + ASIAN SHORE
  // =========================================================================
  {
    id: 'ist26-0923-1',
    summary: '[IST26] Simit & Turkish tea',
    location: 'Sirkeci / Sultanahmet, Istanbul',
    start: { dateTime: '2026-09-23T08:20:00+03:00' },
    end: { dateTime: '2026-09-23T08:45:00+03:00' },
    description: `type: food
fixed: false
what: A deliberately simple Istanbul breakfast.
why: Simit and tea are everyday city rituals and provide a useful contrast with the monumental morning ahead.

food: Choose a busy bakery or cart with high turnover; have simit plain or with cheese and strong çay.
notes: Avoid: Do not turn this into a large breakfast; Hamdi is the main lunch.`
  },
  {
    id: 'ist26-0923-2',
    summary: '[IST26] Topkapı Palace',
    location: 'Cankurtaran, 34122 Fatih/İstanbul',
    start: { dateTime: '2026-09-23T09:00:00+03:00' },
    end: { dateTime: '2026-09-23T11:00:00+03:00' },
    description: `type: visit
fixed: false
what: Ottoman imperial residence and administrative center for centuries.
why: This is where you understand how Ottoman political, ceremonial and domestic power was organized.
web: https://topkapisarayi.org/en/

facts:
- Follow the progression through the courtyards; prioritize Imperial Council, Treasury, Sacred Relics, kitchens and Bosphorus terraces.
- Look for: How every gate increases restriction and ceremonial importance.
- Optional: Harem only if queues are reasonable and timing remains comfortable.

notes: Avoid: Do not treat it like one European-style palace building.`
  },
  {
    id: 'ist26-0923-3',
    summary: '[IST26] Hagia Sophia',
    location: 'Sultan Ahmet, Ayasofya Meydanı No:1, 34122 Fatih',
    start: { dateTime: '2026-09-23T11:10:00+03:00' },
    end: { dateTime: '2026-09-23T12:20:00+03:00' },
    description: `type: visit
fixed: false
what: Justinian’s 537 imperial church, later Ottoman mosque, museum and mosque again.
why: Probably the single most important building in Istanbul; Byzantine engineering, Christian imagery, Ottoman Islamic additions and modern political history coexist here.
web: https://visit.istanbul/hagia-sophia-mosque

facts:
- Built in 537 AD by Byzantine Emperor Justinian I.
- Stood as the world's largest cathedral for nearly a millennium.
- Masterpiece of central dome engineering resting on massive pendentives.

notes: First stand still and understand the central dome and pendentives; then study mosaics, monumental calligraphy, mihrab and minarets. Look for: The way the dome appears almost suspended above a ring of windows. Avoid: Do not rush this stop.`
  },
  {
    id: 'ist26-0923-4',
    summary: '[IST26] Hippodrome',
    location: 'Binbirdirek, Sultan Ahmet Parkı, 34122 Fatih',
    start: { dateTime: '2026-09-23T12:25:00+03:00' },
    end: { dateTime: '2026-09-23T12:45:00+03:00' },
    description: `type: visit
fixed: false
what: The ceremonial and sporting heart of Byzantine Constantinople.
why: Chariot racing, imperial ceremony, mass politics and rebellion all intersected here.

facts:
- The central arena for Byzantine civic life and chariot racing rivalries (Blues vs Greens).
- Scene of the historic Nika Riots of 532 AD.

notes: Mentally reconstruct the huge missing stadium around today’s square. Look for: Egyptian Obelisk (Theodosius) and Serpent Column as surviving markers of the central spina.`
  },
  {
    id: 'ist26-0923-5',
    summary: '[IST26] Basilica Cistern',
    location: 'Alemdar, Yerebatan Cd. 1/3, 34110 Fatih',
    start: { dateTime: '2026-09-23T12:55:00+03:00' },
    end: { dateTime: '2026-09-23T13:40:00+03:00' },
    description: `type: visit
fixed: false
what: Vast 6th-century underground reservoir supported by 336 columns.
why: It reveals the hidden engineering infrastructure beneath imperial Constantinople.
web: https://yerebatan.com/en/

facts:
- Built in the 6th century under Emperor Justinian with 336 marble columns.
- Features two mysterious Medusa head column pedestals.

notes: First absorb the overall forest of columns, then find the Medusa heads. Look for: Reused architectural elements and variations between columns. Tip: Use timed/online entry if it materially reduces waiting.`
  },
  {
    id: 'ist26-0923-6',
    summary: '[IST26] Grand Bazaar',
    location: 'Beyazıt, 34126 Fatih/İstanbul',
    start: { dateTime: '2026-09-23T13:50:00+03:00' },
    end: { dateTime: '2026-09-23T14:40:00+03:00' },
    description: `type: walk
fixed: false
what: One of the world’s great historic commercial districts.
why: It demonstrates the architecture and organization of Ottoman trade, specialist crafts and commercial life.
web: https://visit.istanbul/grand-bazaar

notes: Walk through main vaulted streets, glance into hans and look upward at ceilings and architecture. Look for: How different streets historically specialized in particular trades. Avoid: Do not spend serious time shopping.`
  },
  {
    id: 'ist26-0923-7',
    summary: '[IST26] Hamdi Restaurant',
    location: 'Rüstem Paşa Mah. Kalçın Sk. No:11, Eminönü, Fatih',
    start: { dateTime: '2026-09-23T15:00:00+03:00' },
    end: { dateTime: '2026-09-23T16:30:00+03:00' },
    description: `type: food
fixed: true
what: Southeastern Turkish kebab restaurant overlooking Eminönü and the Golden Horn.
why: Both a food stop and an orientation stop; the view reconnects the Historic Peninsula with Galata and the waterfront.

food: Request an upper-floor/window table and order a small selection of meze plus one or two signature kebabs to share.
notes: Treat this 90-minute lunch as the day’s main rest period. Avoid: No separate café break immediately afterward.`
  },
  {
    id: 'ist26-0923-8',
    summary: '[IST26] Spice Bazaar',
    location: 'Rüstem Paşa, Erzak Ambarı Sok. No:92, 34116 Fatih',
    start: { dateTime: '2026-09-23T16:30:00+03:00' },
    end: { dateTime: '2026-09-23T16:55:00+03:00' },
    description: `type: walk
fixed: false
what: Compact 17th-century covered market.
why: Shows how food trade, spices, medicine and mosque endowments were linked in Ottoman Istanbul.
web: https://visit.istanbul/spice-bazaar

notes: Walk through, smell spices, inspect lokum and dried goods, then exit toward Eminönü. Avoid: No lengthy shopping detours.`
  },
  {
    id: 'ist26-0923-9',
    summary: '[IST26] Eminönü → Üsküdar ferry',
    location: 'Eminönü Ferry Pier to Üsküdar Pier',
    start: { dateTime: '2026-09-23T17:10:00+03:00' },
    end: { dateTime: '2026-09-23T17:30:00+03:00' },
    description: `type: transport
fixed: false
what: Regular Şehir Hatları public ferry crossing from Europe to Asia.
why: One of the most quintessential ways to understand Istanbul’s geography.
web: https://sehirhatlari.istanbul/

notes: Sit or stand outside, get tea and look back toward the Historic Peninsula. Look for: Relationship between Europe, Asia, the Bosphorus entrance and the skyline.`
  },
  {
    id: 'ist26-0923-10',
    summary: '[IST26] Üsküdar → Kuzguncuk',
    location: 'Kuzguncuk, Üsküdar, Istanbul',
    start: { dateTime: '2026-09-23T17:45:00+03:00' },
    end: { dateTime: '2026-09-23T18:30:00+03:00' },
    description: `type: walk
fixed: false
what: Transition into one of the Asian side’s most atmospheric historic neighborhoods.
why: Kuzguncuk provides a human-scale counterpoint to the imperial morning and reflects Muslim, Jewish, Greek and Armenian layers.

notes: Walk side streets and notice wooden houses, religious buildings and neighborhood scale. Avoid: Do not overextend the walk; dinner is the centerpiece.`
  },
  {
    id: 'ist26-0923-11',
    summary: '[IST26] İsmet Baba',
    location: 'Kuzguncuk, Çarşı Cd. No:1, 34674 Üsküdar/İstanbul',
    start: { dateTime: '2026-09-23T19:00:00+03:00' },
    end: { dateTime: '2026-09-23T21:00:00+03:00' },
    description: `type: food
fixed: true
what: Classic Bosphorus fish restaurant in Kuzguncuk.
why: The trip’s main fish + meze + rakı evening and an important Istanbul social ritual.

food: Ask what fish is genuinely best that day. Order: Start with 4–5 cold meze, add one hot seafood dish if worthwhile, then seasonal grilled fish.
drink: Rakı slowly with water.
notes: Aim for a waterside table.`
  },
  {
    id: 'ist26-0923-12',
    summary: '[IST26] Return via Üsküdar ferry',
    location: 'Üsküdar Pier to Eminönü/Karaköy Pier',
    start: { dateTime: '2026-09-23T21:15:00+03:00' },
    end: { dateTime: '2026-09-23T22:00:00+03:00' },
    description: `type: transport
fixed: false
what: Night crossing back to the European side.
why: The illuminated Historic Peninsula is worth seeing from the water after dark.
web: https://sehirhatlari.istanbul/

notes: Spend at least a few minutes outside enjoying the skyline.`
  },

  // =========================================================================
  // 🟩 24 SEPTEMBER 2026 (Thursday) — HISTORIC URBAN ROUTE + PERA
  // =========================================================================
  {
    id: 'ist26-0924-1',
    summary: '[IST26] Namlı Gurme breakfast',
    location: 'Kemankeş Karamustafa Paşa, Rıhtım Cd. No:1/1, Karaköy',
    start: { dateTime: '2026-09-24T08:00:00+03:00' },
    end: { dateTime: '2026-09-24T08:45:00+03:00' },
    description: `type: food
fixed: false
what: The trip’s one substantial Turkish breakfast.
why: A product-focused breakfast explains Turkish breakfast culture better than an oversized tourist spread.

food: Select several cheeses, olives, honey-kaymak, tomato/cucumber and eggs or menemen. Optional: Add sucuk if wanted.
notes: Avoid: Keep portions under control because this is the heaviest walking day.`
  },
  {
    id: 'ist26-0924-2',
    summary: '[IST26] Rüstem Paşa Mosque',
    location: 'Rüstem Paşa, Hasırcılar Cd. No:62, 34116 Fatih',
    start: { dateTime: '2026-09-24T09:00:00+03:00' },
    end: { dateTime: '2026-09-24T09:30:00+03:00' },
    description: `type: visit
fixed: false
what: Compact Sinan mosque raised above the market streets.
why: Perhaps the best İznik-tile experience in Istanbul and one of the city’s best architectural surprises.

facts:
- Masterpiece of Mimar Sinan built for Grand Vizier Rüstem Pasha in 1563.
- Densely covered in the finest ruby-red floral and geometric İznik tiles.

notes: Notice the modest approach from street level, then focus on the tile-covered interior.`
  },
  {
    id: 'ist26-0924-3',
    summary: '[IST26] Tahtakale & Uzunçarşı',
    location: 'Tahtakale & Uzunçarşı Cd., Fatih',
    start: { dateTime: '2026-09-24T09:35:00+03:00' },
    end: { dateTime: '2026-09-24T10:15:00+03:00' },
    description: `type: walk
fixed: false
what: Old working commercial streets of wholesalers, hans and specialist trades.
why: They show that historic Istanbul is not just preserved architecture; it is a commercial city that never stopped functioning.

notes: Observe porters, shopfronts and old courtyards. Look for: The continuity between historic trade routes and today’s commerce. Avoid: Long shopping detours.`
  },
  {
    id: 'ist26-0924-4',
    summary: '[IST26] Süleymaniye Mosque',
    location: 'Süleymaniye, Prof. Sıddık Sami Onar Cd. No:1, 34116 Fatih',
    start: { dateTime: '2026-09-24T10:40:00+03:00' },
    end: { dateTime: '2026-09-24T11:20:00+03:00' },
    description: `type: visit
fixed: false
what: Sinan’s great imperial mosque complex for Süleyman the Magnificent.
why: One of the clearest expressions of classical Ottoman architecture and state-sponsored urbanism.
web: https://visit.istanbul/suleymaniye-mosque

facts:
- Built between 1550 and 1557 by master architect Mimar Sinan.
- Unrivaled panoramic view overlooking the Golden Horn and Bosphorus.

notes: Enter through the courtyard and understand the complex as a whole before focusing on the prayer hall. Look for: Dome proportions and comparison with Hagia Sophia. Finish with: Golden Horn terrace and panorama.`
  },
  {
    id: 'ist26-0924-5',
    summary: '[IST26] Şehzadebaşı + Vefa',
    location: 'Kalenderhane, Şehzadebaşı Cd. No:44, Fatih',
    start: { dateTime: '2026-09-24T11:40:00+03:00' },
    end: { dateTime: '2026-09-24T12:55:00+03:00' },
    description: `type: walk
fixed: false
what: Şehzade Mosque, neighborhood streets and Vefa.
why: Şehzade shows an earlier stage in Sinan’s development while Vefa shifts the focus back toward lived urban culture.

notes: Keep the mosque relatively brief and then walk the neighborhood rather than jumping by taxi. Look for: Change in street texture and local scale. Includes tasting stop at Vefa Bozacısı.`
  },
  {
    id: 'ist26-0924-6',
    summary: '[IST26] Vefa Bozacısı',
    location: 'Mollagürani, Katip Çelebi Cd. No:104, 34093 Fatih',
    start: { dateTime: '2026-09-24T12:55:00+03:00' },
    end: { dateTime: '2026-09-24T13:30:00+03:00' },
    description: `type: food
fixed: false
what: Historic boza producer established in 1876.
why: One of the best examples of history surviving through continuously practiced food culture.
web: https://vefa.com.tr/

food: Order a small boza. Add: Cinnamon and roasted chickpeas (leblebi).
notes: Historic shop interior with Atatürk's drinking glass preserved. Avoid: Treat it as a tasting stop, not a long café break.`
  },
  {
    id: 'ist26-0924-7',
    summary: '[IST26] Zeyrek / Pantokrator',
    location: 'Zeyrek, Fazilet Sk. No:42, 34083 Fatih',
    start: { dateTime: '2026-09-24T13:35:00+03:00' },
    end: { dateTime: '2026-09-24T14:10:00+03:00' },
    description: `type: visit
fixed: false
what: Major 12th-century Byzantine monastic complex later converted into a mosque.
why: One of the best places to understand Byzantine Constantinople surviving inside Ottoman and modern Istanbul.

facts:
- Founded by Empress Irene Comnena and Emperor John II Comnenus in 1118-1136.
- Second largest surviving Byzantine religious edifice after Hagia Sophia.

notes: Study the brickwork and interconnected building volumes. Look for: Steep surrounding topography and Golden Horn relationship.`
  },
  {
    id: 'ist26-0924-8',
    summary: '[IST26] Quick local lunch (Esnaf Lokantası)',
    location: 'Fatih, Istanbul',
    start: { dateTime: '2026-09-24T14:15:00+03:00' },
    end: { dateTime: '2026-09-24T14:45:00+03:00' },
    description: `type: food
fixed: false
what: Simple esnaf-lokantası-style food.
why: Not every meal should be a destination restaurant; this shows everyday Istanbul cooking.

food: Choose a busy place with trays of cooked dishes visible. Order: One vegetable/olive-oil dish, one stew or meat dish, plus rice/bulgur and yogurt.
notes: Avoid: Keep it to about 30 minutes.`
  },
  {
    id: 'ist26-0924-9',
    summary: '[IST26] Rest buffer',
    location: 'Fatih / Golden Horn, Istanbul',
    start: { dateTime: '2026-09-24T14:45:00+03:00' },
    end: { dateTime: '2026-09-24T15:15:00+03:00' },
    description: `type: rest
fixed: false
what: Genuine downtime.
why: This is the hardest walking day and a proper pause improves the second half significantly.

notes: Sit, hydrate and charge phones. Avoid: Do nothing culturally productive.`
  },
  {
    id: 'ist26-0924-10',
    summary: '[IST26] Fatih → Çarşamba → Fener/Balat',
    location: 'Fener & Balat, Fatih',
    start: { dateTime: '2026-09-24T15:15:00+03:00' },
    end: { dateTime: '2026-09-24T16:15:00+03:00' },
    description: `type: walk
fixed: false
what: A compressed journey through neighborhoods with visibly different identities.
why: One of the best ways to understand Istanbul’s cultural geography.

notes: Keep Çarşamba brief and observational, then descend toward Fener/Balat. Look for: Change in architecture, churches, schools and historical minority presence. Avoid: Do not turn Balat into an Instagram-photo session.`
  },
  {
    id: 'ist26-0924-11',
    summary: '[IST26] Ayvansaray → Edirnekapı / City Walls',
    location: 'Theodosian Land Walls, Edirnekapı, Fatih',
    start: { dateTime: '2026-09-24T16:15:00+03:00' },
    end: { dateTime: '2026-09-24T17:00:00+03:00' },
    description: `type: visit
fixed: false
what: Surviving sections of the Theodosian land-wall system.
why: These defenses protected Constantinople for roughly a millennium, which makes the Ottoman conquest of 1453 much more meaningful.
web: https://whc.unesco.org/en/list/356/

notes: Find a point where the layered walls and towers are visually legible. Avoid: Do not continue to Yedikule; it was intentionally removed to save several hours.`
  },
  {
    id: 'ist26-0924-12',
    summary: '[IST26] Kariye / Chora',
    location: 'Dervişali, Kariye Cami Sk. No:18, 34087 Fatih',
    start: { dateTime: '2026-09-24T17:00:00+03:00' },
    end: { dateTime: '2026-09-24T17:50:00+03:00' },
    description: `type: visit
fixed: false
what: Late Byzantine church famous for extraordinary 14th-century mosaics and frescoes.
why: Arguably the trip’s best Byzantine art experience.

notes: Follow image sequences rather than jumping randomly between individual scenes. Look for: Anastasis fresco if accessible. Important: Recheck mosque-use access shortly before the trip. Key idea: Hagia Sophia is about space; Kariye is about narrative image and detail.`
  },
  {
    id: 'ist26-0924-13',
    summary: '[IST26] Transfer to Pera',
    location: 'Edirnekapı to Pera, Beyoğlu',
    start: { dateTime: '2026-09-24T17:50:00+03:00' },
    end: { dateTime: '2026-09-24T18:15:00+03:00' },
    description: `type: transport
fixed: false
what: Logistics jump from the outer Historic Peninsula to Beyoğlu.

notes: Take a taxi if traffic is reasonable; otherwise use public transport. Avoid: Treat this as transfer time, not sightseeing.`
  },
  {
    id: 'ist26-0924-14',
    summary: '[IST26] Pera / Asmalımescit walk',
    location: 'Asmalı Mescit, Beyoğlu',
    start: { dateTime: '2026-09-24T18:15:00+03:00' },
    end: { dateTime: '2026-09-24T18:50:00+03:00' },
    description: `type: walk
fixed: false
what: Transition into the 19th-century cosmopolitan European quarter.
why: The city suddenly changes from mosque-complex urbanism to embassies, apartment blocks, churches, hotels and nightlife.

notes: Look up at façades and building types. Key idea: Think of this as entering a different version of the same imperial capital.`
  },
  {
    id: 'ist26-0924-15',
    summary: '[IST26] Asmalı Cavit',
    location: 'Asmalı Mescit, Asmalı Mescit Cd. 16/D, 34430 Beyoğlu',
    start: { dateTime: '2026-09-24T19:00:00+03:00' },
    end: { dateTime: '2026-09-24T21:00:00+03:00' },
    description: `type: food
fixed: true
what: Classic Beyoğlu meyhane.
why: Meyhane culture is fundamentally about pacing, meze, rakı and conversation rather than one signature dish.

food: Start with about 5–6 cold meze, add 1–2 hot dishes, and only then consider fish or meat.
drink: Rakı slowly with water.
notes: Reserve ahead. Avoid: Do not rush the meal.`
  },
  {
    id: 'ist26-0924-16',
    summary: '[IST26] İstiklal + historic passages',
    location: 'İstiklal Cd., Beyoğlu',
    start: { dateTime: '2026-09-24T21:15:00+03:00' },
    end: { dateTime: '2026-09-24T22:00:00+03:00' },
    description: `type: walk
fixed: false
what: The old Grande Rue de Péra, including Çiçek Pasajı, Avrupa Pasajı and St. Antoine.
why: The strongest surviving public axis of late Ottoman cosmopolitan modernity.

notes: Look above storefronts and enter the passages. Optional: Step into St. Antoine if open. Avoid: Do not judge İstiklal only by today’s chain stores.`
  },
  {
    id: 'ist26-0924-17',
    summary: '[IST26] Firuzende',
    location: 'Bereketzade, Büyük Hendek Cd. No:72, Anemon Hotel Galata',
    start: { dateTime: '2026-09-24T22:10:00+03:00' },
    end: { dateTime: '2026-09-24T23:00:00+03:00' },
    description: `type: drink
fixed: false
what: Rooftop/view drink.
why: A visual decompression after the longest historical day.
ig: firuzendegalata

notes: Request the best Galata-facing table and order one drink. Look for: Roofscape, tower and vertical density of Galata. Avoid: Do not turn it into a second dinner.`
  },

  // =========================================================================
  // 🟧 25 SEPTEMBER 2026 (Friday) — GALATA + BOSPHORUS + MODERN ISTANBUL
  // =========================================================================
  {
    id: 'ist26-0925-1',
    summary: '[IST26] Simit / börek / tea',
    location: 'Galata, Beyoğlu, Istanbul',
    start: { dateTime: '2026-09-25T09:00:00+03:00' },
    end: { dateTime: '2026-09-25T09:20:00+03:00' },
    description: `type: food
fixed: false
what: Quick local breakfast.
why: Keeps the morning light and leaves room for Pera Palace and baklava later.

food: Choose either simit or börek with Turkish tea.
notes: Avoid: No large breakfast.`
  },
  {
    id: 'ist26-0925-2',
    summary: '[IST26] Galata neighborhood',
    location: 'Galata, Beyoğlu, Istanbul',
    start: { dateTime: '2026-09-25T09:20:00+03:00' },
    end: { dateTime: '2026-09-25T10:00:00+03:00' },
    description: `type: walk
fixed: false
what: Old Genoese port quarter later shaped by Jewish, Levantine, Ottoman and European communities.
why: Galata explains Istanbul’s long integration into Mediterranean and European trade.

notes: Walk side streets and notice the steep grades and masonry architecture. Look for: Views back toward the Historic Peninsula. Avoid: Do not make the Galata Tower queue the main objective.`
  },
  {
    id: 'ist26-0925-3',
    summary: '[IST26] Galata Mevlevihanesi',
    location: 'Şahkulu, Galip Dede Cd. No:15, 34420 Beyoğlu',
    start: { dateTime: '2026-09-25T10:00:00+03:00' },
    end: { dateTime: '2026-09-25T10:35:00+03:00' },
    description: `type: visit
fixed: false
what: Historic Mevlevi Sufi lodge.
why: It corrects the simplistic idea that Mevlevi culture is only “whirling dervishes.”

facts:
- Oldest Mevlevi lodge in Istanbul, founded in 1491.
- Focus on musical instruments, manuscripts and institutional Sufi culture.

notes: Key idea: Sema is a structured spiritual ritual, not simply entertainment.`
  },
  {
    id: 'ist26-0925-4',
    summary: '[IST26] İstiklal & Pera by daylight',
    location: 'İstiklal Cd. & Pera, Beyoğlu',
    start: { dateTime: '2026-09-25T10:40:00+03:00' },
    end: { dateTime: '2026-09-25T11:30:00+03:00' },
    description: `type: walk
fixed: false
what: Daytime architectural reading of Beyoğlu.
why: The previous evening was about atmosphere; this visit is about façades, balconies, passages and apartment buildings.

notes: Look up and read the architecture. Avoid: Do not repeat every stop from the previous night.`
  },
  {
    id: 'ist26-0925-5',
    summary: '[IST26] Pera Palace Hotel',
    location: 'Evliya Çelebi, Meşrutiyet Caddesi No:52, 34430 Tepebaşı/Beyoğlu',
    start: { dateTime: '2026-09-25T11:30:00+03:00' },
    end: { dateTime: '2026-09-25T12:15:00+03:00' },
    description: `type: visit
fixed: false
what: 1895 Belle Époque hotel built for the era of Orient Express travel.
why: One of the clearest symbols of late Ottoman modernization—electricity, elevators, international travel and luxury hospitality.
web: https://perapalace.com/en/

notes: Have tea or coffee and inspect the historic elevator, staircase and public rooms. Key context: The modernization story matters more than the Agatha Christie mythology.`
  },
  {
    id: 'ist26-0925-6',
    summary: '[IST26] Karaköy Güllüoğlu',
    location: 'Kemankeş Karamustafa Paşa, Kemankeş Cd. No:67, Karaköy',
    start: { dateTime: '2026-09-25T12:45:00+03:00' },
    end: { dateTime: '2026-09-25T13:05:00+03:00' },
    description: `type: food
fixed: false
what: Dedicated specialist baklava stop.
why: Better to experience serious baklava once than average baklava repeatedly.
web: https://www.karakoygulluoglu.com/

food: Order small portions. Start with: Classic pistachio baklava.
notes: Look for: Crispness, extremely thin pastry, butter aroma and syrup balance. Avoid: Do not overeat before the ferry.`
  },
  {
    id: 'ist26-0925-7',
    summary: '[IST26] ~90-minute Şehir Hatları Bosphorus ride',
    location: 'Karaköy Ferry Terminal to Bosphorus Strait',
    start: { dateTime: '2026-09-25T13:20:00+03:00' },
    end: { dateTime: '2026-09-25T14:50:00+03:00' },
    description: `type: transport
fixed: false
what: Regular public ferry rather than a tourist cruise.
why: Probably the best geographic lesson of the entire trip.
web: https://sehirhatlari.istanbul/

notes: Sit outside, move between sides of the deck and drink tea. Look for: Waterfront palaces, mosques, yalıs, bridges, Ortaköy, Arnavutköy/Bebek and the relationship between Europe and Asia.`
  },
  {
    id: 'ist26-0925-8',
    summary: '[IST26] Nişantaşı → Bomonti',
    location: 'Nişantaşı to Bomonti, Şişli',
    start: { dateTime: '2026-09-25T15:00:00+03:00' },
    end: { dateTime: '2026-09-25T17:30:00+03:00' },
    description: `type: walk
fixed: false
what: Modern Istanbul section.
why: After several days of Byzantium and Ottoman history, this shows contemporary residential, fashion, café and creative life.

notes: Walk rather than chase landmarks. Look for: Apartment architecture, boutiques, street life and the transition toward Bomonti’s industrial heritage.`
  },
  {
    id: 'ist26-0925-9',
    summary: '[IST26] Bomonti / free time',
    location: 'Bomonti, Şişli, Istanbul',
    start: { dateTime: '2026-09-25T17:30:00+03:00' },
    end: { dateTime: '2026-09-25T18:45:00+03:00' },
    description: `type: optional
fixed: false
what: Breathing room before the concert night.
why: Prevents the second half of the day from feeling rushed.

notes: Walk, sit, have coffee or rest. Avoid: Do not add another major attraction.`
  },
  {
    id: 'ist26-0925-10',
    summary: '[IST26] Dönerci Aydın 1979',
    location: 'Cumhuriyet, Silahşör Cd. No:63, 34380 Şişli',
    start: { dateTime: '2026-09-25T19:00:00+03:00' },
    end: { dateTime: '2026-09-25T20:00:00+03:00' },
    description: `type: food
fixed: false
what: Dedicated yaprak döner meal using visible slices of whole meat rather than a heavily minced mixture.
why: Gives the trip its proper döner experience and contrasts nicely with the horizontal cağ kebabı from night one.

food: Visually check the spit and order simply.
notes: Avoid: Heavy sauces and oversized sides. Tip: Keep portions moderate because the concert and kokoreç follow.`
  },
  {
    id: 'ist26-0925-11',
    summary: '[IST26] Bomontiada',
    location: 'Merkez, Silahşör Cad. Birahane Sok. No:1, 34384 Şişli',
    start: { dateTime: '2026-09-25T20:00:00+03:00' },
    end: { dateTime: '2026-09-25T21:00:00+03:00' },
    description: `type: drink
fixed: false
what: Former industrial brewery complex reused as a cultural and social destination.
why: A clear example of contemporary Istanbul repurposing industrial heritage.

notes: Have one drink and rest. Tip: Stay close to Babylon. Avoid: Do not eat another meal.`
  },
  {
    id: 'ist26-0925-12',
    summary: '[IST26] Gevende @ Babylon',
    location: 'Babylon Bomontiada, Merkez Mah. Silahşör Cad. No:1, Şişli',
    start: { dateTime: '2026-09-25T21:30:00+03:00' },
    end: { dateTime: '2026-09-25T23:30:00+03:00' },
    description: `type: concert
fixed: true
what: The trip’s contemporary live-music anchor.
why: Ensures the visitor experiences Istanbul as a city still producing culture rather than merely preserving its past.
web: https://www.babylon.com.tr/

notes: Arrive 20–30 minutes early. Important: Treat this as fixed; daytime delays should not jeopardize it. Recheck: Doors/show time shortly before the date.`
  },
  {
    id: 'ist26-0925-13',
    summary: '[IST26] Kokoreç',
    location: 'Bomonti / Şişli, Istanbul',
    start: { dateTime: '2026-09-25T23:45:00+03:00' },
    end: { dateTime: '2026-09-26T00:30:00+03:00' },
    description: `type: optional
fixed: false
what: Seasoned lamb intestine/offal roasted on a horizontal spit, chopped and served in bread.
why: Quintessential Turkish late-night food and exactly the right context after a concert.

food: Choose a busy specialist with high turnover. Order: Start with a half bread.
notes: Important: İşkembe will be handled separately. Status: Venue still TBD.`
  },

  // =========================================================================
  // 🟪 26 SEPTEMBER 2026 (Saturday) — EASY FINAL DAY + DEPARTURE
  // =========================================================================
  {
    id: 'ist26-0926-1',
    summary: '[IST26] Simit / börek / tea',
    location: 'Sirkeci, Fatih, Istanbul',
    start: { dateTime: '2026-09-26T09:30:00+03:00' },
    end: { dateTime: '2026-09-26T10:00:00+03:00' },
    description: `type: food
fixed: false
what: Deliberately light final breakfast.
why: Keeps the morning relaxed and leaves appetite for lunch.

food: Choose either simit or börek with tea.
notes: Avoid: Do not eat heavily.`
  },
  {
    id: 'ist26-0926-2',
    summary: '[IST26] Flexible final walk',
    location: 'Sirkeci & Eminönü, Istanbul',
    start: { dateTime: '2026-09-26T10:00:00+03:00' },
    end: { dateTime: '2026-09-26T12:00:00+03:00' },
    description: `type: walk
fixed: false
what: Intentionally unprogrammed time.
why: By this point the visitor knows what they personally enjoyed most.

notes: Revisit one favorite area, buy a small gift, take missed photographs or sit in a café. Important: Stay reasonably close to Sirkeci. Avoid: Do not introduce another major attraction.`
  },
  {
    id: 'ist26-0926-3',
    summary: '[IST26] Final lunch — TBD',
    location: 'Sirkeci, Fatih, Istanbul',
    start: { dateTime: '2026-09-26T12:15:00+03:00' },
    end: { dateTime: '2026-09-26T13:15:00+03:00' },
    description: `type: food
fixed: false
what: Final local meal near the hotel.
why: Cağ kebabı and yaprak döner are already covered, so this is a good slot for a quality ocakbaşı or classic kebab meal.

food: Quality ocakbaşı or classic kebab meal.
notes: Prioritize quality and proximity over traveling across town for a famous name. Avoid: Do not make it an overly heavy meal before the airport.`
  },
  {
    id: 'ist26-0926-4',
    summary: '[IST26] Coffee / last walk',
    location: 'Sirkeci / Gülhane, Istanbul',
    start: { dateTime: '2026-09-26T13:15:00+03:00' },
    end: { dateTime: '2026-09-26T14:30:00+03:00' },
    description: `type: rest
fixed: false
what: Low-pressure final hour in the city.
why: Provides decompression rather than another sightseeing obligation.

notes: Have Turkish coffee or espresso and sit somewhere pleasant. Important: Return to the hotel comfortably before departure prep.`
  },
  {
    id: 'ist26-0926-5',
    summary: '[IST26] Hotel / luggage',
    location: 'Sirkeci Hotel, Istanbul',
    start: { dateTime: '2026-09-26T14:30:00+03:00' },
    end: { dateTime: '2026-09-26T15:15:00+03:00' },
    description: `type: rest
fixed: true
what: Pack, collect luggage, check documents, charge devices and settle hotel matters.
why: Eliminates last-minute airport stress.

notes: Be fully ready to leave by 15:15. Avoid: No sightseeing from this point onward.`
  },
  {
    id: 'ist26-0926-6',
    summary: '[IST26] Leave Sirkeci for IST',
    location: 'Sirkeci to Istanbul Airport (IST)',
    start: { dateTime: '2026-09-26T15:15:00+03:00' },
    end: { dateTime: '2026-09-26T17:00:00+03:00' },
    description: `type: transport
fixed: true
what: Airport transfer. Flight: 20:00.
why: Targeting approximately 17:00 arrival at IST provides a comfortable three-hour international-departure buffer.
web: https://www.istairport.com/en/

notes: Leave even if traffic currently looks light. Avoid: Do not push the final city time later.`
  },
  {
    id: 'ist26-0926-7',
    summary: '[IST26] Flight departure',
    location: 'Istanbul Airport (IST)',
    start: { dateTime: '2026-09-26T20:00:00+03:00' },
    end: { dateTime: '2026-09-26T23:00:00+03:00' },
    description: `type: transport
fixed: true
what: End of trip. Flight departure 20:00.

notes: Clear international departures security and board flight home.`
  }
];
