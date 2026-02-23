export type DemoMode = 'chat' | 'translate';
export type DemoTone =
  | 'marigold'
  | 'teal'
  | 'crimson'
  | 'indigo'
  | 'violet'
  | 'lime'
  | 'sky'
  | 'amber'
  | 'slate'
  | 'orange'
  | 'cyan'
  | 'rose'
  | 'emerald'
  | 'gold'
  | 'mint'
  | 'cobalt'
  | 'orchid'
  | 'sunset';

export type DemoLayout =
  | 'aurora'
  | 'editorial'
  | 'studio'
  | 'radar'
  | 'blueprint'
  | 'festival';

export interface DemoEntry {
  slug: string;
  folder: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  placeholder: string;
  mode: DemoMode;
  systemPrompt?: string;
  targetLanguage?: string;
  tone: DemoTone;
  layout: DemoLayout;
  repoPath: string;
  quickTest: string;
  originalFeatures: string[];
}

export interface RepoArea {
  id: string;
  title: string;
  description: string;
  path: string;
  countLabel: string;
  colorClass: string;
}

export interface NotebookArea {
  id: string;
  title: string;
  path: string;
  focus: string;
}

export const DEMO_CATALOG: DemoEntry[] = [
  {
    slug: 'ai-presentation-architect',
    folder: 'AI_Presentation_Architect',
    title: 'AI Presentation Architect',
    badge: 'Streamlit + PPTX',
    tagline: 'Turn prompts into slide decks with India-first context.',
    description:
      'Generate narrative-ready presentation structures and speaker-aligned slide plans for business, education, and policy storytelling.',
    placeholder: 'Create a 7-slide investor deck for an EV startup in Hindi + English mix.',
    mode: 'chat',
    systemPrompt:
      'You are an expert presentation architect. Return a slide-by-slide outline with title, goal, and 3 bullets per slide.',
    tone: 'marigold',
    layout: 'aurora',
    repoPath: 'examples/AI_Presentation_Architect',
    quickTest: 'Pitch flow + bilingual slides',
    originalFeatures: ['PPTX-focused structure prompts', 'Founder and classroom friendly templates', 'Multilingual narrative consistency'],
  },
  {
    slug: 'birthday-song-generator',
    folder: 'Birthday_Song_Generator',
    title: 'Birthday Song Generator',
    badge: 'Lyrics + TTS',
    tagline: 'Personal celebrations in local language and style.',
    description:
      'Compose personalized birthday lyrics tuned to region, age, and vibe, then adapt for speech or singing voice generation.',
    placeholder: 'Write a playful birthday chorus for Aarav in Marathi with cricket references.',
    mode: 'chat',
    systemPrompt:
      'You are a lyric assistant. Generate an original, family-friendly birthday song stanza in the requested language and style.',
    tone: 'rose',
    layout: 'festival',
    repoPath: 'examples/Birthday_Song_Generator',
    quickTest: 'Localized celebration lyrics',
    originalFeatures: ['Cultural personalization', 'Short-form lyrical rhythm', 'Voice-ready output text'],
  },
  {
    slug: 'indic-soundbox-ai',
    folder: 'Indic Soundbox AI',
    title: 'Indic Soundbox AI',
    badge: 'ASR + TTS Loop',
    tagline: 'Speech in, speech out, across Indian languages.',
    description:
      'A conversational sound studio prototype combining recognition and synthesis for multilingual spoken experiences.',
    placeholder: 'Translate to Tamil: “Your package will arrive tomorrow before noon.”',
    mode: 'translate',
    targetLanguage: 'ta-IN',
    tone: 'crimson',
    layout: 'radar',
    repoPath: 'examples/Indic Soundbox AI',
    quickTest: 'Speech command localization',
    originalFeatures: ['ASR to response loop', 'Low-latency voice experiences', 'Regional pronunciation alignment'],
  },
  {
    slug: 'live-video-transcription',
    folder: 'Live_Video_Transcription',
    title: 'Live Video Transcription',
    badge: 'Realtime STT',
    tagline: 'Sub-second transcription for live content streams.',
    description:
      'Designed for newsrooms, webinars, and classrooms that need continuous transcript output and language adaptation.',
    placeholder: 'Translate to Hindi: “Thank you all for joining this live product launch.”',
    mode: 'translate',
    targetLanguage: 'hi-IN',
    tone: 'indigo',
    layout: 'studio',
    repoPath: 'examples/Live_Video_Transcription',
    quickTest: 'Broadcast line translation',
    originalFeatures: ['Live stream friendly payloads', 'Subtitle-ready text chunks', 'Event moderation support'],
  },
  {
    slug: 'multilingual-chatbot',
    folder: 'Multilingual_Chatbot',
    title: 'Multilingual Chatbot',
    badge: 'Conversational Agent',
    tagline: 'One bot, many languages, one coherent voice.',
    description:
      'A practical baseline chatbot for banking, commerce, and support workflows where users switch languages naturally.',
    placeholder: 'User asks in Bengali: “How do I reset my account password?”',
    mode: 'chat',
    systemPrompt:
      'You are a multilingual assistant. Answer clearly in the language used by the user unless another language is requested.',
    tone: 'violet',
    layout: 'editorial',
    repoPath: 'examples/Multilingual_Chatbot',
    quickTest: 'Cross-language support prompt',
    originalFeatures: ['Language-aware replies', 'Simple production starter', 'Customer support friendly'],
  },
  {
    slug: 'multilingual-customer-feedback-analyzer',
    folder: 'Multilingual_Customer_Feedback_Analyzer',
    title: 'Multilingual Feedback Analyzer',
    badge: 'Analytics + Summaries',
    tagline: 'Understand customer voice at scale.',
    description:
      'Extract intent, sentiment, and action points from mixed-language customer feedback without losing regional nuance.',
    placeholder: 'Analyze: “Delivery was late but support in Kannada was very polite.”',
    mode: 'chat',
    systemPrompt:
      'Return JSON with sentiment, primary_language, top_issues, and recommended action in plain business language.',
    tone: 'lime',
    layout: 'blueprint',
    repoPath: 'examples/Multilingual_Customer_Feedback_Analyzer',
    quickTest: 'Sentiment + action summary',
    originalFeatures: ['CSV pipeline ready prompts', 'Actionable output schema', 'Language-sensitive issue extraction'],
  },
  {
    slug: 'quickstart-chatbot',
    folder: 'QuickStart_Chatbot',
    title: 'QuickStart Chatbot',
    badge: 'Starter Kit',
    tagline: 'Fastest path from API key to working chatbot.',
    description:
      'Minimal boilerplate for teams shipping their first Sarvam-backed assistant in hours, not weeks.',
    placeholder: 'Explain EMI in simple Hinglish for first-time borrowers.',
    mode: 'chat',
    systemPrompt:
      'You are a concise assistant. Keep answers clear, practical, and easy for first-time users.',
    tone: 'sky',
    layout: 'studio',
    repoPath: 'examples/QuickStart_Chatbot',
    quickTest: 'Simple support response',
    originalFeatures: ['Beginner-friendly architecture', 'Tiny setup footprint', 'Production extension ready'],
  },
  {
    slug: 'regional-code-helper',
    folder: 'Regional_Code_Helper',
    title: 'Regional Code Helper',
    badge: 'Dev Education',
    tagline: 'Programming help in regional language context.',
    description:
      'Explain syntax, debugging, and system design in the learner’s preferred Indian language.',
    placeholder: 'Explain Python list comprehension in Gujarati with one practical example.',
    mode: 'chat',
    systemPrompt:
      'You are a senior software mentor. Explain concepts with one simple example and one practical tip.',
    tone: 'amber',
    layout: 'editorial',
    repoPath: 'examples/Regional_Code_Helper',
    quickTest: 'Concept tutoring in local language',
    originalFeatures: ['Regional pedagogy', 'Code-to-concept explanations', 'Student and upskilling friendly'],
  },
  {
    slug: 'regional-doubt-solver',
    folder: 'Regional_Doubt_Solver',
    title: 'Regional Doubt Solver',
    badge: 'Education AI',
    tagline: 'Homework and concept help for every learner.',
    description:
      'Supports academic clarification with culturally familiar explanations, examples, and terminology.',
    placeholder: 'Teach Newton’s third law in Punjabi with one village-life example.',
    mode: 'chat',
    systemPrompt:
      'You are a patient teacher. Explain the concept in clear steps and finish with one revision question.',
    tone: 'slate',
    layout: 'aurora',
    repoPath: 'examples/Regional_Doubt_Solver',
    quickTest: 'Native-language concept clarity',
    originalFeatures: ['School-oriented assistant mode', 'Context-aware examples', 'Assessment-style outputs'],
  },
  {
    slug: 'travel-planner',
    folder: 'Travel_Planner',
    title: 'Travel Planner',
    badge: 'Itinerary AI',
    tagline: 'Trip planning tuned for Indian travelers.',
    description:
      'Create day-by-day plans with budget tiers, food preferences, travel windows, and multilingual guidance.',
    placeholder: 'Plan a 4-day Coorg trip under ₹35,000 for family with vegetarian food options.',
    mode: 'chat',
    systemPrompt:
      'You are a travel planner. Provide a day-wise itinerary with budget split and local tips.',
    tone: 'orange',
    layout: 'festival',
    repoPath: 'examples/Travel_Planner',
    quickTest: 'Budget itinerary generation',
    originalFeatures: ['Day-wise plan generation', 'Budget aware suggestions', 'Culture-first recommendations'],
  },
  {
    slug: 'ai-graph-generator',
    folder: 'ai-graph-generator',
    title: 'AI Graph Generator',
    badge: 'Data Viz',
    tagline: 'Natural language to chart-ready insight.',
    description:
      'Converts plain-language chart instructions into visualization-ready structures for reporting workflows.',
    placeholder: 'Create a monthly sales comparison chart brief for 3 regions.',
    mode: 'chat',
    systemPrompt:
      'Return a JSON chart specification with chart_type, x_axis, y_axis, and one insight summary.',
    tone: 'cyan',
    layout: 'blueprint',
    repoPath: 'examples/ai-graph-generator',
    quickTest: 'Chart spec generation',
    originalFeatures: ['Prompt-to-visual schema', 'Analytics storytelling', 'Dashboard friendly output'],
  },
  {
    slug: 'converting-wav-into-mp3',
    folder: 'converting_wav_into_mp3',
    title: 'WAV to MP3 Utility',
    badge: 'Audio Utility',
    tagline: 'Simple conversion workflow for media pipelines.',
    description:
      'Utility notebook flow that prepares audio in deployment-friendly formats for downstream ASR/TTS stages.',
    placeholder: 'Translate to English: “Yeh recording ko compressed mp3 format mein convert karo.”',
    mode: 'translate',
    targetLanguage: 'en-IN',
    tone: 'rose',
    layout: 'radar',
    repoPath: 'examples/converting_wav_into_mp3',
    quickTest: 'Audio utility instruction translation',
    originalFeatures: ['Format conversion helper', 'Pipeline pre-processing support', 'Notebook-first utility'],
  },
  {
    slug: 'govt-scheme-summarizer',
    folder: 'govt_scheme_summmarizer',
    title: 'Govt Scheme Summarizer',
    badge: 'Policy Simplifier',
    tagline: 'Complex policy into citizen-readable language.',
    description:
      'Summarizes government program documents into practical eligibility and benefit bullet points.',
    placeholder: 'Summarize PM-KISAN in plain Marathi for first-time applicants.',
    mode: 'chat',
    systemPrompt:
      'Summarize policy in bullet points with eligibility, benefits, and where to apply.',
    tone: 'emerald',
    layout: 'editorial',
    repoPath: 'examples/govt_scheme_summmarizer',
    quickTest: 'Citizen-focused scheme summary',
    originalFeatures: ['Policy simplification', 'Multilingual civic communication', 'Actionable public info formatting'],
  },
  {
    slug: 'sarvam-podcast-generator',
    folder: 'sarvam-podcast-generator',
    title: 'Sarvam Podcast Generator',
    badge: 'Next.js Fullstack',
    tagline: 'PDF to multi-speaker podcast workflow.',
    description:
      'A complete fullstack demo with document parsing, script generation, and audio orchestration for long-form narration.',
    placeholder: 'Generate a podcast-style discussion script about AI in Indian healthcare.',
    mode: 'chat',
    systemPrompt:
      'Write a host-guest podcast script with clear speaker turns and practical examples.',
    tone: 'gold',
    layout: 'studio',
    repoPath: 'examples/sarvam-podcast-generator',
    quickTest: 'Podcast script synthesis',
    originalFeatures: ['Multi-stage async pipeline', 'Background job architecture', 'Audio-first UX controls'],
  },
  {
    slug: 'sarvam-showcase',
    folder: 'sarvam-showcase',
    title: 'Sarvam Showcase Website',
    badge: 'Next.js Experience',
    tagline: 'Design-forward portal for the entire cookbook.',
    description:
      'This website itself: a curated front door for the repository with demo routes, live API playgrounds, and ecosystem storytelling.',
    placeholder: 'Write a launch-day headline for Sarvam AI in English and Hindi.',
    mode: 'chat',
    systemPrompt:
      'Craft concise launch messaging that is confident, clear, and India-first.',
    tone: 'mint',
    layout: 'aurora',
    repoPath: 'examples/sarvam-showcase',
    quickTest: 'Marketing copy generation',
    originalFeatures: ['Design system storytelling', 'Interactive demo routing', 'Repository-wide discoverability'],
  },
  {
    slug: 'stt',
    folder: 'stt',
    title: 'STT Notebook Demos',
    badge: 'Speech-to-Text',
    tagline: 'Audio understanding for transcription workflows.',
    description:
      'Notebook collection focused on converting spoken audio into text outputs for indexing, search, and analysis.',
    placeholder: 'Translate to Hindi: “Convert this meeting recording into clean transcript text.”',
    mode: 'translate',
    targetLanguage: 'hi-IN',
    tone: 'cobalt',
    layout: 'blueprint',
    repoPath: 'examples/stt',
    quickTest: 'Transcription instruction localization',
    originalFeatures: ['Notebook experimentation mode', 'Speech pipeline prototyping', 'Text-ready output foundation'],
  },
  {
    slug: 'stt-translate',
    folder: 'stt-translate',
    title: 'STT Translate Demos',
    badge: 'Speech Translation',
    tagline: 'From voice in one language to text in another.',
    description:
      'Speech translation notebooks tailored for subtitle generation, multilingual meetings, and language accessibility.',
    placeholder: 'Translate to Bengali: “We are starting the workshop in five minutes.”',
    mode: 'translate',
    targetLanguage: 'bn-IN',
    tone: 'orchid',
    layout: 'radar',
    repoPath: 'examples/stt-translate',
    quickTest: 'Cross-language subtitle line',
    originalFeatures: ['Subtitle-ready translation', 'Low-friction multilingual output', 'Accessibility-focused speech tools'],
  },
  {
    slug: 'tts',
    folder: 'tts',
    title: 'TTS Notebook Demos',
    badge: 'Voice Synthesis',
    tagline: 'Natural voice generation for Indian audiences.',
    description:
      'Text-to-speech notebooks for narration, explainers, and assistive voice applications with regional language support.',
    placeholder: 'Translate to Tamil: “Welcome to today’s lesson on climate resilience.”',
    mode: 'translate',
    targetLanguage: 'ta-IN',
    tone: 'sunset',
    layout: 'festival',
    repoPath: 'examples/tts',
    quickTest: 'Narration line localization',
    originalFeatures: ['Narration-ready scripts', 'Voice-first user experiences', 'Regional content delivery'],
  },
];

