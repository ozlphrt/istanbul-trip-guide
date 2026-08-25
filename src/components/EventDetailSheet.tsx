import React from 'react';
import {
  X,
  Navigation,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
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
  Info,
  Globe,
  Instagram,
  BookOpen,
  Image as ImageIcon,
  Share2,
  MapPin
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
        <div className="h-full flex flex-col items-center justify-center p-8 text-center text-zinc-500 bg-zinc-900/60 rounded-2xl border border-zinc-800">
          <Landmark className="w-12 h-12 mb-3 text-zinc-600 opacity-60" />
          <p className="text-base font-bold text-zinc-300">Select an activity</p>
          <p className="text-sm text-zinc-400 mt-1 max-w-[240px]">
            Click any activity on the timeline to view historical notes, tickets, photos, and links.
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

  const getGoogleSearchImagesUrl = (title: string) => {
    return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${title} Istanbul`)}`;
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
      {/* Header Info */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Category & Status Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-800 text-zinc-200 border border-zinc-700">
              {getTypeIcon(event.type)}
              <span>{event.type}</span>
            </span>

            {event.isFixed ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                <Lock className="w-3.5 h-3.5" /> Fixed Time
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
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
          {event.title}
        </h2>

        {/* Time & Duration */}
        <div className="flex items-center gap-2.5 mt-3 text-sm sm:text-base text-zinc-300 font-semibold">
          <span className="flex items-center gap-1.5 text-white font-bold">
            <Clock className="w-4 h-4 text-indigo-400" />
            {formatEventTime(event.startTime)} – {formatEventTime(event.endTime)}
          </span>
          <span>•</span>
          <span className="px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-200 font-mono text-sm">
            {formatDuration(event.durationMinutes)}
          </span>
          {event.durationNote && (
            <span className="text-zinc-400 text-xs italic">
              ({event.durationNote})
            </span>
          )}
        </div>
      </div>

      {/* Action / Directions & Status Buttons */}
      <div className="space-y-2.5 pt-2 border-t border-zinc-800">
        {/* Directions Button */}
        {event.location && (
          <a
            href={getDirectionsUrl(event.location)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white text-sm font-bold tracking-wide transition shadow-elevated"
          >
            <Navigation className="w-5 h-5" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>
        )}

        {/* Local Execution State Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={() => onUpdateStatus(event.id, event.status === 'done' ? 'pending' : 'done')}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold border transition ${
              event.status === 'done'
                ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-750 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{event.status === 'done' ? 'Completed' : 'Mark Done'}</span>
          </button>

          <button
            onClick={() => onUpdateStatus(event.id, event.status === 'skipped' ? 'pending' : 'skipped')}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold border transition ${
              event.status === 'skipped'
                ? 'bg-rose-500/20 border-rose-500/60 text-rose-300'
                : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-750 hover:text-white'
            }`}
          >
            <XCircle className="w-4 h-4" />
            <span>{event.status === 'skipped' ? 'Skipped' : 'Skip Stop'}</span>
          </button>
        </div>
      </div>

      {/* Embedded 20+ Photos Gallery */}
      <div className="pt-2 border-t border-zinc-800">
        <PhotoGallery eventId={event.id} title={event.title} location={event.location} />
      </div>

      {/* Structured Content Sections */}
      <div className="space-y-4 pt-1">
        {/* What section */}
        {event.what && (
          <div className="bg-zinc-850 rounded-2xl p-4 border border-zinc-800 shadow-subtle">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4" />
              <span>What It Is</span>
            </div>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
              {event.what}
            </p>
          </div>
        )}

        {/* Why this place matters */}
        {event.why && (
          <div className="bg-zinc-800/80 rounded-2xl p-4 border border-zinc-700/80 shadow-subtle">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Why This Place Matters</span>
            </div>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
              {event.why}
            </p>
          </div>
        )}

        {/* Historical & Cultural Facts */}
        {event.facts && event.facts.length > 0 && (
          <div className="bg-zinc-850 rounded-2xl p-4 border border-zinc-800 shadow-subtle">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-300 uppercase tracking-wider mb-3">
              <Info className="w-4 h-4 text-zinc-400" />
              <span>Key Facts & Context</span>
            </div>
            <ul className="space-y-2.5">
              {event.facts.map((fact, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm text-zinc-300 leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Food Recommendations */}
        {event.food && (
          <div className="bg-zinc-850 rounded-2xl p-4 border border-zinc-800 shadow-subtle">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
              <Utensils className="w-4 h-4" />
              <span>Culinary Highlights</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {event.food}
            </p>
          </div>
        )}

        {/* Reservation Information */}
        {event.reservation && (
          <div className="bg-zinc-850 rounded-2xl p-4 border border-zinc-800 shadow-subtle">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">
              <CalendarCheck className="w-4 h-4" />
              <span>Reservation Details</span>
            </div>
            <p className="text-sm text-zinc-200 leading-relaxed font-mono font-medium">
              {event.reservation}
            </p>
          </div>
        )}

        {/* Ticket Information */}
        {event.ticket && (
          <div className="bg-zinc-850 rounded-2xl p-4 border border-zinc-800 shadow-subtle">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2">
              <Ticket className="w-4 h-4" />
              <span>Tickets & Entry</span>
            </div>
            <p className="text-sm text-zinc-200 leading-relaxed font-mono font-medium">
              {event.ticket}
            </p>
          </div>
        )}

        {/* Logistics / Notes */}
        {event.notes && (
          <div className="bg-zinc-850 rounded-2xl p-4 border border-zinc-800 shadow-subtle">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              <FileText className="w-4 h-4" />
              <span>Notes & Logistics</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
              {event.notes}
            </p>
          </div>
        )}

        {/* SEPARATE LINKS & REFERENCES SECTION */}
        <div className="bg-zinc-850 rounded-2xl p-4 border border-zinc-800 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <Globe className="w-4 h-4" />
              <span>External Links & References</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {/* Custom Metadata Links */}
            {event.links && event.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-750 text-xs font-bold text-zinc-200 hover:text-white transition group"
              >
                <div className="flex items-center gap-2.5">
                  {getLinkIcon(link)}
                  <span>{link.label}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition" />
              </a>
            ))}

            {/* Google Images Gallery Search */}
            <a
              href={getGoogleSearchImagesUrl(event.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-750 text-xs font-bold text-zinc-200 hover:text-white transition group"
            >
              <div className="flex items-center gap-2.5">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span>Google Images Gallery</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition" />
            </a>

            {/* Google Maps Location */}
            {event.location && (
              <a
                href={getDirectionsUrl(event.location)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-750 text-xs font-bold text-zinc-200 hover:text-white transition group"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  <span>Google Maps Pin</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition" />
              </a>
            )}
          </div>
        </div>

        {/* Location Address string */}
        {event.location && (
          <div className="text-xs text-zinc-400 pt-2 border-t border-zinc-800">
            <span className="font-bold text-zinc-300">Exact Address: </span>
            {event.location}
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
