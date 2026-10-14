import React, { useState } from 'react';
import { useProgress } from '../../context/ProgressContext';
import { INQUIRY_A_CONFIG, INQUIRY_B_CONFIG } from '../../data/roboticsData';
import {
  HelpCircle,
  CheckCircle2,
  Scale,
  Activity,
  Heart,
  Users,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Check,
  Sparkles,
} from 'lucide-react';

export const Stage6Inquire: React.FC = () => {
  const {
    state,
    saveInquiryA,
    completeInquiryA,
    saveInquiryB,
    completeInquiryB,
    setCurrentStage,
  } = useProgress();

  const [activeTab, setActiveTab] = useState<'inquiryA' | 'inquiryB'>('inquiryA');

  // Inquiry A State
  const inquiryA = state.stage6.inquiryA;
  const selectedTech =
    INQUIRY_A_CONFIG.technologies.find((t) => t.id === inquiryA.technology) ||
    INQUIRY_A_CONFIG.technologies[0];

  // Inquiry B State
  const inquiryB = state.stage6.inquiryB;
  const selectedRule = INQUIRY_B_CONFIG.ethicalRules.find((r) => r.id === inquiryB.selectedRuleId);

  const isInquiryAValid =
    inquiryA.howItWorks.trim().length > 10 &&
    inquiryA.primaryUsers.trim().length > 5 &&
    inquiryA.benefits.trim().length > 15 &&
    inquiryA.limitation.trim().length > 10 &&
    inquiryA.conclusion.trim().length > 20;

  const isInquiryBValid =
    inquiryB.selectedRuleId !== '' &&
    inquiryB.justification.trim().length > 15 &&
    inquiryB.stakeholdersImpact.trim().length > 15 &&
    inquiryB.accountability.trim().length > 15;

  const handleFinishA = () => {
    completeInquiryA();
    setActiveTab('inquiryB');
  };

  const handleFinishB = () => {
    completeInquiryB();
    setCurrentStage(7);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/20 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Stage 6 • Estimated Duration: 20 Minutes (10m + 10m)</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                Session 3: Mastery
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              INQUIRE & REFLECT — Ethical & Human Augmentation Inquiry
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-2xl">
              Deep-dive into Context 4.4B (The Human Body) and Concept 2.7 (Values and Ethics) through guided inquiry prompts and interactive ethical simulations.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-900/80 border border-slate-700/60 p-3 rounded-2xl shrink-0">
            <div className="text-right">
              <div className="text-xs text-slate-400 font-medium">Inquiry Status</div>
              <div className="text-sm font-bold text-cyan-400 font-mono">
                A: {inquiryA.completed ? 'Done ✓' : 'In Progress'} • B:{' '}
                {inquiryB.completed ? 'Done ✓' : 'In Progress'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('inquiryA')}
          className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition border flex items-center justify-center space-x-2 ${
            activeTab === 'inquiryA'
              ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <span>Inquiry A: Augmenting Human Abilities (Context 4.4B)</span>
          {inquiryA.completed && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
        </button>

        <button
          onClick={() => setActiveTab('inquiryB')}
          className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition border flex items-center justify-center space-x-2 ${
            activeTab === 'inquiryB'
              ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/30'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <span>Inquiry B: Program the Robot's Morals (Concept 2.7)</span>
          {inquiryB.completed && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
        </button>
      </div>

      {/* ================= INQUIRY A ================= */}
      {activeTab === 'inquiryA' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-4 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Inquiry Question (10 Minutes Target)
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                "{INQUIRY_A_CONFIG.inquiryQuestion}"
              </h3>
              <p className="text-xs text-slate-400">
                Aligns directly with <strong>Prescribed Area 3.7C</strong> and <strong>Context 4.4B The Human Body</strong>.
              </p>
            </div>

            {/* Step 1: Select Technology */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                1. Select an Augmentative Robotic Technology:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {INQUIRY_A_CONFIG.technologies.map((tech) => (
                  <button
                    key={tech.id}
                    onClick={() => saveInquiryA({ technology: tech.id })}
                    className={`p-4 rounded-2xl border text-left transition space-y-1.5 ${
                      inquiryA.technology === tech.id
                        ? 'bg-blue-600/30 border-blue-400 text-white shadow-lg'
                        : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="font-bold text-sm text-white flex items-center justify-between">
                      <span>{tech.name.split('(')[0]}</span>
                      {inquiryA.technology === tech.id && (
                        <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{tech.brief}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Built-in Reference Dossier */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2 text-xs text-slate-200">
              <div className="font-bold text-cyan-300 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Reference Briefing for {selectedTech.name}:</span>
              </div>
              <p className="leading-relaxed">
                <strong>Mechanism:</strong> {selectedTech.coreMechanism}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-700/30 text-emerald-200">
                  <strong>Key Benefits:</strong> {selectedTech.keyBenefits}
                </div>
                <div className="p-2 rounded-lg bg-rose-950/30 border border-rose-700/30 text-rose-200">
                  <strong>Key Limitation:</strong> {selectedTech.keyLimitation}
                </div>
              </div>
            </div>

            {/* Structured Inquiry Response Form */}
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    2. Explain how this robotic technology works technically:
                  </label>
                  <textarea
                    rows={3}
                    value={inquiryA.howItWorks}
                    onChange={(e) => saveInquiryA({ howItWorks: e.target.value })}
                    placeholder="Describe the interaction of sensors (EMG/angle), microprocessors, and actuators..."
                    className="w-full p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    3. Identify the primary target users and demographic:
                  </label>
                  <textarea
                    rows={3}
                    value={inquiryA.primaryUsers}
                    onChange={(e) => saveInquiryA({ primaryUsers: e.target.value })}
                    placeholder="Specify patient conditions, occupational workers, or mobility profiles..."
                    className="w-full p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    4. Analyse two potential benefits (physical or psychological):
                  </label>
                  <textarea
                    rows={3}
                    value={inquiryA.benefits}
                    onChange={(e) => saveInquiryA({ benefits: e.target.value })}
                    placeholder="E.g., neuroplastic relearning, reduced musculoskeletal wear, restored dignity..."
                    className="w-full p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    5. Examine one significant limitation or risk:
                  </label>
                  <textarea
                    rows={3}
                    value={inquiryA.limitation}
                    onChange={(e) => saveInquiryA({ limitation: e.target.value })}
                    placeholder="E.g., economic inaccessibility, fall safety, reliance on therapist overhead..."
                    className="w-full p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  6. Supported Conclusion: To what extent does this robotics development enhance overall human quality of life?
                </label>
                <textarea
                  rows={3}
                  value={inquiryA.conclusion}
                  onChange={(e) => saveInquiryA({ conclusion: e.target.value })}
                  placeholder="Weigh the opportunities against the challenges and provide a substantiated concluding judgment..."
                  className="w-full p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400">All fields are auto-saved to your browser.</span>
              <button
                onClick={handleFinishA}
                disabled={!isInquiryAValid}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold transition shadow-md shadow-blue-600/30 flex items-center space-x-2"
              >
                <span>Save & Continue to Inquiry B (Program Morals)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= INQUIRY B ================= */}
      {activeTab === 'inquiryB' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-slate-900/90 border border-purple-500/30 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-4 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-purple-400">
                <Scale className="w-4 h-4" />
                <span>Concept 2.7 Values & Ethics Interactive Simulator (10 Minutes)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {INQUIRY_B_CONFIG.simulatorTitle}
              </h3>
              <p className="text-sm text-slate-300">
                <strong>Inquiry Question:</strong> "{INQUIRY_B_CONFIG.inquiryQuestion}"
              </p>
            </div>

            {/* Scenario Card */}
            <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-800/40 space-y-2 text-xs text-slate-200">
              <strong className="text-purple-300 block">Crisis Triage Scenario:</strong>
              <p className="leading-relaxed">{INQUIRY_B_CONFIG.scenarioDescription}</p>
            </div>

            {/* Patients in Contention */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Three Competing Patients Requiring the Final Critical Care Ventilator:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {INQUIRY_B_CONFIG.patients.map((pat) => (
                  <div
                    key={pat.id}
                    className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-1.5"
                  >
                    <div className="font-bold text-white text-sm">{pat.name}</div>
                    <div className="text-cyan-400 text-[11px] font-semibold">{pat.role}</div>
                    <p className="text-slate-300 text-[11px]">
                      <strong>Vitals:</strong> {pat.vitals}
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      <strong>Note:</strong> {pat.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Select Ethical Decision Rule */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Select an Ethical Programming Rule to Drive the Triage Algorithm:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INQUIRY_B_CONFIG.ethicalRules.map((rule) => {
                  const isSelected = inquiryB.selectedRuleId === rule.id;

                  return (
                    <button
                      key={rule.id}
                      onClick={() => saveInquiryB({ selectedRuleId: rule.id })}
                      className={`p-4 rounded-2xl border text-left transition space-y-2 ${
                        isSelected
                          ? 'bg-purple-900/50 border-purple-400 text-white shadow-lg'
                          : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div className="font-bold text-sm text-white flex items-center justify-between">
                        <span>{rule.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-purple-400 shrink-0" />}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{rule.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulated Algorithmic Outcome */}
            {selectedRule && (
              <div className="p-5 rounded-2xl bg-purple-950/40 border border-purple-500/50 space-y-2 text-xs text-slate-200 animate-fadeIn">
                <div className="font-bold text-purple-300 flex items-center space-x-1.5">
                  <Activity className="w-4 h-4 text-purple-400" />
                  <span>Simulated Algorithm Decision Outcome:</span>
                </div>
                <p className="text-white font-medium text-sm">{selectedRule.simulatedOutcome}</p>
                <div className="pt-2 border-t border-purple-800/60 text-slate-300">
                  <strong className="text-cyan-300">Philosophical Analysis: </strong>
                  {selectedRule.ethicalAnalysis}
                </div>
              </div>
            )}

            {/* Student Inquiry Responses */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  1. Justify your selection: Why do you believe this ethical rule is appropriate (or why is it flawed)?
                </label>
                <textarea
                  rows={3}
                  value={inquiryB.justification}
                  onChange={(e) => saveInquiryB({ justification: e.target.value })}
                  placeholder="Explain whether utilitarian, deontological, or egalitarian principles should govern life-or-death decisions..."
                  className="w-full p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  2. Stakeholder Analysis: Which stakeholders benefit, and who is unfairly disadvantaged by this automated rule?
                </label>
                <textarea
                  rows={3}
                  value={inquiryB.stakeholdersImpact}
                  onChange={(e) => saveInquiryB({ stakeholdersImpact: e.target.value })}
                  placeholder="Consider the patients, families, medical staff, hospital administration, and societal trust..."
                  className="w-full p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  3. Accountability & Responsibility: If a patient dies due to this algorithm’s triage decision, who must be held accountable?
                </label>
                <textarea
                  rows={3}
                  value={inquiryB.accountability}
                  onChange={(e) => saveInquiryB({ accountability: e.target.value })}
                  placeholder="Can a non-sentient robot bear accountability? Should liability fall on software developers, hospital ethicists, or health ministers?"
                  className="w-full p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700 text-[11px] text-slate-400">
              ℹ️ <strong>Pedagogical Disclaimer:</strong> This exercise is an educational ethics simulation designed to unpack IB Digital Society values and trade-offs. Autonomous systems in clinical medicine are legally classified as decision-support tools; final moral and legal accountability always rests with certified human physicians.
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400">Responses auto-saved in browser.</span>
              <button
                onClick={handleFinishB}
                disabled={!isInquiryBValid}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold transition shadow-lg shadow-purple-500/25 flex items-center space-x-2"
              >
                <span>Complete Stage 6 & Proceed to ACHIEVE (Stage 7)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
