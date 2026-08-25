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

  // Compute current time position for the "Now" red/indigo line if viewing today
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

      // Find first column where this event does not overlap
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

      // Check how many concurrent events overlap with this one
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
    <div className="bg-[#0b0d16]/80 backdrop-blur-xl rounded-3xl border border-white/[0.08] shadow-elevated p-4 sm:p-6 mb-8 select-none">
      {/* Scrollable Timeline Canvas */}
      <div
        className="relative flex"
        style={{ height: `${TIMELINE_TOTAL_HEIGHT_PX}px` }}
      >
        {/* Left Time Axis (08:00 to 00:00) */}
        <div className="w-16 sm:w-20 shrink-0 relative border-r border-white/[0.08] select-none">
          {hours.map((hour) => {
            const displayHour = hour === 24 ? '00:00' : `${String(hour).padStart(2, '0')}:00`;
            const topOffsetPx = (hour - TIMELINE_START_HOUR) * 60 * PIXELS_PER_MINUTE;

            return (
              <div
                key={hour}
                style={{ top: `${topOffsetPx}px` }}
                className="absolute right-3 -translate-y-1/2 text-sm sm:text-base font-mono text-zinc-300 font-black tracking-tight"
              >
                {displayHour}
              </div>
            );
          })}
        </div>

        {/* Right Event Canvas with Hour Grid Lines */}
        <div className="flex-1 relative ml-3 sm:ml-5">
          {/* Horizontal Hour Lines & Half-Hour Lines */}
          {hours.map((hour) => {
            const topOffsetPx = (hour - TIMELINE_START_HOUR) * 60 * PIXELS_PER_MINUTE;
            const halfHourTopOffsetPx = topOffsetPx + 30 * PIXELS_PER_MINUTE;

            return (
              <React.Fragment key={`grid-${hour}`}>
                {/* Major Hour Line */}
                <div
                  style={{ top: `${topOffsetPx}px` }}
                  className="absolute inset-x-0 border-t border-white/[0.07] pointer-events-none"
                />

                {/* Minor 30-min Dashed Line */}
                {hour < TIMELINE_END_HOUR && (
                  <div
                    style={{ top: `${halfHourTopOffsetPx}px` }}
                    className="absolute inset-x-0 border-t border-dashed border-white/[0.03] pointer-events-none"
                  />
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
              <div className="w-3.5 h-3.5 rounded-full bg-indigo-400 shadow-lg shadow-indigo-400/80 -ml-1.5 animate-pulse ring-2 ring-indigo-300/40" />
              <div className="flex-1 h-[2px] bg-gradient-to-r from-indigo-400 to-transparent shadow-sm shadow-indigo-500/50" />
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
            <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-base font-medium italic">
              No events scheduled for this day
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
