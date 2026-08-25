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
      case 'visit': return 'border-sky-500 shadow-[0_0_18px_-3px_rgba(56,189,248,0.3),0_8px_24px_-4px_rgba(0,0,0,0.5)] hover:border-sky-400';
      case 'food': return 'border-rose-500 shadow-[0_0_18px_-3px_rgba(244,63,94,0.3),0_8px_24px_-4px_rgba(0,0,0,0.5)] hover:border-rose-400';
      case 'drink': return 'border-amber-400 shadow-[0_0_18px_-3px_rgba(251,191,36,0.3),0_8px_24px_-4px_rgba(0,0,0,0.5)] hover:border-amber-300';
      case 'walk': return 'border-emerald-500 shadow-[0_0_18px_-3px_rgba(16,185,129,0.3),0_8px_24px_-4px_rgba(0,0,0,0.5)] hover:border-emerald-400';
      case 'transport': return 'border-cyan-400 shadow-[0_0_18px_-3px_rgba(34,211,238,0.3),0_8px_24px_-4px_rgba(0,0,0,0.5)] hover:border-cyan-300';
      case 'concert': return 'border-indigo-400 shadow-[0_0_18px_-3px_rgba(129,140,248,0.3),0_8px_24px_-4px_rgba(0,0,0,0.5)] hover:border-indigo-300';
      case 'rest': return 'border-slate-600 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.5)] hover:border-slate-500';
      case 'optional': return 'border-slate-600 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.5)] hover:border-slate-500';
      default: return 'border-sky-500 shadow-[0_0_18px_-3px_rgba(56,189,248,0.3),0_8px_24px_-4px_rgba(0,0,0,0.5)] hover:border-sky-400';
    }
  };

  const getWatermarkSvg = (type: EventType) => {
    switch (type) {
      case 'visit':
        return (
          <svg className="absolute -right-2 -bottom-2 w-28 h-28 text-sky-400/[0.12] pointer-events-none stroke-current" viewBox="0 0 100 100" fill="none" strokeWidth="1.5">
            <path d="M10 90 L90 90 M25 90 L25 40 L30 35 L30 90 M70 90 L70 35 L75 40 L75 90 M30 75 C30 50 70 50 70 75 Z M50 50 L50 35 M48 35 L52 35 M50 35 L50 30 C50 28 52 28 52 26 C52 24 50 24 50 22" />
          </svg>
        );
      case 'food':
        return (
          <svg className="absolute -right-2 -bottom-2 w-24 h-24 text-rose-400/[0.12] pointer-events-none stroke-current" viewBox="0 0 100 100" fill="none" strokeWidth="1.5">
            <circle cx="50" cy="50" r="35" />
            <path d="M40 30 L40 65 M35 30 L35 45 L45 45 L45 30 M60 30 L60 65 M60 40 C65 40 68 35 68 30 L60 30" />
          </svg>
        );
      case 'drink':
        return (
          <svg className="absolute -right-2 -bottom-2 w-24 h-24 text-amber-400/[0.12] pointer-events-none stroke-current" viewBox="0 0 100 100" fill="none" strokeWidth="1.5">
            <path d="M30 35 L70 35 L60 70 L40 70 Z M50 70 L50 85 M35 85 L65 85" />
          </svg>
        );
      case 'walk':
        return (
          <svg className="absolute -right-2 -bottom-2 w-24 h-24 text-emerald-400/[0.12] pointer-events-none stroke-current" viewBox="0 0 100 100" fill="none" strokeWidth="1.5">
            <path d="M20 70 Q50 30 80 70 M30 85 Q60 45 90 85 M10 50 Q40 20 70 50" />
          </svg>
        );
      case 'transport':
        return (
          <svg className="absolute -right-2 -bottom-2 w-28 h-28 text-cyan-400/[0.12] pointer-events-none stroke-current" viewBox="0 0 100 100" fill="none" strokeWidth="1.5">
            <path d="M15 65 L85 65 L75 80 L25 80 Z M35 65 L35 45 L65 45 L65 65 M45 45 L45 35 L55 35 L55 45 M10 85 Q30 80 50 85 T90 85" />
          </svg>
        );
      case 'concert':
        return (
          <svg className="absolute -right-2 -bottom-2 w-24 h-24 text-indigo-400/[0.12] pointer-events-none stroke-current" viewBox="0 0 100 100" fill="none" strokeWidth="1.5">
            <circle cx="35" cy="65" r="10" />
            <circle cx="65" cy="55" r="10" />
            <path d="M45 65 L45 30 L75 20 L75 55 M45 40 L75 30" />
          </svg>
        );
      default:
        return null;
    }
  };

  const isCompact = heightPx < 70;
  const isMedium = heightPx >= 70 && heightPx < 115;
  const isTall = heightPx >= 115;

  const locationShort = event.location ? event.location.split(',')[0].trim() : '';
  const subtitle = event.what || event.why || '';

  return (
    <div
      onClick={() => onSelect(event)}
      style={{
        top: `${topPx}px`,
        height: `${heightPx}px`,
        left: leftOffset,
        width: width,
      }}
      className={`absolute rounded-2xl sm:rounded-[22px] border p-3.5 sm:p-4 transition-all duration-150 cursor-pointer overflow-hidden flex flex-col justify-between select-none ${
        event.status === 'done'
          ? 'bg-[#1e2330]/80 border-emerald-800/50 text-emerald-300/80 opacity-60 shadow-md shadow-black/25'
          : event.status === 'skipped'
          ? 'bg-[#181b24]/50 border-slate-800 text-slate-500 opacity-40 line-through'
          : `bg-gradient-to-br from-[#293040] to-[#1e2331] ${getTypeBorderClass(event.type)} hover:brightness-110`
      } ${
        isSelected
          ? 'ring-2 ring-indigo-400 !border-indigo-400 bg-[#31384b] z-20 shadow-[0_0_0_2px_rgba(129,140,248,0.8),0_12px_32px_-4px_rgba(0,0,0,0.7)]'
          : 'z-10'
      } ${event.hasCollisionWithFixed ? 'ring-2 ring-rose-500 animate-pulse' : ''}`}
    >
      {/* Subtle Architectural / Category Watermark Background */}
      {getWatermarkSvg(event.type)}

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
