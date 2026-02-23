'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
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
  Files,
  FlaskConical,
  Globe,
  KeyRound,
  Languages,
  Loader2,
  MapPinned,
  Mic,
  MonitorPlay,
  NotebookText,
  Sparkles,
  SquareLibrary,
  Waves,
  Layers,
} from 'lucide-react';
import {
  DEMO_CATALOG,
  NOTEBOOK_AREAS,
  REPO_AREAS,
  getDemoBySlug,
  type DemoMode,
  type DemoTone,
} from '@/lib/showcase-data';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

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
    card: string;
    chip: string;
    glow: string;
  }
> = {
  marigold: {
    card: 'from-amber-500/20 via-orange-500/10 to-zinc-950',
    chip: 'border-amber-300/40 text-amber-200 bg-amber-500/10',
    glow: 'shadow-[0_0_42px_-20px_rgba(251,191,36,0.7)]',
  },
  teal: {
    card: 'from-teal-500/20 via-cyan-500/10 to-zinc-950',
    chip: 'border-teal-300/40 text-teal-200 bg-teal-500/10',
    glow: 'shadow-[0_0_42px_-20px_rgba(45,212,191,0.7)]',
  },
  crimson: {
    card: 'from-rose-500/20 via-red-500/10 to-zinc-950',
    chip: 'border-rose-300/40 text-rose-200 bg-rose-500/10',
    glow: 'shadow-[0_0_42px_-20px_rgba(251,113,133,0.7)]',
  },
  indigo: {
    card: 'from-indigo-500/20 via-blue-500/10 to-zinc-950',
    chip: 'border-indigo-300/40 text-indigo-200 bg-indigo-500/10',
    glow: 'shadow-[0_0_42px_-20px_rgba(129,140,248,0.7)]',
  },
  violet: {
    card: 'from-violet-500/20 via-fuchsia-500/10 to-zinc-950',
    chip: 'border-violet-300/40 text-violet-200 bg-violet-500/10',
    glow: 'shadow-[0_0_42px_-20px_rgba(167,139,250,0.7)]',
  },
  lime: {
    card: 'from-lime-500/20 via-emerald-500/10 to-zinc-950',
    chip: 'border-lime-300/40 text-lime-200 bg-lime-500/10',
    glow: 'shadow-[0_0_42px_-20px_rgba(132,204,22,0.7)]',
  },
  sky: {
    card: 'from-sky-500/20 via-cyan-500/10 to-zinc-950',
    chip: 'border-sky-300/40 text-sky-200 bg-sky-500/10',
    glow: 'shadow-[0_0_42px_-20px_rgba(56,189,248,0.7)]',
  },
  amber: {
    card: 'from-amber-500/20 via-yellow-500/10 to-zinc-950',
    chip: 'border-amber-300/40 text-amber-200 bg-amber-500/10',
    glow: 'shadow-[0_0_42px_-20px_rgba(245,158,11,0.7)]',
  },
  slate: {
    card: 'from-slate-500/20 via-slate-400/10 to-zinc-950',
    chip: 'border-slate-300/40 text-slate-200 bg-slate-500/10',
    glow: 'shadow-[0_0_42px_-20px_rgba(148,163,184,0.7)]',
  },
  orange: {
    card: 'from-orange-500/20 via-amber-500/10 to-zinc-950',
    chip: 'border-orange-300/40 text-orange-200 bg-orange-500/10',
    glow: 'shadow-[0_0_42px_-20px_rgba(251,146,60,0.7)]',
  },
  cyan: {
    card: 'from-cyan-500/20 via-sky-500/10 to-zinc-950',
    chip: 'border-cyan-300/40 text-cyan-200 bg-cyan-500/10',
    glow: 'shadow-[0_0_42px_-20px_rgba(34,211,238,0.7)]',
  },
  rose: {
    card: 'from-rose-500/20 via-pink-500/10 to-zinc-950',
    chip: 'border-rose-300/40 text-rose-200 bg-rose-500/10',
    glow: 'shadow-[0_0_42px_-20px_rgba(244,63,94,0.7)]',
  },
  emerald: {
    card: 'from-emerald-500/20 via-green-500/10 to-zinc-950',
    chip: 'border-emerald-300/40 text-emerald-200 bg-emerald-500/10',
    glow: 'shadow-[0_0_42px_-20px_rgba(16,185,129,0.7)]',
  },
  gold: {
    card: 'from-yellow-500/20 via-amber-500/10 to-zinc-950',
    chip: 'border-yellow-300/40 text-yellow-200 bg-yellow-500/10',
    glow: 'shadow-[0_0_42px_-20px_rgba(234,179,8,0.7)]',
  },
  mint: {
    card: 'from-green-400/20 via-emerald-500/10 to-zinc-950',
    chip: 'border-green-300/40 text-green-200 bg-green-500/10',
    glow: 'shadow-[0_0_42px_-20px_rgba(74,222,128,0.7)]',
  },
  cobalt: {
    card: 'from-blue-500/20 via-indigo-500/10 to-zinc-950',
    chip: 'border-blue-300/40 text-blue-200 bg-blue-500/10',
    glow: 'shadow-[0_0_42px_-20px_rgba(59,130,246,0.7)]',
  },
  orchid: {
    card: 'from-fuchsia-500/20 via-violet-500/10 to-zinc-950',
    chip: 'border-fuchsia-300/40 text-fuchsia-200 bg-fuchsia-500/10',
    glow: 'shadow-[0_0_42px_-20px_rgba(217,70,239,0.7)]',
  },
  sunset: {
    card: 'from-orange-500/20 via-rose-500/10 to-zinc-950',
    chip: 'border-orange-300/40 text-orange-200 bg-orange-500/10',
    glow: 'shadow-[0_0_42px_-20px_rgba(249,115,22,0.7)]',
  },
};

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

  const messages = [] as Array<{ role: 'system' | 'user'; content: string }>;
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
      max_tokens: 500,
    },
  };
}

