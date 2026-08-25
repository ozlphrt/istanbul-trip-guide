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
        className="flex items-center justify-between gap-1.5 p-1.5 bg-[#12141c] rounded-2xl border border-white/[0.07] shadow-subtle overflow-x-auto no-scrollbar"
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
                  ? 'bg-[#1e2230] text-white border border-white/[0.14] shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
              }`}
            >
              {/* Day of Month */}
              <span className={`text-xl sm:text-2xl font-bold tracking-tight ${isSelected ? 'text-indigo-200' : 'text-zinc-200'}`}>
                {day.dayOfMonth}
              </span>

              {/* Day of Week */}
              <span className={`text-[11px] uppercase tracking-wider font-semibold mt-0.5 ${isSelected ? 'text-indigo-300' : 'text-zinc-500'}`}>
                {day.dayOfWeekShort}
              </span>

              {/* Micro Status Counter */}
              {stats.total > 0 && (
                <div className="mt-1 flex items-center gap-1">
                  {isAllDone ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  ) : stats.done > 0 ? (
                    <span className="text-[11px] text-indigo-300 font-semibold font-mono">
                      {stats.done}/{stats.total}
                    </span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
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
