import { format, parseISO, differenceInMinutes, addMinutes, isBefore, isAfter, isWithinInterval } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { ItineraryEvent, RunningLateMinutes } from '../types/calendar';

export const ISTANBUL_TZ = 'Europe/Istanbul';

export const TRIP_DATES = [
  { dateString: '2026-09-22', dayOfMonth: 22, dayOfWeekShort: 'Tue', dayOfWeekLong: 'Tuesday' },
  { dateString: '2026-09-23', dayOfMonth: 23, dayOfWeekShort: 'Wed', dayOfWeekLong: 'Wednesday' },
  { dateString: '2026-09-24', dayOfMonth: 24, dayOfWeekShort: 'Thu', dayOfWeekLong: 'Thursday' },
  { dateString: '2026-09-25', dayOfMonth: 25, dayOfWeekShort: 'Fri', dayOfWeekLong: 'Friday' },
  { dateString: '2026-09-26', dayOfMonth: 26, dayOfWeekShort: 'Sat', dayOfWeekLong: 'Saturday' },
];

export const TIMELINE_START_HOUR = 8; // 08:00
export const TIMELINE_END_HOUR = 24;  // 24:00 (00:00)
export const TOTAL_TIMELINE_HOURS = TIMELINE_END_HOUR - TIMELINE_START_HOUR; // 16 hours
export const PIXELS_PER_MINUTE = 2.25; // 135px per hour so every 20-30 min event has plenty of vertical space
export const TIMELINE_TOTAL_HEIGHT_PX = TOTAL_TIMELINE_HOURS * 60 * PIXELS_PER_MINUTE; // ~2160px

/**
 * Converts a date or ISO string to Istanbul timezone Date object
 */
export function getIstanbulDate(inputDate?: Date | string | number): Date {
  const d = inputDate ? (typeof inputDate === 'string' ? parseISO(inputDate) : new Date(inputDate)) : new Date();
  return toZonedTime(d, ISTANBUL_TZ);
}

/**
 * Format ISO time into HH:mm (e.g. 09:00, 11:45)
 */
export function formatEventTime(isoString: string): string {
  try {
    const d = parseISO(isoString);
    return format(d, 'HH:mm');
  } catch {
    return '--:--';
  }
}

/**
 * Format duration in minutes to human readable "2h 45m" or "50m"
 */
export function formatDuration(minutes: number): string {
  if (minutes < 0) return '0m';
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  }
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Calculate minutes from day's timeline start (08:00)
 */
export function getMinutesFromTimelineStart(isoString: string): number {
  try {
    const d = parseISO(isoString);
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    const startOfTimelineMinutes = TIMELINE_START_HOUR * 60; // 480
    return totalMinutes - startOfTimelineMinutes;
  } catch {
    return 0;
  }
}

/**
 * Get date string (YYYY-MM-DD) in Istanbul timezone
 */
export function getIstanbulDateString(d: Date = new Date()): string {
  const zoned = toZonedTime(d, ISTANBUL_TZ);
  return format(zoned, 'yyyy-MM-dd');
}

/**
 * Calculate Now & Next events based on reference time
 */
export function calculateNowAndNext(events: ItineraryEvent[], now: Date) {
  if (!events || events.length === 0) {
    return { currentEvent: null, nextEvent: null, minutesToNext: null };
  }

  // Sort events by start time
  const sorted = [...events].sort((a, b) => 
    new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

  let currentEvent: ItineraryEvent | null = null;
  let nextEvent: ItineraryEvent | null = null;

  for (let i = 0; i < sorted.length; i++) {
    const ev = sorted[i];
    const start = parseISO(ev.startTime);
    const end = parseISO(ev.endTime);

    if (isWithinInterval(now, { start, end })) {
      currentEvent = ev;
      // Next is the subsequent event
      if (i + 1 < sorted.length) {
        nextEvent = sorted[i + 1];
      }
      break;
    } else if (isBefore(now, start)) {
      // First event in the future
      if (!nextEvent) {
        nextEvent = ev;
      }
    }
  }

  let minutesToNext: number | null = null;
  if (nextEvent) {
    const nextStart = parseISO(nextEvent.startTime);
    minutesToNext = differenceInMinutes(nextStart, now);
  }

  return { currentEvent, nextEvent, minutesToNext };
}

/**
 * Apply "Running Late" simulation to events
 * Flexible events shift forward by shiftMinutes; Fixed events remain locked at their exact slots.
 * Flags collisions when a shifted flexible event collides with a fixed event.
 */
export function applyRunningLateSimulation(
  events: ItineraryEvent[],
  shiftMinutes: RunningLateMinutes
): ItineraryEvent[] {
  if (shiftMinutes === 0) {
    return events.map(e => ({
      ...e,
      simulatedStartTime: undefined,
      simulatedEndTime: undefined,
      simulatedStartMinutes: undefined,
      isSimulatedShifted: false,
      hasCollisionWithFixed: false,
    }));
  }

  // Create working copy sorted by original start time
  const sorted = [...events].sort((a, b) =>
    new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

  return sorted.map((ev, index) => {
    if (ev.isFixed) {
      // Fixed event never shifts
      return {
        ...ev,
        simulatedStartTime: ev.startTime,
        simulatedEndTime: ev.endTime,
        simulatedStartMinutes: getMinutesFromTimelineStart(ev.startTime),
        isSimulatedShifted: false,
        hasCollisionWithFixed: false,
      };
    }

    // Flexible event: shift start and end
    const origStart = parseISO(ev.startTime);
    const origEnd = parseISO(ev.endTime);
    const shiftedStart = addMinutes(origStart, shiftMinutes);
    const shiftedEnd = addMinutes(origEnd, shiftMinutes);
    const shiftedStartIso = shiftedStart.toISOString();
    const shiftedEndIso = shiftedEnd.toISOString();
    const shiftedMinutesFromStart = getMinutesFromTimelineStart(shiftedStartIso);

    // Check collision against any upcoming fixed events
    let hasCollision = false;
    for (let j = index + 1; j < sorted.length; j++) {
      const other = sorted[j];
      if (other.isFixed) {
        const fixedStart = parseISO(other.startTime);
        // If shifted end is later than the fixed start, collision!
        if (isAfter(shiftedEnd, fixedStart)) {
          hasCollision = true;
          break;
        }
      }
    }

    return {
      ...ev,
      simulatedStartTime: shiftedStartIso,
      simulatedEndTime: shiftedEndIso,
      simulatedStartMinutes: shiftedMinutesFromStart,
      isSimulatedShifted: true,
      hasCollisionWithFixed: hasCollision,
    };
  });
}