export const REPO_AREAS: RepoArea[] = [
  {
    id: 'examples',
    title: 'Examples',
    description:
      'Production-oriented apps and mini-products showing real Sarvam AI integrations for speech, chat, analytics, and automation.',
    path: 'examples/',
    countLabel: `${DEMO_CATALOG.length} folders`,
    colorClass: 'from-amber-500/20 to-orange-500/10',
  },
  {
    id: 'notebooks',
    title: 'Notebooks',
    description:
      'Hands-on API tutorials for chat completion, translation, transliteration, TTS, STT, and call analytics workflows.',
    path: 'notebooks/',
    countLabel: '10+ notebook groups',
    colorClass: 'from-cyan-500/20 to-blue-500/10',
  },
  {
    id: 'sample-data',
    title: 'Sample Data',
    description:
      'Ready-to-use audio and text assets for testing transcription, translation, and quality benchmarking in local development.',
    path: 'sample_data/',
    countLabel: 'Audio + base64 assets',
    colorClass: 'from-emerald-500/20 to-lime-500/10',
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description:
      'Integration experiments such as observability and monitoring extensions to instrument Sarvam workloads.',
    path: 'integrations/',
    countLabel: 'Integration notebooks',
    colorClass: 'from-fuchsia-500/20 to-violet-500/10',
  },
  {
    id: 'tests',
    title: 'Tests',
    description:
      'Automated checks that protect language coverage and ensure critical behaviors remain stable as demos evolve.',
    path: 'tests/',
    countLabel: 'Pytest suite',
    colorClass: 'from-rose-500/20 to-red-500/10',
  },
];

