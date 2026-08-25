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

  const getTypeIcon = (type: EventType) => {
    switch (type) {
      case 'visit': return <Landmark className="w-4 h-4 text-sky-400 shrink-0" />;
      case 'food': return <Utensils className="w-4 h-4 text-rose-400 shrink-0" />;
      case 'drink': return <Wine className="w-4 h-4 text-amber-300 shrink-0" />;
      case 'walk': return <Footprints className="w-4 h-4 text-emerald-400 shrink-0" />;
      case 'transport': return <Ship className="w-4 h-4 text-cyan-400 shrink-0" />;
      case 'concert': return <Music className="w-4 h-4 text-indigo-400 shrink-0" />;
      case 'rest': return <BedDouble className="w-4 h-4 text-slate-400 shrink-0" />;
      case 'optional': return <HelpCircle className="w-4 h-4 text-zinc-400 shrink-0" />;
      default: return <Landmark className="w-4 h-4 text-sky-400 shrink-0" />;
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
          ? 'bg-[#10121a]/60 border-emerald-900/40 text-emerald-300/80 opacity-60'
          : event.status === 'skipped'
          ? 'bg-[#0f1016]/40 border-white/[0.04] text-zinc-600 opacity-40 line-through'
          : 'bg-[#13151f] border-white/[0.08] hover:border-white/[0.16] hover:bg-[#171a25] shadow-subtle'
      } ${
        isSelected
          ? 'ring-1 ring-indigo-400 border-indigo-400/50 bg-[#171a27] z-20 shadow-elevated'
          : 'z-10'
      } ${event.hasCollisionWithFixed ? 'ring-1 ring-rose-500 animate-pulse' : ''}`}
    >
      {/* 1. Compact View (< 70px: 15–25 min stops) */}
      {isCompact ? (
        <div className="flex flex-col justify-between h-full">
          <div className="flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              {getTypeIcon(event.type)}
              <h3 className="font-bold text-sm sm:text-base text-zinc-100 truncate tracking-tight">
                {event.title}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {event.isFixed && (
                <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-black/40 text-amber-200/90 border border-amber-500/30 text-[11px] font-semibold">
                  <Lock className="w-2.5 h-2.5" /> Fixed
                </span>
              )}
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-zinc-300 font-mono">
                {formatDuration(event.durationMinutes)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-medium text-zinc-400 pt-0.5">
            <span className="font-mono text-zinc-200">
              {formatEventTime(event.startTime)}–{formatEventTime(event.endTime)}
            </span>
            {event.location && (
              <span className="truncate max-w-[160px] text-zinc-400">
                {event.location.split(',')[0]}
              </span>
            )}
          </div>
        </div>
      ) : (
        /* 2. Standard & Tall View (>= 70px) */
        <>
          {/* Top Header Row */}
          <div className="flex items-center justify-between gap-2 text-sm font-semibold leading-none">
            <div className="flex items-center gap-2 min-w-0">
              {getTypeIcon(event.type)}

              {/* Time */}
              <span className="font-bold tracking-tight text-zinc-200 shrink-0 font-mono text-xs sm:text-sm">
                {event.isSimulatedShifted && event.simulatedStartTime ? (
                  <span className="flex items-center gap-1.5">
                    <span className="line-through text-zinc-500 text-xs">
                      {formatEventTime(event.startTime)}
                    </span>
                    <span className="text-indigo-300 font-bold">
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
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-zinc-300 shrink-0 font-mono">
                {formatDuration(event.durationMinutes)}
              </span>
            </div>

            {/* Status / Fixed Badges */}
            <div className="flex items-center gap-1.5 shrink-0">
              {event.hasCollisionWithFixed && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                  <AlertTriangle className="w-3 h-3" /> Conflict
                </span>
              )}

              {event.isFixed && (
                <span
                  className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/40 text-amber-200/90 text-xs font-semibold border border-amber-500/30"
                  title="Fixed time slot (Locked)"
                >
                  <Lock className="w-3 h-3 text-amber-400/90" /> Fixed
                </span>
              )}

              {event.status === 'done' && (
                <span className="text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                </span>
              )}

              {event.status === 'skipped' && (
                <span className="text-zinc-600">
                  <XCircle className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>

          {/* Main Title & Details */}
          <div className="my-auto py-1 min-w-0">
            <h3 className={`font-bold tracking-tight leading-snug text-zinc-100 ${isMedium ? 'text-sm sm:text-base line-clamp-1' : 'text-base sm:text-lg line-clamp-2'}`}>
              {event.title}
            </h3>

            {isTall && (event.what || event.why) && (
              <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 mt-1 font-normal leading-relaxed">
                {event.what || event.why}
              </p>
            )}
          </div>

          {/* Footer / Location */}
          <div className="flex items-center justify-between text-xs font-medium pt-1 border-t border-white/[0.04]">
            <div className="flex items-center gap-1.5 truncate text-zinc-400">
              {event.location && (
                <>
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-zinc-500" />
                  <span className="truncate">{event.location.split(',')[0]}</span>
                </>
              )}
            </div>

            {event.reservation ? (
              <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 text-xs font-medium shrink-0 ml-1">
                Reserved
              </span>
            ) : event.ticket ? (
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-medium shrink-0 ml-1">
                Ticketed
              </span>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};
