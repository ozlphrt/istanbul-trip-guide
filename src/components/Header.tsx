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
        <span className="flex items-center gap-1.5 text-sky-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Demo Mode</span>
        </span>
      );
    }
    if (syncState.status === 'syncing') {
      return (
        <span className="flex items-center gap-1.5 text-zinc-400 text-xs font-medium">
          <RotateCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
          <span>Syncing...</span>
        </span>
      );
    }
    if (syncState.status === 'offline') {
      return (
        <span className="flex items-center gap-1.5 text-zinc-500 text-xs font-medium">
          <CloudOff className="w-3.5 h-3.5" />
          <span>Offline</span>
        </span>
      );
    }
    if (syncState.status === 'error') {
      return (
        <span className="flex items-center gap-1.5 text-rose-400 text-xs font-medium">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Sync error</span>
        </span>
      );
    }
    if (syncState.lastSyncedAt) {
      return (
        <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Synced {format(syncState.lastSyncedAt, 'HH:mm')}</span>
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>Ready</span>
      </span>
    );
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0c0d12]/90 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3.5 safe-top">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Title & Dates */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
              <span>Istanbul Trip Guide</span>
            </h1>
            <span className="text-[11px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-white/[0.06] text-zinc-300 border border-white/[0.08]">
              IST26
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-normal mt-0.5">
            22–26 September 2026 • Europe/Istanbul
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Sync Status Badge */}
          <div 
            onClick={onRefresh}
            role="button"
            tabIndex={0}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition cursor-pointer"
            title="Click to refresh from Google Calendar"
          >
            {getSyncLabel()}
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={syncState.status === 'syncing'}
            className="p-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-300 hover:text-white hover:bg-white/[0.08] active:scale-95 transition disabled:opacity-50"
            aria-label="Refresh calendar"
            title="Refresh itinerary"
          >
            <RotateCw className={`w-4 h-4 ${syncState.status === 'syncing' ? 'animate-spin text-indigo-400' : ''}`} />
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-300 hover:text-white hover:bg-white/[0.08] active:scale-95 transition"
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
