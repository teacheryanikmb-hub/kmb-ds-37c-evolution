export type KMBClass = 'S25A' | 'S25B' | 'S25F';

export interface StudentProfile {
  name: string;
  studentClass: KMBClass;
  startedAt: string;
  lastActiveAt: string;
}

export interface DiscoverAnswer {
  questionId: number;
  selectedOption: number;
  isCorrect: boolean;
}

export interface LearnModuleProgress {
  moduleId: number;
  completed: boolean;
  checkAnswers: Record<number, number>; // questionIndex -> selectedOption
}

export interface PlayProgress {
  timelineCompleted: boolean;
  timelineScore: number; // out of 100 or 6
  matchCompleted: boolean;
  matchScore: number; // out of 8
  ethicalCompleted: boolean;
  ethicalChoices: Record<number, number>; // scenarioId -> choiceId
  ethicalScore: number; // out of 3
}

export interface QuizProgress {
  answers: Record<number, number>; // questionId -> selectedOption
  submitted: boolean;
  score: number;
  bestScore: number;
  completedAt?: string;
  attemptsCount: number;
}

export interface ExamResponse {
  writtenAnswer: string;
  submitted: boolean;
  selfScore: number;
  maxScore: number;
  selfChecklist: Record<string, boolean>;
  submittedAt?: string;
}

export interface ThinkIBProgress {
  paper1: {
    q1: ExamResponse;
    q2: ExamResponse;
    q3: ExamResponse;
    q4: ExamResponse;
  };
  paper2: {
    q1: ExamResponse;
    q2: ExamResponse;
    q3: ExamResponse;
    q4: ExamResponse;
  };
}

export interface InquiryAResponse {
  technology: string;
  howItWorks: string;
  primaryUsers: string;
  benefits: string;
  limitation: string;
  conclusion: string;
  completed: boolean;
}

export interface InquiryBResponse {
  selectedRuleId: string;
  justification: string;
  stakeholdersImpact: string;
  ethicalJustifiability: string;
  accountability: string;
  reflection: string;
  completed: boolean;
}

export interface AchieveProgress {
  reflection1: string; // greatest impact
  reflection2: string; // significant ethical challenge
  reflection3: string; // command term to improve
  completed: boolean;
}

export interface AppProgressState {
  version: string;
  appIdentifier: 'KMB_DS_3_7C';
  profile: StudentProfile | null;
  currentStage: number; // 1 to 7
  activeSession: 1 | 2 | 3;
  completedStages: number[];
  stage1: {
    answers: Record<number, number>;
    completed: boolean;
  };
  stage2: {
    modules: Record<number, LearnModuleProgress>;
    asimovExercise: {
      choice: number;
      explanation: string;
      completed: boolean;
    };
  };
  stage3: PlayProgress;
  stage4: QuizProgress;
  stage5: ThinkIBProgress;
  stage6: {
    inquiryA: InquiryAResponse;
    inquiryB: InquiryBResponse;
  };
  stage7: AchieveProgress;
}
