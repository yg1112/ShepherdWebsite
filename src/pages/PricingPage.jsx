import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Download, ArrowRight, Shield, Zap, Eye } from 'lucide-react';
import { useAppPreferences } from '../contexts/AppPreferencesContext.jsx';
import { getLocalizedCopy } from '../i18n/localize.js';

/* ───────────────────────── copy dictionary ───────────────────────── */

const DOWNLOAD_URL =
  'https://github.com/YukunGao/shepherd-releases/releases/latest/download/Shepherd.dmg';

const copy = {
  titleLine1: { en: 'Monitor smarter.', zh: '更聪明地监控。' },
  titleLine2: { en: 'Sleep better.', zh: '更安心地工作。' },
  subtitle: {
    en: 'A macOS menu bar companion that watches your apps so you don\u2019t have to. From heartbeat checks to semantic alerts.',
    zh: 'macOS 菜单栏伴侣，替你守护应用。从心跳检测到语义告警，全面覆盖。',
  },
  mostPopular: { en: 'Most Popular', zh: '最受欢迎' },
  privacyPromise: {
    en: 'No screenshots. No OCR. No data collection. Your privacy is non-negotiable.',
    zh: '无截图、无 OCR、无数据收集。隐私不可妥协。',
  },
  howItWorksTitle: { en: 'How It Works', zh: '使用方式' },
  steps: {
    en: ['Download Shepherd', 'Pick Your Windows', 'Relax'],
    zh: ['下载 Shepherd', '选择窗口', '安心工作'],
  },
  stepDescription: {
    en: 'Download, pick the windows you want to monitor, and let Shepherd handle the rest. Alerts come to you\u2014no checking required.',
    zh: '下载后选择要监控的窗口，剩下的交给 Shepherd。告警会主动找你——无需主动检查。',
  },
  faqTitle: { en: 'Frequently Asked Questions', zh: '常见问题' },
  ctaTitle: { en: 'Start monitoring today.', zh: '立即开始监控。' },
  ctaButton: { en: 'Download for macOS', zh: '下载 macOS 版本' },
};

const tiers = [
  {
    id: 'free',
    name: 'Shepherd',
    mode: { en: 'Free', zh: '免费' },
    priceMain: { en: 'Free', zh: '免费' },
    priceSup: '',
    cadence: { en: '', zh: '' },
    description: {
      en: 'Essential monitoring for developers who want peace of mind',
      zh: '为追求安心的开发者提供基础监控',
    },
    features: {
      en: [
        'Heartbeat monitoring for up to 3 windows.',
        'System notifications on app crash or freeze.',
        'Mission Control window picker.',
        'Visual watcher marks on monitored windows.',
      ],
      zh: [
        '最多 3 个窗口的心跳监控。',
        '应用崩溃或冻结时系统通知。',
        'Mission Control 窗口选择器。',
        '监控窗口上的可视化守望标记。',
      ],
    },
    cta: { en: 'Download Free', zh: '免费下载' },
    checkoutUrl: DOWNLOAD_URL,
    footnote: { en: 'Free forever', zh: '永久免费' },
    featured: false,
  },
  {
    id: 'pro',
    name: 'Shepherd Pro',
    mode: { en: 'Pro', zh: 'Pro' },
    priceMain: { en: '$9', zh: '$9' },
    priceSup: '.99',
    cadence: { en: '/month', zh: '/月' },
    description: {
      en: 'Full monitoring suite with semantic analysis and remote supervision.',
      zh: '完整监控套件，包含语义分析与远程监控。',
    },
    features: {
      en: [
        'Unlimited watched windows.',
        'Semantic text analysis for terminal output.',
        'Built-in keyword presets (Agent Coding, Build & Deploy, Runtime Ops, Test).',
        'Webhook integration for custom alerts.',
        'Remote supervision\u2014check status from your phone, anywhere.',
      ],
      zh: [
        '无限监控窗口。',
        '终端输出语义文本分析。',
        '内置关键词预设（Agent 编程、构建部署、运行时运维、测试）。',
        'Webhook 集成自定义告警。',
        '远程监控——手机随时查看状态，随时随地。',
      ],
    },
    cta: { en: 'Start Subscription', zh: '开始订阅' },
    checkoutUrl: 'https://shepherd.lemonsqueezy.com/checkout/buy/placeholder',
    footnote: {
      en: 'Cancel anytime \u00b7 30-day refund \u00b7 Supporting indie development',
      zh: '随时取消 \u00b7 30 天退款 \u00b7 支持独立开发',
    },
    featured: true,
  },
];

