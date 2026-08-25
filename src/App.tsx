import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { NowNextWidget } from './components/NowNextWidget';
import { DaySelector } from './components/DaySelector';
import { Toolbar } from './components/Toolbar';
import { TimelineGrid } from './components/TimelineGrid';
import { EventDetailSheet } from './components/EventDetailSheet';
import { SettingsModal } from './components/SettingsModal';
import {
  EventStatus,
  ItineraryEvent,
  RunningLateMinutes,
  SyncState
} from './types/calendar';
import { fetchItineraryEvents } from './services/googleCalendar';
import { getCachedToken } from './services/auth';
import {
  getOfflineCachedEvents,
  getStoredMockMode,
  getStoredSelectedDay,
  setStoredMockMode,
  setStoredSelectedDay,
  setEventStatus as persistEventStatus,
  saveOfflineCachedEvents
} from './services/storage';
import { applyRunningLateSimulation, TRIP_DATES } from './utils/time';

export const App: React.FC = () => {
  // Application State
  const [events, setEvents] = useState<ItineraryEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(() => getStoredSelectedDay());
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [runningLateShift, setRunningLateShift] = useState<RunningLateMinutes>(0);
  const [isSimplified, setIsSimplified] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const [syncState, setSyncState] = useState<SyncState>({
    status: 'synced',
    lastSyncedAt: null,
    isMockMode: getStoredMockMode()
  });

  // Load Itinerary Data (from cache first, then sync)
  const loadEvents = useCallback(async (forceRefresh = false) => {
    setSyncState(prev => ({ ...prev, status: 'syncing', errorMessage: undefined }));

    try {
      const isMock = getStoredMockMode();
      const token = getCachedToken();

      // Check if we have valid offline cache (for live mode)
      if (!forceRefresh && !isMock) {
        const cached = getOfflineCachedEvents();
        if (cached && cached.events.length > 0) {
          setEvents(cached.events);
          setSyncState({
            status: 'synced',
            lastSyncedAt: cached.lastSynced,
            isMockMode: false
          });
          return;
        }
      }

      const fetchedEvents = await fetchItineraryEvents(token, isMock);
      setEvents(fetchedEvents);
      setSyncState({
        status: isMock ? 'mock' : 'synced',
        lastSyncedAt: new Date(),
        isMockMode: isMock
      });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Sync failed';
      console.warn('Sync notice:', errorMsg);

      // Fallback to offline cache
      const cached = getOfflineCachedEvents();
      if (cached && cached.events.length > 0) {
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

  // Touch Swipe for Day Navigation
  const touchStartX = React.useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const threshold = 65; // px

    if (Math.abs(diffX) > threshold) {
      const currentIndex = TRIP_DATES.findIndex(d => d.dateString === selectedDate);
      if (diffX > 0 && currentIndex < TRIP_DATES.length - 1) {
        // Swipe left -> next day
        handleSelectDay(TRIP_DATES[currentIndex + 1].dateString);
      } else if (diffX < 0 && currentIndex > 0) {
        // Swipe right -> previous day
        handleSelectDay(TRIP_DATES[currentIndex - 1].dateString);
      }
    }
    touchStartX.current = null;
  };

  // Update Execution Status (Done / Skipped)
  const handleUpdateStatus = (eventId: string, status: EventStatus) => {
    persistEventStatus(eventId, status);
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

  // Filter events for the currently selected day
  const rawDayEvents = useMemo(() => {
    return events.filter(e => e.startTime.startsWith(selectedDate));
  }, [events, selectedDate]);

  // Optional events count for today
  const optionalCount = useMemo(() => {
    return rawDayEvents.filter(e => e.type === 'optional').length;
  }, [rawDayEvents]);

  // Apply "Simplify Today" filter if active
  const filteredDayEvents = useMemo(() => {
    if (isSimplified) {
      return rawDayEvents.filter(e => e.type !== 'optional');
    }
    return rawDayEvents;
  }, [rawDayEvents, isSimplified]);

  // Apply "Running Late" Simulation
  const displayDayEvents = useMemo(() => {
    return applyRunningLateSimulation(filteredDayEvents, runningLateShift);
  }, [filteredDayEvents, runningLateShift]);

  // Stats
  const completedCount = useMemo(() => {
    return rawDayEvents.filter(e => e.status === 'done').length;
  }, [rawDayEvents]);

  // Currently selected event object
  const selectedEvent = useMemo(() => {
    if (!selectedEventId) return null;
    return displayDayEvents.find(e => e.id === selectedEventId) || events.find(e => e.id === selectedEventId) || null;
  }, [selectedEventId, displayDayEvents, events]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <Header
        syncState={syncState}
        onRefresh={() => loadEvents(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-5 lg:p-6 pb-20">
        {/* Desktop 2-Column Split View / Mobile Single Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Timeline, Controls & Live Guide */}
          <div 
            className="lg:col-span-7 xl:col-span-7 space-y-4"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Live "Now & Next" Trip Companion */}
            <NowNextWidget
              events={displayDayEvents}
              selectedDate={selectedDate}
              onSelectEvent={(ev) => setSelectedEventId(ev.id)}
            />

            {/* Day Selector (22 Tue to 26 Sat) */}
            <DaySelector
              selectedDate={selectedDate}
              onSelectDate={handleSelectDay}
              allEvents={events}
            />

            {/* Toolbar: Running Late, Simplify Today, Progress */}
            <Toolbar
              runningLateShift={runningLateShift}
              onSelectRunningLate={setRunningLateShift}
              isSimplified={isSimplified}
              onToggleSimplify={() => setIsSimplified(!isSimplified)}
              completedCount={completedCount}
              totalCount={rawDayEvents.length}
              optionalCount={optionalCount}
            />

            {/* Vertical Proportional Daily Timeline */}
            <TimelineGrid
              events={displayDayEvents}
              selectedEventId={selectedEventId}
              onSelectEvent={(ev) => setSelectedEventId(ev.id)}
              selectedDate={selectedDate}
            />
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
          localStorage.clear();
          loadEvents(true);
        }}
      />
    </div>
  );
};
