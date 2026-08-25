import React from 'react';
import {
  X,
  Navigation,
  CheckCircle2,
  Landmark,
  Utensils,
  Wine,
  Footprints,
  Ship,
  Music,
  BedDouble,
  HelpCircle,
  Clock,
  Ticket,
  CalendarCheck,
  FileText,
  ExternalLink,
  Globe,
  Instagram,
  Check,
  AlertCircle,
  MapPin,
  Share2,
  Image as ImageIcon
} from 'lucide-react';
import { EventLink, EventStatus, EventType, ItineraryEvent } from '../types/calendar';
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
  onUpdateStatus,
  isDesktopSidebar = false,
}) => {
  if (!event) {
    if (isDesktopSidebar) {
      return (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400 bg-[#1e2330] rounded-3xl border border-slate-700/60 shadow-sm">
          <Landmark className="w-14 h-14 mb-3 text-slate-500 opacity-60" />
          <p className="text-xl font-black text-slate-200">Select an activity</p>
          <p className="text-base text-slate-300 font-semibold mt-1 max-w-[280px]">
            Click any activity on the timeline to view details.
          </p>
        </div>
      );
    }
    return null;
  }

  const getTypeIcon = (type: EventType) => {
    switch (type) {
      case 'visit': return <Landmark className="w-5 h-5 text-sky-400" />;
      case 'food': return <Utensils className="w-5 h-5 text-rose-400" />;
      case 'drink': return <Wine className="w-5 h-5 text-amber-300" />;
      case 'walk': return <Footprints className="w-5 h-5 text-emerald-400" />;
      case 'transport': return <Ship className="w-5 h-5 text-cyan-400" />;
      case 'concert': return <Music className="w-5 h-5 text-indigo-400" />;
      case 'rest': return <BedDouble className="w-5 h-5 text-slate-400" />;
      case 'optional': return <HelpCircle className="w-5 h-5 text-slate-400" />;
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

  const getLinkIcon = (link: EventLink) => {
    switch (link.type) {
      case 'ig': return <Instagram className="w-5 h-5 text-pink-400 shrink-0" />;
      case 'web': return <Globe className="w-5 h-5 text-sky-400 shrink-0" />;
      case 'fb': return <Share2 className="w-5 h-5 text-blue-400 shrink-0" />;
      case 'x': return <span className="font-black text-base">𝕏</span>;
      default: return <ExternalLink className="w-5 h-5 text-indigo-400 shrink-0" />;
    }
  };

  const content = (
    <div className="flex flex-col h-full overflow-y-auto space-y-5 p-5 sm:p-7 text-slate-100 custom-scrollbar">
      {/* ========================================================================= */}
      {/* 1. HEADER: Category Badge, Title, Time & What                             */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        {/* Top Badges & Close Button */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider bg-[#282e3e] text-slate-100 border border-slate-600">
              {getTypeIcon(event.type)}
              <span>{event.type}</span>
            </span>
          </div>

          {!isDesktopSidebar && (
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-[#282e3e] text-slate-300 hover:text-white hover:bg-[#31384b] transition border border-slate-700"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
          {event.title}
        </h1>

        {/* Time & Duration Bar */}
        <div className="flex flex-wrap items-center gap-2.5 text-base sm:text-lg font-bold text-slate-200">
          <span className="flex items-center gap-2 text-white font-black font-mono">
            <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
            {formatEventTime(event.startTime)} – {formatEventTime(event.endTime)}
          </span>
          <span className="text-slate-500">•</span>
          <span className="px-3 py-0.5 rounded-lg bg-[#282e3e] text-slate-100 font-mono text-sm font-black border border-slate-600">
            {formatDuration(event.durationMinutes)}
          </span>
          {event.durationNote && (
            <span className="text-slate-300 text-sm font-semibold italic">
              ({event.durationNote})
            </span>
          )}
        </div>

        {/* What It Is */}
        {event.what && (
          <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-semibold pt-2 border-t border-slate-700/60">
            {event.what}
          </p>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. ACTIONS: Google Maps & Status                                          */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {event.location && (
          <a
            href={getDirectionsUrl(event.location)}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:col-span-2 flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white text-sm sm:text-base font-black tracking-wide transition shadow-sm"
          >
            <Navigation className="w-5 h-5 shrink-0" />
            <span className="truncate">Open in Google Maps</span>
            <ExternalLink className="w-4 h-4 opacity-75 shrink-0" />
          </a>
        )}

        {/* Status Toggle Button */}
        <button
          onClick={() => onUpdateStatus(event.id, event.status === 'done' ? 'pending' : 'done')}
          className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl text-sm sm:text-base font-black border transition ${
            event.status === 'done'
              ? 'bg-emerald-500/25 border-emerald-500/40 text-emerald-200'
              : 'bg-[#282e3e] border-slate-600 text-slate-100 hover:bg-[#31384b] hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{event.status === 'done' ? 'Completed' : 'Mark Done'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 3. NARRATIVE & HIGHLIGHTS (Direct Content without cheesy headlines)        */}
      {/* ========================================================================= */}
      {(event.why || (event.facts && event.facts.length > 0)) && (
        <div className="bg-[#242938] rounded-2xl p-5 sm:p-6 border border-slate-700/70 shadow-sm space-y-4">
          {/* Main Context Paragraph */}
          {event.why && (
            <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-semibold">
              {event.why}
            </p>
          )}

          {/* Key Facts & Bullet Points */}
          {event.facts && event.facts.length > 0 && (
            <ul className={`space-y-2.5 ${event.why ? 'pt-3 border-t border-slate-700/60' : ''}`}>
              {event.facts.map((fact, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-200 font-semibold leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Culinary Food Notes */}
      {event.food && (
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/30 border border-rose-500/30 flex items-start gap-3">
          <Utensils className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <p className="text-sm sm:text-base text-rose-100 font-semibold leading-relaxed">
            {event.food}
          </p>
        </div>
      )}

      {/* Do & Recommended */}
      {event.do && (
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3">
          <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-sm sm:text-base text-emerald-100 font-semibold leading-relaxed">
            {event.do}
          </p>
        </div>
      )}

      {/* Avoid / Warnings */}
      {event.avoid && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-sm sm:text-base text-amber-100 font-semibold leading-relaxed">
            {event.avoid}
          </p>
        </div>
      )}

      {/* Tickets & Reservations */}
      {(event.ticket || event.reservation) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {event.ticket && (
            <div className="p-4 rounded-xl bg-[#242938] border border-slate-700 flex items-start gap-3">
              <Ticket className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Entry</span>
                <p className="text-sm sm:text-base text-white font-mono font-bold">
                  {event.ticket}
                </p>
              </div>
            </div>
          )}

          {event.reservation && (
            <div className="p-4 rounded-xl bg-[#242938] border border-slate-700 flex items-start gap-3">
              <CalendarCheck className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Reservation</span>
                <p className="text-sm sm:text-base text-white font-mono font-bold">
                  {event.reservation}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Logistics & General Notes */}
      {event.notes && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#242938] border border-slate-700/70 flex items-start gap-3">
          <FileText className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-sm sm:text-base text-slate-100 font-semibold leading-relaxed whitespace-pre-line">
            {event.notes}
          </p>
        </div>
      )}

      {/* Exact Location */}
      {event.location && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#242938] border border-slate-700/70 flex items-start gap-3">
          <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
          <span className="text-sm sm:text-base text-white font-bold leading-relaxed">{event.location}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. VISUALS & LINKS                                                        */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Instagram */}
        {(() => {
          const igLink = event.links?.find(l => l.type === 'ig');
          const igUrl = igLink
            ? igLink.url
            : `https://www.instagram.com/explore/tags/${encodeURIComponent(event.title.toLowerCase().replace(/[^a-z0-9]/g, ''))}/`;
          const igLabel = igLink
            ? `@${igLink.url.replace(/\/$/, '').split('/').pop() || 'Instagram'}`
            : 'Instagram Photos';

          return (
            <a
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#242938] hover:bg-[#2e3447] border border-slate-700 hover:border-pink-500/50 text-slate-100 hover:text-white transition group shadow-sm"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-pink-500/15 text-pink-400">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm sm:text-base font-bold text-white group-hover:text-pink-300 transition truncate">
                    {igLabel}
                  </div>
                  <div className="text-xs text-slate-400">Photos & stories</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition shrink-0" />
            </a>
          );
        })()}

        {/* Google Images */}
        <a
          href={getGoogleImagesUrl(event.title, event.location)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#242938] hover:bg-[#2e3447] border border-slate-700 hover:border-sky-500/50 text-slate-100 hover:text-white transition group shadow-sm"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-sky-500/15 text-sky-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition">
                Google Images
              </div>
              <div className="text-xs text-slate-400">Visual galleries</div>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition shrink-0" />
        </a>

        {/* Other Specific Links */}
        {event.links && event.links.filter(l => l.type !== 'ig').map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#242938] hover:bg-[#2e3447] border border-slate-700 hover:border-slate-500 text-slate-100 hover:text-white transition group shadow-sm"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-lg bg-white/[0.06] text-slate-300">
                {getLinkIcon(link)}
              </div>
              <div className="min-w-0">
                <div className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition truncate">
                  {link.label}
                </div>
                <div className="text-xs text-slate-400 uppercase font-mono">{link.type} link</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );

  // Desktop Sidebar Layout
  if (isDesktopSidebar) {
    return (
      <div className="relative h-full bg-[#1e2330] rounded-3xl border border-slate-700/60 shadow-sm overflow-hidden flex flex-col">
        {/* Stylized Monochromatic Place Photo Hero Backdrop */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          <img
            src={getPlacePhotoUrl(event.id, event.title)}
            alt=""
            className="w-full h-full object-cover object-top opacity-20 mix-blend-luminosity grayscale contrast-125 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.15)_65%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.15)_65%,transparent_100%)] select-none"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e2330]/65 via-[#1e2330]/85 to-[#1e2330]" />
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
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Bottom Sheet Container */}
      <div className="relative z-10 w-full max-h-[92vh] bg-[#1e2330] rounded-t-3xl border-t border-slate-700 shadow-sheet overflow-hidden animate-sheet-up flex flex-col">
        {/* Stylized Monochromatic Place Photo Hero Backdrop */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          <img
            src={getPlacePhotoUrl(event.id, event.title)}
            alt=""
            className="w-full h-full object-cover object-top opacity-20 mix-blend-luminosity grayscale contrast-125 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.15)_65%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.15)_65%,transparent_100%)] select-none"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e2330]/65 via-[#1e2330]/85 to-[#1e2330]" />
        </div>

        {/* Drag Handle */}
        <div className="relative z-10 py-3 flex justify-center items-center shrink-0 cursor-grab">
          <div className="w-12 h-1.5 rounded-full bg-slate-500" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 overflow-y-auto pb-10">
          {content}
        </div>
      </div>
    </div>
  );
};
