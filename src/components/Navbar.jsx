import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Download, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppPreferences, languageLabels } from '../contexts/AppPreferencesContext';
import { getLocalizedCopy } from '../i18n/localize';
import shepherdLogo from '../assets/shepherd_icon_512.png';

const DOWNLOAD_URL =
  'https://github.com/YukunGao/shepherd-releases/releases/latest/download/Shepherd.dmg';

const COPY = {
  en: {
    product: 'Product',
    pricing: 'Pricing',
    buildJourney: 'Build Journey',
    download: 'Download',
  },
  zh: {
    product: '产品',
    pricing: '定价',
    buildJourney: '开发历程',
    download: '下载',
  },
};

const NAV_LINKS = [
  { key: 'product', to: '/#features' },
  { key: 'pricing', to: '/pricing' },
  { key: 'buildJourney', to: '/build-journey' },
];

const LANGUAGE_OPTIONS = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
];

export default function Navbar({ isScrolled }) {
  const { language, setLanguage } = useAppPreferences();
  const t = getLocalizedCopy(COPY, language);
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  // ---------- brand-logo damped rotation ----------
  const logoRef = useRef(null);
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef(null);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  const tickLogo = useCallback(() => {
    const DAMPING = 0.92;
    const RESTORE = 0.04;

    velocityRef.current *= DAMPING;
    angleRef.current += velocityRef.current;
    angleRef.current += (0 - angleRef.current) * RESTORE;

    if (logoRef.current) {
      logoRef.current.style.transform = `rotate(${angleRef.current}deg)`;
    }
    rafRef.current = requestAnimationFrame(tickLogo);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tickLogo);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tickLogo]);

  const handlePointerMove = useCallback((e) => {
    const dx = e.clientX - lastMouseRef.current.x;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current += dx * 0.08;
  }, []);

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [handlePointerMove]);

  // ---------- close language dropdown on outside click ----------
  useEffect(() => {
    const onClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // ---------- close mobile menu on route change ----------
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // ---------- helpers ----------
  const isActive = (to) => {
    if (to.startsWith('/#')) return location.pathname === '/' && location.hash === to.slice(1);
    return location.pathname === to;
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-black/70 backdrop-blur-xl shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* ---- Logo & Brand ---- */}
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="Shepherd home">
            <img
              ref={logoRef}
              src={shepherdLogo}
              alt="Shepherd logo"
              className="brand-logo-icon h-8 w-8 rounded-lg"
              draggable={false}
            />
            <span className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
              Shepherd
            </span>
          </Link>

          {/* ---- Desktop Nav ---- */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ key, to }) => (
              <Link
                key={key}
                to={to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(to)
                    ? 'text-brand-primary dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/60 dark:hover:bg-white/5'
                }`}
              >
                {t[key]}
              </Link>
            ))}

            {/* ---- Language selector ---- */}
            <div className="relative ml-1" ref={langRef}>
              <button
                onClick={() => setLangOpen((prev) => !prev)}
                className="flex items-center gap-1 px-2.5 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/60 dark:hover:bg-white/5 transition-colors"
                aria-label="Change language"
              >
                {languageLabels[language]}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1 w-36 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 shadow-lg overflow-hidden"
                  >
                    {LANGUAGE_OPTIONS.map(({ code, label }) => (
                      <button
                        key={code}
                        onClick={() => {
                          setLanguage(code);
                          setLangOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          language === code
                            ? 'bg-brand-primary/10 text-brand-primary dark:text-blue-400 font-medium'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ---- Download CTA ---- */}
            <a
              href={DOWNLOAD_URL}
              className="ml-3 inline-flex items-center gap-2 rounded-full bg-[#002FA7] px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-[#001B6B] active:scale-[0.97] transition-all"
            >
              <Download size={15} strokeWidth={2.5} />
              {t.download}
            </a>
          </div>

          {/* ---- Mobile hamburger ---- */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ---- Mobile Panel ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-gray-200/60 dark:border-white/10 bg-white/95 dark:bg-black/90 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map(({ key, to }) => (
                <Link
                  key={key}
                  to={to}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(to)
                      ? 'text-brand-primary dark:text-blue-400 bg-brand-primary/5'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  {t[key]}
                </Link>
              ))}

              {/* Mobile language selector */}
              <div className="flex items-center gap-2 px-3 py-2.5">
                {LANGUAGE_OPTIONS.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => setLanguage(code)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      language === code
                        ? 'bg-brand-primary/10 text-brand-primary dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Mobile download */}
              <a
                href={DOWNLOAD_URL}
                className="flex items-center justify-center gap-2 mt-2 rounded-full bg-[#002FA7] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#001B6B] active:scale-[0.97] transition-all"
              >
                <Download size={15} strokeWidth={2.5} />
                {t.download}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
