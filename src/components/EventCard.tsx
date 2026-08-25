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

interface EventCardProps {
  event: ItineraryEvent;
  onSelect: (event: ItineraryEvent) => void;
  isSelected?: boolean;
  leftOffset?: string;
  width?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onSelect,
  isSelected = false,
  leftOffset = '0%',
  width = '100%'
}) => {
  // Use simulated times if "Running Late" is active, otherwise normal times
  const effectiveStartMinutes = event.simulatedStartMinutes !== undefined
    ? event.simulatedStartMinutes
    : event.startMinutesFromDayStart;

  const topPx = effectiveStartMinutes * PIXELS_PER_MINUTE;
  const heightPx = Math.max(54, (event.durationMinutes * PIXELS_PER_MINUTE) - 6);

  const getTypeIcon = (type: EventType) => {
    switch (type) {
      case 'visit': return <Landmark className="w-4 h-4 text-sky-400 shrink-0" />;
      case 'food': return <Utensils className="w-4 h-4 text-rose-400 shrink-0" />;
      case 'drink': return <Wine className="w-4 h-4 text-amber-300 shrink-0" />;
      case 'walk': return <Footprints className="w-4 h-4 text-emerald-400 shrink-0" />;
      case 'transport': return <Ship className="w-4 h-4 text-cyan-400 shrink-0" />;
      case 'concert': return <Music className="w-4 h-4 text-indigo-400 shrink-0" />;
      case 'rest': return <BedDouble className="w-4 h-4 text-slate-400 shrink-0" />;
      case 'optional': return <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />;
      default: return <Landmark className="w-4 h-4 text-sky-400 shrink-0" />;
    }
  };

  const getTypeBorderClass = (type: EventType) => {
    switch (type) {
      case 'visit': return 'border-sky-500/60 hover:border-sky-400';
      case 'food': return 'border-rose-500/60 hover:border-rose-400';
      case 'drink': return 'border-amber-400/60 hover:border-amber-300';
      case 'walk': return 'border-emerald-500/60 hover:border-emerald-400';
      case 'transport': return 'border-cyan-400/60 hover:border-cyan-300';
      case 'concert': return 'border-indigo-400/60 hover:border-indigo-300';
      case 'rest': return 'border-slate-600/60 hover:border-slate-500';
      case 'optional': return 'border-slate-600/60 hover:border-slate-500';
      default: return 'border-sky-500/60 hover:border-sky-400';
    }
  };

  const isCompact = heightPx < 70;
  const isMedium = heightPx >= 70 && heightPx < 115;
  const isTall = heightPx >= 115;

  return (
    <div
      onClick={() => onSelect(event)}
      style={{
        top: `${topPx}px`,
        height: `${heightPx}px`,
        left: leftOffset,
        width: width,
      }}
      className={`absolute rounded-2xl border p-3.5 sm:p-4 transition-all duration-150 cursor-pointer overflow-hidden flex flex-col justify-between select-none ${
        event.status === 'done'
          ? 'bg-[#1e2330]/80 border-emerald-800/50 text-emerald-300/80 opacity-60 shadow-md shadow-black/25'
          : event.status === 'skipped'
          ? 'bg-[#181b24]/50 border-slate-800 text-slate-500 opacity-40 line-through'
          : `bg-[#282e3e] ${getTypeBorderClass(event.type)} hover:bg-[#31384b] shadow-[0_6px_20px_-3px_rgba(0,0,0,0.5),0_2px_6px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_28px_-4px_rgba(0,0,0,0.65),0_3px_8px_rgba(0,0,0,0.4)]`
      } ${
        isSelected
          ? 'ring-2 ring-indigo-400 !border-indigo-400 bg-[#31384b] z-20 shadow-[0_0_0_2px_rgba(129,140,248,0.8),0_12px_32px_-4px_rgba(0,0,0,0.7)]'
          : 'z-10'
      } ${event.hasCollisionWithFixed ? 'ring-2 ring-rose-500 animate-pulse' : ''}`}
    >
      {/* 1. Compact View (< 70px: 15–25 min stops) */}
      {isCompact ? (
        <div className="flex flex-col justify-between h-full">
          <div className="flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-2 min-w-0 truncate">
              {getTypeIcon(event.type)}
              <h3 className="font-black text-base sm:text-lg text-white truncate tracking-tight">
                {event.title}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs sm:text-sm font-black px-2.5 py-0.5 rounded bg-[#181b24] border border-slate-600 text-slate-100 font-mono">
                {formatDuration(event.durationMinutes)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300 pt-0.5 truncate">
            <span className="font-mono text-white font-black shrink-0">
              {formatEventTime(event.startTime)}–{formatEventTime(event.endTime)}
            </span>
            {event.location && (
              <>
                <span className="text-slate-500">•</span>
                <span className="truncate text-slate-300 font-bold">
                  {event.location.split(',')[0]}
                </span>
              </>
            )}
          </div>
        </div>
      ) : (
        /* 2. Standard & Tall View (>= 70px) */
        <>
          {/* Top Header Row: Icon, Time Range, Location & Duration Badge */}
          <div className="flex items-center justify-between gap-2 text-sm sm:text-base font-bold leading-none">
            <div className="flex items-center gap-2 min-w-0 truncate">
              {getTypeIcon(event.type)}

              {/* Time */}
              <span className="font-black tracking-tight text-white shrink-0 font-mono text-sm sm:text-base">
                {event.isSimulatedShifted && event.simulatedStartTime ? (
                  <span className="flex items-center gap-1.5">
                    <span className="line-through text-slate-500 text-xs sm:text-sm">
                      {formatEventTime(event.startTime)}
                    </span>
                    <span className="text-indigo-300 font-black">
                      {formatEventTime(event.simulatedStartTime)}
                    </span>
                  </span>
                ) : (
                  <span>
                    {formatEventTime(event.startTime)}–{formatEventTime(event.endTime)}
                  </span>
                )}
              </span>

              {/* Location moved right next to start-finish time */}
              {event.location && (
                <>
                  <span className="text-slate-500 shrink-0">•</span>
                  <span className="truncate text-slate-300 font-bold text-xs sm:text-sm">
                    {event.location.split(',')[0]}
                  </span>
                </>
              )}
            </div>

            {/* Right: Status, Reservation/Ticket & Duration Badges */}
            <div className="flex items-center gap-1.5 shrink-0">
              {event.hasCollisionWithFixed && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                  <AlertTriangle className="w-3.5 h-3.5" /> Conflict
                </span>
              )}

              {event.reservation && (
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-200 border border-rose-500/30 text-xs font-black shrink-0">
                  Reserved
                </span>
              )}

              {event.ticket && (
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 text-xs font-black shrink-0">
                  Ticketed
                </span>
              )}

              {/* Duration Badge */}
              <span className="text-xs sm:text-sm font-black px-2.5 py-0.5 rounded bg-[#181b24] border border-slate-600 text-slate-100 shrink-0 font-mono">
                {formatDuration(event.durationMinutes)}
              </span>

              {event.status === 'done' && (
                <span className="text-emerald-400">
                  <CheckCircle className="w-5 h-5" />
                </span>
              )}

              {event.status === 'skipped' && (
                <span className="text-slate-500">
                  <XCircle className="w-5 h-5" />
                </span>
              )}
            </div>
          </div>

          {/* Main Title & Details */}
          <div className="my-auto py-1 min-w-0">
            <h3 className={`font-black tracking-tight leading-snug text-white ${isMedium ? 'text-base sm:text-lg line-clamp-1' : 'text-lg sm:text-xl line-clamp-2'}`}>
              {event.title}
            </h3>

            {isTall && (event.what || event.why) && (
              <p className="text-sm sm:text-base text-slate-200 line-clamp-2 mt-1.5 font-semibold leading-relaxed">
                {event.what || event.why}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
