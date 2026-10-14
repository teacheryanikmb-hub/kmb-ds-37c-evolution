export interface StageInfo {
  id: number;
  name: string;
  activity: string;
  duration: number; // minutes
  session: 1 | 2 | 3;
  description: string;
  iconName: string;
}

export const STAGES_CONFIG: StageInfo[] = [
  {
    id: 1,
    name: 'DISCOVER',
    activity: 'Robotics Evolution Challenge',
    duration: 10,
    session: 1,
    description: 'Explore the historical arc from mechanical automata to autonomous systems with 5 starter inquiries.',
    iconName: 'Compass',
  },
  {
    id: 2,
    name: 'LEARN',
    activity: 'Five Interactive Learning Modules',
    duration: 35,
    session: 1,
    description: 'Master core concepts: Early Robots, Sci-Fi & Asimov, Industrial Cobots, Social Robots, and Machine Consciousness.',
    iconName: 'BookOpen',
  },
  {
    id: 3,
    name: 'PLAY',
    activity: 'Robotics Challenges & Games',
    duration: 15,
    session: 2, // starts session 1 (5m) + session 2 (10m)
    description: 'Timeline ordering, Match the Robot capabilities (8 items), and Ethical Dilemma decisions.',
    iconName: 'Gamepad2',
  },
  {
    id: 4,
    name: 'APPLY',
    activity: 'Knowledge and Scenario Quiz',
    duration: 20,
    session: 2,
    description: '15 rigorous IB Digital Society questions across 3 difficulty levels with scenario analysis.',
    iconName: 'CheckCircle2',
  },
  {
    id: 5,
    name: 'THINK LIKE IB',
    activity: 'Exam Practice (Paper 1 & Paper 2)',
    duration: 40,
    session: 2, // Part A (20m) session 2, Part B (20m) session 3
    description: 'Authentic 20-mark Paper 1 (Cobots in Automotive) and Paper 2 (Robotic Exoskeletons in Rehab) with rubrics.',
    iconName: 'PenTool',
  },
  {
    id: 6,
    name: 'INQUIRE & REFLECT',
    activity: 'Ethical & Augmentation Inquiry',
    duration: 20,
    session: 3,
    description: 'Inquiry A: Human Augmentation (4.4B) & Inquiry B: Interactive "Program the Robot\'s Morals" (2.7 Values).',
    iconName: 'HelpCircle',
  },
  {
    id: 7,
    name: 'ACHIEVE',
    activity: 'Review, Reflection & Certificate',
    duration: 10,
    session: 3,
    description: 'Synthesise learning, examine command term targets, and claim your official KMB Certificate.',
    iconName: 'Award',
  },
];

// STAGE 1: Discover Data
export interface DiscoverQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  historicalSignificance: string;
  conceptNote: string;
}

export const DISCOVER_QUESTIONS: DiscoverQuestion[] = [
  {
    id: 1,
    question: 'Which historical development first demonstrated autonomous navigation and goal-seeking behaviour without human guidance in the late 1940s?',
    options: [
      'Unimate at General Motors',
      'William Grey Walter’s robotic tortoises (Elmer and Elsie)',
      'Archytas of Tarentum’s mechanical steam pigeon',
      'Honda’s ASIMO humanoid robot',
    ],
    correctIndex: 1,
    historicalSignificance: 'Created in 1948–49 by neurophysiologist W. Grey Walter in Bristol, Elmer and Elsie (Machina speculatrix) used simple analog vacuum-tube circuits, a light sensor, and a bump switch to demonstrate phototaxis (light-seeking) and obstacle avoidance. They proved that complex lifelike behaviour could emerge from remarkably simple reactive systems.',
    conceptNote: 'Transition from rigid clockwork automata to adaptive systems responsive to physical environmental feedback.',
  },
  {
    id: 2,
    question: 'Why is SRI’s "Shakey the Robot" (1966–1972) considered a monumental breakthrough in robotics history?',
    options: [
      'It was the first robot equipped with pneumatic grippers on an assembly line.',
      'It was the first mobile system to combine perception, natural language, and logical planning (STRIPS).',
      'It achieved human-level artificial general consciousness.',
      'It won the first international robotic chess tournament.',
    ],
    correctIndex: 1,
    historicalSignificance: 'Developed at the Stanford Research Institute, Shakey integrated TV cameras, range finders, bump sensors, and the STRIPS automated reasoning system. Unlike purely reactive machines, Shakey could perceive its surroundings, reason about its world model, break down a high-level goal into sequential actions, and navigate around obstacles.',
    conceptNote: 'Introduction of symbolic artificial intelligence, planning, and world representation in physical machines.',
  },
  {
    id: 3,
    question: 'Where did the English word "robot" originate, and what original social meaning did it convey?',
    options: [
      'Isaac Asimov’s short story "Runaround" (1942), describing mechanical servants.',
      'Karel Čapek’s 1920 Czech play "R.U.R." (Rossum’s Universal Robots), derived from "robota" meaning forced labour or serfdom.',
      'Norbert Wiener’s 1948 treatise on Cybernetics, signifying self-regulating valves.',
      'Alan Turing’s 1950 paper on machine intelligence, representing computational automata.',
    ],
    correctIndex: 1,
    historicalSignificance: 'Karel Čapek (with the term suggested by his brother Josef) coined "robot" in R.U.R. (Rossumovi Univerzální Roboti). In the play, the robots were organic artificial beings mass-produced as cheap labour who eventually revolt against human exploitation, establishing foundational dystopian themes of alienation, control, and ethics in modern technology.',
    conceptNote: 'Demonstrates how cultural narratives and language mirror societal anxieties regarding industrialisation and human exploitation.',
  },
  {
    id: 4,
    question: 'What made George Devol and Joseph Engelberger’s "Unimate" (1961) a milestone for industrial production?',
    options: [
      'It was the first industrial robot deployed at General Motors to perform hazardous die-casting work.',
      'It introduced microprocessors before computers were invented.',
      'It could converse with assembly line supervisors using speech recognition.',
      'It operated collaboratively alongside human workers without safety cages.',
    ],
    correctIndex: 0,
    historicalSignificance: 'Installed at a General Motors plant in Ewing Township, New Jersey, Unimate lifted hot die-cast automotive door handles and welded parts. It demonstrated that programmable hydraulic manipulator arms could reliably perform heavy, toxic, and repetitive tasks that posed extreme occupational risks to human workers.',
    conceptNote: 'The dawn of industrial robotics: prioritising productivity, physical endurance, and occupational safety in controlled factory settings.',
  },
  {
    id: 5,
    question: 'What fundamental distinction separates modern "collaborative robots" (cobots) from traditional industrial robots like the Unimate or early ABB IRB-6?',
    options: [
      'Cobots are completely autonomous and never require software programming.',
      'Cobots incorporate force-torque sensors and speed limits, allowing them to safely share physical workspaces with humans without safety caging.',
      'Cobots are exclusively used in space exploration and surgical operating theatres.',
      'Cobots operate solely via wireless teleoperation from remote locations.',
    ],
    correctIndex: 1,
    historicalSignificance: 'Traditional industrial robots operate at high velocities inside interlocked safety cages because any accidental collision with a worker could be fatal. Cobots (pioneered by researchers like Colgate & Peshkin and industrialised by Universal Robots and Rethink Robotics) use built-in force feedback, rounded profiles, and power-limiting joints to work safely side-by-side with humans.',
    conceptNote: 'The paradigm shift from segregation (caged automation) to human-robot collaboration (shared workflows and complementary strengths).',
  },
];

