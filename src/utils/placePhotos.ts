/**
 * Curated high-resolution architectural & atmospheric destination photos
 * for every single stop in the Istanbul trip itinerary.
 */
export function getPlacePhotoUrl(eventId: string, title: string = ''): string {
  const clean = title.toLowerCase();

  // 1. Hagia Sophia
  if (eventId.includes('0923-3') || clean.includes('hagia sophia') || clean.includes('ayasofya')) {
    return 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&auto=format&fit=crop&q=80';
  }

  // 2. Basilica Cistern
  if (eventId.includes('0923-5') || clean.includes('basilica cistern') || clean.includes('yerebatan')) {
    return 'https://images.unsplash.com/photo-1627916607164-7b20241db935?w=800&auto=format&fit=crop&q=80';
  }

  // 3. Galata Tower
  if (eventId.includes('0924-5') || clean.includes('galata tower') || clean.includes('galata')) {
    return 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&auto=format&fit=crop&q=80';
  }

  // 4. Süleymaniye Mosque
  if (eventId.includes('0924-1') || clean.includes('süleymaniye') || clean.includes('suleymaniye')) {
    return 'https://images.unsplash.com/photo-1570783307997-c253457193b0?w=800&auto=format&fit=crop&q=80';
  }

  // 5. Topkapı Palace
  if (eventId.includes('0923-2') || clean.includes('topkapı') || clean.includes('topkapi')) {
    return 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&auto=format&fit=crop&q=80';
  }

  // 6. Grand Bazaar
  if (clean.includes('grand bazaar') || clean.includes('kapalıçarşı')) {
    return 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=800&auto=format&fit=crop&q=80';
  }

  // 7. Spice Bazaar / Mısır Çarşısı
  if (clean.includes('spice') || clean.includes('mısır çarşısı') || clean.includes('rüstem pasha')) {
    return 'https://images.unsplash.com/photo-1596484552994-0e6931548e6a?w=800&auto=format&fit=crop&q=80';
  }

  // 8. Bosphorus Ferry / Cruises
  if (clean.includes('ferry') || clean.includes('bosphorus') || clean.includes('kadıköy') || clean.includes('üsküdar') || clean.includes('eminönü')) {
    return 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop&q=80';
  }

  // 9. Karaköy Güllüoğlu / Baklava / Sweets
  if (clean.includes('güllüoğlu') || clean.includes('baklava') || clean.includes('hacı bekir') || clean.includes('hafız mustafa') || clean.includes('sweet') || clean.includes('tatlı')) {
    return 'https://images.unsplash.com/photo-1519869325930-281384150729?w=800&auto=format&fit=crop&q=80';
  }

  // 10. Turkish Tea & Coffee / Simit
  if (clean.includes('tea') || clean.includes('çay') || clean.includes('coffee') || clean.includes('kahve') || clean.includes('simit') || clean.includes('mandabatmaz')) {
    return 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80';
  }

  // 11. İstiklal Avenue / Vintage Tram / Pera
  if (clean.includes('istiklal') || clean.includes('pera') || clean.includes('tram') || clean.includes('taksim')) {
    return 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&auto=format&fit=crop&q=80';
  }

  // 12. Ortaköy Mosque & Bosphorus Bridge
  if (clean.includes('ortaköy') || clean.includes('ortakoy') || clean.includes('bridge') || clean.includes('bebek')) {
    return 'https://images.unsplash.com/photo-1589825698097-497d5267f893?w=800&auto=format&fit=crop&q=80';
  }

  // 13. Dolmabahçe Palace
  if (clean.includes('dolmabahçe') || clean.includes('dolmabahce')) {
    return 'https://images.unsplash.com/photo-1572025442646-866d16c84a54?w=800&auto=format&fit=crop&q=80';
  }

  // 14. Kebab & Fine Dining / Lokanta / Hamdi / Çiya
  if (clean.includes('kebap') || clean.includes('kebab') || clean.includes('şehzade') || clean.includes('hamdi') || clean.includes('çiya') || clean.includes('köfte') || clean.includes('lunch') || clean.includes('dinner')) {
    return 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80';
  }

  // 15. Babylon / Bomontiada / Live Concert
  if (clean.includes('babylon') || clean.includes('concert') || clean.includes('music') || clean.includes('bomonti')) {
    return 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80';
  }

  // 16. Kılıç Ali Paşa Hamam
  if (clean.includes('hamam') || clean.includes('kılıç') || clean.includes('kilic')) {
    return 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80';
  }

  // 17. Fener & Balat
  if (clean.includes('fener') || clean.includes('balat') || clean.includes('chora') || clean.includes('kariye')) {
    return 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80';
  }

  // 18. Airport / Flights
  if (clean.includes('airport') || clean.includes('flight') || clean.includes('havalimanı') || clean.includes('ist')) {
    return 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=80';
  }

  // 19. Hotel / Check-in
  if (clean.includes('hotel') || clean.includes('regie') || clean.includes('check-in') || clean.includes('rest')) {
    return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80';
  }

  // 20. Rooftop / Cocktail / Sunset
  if (clean.includes('mikla') || clean.includes('sunset') || clean.includes('cocktail') || clean.includes('bar')) {
    return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80';
  }

  // Fallback: General Istanbul Bosphorus skyline
  return 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop&q=80';
}
