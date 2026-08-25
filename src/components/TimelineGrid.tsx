import React from 'react';
import { ItineraryEvent } from '../types/calendar';
import { EventCard } from './EventCard';
import {
  TIMELINE_START_HOUR,
  TIMELINE_END_HOUR,
  PIXELS_PER_MINUTE,
  TIMELINE_TOTAL_HEIGHT_PX,
  getIstanbulDate,
  getIstanbulDateString,
} from '../utils/time';

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
  // Generate hour slots: 08:00 to 24:00
  const hours = Array.from(
    { length: TIMELINE_END_HOUR - TIMELINE_START_HOUR + 1 },
    (_, i) => TIMELINE_START_HOUR + i
  );

  // Compute current time line if selectedDate is today
  const nowIstanbul = getIstanbulDate();
  const isToday = getIstanbulDateString(nowIstanbul) === selectedDate;
  const currentMinutesFromStart = isToday
    ? (nowIstanbul.getHours() * 60 + nowIstanbul.getMinutes()) - (TIMELINE_START_HOUR * 60)
    : -1;

  // Simple overlap column assignment for overlapping events
  const layoutEvents = React.useMemo(() => {
    if (events.length === 0) return [];

    const sorted = [...events].sort((a, b) => {
      const aStart = a.simulatedStartMinutes ?? a.startMinutesFromDayStart;
      const bStart = b.simulatedStartMinutes ?? b.startMinutesFromDayStart;
      return aStart - bStart;
    });

    // Group overlapping clusters
    const clusters: ItineraryEvent[][] = [];
    let currentCluster: ItineraryEvent[] = [];
    let clusterEnd = -1;

    sorted.forEach((ev) => {
      const start = ev.simulatedStartMinutes ?? ev.startMinutesFromDayStart;
      const end = start + ev.durationMinutes;

      if (start < clusterEnd) {
        currentCluster.push(ev);
        clusterEnd = Math.max(clusterEnd, end);
      } else {
        if (currentCluster.length > 0) {
          clusters.push(currentCluster);
        }
        currentCluster = [ev];
        clusterEnd = end;
      }
    });
    if (currentCluster.length > 0) {
      clusters.push(currentCluster);
    }

    // Assign width and left offset within clusters
    const placed: { event: ItineraryEvent; leftOffset: string; width: string }[] = [];

    clusters.forEach((cluster) => {
      const count = cluster.length;
      if (count === 1) {
        placed.push({ event: cluster[0], leftOffset: '0%', width: '100%' });
      } else {
        cluster.forEach((ev, idx) => {
          const colWidth = 100 / count;
          const left = idx * colWidth;
          placed.push({
            event: ev,
            leftOffset: `${left}%`,
            width: `${colWidth - 1}%`,
          });
        });
      }
    });

    return placed;
  }, [events]);

  return (
    <div className="relative bg-zinc-900/80 rounded-2xl border border-zinc-800 p-3 sm:p-5 shadow-elevated overflow-hidden select-none">
      {/* Container with fixed calculated height for exact minute-to-pixel ratio */}
      <div
        className="relative flex"
        style={{ height: `${TIMELINE_TOTAL_HEIGHT_PX}px` }}
      >
        {/* Left Time Axis (08:00 to 00:00) */}
        <div className="w-16 sm:w-20 shrink-0 relative border-r border-zinc-800 select-none">
          {hours.map((hour) => {
            const displayHour = hour === 24 ? '00:00' : `${String(hour).padStart(2, '0')}:00`;
            const topOffsetPx = (hour - TIMELINE_START_HOUR) * 60 * PIXELS_PER_MINUTE;

            return (
              <div
                key={hour}
                style={{ top: `${topOffsetPx}px` }}
                className="absolute right-3 -translate-y-1/2 text-sm sm:text-base font-mono text-zinc-200 font-extrabold tracking-tight"
              >
                {displayHour}
              </div>
            );
          })}
        </div>

        {/* Right Event Canvas with Hour Grid Lines */}
        <div className="flex-1 relative ml-2.5 sm:ml-4">
          {/* Horizontal Hour Lines & Half-Hour Lines */}
          {hours.map((hour) => {
            const topOffsetPx = (hour - TIMELINE_START_HOUR) * 60 * PIXELS_PER_MINUTE;
            const halfHourTopOffsetPx = topOffsetPx + 30 * PIXELS_PER_MINUTE;

            return (
              <React.Fragment key={`grid-${hour}`}>
                {/* Major Hour Line */}
                <div
                  style={{ top: `${topOffsetPx}px` }}
                  className="absolute inset-x-0 border-t border-zinc-800 pointer-events-none"
                />

                {/* Minor 30-min Dashed Line */}
                {hour < TIMELINE_END_HOUR && (
                  <div
                    style={{ top: `${halfHourTopOffsetPx}px` }}
                    className="absolute inset-x-0 border-t border-dashed border-zinc-850 pointer-events-none"
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
              <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50 -ml-1.5 animate-pulse" />
              <div className="flex-1 h-[2px] bg-indigo-500 shadow-sm" />
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
            <div className="absolute inset-0 flex items-center justify-center text-zinc-500 text-base font-medium italic">
              No events scheduled for this day
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