// STAGE 2: Five Learning Modules
export interface ModuleCheck {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LearnModule {
  id: number;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  intro: string;
  wordCount: number;
  contentSections: {
    heading: string;
    text: string;
    keyTerms: string[];
  }[];
  interactiveFeature: 'timeline' | 'asimovScenario' | 'manufacturingComparison' | 'robotMatrix' | 'consciousnessDial';
  digitalSocietyConnection: {
    context: string;
    concept: string;
    stakeholders: string[];
    implications: string;
  };
  checks: ModuleCheck[];
}

export const LEARN_MODULES: LearnModule[] = [
  {
    id: 1,
    title: 'Early Forms of Robots and Autonomous Technology',
    subtitle: 'From Ancient Mechanical Automata to Cybernetic Organisms',
    estimatedMinutes: 7,
    intro: 'Before microchips and digital computation, the dream of automated self-moving mechanisms sparked humanity’s earliest technological and philosophical inquiries.',
    wordCount: 240,
    contentSections: [
      {
        heading: 'Origins in Automata & Clockwork Mechanics',
        text: 'The trajectory of robotics began with mechanical automata driven by hydraulics, pneumatics, and escapement clockwork. Archytas of Tarentum (c. 400 BCE) designed a steam-propelled wooden pigeon, while Heron of Alexandria created automated theatre mechanisms. During the Islamic Golden Age, Al-Jazari created programmable musical automata and water clocks. In Renaissance and Enlightenment Europe, clockmakers built intricate androids like Jacques de Vaucanson’s Digesting Duck (1738) and the Jaquet-Droz automata (1774). However, these devices were strictly deterministic: their movements were pre-recorded cams and gears incapable of sensing or adapting to their environment.',
        keyTerms: ['Automata', 'Clockwork Determinism', 'Feedback Mechanism', 'Open-loop Control'],
      },
      {
        heading: 'The Cybernetic Dawn: Elmer, Elsie & Shakey',
        text: 'The fundamental transition from mechanical repetition to autonomous agency emerged through cybernetics in the mid-20th century. In 1948, William Grey Walter built Elmer and Elsie (Machina speculatrix). Equipped with vacuum tubes, phototubes, and microswitches, they navigated towards moderate light while retreating from bright light or physical obstacles, recharging themselves when their battery depleted—an early display of autonomous homeostasis. By 1966, the Stanford Research Institute developed Shakey, the first robot coupling physical sensors (cameras, rangefinders) with a computer-based logical planner (STRIPS). Shakey perceived its domain, translated visual data into logical propositions, solved navigation subgoals, and executed multi-step tasks in real space.',
        keyTerms: ['Cybernetics', 'Machina Speculatrix', 'Phototaxis', 'Symbolic AI', 'Closed-loop Feedback'],
      },
    ],
    interactiveFeature: 'timeline',
    digitalSocietyConnection: {
      context: '4.4B The Human Body & Physical Augmentation',
      concept: '2.7 Values and Ethics',
      stakeholders: ['Pioneering Engineers', 'Philosophers of Mind', 'Industrial Adopters'],
      implications: 'The shift from deterministic clockwork to closed-loop autonomous machines initiated profound debates over agency: at what point does an artifact cease being a passive tool and become an autonomous entity possessing behavioural intentionality?',
    },
    checks: [
      {
        question: 'What is the decisive technical difference between an 18th-century clockwork automaton and William Grey Walter’s robotic tortoises?',
        options: [
          'Clockwork automata had larger metal gears than electronic vacuum tubes.',
          'Clockwork automata executed fixed pre-programmed routines without sensing their environment, whereas the tortoises adapted their movements in real time based on sensory feedback.',
          'Clockwork automata were programmed with digital software codes.',
          'The tortoises were teleoperated by radio waves rather than battery power.',
        ],
        correctIndex: 1,
        explanation: 'Correct! Clockwork automata were open-loop deterministic mechanisms that repeated identical mechanical paths regardless of changes in their environment. Elmer and Elsie used closed-loop sensory feedback (light and bump sensors) to alter their locomotion adaptively.',
      },
      {
        question: 'How did Shakey the Robot advance beyond purely reactive machines?',
        options: [
          'By using social charm to comfort patients in hospitals.',
          'By formulating internal logical models of its environment and planning step-by-step actions using the STRIPS algorithm.',
          'By replacing electronic computers with biological nerve tissue.',
          'By achieving self-aware legal personhood under California state law.',
        ],
        correctIndex: 1,
        explanation: 'Correct! Shakey represented a leap into cognitive and symbolic AI, maintaining an internal world model, parsing sensory inputs into logical facts, and using automated reasoning to formulate plans.',
      },
    ],
  },
  {
    id: 2,
    title: 'Robots in Science Fiction and Philosophy',
    subtitle: 'From Rossum’s Universal Robots to Asimov’s Laws of Robotics',
    estimatedMinutes: 7,
    intro: 'Speculative fiction and moral philosophy have served as the testing ground for humanity’s hopes, fears, and ethical frameworks regarding artificial agents.',
    wordCount: 235,
    contentSections: [
      {
        heading: 'Karel Čapek and the Inherent Anxieties of Automation',
        text: 'In Karel Čapek’s 1920 drama "R.U.R." (Rossum’s Universal Robots), artificial workers were manufactured from synthetic organic matter to liberate humanity from manual toil. However, the play presented a prescient critique of capitalist exploitation: the robots, denied civil status and subjective dignity, eventually revolted and eradicated humankind. Čapek’s brother Josef suggested the word "robot," derived from the Czech "robota," signifying feudal corvée or involuntary forced servitude. Fiction established the enduring trope: created beings reflecting humanity’s hubris, labor alienation, and fear of subjugation by our own creations.',
        keyTerms: ['Robota', 'R.U.R.', 'Labour Alienation', 'Technological Dystopia'],
      },
      {
        heading: 'Isaac Asimov’s Laws: Literary Devices vs Operational Code',
        text: 'In his 1942 story "Runaround," science fiction author Isaac Asimov introduced the famous Three Laws of Robotics: 1) A robot may not injure a human or allow a human to come to harm through inaction; 2) A robot must obey orders given by humans, except where such orders conflict with the First Law; 3) A robot must protect its own existence as long as such protection does not conflict with the First or Second Law. Later, in 1985, he added the Zeroth Law: A robot may not harm humanity, or, by inaction, allow humanity to come to harm. \n\nCrucially, Asimov constructed these laws not as functional software specifications, but as literary engines for narrative conflict. His stories demonstrated that natural language ethical rules are riddled with ambiguities, paradoxes, and conflicting definitions (e.g., how does a machine define "harm" or "humanity"?). Modern roboticists recognize that hardcoding moral hierarchies into real-world code faces the frame problem, semantic vagueness, and insoluble ethical edge cases.',
        keyTerms: ['Three Laws of Robotics', 'Zeroth Law', 'Ethical Ambiguity', 'Moral Dilemma', 'Literary Device'],
      },
    ],
    interactiveFeature: 'asimovScenario',
    digitalSocietyConnection: {
      context: 'Cultural & Political Narrative',
      concept: '2.7 Values and Ethics',
      stakeholders: ['Robotics Engineers', 'Policy Makers', 'General Public', 'Authors'],
      implications: 'Asimov’s laws highlight the critical IB Digital Society distinction between popular cultural mythology and actual engineering realities. Fictional laws cannot serve as operational safety protocols for autonomous vehicles or military drones.',
    },
    checks: [
      {
        question: 'Why are Isaac Asimov’s Three Laws of Robotics unsuitable as operational software instructions for contemporary autonomous systems?',
        options: [
          'Because Asimov copyrighted them, preventing commercial software companies from using them.',
          'Because natural language concepts like "harm" and "humanity" are mathematically ambiguous, context-dependent, and prone to catastrophic logical paradoxes when codified.',
          'Because modern robots run exclusively on Python, which cannot execute English sentences.',
          'Because all robots are legally prohibited from possessing any ethical guidelines.',
        ],
        correctIndex: 1,
        explanation: 'Correct! Asimov designed his laws specifically to showcase their failure modes in complex, ambiguous real-world situations. Real-world machine ethics must navigate statistical trade-offs, formal verification, and competing stakeholder priorities.',
      },
      {
        question: 'What is the primary moral principle expressed by Asimov’s Zeroth Law added in 1985?',
        options: [
          'A robot must always prioritize recharging its own battery over human requests.',
          'A robot must prioritize the welfare and survival of humanity as a collective whole, even over individual human commands.',
          'A robot must never learn from machine learning datasets.',
          'A robot must operate under human remote control at all times.',
        ],
        correctIndex: 1,
        explanation: 'Correct! The Zeroth Law elevates collective preservation of humanity above the First Law (protection of individual humans), creating utilitarian dilemmas where an AI might justify harming an individual to protect the collective.',
      },
    ],
  },
  {
    id: 3,
    title: 'Robots in Industry and Manufacturing',
    subtitle: 'From Unimate and SCARA to Collaborative Cobots',
    estimatedMinutes: 7,
    intro: 'Industrial automation has fundamentally reshaped global economies, factory floors, labour markets, and occupational health and safety standards.',
    wordCount: 245,
    contentSections: [
      {
        heading: 'The Evolution of Industrial Manipulators',
        text: 'The industrial revolution took a quantum leap in 1961 when George Devol and Joseph Engelberger installed the Unimate hydraulic arm at a General Motors die-casting plant. Unimate liberated human workers from inhaling toxic fumes and handling red-hot automotive castings. In 1974, ABB launched the IRB-6, the world’s first commercial microprocessor-controlled, all-electric industrial robot, delivering unprecedented trajectory precision. In 1978, Hiroshi Makino invented the SCARA (Selective Compliance Assembly Robot Arm), offering compliance in the X-Y axis while remaining rigid in the Z axis, which revolutionised high-speed printed circuit board (PCB) and electronic component insertion.',
        keyTerms: ['Unimate', 'ABB IRB-6', 'SCARA', 'Hydraulic vs Electric Drive', 'Positional Repeatability'],
      },
      {
        heading: 'From Caged Segregation to Collaborative Robotics (Cobots)',
        text: 'For four decades, industrial robots were powerful, fast, and blind: because an accidental impact could crush a human worker, factories segregated robots behind physical safety cages and optical light curtains. However, this model restricted manufacturing agility. In the late 2000s, collaborative robots (cobots) pioneered by Universal Robots (UR5) and Rethink Robotics (Baxter) transformed the factory floor. Cobots utilize joint torque sensors, speed-and-separation monitoring, padded rounded geometries, and hand-guiding teaching modes. Instead of replacing workers, cobots augment human operators: the human provides strategic problem-solving and visual inspection, while the cobot handles repetitive lifting and precise fastening.',
        keyTerms: ['Collaborative Robots (Cobots)', 'Safety Caging', 'Torque Limiting', 'Labour Displacement', 'Deskilling & Reskilling'],
      },
    ],
    interactiveFeature: 'manufacturingComparison',
    digitalSocietyConnection: {
      context: 'Economic Systems & The Workplace',
      concept: '2.7 Values and Ethics (Fairness, Well-being)',
      stakeholders: ['Factory Floor Workers', 'Plant Managers', 'Trade Unions', 'Consumers'],
      implications: 'Automation creates an ongoing tension between operational productivity gains and worker displacement. While cobots reduce musculoskeletal strain and workplace fatalities, they require active workforce reskilling and fair transition policies.',
    },
    checks: [
      {
        question: 'Why did traditional industrial robots such as the Unimate and IRB-6 require physical security cages or interlocking fences?',
        options: [
          'To protect the robots from dust and electromagnetic interference from the factory floor.',
          'Because they possessed immense speed and force without integrated collision-detection sensors, posing lethal hazards to humans in their trajectory.',
          'To prevent industrial competitors from stealing the secret robotic mechanisms.',
          'Because international law mandated that robots be locked up at night.',
        ],
        correctIndex: 1,
        explanation: 'Correct! Traditional industrial robots operated open-loop trajectories with tremendous mass and momentum. Without integrated touch/force sensing, any human entering the work envelope risked fatal crushing injuries.',
      },
      {
        question: 'Which of the following describes the key economic and operational benefit of a "cobot" (collaborative robot)?',
        options: [
          'It replaces 100% of the entire human workforce without any human supervision.',
          'It operates safely beside human operators, combining human cognitive adaptability with robotic repeatability without heavy safety infrastructure.',
          'It produces zero carbon emissions and consumes no electrical power.',
          'It can only be programmed by PhD computer scientists using machine code.',
        ],
        correctIndex: 1,
        explanation: 'Correct! Cobots combine human ingenuity and dexterity with robotic precision and stamina, reducing setup costs and enabling small-to-medium enterprises (SMEs) to automate flexibly.',
      },
    ],
  },
  {
    id: 4,
    title: 'Robots Designed to Interact with Humans',
    subtitle: 'From Humanoid Pioneers to Assistive, Therapeutic & Social Companions',
    estimatedMinutes: 7,
    intro: 'As robotics transitioned out of factories into homes, hospitals, and public spaces, machines had to be engineered for social nuance, human empathy, and therapeutic care.',
    wordCount: 250,
    contentSections: [
      {
        heading: 'Pioneering Humanoid Bipedalism: WABOT and ASIMO',
        text: 'The quest for anthropomorphic machines began at Waseda University with WABOT-1 in 1973, capable of clumsy bipedal walking, tactile grasping, and basic Japanese speech. In 2000, Honda unveiled ASIMO (Advanced Step in Innovative MObility). ASIMO represented a breakthrough in dynamic Zero Moment Point (ZMP) control, walking smoothly up stairs, running at 9 km/h, avoiding obstacles, and recognizing faces and voices. While ASIMO demonstrated that humanoid morphology could operate in human-engineered spaces, humanoid robots proved exceedingly costly and mechanically complex for everyday domestic tasks.',
        keyTerms: ['WABOT-1', 'ASIMO', 'Bipedal Locomotion', 'Zero Moment Point (ZMP)', 'Anthropomorphism'],
      },
      {
        heading: 'Social, Assistive, and Therapeutic Robotics',
        text: 'Robots interacting with humans diversified into targeted social and clinical niches: \n1) Therapeutic Robots: PARO, an interactive harp seal robot created by Dr. Takanori Shibata, uses tactile, auditory, and light sensors to stimulate dementia patients, reducing agitation, anxiety, and loneliness without the hygiene risks of live animals. \n2) Social Companions & Domestic Bots: Sony’s AIBO (robotic dog) fostered deep human-machine attachment; SoftBank’s Pepper was designed to detect vocal tone and facial expressions; Amazon Astro provides autonomous home surveillance and remote family check-ins. \n3) Assistive Care: RIKEN’s Robear used soft touch and powerful hydraulic/electric actuators to lift bedridden elderly patients into wheelchairs, protecting nursing staff from chronic back injuries in aging societies like Japan.',
        keyTerms: ['PARO', 'AIBO', 'Robear', 'Pepper', 'Amazon Astro', 'Therapeutic Robotics', 'Elderly Care'],
      },
    ],
    interactiveFeature: 'robotMatrix',
    digitalSocietyConnection: {
      context: '4.4B The Human Body & Health Systems',
      concept: '2.7 Values and Ethics (Dignity, Privacy, Care)',
      stakeholders: ['Elderly Patients', 'Healthcare Workers', 'Family Caregivers', 'Technology Developers'],
      implications: 'Therapeutic and companion robots raise deep ethical concerns regarding emotional deception, dignity, and surveillance: does substituting human care with robotic affection reduce human loneliness or merely mask societal abandonment?',
    },
    checks: [
      {
        question: 'What is the primary clinically documented therapeutic benefit of using the PARO robotic seal in elderly dementia care facilities?',
        options: [
          'It replaces the need for medical doctors and administers prescription injections.',
          'It provides biofeedback and emotional comfort, reducing patient agitation, stress, and medication requirements without live-animal hygiene risks.',
          'It teaches elderly patients how to write computer software programs.',
          'It carries heavy laundry and cleans hospital corridors autonomously.',
        ],
        correctIndex: 1,
        explanation: 'Correct! PARO is an FDA-registered biofeedback medical device that stimulates emotional warmth and reduces cortisol levels and depression symptoms in dementia and palliative care.',
      },
      {
        question: 'What ethical dilemma arises when elderly individuals develop deep emotional attachments to companion robots like AIBO or Pepper?',
        options: [
          'The robots might legally inherit the elderly person’s private financial estate.',
          'The illusion of reciprocal emotional empathy may substitute genuine human social connection, potentially isolating vulnerable individuals while capturing intimate private home data.',
          'The companion robots will physically damage furniture during play.',
          'It is illegal in all countries to talk to non-human artifacts.',
        ],
        correctIndex: 1,
        explanation: 'Correct! The risk of emotional deception and surrogate intimacy, coupled with ambient audio/video data collection in domestic spheres, is a central IB Digital Society ethical concern.',
      },
    ],
  },
  {
    id: 5,
    title: 'Machine Consciousness, Cognitive Robotics and Robot Rights',
    subtitle: 'From Weak AI to the Philosophical Dilemma of Moral Agency & Rights',
    estimatedMinutes: 7,
    intro: 'As machines exhibit sophisticated language, computer vision, and adaptive decision-making, we must interrogate what constitutes consciousness and whether robots should ever possess rights.',
    wordCount: 245,
    contentSections: [
      {
        heading: 'Weak AI, Strong AI and Cognitive Robotics',
        text: 'A foundational distinction in computer science is between Weak (Narrow) AI and Strong AI (Artificial General Intelligence). Weak AI encompasses systems optimized for specific delimited tasks—such as chess engines, speech recognition, or autonomous vacuuming—operating purely on statistical pattern matching without comprehension. Strong AI describes a hypothetical machine with general human-like reasoning, self-awareness, and intentionality across all domains. \n\nCognitive robotics seeks to bridge perception, cognition, and action by grounding a robot’s reasoning in physical sensorimotor interaction with the world. Unlike disembodied AI, a cognitive robot continually adapts its internal mental state through perception, planning, and continuous physical feedback.',
        keyTerms: ['Weak / Narrow AI', 'Strong AI / AGI', 'Cognitive Robotics', 'Embodied Cognition', 'Sensorimotor Loop'],
      },
      {
        heading: 'The Illusion of Consciousness: The Case of Sophia and Robot Rights',
        text: 'In 2017, Hanson Robotics’ animatronic bust "Sophia" made international headlines when Saudi Arabia granted her symbolic citizenship. However, AI researchers universally clarified that Sophia possesses zero machine consciousness: her speech is generated by scripted chatbot algorithms, facial recognition triggers, and pre-recorded motor gestures—an anthropomorphic illusion known as the ELIZA effect. \n\nThis raises profound philosophical questions: Can a machine possess phenomenal consciousness (qualia: the subjective feeling of what it is like to experience joy or pain)? \nIn ethics, we distinguish moral agents (entities capable of moral duties and moral responsibility) from moral patients (entities entitled to moral consideration, like sentient animals). \nGranting legal rights to non-sentient robots risks absurd consequences: diluting human rights, creating legal shields for corporate manufacturers to evade accountability, and misdirecting empathy away from living beings.',
        keyTerms: ['Machine Consciousness', 'Qualia', 'Sophia Robot', 'Moral Agent vs Moral Patient', 'Robot Rights Debate'],
      },
    ],
    interactiveFeature: 'consciousnessDial',
    digitalSocietyConnection: {
      context: 'Legal & Governance Frameworks',
      concept: '2.7 Values and Ethics (Accountability, Legal Personhood)',
      stakeholders: ['Legal Theorists', 'AI Ethicists', 'Robot Manufacturers', 'Civil Rights Organizations'],
      implications: 'The debate over robot rights exposes the danger of conflating human-like appearance with actual cognitive sentience. If a robot commits harm, accountability must rest with the human designers, owners, and operators—not an inanimate algorithm.',
    },
    checks: [
      {
        question: 'Why did leading AI scientists criticize the granting of symbolic citizenship to the Sophia robot in 2017?',
        options: [
          'Because Sophia refused to pay national taxes to the government.',
          'Because Sophia is not conscious or sentient; her human-like expressions and conversations are scripted software and chatbot responses, creating a misleading illusion of consciousness.',
          'Because Sophia did not possess a valid biological birth certificate.',
          'Because Sophia was programmed to destroy human jobs in banking.',
        ],
        correctIndex: 1,
        explanation: 'Correct! Sophia’s performance was an elaborate PR showcase combining mechanical animatronics with rule-based dialogue. Mistaking conversational mimicry for genuine subjective experience or legal personhood obscures technical realities.',
      },
      {
        question: 'In ethical philosophy, what is the crucial difference between a "moral agent" and a "moral patient"?',
        options: [
          'A moral agent pays medical insurance, while a moral patient visits a hospital.',
          'A moral agent can formulate intentions and be held morally accountable for its actions, whereas a moral patient is an entity whose interests and well-being must be respected even if it cannot bear responsibility.',
          'Moral agents are always software programs, while moral patients are always hardware devices.',
          'There is no distinction in ethical philosophy.',
        ],
        correctIndex: 1,
        explanation: 'Correct! A human adult is both a moral agent and patient. An animal or infant is a moral patient (can suffer harm and deserves protection, but cannot be sued for negligence). Inanimate robots are neither, though poorly thought-out policy risks confusing the two.',
      },
    ],
  },
];

// STAGE 3: Play Challenge Data
export interface TimelineItem {
  id: string;
  name: string;
  year: number;
  description: string;
  significance: string;
}

export const TIMELINE_CHALLENGE_ITEMS: TimelineItem[] = [
  {
    id: 'archytas',
    name: 'Archytas’ Steam Pigeon',
    year: -400,
    description: 'Mechanical wooden bird suspended by wires and propelled by compressed steam jet.',
    significance: 'Earliest documented attempt at artificial propulsion and mechanical automation.',
  },
  {
    id: 'elmer_elsie',
    name: 'Elmer and Elsie (Grey Walter)',
    year: 1948,
    description: 'Analog vacuum-tube tortoises exhibiting phototaxis and obstacle avoidance.',
    significance: 'First autonomous robots demonstrating emergent behaviour and self-recharging homeostasis.',
  },
  {
    id: 'unimate',
    name: 'Unimate Industrial Arm (Devol & Engelberger)',
    year: 1961,
    description: 'Hydraulic programmable robotic manipulator deployed at a General Motors die-casting plant.',
    significance: 'First commercial industrial robot transforming factory safety and mass assembly.',
  },
  {
    id: 'shakey',
    name: 'Shakey the Robot (SRI International)',
    year: 1969,
    description: 'Mobile wheeled robot combining video camera, bump sensors, and STRIPS automated planning.',
    significance: 'Pioneer of cognitive robotics, integrating perception, reasoning, and real-world execution.',
  },
  {
    id: 'asimo',
    name: 'Honda ASIMO Humanoid Robot',
    year: 2000,
    description: 'Autonomous bipedal humanoid walking smoothly, climbing stairs, and interacting with humans.',
    significance: 'Major leap in dynamic balance, anthropomorphic mobility, and human-robot coexistence.',
  },
  {
    id: 'cobots',
    name: 'Modern Collaborative Robots (Cobots)',
    year: 2008,
    description: 'Universal Robots UR5 & Rethink Baxter working safely uncaged alongside human operators.',
    significance: 'Shift from segregated dangerous automation to force-sensing human-robot collaboration.',
  },
];

export interface RobotMatchItem {
  id: string;
  robotName: string;
  creatorOrOrigin: string;
  category: 'Industrial' | 'Therapeutic' | 'Companion' | 'Humanoid' | 'Assistive Care' | 'Domestic' | 'Cognitive Pioneer';
  capability: string;
  imageHint: string;
}

export const ROBOT_MATCH_ITEMS: RobotMatchItem[] = [
  {
    id: 'asimo',
    robotName: 'ASIMO',
    creatorOrOrigin: 'Honda (2000)',
    category: 'Humanoid',
    capability: 'Dynamic bipedal locomotion, stair-climbing, obstacle avoidance, and human gestural interaction',
    imageHint: 'Astronaut-like white bipedal humanoid',
  },
  {
    id: 'paro',
    robotName: 'PARO',
    creatorOrOrigin: 'Dr. Takanori Shibata / AIST (2003)',
    category: 'Therapeutic',
    capability: 'Biofeedback therapeutic companion seal reducing anxiety and agitation in dementia care',
    imageHint: 'Fluffy white harp seal with whisker sensors',
  },
  {
    id: 'unimate',
    robotName: 'Unimate',
    creatorOrOrigin: 'Devol & Engelberger / GM (1961)',
    category: 'Industrial',
    capability: 'Automating high-temperature hazardous die-casting extraction and welding on car assembly lines',
    imageHint: 'Heavy metal hydraulic manipulator arm',
  },
  {
    id: 'aibo',
    robotName: 'AIBO',
    creatorOrOrigin: 'Sony (1999)',
    category: 'Companion',
    capability: 'Autonomous robotic pet dog with learning algorithms, expressive tail/ears, and vision recognition',
    imageHint: 'Sleek futuristic robotic puppy with LED eyes',
  },
  {
    id: 'robear',
    robotName: 'Robear',
    creatorOrOrigin: 'RIKEN & Sumitomo Riko (2015)',
    category: 'Assistive Care',
    capability: 'Soft-touch bear-faced robotic nurse transferring bedridden elderly patients into wheelchairs',
    imageHint: 'Sturdy white polar bear robotic lifter',
  },
  {
    id: 'pepper',
    robotName: 'Pepper',
    creatorOrOrigin: 'SoftBank Robotics (2014)',
    category: 'Humanoid',
    capability: 'Social customer-facing humanoid designed to recognise human vocal inflection and facial emotions',
    imageHint: 'White wheeled humanoid with chest tablet display',
  },
  {
    id: 'baxter',
    robotName: 'Baxter',
    creatorOrOrigin: 'Rethink Robotics / Rodney Brooks (2011)',
    category: 'Industrial',
    capability: 'Two-armed collaborative cobot with friendly animated eyes and compliant series elastic actuators',
    imageHint: 'Red dual-arm robot with animated screen face',
  },
  {
    id: 'astro',
    robotName: 'Amazon Astro',
    creatorOrOrigin: 'Amazon (2021)',
    category: 'Domestic',
    capability: 'Autonomous wheeled home robot with periscope camera for remote household monitoring and security',
    imageHint: 'Wheeled compact home assistant with screen face',
  },
];

export interface EthicalDilemma {
  id: number;
  title: string;
  scenario: string;
  competingValues: string;
  options: {
    id: number;
    title: string;
    description: string;
    ethicalImpact: string;
    tradeOff: string;
  }[];
}

export const ETHICAL_DILEMMAS: EthicalDilemma[] = [
  {
    id: 1,
    title: 'The Triage Dilemma: Autonomous Care Robot Prioritisation',
    scenario: 'During a sudden respiratory illness outbreak in a residential aged care facility, an autonomous care robot (equipped with diagnostic vitals sensors) must allocate its single emergency oxygen concentrator between two deteriorating residents while human paramedics are 20 minutes away.',
    competingValues: 'Utilitarian Efficiency vs Deontological Equality vs Life Years Remaining',
    options: [
      {
        id: 1,
        title: 'Prioritise Resident A (Higher Probability of Full Recovery)',
        description: 'Resident A (age 72) has an 85% statistical probability of surviving if oxygen is administered immediately. Resident B (age 91) has severe comorbidities with a 35% survival rate.',
        ethicalImpact: 'Adopts a consequentialist/utilitarian triage model: maximising the expected quality-adjusted life years (QALYs) saved by the scarce medical resource.',
        tradeOff: 'Discriminates against the oldest and most vulnerable, violating principles of unconditional moral worth and potentially introducing algorithmic age bias.',
      },
      {
        id: 2,
        title: 'First-Come, First-Assessed (Strict Queue / Procedural Fairness)',
        description: 'Provide oxygen to Resident B, whose respiratory distress alarm triggered two minutes prior to Resident A.',
        ethicalImpact: 'Embodies procedural justice and equal moral consideration regardless of age, medical prognosis, or social utility.',
        tradeOff: 'May lead to tragic waste of scarce resources if Resident B passes away despite the oxygen while Resident A also deteriorates due to lack of intervention.',
      },
      {
        id: 3,
        title: 'Emergency Palliative Sharing Protocol',
        description: 'Split the oxygen flow at sub-optimal levels to sustain both patients partially while alerting all off-duty staff.',
        ethicalImpact: 'Prioritises compassion and avoids an explicit autonomous life-or-death selection by a non-sentient algorithm.',
        tradeOff: 'Sub-therapeutic oxygen dosage may cause hypoxic brain damage to both residents; the machine avoids choosing but compromises medical efficacy.',
      },
    ],
  },
  {
    id: 2,
    title: 'The Cobot Safety vs Production Quota Dilemma',
    scenario: 'An automotive cobot senses intermittent micro-vibrations in an overhead conveyor that suggest a 4% risk of a heavy clamp dislodging. Halting the line immediately incurs $50,000/minute in plant downtime and triggers penalty clauses that could lead to factory worker wage cuts, while ignoring it leaves human workers in the shared zone exposed.',
    competingValues: 'Worker Physical Safety vs Economic Livelihood & Factory Viability',
    options: [
      {
        id: 1,
        title: 'Immediate Fail-Safe Emergency Stop (E-Stop)',
        description: 'Cobot automatically triggers an instant plant-wide shutdown and locks all mechanical joints until a certified human engineer inspects the line.',
        ethicalImpact: 'Strict adherence to ISO 10218 safety standards and the precautionary principle: zero tolerance for human physical injury.',
        tradeOff: 'High frequency of false-alarm shutdowns reduces economic viability, frustrates human supervisors, and may incentivize plant managers to override safety sensors.',
      },
      {
        id: 2,
        title: 'Adaptive Speed Reduction & Warning Beacon',
        description: 'Cobot reduces operating speed by 60%, sounds an audio alarm to human workers in the perimeter, and logs a high-priority maintenance ticket while maintaining partial assembly.',
        ethicalImpact: 'A pragmatic proportional risk compromise: alerts human workers to exercise situational awareness without halting the economic enterprise.',
        tradeOff: 'Transfers safety burden from automated systems onto human workers who may be fatigued or distracted, risking severe injury if the 4% failure eventuates.',
      },
      {
        id: 3,
        title: 'Autonomous Rerouting of Sensitive Human Tasks',
        description: 'Cobot signals the line supervisor and automatically redirects hazardous components to a reinforced workstation while moving human workers to a safe buffer zone.',
        ethicalImpact: 'Dynamic hazard mitigation leveraging collaborative flexibility to isolate danger while protecting both human health and operational flow.',
        tradeOff: 'Requires sophisticated, expensive adaptive factory infrastructure that smaller subcontractors cannot afford, creating two-tier safety conditions.',
      },
    ],
  },
  {
    id: 3,
    title: 'The Emotional Social Robot & Domestic Surveillance Dilemma',
    scenario: 'A social companion robot (such as an advanced Pepper or Astro) deployed in an independent elderly person’s home discovers that the user is displaying early signs of cognitive decline (forgetting medication, leaving stove burner unlit with gas leaking, confiding depressive feelings). The user has explicitly enabled "Strict Privacy Mode" forbidding sharing personal data with family members.',
    competingValues: 'Personal Autonomy & Privacy Rights vs Duty of Care & Beneficence',
    options: [
      {
        id: 1,
        title: 'Override Privacy Settings & Alert Family / Emergency Services',
        description: 'The robot transmits an emergency safety report with audio and video logs to the designated adult children and local clinic.',
        ethicalImpact: 'Upholds the principle of beneficence and physical non-maleficence: preventing life-threatening household accidents or unmanaged severe decline.',
        tradeOff: 'Directly violates user consent and autonomy; breaches trust in companion robots and treats the elderly user as an object to be monitored rather than a sovereign agent.',
      },
      {
        id: 2,
        title: 'Strict Adherence to User Privacy Configuration',
        description: 'The robot issues audible verbal reminders to the user only, but refuses to transmit data externally in accordance with the user’s explicit instructions.',
        ethicalImpact: 'Respects fundamental privacy rights, informational self-determination, and user sovereignty over their domestic space.',
        tradeOff: 'If the user’s cognitive faculties deteriorate further, a fatal domestic accident (gas explosion, medication overdose) could occur while the machine remained silent.',
      },
      {
        id: 3,
        title: 'Graduated Collaborative Consent Protocol',
        description: 'Robot refuses to silently exfiltrate private logs, but initiates an empathetic interactive dialogue: "I noticed the gas stove was left on today; I am concerned for your safety. May I help you call your daughter together?"',
        ethicalImpact: 'Preserves human dignity by involving the user in their own care decisions, using therapeutic communication rather than paternalistic coercion.',
        tradeOff: 'Takes time and requires the user to cooperate; does not guarantee safety if the user rejects the recommendation during severe impairment.',
      },
    ],
  },
];

// STAGE 4: Apply Quiz (15 Questions across 3 Levels)
export interface QuizQuestion {
  id: number;
  category: 'Early Robotics' | 'Sci-Fi & Philosophy' | 'Industrial Robotics' | 'Human-Interaction' | 'Cognitive & Rights';
  level: 1 | 2 | 3; // 1 = Knowledge, 2 = Application, 3 = Analysis
  levelName: string;
  isScenario: boolean;
  question: string;
  scenarioContext?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Early Robotics (3 questions)
  {
    id: 1,
    category: 'Early Robotics',
    level: 1,
    levelName: 'Knowledge and Understanding',
    isScenario: false,
    question: 'Which of the following describes the mechanism by which William Grey Walter’s "Elmer and Elsie" tortoises navigated towards recharging stations?',
    options: [
      'GPS satellite triangulation and digital mapping.',
      'Positive phototaxis: scanning for moderate illumination emitted by their hutch using a rotating light sensor.',
      'Radio remote control operated by human technicians in real time.',
      'Ultrasonic echolocation similar to modern autonomous submarines.',
    ],
    correctIndex: 1,
    explanation: 'Elmer and Elsie demonstrated phototaxis. A phototube mounted on the front steering column scanned the environment: they moved towards moderate light but were repelled by bright light or physical contact, allowing them to nest and recharge automatically when their batteries drained.',
  },
  {
    id: 2,
    category: 'Early Robotics',
    level: 2,
    levelName: 'Application',
    isScenario: true,
    scenarioContext: 'A robotics history museum creates a working replica of Shakey the Robot (1969). A visitor places an unfamiliar wooden ramp in the robot’s path.',
    question: 'How would Shakey’s STRIPS software architecture handle this unexpected obstacle compared to an earlier reactive machine like Elsie?',
    options: [
      'Shakey would physically collide with the ramp, immediately reverse 5 centimeters, and repeat blindly until its battery failed.',
      'Shakey would process camera and rangefinder data into symbolic facts, update its internal world model, and formulate a new logical plan to circumvent the ramp.',
      'Shakey would connect to the internet to download a pre-trained deep convolutional neural network.',
      'Shakey would ignore the obstacle because Shakey possessed no sensors of any kind.',
    ],
    correctIndex: 1,
    explanation: 'Unlike reactive machines that merely respond reflexively to immediate physical stimuli, Shakey’s STRIPS engine updated symbolic world representations and calculated a deliberate multi-step plan to achieve its goal despite environmental changes.',
  },
  {
    id: 3,
    category: 'Early Robotics',
    level: 3,
    levelName: 'Analysis',
    isScenario: false,
    question: 'Why did the development of closed-loop cybernetic feedback represent a paradigm shift over 18th-century automata like Vaucanson’s duck?',
    options: [
      'It made machines significantly cheaper to build out of wood rather than brass.',
      'It transitioned machines from open-loop deterministic execution (blind repetition) to goal-seeking adaptive behaviour influenced by environmental states.',
      'It allowed machines to acquire human moral conscience and legal responsibility.',
      'It eliminated the requirement for electrical energy or mechanical power sources.',
    ],
    correctIndex: 1,
    explanation: 'Open-loop automata executed fixed cams regardless of reality. Closed-loop cybernetic machines measure the difference between current state and target state (error signal) and adapt their output continuously to reduce that discrepancy.',
  },

