export interface WikiPhoto {
  url: string;
  caption: string;
  sourceUrl?: string;
}

const SEARCH_QUERY_OVERRIDES: Record<string, string> = {
  'ist26-0922-1': 'Istanbul Airport new terminal',
  'ist26-0922-2': 'Sirkeci Istanbul historic street',
  'ist26-0922-3': 'Cağ kebabı Erzurum Turkish food',
  'ist26-0922-4': 'Sirkeci Istanbul night',
  'ist26-0923-1': 'Simit Turkish tea çay Istanbul',
  'ist26-0923-2': 'Topkapi Palace Istanbul',
  'ist26-0923-3': 'Topkapi Palace Hagia Sophia Sultanahmet square',
  'ist26-0923-4': 'Hagia Sophia Istanbul interior dome mosaic',
  'ist26-0923-5': 'Hippodrome of Constantinople Istanbul Obelisk',
  'ist26-0923-6': 'Basilica Cistern Istanbul Medusa column',
  'ist26-0923-7': 'Doner kebab yaprak meat Istanbul',
  'ist26-0923-8': 'Grand Bazaar Istanbul Kapalicarsi interior',
  'ist26-0923-9': 'Spice Bazaar Istanbul Misir Carsisi',
  'ist26-0923-10': 'Istanbul ferry Sehir Hatlari Bosphorus',
  'ist26-0923-11': 'Kuzguncuk Istanbul houses',
  'ist26-0923-12': 'Kuzguncuk Bosphorus fish meyhane Ismet Baba',
  'ist26-0923-13': 'Istanbul Bosphorus ferry night skyline',
  'ist26-0924-1': 'Turkish breakfast menemen kaymak Istanbul',
  'ist26-0924-2': 'Rustem Pasha Mosque Istanbul Iznik tiles',
  'ist26-0924-3': 'Tahtakale Istanbul historic market',
  'ist26-0924-4': 'Suleymaniye Mosque Istanbul courtyard dome',
  'ist26-0924-5': 'Sehzade Mosque Istanbul Sinan',
  'ist26-0924-6': 'Vefa Bozacisi boza Istanbul',
  'ist26-0924-7': 'Zeyrek Mosque Pantokrator Monastery Istanbul',
  'ist26-0924-8': 'Turkish esnaf lokantasi food Istanbul',
  'ist26-0924-9': 'Fatih Istanbul Golden Horn park',
  'ist26-0924-10': 'Fener Balat Istanbul colorful houses',
  'ist26-0924-11': 'Walls of Constantinople Theodosian Walls Istanbul',
  'ist26-0924-12': 'Chora Church Kariye Mosque mosaics Istanbul',
  'ist26-0924-13': 'Beyoglu Pera Istanbul tram',
  'ist26-0924-14': 'Asmalimescit Pera Beyoglu Istanbul street',
  'ist26-0924-15': 'Meyhane meze raki Turkish Istanbul',
  'ist26-0924-16': 'Cicek Pasaji Istiklal Avenue Istanbul',
  'ist26-0924-17': 'Galata Tower view rooftop Istanbul night',
  'ist26-0925-1': 'Turkish borek simit bakery Istanbul',
  'ist26-0925-2': 'Galata neighborhood Istanbul streets',
  'ist26-0925-3': 'Galata Mevlevihanesi Whirling Dervish lodge',
  'ist26-0925-4': 'Istiklal Avenue Beyoglu daylight architecture',
  'ist26-0925-5': 'Pera Palace Hotel Istanbul Orient Express',
  'ist26-0925-6': 'Baklava Karakoy Gulluoglu Turkish pistachio',
  'ist26-0925-7': 'Bosphorus strait ferry palaces yalilar Istanbul',
  'ist26-0925-8': 'Nisantasi Bomonti Sisli Istanbul street',
  'ist26-0925-9': 'Bomontiada Sisli Istanbul courtyard',
  'ist26-0925-10': 'Doner kebab yaprak meat Istanbul',
  'ist26-0925-11': 'Bomontiada Istanbul brewery cultural center',
  'ist26-0925-12': 'Babylon Bomontiada concert live music Istanbul',
  'ist26-0925-13': 'Kokorec Turkish street food bread charcoal',
  'ist26-0926-1': 'Simit cay breakfast Istanbul bakery',
  'ist26-0926-2': 'Sirkeci Gulhane Park Eminonu Istanbul',
  'ist26-0926-3': 'Eminonu Spice Bazaar walking street Istanbul',
  'ist26-0926-4': 'Hamdi Restaurant Eminonu Golden Horn view kebab Istanbul',
  'ist26-0926-5': 'Turkish coffee cezve Eminonu waterfront Istanbul',
  'ist26-0926-6': 'Sirkeci historic hotel luggage Istanbul',
  'ist26-0926-7': 'Istanbul Airport Havaist transfer taxi',
  'ist26-0926-8': 'Istanbul Airport international terminal departures',
  'ist26-0926-9': 'Istanbul Airport departure hall gate'
};

const memoryCache = new Map<string, WikiPhoto[]>();

function cleanCaption(rawTitle: string): string {
  return rawTitle
    .replace(/^File:/i, '')
    .replace(/\.(jpg|jpeg|png|webp|JPG|JPEG|PNG)$/i, '')
    .replace(/[_-]/g, ' ')
    .replace(/\b(IMG|DSC|DSCN|SAM|P)\d+\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Fetches verified, authentic photographs from Wikimedia Commons API
 */
export async function fetchWikimediaPhotos(
  eventId: string,
  title: string
): Promise<WikiPhoto[]> {
  const cacheKey = `wiki_photos_${eventId}`;
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey)!;
  }

  // Check localStorage cache
  try {
    const local = localStorage.getItem(cacheKey);
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryCache.set(cacheKey, parsed);
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  const query = SEARCH_QUERY_OVERRIDES[eventId] || `${title} Istanbul`;
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
    query
  )}&gsrlimit=25&gsrnamespace=6&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1000&format=json&origin=*`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Wikimedia API error: ${response.status}`);
    }

    const data = await response.json();
    const pages = data.query?.pages || {};
    const photos: WikiPhoto[] = [];

    for (const pageId of Object.keys(pages)) {
      const page = pages[pageId];
      const imgInfo = page.imageinfo?.[0];
      const thumbUrl = imgInfo?.thumburl || imgInfo?.url;
      if (thumbUrl && !thumbUrl.endsWith('.svg') && !thumbUrl.endsWith('.tif') && !thumbUrl.endsWith('.pdf')) {
        const caption = cleanCaption(page.title || title);
        photos.push({
          url: thumbUrl,
          caption: caption.length > 5 ? caption : `${title} — Authentic Photography`,
          sourceUrl: imgInfo?.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title)}`
        });
      }
    }

    if (photos.length > 0) {
      memoryCache.set(cacheKey, photos);
      try {
        localStorage.setItem(cacheKey, JSON.stringify(photos));
      } catch {
        // ignore
      }
      return photos;
    }
  } catch (err) {
    console.warn(`Failed to fetch Wikimedia photos for ${title}:`, err);
  }

  return [];
}
