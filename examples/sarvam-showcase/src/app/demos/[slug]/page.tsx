'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeft,
  ArrowRight,
  AudioLines,
  BadgeCheck,
  BookOpen,
  Bot,
  Brain,
  Building2,
  ChartBar,
  Code2,
  Compass,
  FileAudio,
  Gauge,
  Globe,
  KeyRound,
  Languages,
  Layers,
  Loader2,
  MapPinned,
  Mic,
  MonitorPlay,
  Sparkles,
  SquareLibrary,
  Waves,
} from 'lucide-react';
import {
  DEMO_CATALOG,
  getDemoBySlug,
  type DemoLayout,
  type DemoMode,
  type DemoTone,
} from '@/lib/showcase-data';

const GITHUB_REPO = 'https://github.com/mangeshraut712/sarvam-ai-cookbook';

const DEMO_ICON_MAP: Record<string, LucideIcon> = {
  'ai-presentation-architect': MonitorPlay,
  'birthday-song-generator': AudioLines,
  'indic-soundbox-ai': Mic,
  'live-video-transcription': Waves,
  'multilingual-chatbot': Bot,
  'multilingual-customer-feedback-analyzer': ChartBar,
  'quickstart-chatbot': Sparkles,
  'regional-code-helper': Code2,
  'regional-doubt-solver': BookOpen,
  'travel-planner': MapPinned,
  'ai-graph-generator': ChartBar,
  'converting-wav-into-mp3': FileAudio,
  'govt-scheme-summarizer': Building2,
  'sarvam-podcast-generator': FileAudio,
  'sarvam-showcase': SquareLibrary,
  stt: Mic,
  'stt-translate': Languages,
  tts: AudioLines,
};

const TONE_CLASS_MAP: Record<
  DemoTone,
  {
    badge: string;
    hero: string;
    panel: string;
    button: string;
    line: string;
  }