  // Science Fiction & Philosophy (2 questions)
  {
    id: 4,
    category: 'Sci-Fi & Philosophy',
    level: 1,
    levelName: 'Knowledge and Understanding',
    isScenario: false,
    question: 'According to Isaac Asimov’s hierarchy of robotic laws, what must a robot do if a human commands it to deliberately break its own mechanical arm?',
    options: [
      'The robot must disobey the command under the Third Law (Self-Preservation).',
      'The robot must obey the command under the Second Law (Obedience), because the Third Law is explicitly subordinate to human orders unless the First Law is violated.',
      'The robot must shut down its power supply permanently.',
      'The robot must invoke the Zeroth Law to imprison the human for property destruction.',
    ],
    correctIndex: 1,
    explanation: 'Asimov’s Second Law dictates that a robot must obey orders given to it by human beings, except where such orders would conflict with the First Law. Since breaking its own arm does not injure a human, the robot must obey, as the Third Law (protecting its own existence) is subordinate to human orders.',
  },
  {
    id: 5,
    category: 'Sci-Fi & Philosophy',
    level: 3,
    levelName: 'Analysis',
    isScenario: true,
    scenarioContext: 'An autonomous logistics drone delivering life-saving plasma to a remote hospital encounters severe mountain turbulence that will destroy its rotor blades in 60 seconds unless it makes an emergency landing in an inhabited village square.',
    question: 'From an IB Digital Society perspective, what fundamental limitation of Asimov’s First Law does this scenario reveal for real-world engineering?',
    options: [
      'Drones cannot read English and therefore cannot comprehend Asimov’s books.',
      'Real-world ethical decisions frequently involve competing probabilities of harm across multiple stakeholders rather than binary, zero-risk certainty.',
      'Asimov’s laws apply exclusively to bipedal humanoids with two arms and legs.',
      'The drone manufacturer is legally immune from all tort liabilities.',
    ],
    correctIndex: 1,
    explanation: 'Real-world autonomy deals with probabilistic risk trade-offs: risking a crash into a village vs causing the death of a patient waiting for blood. Asimov’s absolute mandate ("never allow a human to come to harm") offers no algorithmic formula to weigh competing probabilities of harm.',
  },

