import React from 'react';
import { useAppPreferences } from '../contexts/AppPreferencesContext.jsx';
import { getLocalizedCopy } from '../i18n/localize.js';

/**
 * Apps whose windows Shepherd can monitor.
 * Icons are pulled from the simple-icons CDN.
 * `brandHex` is the official brand colour used for the hover state.
 */
const TOOLS = [
  { name: 'Terminal',  slug: 'gnometerminal',      brandHex: '#241F31' },
  { name: 'iTerm2',   slug: 'iterm2',              brandHex: '#000000' },
  { name: 'VS Code',  slug: 'visualstudiocode',    brandHex: '#007ACC' },
  { name: 'Cursor',   slug: 'cursor',              brandHex: '#000000' },
  { name: 'Xcode',    slug: 'xcode',               brandHex: '#147EFB' },
  { name: 'Warp',     slug: 'warp',                brandHex: '#01A4FF' },
];

const ICON_CDN = 'https://cdn.simpleicons.org';

const copy = {
  en: { label: 'Monitors any app with a window' },
  zh: { label: '监控任何有窗口的应用' },
};

/**
 * ToolLogos
 *
 * Renders a horizontal row of app icons representing windows Shepherd can
 * monitor. Each icon is 36 x 36, greyed out by default, and reveals its
 * brand colour on hover via a CSS filter trick.
 */
export default function ToolLogos({ className = '' }) {
  const { language, theme } = useAppPreferences();
  const t = getLocalizedCopy(copy, language);
  const isDark = theme === 'dark';

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* Label */}
      <p className="text-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
        {t.label}
      </p>

      {/* Icon row */}
      <div className="flex flex-wrap items-center justify-center gap-6">
        {TOOLS.map((tool) => (
          <a
            key={tool.slug}
            href={`#${tool.slug}`}
            title={tool.name}
            className="tool-icon group relative flex items-center justify-center"
            onClick={(e) => e.preventDefault()}
          >
            <img
              src={`${ICON_CDN}/${tool.slug}/${isDark ? 'FFFFFF' : '9CA3AF'}`}
              alt={tool.name}
              width={36}
              height={36}
              loading="lazy"
              className="h-9 w-9 object-contain transition-all duration-300 group-hover:scale-110"
              style={{
                filter: 'grayscale(100%) opacity(0.45)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'grayscale(0%) opacity(1)';
                e.currentTarget.src = `${ICON_CDN}/${tool.slug}/${tool.brandHex.replace('#', '')}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'grayscale(100%) opacity(0.45)';
                e.currentTarget.src = `${ICON_CDN}/${tool.slug}/${isDark ? 'FFFFFF' : '9CA3AF'}`;
              }}
            />
          </a>
        ))}
      </div>

      {/* Inline styles for the tool-icon hover pulse */}
      <style>{`
        .tool-icon img {
          transition: filter 0.3s ease, transform 0.3s ease;
        }
        .dark .tool-icon img {
          filter: grayscale(100%) opacity(0.45) invert(0);
        }
      `}</style>
    </div>
  );
}
