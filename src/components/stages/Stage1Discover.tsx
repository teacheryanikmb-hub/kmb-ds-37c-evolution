import React, { useState } from 'react';
import { useProgress } from '../../context/ProgressContext';
import { DISCOVER_QUESTIONS, TIMELINE_CHALLENGE_ITEMS } from '../../data/roboticsData';
import {
  Compass,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  History,
  Lightbulb,
  Check,
  ChevronRight,
} from 'lucide-react';

export const Stage1Discover: React.FC = () => {
  const { state, saveStage1Answer, completeStage1, setCurrentStage } = useProgress();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const answeredCount = Object.keys(state.stage1.answers).length;
  const allAnswered = answeredCount >= DISCOVER_QUESTIONS.length;

  const currentQ = DISCOVER_QUESTIONS[activeQuestionIndex];
  const selectedOption = state.stage1.answers[currentQ.id];
  const hasAnsweredCurrent = selectedOption !== undefined;
  const isCorrect = selectedOption === currentQ.correctIndex;

  const handleSelectOption = (idx: number) => {
    saveStage1Answer(currentQ.id, idx);
  };

  const handleNext = () => {
    if (activeQuestionIndex < DISCOVER_QUESTIONS.length - 1) {
      setActiveQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex((prev) => prev - 1);
    }
  };

  const handleFinishStage = () => {
    completeStage1();
    setCurrentStage(2);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Stage Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/20 p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>Stage 1 • Estimated Duration: 10 Minutes</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                Session 1: Foundations
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              DISCOVER — Robotics Evolution Challenge
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-2xl">
              Trace the conceptual journey from ancient mechanical automata to closed-loop cybernetics and autonomous collaborative systems.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-900/80 border border-slate-700/60 p-3 rounded-2xl shrink-0">
            <div className="text-right">
              <div className="text-xs text-slate-400 font-medium">Questions Completed</div>
              <div className="text-lg font-bold text-cyan-400 font-mono">
                {answeredCount} / {DISCOVER_QUESTIONS.length}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400 font-bold">
              {Math.round((answeredCount / DISCOVER_QUESTIONS.length) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Historical Milestones Preview Strip */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5">
        <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">
          <History className="w-4 h-4" />
          <span>Historical Robotics Evolution Arc</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {TIMELINE_CHALLENGE_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-slate-600 transition"
            >
              <div className="text-[10px] font-mono text-cyan-400 font-semibold">
                {item.year < 0 ? `${Math.abs(item.year)} BCE` : item.year}
              </div>
              <div className="text-xs font-bold text-white mt-0.5 truncate">{item.name}</div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Starter Inquiries */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl p-6 sm:p-8">
        {/* Question Selector Tabs */}
        <div className="flex items-center space-x-2 pb-6 border-b border-slate-800 overflow-x-auto">
          {DISCOVER_QUESTIONS.map((q, idx) => {
            const isAns = state.stage1.answers[q.id] !== undefined;
            const isCurrent = idx === activeQuestionIndex;
            return (
              <button
                key={q.id}
                onClick={() => setActiveQuestionIndex(idx)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition border shrink-0 ${
                  isCurrent
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30'
                    : isAns
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/30'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                <span>Question {idx + 1}</span>
                {isAns && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Current Question Body */}
        <div className="pt-6 space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center space-x-1.5">
              <span>Robotics Starter Challenge {activeQuestionIndex + 1} of 5</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isOptionCorrect = optIdx === currentQ.correctIndex;

              let btnStyle = 'bg-slate-800/50 border-slate-700 hover:border-slate-500 text-slate-200';
              if (hasAnsweredCurrent) {
                if (isOptionCorrect) {
                  btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-100 shadow-md shadow-emerald-500/10';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-100';
                } else {
                  btnStyle = 'bg-slate-800/20 border-slate-800/50 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-2xl border text-left text-sm transition flex items-start space-x-3.5 ${btnStyle}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 border ${
                      hasAnsweredCurrent
                        ? isOptionCorrect
                          ? 'bg-emerald-500 border-emerald-400 text-white'
                          : isSelected
                          ? 'bg-rose-500 border-rose-400 text-white'
                          : 'border-slate-600 text-slate-500'
                        : isSelected
                        ? 'bg-blue-600 border-blue-400 text-white'
                        : 'border-slate-600 text-slate-400'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <div className="flex-1 font-medium">{opt}</div>
                  {hasAnsweredCurrent && isOptionCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {hasAnsweredCurrent && isSelected && !isOptionCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Detailed Explanatory Feedback */}
          {hasAnsweredCurrent && (
            <div
              className={`p-5 rounded-2xl border animate-fadeIn space-y-3 ${
                isCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                  : 'bg-blue-950/40 border-blue-500/50 text-blue-200'
              }`}
            >
              <div className="flex items-center space-x-2 font-bold text-sm">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-300">Accurate IB Analysis!</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-5 h-5 text-cyan-400" />
                    <span className="text-cyan-300">Review & Learn:</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {currentQ.historicalSignificance}
              </p>
              <div className="pt-2 border-t border-slate-700/60 flex items-center space-x-2 text-xs text-cyan-300">
                <Lightbulb className="w-4 h-4 shrink-0" />
                <span>
                  <strong>Digital Society Connection:</strong> {currentQ.conceptNote}
                </span>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={handlePrev}
              disabled={activeQuestionIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition"
            >
              Previous Question
            </button>

            {activeQuestionIndex < DISCOVER_QUESTIONS.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center space-x-1.5"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  const el = document.getElementById('discover-summary');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-md shadow-blue-500/20"
              >
                <span>Review Core Synthesis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Concluding Inquiry Question & Synthesis */}
      <div
        id="discover-summary"
        className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/30 p-6 sm:p-8 space-y-5"
      >
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
          <Sparkles className="w-4 h-4" />
          <span>Stage 1 Key Synthesis & Inquiry</span>
        </div>

        <blockquote className="border-l-4 border-cyan-400 pl-4 py-1 text-lg sm:text-xl font-bold text-white italic">
          "How have robots evolved from programmed machines into increasingly autonomous systems?"
        </blockquote>

        <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
          <p>
            The evolution of robotics follows a clear technological and philosophical arc across four paradigm shifts:
          </p>
          <ul className="space-y-2 list-disc list-inside text-slate-300 text-xs sm:text-sm pl-2">
            <li>
              <strong className="text-white">Deterministic Automata:</strong> Early mechanisms (Archytas, Al-Jazari, Vaucanson) executed fixed mechanical cycles without perceiving the external environment (open-loop control).
            </li>
            <li>
              <strong className="text-white">Cybernetic Feedback & Embodiment:</strong> Mid-century systems like Walter’s tortoises demonstrated that autonomous goal-seeking behaviour emerges from closed-loop sensory feedback and environmental adaptation.
            </li>
            <li>
              <strong className="text-white">Deliberative Symbolic AI:</strong> Systems like Shakey introduced internal world modelling and automated planning (STRIPS), allowing machines to bridge physical sensors with multi-step logical reasoning.
            </li>
            <li>
              <strong className="text-white">Collaborative Co-Presence:</strong> Contemporary robotics is shifting from dangerous, caged factory automation (Unimate, IRB-6) towards adaptive cobots and assistive human companions (ASIMO, PARO) that sense forces, monitor proximity, and share human workspaces safely.
            </li>
          </ul>
        </div>

        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            {allAnswered ? (
              <span className="text-emerald-400 font-semibold flex items-center space-x-1.5">
                <Check className="w-4 h-4" />
                <span>All 5 Starter Questions Completed! Ready for Stage 2.</span>
              </span>
            ) : (
              <span>Answer all 5 questions above to complete Stage 1.</span>
            )}
          </div>

          <button
            onClick={handleFinishStage}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-bold transition shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2"
          >
            <span>Complete Stage 1 & Go to LEARN (Stage 2)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
