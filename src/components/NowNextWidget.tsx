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
    <div className="bg-[#12141c] border border-white/[0.07] rounded-2xl p-4 sm:p-5 mb-5 shadow-subtle">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2 text-zinc-300 font-semibold">
          <Compass className="w-4 h-4 text-indigo-400" />
          <span className="tracking-wider uppercase text-xs font-bold text-zinc-400">Live Trip Companion</span>
        </div>
        <button
          onClick={() => setShowSimControls(!showSimControls)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            simulatedHour !== null
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] border border-white/[0.06]'
          }`}
          title="Simulate time of day"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{simulatedHour !== null ? `Simulating ${Math.floor(simulatedHour)}:${String(Math.round((simulatedHour % 1) * 60)).padStart(2, '0')}` : 'Preview Clock'}</span>
        </button>
      </div>

      {/* Simulation Slider Drawer */}
      {showSimControls && (
        <div className="mb-4 p-4 bg-[#0d0e14] border border-white/[0.06] rounded-xl space-y-3 text-sm">
          <div className="flex justify-between items-center text-zinc-200">
            <span className="font-semibold text-xs text-zinc-300">Time of Day Simulator:</span>
            <button
              onClick={() => { setSimulatedHour(null); }}
              className="text-xs text-indigo-400 font-semibold hover:underline"
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
            className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
          />
          <div className="flex justify-between text-xs text-zinc-500 font-mono">
            <span>08:00</span>
            <span>12:00</span>
            <span>16:00</span>
            <span>20:00</span>
            <span>23:30</span>
          </div>
        </div>
      )}

      {/* Now & Next Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* NOW Block */}
        <div
          onClick={() => currentEvent && onSelectEvent(currentEvent)}
          className={`p-4 rounded-xl border transition-all duration-150 cursor-pointer flex flex-col justify-between select-none ${
            currentEvent
              ? 'bg-[#171924] border-white/[0.12] hover:border-indigo-400/40 shadow-sm'
              : 'bg-[#0f1017] border-white/[0.04] text-zinc-600'
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs font-bold tracking-wider text-indigo-400 uppercase mb-1.5">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                ACTIVE NOW
              </span>
              {currentEvent && (
                <span className="text-zinc-400 font-mono text-xs font-medium">
                  {formatEventTime(currentEvent.startTime)}–{formatEventTime(currentEvent.endTime)}
                </span>
              )}
            </div>

            {currentEvent ? (
              <div className="font-bold text-zinc-100 text-base leading-snug line-clamp-1">
                {currentEvent.title}
              </div>
            ) : (
              <div className="text-sm text-zinc-500 italic py-1">
                No active activity (Free time)
              </div>
            )}
          </div>

          {currentEvent && (
            <div className="mt-3.5 space-y-1.5">
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${getProgressPercentage(currentEvent)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="truncate font-medium">{currentEvent.location ? currentEvent.location.split(',')[0] : 'In progress'}</span>
                <span className="flex items-center gap-0.5 text-indigo-400 font-semibold shrink-0 ml-1">
                  View <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          )}
        </div>

        {/* NEXT Block */}
        <div
          onClick={() => nextEvent && onSelectEvent(nextEvent)}
          className={`p-4 rounded-xl border transition-all duration-150 cursor-pointer flex flex-col justify-between select-none ${
            nextEvent
              ? 'bg-[#171924] border-white/[0.1] hover:border-white/[0.18] shadow-sm'
              : 'bg-[#0f1017] border-white/[0.04] text-zinc-600'
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs font-bold tracking-wider text-zinc-400 uppercase mb-1.5">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                NEXT STOP
              </span>
              {nextEvent && (
                <span className="text-zinc-400 font-mono text-xs font-medium">
                  {formatEventTime(nextEvent.startTime)}
                </span>
              )}
            </div>

            {nextEvent ? (
              <div className="font-bold text-zinc-100 text-base leading-snug line-clamp-1">
                {nextEvent.title}
              </div>
            ) : (
              <div className="text-sm text-zinc-500 italic py-1">
                Schedule complete for today
              </div>
            )}
          </div>

          {nextEvent && (
            <div className="mt-3.5 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-semibold text-xs border border-cyan-500/20">
                <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                {getLeaveText(minutesToNext)}
              </span>
              <span className="flex items-center gap-0.5 text-zinc-400 text-xs font-medium">
                Details <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
