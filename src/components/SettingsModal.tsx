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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#1e2330] border border-slate-700/80 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700/80">
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold text-white">Settings & Data Source</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#282e3e] text-slate-400 hover:text-white hover:bg-[#31384b] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto custom-scrollbar text-sm text-slate-300">
          {/* Data Source Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-400" />
              <span>Data Source</span>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onToggleMockMode(true)}
                className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
                  isMockMode
                    ? 'bg-[#282e3e] border-indigo-400/80 text-white ring-1 ring-indigo-400/40 shadow-sm'
                    : 'bg-[#181b24] border-slate-700/60 text-slate-400 hover:bg-[#282e3e]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                      Built-in Program
                    </span>
                    {isMockMode && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Full 5-day private curated Istanbul itinerary (offline-ready).
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onToggleMockMode(false)}
                className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
                  !isMockMode
                    ? 'bg-[#282e3e] border-indigo-400/80 text-white ring-1 ring-indigo-400/40 shadow-sm'
                    : 'bg-[#181b24] border-slate-700/60 text-slate-400 hover:bg-[#282e3e]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-white flex items-center gap-1.5">
                      <Cloud className="w-3.5 h-3.5 text-indigo-400" />
                      Google Calendar
                    </span>
                    {!isMockMode && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Direct sync with [IST26] events in your primary calendar.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Google OAuth Configuration */}
          {!isMockMode && (
            <div className="space-y-4 p-4 rounded-2xl bg-[#181b24] border border-slate-700/60">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-indigo-400" />
                  Google OAuth Client ID
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Read-Only
                </span>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="e.g. 123456789-abcdef.apps.googleusercontent.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#222734] border border-slate-700 text-white placeholder:text-slate-500 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleSaveClientId}
                  className="w-full py-2 px-3 rounded-xl bg-[#282e3e] hover:bg-[#31384b] text-white text-xs font-bold transition border border-slate-700"
                >
                  {saveSuccess ? 'Saved to Local Device!' : 'Save Client ID'}
                </button>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleGoogleConnect}
                disabled={isAuthenticating}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
              >
                <RefreshCw className={`w-4 h-4 ${isAuthenticating ? 'animate-spin' : ''}`} />
                <span>{isAuthenticating ? 'Authorizing with Google...' : 'Sign in with Google & Sync'}</span>
              </button>
            </div>
          )}

          {/* Cache Status & Actions */}
          <div className="space-y-3 pt-2 border-t border-slate-700/60">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Cached offline events:</span>
              <span className="font-mono font-bold text-slate-200">{cachedEventsCount} activities</span>
            </div>

            {lastSyncedAt && (
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Last updated:</span>
                <span className="font-mono font-bold text-slate-200">{new Date(lastSyncedAt).toLocaleString()}</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  onClearCache();
                  onClose();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-rose-950/30 hover:bg-rose-900/40 text-rose-300 border border-rose-800/40 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Cache & Reset Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
