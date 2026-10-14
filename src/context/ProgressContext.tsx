import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  AppProgressState,
  StudentProfile,
  KMBClass,
  ExamResponse,
  InquiryAResponse,
  InquiryBResponse,
  AchieveProgress,
} from '../types';
import { STAGES_CONFIG } from '../data/roboticsData';

const STORAGE_KEY = 'kmb_ds_3_7c_progress_v1';

const defaultExamResponse = (maxScore: number): ExamResponse => ({
  writtenAnswer: '',
  submitted: false,
  selfScore: 0,
  maxScore,
  selfChecklist: {},
});

const defaultState: AppProgressState = {
  version: '1.0',
  appIdentifier: 'KMB_DS_3_7C',
  profile: null,
  currentStage: 1,
  activeSession: 1,
  completedStages: [],
  stage1: {
    answers: {},
    completed: false,
  },
  stage2: {
    modules: {
      1: { moduleId: 1, completed: false, checkAnswers: {} },
      2: { moduleId: 2, completed: false, checkAnswers: {} },
      3: { moduleId: 3, completed: false, checkAnswers: {} },
      4: { moduleId: 4, completed: false, checkAnswers: {} },
      5: { moduleId: 5, completed: false, checkAnswers: {} },
    },
    asimovExercise: {
      choice: -1,
      explanation: '',
      completed: false,
    },
  },
  stage3: {
    timelineCompleted: false,
    timelineScore: 0,
    matchCompleted: false,
    matchScore: 0,
    ethicalCompleted: false,
    ethicalChoices: {},
    ethicalScore: 0,
  },
  stage4: {
    answers: {},
    submitted: false,
    score: 0,
    bestScore: 0,
    attemptsCount: 0,
  },
  stage5: {
    paper1: {
      q1: defaultExamResponse(2),
      q2: defaultExamResponse(4),
      q3: defaultExamResponse(6),
      q4: defaultExamResponse(8),
    },
    paper2: {
      q1: defaultExamResponse(2),
      q2: defaultExamResponse(4),
      q3: defaultExamResponse(6),
      q4: defaultExamResponse(8),
    },
  },
  stage6: {
    inquiryA: {
      technology: 'exoskeleton',
      howItWorks: '',
      primaryUsers: '',
      benefits: '',
      limitation: '',
      conclusion: '',
      completed: false,
    },
    inquiryB: {
      selectedRuleId: '',
      justification: '',
      stakeholdersImpact: '',
      ethicalJustifiability: '',
      accountability: '',
      reflection: '',
      completed: false,
    },
  },
  stage7: {
    reflection1: '',
    reflection2: '',
    reflection3: '',
    completed: false,
  },
};

