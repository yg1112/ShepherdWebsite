import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAppPreferences } from '../contexts/AppPreferencesContext';
import { getLocalizedCopy } from '../i18n/localize';

const COPY = {
  en: {
    tag: 'Build Journey',
    title: 'Shipped in public, refined in practice.',
    subtitle: 'Follow the product evolution — architecture decisions, UX polish, and the lessons learned along the way.',
    cards: [
      {
        title: 'Build Journey',
        body: 'Development updates, architecture decisions, and product evolution.',
        href: '/build-journey',
        cta: 'Read the Journey',
      },
    ],
  },
  zh: {
    tag: '开发历程',
    title: '公开迭代，实践精炼。',
    subtitle: '跟随产品的演进——架构决策、UX 打磨，以及一路走来的心得。',
    cards: [
      {
        title: '开发历程',
        body: '开发更新、架构决策与产品演进。',
        href: '/build-journey',
        cta: '阅读历程',
      },
    ],
  },
};

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
        <div className="grid gap-6 sm:grid-cols-1 max-w-xl">
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
      </div>
    </section>
  );
}
