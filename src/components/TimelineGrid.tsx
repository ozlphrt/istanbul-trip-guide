import React, { useMemo } from 'react';
import { ItineraryEvent } from '../types/calendar';
import {
  TIMELINE_START_HOUR,
  TIMELINE_END_HOUR,
  PIXELS_PER_MINUTE,
  TIMELINE_TOTAL_HEIGHT_PX,
  getIstanbulDate
} from '../utils/time';
import { EventCard } from './EventCard';

interface TimelineGridProps {
  events: ItineraryEvent[];
  selectedEventId: string | null;
  onSelectEvent: (event: ItineraryEvent) => void;
  selectedDate: string; // YYYY-MM-DD
}

export const TimelineGrid: React.FC<TimelineGridProps> = ({
  events,
  selectedEventId,
  onSelectEvent,
  selectedDate,
}) => {
  // Generate list of timeline hours (08:00 to 24:00)
  const hours = useMemo(() => {
    const arr: number[] = [];
    for (let h = TIMELINE_START_HOUR; h <= TIMELINE_END_HOUR; h++) {
      arr.push(h);
    }
    return arr;
  }, []);

  // Compute current time position for the "Now" line if viewing today
  const istanbulNow = getIstanbulDate();
  const todayStr = `${istanbulNow.getFullYear()}-${String(istanbulNow.getMonth() + 1).padStart(2, '0')}-${String(istanbulNow.getDate()).padStart(2, '0')}`;
  const isToday = selectedDate === todayStr;

  const currentMinutesFromStart = (istanbulNow.getHours() * 60 + istanbulNow.getMinutes()) - (TIMELINE_START_HOUR * 60);

  // Compute side-by-side collision layout for overlapping events
  const layoutEvents = useMemo(() => {
    const sorted = [...events].sort((a, b) => {
      const aStart = a.simulatedStartMinutes !== undefined ? a.simulatedStartMinutes : a.startMinutesFromDayStart;
      const bStart = b.simulatedStartMinutes !== undefined ? b.simulatedStartMinutes : b.startMinutesFromDayStart;
      return aStart - bStart;
    });

    const columns: Array<Array<{ event: ItineraryEvent; end: number }>> = [];

    return sorted.map((event) => {
      const start = event.simulatedStartMinutes !== undefined ? event.simulatedStartMinutes : event.startMinutesFromDayStart;
      const end = start + event.durationMinutes;

      let placedCol = -1;
      for (let i = 0; i < columns.length; i++) {
        const lastInCol = columns[i][columns[i].length - 1];
        if (lastInCol.end <= start) {
          columns[i].push({ event, end });
          placedCol = i;
          break;
        }
      }

      if (placedCol === -1) {
        placedCol = columns.length;
        columns.push([{ event, end }]);
      }

      const overlappingCols = columns.filter(col =>
        col.some(item => {
          const itemStart = item.event.simulatedStartMinutes !== undefined ? item.event.simulatedStartMinutes : item.event.startMinutesFromDayStart;
          const itemEnd = itemStart + item.event.durationMinutes;
          return (start < itemEnd && end > itemStart);
        })
      ).length;

      const totalCols = Math.max(overlappingCols, 1);
      const width = `${100 / totalCols}%`;
      const leftOffset = `${(placedCol / totalCols) * 100}%`;

      return {
        event,
        leftOffset,
        width,
      };
    });
  }, [events]);

  return (
    <div className="bg-[#1f2431] rounded-2xl sm:rounded-3xl border border-slate-700/70 shadow-inner p-2 sm:p-3.5 mb-8 select-none">
      {/* Scrollable Timeline Canvas */}
      <div
        className="relative flex"
        style={{ height: `${TIMELINE_TOTAL_HEIGHT_PX}px` }}
      >
        {/* Left Time Axis (08 to 00) — Dense Architectural Ruler Style with Big 2-Digit Hours */}
        <div className="w-10 sm:w-11 shrink-0 relative border-r border-slate-700/80 select-none">
          {hours.map((hour) => {
            const displayHour = hour === 24 ? '00' : String(hour).padStart(2, '0');
            const hourStartPx = (hour - TIMELINE_START_HOUR) * 60 * PIXELS_PER_MINUTE;

            // Generate 10-minute graduated ticks (:00, :10, :20, :30, :40, :50)
            const tickMinutes = [0, 10, 20, 30, 40, 50];

            return (
              <React.Fragment key={`axis-${hour}`}>
                {/* Dense Graduated Ruler Ticks */}
                {hour < TIMELINE_END_HOUR ? (
                  tickMinutes.map((m) => {
                    const tickTopPx = hourStartPx + m * PIXELS_PER_MINUTE;
                    const isMajor = m === 0;
                    const isHalf = m === 30;

                    return (
                      <div
                        key={`tick-${hour}-${m}`}
                        style={{ top: `${tickTopPx}px` }}
                        className={`absolute right-0 pointer-events-none ${
                          isMajor
                            ? 'w-2.5 sm:w-3.5 h-[2px] bg-slate-300'
                            : isHalf
                            ? 'w-2 sm:w-2.5 h-[1.5px] bg-slate-400'
                            : 'w-1.5 h-[1px] bg-slate-600/80'
                        }`}
                      />
                    );
                  })
                ) : (
                  <div
                    style={{ top: `${hourStartPx}px` }}
                    className="absolute right-0 w-2.5 sm:w-3.5 h-[2px] bg-slate-300 pointer-events-none"
                  />
                )}

                {/* Big 2-Digit Hour Numeral (09, 10, 11, 16) */}
                <div
                  style={{ top: `${hourStartPx}px` }}
                  className="absolute right-2 sm:right-2.5 -translate-y-1/2 text-sm sm:text-base md:text-lg font-mono text-white font-black tracking-tight select-none pointer-events-none"
                >
                  {displayHour}
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Right Event Canvas with 15-Minute Grid Lines */}
        <div className="flex-1 relative ml-1.5 sm:ml-2">
          {/* Horizontal 15-Minute Grid Lines */}
          {hours.map((hour) => {
            const topOffsetPx = (hour - TIMELINE_START_HOUR) * 60 * PIXELS_PER_MINUTE;
            const top15Px = topOffsetPx + 15 * PIXELS_PER_MINUTE;
            const top30Px = topOffsetPx + 30 * PIXELS_PER_MINUTE;
            const top45Px = topOffsetPx + 45 * PIXELS_PER_MINUTE;

            return (
              <React.Fragment key={`grid-${hour}`}>
                {/* Major Hour Solid Line (:00) */}
                <div
                  style={{ top: `${topOffsetPx}px` }}
                  className="absolute inset-x-0 border-t border-slate-700/80 pointer-events-none"
                />

                {hour < TIMELINE_END_HOUR && (
                  <>
                    {/* 15-Minute Dotted Line (:15) */}
                    <div
                      style={{ top: `${top15Px}px` }}
                      className="absolute inset-x-0 border-t border-dotted border-slate-700/40 pointer-events-none"
                    />

                    {/* 30-Minute Dashed Line (:30) */}
                    <div
                      style={{ top: `${top30Px}px` }}
                      className="absolute inset-x-0 border-t border-dashed border-slate-700/60 pointer-events-none"
                    />

                    {/* 45-Minute Dotted Line (:45) */}
                    <div
                      style={{ top: `${top45Px}px` }}
                      className="absolute inset-x-0 border-t border-dotted border-slate-700/40 pointer-events-none"
                    />
                  </>
                )}
              </React.Fragment>
            );
          })}

          {/* Current Time Indicator Line */}
          {isToday && currentMinutesFromStart >= 0 && currentMinutesFromStart <= (TIMELINE_TOTAL_HEIGHT_PX / PIXELS_PER_MINUTE) && (
            <div
              style={{ top: `${currentMinutesFromStart * PIXELS_PER_MINUTE}px` }}
              className="absolute inset-x-0 z-20 flex items-center pointer-events-none"
            >
              <div className="w-3.5 h-3.5 rounded-full bg-indigo-400 shadow-md -ml-1.5 ring-2 ring-indigo-300/40" />
              <div className="flex-1 h-[2px] bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
            </div>
          )}

          {/* Render Proportional Event Blocks */}
          {layoutEvents.map(({ event, leftOffset, width }) => (
            <EventCard
              key={event.id}
              event={event}
              isSelected={selectedEventId === event.id}
              onSelect={onSelectEvent}
              leftOffset={leftOffset}
              width={width}
            />
          ))}

          {/* Empty state hint if no events on this day */}
          {events.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-base font-medium italic">
              No events scheduled for this day
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
