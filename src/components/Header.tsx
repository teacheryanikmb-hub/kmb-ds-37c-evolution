import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { STAGES_CONFIG } from '../data/roboticsData';
import {
  BookOpen,
  Clock,
  Compass,
  Gamepad2,
  CheckCircle2,
  PenTool,
  HelpCircle,
  Award,
  HardDrive,
  User,
  Menu,
  X,
  ChevronRight,
  Flame,
  Check,
} from 'lucide-react';

interface HeaderProps {
  onOpenProfile: () => void;
  onOpenBackup: () => void;
}

const STAGE_ICONS: Record<number, React.ElementType> = {
  1: Compass,
  2: BookOpen,
  3: Gamepad2,
  4: CheckCircle2,
  5: PenTool,
  6: HelpCircle,
  7: Award,
};

export const Header: React.FC<HeaderProps> = ({ onOpenProfile, onOpenBackup }) => {
  const {
    state,
    setCurrentStage,
    stageProgress,
    overallCompletionPercentage,
    estimatedMinutesRemaining,
  } = useProgress();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Group stages by session
  const session1Stages = STAGES_CONFIG.filter((s) => s.id <= 2);
  const session2Stages = STAGES_CONFIG.filter((s) => s.id >= 3 && s.id <= 5);
  const session3Stages = STAGES_CONFIG.filter((s) => s.id >= 6);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100 no-print">
      {/* Top Banner with KMB & Digital Society Branding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 border-b border-slate-800/60">
          {/* Logo & Academic Title */}
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-0.5 shadow-lg shadow-blue-500/20 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-cyan-400 to-blue-300 text-sm sm:text-base">
                  3.7C
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                  Kolej MARA Banting
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-400 hidden md:inline">
                  IB DP Digital Society (SL)
                </span>
              </div>
              <h1 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight leading-tight">
                KMB Digital Society — 3.7C Mini Study Hub
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Evolution of Robots and Autonomous Technologies • 150-Minute Self-Paced Journey
              </p>
            </div>
          </div>

          {/* Quick Metrics, Profile, Backup Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Time Remaining Metric */}
            <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                <strong className="text-white">{estimatedMinutesRemaining}m</strong> target left
              </span>
            </div>

            {/* Profile Pill */}
            <button
              onClick={onOpenProfile}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 transition"
              title="Click to edit student profile"
            >
              <div className="w-5 h-5 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-400">
                <User className="w-3 h-3" />
              </div>
              <div className="text-left hidden sm:block">
                <div className="font-semibold text-white leading-none">
                  {state.profile ? state.profile.name.split(' ')[0] : 'Profile'}
                </div>
                <div className="text-[10px] text-slate-400 leading-none mt-0.5">
                  {state.profile ? state.profile.studentClass : 'Set Name'}
                </div>
              </div>
            </button>

            {/* Save & Backup Trigger */}
            <button
              onClick={onOpenBackup}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white transition flex items-center space-x-1.5"
              title="Download backup or import progress"
            >
              <HardDrive className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Save & Backup</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white lg:hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Global Journey Progress Bar */}
        <div className="py-2.5 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-2 w-full max-w-xs sm:max-w-md mr-4">
            <span className="font-semibold text-slate-300 shrink-0">Journey:</span>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/50">
              <div
                className="bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 h-2 rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(34,211,238,0.5)]"
                style={{ width: `${overallCompletionPercentage}%` }}
              />
            </div>
            <span className="font-bold text-cyan-400 text-xs shrink-0 w-9 text-right">
              {overallCompletionPercentage}%
            </span>
          </div>

          {/* Recommended Session Checkpoint Indicator */}
          <div className="hidden sm:flex items-center space-x-2 text-[11px]">
            <span className="text-slate-400 font-medium">Active Session:</span>
            <span
              className={`px-2 py-0.5 rounded-md font-semibold ${
                state.activeSession === 1
                  ? 'bg-blue-900/60 text-blue-300 border border-blue-700/50'
                  : state.activeSession === 2
                  ? 'bg-purple-900/60 text-purple-300 border border-purple-700/50'
                  : 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50'
              }`}
            >
              Session {state.activeSession} —{' '}
              {state.activeSession === 1 ? 'Foundations (50m)' : state.activeSession === 2 ? 'Application (50m)' : 'Mastery (50m)'}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Stage Navigator Ribbon (7 Stages) */}
      <div className="hidden lg:block bg-slate-900/70 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 py-1.5 overflow-x-auto scrollbar-none">
            {STAGES_CONFIG.map((stage) => {
              const Icon = STAGE_ICONS[stage.id] || BookOpen;
              const isCurrent = state.currentStage === stage.id;
              const percent = stageProgress[stage.id] || 0;
              const isCompleted = percent === 100;

              return (
                <button
                  key={stage.id}
                  onClick={() => setCurrentStage(stage.id)}
                  className={`flex-1 min-w-[130px] px-3 py-2 rounded-xl text-left transition relative border ${
                    isCurrent
                      ? 'bg-blue-950/80 border-blue-500 text-white shadow-md shadow-blue-500/10'
                      : isCompleted
                      ? 'bg-slate-900/50 border-emerald-500/30 text-slate-300 hover:bg-slate-800'
                      : 'bg-slate-900/20 border-transparent text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        S{stage.id}
                      </span>
                      <Icon
                        className={`w-3.5 h-3.5 ${
                          isCurrent ? 'text-cyan-400' : isCompleted ? 'text-emerald-400' : 'text-slate-400'
                        }`}
                      />
                    </div>
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400">{stage.duration}m</span>
                    )}
                  </div>
                  <div className="text-xs font-bold truncate leading-tight">{stage.name}</div>
                  {/* Miniature Stage Progress */}
                  <div className="w-full bg-slate-800/80 rounded-full h-1 mt-1.5 overflow-hidden">
                    <div
                      className={`h-1 rounded-full ${
                        isCompleted ? 'bg-emerald-400' : isCurrent ? 'bg-cyan-400' : 'bg-slate-600'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Stage Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-bold uppercase text-slate-400 tracking-wider">
            <span>Select Learning Stage (150m Total)</span>
            <span className="text-cyan-400">{overallCompletionPercentage}% Done</span>
          </div>
          {STAGES_CONFIG.map((stage) => {
            const Icon = STAGE_ICONS[stage.id] || BookOpen;
            const isCurrent = state.currentStage === stage.id;
            const percent = stageProgress[stage.id] || 0;
            const isCompleted = percent === 100;

            return (
              <button
                key={stage.id}
                onClick={() => {
                  setCurrentStage(stage.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition ${
                  isCurrent
                    ? 'bg-blue-950/90 border-blue-500 text-white'
                    : isCompleted
                    ? 'bg-slate-900/80 border-emerald-500/40 text-slate-300'
                    : 'bg-slate-800/40 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isCurrent
                        ? 'bg-blue-600 text-white'
                        : isCompleted
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-600/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center space-x-2">
                      <span>Stage {stage.id}: {stage.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({stage.duration} min)</span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[200px]">
                      {stage.activity}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-semibold text-cyan-400">{percent}%</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
