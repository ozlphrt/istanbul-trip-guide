import React, { useState } from 'react';
import {
  X,
  Key,
  Database,
  Cloud,
  CheckCircle2,
  AlertCircle,
  Trash2,
  RefreshCw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import {
  getStoredGoogleClientId,
  setStoredGoogleClientId
} from '../services/storage';
import { promptGoogleLogin } from '../services/auth';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMockMode: boolean;
  onToggleMockMode: (enabled: boolean) => void;
  onForceSync: () => void;
  cachedEventsCount: number;
  lastSyncedAt: Date | null;
  onClearCache: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  isMockMode,
  onToggleMockMode,
  onForceSync,
  cachedEventsCount,
  lastSyncedAt,
  onClearCache,
}) => {
  const [clientId, setClientId] = useState<string>(() => getStoredGoogleClientId());
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  if (!isOpen) return null;

  const handleSaveClientId = () => {
    setStoredGoogleClientId(clientId);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleGoogleConnect = () => {
    setAuthError(null);
    setIsAuthenticating(true);
    promptGoogleLogin(
      () => {
        setIsAuthenticating(false);
        onToggleMockMode(false);
        onForceSync();
        onClose();
      },
      (err) => {
        setIsAuthenticating(false);
        setAuthError(err);
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-elevated flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold text-white">Settings & Data Source</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto custom-scrollbar text-sm text-zinc-300">
          {/* Data Source Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-400" />
              <span>Data Source</span>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onToggleMockMode(true)}
                className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
                  isMockMode
                    ? 'bg-sky-500/15 border-sky-500/50 text-sky-200 shadow-sm'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-850'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-sky-400" /> Demo Mode
                  </span>
                  {isMockMode && <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />}
                </div>
                <p className="text-xs text-zinc-400 mt-2">
                  5 full days of rich sample events (Sep 22–26, 2026).
                </p>
              </button>

              <button
                type="button"
                onClick={() => onToggleMockMode(false)}
                className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
                  !isMockMode
                    ? 'bg-indigo-500/15 border-indigo-500/50 text-indigo-200 shadow-sm'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-850'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm flex items-center gap-1.5">
                    <Cloud className="w-4 h-4 text-indigo-400" /> Live Calendar
                  </span>
                  {!isMockMode && <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />}
                </div>
                <p className="text-xs text-zinc-400 mt-2">
                  Direct sync from Google Calendar API.
                </p>
              </button>
            </div>
          </div>

          {/* Google OAuth Setup */}
          <div className="space-y-3.5 pt-4 border-t border-zinc-800">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <Key className="w-4 h-4 text-indigo-400" />
              <span>Google OAuth 2.0 Client ID</span>
            </label>

            <p className="text-xs text-zinc-400 leading-relaxed">
              To read your live Google Calendar, provide a Web OAuth Client ID. Only read-only permission (<code className="text-zinc-200 bg-zinc-800 px-1 py-0.5 rounded">calendar.readonly</code>) is requested. No client secret is required.
            </p>

            <div className="space-y-2.5">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. 123456789-xxxx.apps.googleusercontent.com"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 text-xs focus:outline-none focus:border-indigo-500 font-mono"
                />
                <button
                  type="button"
                  onClick={handleSaveClientId}
                  className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-xs transition shrink-0"
                >
                  Save
                </button>
              </div>

              {saveSuccess && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Client ID saved to browser storage.
                </div>
              )}
            </div>

            {/* Connect Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleGoogleConnect}
                disabled={isAuthenticating}
                className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-black text-sm transition active:scale-[0.98] disabled:opacity-50"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>{isAuthenticating ? 'Connecting...' : 'Authorize & Connect Google Calendar'}</span>
              </button>
            </div>

            {authError && (
              <div className="flex items-start gap-2 p-3 bg-rose-950/50 border border-rose-900/80 rounded-xl text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}
          </div>

          {/* Calendar Prefix Guideline */}
          <div className="bg-zinc-950 rounded-2xl p-4 border border-zinc-800 space-y-2">
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <span className="text-indigo-400 font-black">[IST26]</span>
              <span>Event Title Prefix Rule</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              The application filters your Google Calendar and only displays events whose summary begins with <strong className="text-zinc-200">[IST26]</strong> (e.g. <em>[IST26] Topkapı Palace</em>).
            </p>
          </div>

          {/* Offline Cache & State */}
          <div className="space-y-2.5 pt-4 border-t border-zinc-800">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="font-medium">Offline Cached Events:</span>
              <span className="font-mono text-zinc-200 font-bold">{cachedEventsCount} events</span>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="font-medium">Last Synchronized:</span>
              <span className="font-mono text-zinc-200 font-bold">
                {lastSyncedAt ? lastSyncedAt.toLocaleTimeString() : 'Never'}
              </span>
            </div>

            <div className="pt-2 flex gap-2.5">
              <button
                type="button"
                onClick={onForceSync}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3.5 bg-zinc-800 hover:bg-zinc-750 text-zinc-200 font-bold rounded-xl text-xs transition"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Sync Now</span>
              </button>

              <button
                type="button"
                onClick={onClearCache}
                className="flex items-center justify-center gap-2 py-2.5 px-3.5 bg-rose-950/30 hover:bg-rose-950/60 border border-rose-900/40 text-rose-300 font-bold rounded-xl text-xs transition"
              >
                <Trash2 className="w-4 h-4" />
                <span>Reset Cache</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-500">
          <span>Istanbul Trip Guide 2026 • PWA</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-zinc-800 hover:bg-zinc-750 text-white font-bold rounded-xl text-xs transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
