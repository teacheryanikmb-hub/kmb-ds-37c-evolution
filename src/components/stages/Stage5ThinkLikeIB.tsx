import React, { useState } from 'react';
import { useProgress } from '../../context/ProgressContext';
import { PAPER_1_CASE_STUDY, PAPER_2_CASE_STUDY, IBQuestionData } from '../../data/roboticsData';
import {
  PenTool,
  CheckCircle2,
  Lock,
  Unlock,
  Eye,
  AlertTriangle,
  FileText,
  HelpCircle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const Stage5ThinkLikeIB: React.FC = () => {
  const {
    state,
    savePaper1Response,
    submitPaper1Question,
    savePaper1SelfAssessment,
    savePaper2Response,
    submitPaper2Question,
    savePaper2SelfAssessment,
    setCurrentStage,
  } = useProgress();

  const [activeTab, setActiveTab] = useState<'paper1' | 'paper2'>('paper1');
  const [activeP1QuestionIdx, setActiveP1QuestionIdx] = useState(0);
  const [activeP2QuestionIdx, setActiveP2QuestionIdx] = useState(0);
  const [showSourcePackDetails, setShowSourcePackDetails] = useState(true);

  // Paper 1 current question
  const p1Questions = PAPER_1_CASE_STUDY.questions;
  const currentP1Q = p1Questions[activeP1QuestionIdx];
  const qKeyP1 = `q${currentP1Q.number}` as 'q1' | 'q2' | 'q3' | 'q4';
  const p1Resp = state.stage5.paper1[qKeyP1];

  // Paper 2 current question
  const p2Questions = PAPER_2_CASE_STUDY.questions;
  const currentP2Q = p2Questions[activeP2QuestionIdx];
  const qKeyP2 = `q${currentP2Q.number}` as 'q1' | 'q2' | 'q3' | 'q4';
  const p2Resp = state.stage5.paper2[qKeyP2];

  const p1AllSubmitted = (['q1', 'q2', 'q3', 'q4'] as const).every((k) => state.stage5.paper1[k].submitted);
  const p2AllSubmitted = (['q1', 'q2', 'q3', 'q4'] as const).every((k) => state.stage5.paper2[k].submitted);

  // Self assessment checklist toggles
  const handleToggleP1Checklist = (item: string) => {
    const updated = {
      ...p1Resp.selfChecklist,
      [item]: !p1Resp.selfChecklist[item],
    };
    savePaper1SelfAssessment(qKeyP1, p1Resp.selfScore, updated);
  };

  const handleToggleP2Checklist = (item: string) => {
    const updated = {
      ...p2Resp.selfChecklist,
      [item]: !p2Resp.selfChecklist[item],
    };
    savePaper2SelfAssessment(qKeyP2, p2Resp.selfScore, updated);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/20 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
                <PenTool className="w-3.5 h-3.5" />
                <span>Stage 5 • Estimated Duration: 40 Minutes (20m + 20m)</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                Sessions 2 & 3: Exam Mastery
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              THINK LIKE IB — Examination Practice
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-2xl">
              Authentic Paper 1 & Paper 2 questions with command term scaffolds, model answers, and guided self-assessment rubrics.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-900/80 border border-slate-700/60 p-3 rounded-2xl shrink-0">
            <div className="text-right">
              <div className="text-xs text-slate-400 font-medium">Exam Progress</div>
              <div className="text-sm font-bold text-cyan-400 font-mono">
                P1: {Object.values(state.stage5.paper1).filter((q) => q.submitted).length}/4 • P2:{' '}
                {Object.values(state.stage5.paper2).filter((q) => q.submitted).length}/4
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part A vs Part B Selector Tabs */}
      <div className="flex space-x-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('paper1')}
          className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition border flex items-center justify-center space-x-2 ${
            activeTab === 'paper1'
              ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <span>Part A: Paper 1-Style Practice (Cobots in Automotive)</span>
          {p1AllSubmitted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
        </button>

        <button
          onClick={() => setActiveTab('paper2')}
          className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition border flex items-center justify-center space-x-2 ${
            activeTab === 'paper2'
              ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg shadow-cyan-600/30'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <span>Part B: Paper 2-Style Source Pack (Exoskeletons in Rehab)</span>
          {p2AllSubmitted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
        </button>
      </div>

      {/* ================= PART A: PAPER 1 ================= */}
      {activeTab === 'paper1' && (
        <div className="space-y-6">
          {/* Case Study Card */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-7 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-400">
              <FileText className="w-4 h-4" />
              <span>Paper 1 Case Study Scenario</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">{PAPER_1_CASE_STUDY.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-800/40 border border-slate-700/60 p-4 rounded-2xl">
              {PAPER_1_CASE_STUDY.context}
            </p>
          </div>

          {/* Question Selector Tabs */}
          <div className="flex space-x-2 overflow-x-auto">
            {p1Questions.map((q, idx) => {
              const key = `q${q.number}` as 'q1' | 'q2' | 'q3' | 'q4';
              const isSub = state.stage5.paper1[key].submitted;
              const isCurrent = idx === activeP1QuestionIdx;

              return (
                <button
                  key={q.number}
                  onClick={() => setActiveP1QuestionIdx(idx)}
                  className={`flex-1 min-w-[130px] p-3 rounded-2xl border text-left transition ${
                    isCurrent
                      ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30'
                      : isSub
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase">
                    <span>Q{q.number}: {q.commandTerm}</span>
                    <span>[{q.marks}m]</span>
                  </div>
                  <div className="text-[11px] mt-0.5 truncate text-slate-300">
                    {isSub ? 'Submitted & Scored' : 'Unsubmitted'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Question Workplace */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <span>Command Term: <strong>{currentP1Q.commandTerm}</strong></span>
                <span>•</span>
                <span>Maximum Marks: {currentP1Q.marks}</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                {currentP1Q.questionText}
              </h4>
            </div>

            {/* Command Term Scaffold Guidance */}
            <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-800/40 space-y-2 text-xs text-blue-200">
              <div>
                <strong className="text-white">Command Term Rule ({currentP1Q.commandTerm}): </strong>
                {currentP1Q.commandTermGuide}
              </div>
              <div>
                <strong className="text-cyan-300">Suggested Structure: </strong>
                {currentP1Q.suggestedStructure}
              </div>
            </div>

            {/* Response Writing Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Your Examination Response:</span>
                <span className="font-mono">
                  {p1Resp.writtenAnswer.trim() ? p1Resp.writtenAnswer.trim().split(/\s+/).length : 0} words
                </span>
              </div>
              <textarea
                rows={6}
                value={p1Resp.writtenAnswer}
                onChange={(e) => savePaper1Response(qKeyP1, e.target.value)}
                placeholder="Type your structured answer here. Be specific, use accurate technical terms, and follow the command term requirements..."
                disabled={p1Resp.submitted}
                className="w-full p-4 rounded-2xl bg-slate-800/60 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-75 leading-relaxed resize-y font-sans"
              />
            </div>

            {/* Submit Action */}
            {!p1Resp.submitted ? (
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-slate-400 flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Model answer & markscheme unlock immediately after submitting.</span>
                </div>
                <button
                  onClick={() => submitPaper1Question(qKeyP1)}
                  disabled={!p1Resp.writtenAnswer.trim()}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold transition shadow-md shadow-blue-600/30 flex items-center space-x-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Submit Answer & Unlock Model Rubric</span>
                </button>
              </div>
            ) : (
              /* Model Answer and Self Assessment Panel */
              <div className="space-y-6 pt-2 border-t border-slate-800 animate-fadeIn">
                <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Model Answer & Evaluative Markscheme Unlocked</span>
                </div>

                {/* Model Answer */}
                <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
                  <strong className="text-emerald-300 block">Exemplary Teacher-Created Model Response:</strong>
                  <p className="whitespace-pre-line text-slate-200">{currentP1Q.modelAnswer}</p>
                </div>

                {/* Indicative Markscheme */}
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2 text-xs">
                  <strong className="text-cyan-300 block">Indicative Markscheme Breakdown:</strong>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {currentP1Q.indicativeMarkscheme.map((item, mIdx) => (
                      <li key={mIdx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Self-Assessment Checklist */}
                <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/80 space-y-3">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Self-Assessment Criteria:
                  </div>
                  <div className="space-y-2">
                    {currentP1Q.checklistItems.map((item, cIdx) => (
                      <label
                        key={cIdx}
                        className="flex items-start space-x-3 text-xs text-slate-300 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={!!p1Resp.selfChecklist[item]}
                          onChange={() => handleToggleP1Checklist(item)}
                          className="w-4 h-4 rounded text-blue-600 border-slate-700 bg-slate-800 mt-0.5"
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>

                  {/* Guided Mark Slider */}
                  <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Your Guided Self-Awarded Mark:</span>
                    <div className="flex items-center space-x-2">
                      <select
                        value={p1Resp.selfScore}
                        onChange={(e) =>
                          savePaper1SelfAssessment(
                            qKeyP1,
                            Number(e.target.value),
                            p1Resp.selfChecklist
                          )
                        }
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 font-bold focus:outline-none"
                      >
                        {Array.from({ length: currentP1Q.marks + 1 }).map((_, i) => (
                          <option key={i} value={i}>
                            {i} / {currentP1Q.marks} marks
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Common Mistakes */}
                <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-600/40 text-xs text-amber-200 space-y-1">
                  <strong className="text-amber-300 flex items-center space-x-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Examiner Warning: Common Mistakes on this Question:</span>
                  </strong>
                  <p>{currentP1Q.commonMistakes}</p>
                </div>
              </div>
            )}

            {/* Next / Previous Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setActiveP1QuestionIdx((prev) => Math.max(0, prev - 1))}
                disabled={activeP1QuestionIdx === 0}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition"
              >
                Previous Question
              </button>

              {activeP1QuestionIdx < p1Questions.length - 1 ? (
                <button
                  onClick={() => setActiveP1QuestionIdx((prev) => prev + 1)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center space-x-1.5"
                >
                  <span>Next Question (Q{activeP1QuestionIdx + 2})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('paper2')}
                  className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition flex items-center space-x-2 shadow-lg shadow-cyan-600/25"
                >
                  <span>Switch to Part B (Paper 2 Source Pack)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= PART B: PAPER 2 ================= */}
      {activeTab === 'paper2' && (
        <div className="space-y-6">
          {/* Simulated Source Pack Card */}
          <div className="rounded-3xl bg-slate-900/90 border border-cyan-500/30 p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <BookOpen className="w-4 h-4" />
                <span>Simulated Source Pack: Robotic Exoskeletons in Rehabilitation</span>
              </div>
              <button
                onClick={() => setShowSourcePackDetails(!showSourcePackDetails)}
                className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
              >
                <span>{showSourcePackDetails ? 'Collapse Pack' : 'Expand Full Pack'}</span>
                {showSourcePackDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {showSourcePackDetails && (
              <div className="space-y-4 animate-fadeIn">
                {/* Article */}
                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-serif">
                  {PAPER_2_CASE_STUDY.sourceArticle}
                </div>

                {/* Technical Diagram Matrix */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    Source Pack Diagram Component Guide:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                    {PAPER_2_CASE_STUDY.diagramDetails.map((diag, dIdx) => (
                      <div key={dIdx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <div className="font-bold text-white">{diag.component}</div>
                        <p className="text-slate-400 text-[11px] mt-0.5">{diag.function}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stakeholder Perspectives Panel */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                    Stakeholder Perspectives Matrix:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {PAPER_2_CASE_STUDY.stakeholders.map((stk, sIdx) => (
                      <div key={sIdx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <div className="font-bold text-slate-200">{stk.name}</div>
                        <p className="text-slate-400 text-[11px] mt-0.5">{stk.view}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Question Selector Tabs */}
          <div className="flex space-x-2 overflow-x-auto">
            {p2Questions.map((q, idx) => {
              const key = `q${q.number}` as 'q1' | 'q2' | 'q3' | 'q4';
              const isSub = state.stage5.paper2[key].submitted;
              const isCurrent = idx === activeP2QuestionIdx;

              return (
                <button
                  key={q.number}
                  onClick={() => setActiveP2QuestionIdx(idx)}
                  className={`flex-1 min-w-[130px] p-3 rounded-2xl border text-left transition ${
                    isCurrent
                      ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg shadow-cyan-600/30'
                      : isSub
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase">
                    <span>Q{q.number}: {q.commandTerm}</span>
                    <span>[{q.marks}m]</span>
                  </div>
                  <div className="text-[11px] mt-0.5 truncate text-slate-300">
                    {isSub ? 'Submitted & Scored' : 'Unsubmitted'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Question Workplace */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <span>Command Term: <strong>{currentP2Q.commandTerm}</strong></span>
                <span>•</span>
                <span>Maximum Marks: {currentP2Q.marks}</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                {currentP2Q.questionText}
              </h4>
            </div>

            {/* Guidance */}
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 space-y-2 text-xs text-cyan-200">
              <div>
                <strong className="text-white">Command Term Guidance ({currentP2Q.commandTerm}): </strong>
                {currentP2Q.commandTermGuide}
              </div>
              <div>
                <strong className="text-blue-300">Suggested Structure: </strong>
                {currentP2Q.suggestedStructure}
              </div>
            </div>

            {/* Text Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Your Paper 2 Source-Based Response:</span>
                <span className="font-mono">
                  {p2Resp.writtenAnswer.trim() ? p2Resp.writtenAnswer.trim().split(/\s+/).length : 0} words
                </span>
              </div>
              <textarea
                rows={6}
                value={p2Resp.writtenAnswer}
                onChange={(e) => savePaper2Response(qKeyP2, e.target.value)}
                placeholder="Incorporate specific evidence from the source article, diagram, or stakeholder perspectives..."
                disabled={p2Resp.submitted}
                className="w-full p-4 rounded-2xl bg-slate-800/60 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-75 leading-relaxed resize-y font-sans"
              />
            </div>

            {/* Submit Lock */}
            {!p2Resp.submitted ? (
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-slate-400 flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Submit written answer to unlock source rubric and model answer.</span>
                </div>
                <button
                  onClick={() => submitPaper2Question(qKeyP2)}
                  disabled={!p2Resp.writtenAnswer.trim()}
                  className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold transition shadow-md shadow-cyan-600/30 flex items-center space-x-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Submit Answer & Unlock Model Rubric</span>
                </button>
              </div>
            ) : (
              /* Model Answer and Self Assessment Panel */
              <div className="space-y-6 pt-2 border-t border-slate-800 animate-fadeIn">
                <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Model Answer & Evaluative Markscheme Unlocked</span>
                </div>

                {/* Model Answer */}
                <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
                  <strong className="text-emerald-300 block">Exemplary Teacher-Created Model Response:</strong>
                  <p className="whitespace-pre-line text-slate-200">{currentP2Q.modelAnswer}</p>
                </div>

                {/* Indicative Markscheme */}
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2 text-xs">
                  <strong className="text-cyan-300 block">Indicative Markscheme Guidance:</strong>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {currentP2Q.indicativeMarkscheme.map((item, mIdx) => (
                      <li key={mIdx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Self-Assessment Checklist */}
                <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/80 space-y-3">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Self-Assessment Criteria:
                  </div>
                  <div className="space-y-2">
                    {currentP2Q.checklistItems.map((item, cIdx) => (
                      <label
                        key={cIdx}
                        className="flex items-start space-x-3 text-xs text-slate-300 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={!!p2Resp.selfChecklist[item]}
                          onChange={() => handleToggleP2Checklist(item)}
                          className="w-4 h-4 rounded text-cyan-600 border-slate-700 bg-slate-800 mt-0.5"
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>

                  {/* Guided Mark Slider */}
                  <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Your Guided Self-Awarded Mark:</span>
                    <div className="flex items-center space-x-2">
                      <select
                        value={p2Resp.selfScore}
                        onChange={(e) =>
                          savePaper2SelfAssessment(
                            qKeyP2,
                            Number(e.target.value),
                            p2Resp.selfChecklist
                          )
                        }
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 font-bold focus:outline-none"
                      >
                        {Array.from({ length: currentP2Q.marks + 1 }).map((_, i) => (
                          <option key={i} value={i}>
                            {i} / {currentP2Q.marks} marks
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Common Mistakes */}
                <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-600/40 text-xs text-amber-200 space-y-1">
                  <strong className="text-amber-300 flex items-center space-x-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Examiner Warning: Common Mistakes on this Question:</span>
                  </strong>
                  <p>{currentP2Q.commonMistakes}</p>
                </div>
              </div>
            )}

            {/* Next / Previous Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setActiveP2QuestionIdx((prev) => Math.max(0, prev - 1))}
                disabled={activeP2QuestionIdx === 0}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition"
              >
                Previous Question
              </button>

              {activeP2QuestionIdx < p2Questions.length - 1 ? (
                <button
                  onClick={() => setActiveP2QuestionIdx((prev) => prev + 1)}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition flex items-center space-x-1.5"
                >
                  <span>Next Question (Q{activeP2QuestionIdx + 2})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setCurrentStage(6)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold transition flex items-center space-x-2 shadow-lg shadow-blue-500/25"
                >
                  <span>Proceed to Stage 6 (INQUIRE & REFLECT)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