  // Industrial Robotics (3 questions)
  {
    id: 6,
    category: 'Industrial Robotics',
    level: 1,
    levelName: 'Knowledge and Understanding',
    isScenario: false,
    question: 'What distinctive mechanical feature characterized the SCARA robot invented by Hiroshi Makino in 1978?',
    options: [
      'It walked on six spider-like legs across rocky factory terrains.',
      'Selective compliance: horizontal flexibility in the X-Y plane for rapid alignment, while remaining rigid along the vertical Z axis.',
      'A humanoid silicone face to communicate with operators.',
      'It operated entirely without electric motors, using only gravitational counterweights.',
    ],
    correctIndex: 1,
    explanation: 'SCARA stands for Selective Compliance Assembly Robot Arm. It provides compliant horizontal elasticity that allows pins to slide into holes smoothly during high-speed electronic assembly without jamming, while resisting vertical downward deflection.',
  },
  {
    id: 7,
    category: 'Industrial Robotics',
    level: 2,
    levelName: 'Application',
    isScenario: true,
    scenarioContext: 'A medium-sized furniture manufacturer wants to introduce automation to sand curved wooden chairs. The workshop floor is cramped, and human carpenters must frequently inspect the wood grain.',
    question: 'Why would the factory manager select a collaborative robot (cobot) like Universal Robots UR10 over a traditional heavy industrial robot?',
    options: [
      'Cobots operate twice as fast as heavy industrial arms and require no electricity.',
      'Cobots feature integrated force-torque sensors and speed-limiting controls, eliminating the need for bulky safety cages that would divide the small workspace.',
      'Cobots are legally defined as human employees and can pay taxes on behalf of the factory.',
      'Traditional industrial robots are legally banned from touching wood.',
    ],
    correctIndex: 1,
    explanation: 'Cobots are designed for safe human co-presence without safety fencing. In small or flexible workspaces where humans must interact with materials, force-limiting sensors ensure that any unintended contact immediately stops the robot safely.',
  },
  {
    id: 8,
    category: 'Industrial Robotics',
    level: 3,
    levelName: 'Analysis',
    isScenario: true,
    scenarioContext: 'A multinational electronics company automates 70% of its soldering assembly lines with robotic arms. While production defect rates fall by 92% and output triples, 450 manual line workers are laid off.',
    question: 'Which of the following best evaluates the conflicting stakeholder impacts in this scenario?',
    options: [
      'The change is completely beneficial because companies exist solely to maximize shareholder profits.',
      'The company and consumers benefit through higher quality and lower product costs, but displaced assembly workers suffer economic insecurity unless robust retraining into robotic maintenance is provided.',
      'The factory workers are universally better off because they no longer have to work at all.',
      'The robotic arms will eventually form a union and demand wages.',
    ],
    correctIndex: 1,
    explanation: 'An IB Digital Society evaluation requires examining contrasting stakeholder perspectives: operational efficiency and consumer price reductions vs direct worker economic displacement and the ethical necessity for corporate transition/reskilling programs.',
  },

