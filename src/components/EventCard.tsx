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
  const heightPx = Math.max(56, event.durationMinutes * PIXELS_PER_MINUTE);

  const getTypeStyles = (type: EventType, status: string) => {
    if (status === 'done') {
      return {
        card: 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300 opacity-60',
        icon: <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />,
        pinColor: 'text-emerald-400',
        badge: 'bg-emerald-950/40 border-emerald-700/40 text-emerald-300'
      };
    }
    if (status === 'skipped') {
      return {
        card: 'bg-zinc-950/40 border-zinc-800/40 text-zinc-500 opacity-40 line-through',
        icon: <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-500 shrink-0" />,
        pinColor: 'text-zinc-500',
        badge: 'bg-zinc-900 border-zinc-800 text-zinc-500'
      };
    }

    switch (type) {
      case 'visit':
        return {
          card: 'bg-sky-950/35 border-sky-800/50 hover:bg-sky-900/35 hover:border-sky-700/70',
          icon: <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 shrink-0" />,
          pinColor: 'text-sky-400',
          badge: 'bg-sky-900/40 border-sky-700/40 text-sky-200'
        };
      case 'food':
        return {
          card: 'bg-rose-950/35 border-rose-800/50 hover:bg-rose-900/35 hover:border-rose-700/70',
          icon: <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400 shrink-0" />,
          pinColor: 'text-rose-400',
          badge: 'bg-rose-900/40 border-rose-700/40 text-rose-200'
        };
      case 'drink':
        return {
          card: 'bg-fuchsia-950/35 border-fuchsia-800/50 hover:bg-fuchsia-900/35 hover:border-fuchsia-700/70',
          icon: <Wine className="w-4 h-4 sm:w-5 sm:h-5 text-fuchsia-400 shrink-0" />,
          pinColor: 'text-fuchsia-400',
          badge: 'bg-fuchsia-900/40 border-fuchsia-700/40 text-fuchsia-200'
        };
      case 'walk':
        return {
          card: 'bg-emerald-950/35 border-emerald-800/50 hover:bg-emerald-900/35 hover:border-emerald-700/70',
          icon: <Footprints className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />,
          pinColor: 'text-emerald-400',
          badge: 'bg-emerald-900/40 border-emerald-700/40 text-emerald-200'
        };
      case 'transport':
        return {
          card: 'bg-cyan-950/35 border-cyan-800/50 hover:bg-cyan-900/35 hover:border-cyan-700/70',
          icon: <Ship className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />,
          pinColor: 'text-cyan-400',
          badge: 'bg-cyan-900/40 border-cyan-700/40 text-cyan-200'
        };
      case 'concert':
        return {
          card: 'bg-indigo-950/40 border-indigo-800/60 hover:bg-indigo-900/40 hover:border-indigo-700/80',
          icon: <Music className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 shrink-0" />,
          pinColor: 'text-indigo-400',
          badge: 'bg-indigo-900/40 border-indigo-700/40 text-indigo-200'
        };
      case 'rest':
        return {
          card: 'bg-zinc-850/80 border-zinc-700/60 hover:bg-zinc-800/80 hover:border-zinc-650/80',
          icon: <BedDouble className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 shrink-0" />,
          pinColor: 'text-zinc-400',
          badge: 'bg-zinc-800 border-zinc-700 text-zinc-300'
        };
      case 'optional':
        return {
          card: 'bg-zinc-900/40 border-zinc-700/50 border-dashed hover:bg-zinc-850/50',
          icon: <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 shrink-0" />,
          pinColor: 'text-zinc-400',
          badge: 'bg-zinc-800 border-zinc-700 text-zinc-400'
        };
      default:
        return {
          card: 'bg-sky-950/35 border-sky-800/50 hover:bg-sky-900/35 hover:border-sky-700/70',
          icon: <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 shrink-0" />,
          pinColor: 'text-sky-400',
          badge: 'bg-sky-900/40 border-sky-700/40 text-sky-200'
        };
    }
  };

  const style = getTypeStyles(event.type, event.status);
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
      className={`absolute rounded-2xl border p-3 sm:p-4 transition-all duration-150 cursor-pointer overflow-hidden flex flex-col justify-between shadow-subtle backdrop-blur-md select-none ${
        style.card
      } ${
        isSelected
          ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-zinc-950 scale-[1.01] z-20 shadow-elevated'
          : 'hover:scale-[1.005] z-10'
      } ${event.hasCollisionWithFixed ? 'ring-2 ring-rose-500 animate-pulse' : ''}`}
    >
      {/* 1. Compact View (< 70px: 15–25 min stops) */}
      {isCompact ? (
        <div className="flex flex-col justify-between h-full">
          <div className="flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              {style.icon}
              <h3 className="font-extrabold text-sm sm:text-base text-white truncate tracking-tight">
                {event.title}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {event.isFixed && (
                <span className="flex items-center gap-0.5 px-2 py-0.5 rounded bg-black/40 text-amber-200 border border-amber-500/30 text-xs font-bold">
                  <Lock className="w-3 h-3" /> Fixed
                </span>
              )}
              <span className={`text-xs font-bold px-2 py-0.5 rounded-lg border font-mono ${style.badge}`}>
                {formatDuration(event.durationMinutes)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-zinc-300 pt-0.5">
            <span className="font-mono text-white font-bold">
              {formatEventTime(event.startTime)}–{formatEventTime(event.endTime)}
            </span>
            {event.location && (
              <span className="truncate max-w-[160px] text-zinc-300 font-normal">
                {event.location.split(',')[0]}
              </span>
            )}
          </div>
        </div>
      ) : (
        /* 2. Standard & Tall View (>= 70px) */
        <>
          {/* Top Header Row */}
          <div className="flex items-center justify-between gap-2 text-sm sm:text-base font-semibold leading-none">
            <div className="flex items-center gap-2.5 min-w-0">
              {style.icon}

              {/* Time */}
              <span className="font-extrabold tracking-tight text-white shrink-0 font-mono text-sm sm:text-base">
                {event.isSimulatedShifted && event.simulatedStartTime ? (
                  <span className="flex items-center gap-1.5">
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
              <span className={`text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-lg border shrink-0 font-mono ${style.badge}`}>
                {formatDuration(event.durationMinutes)}
              </span>
            </div>

            {/* Status / Fixed Badges */}
            <div className="flex items-center gap-1.5 shrink-0">
              {event.hasCollisionWithFixed && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/40">
                  <AlertTriangle className="w-3.5 h-3.5" /> Conflict
                </span>
              )}

              {event.isFixed && (
                <span
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/50 text-amber-200 text-xs sm:text-sm font-bold border border-amber-500/40"
                  title="Fixed time slot (Locked)"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" /> Fixed
                </span>
              )}

              {event.status === 'done' && (
                <span className="text-emerald-400">
                  <CheckCircle className="w-5 h-5" />
                </span>
              )}

              {event.status === 'skipped' && (
                <span className="text-zinc-500">
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
              <p className="text-xs sm:text-sm text-zinc-200 line-clamp-2 mt-1.5 font-normal leading-relaxed">
                {event.what || event.why}
              </p>
            )}
          </div>

          {/* Footer / Location */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium pt-1">
            <div className="flex items-center gap-2 truncate text-zinc-300">
              {event.location && (
                <>
                  <MapPin className={`w-4 h-4 shrink-0 ${style.pinColor}`} />
                  <span className="truncate font-semibold">{event.location.split(',')[0]}</span>
                </>
              )}
            </div>

            {event.reservation ? (
              <span className="px-2.5 py-0.5 rounded-lg bg-rose-950/70 text-rose-200 border border-rose-700/60 text-xs sm:text-sm font-bold shrink-0 ml-1">
                Reserved
              </span>
            ) : event.ticket ? (
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-950/70 text-emerald-200 border border-emerald-700/60 text-xs sm:text-sm font-bold shrink-0 ml-1">
                Ticketed
              </span>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};
