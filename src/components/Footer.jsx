import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Mail, Globe } from 'lucide-react';
import { useAppPreferences } from '../contexts/AppPreferencesContext';
import { getLocalizedCopy } from '../i18n/localize';

const COPY = {
  en: {
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
    language: 'Language',
    copyright: '\u00A9 2025 DZG STUDIO LLC.',
  },
  zh: {
    privacy: '隐私政策',
    terms: '服务条款',
    contact: '联系我们',
    language: '语言',
    copyright: '\u00A9 2025 DZG STUDIO LLC.',
  },
};

const LANGUAGE_OPTIONS = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
];

export default function Footer() {
  const { language, setLanguage, theme, toggleTheme } = useAppPreferences();
  const t = getLocalizedCopy(COPY, language);

  return (
    <footer className="relative border-t border-gray-200/60 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* ---- Left: Copyright ---- */}
          <p className="text-sm text-gray-500 dark:text-gray-400 order-3 sm:order-1">
            {t.copyright}
          </p>

          {/* ---- Center: Links ---- */}
          <div className="flex items-center gap-5 text-sm order-1 sm:order-2">
            <Link
              to="/privacy"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {t.privacy}
            </Link>
            <Link
              to="/terms"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {t.terms}
            </Link>

            {/* Contact (mailto) */}
            <a
              href="mailto:contact@dzgapp.com"
              className="inline-flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label={t.contact}
            >
              <Mail size={14} />
              {t.contact}
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com/DzgStudio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Follow @DzgStudio on X"
            >
              {/* Inline X logo SVG -- keeps the bundle lucide-free for this icon */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-[15px] w-[15px]"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

          {/* ---- Right: Theme toggle + Language ---- */}
          <div className="flex items-center gap-3 order-2 sm:order-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Language selector */}
            <div className="relative">
              <div className="flex items-center gap-0.5 rounded-lg border border-gray-200 dark:border-white/10 overflow-hidden">
                {LANGUAGE_OPTIONS.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => setLanguage(code)}
                    className={`px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      language === code
                        ? 'bg-brand-primary text-white'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                    aria-label={label}
                  >
                    {code === 'en' ? 'EN' : code === 'zh' ? '简' : '繁'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
