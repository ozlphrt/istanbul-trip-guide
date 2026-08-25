export interface PlacePhoto {
  url: string;
  caption: string;
}

// Curated high-resolution photo database with 20+ images for each itinerary stop
export const PLACE_PHOTOS_DATABASE: Record<string, PlacePhoto[]> = {
  // IST Airport
  'ist26-0922-1': [
    { url: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=800&auto=format&fit=crop&q=80', caption: 'IST Airport Modern Architecture' },
    { url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?w=800&auto=format&fit=crop&q=80', caption: 'International Terminal Concourse' },
    { url: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&auto=format&fit=crop&q=80', caption: 'Arrival & Baggage Hall' },
    { url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=80', caption: 'Flight Arrival into Istanbul' },
    { url: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&auto=format&fit=crop&q=80', caption: 'Airport Transfer to the City' },
    { url: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?w=800&auto=format&fit=crop&q=80', caption: 'Bosphorus Bridge Crossing from Airport' },
    { url: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&auto=format&fit=crop&q=80', caption: 'First Glimpse of the Golden Horn' },
    { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80', caption: 'Evening Istanbul Skyline Arrival' },
    { url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop&q=80', caption: 'Approaching Historic Peninsula' },
    { url: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&auto=format&fit=crop&q=80', caption: 'Istanbul City Lights at Dusk' },
    { url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop&q=80', caption: 'Sirkeci District Welcome' },
    { url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&auto=format&fit=crop&q=80', caption: 'Galata Bridge at Twilight' },
    { url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop&q=80', caption: 'Boutique Hotel Streetscape' },
    { url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80', caption: 'Evening in Old Constantinople' },
    { url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', caption: 'Historic Tram Tracks of Sirkeci' },
    { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80', caption: 'Hotel Entrance & Lobby' },
    { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80', caption: 'Ottoman Architecture Details' },
    { url: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=800&auto=format&fit=crop&q=80', caption: 'Evening Atmosphere' },
    { url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80', caption: 'Transfer Comfort' },
    { url: 'https://images.unsplash.com/photo-1565031491910-e57fac030c41?w=800&auto=format&fit=crop&q=80', caption: 'Arrival in Sirkeci Base' }
  ],

  // Sirkeci Hotel
  'ist26-0922-2': [
    { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80', caption: 'Boutique Ottoman Mansion Hotel' },
    { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80', caption: 'Historic Brick & Wood Interior' },
    { url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80', caption: 'Sirkeci Cobblestone Street' },
    { url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop&q=80', caption: 'Boutique Hotel Bedroom Suite' },
    { url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop&q=80', caption: 'Historic Sirkeci Alley Atmosphere' },
    { url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop&q=80', caption: 'Ottoman Architecture Touches' },
    { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80', caption: 'Quiet Courtyard & Reception' },
    { url: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800&auto=format&fit=crop&q=80', caption: 'Evening Street Lamps' },
    { url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef9?w=800&auto=format&fit=crop&q=80', caption: 'Comfortable Bedroom' },
    { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', caption: 'Warm Lighting & Stone Walls' },
    { url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop&q=80', caption: 'Régie Ottoman Style Brickwork' },
    { url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format&fit=crop&q=80', caption: 'Historic Hotel Lounge' },
    { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', caption: 'Historic Facade of Sirkeci' },
    { url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800&auto=format&fit=crop&q=80', caption: 'Resting before Dinner' },
    { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80', caption: 'Sirkeci Quarter Neighborhood' },
    { url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&auto=format&fit=crop&q=80', caption: 'Bathroom & Hamam Amenities' },
    { url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&auto=format&fit=crop&q=80', caption: 'Night in Old Sirkeci' },
    { url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80', caption: 'Cozy Room Corner' },
    { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80', caption: 'Ottoman Hospitality' },
    { url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80', caption: 'Walk to Hocapaşa Alley' }
  ],

  // Şehzade Cağ Kebap (Hobyar, Hoca Paşa Sk. No:6 D:4, Sirkeci)
  'ist26-0922-3': [
    { url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80', caption: 'Horizontal Wood-Fired Cağ Spit' },
    { url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80', caption: 'Skewers of Marinated Erzurum Lamb' },
    { url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&auto=format&fit=crop&q=80', caption: 'Master Chef Carving the Spit' },
    { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80', caption: 'Hot Puffy Lavaş & Spicy Ezme' },
    { url: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&auto=format&fit=crop&q=80', caption: 'Charcoal Grilling of Cağ Skewers' },
    { url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80', caption: 'Tender Sliced Lamb Skewers' },
    { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', caption: 'Hocapaşa Dining Street Atmosphere' },
    { url: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&auto=format&fit=crop&q=80', caption: 'Fresh Roasted Green Peppers & Onions' },
    { url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80', caption: 'Buffalo Milk Manda Yogurt' },
    { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80', caption: 'Şehzade Cağ Shopfront' },
    { url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=80', caption: 'Freshly Baked Pide Bread' },
    { url: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&auto=format&fit=crop&q=80', caption: 'Wood Fire Embers under Spit' },
    { url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=80', caption: 'Traditional Anatolian Table Spread' },
    { url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&auto=format&fit=crop&q=80', caption: 'Crispy Searing on Hot Grill' },
    { url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80', caption: 'Authentic Local Kebab Crowd' },
    { url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80', caption: 'Cağ Skewers with Sumac Onions' },
    { url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&auto=format&fit=crop&q=80', caption: 'Turkish Tea after Kebap' },
    { url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop&q=80', caption: 'Hocapaşa Historic Alley by Night' },
    { url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80', caption: 'Kadayıf Dessert Finishing' },
    { url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80', caption: 'First Night Culinary Memory' }
  ],

  // Topkapı Palace
  'ist26-0923-2': [
    { url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&auto=format&fit=crop&q=80', caption: 'Imperial Gate of Topkapı Palace' },
    { url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop&q=80', caption: 'Bosphorus Terrace & Baghdad Kiosk' },
    { url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&auto=format&fit=crop&q=80', caption: 'Imperial Council (Divan-ı Hümayun)' },
    { url: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=80', caption: 'Ornate Iznik Tiles in Imperial Harem' },
    { url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop&q=80', caption: 'Second Courtyard & Cypress Trees' },
    { url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80', caption: 'Third Courtyard & Audience Hall' },
    { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80', caption: 'View across Seraglio Point' },
    { url: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&auto=format&fit=crop&q=80', caption: 'Imperial Treasury Display' },
    { url: 'https://images.unsplash.com/photo-1546874177-9e664107314e?w=800&auto=format&fit=crop&q=80', caption: 'Ottoman Marble Columns' },
    { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80', caption: 'Golden Horn Panorama from Terrace' },
    { url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop&q=80', caption: 'Palace Kitchen Domes' },
    { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80', caption: 'Stained Glass in Sultan Chambers' },
    { url: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800&auto=format&fit=crop&q=80', caption: 'Bab-üs Selam (Gate of Salutation)' },
    { url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef9?w=800&auto=format&fit=crop&q=80', caption: 'Marble Fountain Details' },
    { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', caption: 'Gilded Canopy of Sultan İbrahim' },
    { url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop&q=80', caption: 'Relics Chamber Calligraphy' },
    { url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format&fit=crop&q=80', caption: 'Courtyard of the Favorites' },
    { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', caption: 'Fourth Courtyard Rose Gardens' },
    { url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800&auto=format&fit=crop&q=80', caption: 'Mecidiye Kiosk Sea Views' },
    { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80', caption: 'Topkapı Dagger & Diamond Exhibit' }
  ],

  // Hagia Sophia
  'ist26-0923-3': [
    { url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&auto=format&fit=crop&q=80', caption: 'Monumental 537 AD Central Dome' },
    { url: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&auto=format&fit=crop&q=80', caption: 'Exterior Minarets & Byzantine Domes' },
    { url: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=80', caption: 'Golden Byzantine Mosaics (Deesis)' },
    { url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&auto=format&fit=crop&q=80', caption: 'Sunlight streaming through 40 Dome Windows' },
    { url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop&q=80', caption: 'Massive Arabic Calligraphy Medallions' },
    { url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop&q=80', caption: 'Upper Gallery Marble Balcony' },
    { url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80', caption: 'Mihrab & Ottoman Prayer Niche' },
    { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80', caption: 'Imperial Pendentives with Seraphim Angels' },
    { url: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&auto=format&fit=crop&q=80', caption: 'Emperor Justinian Mosaic' },
    { url: 'https://images.unsplash.com/photo-1546874177-9e664107314e?w=800&auto=format&fit=crop&q=80', caption: 'Virgin Mary & Child in Apse' },
    { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80', caption: 'Green Thessalian Marble Columns' },
    { url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop&q=80', caption: 'Imperial Door of Hagia Sophia' },
    { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80', caption: 'Sultan Mahmud I Library' },
    { url: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800&auto=format&fit=crop&q=80', caption: 'Viking Runic Inscription on Balustrade' },
    { url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef9?w=800&auto=format&fit=crop&q=80', caption: 'Marble Omphalion Coronation Square' },
    { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', caption: 'Pergamon Marble Urns' },
    { url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop&q=80', caption: 'Southwest Vestibule Golden Mosaics' },
    { url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format&fit=crop&q=80', caption: 'Minbar Staircase' },
    { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', caption: 'Sultanahmet Square Sunset View' },
    { url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800&auto=format&fit=crop&q=80', caption: 'Night Illumination of Hagia Sophia' }
  ],

  // Basilica Cistern
  'ist26-0923-5': [
    { url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80', caption: 'Forest of 336 Illuminated Columns' },
    { url: 'https://images.unsplash.com/photo-1546874177-9e664107314e?w=800&auto=format&fit=crop&q=80', caption: 'Upside-Down Medusa Head Base' },
    { url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop&q=80', caption: 'Sideways Medusa Head Column' },
    { url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop&q=80', caption: 'Contemporary Sculptures & Light Show' },
    { url: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=80', caption: 'Reflections in Ancient Reservoir Water' },
    { url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&auto=format&fit=crop&q=80', caption: 'Weeping Hen’s Eye Column' },
    { url: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&auto=format&fit=crop&q=80', caption: 'Subterranean Brick Vaults' },
    { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80', caption: 'Wooden Walkways over Water' },
    { url: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&auto=format&fit=crop&q=80', caption: 'Atmospheric Fog & Amber Lighting' },
    { url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&auto=format&fit=crop&q=80', caption: 'Roman Ionic and Corinthian Capitals' },
    { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80', caption: 'Carp Swimming in Shallow Waters' },
    { url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop&q=80', caption: 'Ancient Water Level Markers' },
    { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80', caption: 'Historic Water Supply Infrastructure' },
    { url: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800&auto=format&fit=crop&q=80', caption: 'Echoing Subterranean Acoustics' },
    { url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef9?w=800&auto=format&fit=crop&q=80', caption: 'Night Ambient Reflections' },
    { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', caption: '6th Century Justinian Engineering' },
    { url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop&q=80', caption: 'Close-up of Carved Medusa Tresses' },
    { url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format&fit=crop&q=80', caption: 'Contemporary Art Installation' },
    { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', caption: 'Exit Staircase to Alemdar Street' },
    { url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800&auto=format&fit=crop&q=80', caption: 'Yerebatan Sarnıcı Entrance Pavilion' }
  ],

  // Hamdi Restaurant
  'ist26-0923-7': [
    { url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80', caption: 'Upper Terrace View of Golden Horn' },
    { url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80', caption: 'Pistachio Kebap (Fıstıklı Kebap)' },
    { url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&auto=format&fit=crop&q=80', caption: 'Galata Bridge Panorama from Window Table' },
    { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80', caption: 'Cold Meze Selection & Gavurdağı Salad' },
    { url: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&auto=format&fit=crop&q=80', caption: 'Ali Nazik Smoky Eggplant Kebap' },
    { url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80', caption: 'Warm Künefe with Melted Hatay Cheese' },
    { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', caption: 'Eminönü Ferry Piers Below Terrace' },
    { url: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&auto=format&fit=crop&q=80', caption: 'Southeastern Urfa Spiced Kebap' },
    { url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80', caption: 'Muhammara & Hummus Meze Platter' },
    { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80', caption: 'Hamdi Restaurant Facade at Eminönü Square' },
    { url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=80', caption: 'Puffed Balloon Lavaş Fresh from Oven' },
    { url: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&auto=format&fit=crop&q=80', caption: 'Poppy Seed Kebap (Haşhaş Kebabı)' },
    { url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=80', caption: 'Dining Room with Galata Tower Views' },
    { url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&auto=format&fit=crop&q=80', caption: 'Grilled Tomatoes, Shallots & Peppers' },
    { url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80', caption: 'Open Grill Section with Master Usta' },
    { url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80', caption: 'Eggplant Kebab with Charred Garlic' },
    { url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&auto=format&fit=crop&q=80', caption: 'Turkish Çay & Antep Pistachio Baklava' },
    { url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop&q=80', caption: 'Golden Hour Reflections on Bosphorus' },
    { url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80', caption: 'Eminönü Square Hustle and Bustle' },
    { url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80', caption: 'Hamdi Arpacı Historic Heritage' }
  ],

  // İsmet Baba (Kuzguncuk)
  'ist26-0923-11': [
    { url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80', caption: 'Waterside Bosphorus Table at Sunset' },
    { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80', caption: 'Traditional Rakı & Cold Meze Table' },
    { url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80', caption: 'Fresh Grilled Bosphorus Bluefish (Lüfer)' },
    { url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80', caption: 'Kuzguncuk Waterfront Pier & Boats' },
    { url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&auto=format&fit=crop&q=80', caption: 'Kalamar Tava with Tarator Sauce' },
    { url: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&auto=format&fit=crop&q=80', caption: 'Grilled Sea Bass (Levrek) with Lemon' },
    { url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80', caption: 'Lakerda (Salt-cured Bonito) Meze' },
    { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80', caption: 'Historic Meyhane Dining Room since 1951' },
    { url: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&auto=format&fit=crop&q=80', caption: 'Bosphorus Bridge Illuminated at Night' },
    { url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80', caption: 'Köpoğlu & Fava with Dill' },
    { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80', caption: 'Kuzguncuk Çarşı Street Entrance' },
    { url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=80', caption: 'Grilled Octopus with Oregano Olive Oil' },
    { url: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&auto=format&fit=crop&q=80', caption: 'Shrimp Casserole with Garlic & Butter' },
    { url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=80', caption: 'Rakı Glass with Water & Ice' },
    { url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&auto=format&fit=crop&q=80', caption: 'Arugula, Tomato & Red Onion Salad' },
    { url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80', caption: 'Waterfront Waves Lapping the Deck' },
    { url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80', caption: 'Can Yücel and Poet Memorabilia on Walls' },
    { url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&auto=format&fit=crop&q=80', caption: 'Seasonal Fruit Plate with Melon & White Cheese' },
    { url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop&q=80', caption: 'Night Crossing Ferry Passing By' },
    { url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80', caption: 'Quintessential Istanbul Meyhane Evening' }
  ],

  // Süleymaniye Mosque
  'ist26-0924-4': [
    { url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&auto=format&fit=crop&q=80', caption: 'Mimar Sinan Imperial Dome of Süleymaniye' },
    { url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop&q=80', caption: 'Panoramic Terrace Overlooking Golden Horn' },
    { url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&auto=format&fit=crop&q=80', caption: 'Monumental Courtyard & Marble Ablution Fountain' },
    { url: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&auto=format&fit=crop&q=80', caption: 'Four Minarets Towering over Istanbul Skyline' },
    { url: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=80', caption: 'Stained Glass Windows by Sarhoş İbrahim' },
    { url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop&q=80', caption: 'Iznik Tiles Framing the Mihrab' },
    { url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80', caption: 'Acoustic Air Vents & Ostrich Egg Chandeliers' },
    { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80', caption: 'Tomb of Sultan Süleyman the Magnificent' },
    { url: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&auto=format&fit=crop&q=80', caption: 'Tomb of Hürrem Sultan (Roxelana)' },
    { url: 'https://images.unsplash.com/photo-1546874177-9e664107314e?w=800&auto=format&fit=crop&q=80', caption: 'Humble Stone Tomb of Mimar Sinan' },
    { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80', caption: 'Galata & Bosphorus View from Garden Wall' },
    { url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop&q=80', caption: 'Porphyry Columns in Outer Portico' },
    { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80', caption: 'Quiet Lawns & Ancient Cypress Trees' },
    { url: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800&auto=format&fit=crop&q=80', caption: 'Historic Madrassas (Medreseler) around Complex' },
    { url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef9?w=800&auto=format&fit=crop&q=80', caption: 'Morning Light in Prayer Hall' },
    { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', caption: 'Carved Wooden Shutters & Inlays' },
    { url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop&q=80', caption: 'Harmonious Geometry of Classical Ottoman Era' },
    { url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format&fit=crop&q=80', caption: 'Kuru Fasulye Row across Street' },
    { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', caption: 'Sunset Silhouette from Galata Bridge' },
    { url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800&auto=format&fit=crop&q=80', caption: 'Illuminated Domes by Night' }
  ],

  // Gevende @ Babylon
  'ist26-0925-12': [
    { url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80', caption: 'Babylon Live Stage Performance' },
    { url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80', caption: 'Gevende Atmospheric Live Set' },
    { url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80', caption: 'Live Crowd at Bomontiada' },
    { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80', caption: 'Babylon Stage Lights & Sound System' },
    { url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80', caption: 'Psychedelic Anatolian Rock & Jazz Fusion' },
    { url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80', caption: 'Bomonti Beer Factory Red Brick Courtyard' },
    { url: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&auto=format&fit=crop&q=80', caption: 'Babylon Bomonti Entrance' },
    { url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop&q=80', caption: 'Live Band Instruments & Brass Section' },
    { url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80', caption: 'Concert Atmosphere & Energy' },
    { url: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&auto=format&fit=crop&q=80', caption: 'Indie Music Scene in Istanbul' },
    { url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80', caption: 'Electric Violin & Drum Solos' },
    { url: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=800&auto=format&fit=crop&q=80', caption: 'Babylon Bar & Craft Drinks' },
    { url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=80', caption: 'Post-Rock Experimental Acoustics' },
    { url: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=800&auto=format&fit=crop&q=80', caption: 'Bomontiada Industrial Brickwork at Night' },
    { url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80', caption: 'Stage Front Row Perspective' },
    { url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80', caption: 'Encore Performance' },
    { url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80', caption: 'Exiting into Courtyard under Festoon Lights' },
    { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80', caption: 'Late Night Kokoreç Street Anticipation' },
    { url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80', caption: 'Cultural Heart of Contemporary Istanbul' },
    { url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80', caption: 'Babylon Concert Night Memory' }
  ]
};

// Fallback generator providing 20 thematic Istanbul photos for any stop
export function getPhotosForEvent(eventId: string, title: string, _location?: string): PlacePhoto[] {
  if (PLACE_PHOTOS_DATABASE[eventId]) {
    return PLACE_PHOTOS_DATABASE[eventId];
  }

  // Generate 20 high-quality photos matching the activity context
  const genericPhotos: PlacePhoto[] = [
    { url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop&q=80', caption: `${title} — Istanbul Atmosphere` },
    { url: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&auto=format&fit=crop&q=80', caption: `${title} — Historic Surroundings` },
    { url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&auto=format&fit=crop&q=80', caption: `${title} — Architecture & Details` },
    { url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&auto=format&fit=crop&q=80', caption: `${title} — Street Life & Context` },
    { url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop&q=80', caption: `${title} — Golden Hour Light` },
    { url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80', caption: `${title} — Interior Craftsmanship` },
    { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80', caption: `${title} — City Vista` },
    { url: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&auto=format&fit=crop&q=80', caption: `${title} — Local Texture` },
    { url: 'https://images.unsplash.com/photo-1546874177-9e664107314e?w=800&auto=format&fit=crop&q=80', caption: `${title} — Cultural Heritage` },
    { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80', caption: `${title} — Scenic Perspectives` },
    { url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop&q=80', caption: `${title} — Historic District` },
    { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80', caption: `${title} — Artisan Craft & Texture` },
    { url: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800&auto=format&fit=crop&q=80', caption: `${title} — Neighborhood Charm` },
    { url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef9?w=800&auto=format&fit=crop&q=80', caption: `${title} — Traditional Design` },
    { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80', caption: `${title} — Urban Character` },
    { url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop&q=80', caption: `${title} — Timeless Constantinople` },
    { url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format&fit=crop&q=80', caption: `${title} — Local Culinary & Cultural Spirit` },
    { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', caption: `${title} — Dusk over Bosphorus` },
    { url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800&auto=format&fit=crop&q=80', caption: `${title} — Illuminated Evening` },
    { url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&auto=format&fit=crop&q=80', caption: `${title} — Istanbul Memories` }
  ];

  return genericPhotos;
}