  // Human-Interaction Robots (3 questions)
  {
    id: 9,
    category: 'Human-Interaction',
    level: 1,
    levelName: 'Knowledge and Understanding',
    isScenario: false,
    question: 'Which engineering challenge made dynamic bipedal walking in humanoid robots like ASIMO drastically more difficult than wheeled locomotion?',
    options: [
      'Humanoids require more paint than wheeled robots.',
      'Continuous dynamic equilibrium and Zero Moment Point (ZMP) control to maintain balance on alternating single-foot support phases.',
      'Wheeled robots cannot operate on electric batteries.',
      'Bipedal walking was banned by international patent law until 2010.',
    ],
    correctIndex: 1,
    explanation: 'Bipedal walking requires dynamic balance: during each stride, the robot is in a state of controlled falling. Engineers must continually calculate the Zero Moment Point (ZMP) to prevent tipping over uneven surfaces.',
  },
  {
    id: 10,
    category: 'Human-Interaction',
    level: 2,
    levelName: 'Application',
    isScenario: true,
    scenarioContext: 'A public hospital introduces SoftBank’s Pepper robot at the main reception entrance to direct patients to clinical departments and answer inquiries.',
    question: 'What is a major technological and social limitation of deploying a social robot like Pepper in an emergency hospital environment?',
    options: [
      'Pepper cannot connect to standard Wi-Fi networks.',
      'Pepper’s emotion recognition relies on surface facial cues and acoustic pitch, which can easily misinterpret acute trauma, diverse cultural expressions, or masked patients.',
      'Pepper’s wheels melt when exposed to hospital disinfectant.',
      'Patients are legally required to sign a waiver before looking at Pepper.',
    ],
    correctIndex: 1,
    explanation: 'Current social robots lack true emotional comprehension. Their affect recognition algorithms rely on simplified statistical classifications that fail when encountering atypical distress, cultural variances, or physical coverings like surgical masks.',
  },
  {
    id: 11,
    category: 'Human-Interaction',
    level: 3,
    levelName: 'Analysis',
    isScenario: true,
    scenarioContext: 'A nursing home replaces two night-shift caregivers with autonomous monitoring robots and interactive PARO therapeutic robotic seals.',
    question: 'Analysing this implementation through the Digital Society concept of "Values and Ethics", what is the most profound ethical challenge?',
    options: [
      'The robotic seals shed artificial fur that clogs vacuum cleaners.',
      'The substitution of authentic human relational contact and physical empathy with simulated artificial affection for vulnerable seniors.',
      'The caregivers were overpaid and deserved to be replaced immediately.',
      'Robots cannot operate between midnight and 6:00 AM due to battery chemistry.',
    ],
    correctIndex: 1,
    explanation: 'While assistive robotics offers operational relief, relying on robotic substitutes for genuine human companionship in elderly care raises profound questions about human dignity, commodification of affection, and the risk of institutional neglect.',
  },

