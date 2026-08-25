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
        card: 'bg-gradient-to-br from-emerald-950/25 via-[#0c1813]/60 to-black/60 border-emerald-700/40 text-emerald-200 opacity-60',
        icon: <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />,
        pinColor: 'text-emerald-400',
        badge: 'bg-emerald-950/60 border-emerald-600/40 text-emerald-200'
      };
    }
    if (status === 'skipped') {
      return {
        card: 'bg-black/40 border-white/[0.06] text-zinc-500 opacity-40 line-through',
        icon: <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-500 shrink-0" />,
        pinColor: 'text-zinc-500',
        badge: 'bg-zinc-900 border-zinc-800 text-zinc-500'
      };
    }

    switch (type) {
      case 'visit':
        return {
          card: 'bg-gradient-to-br from-sky-950/45 via-[#0b1626]/85 to-black/70 border-sky-500/35 hover:border-sky-400/70 hover:shadow-sky-950/40',
          icon: <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 shrink-0" />,
          pinColor: 'text-sky-400',
          badge: 'bg-sky-500/15 border-sky-400/30 text-sky-200'
        };
      case 'food':
        return {
          card: 'bg-gradient-to-br from-rose-950/45 via-[#1d0d14]/85 to-black/70 border-rose-500/35 hover:border-rose-400/70 hover:shadow-rose-950/40',
          icon: <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400 shrink-0" />,
          pinColor: 'text-rose-400',
          badge: 'bg-rose-500/15 border-rose-400/30 text-rose-200'
        };
      case 'drink':
        return {
          card: 'bg-gradient-to-br from-amber-950/35 via-[#1b1408]/85 to-black/70 border-amber-500/35 hover:border-amber-400/70 hover:shadow-amber-950/40',
          icon: <Wine className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 shrink-0" />,
          pinColor: 'text-amber-300',
          badge: 'bg-amber-500/15 border-amber-400/30 text-amber-200'
        };
      case 'walk':
        return {
          card: 'bg-gradient-to-br from-emerald-950/45 via-[#081812]/85 to-black/70 border-emerald-500/35 hover:border-emerald-400/70 hover:shadow-emerald-950/40',
          icon: <Footprints className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />,
          pinColor: 'text-emerald-400',
          badge: 'bg-emerald-500/15 border-emerald-400/30 text-emerald-200'
        };
      case 'transport':
        return {
          card: 'bg-gradient-to-br from-cyan-950/45 via-[#091720]/85 to-black/70 border-cyan-500/35 hover:border-cyan-400/70 hover:shadow-cyan-950/40',
          icon: <Ship className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />,
          pinColor: 'text-cyan-400',
          badge: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-200'
        };
      case 'concert':
        return {
          card: 'bg-gradient-to-br from-violet-950/50 via-[#140c26]/85 to-black/70 border-violet-500/35 hover:border-violet-400/70 hover:shadow-violet-950/40',
          icon: <Music className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400 shrink-0" />,
          pinColor: 'text-violet-400',
          badge: 'bg-violet-500/15 border-violet-400/30 text-violet-200'
        };
      case 'rest':
        return {
          card: 'bg-gradient-to-br from-slate-900/60 via-[#10141e]/85 to-black/70 border-slate-700/40 hover:border-slate-500/60',
          icon: <BedDouble className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 shrink-0" />,
          pinColor: 'text-zinc-400',
          badge: 'bg-white/[0.06] border-white/[0.1] text-zinc-300'
        };
      case 'optional':
        return {
          card: 'bg-white/[0.02] border-white/[0.1] border-dashed hover:bg-white/[0.05]',
          icon: <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 shrink-0" />,
          pinColor: 'text-zinc-400',
          badge: 'bg-white/[0.04] border-white/[0.08] text-zinc-400'
        };
      default:
        return {
          card: 'bg-gradient-to-br from-sky-950/45 via-[#0b1626]/85 to-black/70 border-sky-500/35 hover:border-sky-400/70',
          icon: <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 shrink-0" />,
          pinColor: 'text-sky-400',
          badge: 'bg-sky-500/15 border-sky-400/30 text-sky-200'
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
      className={`absolute rounded-2xl border p-3.5 sm:p-4 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between shadow-elevated backdrop-blur-xl select-none ${
        style.card
      } ${
        isSelected
          ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-black scale-[1.015] z-20 shadow-2xl shadow-indigo-500/20'
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
                <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-lg bg-black/50 text-amber-200 border border-amber-400/40 text-[11px] font-black">
                  <Lock className="w-3 h-3" /> Fixed
                </span>
              )}
              <span className={`text-xs font-bold px-2 py-0.5 rounded-lg border font-mono ${style.badge}`}>
                {formatDuration(event.durationMinutes)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-zinc-300 pt-0.5">
            <span className="font-mono text-white font-black">
              {formatEventTime(event.startTime)}–{formatEventTime(event.endTime)}
            </span>
            {event.location && (
              <span className="truncate max-w-[160px] text-zinc-300 font-medium">
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
              <span className="font-black tracking-tight text-white shrink-0 font-mono text-sm sm:text-base">
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
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-rose-500/25 text-rose-200 text-xs font-black border border-rose-400/50 shadow-sm">
                  <AlertTriangle className="w-3.5 h-3.5" /> Conflict
                </span>
              )}

              {event.isFixed && (
                <span
                  className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-black/60 text-amber-200 text-xs sm:text-sm font-black border border-amber-400/40 shadow-sm"
                  title="Fixed time slot (Locked)"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" /> Fixed
                </span>
              )}

              {event.status === 'done' && (
                <span className="text-emerald-400 drop-shadow-sm">
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
              <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 mt-1.5 font-normal leading-relaxed">
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
              <span className="px-2.5 py-0.5 rounded-lg bg-rose-500/20 text-rose-200 border border-rose-400/30 text-xs sm:text-sm font-black shrink-0 ml-1 shadow-sm">
                Reserved
              </span>
            ) : event.ticket ? (
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-xs sm:text-sm font-black shrink-0 ml-1 shadow-sm">
                Ticketed
              </span>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};
