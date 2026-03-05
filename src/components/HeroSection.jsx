import React from 'react';
import { motion } from 'framer-motion';
import { Monitor } from 'lucide-react';
import { useAppPreferences } from '../contexts/AppPreferencesContext.jsx';
import { getLocalizedCopy } from '../i18n/localize.js';
import DownloadButton from './DownloadButton.jsx';
import ToolLogos from './ToolLogos.jsx';

/* ------------------------------------------------------------------ */
/*  Localised copy                                                     */
/* ------------------------------------------------------------------ */
const copy = {
  en: {
    title: 'Watch Your Apps.',
    subtitle: 'Sleep Well.',
    description:
      'A lightweight macOS menu bar app that monitors your windows and alerts you the moment something needs attention. No OCR, no overhead\u2014just native APIs and instant notifications.',
    download: 'Download for macOS',
    worksWith: 'Monitors any app with a window',
    screenshotAlt: 'App screenshot placeholder',
  },
  zh: {
    title: '守护你的应用。',
    subtitle: '安心工作。',
    description:
      '轻量级 macOS 菜单栏应用，监控窗口状态，第一时间通知你。无 OCR、无截图，原生 API 驱动，即时告警。',
    download: '下载 macOS 版本',
    worksWith: '监控任何有窗口的应用',
    screenshotAlt: '应用截图占位',
  },
};

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 },
  }),
};

/* ------------------------------------------------------------------ */
/*  Screenshot placeholder                                             */
/* ------------------------------------------------------------------ */
function ScreenshotPlaceholder({ alt }) {
  return (
    <div
      className={[
        'relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl',
        'aspect-video',
        'border border-gray-200/60 dark:border-white/10',
        'bg-gradient-to-br from-gray-50 via-white to-gray-100',
        'dark:from-gray-900 dark:via-gray-800 dark:to-gray-900',
        'shadow-xl shadow-black/5 dark:shadow-black/30',
      ].join(' ')}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Centre content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#002FA7]/10 dark:bg-[#002FA7]/20">
          <Monitor className="h-7 w-7 text-[#002FA7] dark:text-[#6B8CFF]" />
        </div>
        <span className="text-sm font-medium text-gray-400 dark:text-gray-500">
          {alt}
        </span>
      </div>

      {/* Top "title bar" decoration */}
      <div className="absolute left-0 right-0 top-0 flex h-8 items-center gap-1.5 border-b border-gray-200/40 bg-gray-100/60 px-3 dark:border-white/5 dark:bg-white/5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HeroSection                                                        */
/* ------------------------------------------------------------------ */
export default function HeroSection() {
  const { language } = useAppPreferences();
  const t = getLocalizedCopy(copy, language);

  return (
    <section className="relative isolate overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
      {/* ---- Ambient glow (Klein Blue) ---- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(0, 47, 167, 0.10) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-3xl dark:opacity-20"
        style={{ background: 'rgba(0, 47, 167, 0.12)' }}
      />

      {/* ---- Content ---- */}
      <div className="mx-auto max-w-5xl px-6 text-center">
        {/* Title */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white"
        >
          {t.title}
          <br />
          <span className="text-[#002FA7] dark:text-[#6B8CFF]">{t.subtitle}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400"
        >
          {t.description}
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <DownloadButton size="lg" />
        </motion.div>

        {/* Screenshot placeholder */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-16"
        >
          <ScreenshotPlaceholder alt={t.screenshotAlt} />
        </motion.div>

        {/* Tool logos */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="mt-14"
        >
          <ToolLogos />
        </motion.div>
      </div>
    </section>
  );
}
