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
  const heightPx = Math.max(56, (event.durationMinutes * PIXELS_PER_MINUTE) - 6);

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
      case 'visit': return 'border-sky-400/90 hover:border-sky-300';
      case 'food': return 'border-rose-400/90 hover:border-rose-300';
      case 'drink': return 'border-amber-400/90 hover:border-amber-300';
      case 'walk': return 'border-emerald-400/90 hover:border-emerald-300';
      case 'transport': return 'border-cyan-400/90 hover:border-cyan-300';
      case 'concert': return 'border-indigo-400/90 hover:border-indigo-300';
      case 'rest': return 'border-slate-600/90 hover:border-slate-500';
      case 'optional': return 'border-slate-600/90 hover:border-slate-500';
      default: return 'border-sky-400/90 hover:border-sky-300';
    }
  };

  const getTypeSpineClass = (type: EventType) => {
    switch (type) {
      case 'visit': return 'bg-sky-500/15 border-r border-sky-500/30 text-sky-200';
      case 'food': return 'bg-rose-500/15 border-r border-rose-500/30 text-rose-200';
      case 'drink': return 'bg-amber-500/15 border-r border-amber-500/30 text-amber-200';
      case 'walk': return 'bg-emerald-500/15 border-r border-emerald-500/30 text-emerald-200';
      case 'transport': return 'bg-cyan-500/15 border-r border-cyan-500/30 text-cyan-200';
      case 'concert': return 'bg-indigo-500/15 border-r border-indigo-500/30 text-indigo-200';
      case 'rest': return 'bg-slate-700/20 border-r border-slate-700/40 text-slate-300';
      case 'optional': return 'bg-slate-700/20 border-r border-slate-700/40 text-slate-300';
      default: return 'bg-sky-500/15 border-r border-sky-500/30 text-sky-200';
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
      className={`absolute rounded-[20px] sm:rounded-[22px] border-[1.5px] transition-all duration-150 cursor-pointer overflow-hidden flex select-none ${
        event.status === 'done'
          ? 'bg-[#1e2330]/80 border-emerald-800/50 text-emerald-300/80 opacity-60 shadow-md'
          : event.status === 'skipped'
          ? 'bg-[#181b24]/50 border-slate-800 text-slate-500 opacity-40 line-through'
          : `bg-gradient-to-br from-[#272e3d] to-[#1c212e] ${getTypeBorderClass(event.type)} hover:brightness-110 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6)]`
      } ${
        isSelected
          ? 'ring-2 ring-indigo-400 !border-indigo-400 bg-[#31384b] z-20 shadow-[0_0_0_2px_rgba(129,140,248,0.8),0_12px_32px_-4px_rgba(0,0,0,0.7)]'
          : 'z-10'
      } ${event.hasCollisionWithFixed ? 'ring-2 ring-rose-500 animate-pulse' : ''}`}
    >
      {/* Left Integrated Time Spine Ribbon (Concept 5 — Big Bold Numbers) */}
      <div className={`w-24 sm:w-28 md:w-32 shrink-0 p-2 sm:p-3 flex flex-col justify-between items-center text-center select-none ${getTypeSpineClass(event.type)}`}>
        {/* Big Start Time */}
        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black font-mono tracking-tight leading-none text-white drop-shadow-sm">
          {event.isSimulatedShifted && event.simulatedStartTime ? (
            <span className="text-indigo-300 font-black">
              {formatEventTime(event.simulatedStartTime)}
            </span>
          ) : (
            formatEventTime(event.startTime)
          )}
        </span>

        {/* Duration Badge */}
        <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/30 text-white/90 border border-white/10 my-1">
          {formatDuration(event.durationMinutes)}
        </span>

        {/* End Time */}
        <span className="text-sm sm:text-base md:text-lg font-black font-mono tracking-tight leading-none text-slate-300">
          {formatEventTime(event.endTime)}
        </span>
      </div>

      {/* Right Main Card Content */}
      <div className="flex-1 p-3 sm:p-3.5 flex flex-col justify-between min-w-0 overflow-hidden">
        {/* Top Meta Row: Icon + Location on Left, Badges on Right */}
        <div className="flex items-center justify-between gap-2 leading-none">
          <div className="flex items-center gap-1.5 min-w-0 truncate text-xs font-bold text-slate-300">
            {getTypeIcon(event.type)}
            {locationShort && (
              <span className="truncate font-semibold text-slate-300">{locationShort}</span>
            )}
          </div>

          {/* Right Status / Booking Badges */}
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

        {/* Title & Subtitle */}
        <div className="my-auto py-0.5 min-w-0">
          <h3 className={`font-black tracking-tight leading-snug text-white ${isCompact ? 'text-sm sm:text-base line-clamp-1' : isMedium ? 'text-base sm:text-lg line-clamp-1' : 'text-base sm:text-lg lg:text-xl line-clamp-2'}`}>
            {event.title}
          </h3>

          {subtitle && !isCompact && (
            <p className={`text-xs sm:text-sm text-slate-300 font-medium mt-0.5 leading-tight ${isTall ? 'line-clamp-2' : 'line-clamp-1'}`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