> = {
  marigold: {
    badge: 'border-amber-300/40 bg-amber-500/10 text-amber-200',
    hero: 'from-amber-500/25 via-orange-500/10 to-zinc-950',
    panel: 'border-amber-300/20 bg-amber-500/10',
    button: 'bg-amber-300 text-zinc-900 hover:bg-amber-200',
    line: 'from-amber-300/50 to-orange-300/0',
  },
  teal: {
    badge: 'border-teal-300/40 bg-teal-500/10 text-teal-200',
    hero: 'from-teal-500/25 via-cyan-500/10 to-zinc-950',
    panel: 'border-teal-300/20 bg-teal-500/10',
    button: 'bg-teal-300 text-zinc-900 hover:bg-teal-200',
    line: 'from-teal-300/50 to-cyan-300/0',
  },
  crimson: {
    badge: 'border-rose-300/40 bg-rose-500/10 text-rose-200',
    hero: 'from-rose-500/25 via-red-500/10 to-zinc-950',
    panel: 'border-rose-300/20 bg-rose-500/10',
    button: 'bg-rose-300 text-zinc-900 hover:bg-rose-200',
    line: 'from-rose-300/50 to-red-300/0',
  },
  indigo: {
    badge: 'border-indigo-300/40 bg-indigo-500/10 text-indigo-200',
    hero: 'from-indigo-500/25 via-blue-500/10 to-zinc-950',
    panel: 'border-indigo-300/20 bg-indigo-500/10',
    button: 'bg-indigo-300 text-zinc-900 hover:bg-indigo-200',
    line: 'from-indigo-300/50 to-blue-300/0',
  },
  violet: {
    badge: 'border-violet-300/40 bg-violet-500/10 text-violet-200',
    hero: 'from-violet-500/25 via-fuchsia-500/10 to-zinc-950',
    panel: 'border-violet-300/20 bg-violet-500/10',
    button: 'bg-violet-300 text-zinc-900 hover:bg-violet-200',
    line: 'from-violet-300/50 to-fuchsia-300/0',
  },
  lime: {
    badge: 'border-lime-300/40 bg-lime-500/10 text-lime-200',
    hero: 'from-lime-500/25 via-emerald-500/10 to-zinc-950',
    panel: 'border-lime-300/20 bg-lime-500/10',
    button: 'bg-lime-300 text-zinc-900 hover:bg-lime-200',
    line: 'from-lime-300/50 to-emerald-300/0',
  },
  sky: {
    badge: 'border-sky-300/40 bg-sky-500/10 text-sky-200',
    hero: 'from-sky-500/25 via-cyan-500/10 to-zinc-950',
    panel: 'border-sky-300/20 bg-sky-500/10',
    button: 'bg-sky-300 text-zinc-900 hover:bg-sky-200',
    line: 'from-sky-300/50 to-cyan-300/0',
  },
  amber: {
    badge: 'border-amber-300/40 bg-amber-500/10 text-amber-200',
    hero: 'from-amber-500/25 via-yellow-500/10 to-zinc-950',
    panel: 'border-amber-300/20 bg-amber-500/10',
    button: 'bg-amber-300 text-zinc-900 hover:bg-amber-200',
    line: 'from-amber-300/50 to-yellow-300/0',
  },
  slate: {
    badge: 'border-slate-300/40 bg-slate-500/10 text-slate-200',
    hero: 'from-slate-500/25 via-slate-400/10 to-zinc-950',
    panel: 'border-slate-300/20 bg-slate-500/10',
    button: 'bg-slate-300 text-zinc-900 hover:bg-slate-200',
    line: 'from-slate-300/50 to-slate-200/0',
  },
  orange: {
    badge: 'border-orange-300/40 bg-orange-500/10 text-orange-200',
    hero: 'from-orange-500/25 via-amber-500/10 to-zinc-950',
    panel: 'border-orange-300/20 bg-orange-500/10',
    button: 'bg-orange-300 text-zinc-900 hover:bg-orange-200',
    line: 'from-orange-300/50 to-amber-300/0',
  },
  cyan: {
    badge: 'border-cyan-300/40 bg-cyan-500/10 text-cyan-200',
    hero: 'from-cyan-500/25 via-sky-500/10 to-zinc-950',
    panel: 'border-cyan-300/20 bg-cyan-500/10',
    button: 'bg-cyan-300 text-zinc-900 hover:bg-cyan-200',
    line: 'from-cyan-300/50 to-sky-300/0',
  },
  rose: {
    badge: 'border-rose-300/40 bg-rose-500/10 text-rose-200',
    hero: 'from-rose-500/25 via-pink-500/10 to-zinc-950',
    panel: 'border-rose-300/20 bg-rose-500/10',
    button: 'bg-rose-300 text-zinc-900 hover:bg-rose-200',
    line: 'from-rose-300/50 to-pink-300/0',
  },
  emerald: {
    badge: 'border-emerald-300/40 bg-emerald-500/10 text-emerald-200',
    hero: 'from-emerald-500/25 via-green-500/10 to-zinc-950',
    panel: 'border-emerald-300/20 bg-emerald-500/10',
    button: 'bg-emerald-300 text-zinc-900 hover:bg-emerald-200',
    line: 'from-emerald-300/50 to-green-300/0',
  },
  gold: {
    badge: 'border-yellow-300/40 bg-yellow-500/10 text-yellow-200',
    hero: 'from-yellow-500/25 via-amber-500/10 to-zinc-950',
    panel: 'border-yellow-300/20 bg-yellow-500/10',
    button: 'bg-yellow-300 text-zinc-900 hover:bg-yellow-200',
    line: 'from-yellow-300/50 to-amber-300/0',
  },
  mint: {
    badge: 'border-green-300/40 bg-green-500/10 text-green-200',
    hero: 'from-green-400/25 via-emerald-500/10 to-zinc-950',
    panel: 'border-green-300/20 bg-green-500/10',
    button: 'bg-green-300 text-zinc-900 hover:bg-green-200',
    line: 'from-green-300/50 to-emerald-300/0',
  },
  cobalt: {
    badge: 'border-blue-300/40 bg-blue-500/10 text-blue-200',
    hero: 'from-blue-500/25 via-indigo-500/10 to-zinc-950',
    panel: 'border-blue-300/20 bg-blue-500/10',
    button: 'bg-blue-300 text-zinc-900 hover:bg-blue-200',
    line: 'from-blue-300/50 to-indigo-300/0',
  },
  orchid: {
    badge: 'border-fuchsia-300/40 bg-fuchsia-500/10 text-fuchsia-200',
    hero: 'from-fuchsia-500/25 via-violet-500/10 to-zinc-950',
    panel: 'border-fuchsia-300/20 bg-fuchsia-500/10',
    button: 'bg-fuchsia-300 text-zinc-900 hover:bg-fuchsia-200',
    line: 'from-fuchsia-300/50 to-violet-300/0',
  },
  sunset: {
    badge: 'border-orange-300/40 bg-orange-500/10 text-orange-200',
    hero: 'from-orange-500/25 via-rose-500/10 to-zinc-950',
    panel: 'border-orange-300/20 bg-orange-500/10',
    button: 'bg-orange-300 text-zinc-900 hover:bg-orange-200',
    line: 'from-orange-300/50 to-rose-300/0',
  },
};

