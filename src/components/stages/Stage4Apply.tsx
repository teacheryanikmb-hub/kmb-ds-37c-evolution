import React, { useState } from 'react';
import { useProgress } from '../../context/ProgressContext';
import { QUIZ_QUESTIONS } from '../../data/roboticsData';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Filter,
  Check,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const Stage4Apply: React.FC = () => {
  const { state, saveQuizAnswer, submitQuiz, retryQuiz, setCurrentStage } = useProgress();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [filterMode, setFilterMode] = useState<'all' | 'mistakes'>('all');

  const quizState = state.stage4;
  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const selectedOption = quizState.answers[currentQ.id];
  const hasAnsweredCurrent = selectedOption !== undefined;
  const isSubmitted = quizState.submitted;

  const totalQuestions = QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(quizState.answers).length;

  const handleSelectAnswer = (optionIdx: number) => {
    if (isSubmitted) return;
    saveQuizAnswer(currentQ.id, optionIdx);
  };

  const handleSubmit = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (quizState.answers[q.id] === q.correctIndex) {
        score++;
      }
    });
    submitQuiz(score);
  };

  const handleRetry = () => {
    retryQuiz();
    setCurrentQuestionIndex(0);
    setFilterMode('all');
  };

  // Mistakes list for review
  const mistakes = QUIZ_QUESTIONS.filter((q) => {
    return isSubmitted && quizState.answers[q.id] !== q.correctIndex;
  });

  const displayedQuestions = filterMode === 'mistakes' ? mistakes : QUIZ_QUESTIONS;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/20 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Stage 4 • Estimated Duration: 20 Minutes</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                Session 2: Application
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              APPLY — Knowledge & Scenario Quiz
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-2xl">
              15 academically rigorous IB questions across 3 levels: Knowledge, Application, and Analysis. Your responses are auto-saved in real time.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-900/80 border border-slate-700/60 p-3.5 rounded-2xl shrink-0">
            {isSubmitted ? (
              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Quiz Score / Best</div>
                <div className="text-xl font-bold font-mono text-cyan-400">
                  {quizState.score} / 15 ({Math.round((quizState.score / 15) * 100)}%)
                </div>
                <div className="text-[10px] text-emerald-400 font-medium">
                  Best: {quizState.bestScore}/15
                </div>
              </div>
            ) : (
              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Questions Answered</div>
                <div className="text-lg font-bold text-cyan-400 font-mono">
                  {answeredCount} / {totalQuestions}
                </div>
                <div className="text-[10px] text-slate-400">Auto-saved</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quiz Submission Result Banner (if submitted) */}
      {isSubmitted && (
        <div className="rounded-2xl bg-gradient-to-r from-blue-900/40 via-cyan-950/40 to-slate-900 border border-cyan-500/30 p-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-400/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Assessment Complete: {quizState.score} out of 15 ({Math.round((quizState.score / 15) * 100)}%)
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {quizState.score >= 11
                  ? 'Excellent command of Topic 3.7C concepts and ethical trade-offs!'
                  : 'Good effort! Review the detailed explanations below to strengthen your conceptual grasp.'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {mistakes.length > 0 && (
              <button
                onClick={() => setFilterMode(filterMode === 'all' ? 'mistakes' : 'all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center space-x-1.5 ${
                  filterMode === 'mistakes'
                    ? 'bg-rose-950 border-rose-500 text-rose-300'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>
                  {filterMode === 'mistakes' ? 'View All Questions' : `Review ${mistakes.length} Mistakes`}
                </span>
              </button>
            )}

            <button
              onClick={handleRetry}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition flex items-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Quiz</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Question Card */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl p-6 sm:p-8 space-y-6">
        {/* Question Selector Strip */}
        <div className="flex items-center space-x-1.5 pb-4 border-b border-slate-800 overflow-x-auto scrollbar-none">
          {displayedQuestions.map((q, idx) => {
            const isCurrent = currentQ.id === q.id;
            const hasAns = quizState.answers[q.id] !== undefined;
            const isQCorrect = isSubmitted && quizState.answers[q.id] === q.correctIndex;
            const isQWrong = isSubmitted && quizState.answers[q.id] !== undefined && !isQCorrect;

            let badgeCls = 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-700';
            if (isCurrent) {
              badgeCls = 'bg-blue-600 border-blue-400 text-white shadow-md shadow-blue-600/30';
            } else if (isSubmitted) {
              badgeCls = isQCorrect
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/60 border-rose-500/40 text-rose-300';
            } else if (hasAns) {
              badgeCls = 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300';
            }

            return (
              <button
                key={q.id}
                onClick={() => {
                  const targetIndex = QUIZ_QUESTIONS.findIndex((item) => item.id === q.id);
                  if (targetIndex !== -1) setCurrentQuestionIndex(targetIndex);
                }}
                className={`w-8 h-8 rounded-xl text-xs font-bold border transition flex items-center justify-center shrink-0 ${badgeCls}`}
              >
                {q.id}
              </button>
            );
          })}
        </div>

        {/* Question Info & Context */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-900/50 border border-blue-700/60 text-blue-300 font-semibold">
              {currentQ.category}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full font-semibold border ${
                currentQ.level === 1
                  ? 'bg-emerald-950/50 border-emerald-700/50 text-emerald-300'
                  : currentQ.level === 2
                  ? 'bg-amber-950/50 border-amber-700/50 text-amber-300'
                  : 'bg-purple-950/50 border-purple-700/50 text-purple-300'
              }`}
            >
              Level {currentQ.level}: {currentQ.levelName}
            </span>
            {currentQ.isScenario && (
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/50 border border-cyan-700/50 text-cyan-300 font-semibold">
                Scenario-Based
              </span>
            )}
          </div>

          {currentQ.scenarioContext && (
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-cyan-500/30 text-xs text-slate-200 leading-relaxed">
              <strong className="text-cyan-300 block mb-1">Scenario:</strong>
              {currentQ.scenarioContext}
            </div>
          )}

          <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
            {currentQ.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = selectedOption === optIdx;
            const isOptionCorrect = optIdx === currentQ.correctIndex;

            let btnStyle = 'bg-slate-800/40 border-slate-700 hover:border-slate-500 text-slate-200';
            if (isSubmitted) {
              if (isOptionCorrect) {
                btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-100 shadow-md shadow-emerald-500/10';
              } else if (isSelected) {
                btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-100';
              } else {
                btnStyle = 'bg-slate-800/20 border-slate-800/40 text-slate-500 opacity-60';
              }
            } else if (isSelected) {
              btnStyle = 'bg-blue-600/30 border-blue-400 text-white shadow-md';
            }

            return (
              <button
                key={optIdx}
                onClick={() => handleSelectAnswer(optIdx)}
                disabled={isSubmitted}
                className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition flex items-start space-x-3.5 ${btnStyle}`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 border ${
                    isSubmitted
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
                {isSubmitted && isOptionCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                {isSubmitted && isSelected && !isOptionCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Explanation upon submission */}
        {isSubmitted && (
          <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700 space-y-2 text-xs leading-relaxed animate-fadeIn">
            <div className="font-bold text-cyan-300 flex items-center space-x-1.5">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>Academic Explanation & Digital Society Rationale:</span>
            </div>
            <p className="text-slate-200">{currentQ.explanation}</p>
          </div>
        )}

        {/* Navigation & Submission Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <button
              onClick={() =>
                setCurrentQuestionIndex((prev) => Math.min(QUIZ_QUESTIONS.length - 1, prev + 1))
              }
              disabled={currentQuestionIndex === QUIZ_QUESTIONS.length - 1}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition flex items-center space-x-1"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-3">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={answeredCount < totalQuestions}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold transition shadow-md shadow-blue-600/30 flex items-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>
                  {answeredCount === totalQuestions
                    ? 'Submit Quiz for Marking'
                    : `Answer all 15 (${answeredCount}/15 done)`}
                </span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentStage(5)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold transition shadow-lg shadow-blue-500/25 flex items-center space-x-2"
              >
                <span>Proceed to Stage 5 (THINK LIKE IB)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
