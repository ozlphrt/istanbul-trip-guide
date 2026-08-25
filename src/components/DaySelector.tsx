import React, { useRef } from 'react';
import { TRIP_DATES } from '../utils/time';
import { ItineraryEvent } from '../types/calendar';

interface DaySelectorProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (dateString: string) => void;
  allEvents: ItineraryEvent[];
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  selectedDate,
  onSelectDate,
  allEvents,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate day completion count
  const getDayStats = (dateStr: string) => {
    const dayEvents = allEvents.filter(e => e.startTime.startsWith(dateStr));
    const doneCount = dayEvents.filter(e => e.status === 'done').length;
    return { total: dayEvents.length, done: doneCount };
  };

  return (
    <div className="relative mb-5">
      {/* Day Selector Segmented Bar */}
      <div 
        ref={containerRef}
        className="flex items-center justify-between gap-1.5 p-1.5 bg-[#222734] rounded-2xl border border-slate-700/60 shadow-sm overflow-x-auto no-scrollbar"
      >
        {TRIP_DATES.map((day) => {
          const isSelected = selectedDate === day.dateString;
          const stats = getDayStats(day.dateString);
          const isAllDone = stats.total > 0 && stats.done === stats.total;

          return (
            <button
              key={day.dateString}
              onClick={() => onSelectDate(day.dateString)}
              className={`flex-1 min-w-[62px] py-2.5 sm:py-3 px-2 rounded-xl flex flex-col items-center justify-center transition-all duration-150 relative select-none ${
                isSelected
                  ? 'bg-[#2e3649] text-white shadow-md border border-slate-600/80 ring-1 ring-indigo-400/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#282e3e]'
              }`}
            >
              {/* Day of Month */}
              <span className={`text-xl sm:text-2xl font-black tracking-tight ${isSelected ? 'text-indigo-300' : 'text-slate-200'}`}>
                {day.dayOfMonth}
              </span>

              {/* Day of Week */}
              <span className={`text-[11px] uppercase tracking-wider font-extrabold mt-0.5 ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                {day.dayOfWeekShort}
              </span>

              {/* Micro Status Counter */}
              {stats.total > 0 && (
                <div className="mt-1 flex items-center gap-1">
                  {isAllDone ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  ) : stats.done > 0 ? (
                    <span className="text-[11px] text-indigo-300 font-bold font-mono">
                      {stats.done}/{stats.total}
                    </span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