const LAYOUT_CLASS_MAP: Record<DemoLayout, { page: string; accent: string; card: string; signature: string }> = {
  aurora: {
    page: 'bg-zinc-950',
    accent: 'bg-[radial-gradient(circle_at_14%_16%,rgba(245,158,11,0.25),transparent_36%),radial-gradient(circle_at_86%_14%,rgba(20,184,166,0.25),transparent_32%),radial-gradient(circle_at_50%_86%,rgba(59,130,246,0.24),transparent_40%)]',
    card: 'rounded-3xl',
    signature: 'Narrative Flow',
  },
  editorial: {
    page: 'bg-zinc-950',
    accent: 'bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.03),rgba(255,255,255,0.03)_1px,transparent_1px,transparent_28px)]',
    card: 'rounded-none border-x border-white/10',
    signature: 'Explainer Board',
  },
  studio: {
    page: 'bg-zinc-950',
    accent: 'bg-[radial-gradient(circle_at_15%_15%,rgba(56,189,248,0.2),transparent_34%),radial-gradient(circle_at_85%_22%,rgba(167,139,250,0.18),transparent_34%)]',
    card: 'rounded-3xl',
    signature: 'Control Room',
  },
  radar: {
    page: 'bg-zinc-950',
    accent: 'bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),transparent_38%),repeating-radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_36px)]',
    card: 'rounded-[2rem]',
    signature: 'Signal Screen',
  },
  blueprint: {
    page: 'bg-zinc-950',
    accent: 'bg-[linear-gradient(rgba(59,130,246,0.18)_1px,transparent_1px),linear-gradient(to_right,rgba(59,130,246,0.18)_1px,transparent_1px)] bg-[size:30px_30px]',
    card: 'rounded-3xl',
    signature: 'Build Sheet',
  },
  festival: {
    page: 'bg-zinc-950',
    accent: 'bg-[radial-gradient(circle_at_10%_18%,rgba(249,115,22,0.24),transparent_34%),radial-gradient(circle_at_90%_20%,rgba(236,72,153,0.2),transparent_34%),radial-gradient(circle_at_50%_86%,rgba(34,197,94,0.22),transparent_40%)]',
    card: 'rounded-[2rem]',
    signature: 'Celebration Stage',
  },
};

