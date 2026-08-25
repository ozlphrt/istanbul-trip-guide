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
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-5 mb-5 space-y-4 shadow-subtle">
      {/* Top Row: Progress + Simplify Today Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Progress Counter */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-black text-white">
              {completedCount} of {totalCount} stops completed
            </div>
            <div className="w-36 sm:w-48 bg-zinc-800 h-2.5 rounded-full overflow-hidden mt-1.5 border border-zinc-750">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Simplify Today Button */}
        <button
          onClick={onToggleSimplify}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm sm:text-base font-bold border transition-all ${
            isSimplified
              ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-sm'
              : 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-750 hover:text-white'
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
      <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-sm sm:text-base">
        <div className="flex items-center gap-2 text-zinc-200 font-extrabold text-sm sm:text-base">
          <FastForward className="w-5 h-5 text-indigo-400" />
          <span>Running Late?</span>
          <span className="text-xs sm:text-sm text-zinc-400 font-normal">(Simulation)</span>
        </div>

        {/* Delay Pills */}
        <div className="flex items-center gap-2">
          {lateOptions.map((minutes) => {
            const isActive = runningLateShift === minutes;
            return (
              <button
                key={minutes}
                onClick={() => onSelectRunningLate(isActive ? 0 : minutes)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold font-mono transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400'
                    : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-750 hover:text-white border border-zinc-750'
                }`}
              >
                +{minutes}m
              </button>
            );
          })}

          {runningLateShift > 0 && (
            <button
              onClick={() => onSelectRunningLate(0)}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition ml-1 border border-zinc-750"
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