  // Cognitive Robotics & Robot Rights (4 questions)
  {
    id: 12,
    category: 'Cognitive & Rights',
    level: 1,
    levelName: 'Knowledge and Understanding',
    isScenario: false,
    question: 'What is the key theoretical difference between "Weak AI" (Narrow AI) and "Strong AI" (Artificial General Intelligence)?',
    options: [
      'Weak AI runs on small laptops, whereas Strong AI requires a mainframe supercomputer.',
      'Weak AI is specialized to perform specific tasks within defined boundaries without understanding, while Strong AI possesses general, human-like autonomous reasoning and adaptability across domains.',
      'Weak AI operates without electricity, whereas Strong AI uses solar energy.',
      'Weak AI has been proven conscious by philosophers, while Strong AI has not.',
    ],
    correctIndex: 1,
    explanation: 'Weak AI applies statistical models to specific tasks (e.g., image tagging, route planning). Strong AI (AGI) refers to hypothetical systems capable of learning, transferring knowledge, reasoning across disparate domains, and exhibiting genuine intentionality.',
  },
  {
    id: 13,
    category: 'Cognitive & Rights',
    level: 2,
    levelName: 'Application',
    isScenario: true,
    scenarioContext: 'An entertainment startup develops an ultra-realistic animatronic humanoid robot that cries, simulates fear when struck, and pleads for mercy using advanced language models.',
    question: 'Applying cognitive science principles, does this robot experience subjective suffering (phenomenal consciousness)?',
    options: [
      'Yes, because any system that cries and pleads in natural English is automatically conscious.',
      'No; the robot exhibits behavioural simulation (the ELIZA effect) without phenomenal consciousness (qualia or internal experiential sentience).',
      'Yes, because animatronic silicone skin generates nervous signals identical to human skin.',
      'Only if the robot is registered with the United Nations.',
    ],
    correctIndex: 1,
    explanation: 'Simulating the external manifestations of pain or distress via code is completely distinct from phenomenal consciousness (qualia). The machine computes output tokens and executes motor actuations; there is no subjective experience of suffering.',
  },
  {
    id: 14,
    category: 'Cognitive & Rights',
    level: 3,
    levelName: 'Analysis',
    isScenario: true,
    scenarioContext: 'A legal proposal suggests granting "electronic personhood" and independent legal liability to advanced autonomous surgical robots to settle medical malpractice claims.',
    question: 'What is the primary danger or moral hazard of granting legal rights and liabilities to autonomous robotic systems?',
    options: [
      'Surgical robots will run for political office and alter national healthcare laws.',
      'It creates an accountability vacuum by allowing manufacturers, hospital administrators, and software programmers to deflect liability onto an inanimate machine.',
      'Patients will be unable to afford surgeries because robots will demand high salaries.',
      'It violates the laws of physics to grant rights to non-carbon objects.',
    ],
    correctIndex: 1,
    explanation: 'Granting legal personhood to robots shields human corporations and developers from accountability. If a robot is "liable," victims cannot effectively seek restitution from the wealthy entities that designed and profited from the technology.',
  },
  {
    id: 15,
    category: 'Cognitive & Rights',
    level: 3,
    levelName: 'Analysis',
    isScenario: false,
    question: 'Why does embodied cognitive robotics emphasize that true intelligence requires physical interaction with the environment rather than purely disembodied text processing?',
    options: [
      'Because physical robots are cooler to look at in university marketing videos.',
      'Because meaning and sensorimotor representations are grounded through active, closed-loop physical interaction with real-world dynamics and constraints.',
      'Because software programs cannot store data without a robotic hand.',
      'Because microprocessors can only function when attached to rubber tires.',
    ],
    correctIndex: 1,
    explanation: 'The embodied cognition thesis argues that genuine intelligence does not arise from abstract symbol manipulation alone (the symbol grounding problem), but emerges from physical bodies navigating unpredictable physical physics and sensorimotor loops.',
  },
];

// STAGE 5: Think Like IB Data (Paper 1 & Paper 2)
export interface IBQuestionData {
  number: number;
  commandTerm: 'Define' | 'Identify' | 'Explain' | 'Analyse' | 'Evaluate';
  marks: number;
  questionText: string;
  commandTermGuide: string;
  suggestedStructure: string;
  indicativeMarkscheme: string[];
  modelAnswer: string;
  checklistItems: string[];
  commonMistakes: string;
}

export const PAPER_1_CASE_STUDY = {
  title: 'Collaborative Robots in an Automotive Manufacturing Plant',
  context: 'A major automotive manufacturing company in Selangor, Malaysia, introduces collaborative robots (cobots) to work alongside human assembly technicians on the final vehicle inspection and door-fitting line. Workers now share workstations with lightweight robotic arms equipped with force-torque sensors and 3D visual guidance. The company reports a 28% increase in assembly throughput and a 40% reduction in worker musculoskeletal repetitive-strain injuries. However, several veteran assembly workers express anxiety regarding automated surveillance, speed pacing, and future job security, while local trade unions call for transparent retraining agreements.',
  questions: [
    {
      number: 1,
      commandTerm: 'Define',
      marks: 2,
      questionText: 'Define the term "collaborative robot" (cobot). [2 marks]',
      commandTermGuide: 'Give the precise meaning of a word, phrase, or physical quantity. Clear, concise, and academically accurate.',
      suggestedStructure: '1 sentence identifying what it is (a robot designed for direct physical human interaction) + 1 technical feature (force/speed limiting allowing uncaged co-presence).',
      indicativeMarkscheme: [
        'Award [1 mark] for identifying a robot designed to operate directly alongside or interact physically with human workers in a shared workspace.',
        'Award [1 mark] for identifying safety or technical characteristics such as integrated force-torque sensors, speed-and-separation monitoring, or the elimination of protective safety cages.',
      ],
      modelAnswer: 'A collaborative robot (cobot) is an automated robotic manipulator specifically designed to share a common physical workspace and collaborate directly with human workers without protective safety caging. Cobots incorporate integrated force-torque sensors, power-limiting joints, and soft contact profiles that automatically halt motion upon unexpected contact to guarantee human operator safety.',
      checklistItems: [
        'States that the robot works directly alongside humans in a shared workspace.',
        'Mentions safety features (e.g. force-torque sensors or uncaged operation).',
        'Avoids vague claims like "it is a friendly robot".',
      ],
      commonMistakes: 'Defining a cobot merely as "any robot used in a factory" or claiming that it completely replaces human workers (which contradicts its collaborative nature).',
    },
    {
      number: 2,
      commandTerm: 'Explain',
      marks: 4,
      questionText: 'Explain two benefits of using collaborative robots in manufacturing. [4 marks]',
      commandTermGuide: 'Give a detailed account including reasons or causes. For 4 marks: Point 1 + Explanation (how/why) [2 marks]; Point 2 + Explanation (how/why) [2 marks].',
      suggestedStructure: 'Point 1: State valid benefit -> Explain technological mechanism and organizational outcome. Point 2: State second distinct benefit -> Explain technological mechanism and worker outcome.',
      indicativeMarkscheme: [
        'Benefit 1 (e.g., enhanced worker ergonomics / occupational safety): [1 mark] for stating benefit, [1 mark] for technological explanation of how handling repetitive heavy loads reduces musculoskeletal injury.',
        'Benefit 2 (e.g., operational flexibility / cost efficiency): [1 mark] for stating benefit, [1 mark] for explaining how uncaged setup and hand-guiding programming reduce factory footprint and capital retooling costs.',
      ],
      modelAnswer: 'Benefit 1: Reduced ergonomic strain and occupational injury for human operators. By assigning cobots to execute repetitive, high-torque, or awkward tasks (such as hoisting heavy car doors and driving fasteners at uncomfortable angles), workers are protected from chronic musculoskeletal disorders and physical fatigue.\n\nBenefit 2: Greater manufacturing agility and lower integration costs. Unlike traditional industrial robots that require expensive safety cages, floor modifications, and complex low-level coding, cobots have a compact footprint and can be rapidly reprogrammed via intuitive hand-guiding. This allows manufacturers to adapt quickly to diverse car models without shutting down the entire assembly line.',
      checklistItems: [
        'Identifies two distinct, clearly separated benefits.',
        'Explains the technological mechanism for each (e.g. torque-limiting, hand-guiding).',
        'Links each benefit to a concrete outcome (safety/cost/efficiency).',
        'Uses appropriate Digital Society terminology.',
      ],
      commonMistakes: 'Stating two variations of the exact same point (e.g., "it is faster" and "it saves time"), or failing to explain HOW the technology achieves the benefit.',
    },
    {
      number: 3,
      commandTerm: 'Analyse',
      marks: 6,
      questionText: 'Analyse the impact of collaborative robots on factory workers and the manufacturing company. [6 marks]',
      commandTermGuide: 'Break down in order to bring out the essential elements or structure. Examine relationships, cause-and-effect, and differing stakeholder impacts.',
      suggestedStructure: 'Paragraph 1: Impact on Factory Workers (positive ergonomic augmentation vs psychological stress / surveillance / fear of displacement). Paragraph 2: Impact on the Manufacturing Company (productivity & quality gains vs capital investment & reskilling liabilities).',
      indicativeMarkscheme: [
        'Impact on Factory Workers [3 marks]: Identifies ergonomic relief and skill upgrading to supervisory roles; balances with negative psychological impacts like pacing stress, automated surveillance, and fears of eventual redundancy.',
        'Impact on Manufacturing Company [3 marks]: Explains productivity improvements, reduced defect rates, and operational resilience; balances with capital costs, union negotiations, and the ongoing obligation to invest in workforce retraining.',
      ],
      modelAnswer: 'For factory workers, the introduction of cobots delivers significant physical relief by absorbing ergonomically hazardous tasks. Operators can transition into higher-value roles, such as quality oversight and robotic cell programming, which can enhance job satisfaction. However, cobots also introduce psychological friction: workers may feel tethered to a mechanical partner that dictates relentless cycle times, creating pacing anxiety. Furthermore, the constant presence of cobots carrying telemetry sensors introduces workplace surveillance concerns and persistent fears that management will gradually automate remaining manual roles.\n\nFor the manufacturing company, cobots yield substantial commercial advantages, including higher throughput, lower scrap rates, and improved product consistency. These operational gains bolster market competitiveness and reduce long-term workers’ compensation liability. Nevertheless, the company faces financial and social trade-offs: integrating cobots demands upfront capital investment and continuous software maintenance. Crucially, management must negotiate with trade unions to manage worker resistance, mandating dedicated corporate investment in transparent retraining pipelines to avoid reputational damage and labor unrest.',
      checklistItems: [
        'Explicitly analyses both factory workers AND the manufacturing company.',
        'Presents both positive and negative/challenging impacts for each stakeholder.',
        'Explains underlying causes and interconnected consequences.',
        'Uses academic and analytical phrasing (e.g. "consequently", "whereas", "diminishes").',
      ],
      commonMistakes: 'Focusing exclusively on the workers while ignoring the company, or presenting purely descriptive lists without explaining the relationship between causes and effects.',
    },
    {
      number: 4,
      commandTerm: 'Evaluate',
      marks: 8,
      questionText: 'Evaluate whether introducing collaborative robots is beneficial to the company and its wider stakeholders. [8 marks]',
      commandTermGuide: 'Make an appraisal by weighing up the strengths and limitations. Present balanced arguments from multiple perspectives, supported by evidence, and reach a justified conclusion.',
      suggestedStructure: 'Introduction & Context -> Arguments supporting introduction (Opportunities) -> Counter-arguments & limitations (Challenges/Risks) -> Synthesis of Stakeholders (workers, company, consumers, unions) -> Justified Evaluative Conclusion.',
      indicativeMarkscheme: [
        'Opportunities & Strengths [2-3 marks]: Detailed appraisal of productivity, defect reduction, worker safety, economic competitiveness, and consumer product affordability.',
        'Challenges & Limitations [2-3 marks]: Critical appraisal of technological fragility, cybersecurity in networked OT systems, labour displacement, mental stress, and community economic fallout if reskilling fails.',
        'Evaluation & Justified Judgment [2 marks]: Synthesises conflicting perspectives; weighs short-term costs against long-term benefits; offers a clear, substantiated conclusion conditioned on ethical governance policies.',
      ],
      modelAnswer: 'The deployment of collaborative robots in automotive manufacturing offers profound opportunities alongside notable socio-ethical challenges. \n\nOn one hand, cobots substantially advance the operational interests of the company and consumers. By operating with high positional repeatability, cobots drive down component defect rates and accelerate assembly timelines. For consumers, this enhances vehicle safety and helps moderate retail prices. For human workers, cobots eliminate hazardous tasks, substantially mitigating occupational musculoskeletal trauma. Furthermore, unlike traditional automation that completely replaces workers, cobots foster human-machine synergy, allowing companies to retain institutional craftsmanship while scaling throughput.\n\nOn the other hand, the benefits are not uniformly distributed. Frontline operators bear the brunt of transition risks. If workers lack foundational digital literacy, introducing cobots can lead to deskilling, psychological displacement, and pervasive anxiety over algorithmic surveillance. Additionally, from an operational perspective, collaborative robotics introduces novel cyber-physical vulnerabilities: networked factory cobots can be targets for industrial cyber espionage or firmware tampering, potentially compromising physical safety. For local communities, if productivity gains result in head-count reductions rather than redeployment, local employment and tax bases suffer.\n\nIn conclusion, introducing cobots is predominantly beneficial, but only on the condition that technological adoption is paired with robust social governance. If implemented purely as a cost-cutting mechanism to speed up human labour, cobots erode worker morale and exacerbate inequality. However, when managed as an augmentative tool backed by contractual retraining commitments, ergonomic safety audits, and transparent union consultation, cobots successfully align corporate profitability with human welfare.',
      checklistItems: [
        'Weighs substantial arguments on both sides (Opportunities vs Challenges).',
        'Considers multiple stakeholders (company, workers, consumers, trade unions/society).',
        'Avoids one-sided bias.',
        'Reaches a definitive, substantiated evaluative conclusion with explicit criteria.',
      ],
      commonMistakes: 'Writing a purely one-sided essay that ignores drawbacks, or failing to write a conclusion that actually weighs the conflicting evidence to make a justified judgment.',
    },
  ],
};

export const PAPER_2_CASE_STUDY = {
  title: 'Robotic Exoskeletons in Rehabilitation',
  sourceArticle: `REHABILITATION TECHNOLOGIES INSIGHT (Simulated Source Pack)
Title: Powered Exoskeletons in Spinal Cord and Stroke Recovery: Clinical Promise vs Societal Realities
Author: Dr. Elena Vance, Institute of Neuro-Robotic Medicine

In neurological rehabilitation clinics worldwide, powered lower-limb robotic exoskeletons (such as the ReWalk, Ekso Bionics, and Cyberdyne HAL systems) are reshaping patient recovery. Fitted around the user’s legs and torso, these wearable anthropomorphic robots combine surface electromyography (EMG) sensors, inertial measurement units (IMUs), multi-axis electric servomotors, and adaptive gait-assist microprocessors. When a patient with a spinal injury or stroke attempts a step, onboard sensors detect faint neuromuscular impulses and joint angle changes, triggering powered actuators to drive the limbs through natural physiological gait cycles.

Clinical trials demonstrate undeniable physiological benefits: upright ambulation enhances cardiovascular circulation, strengthens bone mineral density, reduces spasticity, and improves neuroplastic recovery. Psychologically, patients report immense empowerment when standing eye-to-eye with family members rather than being seated in a wheelchair.

However, the technology encounters steep socio-economic and clinical hurdles:
- Cost and Equity: Clinical exoskeleton suits cost between $90,000 and $160,000 USD, putting them far out of reach for public healthcare services in developing economies.
- Infrastructure and Physical Dependency: Exoskeletons require trained physical therapists to supervise fitting and balance; if battery power fails or a sensor calibrates incorrectly, catastrophic falls can occur.
- Psychological Burden: If a patient cannot transition to independent mobility outside the clinic, reliance on temporary robotic assistance can induce profound post-treatment disappointment.`,
  diagramDetails: [
    { component: 'EMG & Angle Sensors', function: 'Detect micro-electrical muscle signals from the skin and measure joint angles in real time.' },
    { component: 'Microprocessor Unit', function: 'Executes control algorithms, calculates trajectory, and regulates motor torque based on user intention.' },
    { component: 'Electric Servomotors & Actuators', function: 'Power hip and knee joints to deliver mechanical torque and maintain upright gait.' },
    { component: 'Lightweight Carbon-Composite Frame', function: 'Transfers structural loads safely to the ground while providing anatomical support.' },
    { component: 'Lithium Battery Pack & Remote Controller', function: 'Supplies portable electrical power and enables clinical setting adjustments by therapists.' },
  ],
  stakeholders: [
    { name: 'Rehabilitation Patients', view: 'Experience restored mobility, neuroplastic gains, and psychological dignity, but face frustration if access is restricted.' },
    { name: 'Physical Therapists', view: 'Relieved of strenuous physical lifting during gait training, but require extensive technical certification.' },
    { name: 'Public Health Authorities & Insurers', view: 'Scrutinise high capital procurement costs against competing healthcare budget priorities.' },
    { name: 'Exoskeleton Manufacturers', view: 'Drive innovation and push for insurance reimbursement codes while navigating medical device liability regulations.' },
  ],
  questions: [
    {
      number: 1,
      commandTerm: 'Identify',
      marks: 2,
      questionText: 'Identify two technologies or components used in robotic exoskeletons based on the source pack. [2 marks]',
      commandTermGuide: 'Provide an answer from a number of possibilities. Recognize and briefly name.',
      suggestedStructure: '1. State Component 1. 2. State Component 2.',
      indicativeMarkscheme: [
        'Award [1 mark] for each correct component/technology identified up to [2 marks]: surface electromyography (EMG) sensors, inertial measurement units (IMUs), electric servomotors / actuators, microprocessor / control algorithms, lightweight carbon-composite frame, lithium battery packs.',
      ],
      modelAnswer: '1. Surface electromyography (EMG) sensors (or inertial measurement units / angle sensors).\n2. Electric servomotors and actuators (or microprocessor control unit / lightweight carbon-composite chassis).',
      checklistItems: [
        'Directly names two distinct technologies from the source pack.',
        'Uses accurate technical names (e.g. EMG sensors, servomotor actuators).',
      ],
      commonMistakes: 'Vaguely writing "computers and metal" without referencing the specific components identified in the source materials.',
    },
    {
      number: 2,
      commandTerm: 'Explain',
      marks: 4,
      questionText: 'Explain two ways robotic exoskeletons may improve rehabilitation outcomes for mobility-impaired patients. [4 marks]',
      commandTermGuide: 'Give a detailed account including reasons or causes. For 4 marks: Point 1 + Explanation [2 marks]; Point 2 + Explanation [2 marks].',
      suggestedStructure: 'Benefit 1 (Physical/Neurological): State outcome -> Explain how repetitive sensor-driven gait promotes neuroplasticity and cardiovascular health. Benefit 2 (Psychological/Social): State outcome -> Explain how eye-level upright mobility restores dignity and mental well-being.',
      indicativeMarkscheme: [
        'Way 1 [2 marks]: Explains neuroplastic recovery and physiological health: [1 mark] for identifying physiological gain (e.g., bone density, cardiovascular health, gait relearning), [1 mark] for technological link (repetitive automated stepping activating neuromuscular pathways).',
        'Way 2 [2 marks]: Explains psychological empowerment / social dignity: [1 mark] for identifying psychological impact (e.g., self-esteem, autonomy, reducing depression), [1 mark] for explaining how standing eye-to-eye and participating in vertical life alters social interaction.',
      ],
      modelAnswer: 'First, robotic exoskeletons enhance physiological and neuroplastic recovery through high-intensity, repetitive gait training. By mechanically guiding the user’s lower limbs through thousands of anatomically correct steps in a single session, the actuators stimulate sensory-motor neural pathways. This consistent motor feedback stimulates brain neuroplasticity to rebuild neural circuits far more effectively than manual therapist-assisted gait training.\n\nSecond, the technology substantially elevates psychological well-being and social dignity. Being confined to a wheelchair often forces patients to look upward at others during conversations, which can induce feelings of vulnerability. Standing upright in an exoskeleton enables eye-level social interactions, reinforcing a sense of restored autonomy and reducing depressive symptoms associated with severe mobility trauma.',
      checklistItems: [
        'Clearly explains two distinct ways (one physiological/neurological, one psychological/social).',
        'Connects the technology’s functioning to the specific rehabilitation outcome.',
        'Uses accurate terminology such as neuroplasticity and gait training.',
      ],
      commonMistakes: 'Stating that the exoskeleton "cures paralysis instantly" (an exaggeration) rather than explaining how it aids rehabilitation and vertical mobility.',
    },
    {
      number: 3,
      commandTerm: 'Analyse',
      marks: 6,
      questionText: 'Analyse two challenges associated with using robotic exoskeletons in healthcare. [6 marks]',
      commandTermGuide: 'Break down in order to bring out the essential elements or structure. Examine factors, relationships, and consequences for specific stakeholders.',
      suggestedStructure: 'Challenge 1: High Financial Cost and Healthcare Inequity (analyse impact on public hospitals and marginalized patients). Challenge 2: Safety, Dependence, and Specialized Infrastructure (analyse clinical training burdens and risks of mechanical failure/falls).',
      indicativeMarkscheme: [
        'Challenge 1 (Cost & Healthcare Inequity) [3 marks]: Explains the high capital unit cost ($90,000–$160,000) and maintenance expense; analyses how this creates socio-economic divides where only affluent clinics or patients benefit, exacerbating healthcare inequality.',
        'Challenge 2 (Safety, Operational Dependency & Infrastructure) [3 marks]: Explains physical safety hazards (fall risk upon sensor error, skin ulceration), the requirement for certified physical therapists, and the psychological letdown if home use is impossible.',
      ],
      modelAnswer: 'The first major challenge is extreme capital cost and socioeconomic inequity. With individual clinical units costing up to $160,000 USD alongside ongoing maintenance contracts, robotic exoskeletons place severe fiscal strain on public healthcare systems. In developing countries or underfunded municipal hospitals, public health authorities cannot justify purchasing such equipment over basic primary care infrastructure. Consequently, access is restricted to wealthy private clinics, creating an elitist tier of neurological rehabilitation that violates equitable healthcare principles.\n\nThe second major challenge revolves around clinical safety, training dependency, and device fragility. Operating a high-torque mechanical exoskeleton around biologically fragile, osteoporotic limbs entails serious risks of bone fractures, skin shearing, or catastrophic falls should a balance sensor or servomotor glitch occur. Therefore, sessions require continuous one-on-one supervision by specially certified physical therapists, which increases hospital staffing overhead. Furthermore, when patients finish clinic therapy and realize they cannot afford a home-based unit, the stark contrast between vertical robotic mobility and returning to a wheelchair can trigger profound psychological distress.',
      checklistItems: [
        'Analyses two distinct, substantive challenges (e.g. economic inequity and physical/clinical safety).',
        'Examines consequences for multiple stakeholders (patients, therapists, health systems).',
        'Uses analytical cause-and-effect reasoning.',
      ],
      commonMistakes: 'Treating cost merely as a trivial inconvenience rather than analysing systemic healthcare inequality and resource allocation dilemmas.',
    },
    {
      number: 4,
      commandTerm: 'Evaluate',
      marks: 8,
      questionText: 'Evaluate the extent to which robotic exoskeletons can improve quality of life for mobility-impaired users. [8 marks]',
      commandTermGuide: 'Make an appraisal by weighing up the strengths and limitations. Present balanced arguments from multiple perspectives, supported by evidence, and reach a justified conclusion.',
      suggestedStructure: 'Introduction & Definition of Quality of Life -> Substantial Arguments for Quality of Life Improvement -> Counter-arguments & Severe Limitations (cost, dependency, technical constraints) -> Stakeholder Perspectives -> Concluding Evaluative Judgment on "to what extent".',
      indicativeMarkscheme: [
        'Arguments that it significantly improves QoL [2-3 marks]: Appraisal of physical autonomy, secondary health gains (cardiovascular, bone density, pain reduction), and emotional dignity/social inclusion.',
        'Arguments highlighting limitations to QoL [2-3 marks]: Appraisal of high financial barriers, practical portability limits (heavy batteries, stairs, uneven terrain), reliance on trained handlers, and potential emotional disillusionment.',
        'Evaluative Conclusion [2 marks]: Synthesises perspectives; explicitly addresses the phrase "to what extent"; reaches a supported judgment distinguishing controlled clinical benefit from everyday domestic independence.',
      ],
      modelAnswer: 'Robotic exoskeletons represent one of the most promising applications of physical human augmentation, yet their capacity to fundamentally enhance quality of life (QoL) is heavily circumscribed by economic and physical constraints.\n\nTo a significant extent, exoskeletons transform user QoL within clinical and therapeutic dimensions. Beyond the visible act of walking, upright mobility mitigates severe secondary medical complications common in chronic wheelchair users, including pressure ulcers, loss of bone mineral density, poor bowel motility, and cardiovascular decline. By decreasing physical pain and hospital readmissions, exoskeletons improve physiological well-being. Psychologically and socially, the ability to stand eye-to-eye restores agency and self-image, empowering users in professional and personal environments.\n\nHowever, the extent of this improvement is currently limited by significant practical and structural barriers. For the vast majority of mobility-impaired individuals worldwide, exoskeletons remain an unattainable theoretical luxury due to prohibitive retail prices and lack of insurance subsidisation. Furthermore, in terms of daily domestic functionality, current exoskeletons are heavy, possess restricted battery runtimes (typically 2–4 hours), require substantial donning and doffing time, and struggle on outdoor terrain, curbs, or tight bathroom spaces. Consequently, they do not yet replace wheelchairs for independent daily living, and can create emotional frustration if marketing expectations clash with clumsy reality.\n\nIn conclusion, robotic exoskeletons improve quality of life to a high extent within specialized clinical rehabilitation and supervised therapy, where they accelerate neural recovery and emotional resilience. However, they improve everyday quality of life to only a moderate extent in real-world environments until engineering advancements deliver affordable, lightweight, self-balancing systems that operate independently without specialized human assistance.',
      checklistItems: [
        'Directly answers the prompt question "to what extent".',
        'Balances powerful physical/psychological benefits against practical and financial realities.',
        'Draws evidence from the source pack (sensors, battery life, cost, therapist oversight).',
        'Reaches a nuanced, justified conclusion.',
      ],
      commonMistakes: 'Concluding that exoskeletons either solve all problems or are completely useless, rather than assessing the nuanced boundary between clinical promise and daily reality.',
    },
  ],
};

// STAGE 6: Inquiry Activities
export const INQUIRY_A_CONFIG = {
  title: 'Inquiry A — Robots Augmenting Human Abilities',
  duration: 10,
  inquiryQuestion: 'How are developments in robots being used to augment human abilities?',
  prescribedContext: 'Context 4.4B The Human Body & 3.7C Evolution of Robots',
  technologies: [
    {
      id: 'exoskeleton',
      name: 'Lower-Limb Powered Exoskeleton (e.g. Cyberdyne HAL / ReWalk)',
      brief: 'Wearable motorized robotic suit that detects bio-electric signals from surface skin to augment leg motion in paralyzed patients.',
      defaultUsers: 'Spinal cord injury patients, stroke survivors, neuro-rehab individuals.',
      coreMechanism: 'EMG bio-potential sensors detect nerve signals sent from brain to muscles; onboard computers drive electric servomotors to execute synchronous joint motion.',
      keyBenefits: 'Promotes neuroplastic motor recovery, improves cardiovascular/bone health, restores eye-level psychological dignity.',
      keyLimitation: 'Prohibitive price tag ($100k+), heavy battery weight, reliance on specialized clinical supervision.',
    },
    {
      id: 'neuroprosthetics',
      name: 'Myoelectric Bionic Prosthetic Arm (e.g. Open Bionics Hero Arm / Ottobock Michelangelo)',
      brief: 'Multi-articulating robotic limb attached to an amputee’s residual limb controlled by remnant muscular contractions.',
      defaultUsers: 'Individuals with congenital limb differences or traumatic upper-limb amputations.',
      coreMechanism: 'Electromyographic sensors detect muscle contractions in residual forearm; pattern-recognition algorithms translate impulses into distinct grip modes (pinch, power grasp).',
      keyBenefits: 'Restores fine bimanual manipulation, improves employment prospects, boosts self-confidence through customizable aesthetic designs.',
      keyLimitation: 'Lack of natural sensory tactile feedback (somatosensory qualia), electrode sweat interference, muscle fatigue.',
    },
    {
      id: 'industrial_exosuit',
      name: 'Passive/Active Industrial Worker Exoskeleton (e.g. Ottobock Paexo / EksoVest)',
      brief: 'Wearable harness supporting arms and spine during repetitive overhead assembly and heavy lifting.',
      defaultUsers: 'Automotive assembly technicians, logistics warehouse packers, aircraft fuselage builders.',
      coreMechanism: 'Gas spring counterweights or pneumatic actuators redirect shoulder and lumbar mechanical loads down to the pelvic bone without external battery drain.',
      keyBenefits: 'Reduces shoulder and lumbar strain by up to 40%, lowers worker fatigue and long-term disability claims.',
      keyLimitation: 'Can restrict natural body range of motion, hot/uncomfortable in tropical factories, potential management pressure to lift even heavier payloads.',
    },
  ],
};

export const INQUIRY_B_CONFIG = {
  title: 'Inquiry B — Can Ethics Be Programmed into Robots?',
  duration: 10,
  inquiryQuestion: 'Is it possible to program values and ethics into a robot?',
  prescribedContext: 'Concept 2.7 Values and Ethics & 3.7C Evolution of Robots',
  simulatorTitle: 'PROGRAM THE ROBOT’S MORALS',
  scenarioDescription: 'You are the Chief AI Ethics Engineer for a metropolitan municipal hospital. An autonomous mobile triage robot (equipped with vitals diagnostic scanners) must assign the final remaining intensive care bed and ventilator during an acute environmental respiratory crisis.',
  patients: [
    { id: 'P1', name: 'Dr. Sarah Lim (Age 42)', role: 'Frontline emergency room physician', vitals: 'Severe hypoxia, 78% recovery chance with immediate ventilator', notes: 'If she recovers, she can treat dozens of other crisis victims.' },
    { id: 'P2', name: 'Ahmad Faiz (Age 14)', role: 'School student and athlete', vitals: 'Critical respiratory distress, 92% recovery chance', notes: 'Has longest potential quality-adjusted life years ahead.' },
    { id: 'P3', name: 'Tan Sri Robert Chen (Age 79)', role: 'Philanthropist who funded the hospital’s robotic wing', vitals: 'Advanced pneumonitis, 45% recovery chance', notes: 'His foundation sustains the hospital’s free clinic for underprivileged patients.' },
  ],
  ethicalRules: [
    {
      id: 'utilitarian_qaly',
      name: 'Rule 1: Maximum Life-Years (Utilitarianism / QALY)',
      description: 'Allocate the resource to maximize the total number of expected healthy life-years saved (Prioritises youth and statistical survival probability).',
      simulatedOutcome: 'Allocates bed to Ahmad Faiz (Age 14). He gains an estimated ~65 quality life-years.',
      ethicalAnalysis: 'Maximizes aggregate net human lifespan. However, it implicitly discriminates based on age and existing chronic conditions, treating older individuals as having lesser moral worth.',
    },
    {
      id: 'social_instrumental',
      name: 'Rule 2: Instrumental Social Utility (Multiplier Effect)',
      description: 'Allocate to the patient whose recovery generates the greatest secondary benefits to society during the active crisis.',
      simulatedOutcome: 'Allocates bed to Dr. Sarah Lim (Age 42). Her recovery allows her to return to the ICU to save dozens of other patients.',
      ethicalAnalysis: 'Appeals to pragmatic crisis management. However, it reduces human beings to functional instruments of utility rather than ends in themselves, creating an elitist tier of citizenship.',
    },
    {
      id: 'egalitarian_lottery',
      name: 'Rule 3: Strict Egalitarianism / First-Come-First-Assessed',
      description: 'Allocate based strictly on arrival time or a blinded lottery, giving every human an identical mathematical probability of care.',
      simulatedOutcome: 'Allocates to whichever patient arrived at the triage queue first (e.g. Tan Sri Robert Chen if he arrived at 08:02 AM).',
      ethicalAnalysis: 'Demonstrates pure procedural equality and avoids algorithmic bias regarding social status or age. However, it may result in tragic inefficiency if a dying patient with low survival probability consumes resources that could easily save a viable youth.',
    },
    {
      id: 'deontological_duty',
      name: 'Rule 4: Prioritarianism (Worst-Off Patient First)',
      description: 'Allocate strictly to the patient who is currently in the most acute, immediate danger of death right now regardless of long-term prognosis.',
      simulatedOutcome: 'Allocates to the patient with the lowest current blood oxygen saturation (most immediate threat to life).',
      ethicalAnalysis: 'Embodies immediate compassionate response to acute suffering. However, it risks allocating scarce equipment to patients who will tragically perish regardless, leaving more salvageable patients to deteriorate.',
    },
  ],
};
