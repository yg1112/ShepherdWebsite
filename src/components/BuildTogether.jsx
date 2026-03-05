import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github } from 'lucide-react';
import { useAppPreferences } from '../contexts/AppPreferencesContext';
import { getLocalizedCopy } from '../i18n/localize';

const COPY = {
  en: {
    tag: 'Build Together',
    title: 'Shipped in public, built with AI.',
    subtitle: 'Every commit in Shepherd is co-authored with Claude. Follow the journey.',
    cards: [
      {
        title: 'Build Journey',
        body: 'Development updates, architecture decisions, and product evolution.',
        href: '/build-journey',
        cta: 'Read the Journey',
      },
    ],
    browse: 'View on GitHub',
  },
  zh: {
    tag: '共建中',
    title: '公开迭代，AI 驱动。',
    subtitle: 'Shepherd 的每一个 commit 都与 Claude 共同完成。跟随我们的旅程。',
    cards: [
      {
        title: '开发历程',
        body: '开发更新、架构决策与产品演进。',
        href: '/build-journey',
        cta: '阅读历程',
      },
    ],
    browse: '在 GitHub 查看',
  },
};

const GITHUB_URL = 'https://github.com/YukunGao/shepherd-releases';

export default function BuildTogether() {
  const { language } = useAppPreferences();
  const t = getLocalizedCopy(COPY, language);

  return (
    <section id="build-together" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Tag */}
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-4">
          {t.tag}
        </p>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-gray-900 dark:text-gray-100 mb-3">
          {t.title}
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-12">
          {t.subtitle}
        </p>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-1 max-w-xl mb-10">
          {t.cards.map((card, i) => (
            <Link
              key={i}
              to={card.href}
              className="group relative rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 transition-shadow hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {card.body}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary group-hover:gap-2.5 transition-all">
                {card.cta}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        {/* GitHub link */}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-white/10 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors"
        >
          <Github size={16} />
          {t.browse}
        </a>
      </div>
    </section>
  );
}
