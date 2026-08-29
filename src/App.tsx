import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { DaySelector } from './components/DaySelector';
import { TimelineGrid } from './components/TimelineGrid';
import { EventDetailSheet } from './components/EventDetailSheet';
import { SettingsModal } from './components/SettingsModal';
import {
  EventStatus,
  ItineraryEvent,
  SyncState
} from './types/calendar';
import {
  getOfflineCachedEvents,
  saveOfflineCachedEvents,
  setEventStatus,
  getStoredSelectedDay,
  setStoredSelectedDay,
  getStoredMockMode,
  setStoredMockMode,
  clearAllAppData
} from './services/storage';
import { fetchItineraryEvents, transformCalendarEvent } from './services/googleCalendar';
import { MOCK_GOOGLE_CALENDAR_EVENTS } from './services/mockData';
import { getCachedToken } from './services/auth';
import { TRIP_DATES } from './utils/time';

const CURRENT_DATASET_VERSION = 'ist26_v2026_08_29_v7_clean';
if (typeof window !== 'undefined') {
  try {
    if (localStorage.getItem('ist26_dataset_version') !== CURRENT_DATASET_VERSION) {
      localStorage.clear();
      localStorage.setItem('ist26_dataset_version', CURRENT_DATASET_VERSION);
    }
  } catch {
    // ignore
  }
}

const getInitialEvents = (): ItineraryEvent[] => {
  return MOCK_GOOGLE_CALENDAR_EVENTS
    .map(transformCalendarEvent)
    .filter((e): e is ItineraryEvent => e !== null);
};