const LANGUAGE_OPTIONS = [
  { label: 'Hindi', value: 'hi-IN' },
  { label: 'Tamil', value: 'ta-IN' },
  { label: 'Telugu', value: 'te-IN' },
  { label: 'Bengali', value: 'bn-IN' },
  { label: 'Gujarati', value: 'gu-IN' },
  { label: 'Kannada', value: 'kn-IN' },
  { label: 'Malayalam', value: 'ml-IN' },
  { label: 'Marathi', value: 'mr-IN' },
  { label: 'Punjabi', value: 'pa-IN' },
  { label: 'English', value: 'en-IN' },
];

function githubTreeUrl(path: string) {
  const encodedPath = path
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');

  return `${GITHUB_REPO}/tree/main/${encodedPath}`;
}

function getApiPayload(mode: DemoMode, input: string, targetLanguage: string, systemPrompt?: string) {
  if (mode === 'translate') {
    return {
      endpoint: '/translate',
      isTranslate: true,
      payload: {
        input,
        source_language_code: 'en-IN',
        target_language_code: targetLanguage,
        mode: 'formal',
      },
    };
  }

  const messages: Array<{ role: 'system' | 'user'; content: string }> = [];
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }
  messages.push({ role: 'user', content: input });

  return {
    endpoint: '/v1/chat/completions',
    isTranslate: false,
    payload: {
      model: 'sarvam-m',
      messages,
      temperature: 0.6,
      max_tokens: 700,
    },
  };
}