interface ProgressContextValue {
  state: AppProgressState;
  setProfile: (profile: StudentProfile) => void;
  setCurrentStage: (stage: number) => void;
  setActiveSession: (session: 1 | 2 | 3) => void;
  // Stage 1
  saveStage1Answer: (questionId: number, optionIndex: number) => void;
  completeStage1: () => void;
  // Stage 2
  saveModuleCheckAnswer: (moduleId: number, checkIdx: number, optionIndex: number) => void;
  markModuleCompleted: (moduleId: number) => void;
  saveAsimovExercise: (choice: number, explanation: string) => void;
  // Stage 3
  saveTimelineScore: (score: number) => void;
  saveMatchScore: (score: number) => void;
  saveEthicalChoice: (dilemmaId: number, choiceId: number) => void;
  completeEthicalChallenge: (score: number) => void;
  // Stage 4
  saveQuizAnswer: (questionId: number, optionIndex: number) => void;
  submitQuiz: (score: number) => void;
  retryQuiz: () => void;
  // Stage 5
  savePaper1Response: (qKey: 'q1' | 'q2' | 'q3' | 'q4', writtenAnswer: string) => void;
  submitPaper1Question: (qKey: 'q1' | 'q2' | 'q3' | 'q4') => void;
  savePaper1SelfAssessment: (qKey: 'q1' | 'q2' | 'q3' | 'q4', score: number, checklist: Record<string, boolean>) => void;
  savePaper2Response: (qKey: 'q1' | 'q2' | 'q3' | 'q4', writtenAnswer: string) => void;
  submitPaper2Question: (qKey: 'q1' | 'q2' | 'q3' | 'q4') => void;
  savePaper2SelfAssessment: (qKey: 'q1' | 'q2' | 'q3' | 'q4', score: number, checklist: Record<string, boolean>) => void;
  // Stage 6
  saveInquiryA: (data: Partial<InquiryAResponse>) => void;
  completeInquiryA: () => void;
  saveInquiryB: (data: Partial<InquiryBResponse>) => void;
  completeInquiryB: () => void;
  // Stage 7
  saveReflection: (data: Partial<AchieveProgress>) => void;
  completeStage7: () => void;
  // Backup & Restore
  exportProgressJSON: () => void;
  importProgressJSON: (fileContent: string) => { success: boolean; message: string };
  resetProgress: () => void;
  // Derived metrics
  stageProgress: Record<number, number>; // 1-7 percentage
  overallCompletionPercentage: number;
  estimatedMinutesRemaining: number;
  objectiveScorePercentage: number; // For certificate (>= 70%)
  isCertificateEligible: boolean;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppProgressState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.appIdentifier === 'KMB_DS_3_7C') {
          // Merge with defaultState to ensure structural consistency
          return {
            ...defaultState,
            ...parsed,
            stage1: { ...defaultState.stage1, ...parsed.stage1 },
            stage2: {
              ...defaultState.stage2,
              ...parsed.stage2,
              modules: { ...defaultState.stage2.modules, ...(parsed.stage2?.modules || {}) },
            },
            stage3: { ...defaultState.stage3, ...parsed.stage3 },
            stage4: { ...defaultState.stage4, ...parsed.stage4 },
            stage5: {
              paper1: { ...defaultState.stage5.paper1, ...(parsed.stage5?.paper1 || {}) },
              paper2: { ...defaultState.stage5.paper2, ...(parsed.stage5?.paper2 || {}) },
            },
            stage6: {
              inquiryA: { ...defaultState.stage6.inquiryA, ...(parsed.stage6?.inquiryA || {}) },
              inquiryB: { ...defaultState.stage6.inquiryB, ...(parsed.stage6?.inquiryB || {}) },
            },
            stage7: { ...defaultState.stage7, ...parsed.stage7 },
          };
        }
      }
    } catch (e) {
      console.error('Failed to load saved progress:', e);
    }
    return defaultState;
  });

  // Auto-save whenever state changes
  useEffect(() => {
    try {
      const stateToSave: AppProgressState = {
        ...state,
        profile: state.profile
          ? {
              ...state.profile,
              lastActiveAt: new Date().toISOString(),
            }
          : null,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to persist progress to localStorage:', e);
    }
  }, [state]);

  const setProfile = (profile: StudentProfile) => {
    setState((prev) => ({
      ...prev,
      profile,
    }));
  };

  const setCurrentStage = (stage: number) => {
    // Automatically correlate stage with recommended session checkpoint
    let session: 1 | 2 | 3 = 1;
    if (stage <= 2) session = 1;
    else if (stage <= 5) session = 2;
    else session = 3;

    setState((prev) => ({
      ...prev,
      currentStage: stage,
      activeSession: session,
    }));
  };

  const setActiveSession = (session: 1 | 2 | 3) => {
    setState((prev) => ({
      ...prev,
      activeSession: session,
    }));
  };

  // Stage 1 Actions
  const saveStage1Answer = (questionId: number, optionIndex: number) => {
    setState((prev) => ({
      ...prev,
      stage1: {
        ...prev.stage1,
        answers: {
          ...prev.stage1.answers,
          [questionId]: optionIndex,
        },
      },
    }));
  };

  const completeStage1 = () => {
    setState((prev) => ({
      ...prev,
      stage1: {
        ...prev.stage1,
        completed: true,
      },
      completedStages: Array.from(new Set([...prev.completedStages, 1])),
    }));
  };

  // Stage 2 Actions
  const saveModuleCheckAnswer = (moduleId: number, checkIdx: number, optionIndex: number) => {
    setState((prev) => {
      const currentModule = prev.stage2.modules[moduleId] || {
        moduleId,
        completed: false,
        checkAnswers: {},
      };
      return {
        ...prev,
        stage2: {
          ...prev.stage2,
          modules: {
            ...prev.stage2.modules,
            [moduleId]: {
              ...currentModule,
              checkAnswers: {
                ...currentModule.checkAnswers,
                [checkIdx]: optionIndex,
              },
            },
          },
        },
      };
    });
  };

  const markModuleCompleted = (moduleId: number) => {
    setState((prev) => {
      const currentModule = prev.stage2.modules[moduleId] || {
        moduleId,
        completed: false,
        checkAnswers: {},
      };
      const updatedModules = {
        ...prev.stage2.modules,
        [moduleId]: {
          ...currentModule,
          completed: true,
        },
      };

      const allCompleted = [1, 2, 3, 4, 5].every((id) => updatedModules[id]?.completed);
      const completedStages = allCompleted
        ? Array.from(new Set([...prev.completedStages, 2]))
        : prev.completedStages.filter((s) => s !== 2);

      return {
        ...prev,
        completedStages,
        stage2: {
          ...prev.stage2,
          modules: updatedModules,
        },
      };
    });
  };

  const saveAsimovExercise = (choice: number, explanation: string) => {
    setState((prev) => ({
      ...prev,
      stage2: {
        ...prev.stage2,
        asimovExercise: {
          choice,
          explanation,
          completed: true,
        },
      },
    }));
  };

  // Stage 3 Actions
  const saveTimelineScore = (score: number) => {
    setState((prev) => {
      const updated = {
        ...prev.stage3,
        timelineCompleted: true,
        timelineScore: score,
      };
      const allDone = updated.timelineCompleted && updated.matchCompleted && updated.ethicalCompleted;
      return {
        ...prev,
        stage3: updated,
        completedStages: allDone
          ? Array.from(new Set([...prev.completedStages, 3]))
          : prev.completedStages,
      };
    });
  };

  const saveMatchScore = (score: number) => {
    setState((prev) => {
      const updated = {
        ...prev.stage3,
        matchCompleted: true,
        matchScore: score,
      };
      const allDone = updated.timelineCompleted && updated.matchCompleted && updated.ethicalCompleted;
      return {
        ...prev,
        stage3: updated,
        completedStages: allDone
          ? Array.from(new Set([...prev.completedStages, 3]))
          : prev.completedStages,
      };
    });
  };

  const saveEthicalChoice = (dilemmaId: number, choiceId: number) => {
    setState((prev) => ({
      ...prev,
      stage3: {
        ...prev.stage3,
        ethicalChoices: {
          ...prev.stage3.ethicalChoices,
          [dilemmaId]: choiceId,
        },
      },
    }));
  };

  const completeEthicalChallenge = (score: number) => {
    setState((prev) => {
      const updated = {
        ...prev.stage3,
        ethicalCompleted: true,
        ethicalScore: score,
      };
      const allDone = updated.timelineCompleted && updated.matchCompleted && updated.ethicalCompleted;
      return {
        ...prev,
        stage3: updated,
        completedStages: allDone
          ? Array.from(new Set([...prev.completedStages, 3]))
          : prev.completedStages,
      };
    });
  };

  // Stage 4 Actions
  const saveQuizAnswer = (questionId: number, optionIndex: number) => {
    setState((prev) => ({
      ...prev,
      stage4: {
        ...prev.stage4,
        answers: {
          ...prev.stage4.answers,
          [questionId]: optionIndex,
        },
      },
    }));
  };

  const submitQuiz = (score: number) => {
    setState((prev) => ({
      ...prev,
      stage4: {
        ...prev.stage4,
        submitted: true,
        score,
        bestScore: Math.max(prev.stage4.bestScore, score),
        attemptsCount: prev.stage4.attemptsCount + 1,
        completedAt: new Date().toISOString(),
      },
      completedStages: Array.from(new Set([...prev.completedStages, 4])),
    }));
  };

  const retryQuiz = () => {
    setState((prev) => ({
      ...prev,
      stage4: {
        ...prev.stage4,
        answers: {},
        submitted: false,
      },
    }));
  };

  // Stage 5 Actions (Paper 1 & Paper 2)
  const savePaper1Response = (qKey: 'q1' | 'q2' | 'q3' | 'q4', writtenAnswer: string) => {
    setState((prev) => ({
      ...prev,
      stage5: {
        ...prev.stage5,
        paper1: {
          ...prev.stage5.paper1,
          [qKey]: {
            ...prev.stage5.paper1[qKey],
            writtenAnswer,
          },
        },
      },
    }));
  };

  const submitPaper1Question = (qKey: 'q1' | 'q2' | 'q3' | 'q4') => {
    setState((prev) => {
      const updatedP1 = {
        ...prev.stage5.paper1,
        [qKey]: {
          ...prev.stage5.paper1[qKey],
          submitted: true,
          submittedAt: new Date().toISOString(),
        },
      };
      const p1AllSubmitted = (['q1', 'q2', 'q3', 'q4'] as const).every((k) => updatedP1[k].submitted);
      const p2AllSubmitted = (['q1', 'q2', 'q3', 'q4'] as const).every((k) => prev.stage5.paper2[k].submitted);
      const stage5Done = p1AllSubmitted && p2AllSubmitted;

      return {
        ...prev,
        stage5: {
          ...prev.stage5,
          paper1: updatedP1,
        },
        completedStages: stage5Done
          ? Array.from(new Set([...prev.completedStages, 5]))
          : prev.completedStages,
      };
    });
  };

  const savePaper1SelfAssessment = (
    qKey: 'q1' | 'q2' | 'q3' | 'q4',
    score: number,
    checklist: Record<string, boolean>
  ) => {
    setState((prev) => ({
      ...prev,
      stage5: {
        ...prev.stage5,
        paper1: {
          ...prev.stage5.paper1,
          [qKey]: {
            ...prev.stage5.paper1[qKey],
            selfScore: score,
            selfChecklist: checklist,
          },
        },
      },
    }));
  };

  const savePaper2Response = (qKey: 'q1' | 'q2' | 'q3' | 'q4', writtenAnswer: string) => {
    setState((prev) => ({
      ...prev,
      stage5: {
        ...prev.stage5,
        paper2: {
          ...prev.stage5.paper2,
          [qKey]: {
            ...prev.stage5.paper2[qKey],
            writtenAnswer,
          },
        },
      },
    }));
  };

  const submitPaper2Question = (qKey: 'q1' | 'q2' | 'q3' | 'q4') => {
    setState((prev) => {
      const updatedP2 = {
        ...prev.stage5.paper2,
        [qKey]: {
          ...prev.stage5.paper2[qKey],
          submitted: true,
          submittedAt: new Date().toISOString(),
        },
      };
      const p1AllSubmitted = (['q1', 'q2', 'q3', 'q4'] as const).every((k) => prev.stage5.paper1[k].submitted);
      const p2AllSubmitted = (['q1', 'q2', 'q3', 'q4'] as const).every((k) => updatedP2[k].submitted);
      const stage5Done = p1AllSubmitted && p2AllSubmitted;

      return {
        ...prev,
        stage5: {
          ...prev.stage5,
          paper2: updatedP2,
        },
        completedStages: stage5Done
          ? Array.from(new Set([...prev.completedStages, 5]))
          : prev.completedStages,
      };
    });
  };

  const savePaper2SelfAssessment = (
    qKey: 'q1' | 'q2' | 'q3' | 'q4',
    score: number,
    checklist: Record<string, boolean>
  ) => {
    setState((prev) => ({
      ...prev,
      stage5: {
        ...prev.stage5,
        paper2: {
          ...prev.stage5.paper2,
          [qKey]: {
            ...prev.stage5.paper2[qKey],
            selfScore: score,
            selfChecklist: checklist,
          },
        },
      },
    }));
  };

  // Stage 6 Actions
  const saveInquiryA = (data: Partial<InquiryAResponse>) => {
    setState((prev) => ({
      ...prev,
      stage6: {
        ...prev.stage6,
        inquiryA: {
          ...prev.stage6.inquiryA,
          ...data,
        },
      },
    }));
  };

  const completeInquiryA = () => {
    setState((prev) => {
      const updatedA = { ...prev.stage6.inquiryA, completed: true };
      const allDone = updatedA.completed && prev.stage6.inquiryB.completed;
      return {
        ...prev,
        stage6: {
          ...prev.stage6,
          inquiryA: updatedA,
        },
        completedStages: allDone
          ? Array.from(new Set([...prev.completedStages, 6]))
          : prev.completedStages,
      };
    });
  };

  const saveInquiryB = (data: Partial<InquiryBResponse>) => {
    setState((prev) => ({
      ...prev,
      stage6: {
        ...prev.stage6,
        inquiryB: {
          ...prev.stage6.inquiryB,
          ...data,
        },
      },
    }));
  };

  const completeInquiryB = () => {
    setState((prev) => {
      const updatedB = { ...prev.stage6.inquiryB, completed: true };
      const allDone = prev.stage6.inquiryA.completed && updatedB.completed;
      return {
        ...prev,
        stage6: {
          ...prev.stage6,
          inquiryB: updatedB,
        },
        completedStages: allDone
          ? Array.from(new Set([...prev.completedStages, 6]))
          : prev.completedStages,
      };
    });
  };

  // Stage 7 Actions
  const saveReflection = (data: Partial<AchieveProgress>) => {
    setState((prev) => ({
      ...prev,
      stage7: {
        ...prev.stage7,
        ...data,
      },
    }));
  };

  const completeStage7 = () => {
    setState((prev) => ({
      ...prev,
      stage7: {
        ...prev.stage7,
        completed: true,
      },
      completedStages: Array.from(new Set([...prev.completedStages, 7])),
    }));
  };

  // Backup & Restore
  const exportProgressJSON = () => {
    const studentName = state.profile?.name?.replace(/[^a-zA-Z0-9]/g, '_') || 'Student';
    const filename = `DS_3.7C_Progress_${studentName}.json`;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importProgressJSON = (fileContent: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(fileContent);
      if (!parsed || parsed.appIdentifier !== 'KMB_DS_3_7C') {
        return {
          success: false,
          message: 'Invalid progress file! This file does not belong to KMB Digital Society 3.7C (Evolution of Robots). Files from other topics (e.g., 3.7A) cannot be imported.',
        };
      }
      setState(parsed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      return {
        success: true,
        message: `Progress for ${parsed.profile?.name || 'Student'} successfully restored!`,
      };
    } catch {
      return {
        success: false,
        message: 'Could not parse the backup file. Please ensure it is a valid JSON file generated from this hub.',
      };
    }
  };

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(defaultState);
  };

  // Derived metrics
  const stageProgress = useMemo(() => {
    const s1Answered = Object.keys(state.stage1.answers).length;
    const s1Percent = state.stage1.completed ? 100 : Math.round((s1Answered / 5) * 100);

    const s2ModulesCompleted = Object.values(state.stage2.modules).filter((m) => m.completed).length;
    const s2Percent = Math.round((s2ModulesCompleted / 5) * 100);

    let s3Activities = 0;
    if (state.stage3.timelineCompleted) s3Activities++;
    if (state.stage3.matchCompleted) s3Activities++;
    if (state.stage3.ethicalCompleted) s3Activities++;
    const s3Percent = Math.round((s3Activities / 3) * 100);

    const s4Answered = Object.keys(state.stage4.answers).length;
    const s4Percent = state.stage4.submitted ? 100 : Math.round((s4Answered / 15) * 100);

    const p1Submitted = (['q1', 'q2', 'q3', 'q4'] as const).filter((k) => state.stage5.paper1[k].submitted).length;
    const p2Submitted = (['q1', 'q2', 'q3', 'q4'] as const).filter((k) => state.stage5.paper2[k].submitted).length;
    const s5Percent = Math.round(((p1Submitted + p2Submitted) / 8) * 100);

    let s6Activities = 0;
    if (state.stage6.inquiryA.completed) s6Activities++;
    if (state.stage6.inquiryB.completed) s6Activities++;
    const s6Percent = Math.round((s6Activities / 2) * 100);

    const s7Percent = state.stage7.completed ? 100 : state.stage7.reflection1 ? 50 : 0;

    const result: Record<number, number> = {
      1: s1Percent,
      2: s2Percent,
      3: s3Percent,
      4: s4Percent,
      5: s5Percent,
      6: s6Percent,
      7: s7Percent,
    };
    return result;
  }, [state]);

  const overallCompletionPercentage = useMemo(() => {
    const sum = Object.values(stageProgress).reduce((acc, curr) => acc + curr, 0);
    return Math.round(sum / 7);
  }, [stageProgress]);

  const estimatedMinutesRemaining = useMemo(() => {
    return STAGES_CONFIG.reduce((acc, stage) => {
      const completionFraction = (stageProgress[stage.id] || 0) / 100;
      const rem = stage.duration * (1 - completionFraction);
      return acc + Math.round(rem);
    }, 0);
  }, [stageProgress]);

  // Combined objective score percentage (Stage 3 Games + Stage 4 Quiz)
  const objectiveScorePercentage = useMemo(() => {
    const s3TimelinePercent = state.stage3.timelineCompleted ? (state.stage3.timelineScore / 6) * 100 : 0;
    const s3MatchPercent = state.stage3.matchCompleted ? (state.stage3.matchScore / 8) * 100 : 0;
    const s3EthicalPercent = state.stage3.ethicalCompleted ? (state.stage3.ethicalScore / 3) * 100 : 0;
    const gamesAverage = (s3TimelinePercent + s3MatchPercent + s3EthicalPercent) / 3;

    const quizScorePercent = state.stage4.submitted ? (state.stage4.bestScore / 15) * 100 : 0;

    if (!state.stage3.timelineCompleted && !state.stage4.submitted) return 0;
    return Math.round((gamesAverage + quizScorePercent) / 2);
  }, [state.stage3, state.stage4]);

  const isCertificateEligible = useMemo(() => {
    const all7StagesDone = [1, 2, 3, 4, 5, 6, 7].every((id) => (stageProgress[id] || 0) === 100);
    return all7StagesDone && objectiveScorePercentage >= 70;
  }, [stageProgress, objectiveScorePercentage]);

  return (
    <ProgressContext.Provider
      value={{
        state,
        setProfile,
        setCurrentStage,
        setActiveSession,
        saveStage1Answer,
        completeStage1,
        saveModuleCheckAnswer,
        markModuleCompleted,
        saveAsimovExercise,
        saveTimelineScore,
        saveMatchScore,
        saveEthicalChoice,
        completeEthicalChallenge,
        saveQuizAnswer,
        submitQuiz,
        retryQuiz,
        savePaper1Response,
        submitPaper1Question,
        savePaper1SelfAssessment,
        savePaper2Response,
        submitPaper2Question,
        savePaper2SelfAssessment,
        saveInquiryA,
        completeInquiryA,
        saveInquiryB,
        completeInquiryB,
        saveReflection,
        completeStage7,
        exportProgressJSON,
        importProgressJSON,
        resetProgress,
        stageProgress,
        overallCompletionPercentage,
        estimatedMinutesRemaining,
        objectiveScorePercentage,
        isCertificateEligible,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