const faqItems = [
  {
    q: {
      en: 'Does Shepherd need accessibility permissions?',
      zh: 'Shepherd 需要辅助功能权限吗？',
    },
    a: {
      en: 'Yes. Shepherd uses macOS Accessibility APIs to read window content and detect app states. No data leaves your machine\u2014everything runs locally.',
      zh: '需要。Shepherd 使用 macOS 辅助功能 API 读取窗口内容和检测应用状态。数据不会离开你的电脑——一切在本地运行。',
    },
  },
  {
    q: {
      en: 'How does semantic text analysis work without OCR?',
      zh: '没有 OCR 如何实现语义文本分析？',
    },
    a: {
      en: 'Shepherd uses AppleScript to read terminal text directly from the accessibility tree. This is faster, more accurate, and uses zero CPU for image processing.',
      zh: 'Shepherd 通过 AppleScript 直接从辅助功能树读取终端文本。这比 OCR 更快、更准确，且图像处理零 CPU 开销。',
    },
  },
  {
    q: {
      en: 'Which terminal apps are supported?',
      zh: '支持哪些终端应用？',
    },
    a: {
      en: 'Terminal.app, iTerm2, Warp, and any app that exposes text through macOS accessibility APIs. Code editors like VS Code and Cursor are also supported.',
      zh: 'Terminal.app、iTerm2、Warp，以及任何通过 macOS 辅助功能 API 暴露文本的应用。VS Code 和 Cursor 等代码编辑器也支持。',
    },
  },
  {
    q: {
      en: 'How does remote supervision work?',
      zh: '远程监控如何工作？',
    },
    a: {
      en: 'Shepherd pushes alert data to a secure cloud endpoint. You can view your monitoring dashboard from any device with a web browser.',
      zh: 'Shepherd 将告警数据推送到安全的云端。你可以在任何有浏览器的设备上查看监控面板。',
    },
  },
  {
    q: {
      en: 'What\u2019s the CPU impact?',
      zh: '对 CPU 有多大影响？',
    },
    a: {
      en: 'Minimal. Heartbeat checks use native process APIs. Text analysis reads from the accessibility tree\u2014no screenshots or image processing. Watcher marks render at 20 FPS with hardware acceleration.',
      zh: '极小。心跳检测使用原生进程 API。文本分析从辅助功能树读取——无截图或图像处理。守望标记以 20FPS 硬件加速渲染。',
    },
  },
  {
    q: {
      en: 'Can I monitor non-terminal apps?',
      zh: '可以监控非终端应用吗？',
    },
    a: {
      en: 'Yes. Heartbeat monitoring works with any app. Semantic text analysis requires apps that expose text through accessibility APIs\u2014most terminal emulators and code editors do.',
      zh: '可以。心跳监控适用于任何应用。语义文本分析需要应用通过辅助功能 API 暴露文本——大多数终端模拟器和代码编辑器都支持。',
    },
  },
  {
    q: {
      en: 'How do Webhook integrations work?',
      zh: 'Webhook 集成如何工作？',
    },
    a: {
      en: 'Configure a Webhook URL in Shepherd Pro settings. When an alert triggers, Shepherd sends a JSON payload with the window name, alert type, and matched keywords.',
      zh: '在 Shepherd Pro 设置中配置 Webhook URL。当告警触发时，Shepherd 发送包含窗口名称、告警类型和匹配关键词的 JSON 载荷。',
    },
  },
];

