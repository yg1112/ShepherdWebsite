import React from 'react';
import { Download } from 'lucide-react';
import { useAppPreferences } from '../contexts/AppPreferencesContext.jsx';
import { getLocalizedCopy } from '../i18n/localize.js';

const DOWNLOAD_URL =
  'https://github.com/YukunGao/shepherd-releases/releases/latest/download/Shepherd.dmg';

const copy = {
  en: { label: 'Download for macOS' },
  zh: { label: '下载 macOS 版本' },
};

const trackDownload = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'download', {
      event_category: 'engagement',
      event_label: 'Shepherd DMG from Website',
      transport_type: 'beacon',
    });
  }
};

/**
 * DownloadButton
 *
 * Variants
 *   - "primary"   Klein Blue filled button (default)
 *   - "secondary"  White / transparent outline button
 *
 * Props
 *   - variant    "primary" | "secondary"
 *   - size       "md" | "lg"
 *   - className  Extra Tailwind classes merged onto the root <a>
 *   - children   Override the default localised label
 *   - showIcon   Whether to show the download icon (default true)
 */
export default function DownloadButton({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  showIcon = true,
  ...rest
}) {
  const { language } = useAppPreferences();
  const t = getLocalizedCopy(copy, language);

  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 select-none';

  const sizes = {
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variants = {
    primary: [
      'bg-[#002FA7] text-white',
      'hover:bg-[#001B6B] hover:shadow-lg hover:shadow-[#002FA7]/20',
      'active:scale-[0.97]',
      'dark:bg-[#002FA7] dark:hover:bg-[#3355CC]',
    ].join(' '),
    secondary: [
      'bg-white text-gray-800 border border-gray-200',
      'hover:text-[#002FA7] hover:border-[#002FA7]/30',
      'active:scale-[0.97]',
      'dark:bg-white/10 dark:text-white dark:border-white/20',
      'dark:hover:text-[#8FA8FF] dark:hover:border-[#8FA8FF]/40',
    ].join(' '),
  };

  return (
    <a
      href={DOWNLOAD_URL}
      onClick={trackDownload}
      className={[base, sizes[size] || sizes.md, variants[variant] || variants.primary, className]
        .filter(Boolean)
        .join(' ')}
      rel="noopener noreferrer"
      {...rest}
    >
      {showIcon && <Download className="h-4 w-4 shrink-0" />}
      {children || t.label}
    </a>
  );
}
