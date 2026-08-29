import { GoogleCalendarApiEvent } from '../types/calendar';

export const MOCK_GOOGLE_CALENDAR_EVENTS: GoogleCalendarApiEvent[] = [
  // =========================================================================
  // 🟦 22 SEPTEMBER 2026 (Tuesday) — ARRIVAL + FIRST TASTE OF ISTANBUL
  // =========================================================================
  {
    id: 'ist26-0922-1',
    summary: '[IST26] Arrive IST → Sirkeci Hotel',
    location: 'Istanbul Airport (IST) to Sirkeci, Istanbul',
    start: { dateTime: '2026-09-22T17:00:00+03:00' },
    end: { dateTime: '2026-09-22T19:15:00+03:00' },
    description: `type: transport
fixed: true
what: Arrival, immigration, baggage collection and transfer to Sirkeci.
why: Sirkeci keeps the Historic Peninsula, Eminönü ferries, T1 and Karaköy within easy reach.
web: https://www.istairport.com/en/

notes: Keep the evening light. No sightseeing after check-in.
avoid: Do not schedule sightseeing before dinner.`
  },
  {
    id: 'ist26-0922-2',
    summary: '[IST26] Şehzade Cağ Kebap',
    location: 'Hobyar, Hoca Paşa Sk. No:6 D:4, 34112 Fatih/İstanbul',
    start: { dateTime: '2026-09-22T20:00:00+03:00' },
    end: { dateTime: '2026-09-22T21:00:00+03:00' },
    description: `type: food
fixed: false
what: Erzurum-style lamb cooked on a horizontal rotating spit.
why: Strong first introduction to regional Turkish food and a useful contrast with vertical döner.
web: https://www.sehzadecagkebap.com
ig: sehzadecagkebap

facts:
- Marinated with onion, salt, and black pepper, cooked over wood embers.
- The horizontal spit and carving technique are unique to eastern Anatolia.

food: Start with a few skewers, lavaş, onions and ayran. Order more only if wanted.
notes: Look for the horizontal spit and wood-fire embers.`
  },
  {
    id: 'ist26-0922-3',
    summary: '[IST26] Return to Hotel',
    location: 'Sirkeci, Fatih, 34110 İstanbul',
    start: { dateTime: '2026-09-22T21:00:00+03:00' },
    end: { dateTime: '2026-09-22T21:30:00+03:00' },
    description: `type: rest
fixed: false
what: Simple close to the arrival day.
why: Preserves energy for the first full sightseeing day.

notes: No additional program. Sleep early and reset.`
  },

  // =========================================================================
  // 🟨 23 SEPTEMBER 2026 (Wednesday) — IMPERIAL CORE + MARKETS + KOKOREÇ + HAMDI + GALATA VIEW
  // =========================================================================
  {
    id: 'ist26-0923-1',
    summary: '[IST26] Simit & Turkish Tea',
    location: 'Sirkeci / Sultanahmet, Istanbul',
    start: { dateTime: '2026-09-23T08:20:00+03:00' },
    end: { dateTime: '2026-09-23T08:45:00+03:00' },
    description: `type: food
fixed: false
what: Simple everyday Istanbul breakfast.
why: Keeps the morning local and light.
food: Fresh simit, strong tea, perhaps a little cheese. Keep it quick.

[Google Images](https://www.google.com/search?tbm=isch&q=Istanbul+simit+tea)`
  },
  {
    id: 'ist26-0923-2',
    summary: '[IST26] Topkapı Palace',
    location: 'Cankurtaran, 34122 Fatih/İstanbul',
    start: { dateTime: '2026-09-23T09:00:00+03:00' },
    end: { dateTime: '2026-09-23T11:00:00+03:00' },
    description: `type: visit
fixed: false
what: Ottoman imperial residence and administrative center.
why: Shows how Ottoman power was organized through gates, courtyards and progressively restricted zones.
do: Prioritize Imperial Council, Treasury, Sacred Relics, kitchens and Bosphorus terraces. Harem only if timing allows.

[Official](https://topkapisarayi.org/en/)
[Instagram](https://www.google.com/search?q=site%3Ainstagram.com+Topkapi+Palace)
[Images](https://www.google.com/search?tbm=isch&q=Topkapi+Palace+Istanbul)`
  },
  {
    id: 'ist26-0923-3',
    summary: '[IST26] Transition to Hagia Sophia',
    location: 'Sultanahmet Square, 34122 Fatih/İstanbul',
    start: { dateTime: '2026-09-23T11:00:00+03:00' },
    end: { dateTime: '2026-09-23T11:20:00+03:00' },
    description: `type: transport
fixed: false
what: Deliberate buffer for exiting Topkapı and entering Hagia Sophia.
why: A 10-minute transfer is too optimistic in real conditions.
notes: Deliberate buffer to navigate visitor crowds and security lines.`
  },
  {
    id: 'ist26-0923-4',
    summary: '[IST26] Hagia Sophia',
    location: 'Sultan Ahmet, Ayasofya Meydanı No:1, 34122 Fatih/İstanbul',
    start: { dateTime: '2026-09-23T11:20:00+03:00' },
    end: { dateTime: '2026-09-23T12:40:00+03:00' },
    description: `type: visit
fixed: false
what: Justinian’s 537 church, later Ottoman mosque, museum and mosque again.
why: The single most important building of the trip.
do: First understand the dome and pendentives. Then mosaics, giant Islamic calligraphy, mihrab and Ottoman additions. Do not rush.

[Web](https://visit.istanbul/hagia-sophia-mosque)
[Instagram](https://www.google.com/search?q=site%3Ainstagram.com+Hagia+Sophia+Istanbul)
[Images](https://www.google.com/search?tbm=isch&q=Hagia+Sophia+Istanbul)`
  },
  {
    id: 'ist26-0923-5',
    summary: '[IST26] Hippodrome',
    location: 'Binbirdirek, Sultan Ahmet Parkı No:2, 34122 Fatih/İstanbul',
    start: { dateTime: '2026-09-23T12:40:00+03:00' },
    end: { dateTime: '2026-09-23T13:00:00+03:00' },
    description: `type: visit
fixed: false
what: Ceremonial and sporting center of Byzantine Constantinople.
why: Chariot racing, imperial ritual and politics converged here.
do: Use the Obelisk and Serpent Column to reconstruct the lost stadium mentally.

[Web](https://www.google.com/search?q=Hippodrome+of+Constantinople)`
  },
  {
    id: 'ist26-0923-6',
    summary: '[IST26] Basilica Cistern',
    location: 'Alemdar, Yerebatan Cd. 1/3, 34110 Fatih/İstanbul',
    start: { dateTime: '2026-09-23T13:10:00+03:00' },
    end: { dateTime: '2026-09-23T13:55:00+03:00' },
    description: `type: visit
fixed: false
what: Vast 6th-century underground reservoir supported by 336 columns.
why: Reveals the engineering infrastructure beneath imperial Constantinople.
do: Take in the full column forest before focusing on the Medusa heads.

[Official](https://yerebatan.com/en/)
[Instagram](https://www.google.com/search?q=site%3Ainstagram.com+Basilica+Cistern)`
  },
  {
    id: 'ist26-0923-7',
    summary: '[IST26] Grand Bazaar',
    location: 'Beyazıt, 34126 Fatih/İstanbul',
    start: { dateTime: '2026-09-23T14:10:00+03:00' },
    end: { dateTime: '2026-09-23T14:45:00+03:00' },
    description: `type: walk
fixed: false
what: Historic commercial district of covered streets, bedestens and hans.
why: The point is Ottoman commercial urbanism, not shopping.
do: Walk main axes. Look upward. Enter a han if convenient. No serious shopping.`
  },
  {
    id: 'ist26-0923-8',
    summary: '[IST26] Kokoreççiler Kralı Zülfü Usta',
    location: 'Mercan / Uzunçarşı, Fatih/İstanbul',
    start: { dateTime: '2026-09-23T14:45:00+03:00' },
    end: { dateTime: '2026-09-23T15:15:00+03:00' },
    description: `type: food
fixed: false
what: Quick kokoreç tasting between the Grand Bazaar and Eminönü.
why: Adds a classic street-food experience without spoiling dinner.
food: Half-bread kokoreç is enough. Keep it quick and light.

[Web](https://www.google.com/search?q=Kokorecciler+Krali+Zulfu+Usta)
[Images](https://www.google.com/search?tbm=isch&q=Kokorecciler+Krali+Zulfu+Usta)`
  },
  {
    id: 'ist26-0923-9',
    summary: '[IST26] Spice Bazaar',
    location: 'Rüstem Paşa, Erzak Ambarı Sok. No:92, 34116 Fatih/İstanbul',
    start: { dateTime: '2026-09-23T15:20:00+03:00' },
    end: { dateTime: '2026-09-23T15:50:00+03:00' },
    description: `type: walk
fixed: false
what: Compact 17th-century market linked historically to the New Mosque complex.
why: Shows how food trade, commerce and religious endowments interacted.
do: Keep it short. Do not turn it into a shopping session.`
  },
  {
    id: 'ist26-0923-10',
    summary: '[IST26] Hotel / Eminönü Rest Buffer',
    location: 'Sirkeci / Eminönü, Istanbul',
    start: { dateTime: '2026-09-23T16:00:00+03:00' },
    end: { dateTime: '2026-09-23T18:30:00+03:00' },
    description: `type: rest
fixed: false
what: Flexible rest window before dinner.
why: Prevents the first major sightseeing day from becoming exhausting.
notes: Rest, recharge devices, relax at the hotel or enjoy an easy tea by the waterfront.`
  },
  {
    id: 'ist26-0923-11',
    summary: '[IST26] Hamdi Restaurant',
    location: 'Rüstem Paşa, Kalçın Sk. No:11, 34116 Fatih/İstanbul',
    start: { dateTime: '2026-09-23T19:00:00+03:00' },
    end: { dateTime: '2026-09-23T21:00:00+03:00' },
    description: `type: food
fixed: true
what: Southeastern Turkish kebabs and meze with views over Eminönü, Galata and the Golden Horn.
why: Strong dinner finale after a Historic Peninsula day.
food: Request an upper-floor/window table. Keep ordering focused.
reservation: Reserved

[Official](https://www.hamdi.com.tr/)
[Images](https://www.google.com/search?tbm=isch&q=Hamdi+Restaurant+Istanbul)`
  },
  {
    id: 'ist26-0923-12',
    summary: '[IST26] Firuzende',
    location: 'Bereketzade, Büyük Hendek Cd. No:35, 34421 Beyoğlu/İstanbul',
    start: { dateTime: '2026-09-23T21:30:00+03:00' },
    end: { dateTime: '2026-09-23T22:30:00+03:00' },
    description: `type: drink
fixed: false
what: Rooftop/view drink overlooking Galata.
why: Low-effort visual finale to the day.
do: One drink. Ask for a Galata-facing table. No second dinner.
ig: firuzendegalata

[Images](https://www.google.com/search?tbm=isch&q=Firuzende+Galata)`
  },

  // =========================================================================
  // 🟩 24 SEPTEMBER 2026 (Thursday) — HISTORIC URBAN ROUTE + KARIYE + PERA
  // =========================================================================
  {
    id: 'ist26-0924-1',
    summary: '[IST26] Namlı Gurme Breakfast',
    location: 'Kemankeş Karamustafa Paşa, Rıhtım Cd. No:1/1, 34425 Beyoğlu/İstanbul',
    start: { dateTime: '2026-09-24T08:00:00+03:00' },
    end: { dateTime: '2026-09-24T08:45:00+03:00' },
    description: `type: food
fixed: false
what: The trip’s one proper Turkish breakfast.
why: High-quality breakfast products instead of a giant tourist spread.
food: Artisanal cheeses, olives, honey-kaymak and eggs. Keep to 45 minutes.`
  },
  {
    id: 'ist26-0924-2',
    summary: '[IST26] Rüstem Paşa Mosque',
    location: 'Rüstem Paşa, Hasırcılar Cd. No:62, 34116 Fatih/İstanbul',
    start: { dateTime: '2026-09-24T09:00:00+03:00' },
    end: { dateTime: '2026-09-24T09:30:00+03:00' },
    description: `type: visit
fixed: false
what: Compact Sinan mosque hidden above market streets.
why: One of Istanbul’s finest İznik-tile interiors.
do: Focus on the extraordinary variety of İznik floral tiles and the market-approach elevation.`
  },
  {
    id: 'ist26-0924-3',
    summary: '[IST26] Tahtakale & Uzunçarşı',
    location: 'Tahtakale, Fatih/İstanbul',
    start: { dateTime: '2026-09-24T09:35:00+03:00' },
    end: { dateTime: '2026-09-24T10:15:00+03:00' },
    description: `type: walk
fixed: false
what: Working historic market streets with hans, wholesalers and specialist trades.
why: Shows commercial Istanbul as a living system.
do: Look into historic hans, observe wholesale commerce, and avoid tourist detours.`
  },
  {
    id: 'ist26-0924-4',
    summary: '[IST26] Süleymaniye Mosque',
    location: 'Süleymaniye, Prof. Sıddık Sami Onar Cd. No:1, 34116 Fatih/İstanbul',
    start: { dateTime: '2026-09-24T10:40:00+03:00' },
    end: { dateTime: '2026-09-24T11:20:00+03:00' },
    description: `type: visit
fixed: false
what: Sinan’s monumental imperial complex for Süleyman the Magnificent.
why: One of the clearest expressions of classical Ottoman architecture.
do: Courtyard → interior → Golden Horn terrace. Compare the dome concept with Hagia Sophia.`
  },
  {
    id: 'ist26-0924-5',
    summary: '[IST26] Zeyrek / Pantokrator',
    location: 'Zeyrek, Fazilet Sk. No:8, 34083 Fatih/İstanbul',
    start: { dateTime: '2026-09-24T11:40:00+03:00' },
    end: { dateTime: '2026-09-24T12:20:00+03:00' },
    description: `type: visit
fixed: false
what: Major 12th-century Byzantine monastic complex later converted into a mosque.
why: Shows Byzantine Constantinople embedded directly into later Istanbul.
do: Examine brickwork, triple-church structure and neighborhood topography.`
  },
  {
    id: 'ist26-0924-6',
    summary: '[IST26] Tarihi Malta Esnaf Lokantası',
    location: 'Fatih / Zeyrek, Istanbul',
    start: { dateTime: '2026-09-24T12:45:00+03:00' },
    end: { dateTime: '2026-09-24T13:25:00+03:00' },
    description: `type: food
fixed: false
what: Light esnaf-lokantası lunch.
why: Keeps the day local, fast and light before the evening meyhane.
food: Prefer soup + zeytinyağlı / vegetable dish + yogurt or cacık. Avoid heavy meat and large portions.`
  },
  {
    id: 'ist26-0924-7',
    summary: '[IST26] Transfer to Fener / Balat',
    location: 'Zeyrek to Fener/Balat, Istanbul',
    start: { dateTime: '2026-09-24T13:25:00+03:00' },
    end: { dateTime: '2026-09-24T13:45:00+03:00' },
    description: `type: transport
fixed: false
what: Transfer down toward the Golden Horn waterfront neighborhoods.
notes: Short downhill walk or taxi transfer.`
  },
  {
    id: 'ist26-0924-8',
    summary: '[IST26] Fener / Balat',
    location: 'Balat, Fatih/İstanbul',
    start: { dateTime: '2026-09-24T13:45:00+03:00' },
    end: { dateTime: '2026-09-24T14:40:00+03:00' },
    description: `type: walk
fixed: false
what: Historic neighborhoods with Greek, Jewish, Armenian and Ottoman layers.
why: Strong neighborhood-scale view of Istanbul’s cultural diversity.
do: Spend 45–60 minutes. Focus on street character, schools, churches and façades. Do not turn it into a photo shoot.`
  },
  {
    id: 'ist26-0924-9',
    summary: '[IST26] Transfer to Kariye',
    location: 'Fener/Balat to Kariye, Edirnekapı',
    start: { dateTime: '2026-09-24T14:40:00+03:00' },
    end: { dateTime: '2026-09-24T15:00:00+03:00' },
    description: `type: transport
fixed: false
what: Uphill transfer from Golden Horn shore to Edirnekapı.
notes: Short taxi recommended.`
  },
  {
    id: 'ist26-0924-10',
    summary: '[IST26] Kariye / Chora',
    location: 'Dervişali, Kariye Cami Sk. No:18, 34087 Fatih/İstanbul',
    start: { dateTime: '2026-09-24T15:00:00+03:00' },
    end: { dateTime: '2026-09-24T16:00:00+03:00' },
    description: `type: visit
fixed: false
what: Late Byzantine church famous for extraordinary 14th-century mosaics and frescoes.
why: Probably the strongest Byzantine art stop of the trip.
do: Follow narrative sequences. Prioritize the Anastasis fresco if accessible. Recheck access shortly before travel.`
  },
  {
    id: 'ist26-0924-11',
    summary: '[IST26] Transfer to Pera',
    location: 'Edirnekapı to Beyoğlu, Istanbul',
    start: { dateTime: '2026-09-24T16:00:00+03:00' },
    end: { dateTime: '2026-09-24T16:30:00+03:00' },
    description: `type: transport
fixed: false
what: Practical jump across the Golden Horn to Beyoğlu.
notes: Taxi if sensible; otherwise public transit.`
  },
  {
    id: 'ist26-0924-12',
    summary: '[IST26] Pera / İstiklal Walk',
    location: 'İstiklal Caddesi, Beyoğlu/İstanbul',
    start: { dateTime: '2026-09-24T16:30:00+03:00' },
    end: { dateTime: '2026-09-24T18:30:00+03:00' },
    description: `type: walk
fixed: false
what: Relaxed walk through Pera and İstiklal before dinner.
why: Introduces the 19th-century cosmopolitan European quarter.
do: Include St. Antoine before it closes. Include Avrupa Pasajı. Include Çiçek Pasajı. Allow a short coffee or rest. Focus on façades and building types.`
  },
  {
    id: 'ist26-0924-13',
    summary: '[IST26] Asmalı Cavit',
    location: 'Asmalı Mescit, Asmalı Mescit Cd. 16/D, 34430 Beyoğlu/İstanbul',
    start: { dateTime: '2026-09-24T19:00:00+03:00' },
    end: { dateTime: '2026-09-24T21:00:00+03:00' },
    description: `type: food
fixed: true
what: Classic Beyoğlu meyhane.
why: The main meze + rakı social dining experience.
food: Start with a restrained set of cold meze. Add hot dishes gradually. Drink rakı slowly with water.
reservation: Reserved`
  },
  {
    id: 'ist26-0924-14',
    summary: '[IST26] Short Night Walk / Return to Hotel',
    location: 'Beyoğlu to Sirkeci, Istanbul',
    start: { dateTime: '2026-09-24T21:00:00+03:00' },
    end: { dateTime: '2026-09-24T22:00:00+03:00' },
    description: `type: optional
fixed: false
what: Flexible end to the evening.
why: Keeps the day from becoming over-programmed.
notes: Easy stroll across Galata Bridge or return directly to Sirkeci.`
  },

  // =========================================================================
  // 🟧 25 SEPTEMBER 2026 (Friday) — DOLMABAHÇE + PERA + BOSPHORUS + ORTAKÖY + BOMONTI + GEVENDE
  // =========================================================================
  {
    id: 'ist26-0925-1',
    summary: '[IST26] Arrive at Dolmabahçe Entrance',
    location: 'Dolmabahçe Palace, Beşiktaş/İstanbul',
    start: { dateTime: '2026-09-25T08:45:00+03:00' },
    end: { dateTime: '2026-09-25T09:00:00+03:00' },
    description: `type: transport
fixed: false
what: Arrive before opening.
why: Enter as soon as the palace opens to minimize queues.`
  },
  {
    id: 'ist26-0925-2',
    summary: '[IST26] Dolmabahçe Palace',
    location: 'Vişnezade, Dolmabahçe Cd., 34357 Beşiktaş/İstanbul',
    start: { dateTime: '2026-09-25T09:00:00+03:00' },
    end: { dateTime: '2026-09-25T10:45:00+03:00' },
    description: `type: visit
fixed: false
what: 19th-century Ottoman imperial palace representing the westernizing court.
why: Complements Topkapı by showing how Ottoman power and aesthetics changed in the 19th century.
do: Focus on Selamlık / main palace. Prioritize the grand staircase, reception rooms and Ceremonial Hall. Do not over-invest in secondary sections.`
  },
  {
    id: 'ist26-0925-3',
    summary: '[IST26] Transfer to Galata / Pera',
    location: 'Dolmabahçe to Galata/Pera, Istanbul',
    start: { dateTime: '2026-09-25T10:45:00+03:00' },
    end: { dateTime: '2026-09-25T11:10:00+03:00' },
    description: `type: transport
fixed: false
what: Transfer uphill from Dolmabahçe to Galata/Pera.`
  },
  {
    id: 'ist26-0925-4',
    summary: '[IST26] Galata Mevlevihanesi',
    location: 'Şahkulu, Galip Dede Cd. No:15, 34420 Beyoğlu/İstanbul',
    start: { dateTime: '2026-09-25T11:10:00+03:00' },
    end: { dateTime: '2026-09-25T11:40:00+03:00' },
    description: `type: visit
fixed: false
what: Historic Mevlevi Sufi lodge.
why: Shows Mevlevi culture as music, poetry, learning and spiritual discipline—not only whirling dervishes.
do: Keep visit focused on the semahane, classical instruments and institutional history.`
  },
  {
    id: 'ist26-0925-5',
    summary: '[IST26] Pera Palace',
    location: 'Evliya Çelebi, Meşrutiyet Cd. No:52, 34430 Beyoğlu/İstanbul',
    start: { dateTime: '2026-09-25T11:40:00+03:00' },
    end: { dateTime: '2026-09-25T12:20:00+03:00' },
    description: `type: visit
fixed: false
what: 1895 Belle Époque hotel associated with Orient Express travelers.
why: Strong example of late-Ottoman modernization, international travel and luxury hospitality.
do: Tea or coffee only. See the historic elevator, staircase and public rooms.`
  },
  {
    id: 'ist26-0925-6',
    summary: '[IST26] Free Transition / Buffer to Eminönü',
    location: 'Pera to Eminönü Piers, Istanbul',
    start: { dateTime: '2026-09-25T12:20:00+03:00' },
    end: { dateTime: '2026-09-25T13:00:00+03:00' },
    description: `type: rest
fixed: false
what: Unprogrammed transfer and breathing room before the ferry.
notes: Stroll down Galata hill or cross Galata Bridge to Eminönü at an easy pace.`
  },
  {
    id: 'ist26-0925-7',
    summary: '[IST26] Şehir Hatları Bosphorus Ride',
    location: 'Eminönü Ferry Pier, 34111 Fatih/İstanbul',
    start: { dateTime: '2026-09-25T13:00:00+03:00' },
    end: { dateTime: '2026-09-25T14:30:00+03:00' },
    description: `type: transport
fixed: false
what: Approximately 90 minutes on regular public City Lines ferries, not a tourist cruise.
why: Probably the best geographic lesson of the trip.
do: Board from Eminönü. Sit outside if weather permits. Drink tea onboard. Exact September 2026 sailing still TBD.
web: https://sehirhatlari.istanbul/`
  },
  {
    id: 'ist26-0925-8',
    summary: '[IST26] Ortaköy',
    location: 'Ortaköy Meydanı, Beşiktaş/İstanbul',
    start: { dateTime: '2026-09-25T14:40:00+03:00' },
    end: { dateTime: '2026-09-25T15:20:00+03:00' },
    description: `type: visit
fixed: false
what: Büyük Mecidiye Mosque, waterfront square and Bosphorus Bridge composition.
why: One of Istanbul’s defining Bosphorus urban scenes.
do: Experience the waterfront square, mosque interior and bridge view.`
  },
  {
    id: 'ist26-0925-9',
    summary: '[IST26] Bebek or Nişantaşı — Choose One',
    location: 'Bebek or Nişantaşı, Istanbul',
    start: { dateTime: '2026-09-25T15:30:00+03:00' },
    end: { dateTime: '2026-09-25T17:30:00+03:00' },
    description: `type: optional
fixed: false
what: Two-hour flexible neighborhood block.
why: Bebek for waterfront Bosphorus life; Nişantaşı for contemporary upscale urban Istanbul.

facts:
- Option A (Bebek): Waterfront promenade, bay, cafés, boats and affluent Bosphorus residential life.
- Option B (Nişantaşı): Upscale residential streets, fashion, cafés and contemporary Istanbul.

notes: Choose only one on the day. Do not squeeze both in.`
  },
  {
    id: 'ist26-0925-10',
    summary: '[IST26] Transfer / Buffer to Bomonti',
    location: 'Bebek / Nişantaşı to Bomonti, Şişli',
    start: { dateTime: '2026-09-25T17:30:00+03:00' },
    end: { dateTime: '2026-09-25T18:15:00+03:00' },
    description: `type: transport
fixed: false
what: Repositioning toward the concert neighborhood.
notes: Taxi preferred if traffic is reasonable.`
  },
  {
    id: 'ist26-0925-11',
    summary: '[IST26] Dinner — Kolcuoğlu or Restohan',
    location: 'Bomonti, Şişli/İstanbul',
    start: { dateTime: '2026-09-25T18:15:00+03:00' },
    end: { dateTime: '2026-09-25T19:30:00+03:00' },
    description: `type: food
fixed: false
what: Pre-concert kebab / ocakbaşı dinner.
why: Adds a proper kebab/ocakbaşı experience instead of repeating döner.

facts:
- Option A: Kolcuoğlu Bomonti Ocakbaşı Kebap (More classic ocakbaşı/kebab experience).
- Option B: Restohan Kebap Bomonti (Larger, more restaurant-style alternative).

food: Choose on the day based on appetite, reservation and vibe.`
  },
  {
    id: 'ist26-0925-12',
    summary: '[IST26] Short Free Time / Transition',
    location: 'Bomonti, Şişli/İstanbul',
    start: { dateTime: '2026-09-25T19:30:00+03:00' },
    end: { dateTime: '2026-09-25T20:00:00+03:00' },
    description: `type: rest
fixed: false
what: Short downtime and stroll into Bomontiada.`
  },
  {
    id: 'ist26-0925-13',
    summary: '[IST26] Bomontiada',
    location: 'Merkez, Silahşör Caddesi, Birahane Sk. No:1, 34384 Şişli/İstanbul',
    start: { dateTime: '2026-09-25T20:00:00+03:00' },
    end: { dateTime: '2026-09-25T21:00:00+03:00' },
    description: `type: drink
fixed: false
what: Former brewery complex reused as a contemporary cultural destination.
why: Provides a modern Istanbul counterpoint to the historic-heavy itinerary.
do: One drink. Rest feet. Stay close to Babylon.`
  },
  {
    id: 'ist26-0925-14',
    summary: '[IST26] Babylon Entry / Buffer',
    location: 'Babylon Bomontiada, Tarihi Bomonti Bira Fabrikası, Şişli/İstanbul',
    start: { dateTime: '2026-09-25T21:00:00+03:00' },
    end: { dateTime: '2026-09-25T21:30:00+03:00' },
    description: `type: rest
fixed: true
what: Buffer to ensure smooth entry and settling in before concert start.
notes: Doors check, ticketing and securing a comfortable vantage point.`
  },
  {
    id: 'ist26-0925-15',
    summary: '[IST26] Gevende @ Babylon',
    location: 'Babylon Bomontiada, Tarihi Bomonti Bira Fabrikası, Şişli/İstanbul',
    start: { dateTime: '2026-09-25T21:30:00+03:00' },
    end: { dateTime: '2026-09-25T23:30:00+03:00' },
    description: `type: concert
fixed: true
what: Contemporary live-music anchor for the trip.
why: Shows Istanbul as a city producing contemporary culture, not only preserving historic culture.
do: Reconfirm doors/show time during the final week.
ticket: Booked
web: https://www.babylon.com.tr/`
  },
  {
    id: 'ist26-0925-16',
    summary: '[IST26] Late-night Kokoreç',
    location: 'Bomonti / Kurtuluş, Şişli/İstanbul',
    start: { dateTime: '2026-09-25T23:45:00+03:00' },
    end: { dateTime: '2026-09-26T00:30:00+03:00' },
    description: `type: food
fixed: false
what: Classic Turkish late-night food after the concert.
why: Ideal context for kokoreç and a distinct street-food experience.
food: Choose a busy specialist with high turnover. Start with half bread. İşkembe can be handled separately.`
  },

  // =========================================================================
  // 🟪 26 SEPTEMBER 2026 (Saturday) — SLOW FINAL MORNING + AIRPORT
  // =========================================================================
  {
    id: 'ist26-0926-1',
    summary: '[IST26] Light Breakfast',
    location: 'Sirkeci, Fatih/İstanbul',
    start: { dateTime: '2026-09-26T09:30:00+03:00' },
    end: { dateTime: '2026-09-26T10:00:00+03:00' },
    description: `type: food
fixed: false
what: Simit, börek or tea only.
why: Keeps the final morning easy and flexible.
food: Keep very light.`
  },
  {
    id: 'ist26-0926-2',
    summary: '[IST26] Flexible Final Walk',
    location: 'Sirkeci / Eminönü, Fatih/İstanbul',
    start: { dateTime: '2026-09-26T10:00:00+03:00' },
    end: { dateTime: '2026-09-26T11:30:00+03:00' },
    description: `type: walk
fixed: false
what: Deliberately unprogrammed final city window.
why: Allows a revisit, a small gift, photos, or simply sitting somewhere pleasant.
do: Stay reasonably close to Sirkeci/Eminönü. No major new attraction.`
  },
  {
    id: 'ist26-0926-3',
    summary: '[IST26] Move Toward Eminönü',
    location: 'Sirkeci to Eminönü, Fatih/İstanbul',
    start: { dateTime: '2026-09-26T11:30:00+03:00' },
    end: { dateTime: '2026-09-26T12:00:00+03:00' },
    description: `type: transport
fixed: false
what: Easy stroll toward the waterfront for lunch.`
  },
  {
    id: 'ist26-0926-4',
    summary: '[IST26] Open Lunch / Final Meal',
    location: 'Eminönü / Sirkeci, Istanbul',
    start: { dateTime: '2026-09-26T12:00:00+03:00' },
    end: { dateTime: '2026-09-26T13:30:00+03:00' },
    description: `type: food
fixed: false
what: Final meal slot kept open because Hamdi moved to September 23.
why: Allows flexibility based on appetite and anything still missing from the food plan.
food: Prefer quality and proximity over crossing the city.`
  },
  {
    id: 'ist26-0926-5',
    summary: '[IST26] Coffee / Short Eminönü Walk',
    location: 'Eminönü Square, Fatih/İstanbul',
    start: { dateTime: '2026-09-26T13:30:00+03:00' },
    end: { dateTime: '2026-09-26T14:15:00+03:00' },
    description: `type: rest
fixed: false
what: Final decompression in the city.
notes: Turkish coffee or tea by the waterfront.`
  },
  {
    id: 'ist26-0926-6',
    summary: '[IST26] Hotel / Luggage',
    location: 'Sirkeci Hotel, Fatih/İstanbul',
    start: { dateTime: '2026-09-26T14:15:00+03:00' },
    end: { dateTime: '2026-09-26T15:00:00+03:00' },
    description: `type: rest
fixed: true
what: Collect bags, check documents, charge devices and settle hotel matters.
notes: Zero sightseeing pressure.`
  },
  {
    id: 'ist26-0926-7',
    summary: '[IST26] Leave Sirkeci for IST',
    location: 'Sirkeci to Istanbul Airport (IST)',
    start: { dateTime: '2026-09-26T15:15:00+03:00' },
    end: { dateTime: '2026-09-26T17:00:00+03:00' },
    description: `type: transport
fixed: true
what: Depart the city for Istanbul Airport.
why: Targets roughly 17:00 arrival at IST for the 20:00 international flight.
notes: Target roughly 17:00 arrival at IST for a 20:00 international flight.
web: https://www.istairport.com/en/`
  },
  {
    id: 'ist26-0926-8',
    summary: '[IST26] International Flight Departure',
    location: 'Istanbul Airport (IST)',
    start: { dateTime: '2026-09-26T20:00:00+03:00' },
    end: { dateTime: '2026-09-26T23:00:00+03:00' },
    description: `type: transport
fixed: true
what: End of trip.
why: End of trip.`
  }
];