/* ───────────────────────── step icons ───────────────────────── */

const stepIcons = [Download, Eye, Zap];

/* ───────────────────────── FAQ accordion item ───────────────────────── */

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200 dark:border-white/10">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-brand-primary dark:hover:text-blue-400"
      >
        <span className="pr-4 text-base font-medium text-gray-900 dark:text-white sm:text-lg">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="flex-shrink-0 text-gray-400 dark:text-gray-500"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────── pricing card ───────────────────────── */

function PricingCard({ tier, language, mostPopularLabel }) {
  const mode = getLocalizedCopy(tier.mode, language);
  const priceMain = getLocalizedCopy(tier.priceMain, language);
  const cadence = getLocalizedCopy(tier.cadence, language);
  const description = getLocalizedCopy(tier.description, language);
  const features = getLocalizedCopy(tier.features, language);
  const cta = getLocalizedCopy(tier.cta, language);
  const footnote = getLocalizedCopy(tier.footnote, language);

  const isFeatured = tier.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative flex"
    >
      {/* glow behind featured card */}
      {isFeatured && (
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/30 via-brand-primary/20 to-indigo-600/30 blur-xl" />
      )}

      <div
        className={`relative flex w-full flex-col rounded-2xl border p-8 sm:p-10 ${
          isFeatured
            ? 'border-brand-primary/40 bg-gradient-to-br from-gray-950 via-[#001040] to-gray-950 text-white shadow-2xl shadow-brand-primary/10'
            : 'border-gray-200 bg-white text-gray-900 shadow-lg dark:border-white/10 dark:bg-gray-900/80 dark:text-white'
        }`}
      >
        {/* badge */}
        {isFeatured && (
          <span className="absolute -top-3.5 left-6 rounded-full bg-brand-primary px-4 py-1 text-xs font-semibold tracking-wide text-white">
            {mostPopularLabel}
          </span>
        )}

        {/* header */}
        <div className="mb-6">
          <p
            className={`text-xs font-semibold uppercase tracking-widest ${
              isFeatured ? 'text-blue-300' : 'text-brand-primary dark:text-blue-400'
            }`}
          >
            {mode}
          </p>
          <h3
            className={`mt-2 text-2xl font-bold sm:text-3xl ${
              isFeatured ? 'text-white' : 'text-gray-900 dark:text-white'
            }`}
          >
            {tier.name}
          </h3>
        </div>

        {/* price */}
        <div className="mb-6 flex items-baseline gap-1">
          <span
            className={`text-5xl font-extrabold tracking-tight sm:text-6xl ${
              isFeatured ? 'text-white' : 'text-gray-900 dark:text-white'
            }`}
          >
            {priceMain}
          </span>
          {tier.priceSup && (
            <span
              className={`text-2xl font-bold sm:text-3xl ${
                isFeatured ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {tier.priceSup}
            </span>
          )}
          {cadence && (
            <span
              className={`ml-1 text-base font-medium ${
                isFeatured ? 'text-blue-300' : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {cadence}
            </span>
          )}
        </div>

        {/* description */}
        <p
          className={`mb-8 text-sm leading-relaxed sm:text-base ${
            isFeatured ? 'text-blue-100/80' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {description}
        </p>

        {/* features */}
        <ul className="mb-10 flex-1 space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                  isFeatured
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-brand-primary/10 text-brand-primary dark:bg-blue-500/20 dark:text-blue-400'
                }`}
              >
                <Check size={12} strokeWidth={3} />
              </span>
              <span
                className={`text-sm leading-relaxed ${
                  isFeatured ? 'text-blue-50/90' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <a
          href={tier.checkoutUrl}
          className={`group flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 sm:text-base ${
            isFeatured
              ? 'bg-white text-brand-primary hover:bg-blue-50 hover:shadow-lg hover:shadow-white/10'
              : 'bg-brand-primary text-white hover:bg-brand-dark hover:shadow-lg hover:shadow-brand-primary/20'
          }`}
        >
          {cta}
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </a>

        {/* footnote */}
        <p
          className={`mt-4 text-center text-xs ${
            isFeatured ? 'text-blue-300/60' : 'text-gray-400 dark:text-gray-500'
          }`}
        >
          {footnote}
        </p>
      </div>
    </motion.div>
  );
}

/* ───────────────────────── page component ───────────────────────── */

export default function PricingPage() {
  const { language } = useAppPreferences();
  const [openFAQ, setOpenFAQ] = useState(null);

  const t = (key) => getLocalizedCopy(copy[key], language);

  const toggleFAQ = (index) => {
    setOpenFAQ((prev) => (prev === index ? null : index));
  };

  return (
    <div className="relative overflow-hidden">
      {/* ──── hero ──── */}
      <section className="relative px-4 pb-16 pt-24 sm:px-6 sm:pt-32 lg:px-8 lg:pt-40">
        {/* background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/8 blur-[120px] dark:bg-brand-primary/15" />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl"
          >
            {t('titleLine1')}
            <br />
            <span className="bg-gradient-to-r from-brand-primary via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              {t('titleLine2')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-500 dark:text-gray-400 sm:text-lg"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </section>

      {/* ──── pricing cards ──── */}
      <section className="relative px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          {tiers.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              language={language}
              mostPopularLabel={getLocalizedCopy(copy.mostPopular, language)}
            />
          ))}
        </div>

        {/* privacy promise */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-12 flex max-w-2xl items-center justify-center gap-2 text-center"
        >
          <Shield size={16} className="flex-shrink-0 text-brand-primary dark:text-blue-400" />
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('privacyPromise')}</p>
        </motion.div>
      </section>

      {/* ──── how it works ──── */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        {/* subtle divider glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />

        <div className="mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
          >
            {t('howItWorksTitle')}
          </motion.h2>

          <div className="grid gap-8 sm:grid-cols-3">
            {getLocalizedCopy(copy.steps, language).map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* numbered circle */}
                  <div className="relative mb-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary/10 dark:bg-brand-primary/20">
                      <Icon size={28} className="text-brand-primary dark:text-blue-400" />
                    </div>
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white shadow-lg shadow-brand-primary/30">
                      {i + 1}
                    </span>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {step}
                  </h3>

                </motion.div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto mt-10 max-w-xl text-center text-sm leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base"
          >
            {t('stepDescription')}
          </motion.p>
        </div>
      </section>

      {/* ──── FAQ ──── */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />

        <div className="mx-auto max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
          >
            {t('faqTitle')}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-gray-200 bg-white/80 px-6 backdrop-blur dark:border-white/10 dark:bg-gray-900/60 sm:px-8"
          >
            {faqItems.map((item, i) => (
              <FAQItem
                key={i}
                question={getLocalizedCopy(item.q, language)}
                answer={getLocalizedCopy(item.a, language)}
                isOpen={openFAQ === i}
                onToggle={() => toggleFAQ(i)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ──── bottom CTA ──── */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />

        {/* background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 translate-y-1/3 rounded-full bg-brand-primary/6 blur-[100px] dark:bg-brand-primary/12" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-xl text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            {t('ctaTitle')}
          </h2>

          <a
            href={DOWNLOAD_URL}
            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-primary/25 transition-all duration-200 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand-primary/30 sm:text-lg"
          >
            <Download size={20} />
            {t('ctaButton')}
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>

          <p className="mt-5 text-xs text-gray-400 dark:text-gray-500">
            macOS 13+ &middot; Apple Silicon &amp; Intel
          </p>
        </motion.div>
      </section>
    </div>
  );
}
