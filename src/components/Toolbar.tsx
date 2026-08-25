import React from 'react';
import { FastForward, Eye, EyeOff, CheckCircle2, RotateCcw } from 'lucide-react';
import { RunningLateMinutes } from '../types/calendar';

interface ToolbarProps {
  runningLateShift: RunningLateMinutes;
  onSelectRunningLate: (shift: RunningLateMinutes) => void;
  isSimplified: boolean;
  onToggleSimplify: () => void;
  completedCount: number;
  totalCount: number;
  optionalCount: number;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  runningLateShift,
  onSelectRunningLate,
  isSimplified,
  onToggleSimplify,
  completedCount,
  totalCount,
  optionalCount,
}) => {
  const lateOptions: RunningLateMinutes[] = [15, 30, 45, 60];

  return (
    <div className="bg-[#0e111a]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 sm:p-5 mb-5 space-y-4 shadow-elevated">
      {/* Top Row: Progress + Simplify Today Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Progress Counter */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm">
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-black text-white tracking-tight">
              {completedCount} of {totalCount} stops completed
            </div>
            <div className="w-36 sm:w-48 bg-white/[0.06] h-2 rounded-full overflow-hidden mt-1.5 border border-white/[0.06]">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Simplify Today Button */}
        <button
          onClick={onToggleSimplify}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all shadow-sm ${
            isSimplified
              ? 'bg-indigo-500/20 border-indigo-400/50 text-indigo-200 shadow-indigo-500/20'
              : 'bg-white/[0.04] border-white/[0.08] text-zinc-300 hover:bg-white/[0.08] hover:text-white'
          }`}
          title="Hides optional events to make schedule more relaxed"
        >
          {isSimplified ? (
            <>
              <EyeOff className="w-4 h-4 text-indigo-400" />
              <span>Simplified ({optionalCount} hidden)</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 text-zinc-400" />
              <span>Simplify Today</span>
            </>
          )}
        </button>
      </div>

      {/* Bottom Row: Running Late Simulation */}
      <div className="pt-3.5 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2 text-zinc-200 font-extrabold text-sm sm:text-base">
          <FastForward className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
          <span>Running Late?</span>
          <span className="text-xs text-zinc-400 font-normal">(Simulation)</span>
        </div>

        {/* Delay Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {lateOptions.map((minutes) => {
            const isActive = runningLateShift === minutes;
            return (
              <button
                key={minutes}
                onClick={() => onSelectRunningLate(isActive ? 0 : minutes)}
                className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-extrabold font-mono transition shadow-sm ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md ring-2 ring-indigo-400/60'
                    : 'bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] hover:text-white border border-white/[0.08]'
                }`}
              >
                +{minutes}m
              </button>
            );
          })}

          {runningLateShift > 0 && (
            <button
              onClick={() => onSelectRunningLate(0)}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.08] transition ml-1 border border-white/[0.08]"
              title="Reset simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
