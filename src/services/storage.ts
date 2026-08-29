import { EventStatus, ItineraryEvent } from '../types/calendar';

const STORAGE_KEYS = {
  VERSION: 'ist26_schema_version_v5',
  DONE_EVENTS: 'ist26_done_events_v5',
  SKIPPED_EVENTS: 'ist26_skipped_events_v5',
  OFFLINE_EVENTS_CACHE: 'ist26_offline_events_v5',
  LAST_SYNC_TIME: 'ist26_last_sync_time_v5',
  MOCK_MODE_ENABLED: 'ist26_mock_mode_enabled_v5',
  GOOGLE_CLIENT_ID: 'ist26_google_client_id_v5',
  SELECTED_DAY: 'ist26_selected_day_v5',
  SIMULATED_TIME_PREVIEW: 'ist26_simulated_time_preview_v5',
};

const CURRENT_SCHEMA_VERSION = '5.0.0';

// Clear legacy/stale data on schema version bump
(function migrateStorage() {
  try {
    const version = localStorage.getItem(STORAGE_KEYS.VERSION);
    if (version !== CURRENT_SCHEMA_VERSION) {
      console.log(`[Storage] Upgrading schema from ${version} to ${CURRENT_SCHEMA_VERSION}. Purging stale cache.`);
      // Clear all legacy offline event caches
      const keysToRemove = [
        'ist26_offline_events_v1',
        'ist26_offline_events_v2',
        'ist26_offline_events_v3',
        'ist26_offline_events_v4',
        STORAGE_KEYS.OFFLINE_EVENTS_CACHE,
        STORAGE_KEYS.LAST_SYNC_TIME
      ];
      keysToRemove.forEach(k => localStorage.removeItem(k));
      localStorage.setItem(STORAGE_KEYS.VERSION, CURRENT_SCHEMA_VERSION);
    }
  } catch {
    // ignore
  }
})();

export function clearAllAppData(): void {
  try {
    localStorage.clear();
    localStorage.setItem(STORAGE_KEYS.VERSION, CURRENT_SCHEMA_VERSION);
  } catch (err) {
    console.error('Failed to clear local storage', err);
  }
}

// Event execution states (Done / Skipped)
export function getStoredEventStatuses(): Record<string, EventStatus> {
  try {
    const doneIds: string[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.DONE_EVENTS) || '[]');
    const skippedIds: string[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.SKIPPED_EVENTS) || '[]');
    const result: Record<string, EventStatus> = {};
    doneIds.forEach(id => { result[id] = 'done'; });
    skippedIds.forEach(id => { result[id] = 'skipped'; });
    return result;
  } catch {
    return {};
  }
}

export function setEventStatus(eventId: string, status: EventStatus) {
  try {
    const doneIds = new Set<string>(JSON.parse(localStorage.getItem(STORAGE_KEYS.DONE_EVENTS) || '[]'));
    const skippedIds = new Set<string>(JSON.parse(localStorage.getItem(STORAGE_KEYS.SKIPPED_EVENTS) || '[]'));

    doneIds.delete(eventId);
    skippedIds.delete(eventId);

    if (status === 'done') {
      doneIds.add(eventId);
    } else if (status === 'skipped') {
      skippedIds.add(eventId);
    }

    localStorage.setItem(STORAGE_KEYS.DONE_EVENTS, JSON.stringify(Array.from(doneIds)));
    localStorage.setItem(STORAGE_KEYS.SKIPPED_EVENTS, JSON.stringify(Array.from(skippedIds)));
  } catch (err) {
    console.error('Failed to save event status to localStorage', err);
  }
}

// Offline Cached Events
export function getOfflineCachedEvents(): { events: ItineraryEvent[]; lastSynced: Date | null } | null {
  try {
    const rawEvents = localStorage.getItem(STORAGE_KEYS.OFFLINE_EVENTS_CACHE);
    const rawSync = localStorage.getItem(STORAGE_KEYS.LAST_SYNC_TIME);
    if (!rawEvents) return null;

    return {
      events: JSON.parse(rawEvents),
      lastSynced: rawSync ? new Date(rawSync) : null
    };
  } catch (err) {
    console.error('Failed to load offline cache', err);
    return null;
  }
}

export function saveOfflineCachedEvents(events: ItineraryEvent[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.OFFLINE_EVENTS_CACHE, JSON.stringify(events));
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC_TIME, new Date().toISOString());
  } catch (err) {
    console.error('Failed to save offline cache', err);
  }
}

// Mock Mode settings
export function getStoredMockMode(): boolean {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.MOCK_MODE_ENABLED);
    return val === null ? true : val === 'true';
  } catch {
    return true;
  }
}

export function setStoredMockMode(enabled: boolean) {
  try {
    localStorage.setItem(STORAGE_KEYS.MOCK_MODE_ENABLED, String(enabled));
  } catch (err) {
    console.error('Failed to set mock mode', err);
  }
}

// Google Client ID
export function getStoredGoogleClientId(): string {
  try {
    return localStorage.getItem(STORAGE_KEYS.GOOGLE_CLIENT_ID) || 
      (import.meta.env.VITE_GOOGLE_CLIENT_ID as string) || '';
  } catch {
    return '';
  }
}

export function setStoredGoogleClientId(clientId: string) {
  try {
    localStorage.setItem(STORAGE_KEYS.GOOGLE_CLIENT_ID, clientId.trim());
  } catch (err) {
    console.error('Failed to set Google client ID', err);
  }
}

// Stored selected day
export function getStoredSelectedDay(): string {
  try {
    return localStorage.getItem(STORAGE_KEYS.SELECTED_DAY) || '2026-09-22';
  } catch {
    return '2026-09-22';
  }
}

export function setStoredSelectedDay(dateString: string) {
  try {
    localStorage.setItem(STORAGE_KEYS.SELECTED_DAY, dateString);
  } catch (err) {
    console.error('Failed to set selected day', err);
  }
}