export default function HomePage() {
  const [selectedDemoSlug, setSelectedDemoSlug] = useState(DEMO_CATALOG[0].slug);
  const [input, setInput] = useState(DEMO_CATALOG[0].placeholder);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const [customKey, setCustomKey] = useState('');
  const [hasServerKey, setHasServerKey] = useState<boolean | null>(null);
  const [authError, setAuthError] = useState('');
  const [showCustomKeyInput, setShowCustomKeyInput] = useState(false);

  const selectedDemo = useMemo(() => {
    return getDemoBySlug(selectedDemoSlug) ?? DEMO_CATALOG[0];
  }, [selectedDemoSlug]);

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

  async function runPlayground() {
    if (!input.trim()) {
      return;
    }

    setLoading(true);
    setOutput('');

    try {
      const requestPayload = getApiPayload(
        selectedDemo.mode,
        input,
        selectedDemo.targetLanguage ?? 'hi-IN',
        selectedDemo.systemPrompt,
      );

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
        const errorText = data.error ?? 'Request failed.';
        setOutput(`HTTP ${response.status}: ${errorText}`);

        if (response.status === 401) {
          setAuthError(errorText);
          setShowCustomKeyInput(true);
        }

        return;
      }

      setAuthError('');

      if (selectedDemo.mode === 'translate') {
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
    <main className="min-h-screen text-zinc-100 selection:bg-white/90 selection:text-black">
      {/* Dynamic Ambient Background Elements */}
      <div className="ambient-glow bg-[rgba(251,146,60,0.4)] w-[600px] h-[600px] top-[-200px] left-[-200px]" />
      <div className="ambient-glow bg-[rgba(16,185,129,0.3)] w-[500px] h-[500px] top-[20%] right-[-100px]" />
      <div className="ambient-glow bg-[rgba(14,165,233,0.3)] w-[700px] h-[700px] bottom-[-200px] left-[10%]" />

      {/* Noise Texture Overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Glassmorphic Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-x-0 border-t-0 bg-black/20 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#0c0c0c] to-[#1a1a1a] text-cyan-400 border border-white/10 shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M12 2L14.09 9.26L22 12L14.09 14.74L12 22L9.91 14.74L2 12L9.91 9.26L12 2Z"></path>
              </svg>
            </div>
            <span className="font-display flex items-baseline gap-1.5"><strong className="text-xl tracking-tight text-white font-semibold">Sarvam AI</strong> <span className="text-sm font-light text-zinc-400 tracking-wide">Cookbook</span></span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#demo-catalog" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">
              Demos
            </a>
            <a
              href="https://www.npmjs.com/package/@sarvam/api"
              target="_blank"
              rel="noreferrer"
              className="glass-button rounded-full px-4 py-1.5 text-sm font-medium transition-transform hover:scale-105 flex items-center gap-2"
            >
              <svg viewBox="0 0 780 250" className="h-3 text-[#cb3837]" fill="currentColor"><g><path d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"></path></g></svg>
              npm
            </a>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noreferrer"
              className="glass-button rounded-full px-4 py-1.5 text-sm font-medium transition-transform hover:scale-105 flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.3 6-1.5 6-6.76 0-1.4-.5-2.6-1.3-3.5.1-.3.6-1.7-.1-3.5 0 0-1-.3-3.3 1.2a11.5 11.5 0 0 0-6 0C6 2.7 5 3 5 3c-.7 1.8-.2 3.2-.1 3.5-.8.9-1.3 2.1-1.3 3.5 0 5.2 3 6.4 6 6.76-.9.8-1 2.3-1 3.24v4"></path><path d="M10 20.5 5 20s-3-1-3-3"></path></svg>
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden pt-36 pb-24 md:pb-32 md:pt-48">
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="relative mx-auto max-w-7xl flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex m-auto items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-zinc-300 backdrop-blur-md shadow-sm"
            >
              <BadgeCheck className="h-3.5 w-3.5 text-emerald-400" />
              Sarvam AI Cookbook Experience
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-5xl font-display text-5xl font-medium tracking-tight leading-[1.1] md:text-[5.5rem]"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500">
                India-first AI demos.
              </span>
              <span className="block mt-2">Real developer workflows.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-2xl text-lg text-zinc-400 md:text-xl font-light leading-relaxed"
            >
              This site maps the full Sarvam AI repository. Explore interactive demo routes,
              notebooks, integrations, sample data, and elegant architectures.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 flex flex-wrap justify-center items-center gap-4"
            >
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noreferrer"
                className="glass-button inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_24px_rgba(255,255,255,0.2)]"
              >
                Open Full GitHub Repo
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#demo-catalog"
                className="glass-button inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white transition-all hover:scale-105 active:scale-95"
              >
                Explore Demo Routes
                <Compass className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 md:py-24 relative z-10">
        <div className="mb-10 flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center justify-center mb-4 h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-400/30">
            <Files className="h-6 w-6 text-cyan-300" />
          </div>
          <h2 className="font-display text-4xl font-medium tracking-tight">Repository Atlas</h2>
          <p className="mt-3 text-zinc-400 max-w-xl">A complete map to every folder, notebook, and integration available in the open ecosystem.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {REPO_AREAS.map((area, index) => (
            <motion.a
              key={area.id}
              href={githubTreeUrl(area.path)}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className={`glass-panel glass-panel-hover group rounded-3xl p-6 transition-all duration-300`}
            >
              <div className={`mb-4 inline-flex items-center justify-center rounded-xl p-2.5 bg-gradient-to-br ${area.colorClass}`}>
                <Layers className="h-5 w-5 text-white" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-400">{area.countLabel}</p>
              <h3 className="mt-2 text-xl font-medium tracking-tight text-white">{area.title}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{area.description}</p>
              <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">
                {area.path}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </p>
            </motion.a>
          ))}
        </div>

        <div className="mt-12 glass-panel rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative z-10 mb-6 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/20 border border-orange-500/30">
              <NotebookText className="h-5 w-5 text-orange-400" />
            </div>
            <h3 className="text-2xl font-medium tracking-tight">Notebook Collections</h3>
          </div>
          <div className="relative z-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {NOTEBOOK_AREAS.map((notebook) => (
              <a
                key={notebook.id}
                href={githubTreeUrl(notebook.path)}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20"
              >
                <div className="flex justify-between items-start">
                  <p className="text-[10px] uppercase font-semibold tracking-[0.15em] text-orange-300/80">{notebook.path}</p>
                  <ArrowRight className="h-3 w-3 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
                </div>
                <h4 className="mt-3 text-lg font-medium text-white">{notebook.title}</h4>
                <p className="mt-1.5 text-sm text-zinc-400">{notebook.focus}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="demo-catalog" className="mx-auto max-w-7xl px-6 pb-20 relative z-10">
        <div className="mb-10 flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center justify-center mb-4 h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-teal-600/20 border border-emerald-400/30">
            <FlaskConical className="h-6 w-6 text-emerald-300" />
          </div>
          <h2 className="font-display text-4xl font-medium tracking-tight">Dedicated Demo Routes</h2>
          <p className="mt-3 text-zinc-400 max-w-xl">Every example folder is paired with an interactive frontend playground. Navigate them below.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {DEMO_CATALOG.map((demo, index) => {
            const Icon = DEMO_ICON_MAP[demo.slug] ?? Brain;
            const tone = TONE_CLASS_MAP[demo.tone];

            return (
              <motion.div
                key={demo.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className={`glass-panel glass-panel-hover group flex flex-col rounded-[2rem] p-7 transition-all duration-300 overflow-hidden relative`}
              >
                {/* Subtle Ambient Glow */}
                <div className={`absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br ${tone.card} blur-[60px] opacity-40 rounded-full pointer-events-none group-hover:opacity-60 transition-opacity`} />
                <div className="relative z-10 mb-6 flex items-start justify-between gap-4">
                  <div>
                    <Badge variant="secondary" className={`${tone.chip} px-3 py-1 text-[10px] uppercase font-semibold tracking-[0.2em] shadow-sm`}>
                      {demo.badge}
                    </Badge>
                    <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-white">{demo.title}</h3>
                  </div>
                  <div className="flex items-center justify-center h-12 w-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-inner">
                    <Icon className="h-5 w-5 text-zinc-200" />
                  </div>
                </div>

                <div className="relative z-10 flex-grow">
                  <p className="text-sm text-zinc-300 leading-relaxed font-light">{demo.tagline}</p>
                  <p className="mt-3 text-sm text-zinc-500">{demo.quickTest}</p>
                </div>

                <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-3">
                  <a
                    href={githubTreeUrl(demo.repoPath)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 min-w-0 text-[10px] uppercase font-semibold tracking-[0.15em] text-zinc-400 hover:text-white transition-colors truncate"
                    title={demo.folder}
                  >
                    {demo.folder}
                  </a>
                  <Link
                    href={`/demos/${demo.slug}`}
                    className="glass-button shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-white transition-transform hover:scale-105"
                  >
                    Open Demo
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="relative glass-panel rounded-t-[3rem] border-b-0">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-500/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-300 shadow-sm backdrop-blur-sm">
              <Globe className="h-3.5 w-3.5" />
              Live API Playground
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight">Validate any Sarvam flow instantly.</h2>
            <p className="mt-5 max-w-xl text-zinc-400 leading-relaxed font-light">
              Pick a demo profile, run its representative prompt, and verify real endpoint behavior. API key input appears
              only when server-side key resolution fails.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="glass-panel rounded-2xl p-5 text-sm transition-all focus-within:border-white/30 focus-within:ring-1 focus-within:ring-white/30">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Demo Profile</p>
                <Select
                  value={selectedDemoSlug}
                  onValueChange={(value) => {
                    const nextDemo = getDemoBySlug(value);
                    setSelectedDemoSlug(value);
                    setInput(nextDemo?.placeholder ?? '');
                    setOutput('');
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a demo" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEMO_CATALOG.map((demo) => (
                      <SelectItem key={demo.slug} value={demo.slug}>
                        {demo.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="glass-panel rounded-2xl p-5 text-sm">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Mode</p>
                <p className="inline-flex items-center gap-2 font-medium text-zinc-200">
                  {selectedDemo.mode === 'chat' ? <Bot className="h-4 w-4 text-cyan-400" /> : <Languages className="h-4 w-4 text-emerald-400" />}
                  {selectedDemo.mode === 'chat' ? 'Chat Completion' : 'Translation'}
                </p>
              </div>
            </div>

            {shouldShowKeyInput && (
              <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 backdrop-blur-md">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-amber-200">
                  <KeyRound className="h-4 w-4" />
                  {authError || 'Server API key not found. Provide a temporary key to continue.'}
                </div>
                <Input
                  type="password"
                  value={customKey}
                  onChange={(event) => setCustomKey(event.target.value)}
                  placeholder="Paste Sarvam API key for this session"
                />
              </div>
            )}
          </div>

          <div className="glass-panel glass-panel-hover rounded-[2rem] p-7 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Test Prompt</p>
              <Textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={selectedDemo.placeholder}
              />
              <Button
                onClick={runPlayground}
                disabled={loading || !input.trim()}
                className="mt-4 w-full justify-center transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4 text-amber-300" />}
                Run Demo Test
              </Button>

              <div className="mt-6 flex-grow rounded-xl border border-white/10 bg-black/40 p-5 text-sm text-zinc-200 shadow-inner">
                {!output && !loading && (
                  <p className="text-zinc-500 font-light italic">Result appears here after running the selected demo prompt.</p>
                )}
                {output && <p className="whitespace-pre-wrap leading-relaxed font-light">{output}</p>}
              </div>

              <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Current Demo Path</p>
                  <a
                    href={githubTreeUrl(selectedDemo.repoPath)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 flex items-center gap-2 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    {selectedDemo.repoPath}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-24 pb-32">
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl font-medium tracking-tight">Ecosystem Architecture</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="glass-panel glass-panel-hover rounded-[2rem] p-8 text-center sm:text-left transition-transform duration-300">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/20">
              <Globe className="h-6 w-6 text-orange-400" />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-300/80">Design Philosophy</p>
            <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-white">Built for India</h3>
            <p className="mt-4 text-sm font-light leading-relaxed text-zinc-400">
              Regional language intent, transliteration behavior, and culturally grounded prompts are treated as first-class
              product requirements rather than afterthoughts.
            </p>
          </div>
          <div className="glass-panel glass-panel-hover rounded-[2rem] p-8 text-center sm:text-left transition-transform duration-300">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10 border border-teal-500/20">
              <Layers className="h-6 w-6 text-teal-400" />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-300/80">Ecosystem Depth</p>
            <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-white">Full Stack Assets</h3>
            <p className="mt-4 text-sm font-light leading-relaxed text-zinc-400">
              The repository includes end-to-end apps, focused notebooks, and premium sample assets so teams can seamlessly go
              from idea to production deployment.
            </p>
          </div>
          <div className="glass-panel glass-panel-hover rounded-[2rem] p-8 text-center sm:text-left transition-transform duration-300">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
              <Bot className="h-6 w-6 text-cyan-400" />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">Developer Velocity</p>
            <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-white">Production Patterns</h3>
            <p className="mt-4 text-sm font-light leading-relaxed text-zinc-400">
              Battle-tested CI checks, deployment orchestrations, and modular interactive demo routes make this a
              powerful launchpad for modern Indian products.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-md py-12 relative z-10 mt-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-[#0c0c0c] to-[#1a1a1a] text-cyan-400 border border-white/10">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                <path d="M12 2L14.09 9.26L22 12L14.09 14.74L12 22L9.91 14.74L2 12L9.91 9.26L12 2Z"></path>
              </svg>
            </div>
            <span className="font-display font-semibold text-zinc-200">Sarvam AI</span>
          </div>
          <p className="text-sm text-zinc-500 font-light text-center md:text-left">
            © {new Date().getFullYear()} Sarvam AI. Built for India.
          </p>
          <div className="flex items-center gap-6">
            <a href={GITHUB_REPO} className="text-zinc-500 hover:text-white transition-colors text-sm">GitHub</a>
            <a href="https://www.npmjs.com/package/@sarvam/api" className="text-zinc-500 hover:text-white transition-colors text-sm">npm Package</a>
            <a href="https://sarvam.ai" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors text-sm">sarvam.ai</a>
          </div>
        </div>
      </footer>
    </main >
  );
}
