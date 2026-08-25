import React from 'react';
import {
  Lock,
  MapPin,
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
  const heightPx = Math.max(52, event.durationMinutes * PIXELS_PER_MINUTE);

  const getTypeIcon = (type: EventType) => {
    switch (type) {
      case 'visit': return <Landmark className="w-4 h-4 text-sky-400 shrink-0" />;
      case 'food': return <Utensils className="w-4 h-4 text-rose-400 shrink-0" />;
      case 'drink': return <Wine className="w-4 h-4 text-fuchsia-400 shrink-0" />;
      case 'walk': return <Footprints className="w-4 h-4 text-emerald-400 shrink-0" />;
      case 'transport': return <Ship className="w-4 h-4 text-cyan-400 shrink-0" />;
      case 'concert': return <Music className="w-4 h-4 text-indigo-400 shrink-0" />;
      case 'rest': return <BedDouble className="w-4 h-4 text-slate-400 shrink-0" />;
      case 'optional': return <HelpCircle className="w-4 h-4 text-zinc-400 shrink-0" />;
      default: return <Landmark className="w-4 h-4 text-sky-400 shrink-0" />;
    }
  };

  const getTypeAccentBorder = (type: EventType, status: string) => {
    if (status === 'done') return 'border-l-4 border-l-emerald-600 bg-zinc-900/60 opacity-60';
    if (status === 'skipped') return 'border-l-4 border-l-zinc-700 bg-zinc-950/50 opacity-50 line-through';

    switch (type) {
      case 'visit': return 'border-l-4 border-l-sky-500 bg-zinc-900 hover:bg-zinc-850';
      case 'food': return 'border-l-4 border-l-rose-500 bg-zinc-900 hover:bg-zinc-850';
      case 'drink': return 'border-l-4 border-l-fuchsia-500 bg-zinc-900 hover:bg-zinc-850';
      case 'walk': return 'border-l-4 border-l-emerald-500 bg-zinc-900 hover:bg-zinc-850';
      case 'transport': return 'border-l-4 border-l-cyan-500 bg-zinc-900 hover:bg-zinc-850';
      case 'concert': return 'border-l-4 border-l-indigo-500 bg-zinc-900 hover:bg-zinc-850';
      case 'rest': return 'border-l-4 border-l-slate-400 bg-zinc-900 hover:bg-zinc-850';
      case 'optional': return 'border-l-4 border-l-zinc-600 border-dashed bg-zinc-900/60 hover:bg-zinc-850';
      default: return 'border-l-4 border-l-sky-500 bg-zinc-900 hover:bg-zinc-850';
    }
  };

  // Compact mode for 15-25 min events
  const isUltraCompact = heightPx < 68;
  const isMedium = heightPx >= 68 && heightPx < 110;
  const isTall = heightPx >= 110;

  return (
    <div
      onClick={() => onSelect(event)}
      style={{
        top: `${topPx}px`,
        height: `${heightPx}px`,
        left: leftOffset,
        width: width,
      }}
      className={`absolute rounded-xl border border-zinc-800 p-2.5 sm:p-3.5 transition-all duration-150 cursor-pointer overflow-hidden flex flex-col justify-between shadow-subtle select-none ${
        getTypeAccentBorder(event.type, event.status)
      } ${isSelected ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-zinc-950 scale-[1.01] z-20 shadow-elevated' : 'hover:scale-[1.005] z-10'} ${
        event.hasCollisionWithFixed ? 'ring-2 ring-rose-500 animate-pulse' : ''
      }`}
    >
      {/* 1. Ultra-Compact Layout (< 68px height: 15–25 min stops) */}
      {isUltraCompact ? (
        <div className="flex flex-col justify-between h-full">
          <div className="flex items-center justify-between gap-1.5 min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              {getTypeIcon(event.type)}
              <h3 className="font-bold text-xs sm:text-sm text-white truncate tracking-tight">
                {event.title}
              </h3>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {event.isFixed && (
                <span className="p-0.5 rounded bg-zinc-800 text-indigo-300 border border-indigo-500/40">
                  <Lock className="w-2.5 h-2.5" />
                </span>
              )}
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                {formatDuration(event.durationMinutes)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400 pt-0.5">
            <span className="text-zinc-200 font-mono">
              {formatEventTime(event.startTime)}–{formatEventTime(event.endTime)}
            </span>
            {event.location && (
              <span className="truncate max-w-[120px] text-zinc-400 font-normal">
                {event.location.split(',')[0]}
              </span>
            )}
          </div>
        </div>
      ) : (
        /* 2. Standard & Tall Layouts (>= 68px) */
        <>
          {/* Top Header Row */}
          <div className="flex items-center justify-between gap-1 text-xs sm:text-sm font-semibold leading-none">
            <div className="flex items-center gap-2 min-w-0">
              <span className="shrink-0">{getTypeIcon(event.type)}</span>

              {/* Time text */}
              <span className="font-bold tracking-tight shrink-0 text-white">
                {event.isSimulatedShifted && event.simulatedStartTime ? (
                  <span className="flex items-center gap-1">
                    <span className="line-through text-zinc-500 text-xs">
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

              {/* Duration Badge */}
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-750 shrink-0">
                {formatDuration(event.durationMinutes)}
              </span>
            </div>

            {/* Status / Fixed Badges */}
            <div className="flex items-center gap-1.5 shrink-0">
              {event.hasCollisionWithFixed && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/40">
                  <AlertTriangle className="w-3 h-3" /> Conflict
                </span>
              )}

              {event.isFixed && (
                <span
                  className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-zinc-800 text-indigo-200 text-xs font-bold border border-indigo-500/40"
                  title="Fixed time slot (Locked)"
                >
                  <Lock className="w-3 h-3 text-indigo-400" /> Fixed
                </span>
              )}

              {event.status === 'done' && (
                <span className="text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                </span>
              )}

              {event.status === 'skipped' && (
                <span className="text-zinc-500">
                  <XCircle className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>

          {/* Main Title & Details */}
          <div className="my-auto py-0.5 min-w-0">
            <h3 className={`font-bold tracking-tight leading-snug text-white ${isMedium ? 'text-sm sm:text-base line-clamp-1' : 'text-base sm:text-lg line-clamp-2'}`}>
              {event.title}
            </h3>

            {isTall && event.why && (
              <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 mt-1 font-normal leading-relaxed">
                {event.why}
              </p>
            )}
          </div>

          {/* Footer / Location */}
          {heightPx >= 90 && (
            <div className="flex items-center justify-between text-xs font-medium pt-1 border-t border-zinc-800/80">
              <div className="flex items-center gap-1.5 truncate text-zinc-300">
                {event.location && (
                  <>
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-sky-400" />
                    <span className="truncate">{event.location.split(',')[0]}</span>
                  </>
                )}
              </div>
              {event.reservation && (
                <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 text-xs font-bold shrink-0 ml-1">
                  Reserved
                </span>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
