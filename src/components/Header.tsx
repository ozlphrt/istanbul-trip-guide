import React from 'react';
import { RotateCw, Settings, CheckCircle2, CloudOff, Sparkles, AlertCircle } from 'lucide-react';
import { SyncState } from '../types/calendar';
import { format } from 'date-fns';

interface HeaderProps {
  syncState: SyncState;
  onRefresh: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  syncState,
  onRefresh,
  onOpenSettings,
}) => {
  const getSyncLabel = () => {
    if (syncState.isMockMode) {
      return (
        <span className="flex items-center gap-1.5 text-sky-400 text-sm font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>Demo Mode</span>
        </span>
      );
    }
    if (syncState.status === 'syncing') {
      return (
        <span className="flex items-center gap-1.5 text-zinc-300 text-sm font-semibold">
          <RotateCw className="w-4 h-4 animate-spin text-indigo-400" />
          <span>Syncing...</span>
        </span>
      );
    }
    if (syncState.status === 'offline') {
      return (
        <span className="flex items-center gap-1.5 text-zinc-400 text-sm font-semibold">
          <CloudOff className="w-4 h-4 text-zinc-500" />
          <span>Offline</span>
        </span>
      );
    }
    if (syncState.status === 'error') {
      return (
        <span className="flex items-center gap-1.5 text-rose-400 text-sm font-semibold">
          <AlertCircle className="w-4 h-4" />
          <span>Sync error</span>
        </span>
      );
    }
    if (syncState.lastSyncedAt) {
      return (
        <span className="flex items-center gap-1.5 text-emerald-400 text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Synced {format(syncState.lastSyncedAt, 'HH:mm')}</span>
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 text-emerald-400 text-sm font-semibold">
        <CheckCircle2 className="w-4 h-4" />
        <span>Ready</span>
      </span>
    );
  };

  return (
    <header className="sticky top-0 z-30 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/90 px-4 py-3.5 safe-top">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Title & Dates */}
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Istanbul Trip Guide</span>
            </h1>
            <span className="text-xs uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              IST26
            </span>
          </div>
          <p className="text-sm text-zinc-400 font-medium mt-0.5">
            22–26 September 2026 • Europe/Istanbul
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Sync Status Badge */}
          <div 
            onClick={onRefresh}
            role="button"
            tabIndex={0}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-750 hover:bg-zinc-800 transition cursor-pointer"
            title="Click to refresh from Google Calendar"
          >
            {getSyncLabel()}
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={syncState.status === 'syncing'}
            className="p-2.5 rounded-full bg-zinc-900 border border-zinc-750 text-zinc-200 hover:text-white hover:bg-zinc-800 active:scale-95 transition disabled:opacity-50"
            aria-label="Refresh calendar"
            title="Refresh itinerary"
          >
            <RotateCw className={`w-4 h-4 ${syncState.status === 'syncing' ? 'animate-spin text-indigo-400' : ''}`} />
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2.5 rounded-full bg-zinc-900 border border-zinc-750 text-zinc-200 hover:text-white hover:bg-zinc-800 active:scale-95 transition"
            aria-label="Settings"
            title="Configure Google OAuth & Data Source"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
