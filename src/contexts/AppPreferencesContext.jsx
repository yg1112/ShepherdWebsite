import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const SUPPORTED_LANGUAGES = ['en', 'zh', 'zh-TW'];
const DEFAULT_LANGUAGE = 'en';
const DEFAULT_THEME = 'light';

const AppPreferencesContext = createContext(null);

const normalizeLanguage = (language) => {
  if (!language) return DEFAULT_LANGUAGE;
  const normalized = String(language).trim().toLowerCase();
  if (normalized === 'zh-tw' || normalized === 'zh_hant' || normalized === 'zh-hant') {
    return 'zh-TW';
  }
  if (normalized === 'zh-cn' || normalized === 'zh_hans' || normalized === 'zh-hans') {
    return 'zh';
  }
  if (normalized === 'en' || normalized === 'zh') {
    return normalized;
  }
  return SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
};

const normalizeTheme = (theme) => (theme === 'dark' ? 'dark' : DEFAULT_THEME);

export const AppPreferencesProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
    return normalizeLanguage(window.localStorage.getItem('language'));
  });

  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_THEME;
    return normalizeTheme(window.localStorage.getItem('theme'));
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('language', language);
    document.documentElement.lang =
      language === 'zh' ? 'zh-CN' : language === 'zh-TW' ? 'zh-TW' : 'en';
  }, [language]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: (nextLanguage) => setLanguage(normalizeLanguage(nextLanguage)),
      theme,
      setTheme: (nextTheme) => setTheme(normalizeTheme(nextTheme)),
      toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    }),
    [language, theme]
  );

  return (
    <AppPreferencesContext.Provider value={value}>
      {children}
    </AppPreferencesContext.Provider>
  );
};

export const useAppPreferences = () => {
  const context = useContext(AppPreferencesContext);
  if (!context) {
    throw new Error('useAppPreferences must be used within AppPreferencesProvider');
  }
  return context;
};

export const languageLabels = {
  en: 'EN',
  zh: '简',
  'zh-TW': '繁',
};
