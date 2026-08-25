import React, { useState, useEffect } from 'react';
import { Clock, Navigation, Compass, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { ItineraryEvent } from '../types/calendar';
import { formatEventTime, getIstanbulDate, calculateNowAndNext } from '../utils/time';
import { differenceInMinutes, parseISO } from 'date-fns';

interface NowNextWidgetProps {
  events: ItineraryEvent[];
  selectedDate: string; // YYYY-MM-DD
  onSelectEvent: (event: ItineraryEvent) => void;
}

export const NowNextWidget: React.FC<NowNextWidgetProps> = ({
  events,
  selectedDate,
  onSelectEvent,
}) => {
  // Simulated time feature for previewing outside trip dates
  const [simulatedHour, setSimulatedHour] = useState<number | null>(null);
  const [showSimControls, setShowSimControls] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date>(() => getIstanbulDate());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getIstanbulDate());
    }, 30000); // Check every 30s
    return () => clearInterval(timer);
  }, []);

  // Determine effective time
  const effectiveDate = React.useMemo(() => {
    const [yearStr, monthStr, dayStr] = selectedDate.split('-');
    const targetYear = parseInt(yearStr, 10);
    const targetMonth = parseInt(monthStr, 10) - 1;
    const targetDay = parseInt(dayStr, 10);

    if (simulatedHour !== null) {
      const sim = new Date(targetYear, targetMonth, targetDay, Math.floor(simulatedHour), Math.round((simulatedHour % 1) * 60));
      return sim;
    }

    const istanbulNow = currentTime;
    const isDuringTrip = 
      istanbulNow.getFullYear() === 2026 &&
      istanbulNow.getMonth() === 8 &&
      istanbulNow.getDate() >= 22 &&
      istanbulNow.getDate() <= 26;

    if (isDuringTrip) {
      return istanbulNow;
    }

    // Default before trip: default to 10:15 AM of selected day
    return new Date(targetYear, targetMonth, targetDay, 10, 15);
  }, [selectedDate, simulatedHour, currentTime]);

  const { currentEvent, nextEvent, minutesToNext } = calculateNowAndNext(events, effectiveDate);

  const getLeaveText = (minutes: number | null) => {
    if (minutes === null) return 'Upcoming';
    if (minutes <= 0) return 'Starting right now';
    if (minutes <= 60) return `Leave in ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const rem = minutes % 60;
    return rem === 0 ? `In ${hours} hours` : `In ${hours}h ${rem}m`;
  };

  const getProgressPercentage = (event: ItineraryEvent) => {
    try {
      const start = parseISO(event.startTime);
      const end = parseISO(event.endTime);
      const total = differenceInMinutes(end, start);
      const elapsed = differenceInMinutes(effectiveDate, start);
      if (total <= 0) return 0;
      return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
    } catch {
      return 0;
    }
  };

  return (
    <div className="bg-[#0e111a]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 sm:p-5 mb-5 shadow-elevated">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2 font-bold text-zinc-300">
          <Compass className="w-5 h-5 text-indigo-400" />
          <span className="tracking-widest uppercase text-xs sm:text-sm font-extrabold text-zinc-300">Live Trip Telemetry</span>
        </div>
        <button
          onClick={() => setShowSimControls(!showSimControls)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm ${
            simulatedHour !== null
              ? 'bg-indigo-500/25 text-indigo-200 border border-indigo-400/50'
              : 'text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.08]'
          }`}
          title="Simulate time of day"
        >
          <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
          <span>{simulatedHour !== null ? `Simulating ${Math.floor(simulatedHour)}:${String(Math.round((simulatedHour % 1) * 60)).padStart(2, '0')}` : 'Preview Clock'}</span>
        </button>
      </div>

      {/* Simulation Slider Drawer */}
      {showSimControls && (
        <div className="mb-4 p-4 bg-black/40 border border-white/[0.08] rounded-2xl space-y-3 text-sm backdrop-blur-md">
          <div className="flex justify-between items-center text-zinc-200">
            <span className="font-bold">Time of Day Simulator:</span>
            <button
              onClick={() => { setSimulatedHour(null); }}
              className="text-xs sm:text-sm text-indigo-400 font-bold hover:underline"
            >
              Reset (10:15)
            </button>
          </div>
          <input
            type="range"
            min="8"
            max="23.5"
            step="0.25"
            value={simulatedHour ?? 10.25}
            onChange={(e) => setSimulatedHour(parseFloat(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
          />
          <div className="flex justify-between text-xs sm:text-sm text-zinc-400 font-mono font-bold">
            <span>08:00</span>
            <span>12:00</span>
            <span>16:00</span>
            <span>20:00</span>
            <span>23:30</span>
          </div>
        </div>
      )}

      {/* Now & Next Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* NOW Block */}
        <div
          onClick={() => currentEvent && onSelectEvent(currentEvent)}
          className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between select-none ${
            currentEvent
              ? 'bg-gradient-to-br from-indigo-950/40 via-[#0d1020]/90 to-black/60 border-indigo-500/40 hover:border-indigo-400/80 shadow-md ring-1 ring-indigo-500/20'
              : 'bg-white/[0.02] border-white/[0.06] text-zinc-500'
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs sm:text-sm font-black tracking-widest text-indigo-300 uppercase mb-2">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse shadow-sm shadow-indigo-400/80"></span>
                ACTIVE NOW
              </span>
              {currentEvent && (
                <span className="text-zinc-300 font-bold font-mono text-xs sm:text-sm">
                  {formatEventTime(currentEvent.startTime)}–{formatEventTime(currentEvent.endTime)}
                </span>
              )}
            </div>

            {currentEvent ? (
              <div className="font-black text-white text-lg sm:text-xl leading-snug line-clamp-1 tracking-tight">
                {currentEvent.title}
              </div>
            ) : (
              <div className="text-sm sm:text-base text-zinc-400 italic py-1 font-normal">
                No active activity (Free time)
              </div>
            )}
          </div>

          {currentEvent && (
            <div className="mt-4 space-y-2">
              <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden border border-white/[0.08]">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-sky-400 h-full rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${getProgressPercentage(currentEvent)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-300">
                <span className="truncate font-medium">{currentEvent.location ? currentEvent.location.split(',')[0] : 'In progress'}</span>
                <span className="flex items-center gap-0.5 text-indigo-300 font-bold shrink-0 ml-1">
                  View <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          )}
        </div>

        {/* NEXT Block */}
        <div
          onClick={() => nextEvent && onSelectEvent(nextEvent)}
          className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between select-none ${
            nextEvent
              ? 'bg-gradient-to-br from-white/[0.04] via-[#0d1020]/70 to-black/60 border-white/[0.12] hover:border-white/[0.22] shadow-md'
              : 'bg-white/[0.02] border-white/[0.06] text-zinc-500'
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs sm:text-sm font-black tracking-widest text-zinc-300 uppercase mb-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-zinc-400" />
                NEXT STOP
              </span>
              {nextEvent && (
                <span className="text-zinc-200 font-black font-mono text-xs sm:text-sm">
                  {formatEventTime(nextEvent.startTime)}
                </span>
              )}
            </div>

            {nextEvent ? (
              <div className="font-black text-white text-lg sm:text-xl leading-snug line-clamp-1 tracking-tight">
                {nextEvent.title}
              </div>
            ) : (
              <div className="text-sm sm:text-base text-zinc-400 italic py-1 font-normal">
                Schedule complete for today
              </div>
            )}
          </div>

          {nextEvent && (
            <div className="mt-4 flex items-center justify-between text-xs sm:text-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-200 font-black text-xs sm:text-sm border border-cyan-400/30 shadow-sm">
                <Navigation className="w-4 h-4 text-cyan-400" />
                {getLeaveText(minutesToNext)}
              </span>
              <span className="flex items-center gap-0.5 text-zinc-300 text-xs sm:text-sm font-bold">
                Details <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