function LayoutSignature({
  layout,
  title,
  features,
}: {
  layout: DemoLayout;
  title: string;
  features: string[];
}) {
  if (layout === 'editorial') {
    return (
      <section className="grid gap-4 border-y border-white/10 bg-black/40 px-6 py-8 md:grid-cols-3">
        <article className="rounded-2xl border border-white/10 bg-black/40 p-5 md:col-span-2">
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-400">Editorial Insight</p>
          <h3 className="mt-2 text-2xl font-semibold">{title} in practical production context</h3>
          <p className="mt-3 text-sm text-zinc-300">
            This route behaves like a mini product brief: focused on input quality, predictable structured outputs,
            and copy-ready results for teams shipping multilingual experiences.
          </p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-400">Feature Focus</p>
          <div className="mt-3 space-y-2 text-sm text-zinc-300">
            {features.slice(0, 3).map((feature) => (
              <p key={feature}>• {feature}</p>
            ))}
          </div>
        </article>
      </section>
    );
  }

  if (layout === 'studio') {
    return (
      <section className="rounded-3xl border border-white/10 bg-black/45 p-6">
        <p className="text-xs uppercase tracking-[0.14em] text-zinc-400">Studio Metering</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {['Prompt Fit', 'Response Clarity', 'Language Fidelity'].map((label, index) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4">
              <p className="text-sm text-zinc-300">{label}</p>
              <div className="mt-3 h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-violet-300"
                  style={{ width: `${72 + index * 8}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (layout === 'radar') {
    return (
      <section className="grid gap-4 md:grid-cols-[1fr_1.2fr]">
        <div className="flex items-center justify-center rounded-3xl border border-cyan-300/20 bg-cyan-500/10 p-8">
          <div className="flex h-52 w-52 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border border-cyan-300/40 bg-black/50 text-center text-xs uppercase tracking-[0.15em] text-cyan-100">
              Signal
              <br />
              Healthy
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-400">Radar Notes</p>
          <p className="mt-3 text-sm text-zinc-300">
            Built for speech-first and translation-heavy use cases where low-latency feedback and clear response states
            matter as much as model quality.
          </p>
          <div className="mt-4 grid gap-2 text-sm text-zinc-300">
            {features.slice(0, 3).map((feature) => (
              <div key={feature} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (layout === 'blueprint') {
    return (
      <section className="rounded-3xl border border-blue-300/20 bg-blue-500/10 p-6">
        <p className="text-xs uppercase tracking-[0.14em] text-blue-100">Blueprint Blocks</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            { title: 'Input Layer', value: 'Prompt + language guardrails' },
            { title: 'Inference Layer', value: 'Sarvam API orchestration' },
            { title: 'Output Layer', value: 'Actionable response surface' },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-blue-200/20 bg-black/40 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-blue-200">{item.title}</p>
              <p className="mt-2 text-sm text-zinc-200">{item.value}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (layout === 'festival') {
    return (
      <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-orange-500/10 via-rose-500/10 to-green-500/10 p-6">
        <p className="text-xs uppercase tracking-[0.14em] text-orange-100">Festival Mode</p>
        <h3 className="mt-2 text-2xl font-semibold">Creative output tuned for local culture and language</h3>
        <p className="mt-3 max-w-3xl text-sm text-zinc-200">
          This layout emphasizes expressive prompts and audience-specific output tone. Use it to validate emotionally
          rich content generation for campaigns, stories, and creator workflows.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-xs uppercase tracking-[0.14em] text-zinc-400">Aurora Storyboard</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {features.slice(0, 3).map((feature) => (
          <article key={feature} className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-zinc-300">
            {feature}
          </article>
        ))}
      </div>
    </section>
  );
}

export default function DemoPage() {
  const params = useParams<{ slug: string | string[] }>();
  const router = useRouter();

  const slug = useMemo(() => {
    if (!params?.slug) {
      return '';
    }

    return Array.isArray(params.slug) ? params.slug[0] : params.slug;
  }, [params]);

  const demo = useMemo(() => getDemoBySlug(slug), [slug]);

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const [customKey, setCustomKey] = useState('');
  const [hasServerKey, setHasServerKey] = useState<boolean | null>(null);
  const [authError, setAuthError] = useState('');
  const [showCustomKeyInput, setShowCustomKeyInput] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('hi-IN');

  useEffect(() => {
    if (!demo) {
      return;
    }

    setInput(demo.placeholder);
    setOutput('');
    setAuthError('');
    setShowCustomKeyInput(false);
    setTargetLanguage(demo.targetLanguage ?? 'hi-IN');
  }, [demo]);

  useEffect(() => {
    let isMounted = true;

    fetch('/api/sarvam/status')
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Status check failed (${res.status})`);
        }
        const data = (await res.json()) as { hasKey?: boolean };

        if (isMounted && typeof data.hasKey === 'boolean') {
          setHasServerKey(data.hasKey);
          if (!data.hasKey) {
            setShowCustomKeyInput(true);
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          setHasServerKey(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const shouldShowKeyInput = showCustomKeyInput || hasServerKey === false || Boolean(authError);

  const demoIndex = useMemo(() => {
    if (!demo) {
      return -1;
    }
    return DEMO_CATALOG.findIndex((item) => item.slug === demo.slug);
  }, [demo]);

  const previousDemo = demoIndex > 0 ? DEMO_CATALOG[demoIndex - 1] : null;
  const nextDemo = demoIndex >= 0 && demoIndex < DEMO_CATALOG.length - 1 ? DEMO_CATALOG[demoIndex + 1] : null;

  if (!demo) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-24 text-zinc-100">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-black/40 p-8">
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-400">Invalid Demo Slug</p>
          <h1 className="mt-3 text-4xl font-semibold">Demo not found</h1>
          <p className="mt-3 text-zinc-300">
            The route you opened does not match the demo catalog. Choose one of the available demos below.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {DEMO_CATALOG.slice(0, 8).map((entry) => (
              <Link
                key={entry.slug}
                href={`/demos/${entry.slug}`}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm transition hover:border-white/30"
              >
                {entry.title}
              </Link>
            ))}
          </div>

          <button
            onClick={() => router.push('/')}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to homepage
          </button>
        </div>
      </main>
    );
  }

  const Icon = DEMO_ICON_MAP[demo.slug] ?? Brain;
  const tone = TONE_CLASS_MAP[demo.tone];
  const layout = LAYOUT_CLASS_MAP[demo.layout];

  async function runDemoTest() {
    if (!demo || !input.trim()) {
      return;
    }

    setLoading(true);
    setOutput('');

    try {
      const requestPayload = getApiPayload(demo.mode, input, targetLanguage, demo.systemPrompt);

      const response = await fetch('/api/sarvam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...requestPayload,
          customApiKey: customKey,
        }),
      });

      const data = (await response.json()) as {
        error?: string;
        translated_text?: string;
        choices?: Array<{ message?: { content?: string } }>;
      };

      if (!response.ok) {
        const message = data.error ?? 'Request failed.';
        setOutput(`HTTP ${response.status}: ${message}`);

        if (response.status === 401 || response.status === 403) {
          setAuthError(message);
          setShowCustomKeyInput(true);
        }

        return;
      }

      setAuthError('');

      if (demo.mode === 'translate') {
        setOutput(data.translated_text ?? 'No translated text received.');
      } else {
        setOutput(data.choices?.[0]?.message?.content ?? 'No response received.');
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown network error';
      setOutput(`Network Error: ${message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={`relative min-h-screen overflow-hidden text-zinc-100 ${layout.page}`}>
      <div className={`pointer-events-none absolute inset-0 ${layout.accent}`} />
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tone.hero}`} />

      <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 text-sm text-zinc-300 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Showcase
          </button>

          <div className="flex items-center gap-3">
            <a
              href={githubTreeUrl(demo.repoPath)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.12em] text-zinc-200 transition hover:bg-white/10"
            >
              Repo Folder
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.12em] text-zinc-200 transition hover:bg-white/10 md:inline-flex"
            >
              Full GitHub
            </a>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-7xl px-6 pb-10 pt-12 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className={`glass-panel p-8 ${layout.card} shadow-2xl backdrop-blur-3xl`}
        >
          <p
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase font-semibold tracking-[0.2em] shadow-sm ${tone.badge}`}
          >
            <BadgeCheck className="h-3.5 w-3.5" />
            {demo.badge}
          </p>

          <div className="mt-5 flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">{demo.title}</h1>
              <p className="mt-4 text-lg text-zinc-200">{demo.tagline}</p>
              <p className="mt-3 text-sm text-zinc-300">{demo.description}</p>
            </div>

            <div className="rounded-3xl border border-white/15 bg-black/40 p-4">
              <Icon className="h-8 w-8" />
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-zinc-400">{layout.signature}</p>
            </div>
          </div>

          <div className={`mt-6 h-px w-full bg-gradient-to-r ${tone.line}`} />

          <div className="mt-5 grid gap-3 text-sm md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/45 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.12em] text-zinc-400">Demo Route</p>
              <p className="mt-1 font-medium text-zinc-200">/demos/{demo.slug}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/45 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.12em] text-zinc-400">Mode</p>
              <p className="mt-1 font-medium text-zinc-200">{demo.mode === 'chat' ? 'Chat Completion' : 'Translation'}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/45 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.12em] text-zinc-400">Folder</p>
              <p className="mt-1 font-medium text-zinc-200">examples/{demo.folder}</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-10 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className={`glass-panel p-7 ${layout.card} shadow-xl backdrop-blur-2xl`}
        >
          <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="text-[10px] uppercase font-semibold tracking-[0.2em] text-zinc-500">Live Demo Testbench</p>
              <h2 className="mt-2 text-2xl font-medium tracking-tight">Run this example with Sarvam API</h2>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs uppercase tracking-[0.14em] text-zinc-300">
              {demo.mode === 'chat' ? 'Chat' : 'Translate'}
            </div>
          </div>

          {shouldShowKeyInput && (
            <div className={`mb-5 rounded-2xl border p-4 ${tone.panel}`}>
              <p className="mb-2 flex items-center gap-2 text-sm text-zinc-100">
                <KeyRound className="h-4 w-4" />
                {authError || 'Server API key unavailable. Add a temporary key to continue.'}
              </p>
              <input
                type="password"
                value={customKey}
                onChange={(event) => setCustomKey(event.target.value)}
                placeholder="Paste Sarvam API key for this session"
                className="w-full rounded-xl border border-white/20 bg-black/50 px-3 py-2 text-sm outline-none placeholder:text-zinc-500"
              />
            </div>
          )}

          <label className="block">
            <p className="mb-2 text-xs uppercase tracking-[0.12em] text-zinc-400">Prompt</p>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={demo.placeholder}
              className="h-36 w-full resize-none rounded-2xl border border-white/15 bg-black/50 p-4 text-sm outline-none"
            />
          </label>

          {demo.mode === 'translate' && (
            <label className="mt-4 block">
              <p className="mb-2 text-xs uppercase tracking-[0.12em] text-zinc-400">Target Language</p>
              <select
                value={targetLanguage}
                onChange={(event) => setTargetLanguage(event.target.value)}
                className="w-full rounded-xl border border-white/20 bg-black/50 px-3 py-2 text-sm outline-none"
              >
                {LANGUAGE_OPTIONS.map((language) => (
                  <option key={language.value} value={language.value}>
                    {language.label}
                  </option>
                ))}
              </select>
            </label>
          )}

          <button
            onClick={runDemoTest}
            disabled={loading || !input.trim()}
            className={`mt-4 glass-button shadow-md inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-medium transition hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500 ${tone.button}`}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Gauge className="h-4 w-4" />}
            Run {demo.mode === 'chat' ? 'Chat Test' : 'Translation Test'}
          </button>

          <div className="mt-6 min-h-[12rem] rounded-xl border border-white/5 bg-black/30 p-5 text-sm text-zinc-200 shadow-inner">
            {!output && !loading && <p className="text-zinc-500 font-light italic">Result appears here after running this demo.</p>}
            {output && <p className="whitespace-pre-wrap leading-relaxed font-light">{output}</p>}
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="space-y-6"
        >
          <article className={`glass-panel rounded-[2rem] p-6 backdrop-blur-xl shadow-lg`}>
            <p className="text-[10px] uppercase font-semibold tracking-[0.2em] text-zinc-500">Original Features</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-200">
              {demo.originalFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/70" />
                  {feature}
                </li>
              ))}
            </ul>
          </article>

          <article className="glass-panel rounded-[2rem] p-6 backdrop-blur-xl shadow-lg">
            <p className="text-[10px] uppercase font-semibold tracking-[0.2em] text-zinc-500">Quick Actions</p>
            <div className="mt-3 space-y-2">
              <a
                href={githubTreeUrl(demo.repoPath)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm transition hover:border-white/30"
              >
                Open folder in GitHub
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm transition hover:border-white/30"
              >
                Open full repository
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </article>

          <article className="glass-panel rounded-[2rem] p-6 backdrop-blur-xl shadow-lg">
            <p className="text-[10px] uppercase font-semibold tracking-[0.2em] text-zinc-500">Demo Navigation</p>
            <div className="mt-3 grid gap-2">
              {previousDemo ? (
                <Link
                  href={`/demos/${previousDemo.slug}`}
                  className="inline-flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm hover:border-white/30"
                >
                  {previousDemo.title}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <p className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-zinc-500">
                  This is the first demo in catalog order.
                </p>
              )}

              {nextDemo ? (
                <Link
                  href={`/demos/${nextDemo.slug}`}
                  className="inline-flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm hover:border-white/30"
                >
                  {nextDemo.title}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <p className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-zinc-500">
                  This is the last demo in catalog order.
                </p>
              )}
            </div>
          </article>
        </motion.aside>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <LayoutSignature layout={demo.layout} title={demo.title} features={demo.originalFeatures} />
      </section>

      <section className="border-t border-white/10 bg-black/35">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-sm text-zinc-300">
          <p className="inline-flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Sarvam AI demo route tuned for Indian language-first product workflows.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-100 hover:text-white">
            Explore full showcase
            <Compass className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
