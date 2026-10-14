import React, { useState } from 'react';
import { useProgress } from '../../context/ProgressContext';
import { LEARN_MODULES, LearnModule } from '../../data/roboticsData';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Layers,
  Scale,
  Factory,
  HeartHandshake,
  Cpu,
  Check,
  ChevronRight,
  ShieldAlert,
  ArrowLeftRight,
} from 'lucide-react';

const MODULE_ICONS = [Layers, Scale, Factory, HeartHandshake, Cpu];

export const Stage2Learn: React.FC = () => {
  const {
    state,
    saveModuleCheckAnswer,
    markModuleCompleted,
    saveAsimovExercise,
    setCurrentStage,
  } = useProgress();

  const [activeModuleId, setActiveModuleId] = useState(1);
  const activeModule = LEARN_MODULES.find((m) => m.id === activeModuleId) || LEARN_MODULES[0];
  const moduleProgress = state.stage2.modules[activeModuleId] || {
    moduleId: activeModuleId,
    completed: false,
    checkAnswers: {},
  };

  // Asimov scenario state
  const asimovChoice = state.stage2.asimovExercise.choice;
  const asimovExplanation = state.stage2.asimovExercise.explanation;
  const [localAsimovExp, setLocalAsimovExp] = useState(asimovExplanation);

  const completedModulesCount = Object.values(state.stage2.modules).filter((m) => m.completed).length;

  const handleSelectCheck = (checkIdx: number, optIdx: number) => {
    saveModuleCheckAnswer(activeModuleId, checkIdx, optIdx);
  };

  const handleMarkComplete = (modId: number) => {
    markModuleCompleted(modId);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/20 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Stage 2 • Estimated Duration: 35 Minutes (7m × 5)</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                Session 1: Foundations
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              LEARN — Five Interactive Learning Modules
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-2xl">
              Grounded in the official IB Digital Society 3.7C prescribed inquiry: Examine early cybernetics, science fiction, industrial robotics, human interaction, and machine consciousness.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-900/80 border border-slate-700/60 p-3 rounded-2xl shrink-0">
            <div className="text-right">
              <div className="text-xs text-slate-400 font-medium">Modules Completed</div>
              <div className="text-lg font-bold text-cyan-400 font-mono">
                {completedModulesCount} / 5
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400 font-bold">
              {Math.round((completedModulesCount / 5) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Module Selector Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
        {LEARN_MODULES.map((mod, idx) => {
          const Icon = MODULE_ICONS[idx];
          const isCurrent = activeModuleId === mod.id;
          const isDone = state.stage2.modules[mod.id]?.completed;

          return (
            <button
              key={mod.id}
              onClick={() => setActiveModuleId(mod.id)}
              className={`p-3.5 rounded-2xl border text-left transition relative flex flex-col justify-between ${
                isCurrent
                  ? 'bg-blue-950 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : isDone
                  ? 'bg-slate-900/90 border-emerald-500/40 text-slate-200 hover:bg-slate-800'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isCurrent ? 'bg-blue-600 text-white' : isDone ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                {isDone ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="text-[10px] font-mono text-slate-400 font-semibold">{mod.estimatedMinutes}m</span>
                )}
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Module {mod.id}
                </div>
                <div className="text-xs font-bold truncate text-white mt-0.5">{mod.title}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Module Container */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl p-6 sm:p-8 space-y-8">
        {/* Module Header */}
        <div className="border-b border-slate-800 pb-6 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <span>Module {activeModule.id} of 5 • {activeModule.estimatedMinutes} Minutes Study Target</span>
            <span>•</span>
            <span className="text-slate-400">{activeModule.wordCount} words</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
            {activeModule.title}
          </h3>
          <p className="text-sm text-cyan-200 font-medium">{activeModule.subtitle}</p>
          <p className="text-xs sm:text-sm text-slate-300 italic pt-1">{activeModule.intro}</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {activeModule.contentSections.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-3">
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>{sec.heading}</span>
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {sec.text}
              </p>
              {/* Key terms pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {sec.keyTerms.map((term, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-medium"
                  >
                    #{term}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Specialized Interactive Element per Module */}
        <div className="pt-2">
          {activeModule.interactiveFeature === 'timeline' && (
            <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-1.5">
                <Layers className="w-4 h-4" />
                <span>Concept Map: Open-Loop vs Closed-Loop Control</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700 space-y-2">
                  <div className="font-bold text-amber-400">Open-Loop (Pre-20th C Automata)</div>
                  <p className="text-slate-300 leading-relaxed">
                    Input Controller → Physical Cams/Gears → Fixed Action.
                    No sensors. If the world shifts, the mechanism crashes or carries on blindly.
                  </p>
                  <div className="text-[11px] text-slate-400">Example: Jacques de Vaucanson’s Duck (1738)</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-800/40 space-y-2">
                  <div className="font-bold text-cyan-400">Closed-Loop Cybernetics (Elmer & Shakey)</div>
                  <p className="text-slate-300 leading-relaxed">
                    Sensory Input → Error Comparator → Adaptive Actuator Action → Environmental Feedback.
                    Maintains homeostasis or solves logical subgoals adaptively.
                  </p>
                  <div className="text-[11px] text-slate-400">Example: Elmer & Elsie (1948) & Shakey (1969)</div>
                </div>
              </div>
            </div>
          )}

          {activeModule.interactiveFeature === 'asimovScenario' && (
            <div className="p-5 rounded-2xl bg-slate-800/40 border border-purple-500/30 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-purple-400">
                <Scale className="w-4 h-4" />
                <span>Interactive Exercise: Applying Asimov’s Laws to a Fictional Conflict</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-slate-200 space-y-2 leading-relaxed">
                <div className="font-bold text-white text-sm">Hypothetical Scenario:</div>
                <p>
                  An autonomous domestic service robot is ordered by its owner: <em>"Sprint across the busy highway right now to retrieve my fallen umbrella."</em> The highway has fast-moving trucks that would instantly crush the robot (Third Law violation). However, the owner demands immediate obedience (Second Law). No human lives are in immediate peril.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Select how Asimov’s hierarchy of laws resolves this conflict:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 1, text: 'Robot refuses to cross, because Third Law (Self-Preservation) forbids destroying its own expensive chassis.' },
                    { id: 2, text: 'Robot MUST obey and sprint across the highway, because the Second Law (Obey human orders) explicitly overrides the Third Law (Self-Preservation).' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        saveAsimovExercise(opt.id, localAsimovExp);
                      }}
                      className={`p-3 rounded-xl border text-left transition ${
                        asimovChoice === opt.id
                          ? 'bg-purple-900/60 border-purple-400 text-white font-semibold'
                          : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>

              {asimovChoice !== -1 && (
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-700/50 text-xs text-purple-200 leading-relaxed">
                  <div className="font-bold text-white mb-1">
                    {asimovChoice === 2 ? '✓ Correct Asimov Logic:' : '⚠️ Literary Nuance:'}
                  </div>
                  <p>
                    Under Asimov’s fictional hierarchy, the Second Law strictly supersedes the Third Law: a robot must obey human commands even if it results in its own destruction. However, in reality, real-world roboticists cannot rely on this because if the robot sprints into highway traffic, it creates an extreme collision hazard that endangers other motorists—triggering the First Law (human harm). This illustrates why fictional natural-language laws are unsuitable as operational safety software.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeModule.interactiveFeature === 'manufacturingComparison' && (
            <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <ArrowLeftRight className="w-4 h-4" />
                <span>Manufacturing Transformation: Traditional Automation vs Collaborative Cobots</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/30 space-y-2">
                  <div className="font-bold text-rose-300 text-sm">Traditional Industrial Line (Unimate, IRB-6)</div>
                  <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                    <li>Segregated behind physical steel safety fences or light curtains.</li>
                    <li>High velocity, high payload, blind trajectory execution.</li>
                    <li>Any human entry triggers immediate full-plant emergency shutdown.</li>
                    <li>Fixed high-volume mass production (e.g., auto chassis spot welding).</li>
                    <li>Expensive capital installation; difficult to reprogram for batch variations.</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/30 space-y-2">
                  <div className="font-bold text-emerald-300 text-sm">Collaborative Cobot Line (UR5, Baxter)</div>
                  <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                    <li>Uncaged, shared workspace beside human operators.</li>
                    <li>Integrated torque sensors, soft rounded skins, power-limiting joints.</li>
                    <li>Human and robot divide tasks dynamically (human handles visual inspection; cobot fastens).</li>
                    <li>Agile, high-mix, low-volume flexible production.</li>
                    <li>Intuitive hand-guiding: workers physically teach trajectories in minutes.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeModule.interactiveFeature === 'robotMatrix' && (
            <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <HeartHandshake className="w-4 h-4" />
                <span>Human Interaction Matrix: Social vs Assistive vs Industrial</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-300 font-bold">
                      <th className="py-2.5 px-3">Robot Class</th>
                      <th className="py-2.5 px-3">Examples</th>
                      <th className="py-2.5 px-3">Primary Purpose</th>
                      <th className="py-2.5 px-3">Core Technical Feature</th>
                      <th className="py-2.5 px-3">Ethical / Social Challenge</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-white">Social & Companion</td>
                      <td className="py-2.5 px-3">Pepper, AIBO, Astro</td>
                      <td className="py-2.5 px-3">Conversation, entertainment, remote presence</td>
                      <td className="py-2.5 px-3">Affective computing, voice recognition, facial cues</td>
                      <td className="py-2.5 px-3 text-amber-300">Emotional deception, domestic privacy leaks</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-white">Therapeutic</td>
                      <td className="py-2.5 px-3">PARO Seal</td>
                      <td className="py-2.5 px-3">Dementia biofeedback, anxiety reduction</td>
                      <td className="py-2.5 px-3">Tactile fur sensors, bio-rhythm responding sounds</td>
                      <td className="py-2.5 px-3 text-amber-300">Infantilisation of seniors, substituting human touch</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-white">Assistive Care</td>
                      <td className="py-2.5 px-3">Robear, Exoskeletons</td>
                      <td className="py-2.5 px-3">Physical patient lifting, gait rehabilitation</td>
                      <td className="py-2.5 px-3">Soft tactile claws, high-torque hydraulic/EMG actuators</td>
                      <td className="py-2.5 px-3 text-amber-300">Patient safety/fall risk, extreme equipment expense</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeModule.interactiveFeature === 'consciousnessDial' && (
            <div className="p-5 rounded-2xl bg-slate-800/40 border border-cyan-500/30 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <Cpu className="w-4 h-4" />
                <span>The Consciousness Spectrum: Behavioural Mimicry vs Subjective Experience</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 space-y-1.5">
                  <div className="font-bold text-blue-400">1. Weak / Narrow AI</div>
                  <p className="text-slate-300">Statistical optimization for specific domains (e.g. Deep Blue, Siri, Roomba). No semantic awareness or intentionality.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 space-y-1.5">
                  <div className="font-bold text-amber-400">2. Anthropomorphic Mimicry</div>
                  <p className="text-slate-300">Animatronics & chatbots (e.g. Sophia). Generates convincing external cues of emotion; internally zero subjective sentience.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-800 space-y-1.5">
                  <div className="font-bold text-cyan-400">3. Phenomenal Consciousness (Qualia)</div>
                  <p className="text-slate-300">The subjective internal feeling of what it is like to experience joy or suffering. Unproven and absent in all modern robots.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Digital Society Connection Card */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-950/60 to-slate-900 border border-blue-500/30 p-5 space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-400">
            <Sparkles className="w-4 h-4" />
            <span>Digital Society Framework Alignment</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400">Prescribed Area: </span>
              <strong className="text-white">3.7C Evolution of Robots & Autonomous Technologies</strong>
            </div>
            <div>
              <span className="text-slate-400">Key Concept: </span>
              <strong className="text-cyan-300">{activeModule.digitalSocietyConnection.concept}</strong>
            </div>
            <div>
              <span className="text-slate-400">Prescribed Context: </span>
              <strong className="text-white">{activeModule.digitalSocietyConnection.context}</strong>
            </div>
            <div>
              <span className="text-slate-400">Key Stakeholders: </span>
              <strong className="text-slate-200">
                {activeModule.digitalSocietyConnection.stakeholders.join(', ')}
              </strong>
            </div>
          </div>
          <p className="text-xs text-slate-300 pt-2 border-t border-slate-800 leading-relaxed">
            <strong>Impacts & Implications:</strong> {activeModule.digitalSocietyConnection.implications}
          </p>
        </div>

        {/* Interactive Understanding Checks (2 per module) */}
        <div className="space-y-5 pt-2">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Module {activeModule.id} Understanding Checks (Compulsory)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {activeModule.checks.map((check, checkIdx) => {
              const selectedOpt = moduleProgress.checkAnswers[checkIdx];
              const hasAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === check.correctIndex;

              return (
                <div
                  key={checkIdx}
                  className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/70 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Check {checkIdx + 1} of 2
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-white leading-snug">
                      {check.question}
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    {check.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      const isOptionCorrect = optIdx === check.correctIndex;

                      let btnCls = 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-500';
                      if (hasAnswered) {
                        if (isOptionCorrect) {
                          btnCls = 'bg-emerald-950/70 border-emerald-500 text-emerald-100';
                        } else if (isSelected) {
                          btnCls = 'bg-rose-950/70 border-rose-500 text-rose-100';
                        } else {
                          btnCls = 'bg-slate-900/20 border-slate-800 text-slate-500 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectCheck(checkIdx, optIdx)}
                          className={`w-full p-2.5 rounded-xl border text-left text-xs transition flex items-start space-x-2 ${btnCls}`}
                        >
                          <span className="font-bold text-[11px] mt-0.5 text-slate-400">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span className="flex-1">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {hasAnswered && (
                    <div
                      className={`p-3 rounded-xl border text-xs leading-relaxed animate-fadeIn ${
                        isCorrect
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                          : 'bg-blue-950/40 border-blue-500/40 text-blue-200'
                      }`}
                    >
                      <div className="font-bold mb-0.5 flex items-center space-x-1">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Correct!</span>
                          </>
                        ) : (
                          <>
                            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Explanation:</span>
                          </>
                        )}
                      </div>
                      <p>{check.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Module Completion Toggle & Footer */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleMarkComplete(activeModuleId)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 border ${
                moduleProgress.completed
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>
                {moduleProgress.completed ? 'Module Completed ✓' : 'Mark Module Completed'}
              </span>
            </button>
            <span className="text-xs text-slate-400">
              {completedModulesCount} of 5 modules completed
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {activeModuleId < 5 ? (
              <button
                onClick={() => {
                  handleMarkComplete(activeModuleId);
                  setActiveModuleId((prev) => prev + 1);
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-md shadow-blue-600/25"
              >
                <span>Save & Continue to Module {activeModuleId + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  handleMarkComplete(activeModuleId);
                  setCurrentStage(3);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold transition flex items-center space-x-2 shadow-lg shadow-blue-500/25"
              >
                <span>Complete Stage 2 & Proceed to PLAY (Stage 3)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
