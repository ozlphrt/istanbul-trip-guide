import React from 'react';
import {
  Utensils,
  Wine,
  Footprints,
  Ship,
  Music,
  BedDouble,
  Landmark,
  HelpCircle,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { EventType, ItineraryEvent } from '../types/calendar';
import { formatDuration, formatEventTime, PIXELS_PER_MINUTE } from '../utils/time';
import { getPlacePhotoUrl } from '../utils/placePhotos';

interface EventCardProps {
  event: ItineraryEvent;
  isSelected: boolean;
  onSelect: (event: ItineraryEvent) => void;
  leftOffset?: string;
  width?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  isSelected,
  onSelect,
  leftOffset = '0%',
  width = '100%',
}) => {
  // Use simulated times if "Running Late" is active, otherwise normal times
  const effectiveStartMinutes = event.simulatedStartMinutes !== undefined
    ? event.simulatedStartMinutes
    : event.startMinutesFromDayStart;

  const topPx = effectiveStartMinutes * PIXELS_PER_MINUTE;
  const heightPx = Math.max(54, (event.durationMinutes * PIXELS_PER_MINUTE) - 6);

  const getTypeIcon = (type: EventType) => {
    switch (type) {
      case 'visit': return <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 shrink-0" />;
      case 'food': return <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400 shrink-0" />;
      case 'drink': return <Wine className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 shrink-0" />;
      case 'walk': return <Footprints className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />;
      case 'transport': return <Ship className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />;
      case 'concert': return <Music className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 shrink-0" />;
      case 'rest': return <BedDouble className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0" />;
      case 'optional': return <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0" />;
      default: return <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 shrink-0" />;
    }
  };

  const getTypeBorderClass = (type: EventType) => {
    switch (type) {
      case 'visit': return 'border-[1.5px] border-sky-400/90 hover:border-sky-300 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6)]';
      case 'food': return 'border-[1.5px] border-rose-400/90 hover:border-rose-300 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6)]';
      case 'drink': return 'border-[1.5px] border-amber-400/90 hover:border-amber-300 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6)]';
      case 'walk': return 'border-[1.5px] border-emerald-400/90 hover:border-emerald-300 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6)]';
      case 'transport': return 'border-[1.5px] border-cyan-400/90 hover:border-cyan-300 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6)]';
      case 'concert': return 'border-[1.5px] border-indigo-400/90 hover:border-indigo-300 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6)]';
      case 'rest': return 'border-[1.5px] border-slate-600/90 hover:border-slate-500 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6)]';
      case 'optional': return 'border-[1.5px] border-slate-600/90 hover:border-slate-500 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6)]';
      default: return 'border-[1.5px] border-sky-400/90 hover:border-sky-300 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6)]';
    }
  };

  const isCompact = heightPx < 70;
  const isMedium = heightPx >= 70 && heightPx < 115;
  const isTall = heightPx >= 115;

  const locationShort = event.location ? event.location.split(',')[0].trim() : '';
  const subtitle = event.what || event.why || '';
  const photoUrl = getPlacePhotoUrl(event.id, event.title);

  return (
    <div
      onClick={() => onSelect(event)}
      style={{
        top: `${topPx}px`,
        height: `${heightPx}px`,
        left: leftOffset,
        width: width,
      }}
      className={`absolute rounded-[20px] sm:rounded-[22px] p-3 sm:p-4 transition-all duration-150 cursor-pointer overflow-hidden flex flex-col justify-between select-none ${
        event.status === 'done'
          ? 'bg-[#1e2330]/80 border-[1.5px] border-emerald-800/50 text-emerald-300/80 opacity-60 shadow-md shadow-black/25'
          : event.status === 'skipped'
          ? 'bg-[#181b24]/50 border-[1.5px] border-slate-800 text-slate-500 opacity-40 line-through'
          : `bg-gradient-to-br from-[#272e3d] to-[#1c212e] ${getTypeBorderClass(event.type)} hover:brightness-110`
      } ${
        isSelected
          ? 'ring-2 ring-indigo-400 !border-indigo-400 bg-[#31384b] z-20 shadow-[0_0_0_2px_rgba(129,140,248,0.8),0_12px_32px_-4px_rgba(0,0,0,0.7)]'
          : 'z-10'
      } ${event.hasCollisionWithFixed ? 'ring-2 ring-rose-500 animate-pulse' : ''}`}
    >
      {/* Stylized Monochromatic Place Photo Watermark with Gradient Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-3/5 pointer-events-none overflow-hidden rounded-r-[20px] sm:rounded-r-[22px]">
        <img
          src={photoUrl}
          alt=""
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity grayscale contrast-125 [mask-image:linear-gradient(to_left,rgba(0,0,0,0.85)_10%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_left,rgba(0,0,0,0.85)_10%,transparent_100%)] select-none"
          loading="lazy"
        />
      </div>

      {/* 1. Compact View (< 70px: 15–25 min stops) */}
      {isCompact ? (
        <div className="flex flex-col justify-between h-full relative z-10">
          <div className="flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-2 min-w-0 truncate">
              {getTypeIcon(event.type)}
              <h3 className="font-black text-base sm:text-lg text-white truncate tracking-tight">
                {event.title}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#131722]/90 border border-slate-700/80 text-sky-300 font-mono">
                {formatDuration(event.durationMinutes)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 pt-0.5 truncate">
            <span className="font-mono text-white font-black shrink-0">
              {formatEventTime(event.startTime)}–{formatEventTime(event.endTime)}
            </span>
            {locationShort && (
              <>
                <span className="text-slate-500">•</span>
                <span className="truncate text-slate-300 font-semibold">
                  {locationShort}
                </span>
              </>
            )}
          </div>
        </div>
      ) : (
        /* 2. Standard & Tall View (>= 70px) — Concept 1 Style */
        <div className="flex flex-col justify-between h-full relative z-10">
          {/* Top Header Row: Icon on Left, Duration Pill & Badges on Right */}
          <div className="flex items-center justify-between gap-2 leading-none">
            <div className="flex items-center gap-2 min-w-0">
              {getTypeIcon(event.type)}
              <span className="text-xs font-mono font-bold text-slate-400">
                {formatEventTime(event.startTime)}–{formatEventTime(event.endTime)}
              </span>
            </div>

            {/* Right: Badges & Duration Pill */}
            <div className="flex items-center gap-1.5 shrink-0">
              {event.hasCollisionWithFixed && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                  <AlertTriangle className="w-3 h-3" /> Conflict
                </span>
              )}

              {event.reservation && (
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-200 border border-rose-500/30 text-xs font-bold shrink-0">
                  Reserved
                </span>
              )}

              {event.ticket && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 text-xs font-bold shrink-0">
                  Ticketed
                </span>
              )}

              {/* Capsule Duration Pill */}
              <span className="text-xs sm:text-sm font-bold px-3 py-0.5 rounded-full bg-[#131722]/90 border border-slate-700/80 text-sky-300 shrink-0 font-mono shadow-sm">
                {formatDuration(event.durationMinutes)}
              </span>

              {event.status === 'done' && (
                <span className="text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                </span>
              )}

              {event.status === 'skipped' && (
                <span className="text-slate-500">
                  <XCircle className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>

          {/* Main Title & Subtitle / Location */}
          <div className="my-auto py-1 min-w-0">
            <h3 className={`font-black tracking-tight leading-snug text-white ${isMedium ? 'text-base sm:text-lg line-clamp-1' : 'text-lg sm:text-xl line-clamp-2'}`}>
              {event.title}
            </h3>

            {/* Simple Description & Location below (Concept 1 style) */}
            <p className={`text-xs sm:text-sm text-slate-300 font-medium mt-0.5 ${isTall ? 'line-clamp-2' : 'line-clamp-1'}`}>
              {subtitle ? (
                <>
                  <span>{subtitle}</span>
                  {locationShort && <span className="text-slate-500 mx-1.5">•</span>}
                  <span className="text-slate-400">{locationShort}</span>
                </>
              ) : (
                <span>{locationShort}</span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
