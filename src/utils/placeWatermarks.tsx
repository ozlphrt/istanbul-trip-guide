import React from 'react';

/**
 * Returns a customized, place-specific architectural silhouette watermark SVG
 * tailored specifically to each individual Istanbul destination.
 */
export function getPlaceWatermark(eventId: string, title: string = ''): React.ReactNode {
  const clean = title.toLowerCase();

  // 1. Hagia Sophia (Ayasofya)
  if (eventId.includes('0923-3') || clean.includes('hagia sophia') || clean.includes('ayasofya')) {
    return (
      <svg className="absolute -right-2 -bottom-2 w-32 h-32 text-sky-400/[0.14] pointer-events-none stroke-current fill-current/5" viewBox="0 0 120 120" fill="none">
        {/* Hagia Sophia central dome, buttresses and minarets */}
        <path d="M10 105 L110 105 M18 105 L18 35 L22 30 L22 105 M98 105 L98 30 L102 35 L102 105 M26 105 L26 70 L34 60 L34 105 M86 105 L86 60 L94 70 L94 105 M34 78 C34 45 86 45 86 78 Z M45 48 C45 38 75 38 75 48 Z M60 38 L60 22 M57 22 L63 22 M60 22 L60 16" strokeWidth="1.6" />
        <circle cx="60" cy="58" r="4" strokeWidth="1.2" />
        <path d="M42 85 A 6 6 0 0 1 54 85 M66 85 A 6 6 0 0 1 78 85" strokeWidth="1.2" />
      </svg>
    );
  }

  // 2. Basilica Cistern (Yerebatan Sarnıcı)
  if (eventId.includes('0923-5') || clean.includes('basilica cistern') || clean.includes('yerebatan')) {
    return (
      <svg className="absolute -right-2 -bottom-2 w-32 h-32 text-sky-400/[0.14] pointer-events-none stroke-current" viewBox="0 0 120 120" fill="none">
        {/* Sunken columns and vaulted subterranean arches */}
        <path d="M15 105 L105 105 M25 105 L25 35 M55 105 L55 35 M85 105 L85 35" strokeWidth="2" />
        <path d="M20 35 Q40 15 55 35 Q70 15 85 35 Q100 15 110 35" strokeWidth="1.6" />
        <path d="M20 50 Q40 30 55 50 Q70 30 85 50" strokeWidth="1.2" opacity="0.6" />
        {/* Medusa Head Silhouette */}
        <circle cx="55" cy="85" r="10" strokeWidth="1.4" />
        <path d="M48 80 Q55 75 62 80 M51 83 A 2 2 0 0 0 53 83 M57 83 A 2 2 0 0 0 59 83 M52 89 Q55 92 58 89" strokeWidth="1.2" />
      </svg>
    );
  }

  // 3. Galata Tower (Galata Kulesi)
  if (eventId.includes('0924-5') || clean.includes('galata tower') || clean.includes('galata')) {
    return (
      <svg className="absolute -right-2 -bottom-2 w-30 h-32 text-indigo-400/[0.14] pointer-events-none stroke-current fill-current/5" viewBox="0 0 120 120" fill="none">
        {/* Cylindrical stone tower with conical cap and arched windows */}
        <path d="M35 105 L35 48 L28 48 L28 42 L60 12 L92 42 L92 48 L85 48 L85 105 Z" strokeWidth="1.8" />
        <path d="M35 56 L85 56 M35 72 L85 72 M35 88 L85 88" strokeWidth="1.2" opacity="0.6" />
        <path d="M54 62 A 4 4 0 0 1 66 62 L66 68 L54 68 Z M54 78 A 4 4 0 0 1 66 78 L66 84 L54 84 Z" strokeWidth="1.2" />
        <circle cx="60" cy="8" r="2.5" strokeWidth="1.2" />
      </svg>
    );
  }

  // 4. Süleymaniye Mosque
  if (eventId.includes('0924-1') || clean.includes('süleymaniye') || clean.includes('suleymaniye')) {
    return (
      <svg className="absolute -right-2 -bottom-2 w-32 h-32 text-sky-400/[0.14] pointer-events-none stroke-current" viewBox="0 0 120 120" fill="none">
        {/* Sinan cascade of 4 minarets and central dome */}
        <path d="M12 105 L108 105 M16 105 L16 28 L20 22 L20 105 M100 105 L100 22 L104 28 L104 105 M28 105 L28 42 L32 38 L32 105 M88 105 L88 38 L92 42 L92 105" strokeWidth="1.5" />
        <path d="M32 80 C32 40 88 40 88 80 Z" strokeWidth="1.8" />
        <path d="M44 52 C44 32 76 32 76 52 Z" strokeWidth="1.5" />
        <path d="M60 32 L60 18 M57 18 L63 18" strokeWidth="1.5" />
      </svg>
    );
  }

  // 5. Topkapı Palace (Imperial Gate & Diwan)
  if (eventId.includes('0923-2') || clean.includes('topkapı') || clean.includes('topkapi')) {
    return (
      <svg className="absolute -right-2 -bottom-2 w-32 h-32 text-sky-400/[0.14] pointer-events-none stroke-current" viewBox="0 0 120 120" fill="none">
        {/* Bab-us Selam twin octagonal towers with conical caps */}
        <path d="M15 105 L105 105 M20 105 L20 50 L14 50 L32 18 L50 50 L44 50 L44 105 Z M76 105 L76 50 L70 50 L88 18 L106 50 L100 50 L100 105 Z" strokeWidth="1.6" />
        <path d="M44 65 Q60 55 76 65 L76 105 L44 105 Z" strokeWidth="1.6" />
        <path d="M50 82 A 10 10 0 0 1 70 82 L70 105 L50 105 Z" strokeWidth="1.4" />
      </svg>
    );
  }

  // 6. Bosphorus Ferries & Strait (Şehir Hatları)
  if (clean.includes('ferry') || clean.includes('kadıköy') || clean.includes('bosphorus') || clean.includes('üsküdar') || clean.includes('eminönü')) {
    return (
      <svg className="absolute -right-2 -bottom-2 w-32 h-32 text-cyan-400/[0.14] pointer-events-none stroke-current" viewBox="0 0 120 120" fill="none">
        {/* Double-deck historic Istanbul ferry and waves */}
        <path d="M12 78 L108 78 L95 95 L25 95 Z" strokeWidth="1.8" />
        <path d="M28 78 L28 58 L92 58 L92 78" strokeWidth="1.5" />
        <path d="M42 58 L42 42 L78 42 L78 58" strokeWidth="1.5" />
        <path d="M56 42 L56 28 L64 28 L64 42" strokeWidth="1.8" />
        <path d="M54 28 L66 28" strokeWidth="1.5" />
        {/* Windows and Waves */}
        <path d="M34 68 H40 M46 68 H52 M58 68 H64 M70 68 H76 M82 68 H88" strokeWidth="1.5" />
        <path d="M8 104 Q25 98 42 104 T76 104 T110 104" strokeWidth="1.5" />
      </svg>
    );
  }

  // 7. Grand Bazaar & Spice Bazaar (Kapalıçarşı & Mısır Çarşısı)
  if (clean.includes('bazaar') || clean.includes('kapalıçarşı') || clean.includes('çarşı') || clean.includes('spice')) {
    return (
      <svg className="absolute -right-2 -bottom-2 w-32 h-32 text-emerald-400/[0.14] pointer-events-none stroke-current" viewBox="0 0 120 120" fill="none">
        {/* Monumental vaulted stone entrance archway */}
        <path d="M20 105 L20 45 Q60 15 100 45 L100 105 M32 105 L32 55 Q60 30 88 55 L88 105" strokeWidth="1.8" />
        <path d="M42 105 L42 70 Q60 50 78 70 L78 105" strokeWidth="1.5" />
        <circle cx="60" cy="42" r="4" strokeWidth="1.4" />
        <path d="M15 105 L105 105" strokeWidth="2" />
      </svg>
    );
  }

  // 8. Karaköy Güllüoğlu / Hacı Bekir / Hafız Mustafa (Baklava & Sweets)
  if (clean.includes('güllüoğlu') || clean.includes('baklava') || clean.includes('bekir') || clean.includes('hafız') || clean.includes('sweet') || clean.includes('tatlı')) {
    return (
      <svg className="absolute -right-2 -bottom-2 w-30 h-30 text-amber-400/[0.14] pointer-events-none stroke-current" viewBox="0 0 120 120" fill="none">
        {/* Diamond baklava cuts & Turkish tea glass */}
        <path d="M20 60 L45 35 L70 60 L45 85 Z M45 35 L70 10 L95 35 L70 60 Z M70 60 L95 35 L120 60 L95 85 Z" strokeWidth="1.5" />
        <path d="M72 105 C72 88 88 84 88 68 C88 62 82 58 82 50 L102 50 C102 58 96 62 96 68 C96 84 112 88 112 105 Z" strokeWidth="1.6" />
        <path d="M70 105 L114 105" strokeWidth="2" />
      </svg>
    );
  }

  // 9. Şehzade Cağ Kebap / Hamdi / Çiya / Lokanta (Authentic Kebab & Food)
  if (clean.includes('kebap') || clean.includes('kebab') || clean.includes('şehzade') || clean.includes('hamdi') || clean.includes('çiya') || clean.includes('köfte') || clean.includes('lunch') || clean.includes('dinner') || clean.includes('food')) {
    return (
      <svg className="absolute -right-2 -bottom-2 w-30 h-30 text-rose-400/[0.14] pointer-events-none stroke-current" viewBox="0 0 120 120" fill="none">
        {/* Clay oven & skewered rotating meats over ember flames */}
        <path d="M20 95 Q60 25 100 95 Z" strokeWidth="1.8" />
        <path d="M10 60 L110 60 M25 50 L35 70 M45 50 L55 70 M65 50 L75 70 M85 50 L95 70" strokeWidth="1.8" />
        <path d="M45 88 Q50 78 55 88 Q60 78 65 88 Q70 78 75 88" strokeWidth="1.5" />
        <path d="M15 102 L105 102" strokeWidth="2" />
      </svg>
    );
  }

  // 10. Coffee & Tea (Kurukahveci / Mandabatmaz / Simit & Çay)
  if (clean.includes('tea') || clean.includes('çay') || clean.includes('coffee') || clean.includes('kahve') || clean.includes('simit') || clean.includes('mandabatmaz')) {
    return (
      <svg className="absolute -right-2 -bottom-2 w-30 h-30 text-amber-400/[0.14] pointer-events-none stroke-current" viewBox="0 0 120 120" fill="none">
        {/* Ince belli Turkish tea glass & circular sesame simit */}
        <circle cx="42" cy="72" r="22" strokeWidth="2" />
        <circle cx="42" cy="72" r="14" strokeWidth="1.4" />
        <path d="M72 102 C72 86 85 82 85 68 C85 62 80 58 80 52 L98 52 C98 58 93 62 93 68 C93 82 106 86 106 102 Z" strokeWidth="1.8" />
        <path d="M68 102 L110 102" strokeWidth="2" />
        <path d="M85 45 Q89 38 85 32 M93 45 Q97 38 93 32" strokeWidth="1.2" />
      </svg>
    );
  }

  // 11. İstiklal Avenue & Vintage Tram (Beyoğlu / Pera)
  if (clean.includes('istiklal') || clean.includes('pera') || clean.includes('tram') || clean.includes('taksim')) {
    return (
      <svg className="absolute -right-2 -bottom-2 w-32 h-32 text-rose-400/[0.14] pointer-events-none stroke-current" viewBox="0 0 120 120" fill="none">
        {/* Historic Nostalgic red 1920s tram */}
        <path d="M28 92 L92 92 L88 42 L32 42 Z" strokeWidth="1.8" />
        <path d="M32 42 L32 28 L88 28 L88 42" strokeWidth="1.5" />
        <path d="M50 28 L40 10 L80 10 L70 28" strokeWidth="1.5" />
        <path d="M38 52 H54 V74 H38 Z M66 52 H82 V74 H66 Z" strokeWidth="1.4" />
        <circle cx="42" cy="98" r="6" strokeWidth="1.6" />
        <circle cx="78" cy="98" r="6" strokeWidth="1.6" />
        <path d="M20 104 L100 104" strokeWidth="2" />
      </svg>
    );
  }

  // 12. Babylon / Live Concert / Music (Bomontiada)
  if (clean.includes('babylon') || clean.includes('concert') || clean.includes('music') || clean.includes('bomonti')) {
    return (
      <svg className="absolute -right-2 -bottom-2 w-30 h-30 text-indigo-400/[0.14] pointer-events-none stroke-current" viewBox="0 0 120 120" fill="none">
        {/* Stage acoustics & musical notes */}
        <circle cx="40" cy="85" r="12" strokeWidth="1.8" />
        <circle cx="82" cy="72" r="12" strokeWidth="1.8" />
        <path d="M52 85 L52 35 L94 22 L94 72 M52 52 L94 39" strokeWidth="2" />
        <path d="M15 45 Q30 30 45 45 M10 25 Q35 5 60 25" strokeWidth="1.2" opacity="0.6" />
      </svg>
    );
  }

  // 13. Maiden's Tower / Kız Kulesi
  if (clean.includes('kız kulesi') || clean.includes('maiden') || clean.includes('kulesi')) {
    return (
      <svg className="absolute -right-2 -bottom-2 w-32 h-32 text-cyan-400/[0.14] pointer-events-none stroke-current" viewBox="0 0 120 120" fill="none">
        {/* Island fortress with watchtower and beacon lantern */}
        <path d="M15 95 L105 95 L95 105 L25 105 Z" strokeWidth="1.8" />
        <path d="M30 95 L30 65 L90 65 L90 95" strokeWidth="1.6" />
        <path d="M48 65 L48 35 L72 35 L72 65 M54 35 L60 20 L66 35" strokeWidth="1.6" />
        <circle cx="60" cy="18" r="2" strokeWidth="1.2" />
        <path d="M10 110 Q30 104 50 110 T90 110 T110 110" strokeWidth="1.4" />
      </svg>
    );
  }

  // 14. Ortaköy Mosque & Bosphorus Bridge
  if (clean.includes('ortaköy') || clean.includes('ortakoy') || clean.includes('bridge') || clean.includes('dolmabahçe')) {
    return (
      <svg className="absolute -right-2 -bottom-2 w-32 h-32 text-sky-400/[0.14] pointer-events-none stroke-current" viewBox="0 0 120 120" fill="none">
        {/* Suspension bridge cable and baroque waterside mosque */}
        <path d="M10 30 L60 70 L110 30 M10 30 L10 105 M110 30 L110 105" strokeWidth="1.5" />
        <path d="M35 105 L35 70 L65 70 L65 105 M40 70 C40 55 60 55 60 70" strokeWidth="1.6" />
        <path d="M30 105 L30 50 L34 45 L34 105 M70 105 L70 45 L74 50 L74 105" strokeWidth="1.4" />
        <path d="M5 105 L115 105" strokeWidth="2" />
      </svg>
    );
  }

  // Fallback: Default Ottoman Architectural Dome
  return (
    <svg className="absolute -right-2 -bottom-2 w-28 h-28 text-sky-400/[0.12] pointer-events-none stroke-current" viewBox="0 0 100 100" fill="none">
      <path d="M10 90 L90 90 M25 90 L25 40 L30 35 L30 90 M70 90 L70 35 L75 40 L75 90 M30 75 C30 50 70 50 70 75 Z M50 50 L50 35" strokeWidth="1.5" />
    </svg>
  );
}
