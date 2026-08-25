import { GoogleCalendarApiEvent, ItineraryEvent } from '../types/calendar';
import { parseEventDescription } from '../utils/descriptionParser';
import { getMinutesFromTimelineStart } from '../utils/time';
import { differenceInMinutes, parseISO } from 'date-fns';
import { MOCK_GOOGLE_CALENDAR_EVENTS } from './mockData';
import { getStoredEventStatuses, saveOfflineCachedEvents } from './storage';

const PREFIX = '[IST26]';

/**
 * Transforms raw Google Calendar API event into our structured ItineraryEvent
 */
export function transformCalendarEvent(raw: GoogleCalendarApiEvent): ItineraryEvent | null {
  const summary = (raw.summary || '').trim();
  if (!summary.toUpperCase().startsWith(PREFIX.toUpperCase())) {
    return null;
  }

  // Clean title by stripping [IST26]
  const cleanTitle = summary.substring(PREFIX.length).trim();

  // Date range extraction
  const startIso = raw.start?.dateTime || raw.start?.date || '';
  const endIso = raw.end?.dateTime || raw.end?.date || '';

  if (!startIso || !endIso) {
    return null;
  }

  let durationMinutes = 60;
  try {
    const s = parseISO(startIso);
    const e = parseISO(endIso);
    durationMinutes = Math.max(15, differenceInMinutes(e, s));
  } catch {
    durationMinutes = 60;
  }

  const startMinutesFromTimeline = getMinutesFromTimelineStart(startIso);
  const metadata = parseEventDescription(raw.description || '', cleanTitle);
  const localStatuses = getStoredEventStatuses();
  const status = localStatuses[raw.id] || 'pending';

  const location = (raw.location || '').trim();
  const mapsUrl = location
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
    : undefined;

  return {
    id: raw.id,
    calendarEventId: raw.id,
    title: cleanTitle,
    rawSummary: summary,
    startTime: startIso,
    endTime: endIso,
    startMinutesFromDayStart: startMinutesFromTimeline,
    durationMinutes,
    location: location || undefined,
    mapsUrl,
    type: metadata.type,
    isFixed: metadata.fixed,
    why: metadata.why,
    what: metadata.what,
    durationNote: metadata.durationNote,
    facts: metadata.facts || [],
    food: metadata.food,
    do: metadata.do,
    avoid: metadata.avoid,
    lookFor: metadata.lookFor,
    reservation: metadata.reservation,
    ticket: metadata.ticket,
    notes: metadata.notes,
    links: metadata.links || [],
    rawDescription: raw.description,
    status
  };
}

/**
 * Fetches events either from live Google Calendar API or from Mock Dataset
 */
export async function fetchItineraryEvents(
  accessToken?: string | null,
  isMockMode: boolean = false
): Promise<ItineraryEvent[]> {
  if (isMockMode || !accessToken) {
    // Process mock data
    const events = MOCK_GOOGLE_CALENDAR_EVENTS
      .map(transformCalendarEvent)
      .filter((e): e is ItineraryEvent => e !== null);

    saveOfflineCachedEvents(events);
    return events;
  }

  // Google Calendar REST API v3
  // 22 Sep 2026 00:00 UTC to 27 Sep 2026 00:00 UTC
  const timeMin = '2026-09-21T21:00:00Z'; // 22 Sep 00:00 Istanbul (UTC+3)
  const timeMax = '2026-09-26T21:00:00Z'; // 27 Sep 00:00 Istanbul (UTC+3)
  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime&maxResults=250`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Google Calendar API error (${response.status})`);
  }

  const data = await response.json();
  const rawItems: GoogleCalendarApiEvent[] = data.items || [];

  const parsedEvents = rawItems
    .map(transformCalendarEvent)
    .filter((e): e is ItineraryEvent => e !== null);

  // Cache to localStorage for full offline support
  saveOfflineCachedEvents(parsedEvents);

  return parsedEvents;
}
