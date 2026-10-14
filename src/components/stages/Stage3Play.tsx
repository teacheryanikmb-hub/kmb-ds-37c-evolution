import React, { useState } from 'react';
import { useProgress } from '../../context/ProgressContext';
import {
  TIMELINE_CHALLENGE_ITEMS,
  ROBOT_MATCH_ITEMS,
  ETHICAL_DILEMMAS,
  TimelineItem,
  RobotMatchItem,
} from '../../data/roboticsData';
import {
  Gamepad2,
  CheckCircle2,
  ArrowRight,
  Shuffle,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Trophy,
  Scale,
  RotateCcw,
  Check,
  HelpCircle,
} from 'lucide-react';

export const Stage3Play: React.FC = () => {
  const {
    state,
    saveTimelineScore,
    saveMatchScore,
    saveEthicalChoice,
    completeEthicalChallenge,
    setCurrentStage,
  } = useProgress();

  const [activeTab, setActiveTab] = useState<'timeline' | 'match' | 'ethical'>('timeline');

  // --- GAME 1: TIMELINE ORDERING STATE ---
  // Initial scrambled order
  const [timelineOrder, setTimelineOrder] = useState<TimelineItem[]>(() => {
    // Initial deterministic scramble
    return [
      TIMELINE_CHALLENGE_ITEMS[2], // Unimate (1961)
      TIMELINE_CHALLENGE_ITEMS[0], // Archytas (-400)
      TIMELINE_CHALLENGE_ITEMS[4], // ASIMO (2000)
      TIMELINE_CHALLENGE_ITEMS[1], // Elmer & Elsie (1948)
      TIMELINE_CHALLENGE_ITEMS[5], // Cobots (2008)
      TIMELINE_CHALLENGE_ITEMS[3], // Shakey (1969)
    ];
  });
  const [timelineChecked, setTimelineChecked] = useState(state.stage3.timelineCompleted);

  const moveTimelineItem = (index: number, direction: 'up' | 'down') => {
    if (timelineChecked) return;
    const newOrder = [...timelineOrder];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newOrder.length) return;
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIdx];
    newOrder[targetIdx] = temp;
    setTimelineOrder(newOrder);
  };

  const checkTimelineOrder = () => {
    // Correct chronological order is sorted by year
    const correctSorted = [...TIMELINE_CHALLENGE_ITEMS].sort((a, b) => a.year - b.year);
    let correctCount = 0;
    timelineOrder.forEach((item, idx) => {
      if (item.id === correctSorted[idx].id) {
        correctCount++;
      }
    });

    saveTimelineScore(correctCount);
    setTimelineChecked(true);
  };

  const resetTimeline = () => {
    setTimelineChecked(false);
    setTimelineOrder([
      TIMELINE_CHALLENGE_ITEMS[2],
      TIMELINE_CHALLENGE_ITEMS[0],
      TIMELINE_CHALLENGE_ITEMS[4],
      TIMELINE_CHALLENGE_ITEMS[1],
      TIMELINE_CHALLENGE_ITEMS[5],
      TIMELINE_CHALLENGE_ITEMS[3],
    ]);
  };

  // --- GAME 2: MATCH THE ROBOT (8 items) ---
  const [selectedRobotId, setSelectedRobotId] = useState<string | null>(null);
  const [selectedCapabilityId, setSelectedCapabilityId] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({}); // robotId -> capabilityRobotId
  const [matchSubmitted, setMatchSubmitted] = useState(state.stage3.matchCompleted);

  // Scrambled capabilities
  const [shuffledCapabilities] = useState(() => {
    return [...ROBOT_MATCH_ITEMS].sort((a, b) => a.capability.localeCompare(b.capability));
  });

  const handlePairSelection = (robotId: string | null, capRobotId: string | null) => {
    if (matchSubmitted) return;
    const rId = robotId !== null ? robotId : selectedRobotId;
    const cId = capRobotId !== null ? capRobotId : selectedCapabilityId;

    if (rId && cId) {
      setMatchedPairs((prev) => ({
        ...prev,
        [rId]: cId,
      }));
      setSelectedRobotId(null);
      setSelectedCapabilityId(null);
    } else {
      if (robotId !== null) setSelectedRobotId(robotId);
      if (capRobotId !== null) setSelectedCapabilityId(capRobotId);
    }
  };

  const removeMatchPair = (robotId: string) => {
    if (matchSubmitted) return;
    setMatchedPairs((prev) => {
      const next = { ...prev };
      delete next[robotId];
      return next;
    });
  };

  const checkMatches = () => {
    let score = 0;
    ROBOT_MATCH_ITEMS.forEach((item) => {
      if (matchedPairs[item.id] === item.id) {
        score++;
      }
    });
    saveMatchScore(score);
    setMatchSubmitted(true);
  };

  const resetMatches = () => {
    setMatchedPairs({});
    setMatchSubmitted(false);
    setSelectedRobotId(null);
    setSelectedCapabilityId(null);
  };

  // --- GAME 3: ETHICAL CHALLENGE ---
  const [activeDilemmaIdx, setActiveDilemmaIdx] = useState(0);
  const currentDilemma = ETHICAL_DILEMMAS[activeDilemmaIdx];
  const userEthicalChoice = state.stage3.ethicalChoices[currentDilemma.id];

  const handleEthicalSelect = (choiceId: number) => {
    saveEthicalChoice(currentDilemma.id, choiceId);
  };

  const handleFinishEthical = () => {
    const answeredCount = Object.keys(state.stage3.ethicalChoices).length;
    completeEthicalChallenge(answeredCount);
  };

  const all3GamesDone =
    state.stage3.timelineCompleted && state.stage3.matchCompleted && state.stage3.ethicalCompleted;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/20 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Stage 3 • Estimated Duration: 15 Minutes (5m × 3)</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                Session 2: Application
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              PLAY — Robotics Challenges & Mini-Games
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-2xl">
              Consolidate historical chronologies, match robotic capabilities, and analyze nuanced ethical trade-offs.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-900/80 border border-slate-700/60 p-3 rounded-2xl shrink-0">
            <Trophy className="w-7 h-7 text-yellow-400" />
            <div className="text-right">
              <div className="text-xs text-slate-400 font-medium">Challenges Finished</div>
              <div className="text-lg font-bold text-cyan-400 font-mono">
                {[state.stage3.timelineCompleted, state.stage3.matchCompleted, state.stage3.ethicalCompleted].filter(Boolean).length}{' '}
                / 3
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="flex space-x-2 border-b border-slate-800 pb-3 overflow-x-auto">
        {[
          { id: 'timeline', name: 'Game 1: Timeline Ordering', time: '5m', done: state.stage3.timelineCompleted },
          { id: 'match', name: 'Game 2: Match the Robot (8 Items)', time: '5m', done: state.stage3.matchCompleted },
          { id: 'ethical', name: 'Game 3: Ethical Decision Challenge', time: '5m', done: state.stage3.ethicalCompleted },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition border flex items-center space-x-2 shrink-0 ${
              activeTab === tab.id
                ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30'
                : tab.done
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/30'
                : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <span>{tab.name}</span>
            <span className="text-[10px] opacity-70">({tab.time})</span>
            {tab.done && <Check className="w-4 h-4 text-emerald-400" />}
          </button>
        ))}
      </div>

      {/* GAME 1: TIMELINE CHALLENGE */}
      {activeTab === 'timeline' && (
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Game 1 • Timeline Chronology Challenge (5 minutes)
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Arrange the 6 Historical Milestones in Chronological Order
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Use the <ArrowUp className="w-3 h-3 inline" /> and <ArrowDown className="w-3 h-3 inline" /> buttons to reposition each card from earliest to latest.
              </p>
            </div>
            {state.stage3.timelineCompleted && (
              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold shrink-0">
                Score: {state.stage3.timelineScore} / 6 Correct
              </div>
            )}
          </div>

          <div className="space-y-3">
            {timelineOrder.map((item, idx) => {
              const isCorrectPos =
                timelineChecked &&
                item.id === [...TIMELINE_CHALLENGE_ITEMS].sort((a, b) => a.year - b.year)[idx].id;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition flex items-center justify-between gap-4 ${
                    timelineChecked
                      ? isCorrectPos
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-white'
                        : 'bg-rose-950/40 border-rose-500/60 text-white'
                      : 'bg-slate-800/50 border-slate-700/60 text-slate-200 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-cyan-400 text-xs shrink-0">
                      #{idx + 1}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white flex items-center space-x-2">
                        <span>{item.name}</span>
                        {timelineChecked && (
                          <span className="text-xs font-mono text-cyan-400">
                            ({item.year < 0 ? `${Math.abs(item.year)} BCE` : item.year})
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">{item.description}</p>
                      {timelineChecked && (
                        <div className="text-[11px] text-cyan-200 mt-1 font-medium">
                          💡 <em>Significance:</em> {item.significance}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Reorder Buttons */}
                  {!timelineChecked && (
                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={() => moveTimelineItem(idx, 'up')}
                        disabled={idx === 0}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition text-slate-300 hover:text-white"
                        title="Move Up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveTimelineItem(idx, 'down')}
                        disabled={idx === timelineOrder.length - 1}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition text-slate-300 hover:text-white"
                        title="Move Down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {timelineChecked ? (
              <button
                onClick={resetTimeline}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Ordering</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center space-x-3">
              {!timelineChecked ? (
                <button
                  onClick={checkTimelineOrder}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-md shadow-blue-600/30"
                >
                  Verify Chronological Sequence
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('match')}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition flex items-center space-x-1.5"
                >
                  <span>Proceed to Game 2 (Match the Robot)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* GAME 2: MATCH THE ROBOT (8 items) */}
      {activeTab === 'match' && (
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Game 2 • Match the Robot (5 minutes)
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Match 8 Famous Robots to Their Specific Role & Capability
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Select a robot on the left, then tap its corresponding capability on the right to link them.
              </p>
            </div>
            {matchSubmitted && (
              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold shrink-0">
                Score: {state.stage3.matchScore} / 8 Correct
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Robots */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold uppercase text-slate-400 pb-1">
                1. Select Robot:
              </div>
              {ROBOT_MATCH_ITEMS.map((robot) => {
                const isMatched = matchedPairs[robot.id] !== undefined;
                const isSelected = selectedRobotId === robot.id;
                const isCorrect = matchSubmitted && matchedPairs[robot.id] === robot.id;

                let borderCls = 'bg-slate-800/50 border-slate-700 text-slate-200';
                if (isSelected) borderCls = 'bg-blue-600/30 border-blue-400 text-white shadow-lg';
                if (matchSubmitted) {
                  borderCls = isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500 text-rose-200';
                }

                return (
                  <div
                    key={robot.id}
                    onClick={() => handlePairSelection(robot.id, null)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${borderCls}`}
                  >
                    <div>
                      <div className="font-bold text-sm text-white flex items-center space-x-2">
                        <span>{robot.robotName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                          {robot.category}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">{robot.creatorOrOrigin}</div>
                    </div>
                    {isMatched && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeMatchPair(robot.id);
                        }}
                        className="text-[11px] px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400"
                        title="Remove match"
                      >
                        Matched ✓
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Column: Capabilities */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold uppercase text-slate-400 pb-1">
                2. Select Matching Capability:
              </div>
              {shuffledCapabilities.map((item) => {
                const isSelected = selectedCapabilityId === item.id;
                // Check if already matched to any robot
                const pairedRobotKey = Object.keys(matchedPairs).find((rKey) => matchedPairs[rKey] === item.id);
                const pairedRobot = pairedRobotKey ? ROBOT_MATCH_ITEMS.find((r) => r.id === pairedRobotKey) : null;

                return (
                  <div
                    key={item.id}
                    onClick={() => handlePairSelection(null, item.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition text-xs leading-relaxed ${
                      isSelected
                        ? 'bg-cyan-600/30 border-cyan-400 text-white shadow-lg'
                        : pairedRobot
                        ? 'bg-slate-900/90 border-cyan-700/60 text-slate-300'
                        : 'bg-slate-800/40 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <p className="font-medium">{item.capability}</p>
                    {pairedRobot && (
                      <div className="mt-1.5 text-[11px] text-cyan-400 font-bold flex items-center space-x-1">
                        <span>Linked to: {pairedRobot.robotName}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {matchSubmitted ? (
              <button
                onClick={resetMatches}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Matches</span>
              </button>
            ) : (
              <div className="text-xs text-slate-400">
                {Object.keys(matchedPairs).length} of 8 pairs matched
              </div>
            )}

            <div className="flex items-center space-x-3">
              {!matchSubmitted ? (
                <button
                  onClick={checkMatches}
                  disabled={Object.keys(matchedPairs).length < 8}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold transition shadow-md shadow-blue-600/30"
                >
                  Verify All 8 Matches
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('ethical')}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition flex items-center space-x-1.5"
                >
                  <span>Proceed to Game 3 (Ethical Dilemmas)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* GAME 3: ETHICAL DECISION CHALLENGE (3 Dilemmas) */}
      {activeTab === 'ethical' && (
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center space-x-1.5">
                <Scale className="w-4 h-4" />
                <span>Game 3 • Ethical Decision Challenge (5 minutes)</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Dilemma {activeDilemmaIdx + 1} of 3: {currentDilemma.title}
              </h3>
            </div>

            {/* Dilemma Tabs */}
            <div className="flex space-x-1 shrink-0">
              {ETHICAL_DILEMMAS.map((d, dIdx) => (
                <button
                  key={d.id}
                  onClick={() => setActiveDilemmaIdx(dIdx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                    activeDilemmaIdx === dIdx
                      ? 'bg-purple-600 border-purple-400 text-white'
                      : state.stage3.ethicalChoices[d.id]
                      ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  Case {dIdx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Scenario Details */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2">
            <div className="text-xs font-bold uppercase text-slate-400">Scenario Context:</div>
            <p className="text-sm text-slate-200 leading-relaxed">{currentDilemma.scenario}</p>
            <div className="text-xs text-purple-300 pt-1 font-semibold">
              ⚖️ <strong>Competing Core Values:</strong> {currentDilemma.competingValues}
            </div>
          </div>

          {/* Decision Choices */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase text-slate-400">
              Select an Autonomous System Response to Examine Its Ethical Consequences:
            </div>
            {currentDilemma.options.map((opt) => {
              const isSelected = userEthicalChoice === opt.id;

              return (
                <div
                  key={opt.id}
                  onClick={() => handleEthicalSelect(opt.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition space-y-2 ${
                    isSelected
                      ? 'bg-purple-950/60 border-purple-400 text-white shadow-lg'
                      : 'bg-slate-800/40 border-slate-700/70 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-sm text-white flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-purple-900 border border-purple-400 text-purple-200 text-xs flex items-center justify-center font-bold">
                        {opt.id}
                      </span>
                      <span>{opt.title}</span>
                    </div>
                    {isSelected && (
                      <span className="text-xs font-bold text-purple-300 px-2 py-0.5 rounded bg-purple-900/80">
                        Selected Choice
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{opt.description}</p>

                  {/* Ethical Impact & Trade-Off Breakdown */}
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-purple-800/50 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs animate-fadeIn">
                      <div className="p-3 rounded-xl bg-purple-900/30 border border-purple-700/40 text-purple-200">
                        <strong className="text-white block mb-0.5">Ethical Rationale:</strong>
                        {opt.ethicalImpact}
                      </div>
                      <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-700/40 text-amber-200">
                        <strong className="text-amber-300 block mb-0.5">Significant Trade-Off:</strong>
                        {opt.tradeOff}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setActiveDilemmaIdx((prev) => Math.max(0, prev - 1))}
              disabled={activeDilemmaIdx === 0}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition"
            >
              Previous Case
            </button>

            {activeDilemmaIdx < ETHICAL_DILEMMAS.length - 1 ? (
              <button
                onClick={() => setActiveDilemmaIdx((prev) => prev + 1)}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition"
              >
                Next Ethical Case
              </button>
            ) : (
              <button
                onClick={() => {
                  handleFinishEthical();
                  setCurrentStage(4);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold transition shadow-lg shadow-blue-500/25 flex items-center space-x-2"
              >
                <span>Complete Stage 3 & Proceed to APPLY (Stage 4)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
