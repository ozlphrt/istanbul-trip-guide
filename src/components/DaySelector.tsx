import React, { useMemo } from 'react';
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
  const activeIndex = useMemo(() => {
    const idx = TRIP_DATES.findIndex((d) => d.dateString === selectedDate);
    return idx >= 0 ? idx : 0;
  }, [selectedDate]);

  // Calculate day completion count
  const getDayStats = (dateStr: string) => {
    const dayEvents = allEvents.filter((e) => e.startTime.startsWith(dateStr));
    const doneCount = dayEvents.filter((e) => e.status === 'done').length;
    return { total: dayEvents.length, done: doneCount };
  };

  return (
    <div className="relative mb-5 select-none">
      {/* Day Selector Segmented Bar */}
      <div className="relative flex items-center justify-between p-1.5 bg-[#222734] rounded-2xl border border-slate-700/70 shadow-sm overflow-hidden">
        {/* Physical Sliding Highlight Pill */}
        <div
          className="absolute top-1.5 bottom-1.5 rounded-xl bg-[#2e3649] border border-slate-600/90 shadow-md ring-1 ring-indigo-400/50 will-change-transform pointer-events-none"
          style={{
            width: 'calc((100% - 12px) / 5)',
            left: '6px',
            transform: `translateX(${activeIndex * 100}%)`,
            transition: 'transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1)',
          }}
        />

        {/* 5 Day Selector Buttons */}
        {TRIP_DATES.map((day, idx) => {
          const isSelected = activeIndex === idx;
          const stats = getDayStats(day.dateString);
          const isAllDone = stats.total > 0 && stats.done === stats.total;

          return (
            <button
              key={day.dateString}
              onClick={() => onSelectDate(day.dateString)}
              className="relative z-10 flex-1 py-2.5 sm:py-3 px-1 rounded-xl flex flex-col items-center justify-center transition-colors duration-200 cursor-pointer bg-transparent"
            >
              {/* Day of Month */}
              <span
                className={`text-2xl sm:text-3xl font-black tracking-tight transition-colors duration-200 ${
                  isSelected ? 'text-indigo-300' : 'text-white/90 hover:text-white'
                }`}
              >
                {day.dayOfMonth}
              </span>

              {/* Day of Week */}
              <span
                className={`text-xs sm:text-sm uppercase tracking-wider font-black mt-0.5 transition-colors duration-200 ${
                  isSelected ? 'text-white' : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                {day.dayOfWeekShort}
              </span>

              {/* Micro Status Counter */}
              {stats.total > 0 && (
                <div className="mt-1 flex items-center gap-1">
                  {isAllDone ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  ) : stats.done > 0 ? (
                    <span className="text-xs text-indigo-300 font-black font-mono">
                      {stats.done}/{stats.total}
                    </span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
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
