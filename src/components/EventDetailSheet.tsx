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
        <div className="h-full flex flex-col items-center justify-center p-8 text-center text-zinc-400 bg-[#0a0d17]/80 backdrop-blur-2xl rounded-3xl border border-white/[0.08] shadow-elevated">
          <Landmark className="w-14 h-14 mb-4 text-zinc-600 opacity-60" />
          <p className="text-xl font-black text-white tracking-tight">Select an activity</p>
          <p className="text-base text-zinc-400 mt-1 max-w-[280px]">
            Click any activity on the timeline to open its Editorial Field Guide.
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
      case 'concert': return <Music className="w-5 h-5 text-violet-400" />;
      case 'rest': return <BedDouble className="w-5 h-5 text-slate-300" />;
      case 'optional': return <HelpCircle className="w-5 h-5 text-zinc-400" />;
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
      case 'x': return <span className="font-black text-sm">𝕏</span>;
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
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest bg-white/[0.06] text-zinc-200 border border-white/[0.1] shadow-sm">
              {getTypeIcon(event.type)}
              <span>{event.type}</span>
            </span>

            {event.isFixed ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black bg-amber-500/15 text-amber-200 border border-amber-400/30 shadow-sm">
                <Lock className="w-4 h-4 text-amber-400" /> Fixed Slot
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-white/[0.04] text-zinc-400 border border-white/[0.08]">
                <Unlock className="w-4 h-4" /> Flexible
              </span>
            )}
          </div>

          {!isDesktopSidebar && (
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.12] transition shadow-sm border border-white/[0.08]"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
          {event.title}
        </h1>

        {/* Time & Duration Bar */}
        <div className="flex flex-wrap items-center gap-2.5 mt-3 text-base sm:text-lg font-bold text-zinc-200">
          <span className="flex items-center gap-2 text-white font-black font-mono">
            <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
            {formatEventTime(event.startTime)} – {formatEventTime(event.endTime)}
          </span>
          <span className="text-zinc-500">•</span>
          <span className="px-3 py-1 rounded-xl bg-white/[0.06] text-white font-mono text-sm font-black border border-white/[0.1] shadow-sm">
            {formatDuration(event.durationMinutes)}
          </span>
          {event.durationNote && (
            <span className="text-zinc-400 text-sm font-medium italic">
              ({event.durationNote})
            </span>
          )}
        </div>

        {/* What It Is (Hero Subtitle) */}
        {event.what && (
          <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal mt-3.5 pt-3.5 border-t border-white/[0.08]">
            {event.what}
          </p>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. QUICK ACTION DOCK (Directions & Status)                                */}
      {/* ========================================================================= */}
      <div className="space-y-2.5 pt-1">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {event.location && (
            <a
              href={getDirectionsUrl(event.location)}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:col-span-2 flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 active:scale-[0.98] text-white text-sm sm:text-base font-black tracking-wide transition shadow-lg shadow-indigo-600/30 border border-indigo-400/30"
            >
              <Navigation className="w-5 h-5 shrink-0" />
              <span className="truncate">Open in Google Maps</span>
              <ExternalLink className="w-4 h-4 opacity-80 shrink-0" />
            </a>
          )}

          {/* Status Toggle Button */}
          <button
            onClick={() => onUpdateStatus(event.id, event.status === 'done' ? 'pending' : 'done')}
            className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl text-sm sm:text-base font-black border transition shadow-sm ${
              event.status === 'done'
                ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-200 shadow-emerald-500/20'
                : 'bg-white/[0.04] border-white/[0.08] text-zinc-200 hover:bg-white/[0.08] hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{event.status === 'done' ? 'Completed' : 'Mark Done'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SECTION 1: THE STORY & HIGHLIGHTS (Editorial Reading)                  */}
      {/* ========================================================================= */}
      <div className="bg-[#101322]/80 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-white/[0.09] shadow-elevated space-y-5">
        {/* Section Header */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-widest text-indigo-300 border-b border-white/[0.08] pb-3">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>The Story & Essence</span>
        </div>

        {/* Why This Place Matters */}
        {event.why && (
          <div className="space-y-2">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-400">
              Why It Matters
            </h3>
            <p className="text-base sm:text-lg text-zinc-100 leading-relaxed font-normal">
              {event.why}
            </p>
          </div>
        )}

        {/* Key Highlights & Facts */}
        {event.facts && event.facts.length > 0 && (
          <div className="space-y-2.5 pt-3 border-t border-white/[0.08]">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <Eye className="w-4 h-4 text-zinc-400" />
              <span>Key Highlights & Context</span>
            </h3>
            <ul className="space-y-2.5">
              {event.facts.map((fact, index) => (
                <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-zinc-200 leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2 shrink-0 shadow-sm shadow-indigo-400/50" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Culinary Highlights / Food Pairing */}
        {event.food && (
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-widest text-rose-300">
              <Utensils className="w-4 h-4 text-rose-400" />
              <span>Culinary Highlights & What to Order</span>
            </div>
            <p className="text-sm sm:text-base text-rose-100 leading-relaxed font-medium">
              {event.food}
            </p>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. SECTION 2: PRACTICAL FIELD GUIDE (Actionable Logistics)               */}
      {/* ========================================================================= */}
      <div className="bg-[#101322]/80 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-white/[0.09] shadow-elevated space-y-4">
        {/* Section Header */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-widest text-emerald-400 border-b border-white/[0.08] pb-3">
          <Compass className="w-4 h-4 text-emerald-400" />
          <span>Practical Field Guide</span>
        </div>

        {/* Do Tips */}
        {event.do && (
          <div className="p-4 rounded-2xl bg-emerald-950/25 border border-emerald-500/30 flex items-start gap-3.5 shadow-sm">
            <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              <span className="font-black text-emerald-300 uppercase tracking-widest text-xs block mb-1">
                Do & Recommended
              </span>
              {event.do}
            </div>
          </div>
        )}

        {/* Avoid Traps */}
        {event.avoid && (
          <div className="p-4 rounded-2xl bg-amber-950/25 border border-amber-500/30 flex items-start gap-3.5 shadow-sm">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-sm sm:text-base text-amber-100 leading-relaxed">
              <span className="font-black text-amber-300 uppercase tracking-widest text-xs block mb-1">
                Avoid / Pitfalls
              </span>
              {event.avoid}
            </div>
          </div>
        )}

        {/* Tickets & Reservations (Clean Grid) */}
        {(event.ticket || event.reservation) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {event.ticket && (
              <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] shadow-sm">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-emerald-400 uppercase tracking-wider mb-1.5">
                  <Ticket className="w-4 h-4" />
                  <span>Tickets & Entry</span>
                </div>
                <p className="text-sm sm:text-base text-zinc-100 font-mono font-medium">
                  {event.ticket}
                </p>
              </div>
            )}

            {event.reservation && (
              <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] shadow-sm">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-rose-400 uppercase tracking-wider mb-1.5">
                  <CalendarCheck className="w-4 h-4" />
                  <span>Reservation</span>
                </div>
                <p className="text-sm sm:text-base text-zinc-100 font-mono font-medium">
                  {event.reservation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Logistics & General Notes */}
        {event.notes && (
          <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] space-y-1.5 shadow-sm">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-400 uppercase tracking-wider mb-1">
              <FileText className="w-4 h-4" />
              <span>Logistics & On-Site Notes</span>
            </div>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed whitespace-pre-line">
              {event.notes}
            </p>
          </div>
        )}

        {/* Exact Address */}
        {event.location && (
          <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] flex items-start gap-3 shadow-sm">
            <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div className="text-sm sm:text-base text-zinc-200 leading-relaxed">
              <span className="font-bold text-zinc-400 uppercase tracking-wider text-xs block mb-1">
                Exact Address
              </span>
              <span className="font-medium text-white">{event.location}</span>
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
          <div className="space-y-2.5 pt-2">
            <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-zinc-400">
              Official Links & Portals
            </div>
            <div className="flex flex-wrap gap-2.5">
              {event.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs sm:text-sm font-bold text-zinc-200 hover:text-white transition group shadow-sm"
                >
                  {getLinkIcon(link)}
                  <span>{link.label}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition" />
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
      <div className="h-full bg-[#0a0c14]/90 backdrop-blur-2xl rounded-3xl border border-white/[0.1] shadow-elevated overflow-hidden flex flex-col">
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
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Bottom Sheet Container */}
      <div className="relative z-10 w-full max-h-[92vh] bg-[#0a0c14] rounded-t-3xl border-t border-white/[0.16] shadow-sheet overflow-hidden animate-sheet-up flex flex-col">
        {/* Drag Handle */}
        <div className="py-3 flex justify-center items-center shrink-0 cursor-grab">
          <div className="w-14 h-1.5 rounded-full bg-white/20" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-10">
          {content}
        </div>
      </div>
    </div>
  );
};
