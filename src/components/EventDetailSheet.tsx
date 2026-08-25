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
          <p className="text-base text-slate-300 font-semibold mt-1 max-w-[280px]">
            Click any activity on the timeline to view its details.
          </p>
        </div>
      );
    }
    return null;
  }

  const getTypeBadge = (type: EventType) => {
    switch (type) {
      case 'visit': return { label: 'Landmark', dot: 'bg-sky-400' };
      case 'food': return { label: 'Dining', dot: 'bg-rose-400' };
      case 'drink': return { label: 'Heritage', dot: 'bg-amber-400' };
      case 'walk': return { label: 'Walk', dot: 'bg-emerald-400' };
      case 'transport': return { label: 'Transfer', dot: 'bg-cyan-400' };
      case 'concert': return { label: 'Concert', dot: 'bg-indigo-400' };
      case 'rest': return { label: 'Break', dot: 'bg-slate-400' };
      case 'optional': return { label: 'Optional', dot: 'bg-slate-400' };
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
  const typeBadge = getTypeBadge(event.type);

  const content = (
    <div className="flex flex-col h-full overflow-y-auto space-y-5 p-5 sm:p-7 text-slate-100 custom-scrollbar">
      
      {/* ========================================================================= */}
      {/* 1. COHESIVE, IDENTICAL-HEIGHT TOP HEADER BAR (All elements exactly 34px)  */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-700/60 pb-4">
        
        {/* Category Pill (Single line, consistent height) */}
        <div className="h-9 px-3.5 rounded-xl bg-[#222838]/90 text-slate-200 border border-slate-700/80 text-xs font-black uppercase tracking-wider flex items-center gap-2 whitespace-nowrap shadow-sm backdrop-blur-sm">
          <span className={`w-2 h-2 rounded-full ${typeBadge.dot}`} />
          <span>{typeBadge.label}</span>
        </div>

        {/* Top Action Cluster (Pure Icon Buttons: Maps, Images, Close) */}
        <div className="flex items-center gap-2">
          {event.location && (
            <a
              href={getDirectionsUrl(event.location)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-[#2a3147] hover:bg-[#343e5a] active:scale-95 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-600 flex items-center justify-center transition shadow-sm backdrop-blur-sm shrink-0"
              title="Open directions in Google Maps"
              aria-label="Open in Google Maps"
            >
              <Navigation className="w-4 h-4 text-sky-400" />
            </a>
          )}

          {/* Google Images Icon Button */}
          <a
            href={getGoogleImagesUrl(event.title, event.location)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-[#2a3147] hover:bg-[#343e5a] active:scale-95 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-600 flex items-center justify-center transition shadow-sm backdrop-blur-sm shrink-0"
            title="Browse photo galleries on Google Images"
            aria-label="Search photos on Google Images"
          >
            <ImageIcon className="w-4 h-4 text-indigo-400" />
          </a>

          {!isDesktopSidebar && (
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-[#2a3147] hover:bg-[#343e5a] active:scale-95 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center transition shadow-sm shrink-0"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TITLE & ULTRA-READABLE TIME RIBBON                                     */}
      {/* ========================================================================= */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight drop-shadow-sm">
          {event.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2.5 text-sm sm:text-base font-bold text-slate-200">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#222838] text-white border border-slate-700 font-mono font-black shadow-inner">
            <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
            {formatEventTime(event.startTime)} – {formatEventTime(event.endTime)}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-black/40 text-slate-200 font-mono text-sm font-black border border-white/10">
            {formatDuration(event.durationMinutes)}
          </span>
          {event.durationNote && (
            <span className="text-slate-300 italic text-sm font-semibold">
              ({event.durationNote})
            </span>
          )}
          {event.location && (
            <>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300 font-semibold truncate max-w-[220px]">
                {event.location.split(',')[0]}
              </span>
            </>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. THE ESSENCE & STORY (High Contrast, Large Readable Typography)          */}
      {/* ========================================================================= */}
      {(event.what || event.why) && (
        <div className="p-5 sm:p-6 rounded-2xl bg-[#1e2434]/95 backdrop-blur-md border border-slate-700/80 shadow-md space-y-3">
          {event.what && (
            <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {event.what}
            </p>
          )}
          {event.why && (
            <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-200 border-t border-slate-700/60 pt-3">
              {event.why}
            </p>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. FIELD HIGHLIGHTS                                                       */}
      {/* ========================================================================= */}
      {event.facts && event.facts.length > 0 && (
        <div className="p-5 sm:p-6 rounded-2xl bg-[#1e2434]/95 backdrop-blur-md border border-slate-700/80 shadow-sm space-y-3">
          <div className="text-xs font-black uppercase tracking-wider text-indigo-300">
            Key Highlights
          </div>
          <ul className="space-y-2.5">
            {event.facts.map((fact, index) => (
              <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-slate-100 font-semibold leading-relaxed">
                <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2 shrink-0" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. FIELD GUIDELINES (DO / AVOID / FOOD)                                    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {event.do && (
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/50 backdrop-blur-sm border border-emerald-500/40 flex items-start gap-3">
            <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-emerald-100 font-semibold leading-relaxed">
              <strong className="text-emerald-300 block mb-1 text-xs uppercase tracking-wider font-black">Recommended:</strong>
              {event.do}
            </p>
          </div>
        )}

        {event.avoid && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/50 backdrop-blur-sm border border-amber-500/40 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-amber-100 font-semibold leading-relaxed">
              <strong className="text-amber-300 block mb-1 text-xs uppercase tracking-wider font-black">Note / Avoid:</strong>
              {event.avoid}
            </p>
          </div>
        )}
      </div>

      {event.food && (
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/50 backdrop-blur-sm border border-rose-500/40 flex items-start gap-3">
          <Utensils className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <p className="text-sm sm:text-base text-rose-100 font-semibold leading-relaxed">
            <strong className="text-rose-300 block mb-1 text-xs uppercase tracking-wider font-black">What to Order:</strong>
            {event.food}
          </p>
        </div>
      )}

      {/* Entry Tickets & Reservations Chips */}
      {(event.ticket || event.reservation) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {event.ticket && (
            <div className="p-4 rounded-xl bg-[#1e2434]/95 backdrop-blur-sm border border-slate-700 flex items-center justify-between text-sm">
              <span className="font-bold text-slate-300 flex items-center gap-2">
                <Ticket className="w-4 h-4 text-emerald-400" />
                <span>Entry:</span>
              </span>
              <span className="font-mono font-black text-emerald-300 text-sm sm:text-base">{event.ticket}</span>
            </div>
          )}
          {event.reservation && (
            <div className="p-4 rounded-xl bg-[#1e2434]/95 backdrop-blur-sm border border-slate-700 flex items-center justify-between text-sm">
              <span className="font-bold text-slate-300 flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-rose-400" />
                <span>Reservation:</span>
              </span>
              <span className="font-mono font-black text-rose-300 text-sm sm:text-base">{event.reservation}</span>
            </div>
          )}
        </div>
      )}

      {/* Notes */}
      {event.notes && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1e2434]/95 backdrop-blur-sm border border-slate-700/70 flex items-start gap-3">
          <FileText className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed whitespace-pre-line">
            {event.notes}
          </p>
        </div>
      )}

      {/* Exact Location Full Address */}
      {event.location && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1e2434]/95 backdrop-blur-sm border border-slate-700/70 flex items-start gap-3 text-sm sm:text-base">
          <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
          <span className="text-slate-100 font-bold leading-relaxed">{event.location}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. SOCIAL & EXTRA VERIFIED LINKS                                          */}
      {/* ========================================================================= */}
      {(igLink || otherLinks.length > 0) && (
        <div className="pt-3 border-t border-slate-700/60">
          <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2.5">
            Official Links
          </div>
          <div className="flex flex-wrap gap-2.5">
            {/* Official Verified Instagram Profile (Only if verified handle exists!) */}
            {igLink && (
              <a
                href={igLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#1e2434]/95 hover:bg-[#273044] border border-slate-700 hover:border-pink-500/50 text-slate-100 hover:text-white text-sm font-bold transition shadow-sm backdrop-blur-sm"
              >
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <span>@{igLink.url.replace(/\/$/, '').split('/').pop() || 'Instagram'}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 opacity-60" />
              </a>
            )}

            {/* Official Web / Extra Links */}
            {otherLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#1e2434]/95 hover:bg-[#273044] border border-slate-700 hover:border-indigo-500/50 text-slate-100 hover:text-white text-sm font-bold transition shadow-sm backdrop-blur-sm"
              >
                <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{link.label}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 opacity-60" />
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
      <div className="relative z-10 w-full max-h-[92vh] bg-[#141822] rounded-t-3xl border-t border-slate-700/80 shadow-2xl overflow-hidden animate-sheet-up flex flex-col">
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
