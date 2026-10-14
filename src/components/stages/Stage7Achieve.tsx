import React, { useState, useEffect } from 'react';
import { useProgress } from '../../context/ProgressContext';
import { STAGES_CONFIG } from '../../data/roboticsData';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  Printer,
  Sparkles,
  BarChart3,
  BookOpen,
  Calendar,
  User,
  GraduationCap,
  ShieldCheck,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';

export const Stage7Achieve: React.FC = () => {
  const {
    state,
    saveReflection,
    completeStage7,
    stageProgress,
    overallCompletionPercentage,
    objectiveScorePercentage,
    isCertificateEligible,
  } = useProgress();

  const [reflection1, setReflection1] = useState(state.stage7.reflection1);
  const [reflection2, setReflection2] = useState(state.stage7.reflection2);
  const [reflection3, setReflection3] = useState(state.stage7.reflection3 || 'Evaluate');

  const p1Submitted = (['q1', 'q2', 'q3', 'q4'] as const).filter((k) => state.stage5.paper1[k].submitted).length;
  const p2Submitted = (['q1', 'q2', 'q3', 'q4'] as const).filter((k) => state.stage5.paper2[k].submitted).length;

  // Calculate self-assessed written marks
  const p1Marks = Object.values(state.stage5.paper1).reduce((acc, q) => acc + (q.selfScore || 0), 0);
  const p2Marks = Object.values(state.stage5.paper2).reduce((acc, q) => acc + (q.selfScore || 0), 0);

  const handleSaveReflection = () => {
    saveReflection({
      reflection1,
      reflection2,
      reflection3,
    });
    completeStage7();
  };

  useEffect(() => {
    if (isCertificateEligible) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe fallback if canvas not available
      }
    }
  }, [isCertificateEligible]);

  const handlePrintCertificate = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/20 p-6 sm:p-8 no-print">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>Stage 7 • Estimated Duration: 10 Minutes</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                Session 3: Mastery
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ACHIEVE — Review, Reflection & Certificate
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-2xl">
              Synthesise your 150-minute learning journey, evaluate command term targets, and claim your verified Kolej MARA Banting Certificate of Completion.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-900/80 border border-slate-700/60 p-3 rounded-2xl shrink-0">
            <div className="text-right">
              <div className="text-xs text-slate-400 font-medium">Objective Mastery</div>
              <div className="text-xl font-bold text-cyan-400 font-mono">
                {objectiveScorePercentage}%
              </div>
              <div className="text-[10px] text-slate-400">Target: ≥ 70%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Reflection Form */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl no-print">
        <div className="border-b border-slate-800 pb-4">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Final Reflective Synthesis
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Personal IB Digital Society Reflection
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Reflecting on your learning consolidates key conceptual links across Prescribed Area 3.7C and Concept 2.7.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              1. Which development in robotics (from automata to cobots or healthcare exoskeletons) has had the greatest impact on society? Explain briefly.
            </label>
            <textarea
              rows={3}
              value={reflection1}
              onChange={(e) => setReflection1(e.target.value)}
              placeholder="E.g., Cobots transformed workplace safety and ergonomics, while industrial manipulators drove mass production..."
              className="w-full p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              2. What is the most significant ethical challenge associated with autonomous robots?
            </label>
            <textarea
              rows={3}
              value={reflection2}
              onChange={(e) => setReflection2(e.target.value)}
              placeholder="E.g., The accountability gap in autonomous life-or-death triage, or the emotional deception of companion robots in elderly care..."
              className="w-full p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              3. Which IB command term do you most need to practice before your final exam?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['Explain', 'Analyse', 'Evaluate'].map((term) => (
                <button
                  type="button"
                  key={term}
                  onClick={() => setReflection3(term)}
                  className={`p-3 rounded-xl text-xs font-bold border transition ${
                    reflection3 === term
                      ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <span className="text-xs text-slate-400">
            {state.stage7.completed ? 'Reflection saved ✓' : 'Complete reflection to finalize Stage 7'}
          </span>
          <button
            onClick={handleSaveReflection}
            disabled={!reflection1.trim() || !reflection2.trim()}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold transition shadow-md shadow-blue-600/30"
          >
            Save Reflection & Update Dashboard
          </button>
        </div>
      </div>

      {/* Comprehensive Student Performance Dashboard */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Academic Performance Summary
            </div>
            <h3 className="text-xl font-bold text-white mt-0.5">
              {state.profile?.name || 'Student Profile'} • Class {state.profile?.studentClass || 'S25A'}
            </h3>
            <p className="text-xs text-slate-400">
              Kolej MARA Banting • IB Diploma Programme Digital Society (SL)
            </p>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-blue-950/60 border border-blue-500/40 text-cyan-400 font-mono font-bold text-lg">
            Overall Completion: {overallCompletionPercentage}%
          </div>
        </div>

        {/* 7 Stage Metric Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
          {STAGES_CONFIG.map((stage) => {
            const percent = stageProgress[stage.id] || 0;
            const isDone = percent === 100;

            return (
              <div
                key={stage.id}
                className={`p-3 rounded-2xl border ${
                  isDone
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-300'
                }`}
              >
                <div className="text-[10px] font-bold text-slate-400 uppercase">
                  Stage {stage.id}
                </div>
                <div className="font-bold text-white text-xs mt-0.5 truncate">{stage.name}</div>
                <div className="mt-2 font-mono font-semibold text-cyan-400">{percent}%</div>
              </div>
            );
          })}
        </div>

        {/* Detailed Assessment Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/70 space-y-2">
            <div className="font-bold text-cyan-400 uppercase tracking-wider text-[11px]">
              Interactive Games (Stage 3)
            </div>
            <div className="space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span>Timeline Ordering:</span>
                <strong className="text-white">
                  {state.stage3.timelineCompleted ? `${state.stage3.timelineScore}/6` : 'Pending'}
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Robot Matching:</span>
                <strong className="text-white">
                  {state.stage3.matchCompleted ? `${state.stage3.matchScore}/8` : 'Pending'}
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Ethical Dilemmas:</span>
                <strong className="text-white">
                  {state.stage3.ethicalCompleted ? `${state.stage3.ethicalScore}/3` : 'Pending'}
                </strong>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/70 space-y-2">
            <div className="font-bold text-cyan-400 uppercase tracking-wider text-[11px]">
              Knowledge Quiz (Stage 4)
            </div>
            <div className="space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span>Attempt Status:</span>
                <strong className="text-white">
                  {state.stage4.submitted ? 'Submitted' : 'In Progress'}
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Score:</span>
                <strong className="text-white font-mono">
                  {state.stage4.bestScore} / 15 ({Math.round((state.stage4.bestScore / 15) * 100)}%)
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Attempts:</span>
                <strong className="text-slate-400">{state.stage4.attemptsCount}</strong>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/70 space-y-2">
            <div className="font-bold text-cyan-400 uppercase tracking-wider text-[11px]">
              Exam & Inquiry Completion (Stages 5 & 6)
            </div>
            <div className="space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span>Paper 1 (Cobots):</span>
                <strong className="text-white">{p1Submitted} / 4 Submitted ({p1Marks}/20 self-marks)</strong>
              </div>
              <div className="flex justify-between">
                <span>Paper 2 (Exoskeletons):</span>
                <strong className="text-white">{p2Submitted} / 4 Submitted ({p2Marks}/20 self-marks)</strong>
              </div>
              <div className="flex justify-between">
                <span>Inquiries A & B:</span>
                <strong className="text-white">
                  {state.stage6.inquiryA.completed && state.stage6.inquiryB.completed
                    ? 'Both Completed ✓'
                    : 'In Progress'}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Revision Recommendations */}
        <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-800/40 text-xs space-y-1.5">
          <div className="font-bold text-cyan-300">Recommended Exam Revision Focus:</div>
          <p className="text-slate-300 leading-relaxed">
            Prioritise practicing <strong>{reflection3} questions</strong>. Remember: <em>Explain</em> requires identifying a valid point and explaining the technological mechanism (how/why); <em>Analyse</em> demands breaking down structural relationships and contrasting stakeholder perspectives; <em>Evaluate</em> requires a balanced synthesis weighing opportunities against risks to reach a justified, evidence-based judgment.
          </p>
        </div>
      </div>

      {/* Certificate Eligibility Callout */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Kolej MARA Banting Certificate Rules</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-0.5">
              Certificate of Completion Eligibility
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              1) All 7 required stages must reach 100% completion.<br />
              2) Achieve at least 70% in combined automatically marked games & quiz.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {isCertificateEligible ? (
              <button
                onClick={handlePrintCertificate}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 transition flex items-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Download Certificate (PDF)</span>
              </button>
            ) : (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-600/40 text-amber-200 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {overallCompletionPercentage < 100
                    ? `Complete all 7 stages (${overallCompletionPercentage}% currently)`
                    : `Achieve ≥ 70% in objective games/quiz (${objectiveScorePercentage}% currently)`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= A4 LANDSCAPE OFFICIAL CERTIFICATE ================= */}
      {/* Visible on screen if eligible, and beautifully styled for print */}
      <div
        id="kmb-certificate-printable"
        className={`relative w-full max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 border-8 border-double border-yellow-500/70 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-slate-100 shadow-2xl overflow-hidden ${
          !isCertificateEligible ? 'opacity-40 grayscale pointer-events-none' : ''
        }`}
      >
        {/* Certificate Watermark Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <GraduationCap className="w-96 h-96 text-white" />
        </div>

        {/* Certificate Header */}
        <div className="relative z-10 text-center space-y-2 border-b-2 border-yellow-500/40 pb-6">
          <div className="text-xs uppercase tracking-widest font-extrabold text-yellow-400">
            KOLEJ MARA BANTING • MALAYSIA
          </div>
          <div className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
            International Baccalaureate Diploma Programme (IBDP)
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide pt-1">
            Certificate of Academic Achievement
          </h2>
          <p className="text-xs sm:text-sm text-cyan-300 font-medium">
            Subject: Digital Society (SL) • 150-Minute Mini Study Hub
          </p>
        </div>

        {/* Certificate Body */}
        <div className="relative z-10 text-center py-8 space-y-4">
          <p className="text-xs sm:text-sm text-slate-300 italic">
            This certifies that the following candidate has successfully completed all seven compulsory stages of:
          </p>

          <div className="text-xl sm:text-3xl font-serif font-extrabold text-yellow-300 underline decoration-yellow-500/50 decoration-2 underline-offset-8">
            {state.profile?.name || 'STUDENT NAME'}
          </div>

          <div className="text-xs font-bold text-slate-300">
            Class: <span className="text-white">{state.profile?.studentClass || 'S25A'}</span>
          </div>

          <div className="pt-2 text-sm sm:text-base font-bold text-white">
            Topic 3.7C: Evolution of Robots and Autonomous Technologies
          </div>

          <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
            Demonstrating verified proficiency in early cybernetics, science fiction philosophy, industrial cobots, assistive healthcare robotics, cognitive embodiment, human augmentation (Context 4.4B), and ethical values (Concept 2.7).
          </p>
        </div>

        {/* Certificate Footer / Signatures */}
        <div className="relative z-10 grid grid-cols-3 gap-4 pt-6 border-t-2 border-yellow-500/40 text-center text-xs">
          <div>
            <div className="font-mono font-bold text-cyan-400 text-sm">
              {objectiveScorePercentage}%
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Objective Mastery Score</div>
          </div>

          <div className="border-t border-slate-600 pt-1">
            <div className="font-serif font-bold text-white">Teacher Yani</div>
            <div className="text-[10px] text-slate-400">Head of Subject, Digital Society</div>
            <div className="text-[10px] text-slate-500">Kolej MARA Banting</div>
          </div>

          <div>
            <div className="font-mono text-slate-200">{currentDate}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Date of Issue</div>
          </div>
        </div>

        {/* Official Gold Seal Stamp */}
        <div className="absolute bottom-6 right-8 opacity-90 hidden sm:block">
          <div className="w-20 h-20 rounded-full border-4 border-dashed border-yellow-400 flex flex-col items-center justify-center text-yellow-400 text-center p-1 transform rotate-12">
            <Award className="w-6 h-6 mb-0.5" />
            <span className="text-[8px] font-extrabold tracking-tighter uppercase leading-none">
              VERIFIED KMB IBDP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