export const NOTEBOOK_AREAS: NotebookArea[] = [
  {
    id: 'chat-completion',
    title: 'Chat Completion',
    path: 'notebooks/chat completion',
    focus: 'Conversational generation and prompt design',
  },
  {
    id: 'translate',
    title: 'Translate',
    path: 'notebooks/translate',
    focus: 'Batch and streaming translation APIs',
  },
  {
    id: 'transliterate',
    title: 'Transliterate',
    path: 'notebooks/transliterate',
    focus: 'Script conversion across Indic languages',
  },
  {
    id: 'stt',
    title: 'Speech to Text',
    path: 'notebooks/stt',
    focus: 'Transcription and batch speech jobs',
  },
  {
    id: 'stt-translate',
    title: 'STT Translate',
    path: 'notebooks/stt-translate',
    focus: 'Voice translation and subtitle pipelines',
  },
  {
    id: 'tts',
    title: 'Text to Speech',
    path: 'notebooks/tts',
    focus: 'Voice synthesis and spoken output design',
  },
  {
    id: 'doc-intel',
    title: 'Document Intelligence',
    path: 'notebooks/doc-intelligence',
    focus: 'Document parsing and extraction workflows',
  },
  {
    id: 'call-analytics',
    title: 'Call Analytics',
    path: 'notebooks/call-analytics',
    focus: 'Telephony transcripts and quality insights',
  },
  {
    id: 'language-id',
    title: 'Language Identification',
    path: 'notebooks/language identification',
    focus: 'Language detection in multilingual text',
  },
];

export function getDemoBySlug(slug: string): DemoEntry | undefined {
  return DEMO_CATALOG.find((demo) => demo.slug === slug);
}
