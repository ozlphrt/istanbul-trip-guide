import React from 'react';
import {
  X,
  Navigation,
  Lock,
  Unlock,
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
  Sparkles,
  Ticket,
  CalendarCheck,
  FileText,
  ExternalLink,
  Globe,
  Instagram,
  Eye,
  Compass,
  Check,
  AlertCircle,
  MapPin,
  Share2
} from 'lucide-react';
import { EventLink, EventStatus, EventType, ItineraryEvent } from '../types/calendar';
import { formatDuration, formatEventTime } from '../utils/time';
import { PhotoGallery } from './PhotoGallery';

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
        <div className="h-full flex flex-col items-center justify-center p-8 text-center text-zinc-500 bg-zinc-900/60 rounded-3xl border border-zinc-800">
          <Landmark className="w-12 h-12 mb-3 text-zinc-600 opacity-60" />
          <p className="text-base font-bold text-zinc-300">Select an activity</p>
          <p className="text-sm text-zinc-400 mt-1 max-w-[240px]">
            Click any activity on the timeline to open its Editorial Field Guide.
          </p>
        </div>
      );
    }
    return null;
  }

  const getTypeIcon = (type: EventType) => {
    switch (type) {
      case 'visit': return <Landmark className="w-4 h-4 text-sky-400" />;
      case 'food': return <Utensils className="w-4 h-4 text-rose-400" />;
      case 'drink': return <Wine className="w-4 h-4 text-fuchsia-400" />;
      case 'walk': return <Footprints className="w-4 h-4 text-emerald-400" />;
      case 'transport': return <Ship className="w-4 h-4 text-cyan-400" />;
      case 'concert': return <Music className="w-4 h-4 text-indigo-400" />;
      case 'rest': return <BedDouble className="w-4 h-4 text-slate-400" />;
      case 'optional': return <HelpCircle className="w-4 h-4 text-zinc-400" />;
    }
  };

  const getDirectionsUrl = (location?: string) => {
    if (!location) return '#';
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}`;
  };

  const getLinkIcon = (link: EventLink) => {
    switch (link.type) {
      case 'ig': return <Instagram className="w-4 h-4 text-pink-400" />;
      case 'web': return <Globe className="w-4 h-4 text-sky-400" />;
      case 'fb': return <Share2 className="w-4 h-4 text-blue-400" />;
      case 'x': return <span className="font-black text-xs">𝕏</span>;
      default: return <ExternalLink className="w-4 h-4 text-indigo-400" />;
    }
  };

  const content = (
    <div className="flex flex-col h-full overflow-y-auto space-y-6 p-5 sm:p-7 text-zinc-100 custom-scrollbar">
      {/* ========================================================================= */}
      {/* 1. HERO HEADER: Identity, Time & Subtitle                                 */}
      {/* ========================================================================= */}
      <div>
        {/* Top Badges & Close Button */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-800 text-zinc-200 border border-zinc-700">
              {getTypeIcon(event.type)}
              <span>{event.type}</span>
            </span>

            {event.isFixed ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                <Lock className="w-3.5 h-3.5" /> Fixed Slot
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                <Unlock className="w-3.5 h-3.5" /> Flexible
              </span>
            )}
          </div>

          {!isDesktopSidebar && (
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
          {event.title}
        </h1>

        {/* Time & Duration Bar */}
        <div className="flex flex-wrap items-center gap-2 mt-2.5 text-sm sm:text-base font-semibold text-zinc-300">
          <span className="flex items-center gap-1.5 text-white font-bold">
            <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
            {formatEventTime(event.startTime)} – {formatEventTime(event.endTime)}
          </span>
          <span className="text-zinc-600">•</span>
          <span className="px-2.5 py-0.5 rounded-lg bg-zinc-800 text-zinc-200 font-mono text-xs font-bold">
            {formatDuration(event.durationMinutes)}
          </span>
          {event.durationNote && (
            <span className="text-zinc-400 text-xs italic">
              ({event.durationNote})
            </span>
          )}
        </div>

        {/* What It Is (Hero Subtitle) */}
        {event.what && (
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal mt-3 pt-3 border-t border-zinc-800/80">
            {event.what}
          </p>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. QUICK ACTION DOCK (Directions, Status, Links)                           */}
      {/* ========================================================================= */}
      <div className="space-y-2.5 pt-1">
        {/* Directions & Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {event.location && (
            <a
              href={getDirectionsUrl(event.location)}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:col-span-2 flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white text-xs sm:text-sm font-bold tracking-wide transition shadow-elevated"
            >
              <Navigation className="w-4 h-4 shrink-0" />
              <span className="truncate">Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-75 shrink-0" />
            </a>
          )}

          {/* Status Toggle Button */}
          <button
            onClick={() => onUpdateStatus(event.id, event.status === 'done' ? 'pending' : 'done')}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold border transition ${
              event.status === 'done'
                ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-750 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{event.status === 'done' ? 'Completed' : 'Mark Done'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SECTION 1: THE STORY & HIGHLIGHTS (Editorial Reading)                  */}
      {/* ========================================================================= */}
      <div className="bg-zinc-850/80 rounded-3xl p-5 sm:p-6 border border-zinc-750/70 shadow-subtle space-y-5">
        {/* Section Header */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 border-b border-zinc-750/60 pb-3">
          <Sparkles className="w-4 h-4" />
          <span>The Story & Essence</span>
        </div>

        {/* Why This Place Matters */}
        {event.why && (
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Why It Matters
            </h3>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
              {event.why}
            </p>
          </div>
        )}

        {/* Key Highlights & Facts */}
        {event.facts && event.facts.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-zinc-750/50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-zinc-400" />
              <span>Key Highlights & Context</span>
            </h3>
            <ul className="space-y-2">
              {event.facts.map((fact, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Culinary Highlights / Food Pairing */}
        {event.food && (
          <div className="p-4 rounded-2xl bg-rose-950/25 border border-rose-800/40 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-300">
              <Utensils className="w-4 h-4 text-rose-400" />
              <span>Culinary Highlights & What to Order</span>
            </div>
            <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed">
              {event.food}
            </p>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. SECTION 2: PRACTICAL FIELD GUIDE (Actionable Logistics)               */}
      {/* ========================================================================= */}
      <div className="bg-zinc-850/80 rounded-3xl p-5 sm:p-6 border border-zinc-750/70 shadow-subtle space-y-4">
        {/* Section Header */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 border-b border-zinc-750/60 pb-3">
          <Compass className="w-4 h-4" />
          <span>Practical Field Guide</span>
        </div>

        {/* Do Tips */}
        {event.do && (
          <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-800/30 flex items-start gap-3">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
              <span className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] block mb-0.5">
                Do & Recommended
              </span>
              {event.do}
            </div>
          </div>
        )}

        {/* Avoid Traps */}
        {event.avoid && (
          <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-800/30 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-200 leading-relaxed">
              <span className="font-bold text-amber-300 uppercase tracking-wide text-[11px] block mb-0.5">
                Avoid / Pitfalls
              </span>
              {event.avoid}
            </div>
          </div>
        )}

        {/* Tickets & Reservations (Clean Grid) */}
        {(event.ticket || event.reservation) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {event.ticket && (
              <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-750">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Tickets & Entry</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 font-mono font-medium">
                  {event.ticket}
                </p>
              </div>
            )}

            {event.reservation && (
              <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-750">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Reservation</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 font-mono font-medium">
                  {event.reservation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Logistics & General Notes */}
        {event.notes && (
          <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-750 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Logistics & On-Site Notes</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
              {event.notes}
            </p>
          </div>
        )}

        {/* Exact Address */}
        {event.location && (
          <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-750 flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <span className="font-bold text-zinc-400 uppercase tracking-wider text-[11px] block mb-0.5">
                Exact Address
              </span>
              <span>{event.location}</span>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 5. SECTION 3: AUTHENTIC VISUALS & EXTERNAL LINKS                          */}
      {/* ========================================================================= */}
      <div className="space-y-4 pt-1">
        {/* Verified Wikimedia Photos Gallery */}
        <PhotoGallery eventId={event.id} title={event.title} location={event.location} />

        {/* External Portals & Links */}
        {event.links && event.links.length > 0 && (
          <div className="space-y-2 pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Official Links & Portals
            </div>
            <div className="flex flex-wrap gap-2">
              {event.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-850 hover:bg-zinc-800 border border-zinc-750 text-xs font-bold text-zinc-200 hover:text-white transition group shadow-sm"
                >
                  {getLinkIcon(link)}
                  <span>{link.label}</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-white transition" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Desktop Sidebar Layout
  if (isDesktopSidebar) {
    return (
      <div className="h-full bg-zinc-900 rounded-3xl border border-zinc-800 shadow-elevated overflow-hidden flex flex-col">
        {content}
      </div>
    );
  }

  // Mobile Bottom Sheet with Backdrop
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Bottom Sheet Container */}
      <div className="relative z-10 w-full max-h-[92vh] bg-zinc-900 rounded-t-3xl border-t border-zinc-750 shadow-sheet overflow-hidden animate-sheet-up flex flex-col">
        {/* Drag Handle */}
        <div className="py-3 flex justify-center items-center shrink-0 cursor-grab">
          <div className="w-14 h-1.5 rounded-full bg-zinc-700" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-10">
          {content}
        </div>
      </div>
    </div>
  );
};
