export type EventType =
  | 'visit'
  | 'food'
  | 'drink'
  | 'walk'
  | 'transport'
  | 'concert'
  | 'rest'
  | 'optional';

export type EventStatus = 'pending' | 'done' | 'skipped';

export interface EventLink {
  label: string;
  url: string;
  type?: 'web' | 'ig' | 'fb' | 'x' | 'other';
}

export interface CalendarEventMetadata {
  type: EventType;
  fixed: boolean;
  what?: string;
  why?: string;
  durationNote?: string;
  facts?: string[];
  food?: string;
  reservation?: string;
  ticket?: string;
  notes?: string;
  links?: EventLink[];
}

export interface ItineraryEvent {
  id: string;
  calendarEventId: string;
  title: string;
  rawSummary: string;
  startTime: string; // ISO String (Europe/Istanbul)
  endTime: string;   // ISO String (Europe/Istanbul)
  startMinutesFromDayStart: number; // Minutes from 00:00 or from 08:00
  durationMinutes: number;
  location?: string;
  mapsUrl?: string;
  
  // Parsed structured metadata
  type: EventType;
  isFixed: boolean;
  what?: string;
  why?: string;
  durationNote?: string;
  facts: string[];
  food?: string;
  reservation?: string;
  ticket?: string;
  notes?: string;
  links: EventLink[];
  rawDescription?: string;

  // Local execution state
  status: EventStatus;

  // Running late simulation fields
  simulatedStartTime?: string;
  simulatedEndTime?: string;
  simulatedStartMinutes?: number;
  isSimulatedShifted?: boolean;
  hasCollisionWithFixed?: boolean;
}

export interface DaySchedule {
  dateString: string; // YYYY-MM-DD (e.g. "2026-09-22")
  dayOfMonth: number; // 22, 23, 24, 25, 26
  dayOfWeekShort: string; // Tue, Wed, Thu, Fri, Sat
  dayOfWeekLong: string; // Tuesday, Wednesday...
  events: ItineraryEvent[];
  completedCount: number;
  totalCount: number;
}

export type RunningLateMinutes = 0 | 15 | 30 | 45 | 60;

export type SyncStatus = 'synced' | 'syncing' | 'offline' | 'mock' | 'error';

export interface SyncState {
  status: SyncStatus;
  lastSyncedAt: Date | null;
  errorMessage?: string;
  isMockMode: boolean;
}

export interface GoogleCalendarApiEvent {
  id: string;
  summary?: string;
  description?: string;
  location?: string;
  start?: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  end?: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  status?: string;
}
