import React, { useState } from 'react';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { Header } from './components/Header';
import { ProfileModal } from './components/ProfileModal';
import { BackupModal } from './components/BackupModal';
import { Stage1Discover } from './components/stages/Stage1Discover';
import { Stage2Learn } from './components/stages/Stage2Learn';
import { Stage3Play } from './components/stages/Stage3Play';
import { Stage4Apply } from './components/stages/Stage4Apply';
import { Stage5ThinkLikeIB } from './components/stages/Stage5ThinkLikeIB';
import { Stage6Inquire } from './components/stages/Stage6Inquire';
import { Stage7Achieve } from './components/stages/Stage7Achieve';
import { STAGES_CONFIG } from './data/roboticsData';
import {
  Compass,
  BookOpen,
  Gamepad2,
  CheckCircle2,
  PenTool,
  HelpCircle,
  Award,
  ArrowRight,
  ShieldCheck,
  Download,
  Clock,
  Sparkles,
  BookmarkCheck,
} from 'lucide-react';

const STAGE_COMPONENTS: Record<number, React.FC> = {
  1: Stage1Discover,
  2: Stage2Learn,
  3: Stage3Play,
  4: Stage4Apply,
  5: Stage5ThinkLikeIB,
  6: Stage6Inquire,
  7: Stage7Achieve,
};

const MainContent: React.FC = () => {
  const {
    state,
    setCurrentStage,
    stageProgress,
    overallCompletionPercentage,
    estimatedMinutesRemaining,
  } = useProgress();

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [backupModalOpen, setBackupModalOpen] = useState(false);

  // Trigger profile modal on first visit if no name exists
  const showInitialOnboarding = !state.profile;

  const CurrentStageComponent = STAGE_COMPONENTS[state.currentStage] || Stage1Discover;
  const currentStageInfo = STAGES_CONFIG.find((s) => s.id === state.currentStage) || STAGES_CONFIG[0];

  // Find next uncompleted stage for the "Continue Learning" button
  const nextIncompleteStage =
    STAGES_CONFIG.find((s) => (stageProgress[s.id] || 0) < 100)?.id || state.currentStage;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Onboarding Profile Modal */}
      <ProfileModal
        isOpen={profileModalOpen || showInitialOnboarding}
        onClose={() => setProfileModalOpen(false)}
        canDismiss={!showInitialOnboarding}
      />

      {/* Backup and Restore Modal */}
      <BackupModal isOpen={backupModalOpen} onClose={() => setBackupModalOpen(false)} />

      {/* Sticky Global Navigation Header */}
      <Header
        onOpenProfile={() => setProfileModalOpen(true)}
        onOpenBackup={() => setBackupModalOpen(true)}
      />

      {/* Hero Quick Status Strip (Multi-Session Guide) */}
      <section className="bg-gradient-to-b from-blue-950/40 via-slate-900/30 to-slate-950 border-b border-slate-800/80 py-4 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-slate-300">
            {/* Session Roadmap Checkpoints */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-white text-xs uppercase tracking-wider flex items-center space-x-1.5">
                <BookmarkCheck className="w-4 h-4 text-cyan-400" />
                <span>3-Session Checkpoints:</span>
              </span>

              <button
                onClick={() => setCurrentStage(1)}
                className={`px-3 py-1.5 rounded-xl border font-semibold transition ${
                  state.currentStage <= 2
                    ? 'bg-blue-600/30 border-blue-400 text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                1. Foundations (50m) • Stages 1–2
              </button>

              <button
                onClick={() => setCurrentStage(3)}
                className={`px-3 py-1.5 rounded-xl border font-semibold transition ${
                  state.currentStage >= 3 && state.currentStage <= 5
                    ? 'bg-blue-600/30 border-blue-400 text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                2. Application (50m) • Stages 3–5A
              </button>

              <button
                onClick={() => setCurrentStage(6)}
                className={`px-3 py-1.5 rounded-xl border font-semibold transition ${
                  state.currentStage >= 6
                    ? 'bg-blue-600/30 border-blue-400 text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                3. Mastery (50m) • Stages 5B–7
              </button>
            </div>

            {/* Quick Resume Button */}
            <div className="flex items-center space-x-3 shrink-0">
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Device auto-save active
              </span>
              {state.currentStage !== nextIncompleteStage && (
                <button
                  onClick={() => setCurrentStage(nextIncompleteStage)}
                  className="px-4 py-1.5 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-400 text-cyan-200 text-xs font-bold transition flex items-center space-x-1.5"
                >
                  <span>Continue Next Stage (Stage {nextIncompleteStage})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Stage Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <CurrentStageComponent />
      </main>

      {/* Academic Institutional Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-400 no-print mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-bold text-white text-sm">
                Kolej MARA Banting (KMB), Selangor, Malaysia
              </div>
              <div className="text-slate-400 text-xs mt-0.5">
                International Baccalaureate Diploma Programme • Subject: Digital Society (SL)
              </div>
              <div className="text-cyan-400 font-mono text-[11px] mt-0.5">
                Prescribed Area of Inquiry: 3.7C Evolution of Robots and Autonomous Technologies
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setBackupModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition flex items-center space-x-1.5"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Export Progress Backup (.json)</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500">
            <div>
              Designed for 150-minute self-paced learning across 3 flexible study sessions.
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Progress stored locally in browser localStorage. No external credentials required.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ProgressProvider>
      <MainContent />
    </ProgressProvider>
  );
}
