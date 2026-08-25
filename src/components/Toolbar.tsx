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
    <div className="bg-[#222734] border border-slate-700/60 rounded-2xl p-4 sm:p-5 mb-5 space-y-4 shadow-sm">
      {/* Top Row: Progress + Simplify Today Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Progress Counter */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-slate-100">
              {completedCount} of {totalCount} stops completed
            </div>
            <div className="w-36 sm:w-44 bg-[#1a1d26] h-1.5 rounded-full overflow-hidden mt-1.5 border border-slate-700/40">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Simplify Today Button */}
        <button
          onClick={onToggleSimplify}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
            isSimplified
              ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300 shadow-sm'
              : 'bg-[#282e3e] border-slate-700/70 text-slate-300 hover:bg-[#31384b] hover:text-white'
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
              <Eye className="w-4 h-4 text-slate-400" />
              <span>Simplify Today</span>
            </>
          )}
        </button>
      </div>

      {/* Bottom Row: Running Late Simulation */}
      <div className="pt-3 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs sm:text-sm">
          <FastForward className="w-4 h-4 text-indigo-400" />
          <span>Running Late?</span>
          <span className="text-xs text-slate-400 font-normal">(Simulation)</span>
        </div>

        {/* Delay Pills */}
        <div className="flex items-center gap-1.5">
          {lateOptions.map((minutes) => {
            const isActive = runningLateShift === minutes;
            return (
              <button
                key={minutes}
                onClick={() => onSelectRunningLate(isActive ? 0 : minutes)}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold font-mono transition shadow-sm ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400'
                    : 'bg-[#282e3e] text-slate-300 hover:bg-[#31384b] hover:text-white border border-slate-700/70'
                }`}
              >
                +{minutes}m
              </button>
            );
          })}

          {runningLateShift > 0 && (
            <button
              onClick={() => onSelectRunningLate(0)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#282e3e] transition ml-1 border border-slate-700/70"
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
