import React from 'react';
import { motion } from 'framer-motion';
import {
  HeartPulse,
  LayoutGrid,
  ScanSearch,
  Layers,
  Globe,
  PawPrint,
} from 'lucide-react';
import { useAppPreferences } from '../contexts/AppPreferencesContext.jsx';
import { getLocalizedCopy } from '../i18n/localize.js';

/* ------------------------------------------------------------------ */
/*  Bilingual copy                                                     */
/* ------------------------------------------------------------------ */

const sectionCopy = {
  en: {
    sectionTitle: 'Everything you need to stay in control',
    sectionSubtitle:
      'From process heartbeats to remote alerts\u2014monitoring that works the way you do.',
  },
  zh: {
    sectionTitle: '\u638C\u63A7\u4E00\u5207\u6240\u9700',
    sectionSubtitle:
      '\u4ECE\u8FDB\u7A0B\u5FC3\u8DF3\u5230\u8FDC\u7A0B\u544A\u8B66\u2014\u2014\u4EE5\u4F60\u7684\u65B9\u5F0F\u76D1\u63A7\u3002',
  },
};

const featuresCopy = {
  en: [
    {
      title: 'Heartbeat Monitoring',
      description:
        'Shepherd watches your processes at the heartbeat level. The moment an app crashes or stops responding, you get an instant notification\u2014before you even notice something\u2019s wrong.',
      imageHint: 'Process heartbeat detection',
    },
    {
      title: 'Mission Control Window Picker',
      description:
        'Pick any window to monitor with a single click. Hover to highlight, click to watch. The full-screen overlay makes it effortless to select exactly which windows matter to you.',
      imageHint: 'Full-screen window picker overlay',
    },
    {
      title: 'Semantic Text Analysis',
      description:
        'Shepherd reads terminal output natively through macOS APIs\u2014lightweight, fast, and built right into the system. It understands what your terminal is saying and alerts you on keywords that matter.',
      imageHint: 'Native terminal text reading',
    },
    {
      title: 'Semantic Presets',
      description:
        'One-click keyword sets tailored for different workflows. Agent Coding, Build & Deploy, Runtime Ops, Test\u2014activate a preset and Shepherd knows exactly what to watch for.',
      imageHint: 'Keyword preset categories',
    },
    {
      title: 'Remote Supervision',
      description:
        'Step away from your desk with confidence. Shepherd pushes alerts to the cloud, so you can check your app status from your phone\u2014anywhere in the world.',
      imageHint: 'Mobile remote monitoring dashboard',
    },
    {
      title: 'Visual Watcher Marks',
      description:
        'Floating paw-print badges follow your monitored windows at 20\u00A0FPS. Always know which windows Shepherd is watching with a subtle, ever-present visual indicator.',
      imageHint: 'Floating paw-print badges on windows',
    },
  ],
  zh: [
    {
      title: '\u5FC3\u8DF3\u76D1\u63A7',
      description:
        'Shepherd \u5728\u8FDB\u7A0B\u5FC3\u8DF3\u5C42\u6301\u7EED\u5B88\u62A4\u3002\u5E94\u7528\u5D29\u6E83\u6216\u505C\u6B62\u54CD\u5E94\u7684\u77AC\u95F4\uFF0C\u4F60\u5C31\u4F1A\u6536\u5230\u901A\u77E5\u2014\u2014\u751A\u81F3\u6BD4\u4F60\u81EA\u5DF1\u53D1\u73B0\u8FD8\u5FEB\u3002',
      imageHint: 'Process heartbeat detection',
    },
    {
      title: 'Mission Control \u7A97\u53E3\u9009\u62E9\u5668',
      description:
        '\u4E00\u952E\u9009\u62E9\u8981\u76D1\u63A7\u7684\u7A97\u53E3\u3002\u60AC\u505C\u9AD8\u4EAE\uFF0C\u70B9\u51FB\u76D1\u63A7\u3002\u5168\u5C4F\u8986\u76D6\u5C42\u8BA9\u4F60\u8F7B\u677E\u7CBE\u51C6\u5730\u9009\u62E9\u9700\u8981\u5173\u6CE8\u7684\u7A97\u53E3\u3002',
      imageHint: 'Full-screen window picker overlay',
    },
    {
      title: '\u8BED\u4E49\u6587\u672C\u5206\u6790',
      description:
        'Shepherd \u901A\u8FC7 macOS \u539F\u751F API \u8BFB\u53D6\u7EC8\u7AEF\u8F93\u51FA\u2014\u2014\u8F7B\u91CF\u3001\u5FEB\u901F\u3001\u4E0E\u7CFB\u7EDF\u6DF1\u5EA6\u96C6\u6210\u3002\u5B83\u7406\u89E3\u7EC8\u7AEF\u6B63\u5728\u8BF4\u4EC0\u4E48\uFF0C\u5E76\u5728\u5339\u914D\u5173\u952E\u8BCD\u65F6\u63D0\u9192\u4F60\u3002',
      imageHint: 'Native terminal text reading',
    },
    {
      title: '\u8BED\u4E49\u9884\u8BBE',
      description:
        '\u4E3A\u4E0D\u540C\u5DE5\u4F5C\u6D41\u91CF\u8EAB\u5B9A\u5236\u7684\u4E00\u952E\u5173\u952E\u8BCD\u96C6\u3002Agent \u7F16\u7A0B\u3001\u6784\u5EFA\u90E8\u7F72\u3001\u8FD0\u884C\u65F6\u8FD0\u7EF4\u3001\u6D4B\u8BD5\u2014\u2014\u6FC0\u6D3B\u9884\u8BBE\uFF0CShepherd \u5C31\u77E5\u9053\u8BE5\u5173\u6CE8\u4EC0\u4E48\u3002',
      imageHint: 'Keyword preset categories',
    },
    {
      title: '\u8FDC\u7A0B\u76D1\u63A7',
      description:
        '\u653E\u5FC3\u79BB\u5F00\u5DE5\u4F4D\u3002Shepherd \u5C06\u544A\u8B66\u63A8\u9001\u5230\u4E91\u7AEF\uFF0C\u4F60\u53EF\u4EE5\u5728\u624B\u673A\u4E0A\u968F\u65F6\u67E5\u770B\u5E94\u7528\u72B6\u6001\u2014\u2014\u65E0\u8BBA\u8EAB\u5904\u4F55\u5730\u3002',
      imageHint: 'Mobile remote monitoring dashboard',
    },
    {
      title: '\u53EF\u89C6\u5316\u5B88\u671B\u6807\u8BB0',
      description:
        '\u6D6E\u52A8\u722A\u5370\u6807\u8BB0\u4EE5 20FPS \u8DDF\u968F\u4F60\u7684\u76D1\u63A7\u7A97\u53E3\u3002\u901A\u8FC7\u7EC6\u5FAE\u800C\u59CB\u7EC8\u5B58\u5728\u7684\u89C6\u89C9\u6307\u793A\u5668\uFF0C\u968F\u65F6\u77E5\u9053 Shepherd \u6B63\u5728\u5B88\u62A4\u54EA\u4E9B\u7A97\u53E3\u3002',
      imageHint: 'Floating paw-print badges on windows',
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Icon map (Lucide)                                                  */
/* ------------------------------------------------------------------ */

const FEATURE_ICONS = [HeartPulse, LayoutGrid, ScanSearch, Layers, Globe, PawPrint];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ------------------------------------------------------------------ */
/*  FeatureImagePlaceholder                                            */
/* ------------------------------------------------------------------ */

function FeatureImagePlaceholder({ icon: Icon, hint }) {
  return (
    <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-4 rounded-2xl bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06]">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#002FA7]/10 dark:bg-[#002FA7]/20">
        <Icon className="h-12 w-12 text-[#002FA7] dark:text-[#8FA8FF]" strokeWidth={1.5} />
      </div>
      <span className="text-sm text-gray-400 dark:text-gray-500 px-4 text-center">{hint}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FeatureRow                                                         */
/* ------------------------------------------------------------------ */

function FeatureRow({ feature, icon, index }) {
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      variants={itemVariants}
      className={[
        'grid gap-8 md:gap-12 lg:gap-16 items-center',
        'grid-cols-1 md:grid-cols-2',
        isReversed ? 'md:[direction:rtl]' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Image / placeholder column */}
      <div className={isReversed ? 'md:[direction:ltr]' : ''}>
        <div className="feature-card overflow-hidden rounded-2xl p-1">
          <FeatureImagePlaceholder icon={icon} hint={feature.imageHint} />
        </div>
      </div>

      {/* Text column */}
      <div className={['space-y-4', isReversed ? 'md:[direction:ltr]' : ''].filter(Boolean).join(' ')}>
        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {feature.title}
        </h3>
        <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400 max-w-lg">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Features (default export)                                          */
/* ------------------------------------------------------------------ */

export default function Features() {
  const { language } = useAppPreferences();
  const section = getLocalizedCopy(sectionCopy, language);
  const features = getLocalizedCopy(featuresCopy, language);

  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mx-auto max-w-2xl text-center mb-20"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            {section.sectionTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            {section.sectionSubtitle}
          </p>
        </motion.div>

        {/* Feature rows */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col gap-20 sm:gap-28"
        >
          {features.map((feature, index) => (
            <FeatureRow
              key={feature.title}
              feature={feature}
              icon={FEATURE_ICONS[index]}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