export const App: React.FC = () => {
  const [events, setEvents] = useState<ItineraryEvent[]>(getInitialEvents);
  const [selectedDate, setSelectedDate] = useState<string>(() => getStoredSelectedDay());
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const [syncState, setSyncState] = useState<SyncState>({
    status: 'synced',
    lastSyncedAt: null,
    isMockMode: getStoredMockMode(),
  });

  // Touch Swipe Drag Tracking for Continuous Horizontal Carousel Track
  const [dragOffsetPx, setDragOffsetPx] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isHorizontalSwipe = useRef<boolean | null>(null);

  const activeDayIndex = useMemo(() => {
    const idx = TRIP_DATES.findIndex(d => d.dateString === selectedDate);
    return idx >= 0 ? idx : 0;
  }, [selectedDate]);

  // Load and Sync Events
  const loadEvents = useCallback(async (_forceRefresh = false) => {
    const isMock = getStoredMockMode();
    const token = getCachedToken();

    // If mock mode or no live Google OAuth token, load fresh code events
    if (isMock || !token) {
      const mockEvents = await fetchItineraryEvents(null, true);
      setEvents(mockEvents);
      setSyncState({
        status: 'synced',
        lastSyncedAt: new Date(),
        isMockMode: true,
      });
      return;
    }

    setSyncState(prev => ({ ...prev, status: 'syncing' }));

    try {
      const fetched = await fetchItineraryEvents(token, false);
      setEvents(fetched);
      setSyncState({
        status: 'synced',
        lastSyncedAt: new Date(),
        isMockMode: false,
      });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch calendar events';
      const cached = getOfflineCachedEvents();
      if (cached) {
        setEvents(cached.events);
        setSyncState({
          status: 'offline',
          lastSyncedAt: cached.lastSynced,
          isMockMode: getStoredMockMode(),
          errorMessage: errorMsg
        });
      } else {
        setSyncState({
          status: 'error',
          lastSyncedAt: null,
          isMockMode: getStoredMockMode(),
          errorMessage: errorMsg
        });
      }
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  // Handle Day Selection
  const handleSelectDay = (dateString: string) => {
    setSelectedDate(dateString);
    setStoredSelectedDay(dateString);
  };

  // Continuous Swipe Event Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isHorizontalSwipe.current = null;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;

    // Detect if the user is swiping horizontally
    if (isHorizontalSwipe.current === null) {
      if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
        isHorizontalSwipe.current = Math.abs(deltaX) > Math.abs(deltaY);
      }
    }

    if (isHorizontalSwipe.current) {
      // Add rubber-band resistance at track edges
      if ((activeDayIndex === 0 && deltaX > 0) || (activeDayIndex === TRIP_DATES.length - 1 && deltaX < 0)) {
        setDragOffsetPx(deltaX * 0.25);
      } else {
        setDragOffsetPx(deltaX);
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (touchStartX.current !== null && isHorizontalSwipe.current) {
      const threshold = 55; // px threshold to trigger page transition
      if (dragOffsetPx < -threshold && activeDayIndex < TRIP_DATES.length - 1) {
        handleSelectDay(TRIP_DATES[activeDayIndex + 1].dateString);
      } else if (dragOffsetPx > threshold && activeDayIndex > 0) {
        handleSelectDay(TRIP_DATES[activeDayIndex - 1].dateString);
      }
    }
    setDragOffsetPx(0);
    touchStartX.current = null;
    touchStartY.current = null;
    isHorizontalSwipe.current = null;
  };

  // Update Execution Status (Done / Skipped)
  const handleUpdateStatus = (eventId: string, status: EventStatus) => {
    setEventStatus(eventId, status);
    setEvents(prev => {
      const updated = prev.map(e => (e.id === eventId ? { ...e, status } : e));
      saveOfflineCachedEvents(updated);
      return updated;
    });
  };

  // Toggle Mock Mode
  const handleToggleMockMode = (enabled: boolean) => {
    setStoredMockMode(enabled);
    setSyncState(prev => ({ ...prev, isMockMode: enabled }));
    setTimeout(() => {
      loadEvents(true);
    }, 100);
  };

  // Helper to compute processed events for any given day
  const getProcessedDayEvents = useCallback((dateStr: string) => {
    return events.filter(e => e.startTime.startsWith(dateStr));
  }, [events]);

  const currentDisplayDayEvents = useMemo(() => {
    return getProcessedDayEvents(selectedDate);
  }, [getProcessedDayEvents, selectedDate]);

  // Currently selected event object
  const selectedEvent = useMemo(() => {
    if (!selectedEventId) return null;
    return currentDisplayDayEvents.find(e => e.id === selectedEventId) || events.find(e => e.id === selectedEventId) || null;
  }, [selectedEventId, currentDisplayDayEvents, events]);

  return (
    <div className="min-h-screen bg-[#1a1d26] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Minimalist Header: Istanbul & Dates */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-5 lg:p-6 pb-20">
        {/* Desktop 2-Column Split View / Mobile Single Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Timeline, Controls & Day Selector */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-4">
            {/* Day Selector (22 Tue to 26 Sat) */}
            <DaySelector
              selectedDate={selectedDate}
              onSelectDate={handleSelectDay}
              allEvents={events}
            />

            {/* Continuous Multi-Day Sliding Carousel Track (Physical Push/Slide) */}
            <div
              className="relative w-full overflow-hidden rounded-3xl"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex w-[500%] will-change-transform"
                style={{
                  transform: `translateX(calc(-${activeDayIndex * 20}% + ${dragOffsetPx}px))`,
                  transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1)',
                }}
              >
                {TRIP_DATES.map((day) => {
                  const dayEvents = getProcessedDayEvents(day.dateString);
                  return (
                    <div key={day.dateString} className="w-[20%] shrink-0 px-0.5 sm:px-1">
                      <TimelineGrid
                        events={dayEvents}
                        selectedEventId={selectedEventId}
                        onSelectEvent={(ev) => setSelectedEventId(ev.id)}
                        selectedDate={day.dateString}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Desktop Selected Event Details Panel */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-5 sticky top-20 h-[calc(100vh-6rem)]">
            <EventDetailSheet
              event={selectedEvent}
              onClose={() => setSelectedEventId(null)}
              onUpdateStatus={handleUpdateStatus}
              isDesktopSidebar={true}
            />
          </div>
        </div>
      </main>

      {/* Mobile Modal Bottom Sheet */}
      <EventDetailSheet
        event={selectedEvent}
        onClose={() => setSelectedEventId(null)}
        onUpdateStatus={handleUpdateStatus}
        isDesktopSidebar={false}
      />

      {/* Settings & Google OAuth Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isMockMode={syncState.isMockMode}
        onToggleMockMode={handleToggleMockMode}
        onForceSync={() => loadEvents(true)}
        cachedEventsCount={events.length}
        lastSyncedAt={syncState.lastSyncedAt}
        onClearCache={() => {
          clearAllAppData();
          loadEvents(true);
        }}
      />
    </div>
  );
};
