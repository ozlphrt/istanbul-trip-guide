import React from 'react';
import {
  X,
  Navigation,
  Landmark,
  Utensils,
  Clock,
  Ticket,
  CalendarCheck,
  FileText,
  ExternalLink,
  Instagram,
  Check,
  AlertCircle,
  MapPin,
  Image as ImageIcon,
  Globe
} from 'lucide-react';
import { EventStatus, EventType, ItineraryEvent } from '../types/calendar';
import { formatDuration, formatEventTime } from '../utils/time';
import { getPlacePhotoUrl } from '../utils/placePhotos';

interface EventDetailSheetProps {
  event: ItineraryEvent | null;
  onClose: () => void;
  onUpdateStatus: (eventId: string, status: EventStatus) => void;
  isDesktopSidebar?: boolean;
}

export const EventDetailSheet: React.FC<EventDetailSheetProps> = ({
  event,
  onClose,
  isDesktopSidebar = false,
}) => {
  if (!event) {
    if (isDesktopSidebar) {
      return (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400 bg-[#161a24] rounded-3xl border border-slate-800 shadow-sm">
          <Landmark className="w-14 h-14 mb-3 text-slate-500 opacity-60" />
          <p className="text-xl font-black text-slate-200">Select an activity</p>
          <p className="text-base text-slate-400 font-semibold mt-1 max-w-[280px]">
            Click any activity on the timeline to view its private briefing.
          </p>
        </div>
      );
    }
    return null;
  }

  const getTypeLabel = (type: EventType) => {
    switch (type) {
      case 'visit': return 'Imperial Landmark';
      case 'food': return 'Artisanal Culinary';
      case 'drink': return 'Living Heritage';
      case 'walk': return 'Neighborhood Walk';
      case 'transport': return 'Scenic Transfer';
      case 'concert': return 'Live Performance';
      case 'rest': return 'Buffer & Rest';
      case 'optional': return 'Flexible Option';
    }
  };

  const getDirectionsUrl = (location?: string) => {
    if (!location) return '#';
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}`;
  };

  const getGoogleImagesUrl = (title: string, location?: string) => {
    return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
      location ? `${title} ${location}` : `${title} Istanbul`
    )}`;
  };

  const photoUrl = getPlacePhotoUrl(event.id, event.title);
  const igLink = event.links?.find(l => l.type === 'ig');
  const otherLinks = event.links?.filter(l => l.type !== 'ig') || [];

  const content = (
    <div className="flex flex-col h-full overflow-y-auto space-y-4 p-5 sm:p-6 text-slate-100 custom-scrollbar">
      
      {/* ========================================================================= */}
      {/* 1. LUXE EXPEDITION HEADER WITH GOOGLE IMAGES & MAPS (NO DONE BUTTON)      */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between gap-2 border-b border-amber-500/20 pb-3.5">
        {/* Warm Gold Category Monogram */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm backdrop-blur-sm">
          <span>✦</span>
          <span>{getTypeLabel(event.type)}</span>
        </span>

        {/* Top Micro-Action Cluster (Maps + Google Images + Close) */}
        <div className="flex items-center gap-1.5">
          {event.location && (
            <a
              href={getDirectionsUrl(event.location)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-95 text-slate-950 text-xs font-black transition shadow-md"
              title="Open directions in Google Maps"
            >
              <Navigation className="w-3.5 h-3.5 shrink-0" />
              <span>Maps</span>
            </a>
          )}

          {/* Google Images Button at Top (Replacing Done button) */}
          <a
            href={getGoogleImagesUrl(event.title, event.location)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1c2230]/90 hover:bg-[#273044] active:scale-95 border border-slate-700 hover:border-amber-500/40 text-slate-200 hover:text-white text-xs font-bold transition shadow-sm backdrop-blur-sm"
            title="Browse photo galleries on Google Images"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>Images</span>
            <ExternalLink className="w-3 h-3 text-slate-400 opacity-60" />
          </a>

          {!isDesktopSidebar && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-[#1c2230]/90 text-slate-400 hover:text-white hover:bg-[#273044] border border-slate-700 transition"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TITLE & LUXURY TIME RIBBON                                             */}
      {/* ========================================================================= */}
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
          {event.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs sm:text-sm font-bold text-slate-300">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-[#1e2434] text-amber-200 border border-amber-500/20 font-mono font-black">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            {formatEventTime(event.startTime)} – {formatEventTime(event.endTime)}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-black/40 text-slate-300 font-mono text-xs font-bold border border-white/10">
            {formatDuration(event.durationMinutes)}
          </span>
          {event.durationNote && (
            <span className="text-slate-400 italic text-xs">
              ({event.durationNote})
            </span>
          )}
          {event.location && (
            <>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400 truncate max-w-[200px]">
                {event.location.split(',')[0]}
              </span>
            </>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. THE ESSENCE (Luxury Pull-Quote Card)                                   */}
      {/* ========================================================================= */}
      {(event.what || event.why) && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1c2230]/90 backdrop-blur-md border border-amber-500/20 shadow-md space-y-2.5">
          <div className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
            <span>✦</span>
            <span>THE ESSENCE</span>
          </div>
          {event.what && (
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
              {event.what}
            </p>
          )}
          {event.why && (
            <p className="text-xs sm:text-sm font-medium leading-relaxed italic border-t border-slate-700/60 pt-2.5 text-amber-100/90">
              {event.why}
            </p>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. CURATOR'S FIELD HIGHLIGHTS                                             */}
      {/* ========================================================================= */}
      {event.facts && event.facts.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#181e2b]/90 backdrop-blur-md border border-slate-700/70 shadow-sm space-y-2.5">
          <div className="text-[11px] font-black uppercase tracking-wider text-slate-300">
            Curator’s Field Highlights
          </div>
          <ul className="space-y-2">
            {event.facts.map((fact, index) => (
              <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 font-semibold leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. FIELD GUIDELINES (DO / AVOID / FOOD)                                    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {event.do && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-950/40 backdrop-blur-sm border border-emerald-500/30 flex items-start gap-2.5">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-emerald-100 font-semibold leading-relaxed">
              <strong className="text-emerald-300 block mb-0.5 text-[11px] uppercase tracking-wider">Recommended:</strong>
              {event.do}
            </p>
          </div>
        )}

        {event.avoid && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-950/40 backdrop-blur-sm border border-amber-500/30 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-amber-100 font-semibold leading-relaxed">
              <strong className="text-amber-300 block mb-0.5 text-[11px] uppercase tracking-wider">Caution:</strong>
              {event.avoid}
            </p>
          </div>
        )}
      </div>

      {event.food && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-rose-950/40 backdrop-blur-sm border border-rose-500/30 flex items-start gap-2.5">
          <Utensils className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-rose-100 font-semibold leading-relaxed">
            <strong className="text-rose-300 block mb-0.5 text-[11px] uppercase tracking-wider">What to Order:</strong>
            {event.food}
          </p>
        </div>
      )}

      {/* Entry Tickets & Reservations Chips */}
      {(event.ticket || event.reservation) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {event.ticket && (
            <div className="p-3 rounded-xl bg-[#1c2230]/90 backdrop-blur-sm border border-slate-700 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-400 flex items-center gap-1.5">
                <Ticket className="w-3.5 h-3.5 text-amber-400" />
                <span>Access Pass:</span>
              </span>
              <span className="font-mono font-black text-amber-300">{event.ticket}</span>
            </div>
          )}
          {event.reservation && (
            <div className="p-3 rounded-xl bg-[#1c2230]/90 backdrop-blur-sm border border-slate-700 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-400 flex items-center gap-1.5">
                <CalendarCheck className="w-3.5 h-3.5 text-rose-400" />
                <span>Reservation:</span>
              </span>
              <span className="font-mono font-black text-rose-300">{event.reservation}</span>
            </div>
          )}
        </div>
      )}

      {/* Notes */}
      {event.notes && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#1c2230]/90 backdrop-blur-sm border border-slate-700/70 flex items-start gap-2.5">
          <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed whitespace-pre-line">
            {event.notes}
          </p>
        </div>
      )}

      {/* Exact Location Full Address */}
      {event.location && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#1c2230]/90 backdrop-blur-sm border border-slate-700/70 flex items-start gap-2.5 text-xs sm:text-sm">
          <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span className="text-slate-200 font-semibold leading-relaxed">{event.location}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. SOCIAL & EXTRA VERIFIED LINKS                                          */}
      {/* ========================================================================= */}
      {(igLink || otherLinks.length > 0) && (
        <div className="pt-2 border-t border-slate-700/60">
          <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">
            Official Links
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Official Verified Instagram Profile (Only if verified handle exists!) */}
            {igLink && (
              <a
                href={igLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1c2230]/90 hover:bg-[#273044] border border-slate-700 hover:border-pink-500/50 text-slate-200 hover:text-white text-xs font-bold transition shadow-sm backdrop-blur-sm"
              >
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <span>@{igLink.url.replace(/\/$/, '').split('/').pop() || 'Instagram'}</span>
                <ExternalLink className="w-3 h-3 text-slate-400 opacity-60" />
              </a>
            )}

            {/* Official Web / Extra Links */}
            {otherLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1c2230]/90 hover:bg-[#273044] border border-slate-700 hover:border-amber-500/50 text-slate-200 hover:text-white text-xs font-bold transition shadow-sm backdrop-blur-sm"
              >
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{link.label}</span>
                <ExternalLink className="w-3 h-3 text-slate-400 opacity-60" />
              </a>
            ))}
          </div>
        </div>
      )}

    </div>
  );

  // Desktop Sidebar Layout
  if (isDesktopSidebar) {
    return (
      <div className="relative h-full bg-[#141822] rounded-3xl border border-slate-800 shadow-sm overflow-hidden flex flex-col">
        {/* Stylized Monochromatic Landmark Photo Backdrop */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          <img
            src={photoUrl}
            alt=""
            className="w-full h-full object-cover object-center opacity-30 filter grayscale contrast-125 select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#141822]/80 via-[#141822]/90 to-[#141822]" />
        </div>

        <div className="relative z-10 h-full overflow-hidden flex flex-col">
          {content}
        </div>
      </div>
    );
  }

  // Mobile Bottom Sheet with Backdrop
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Bottom Sheet Container */}
      <div className="relative z-10 w-full max-h-[92vh] bg-[#141822] rounded-t-3xl border-t border-amber-500/20 shadow-2xl overflow-hidden animate-sheet-up flex flex-col">
        {/* Stylized Monochromatic Landmark Photo Backdrop */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          <img
            src={photoUrl}
            alt=""
            className="w-full h-full object-cover object-center opacity-30 filter grayscale contrast-125 select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#141822]/80 via-[#141822]/90 to-[#141822]" />
        </div>

        {/* Drag Handle */}
        <div className="relative z-10 py-3 flex justify-center items-center shrink-0 cursor-grab">
          <div className="w-12 h-1.5 rounded-full bg-slate-600" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 overflow-y-auto pb-10">
          {content}
        </div>
      </div>
    </div>
  );
};
