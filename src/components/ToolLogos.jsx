import React from 'react';
import { useAppPreferences } from '../contexts/AppPreferencesContext.jsx';
import { getLocalizedCopy } from '../i18n/localize.js';
import { Terminal as TerminalIcon, Monitor, Code2, Wrench, Globe } from 'lucide-react';

/**
 * Apps Shepherd can monitor:
 * - Heartbeat monitoring works for ANY app with a window
 * - Semantic text analysis works specifically with Terminal.app and iTerm2 via AppleScript
 *
 * We show the key apps users care about — Terminal, iTerm2, plus common apps
 * that benefit from heartbeat/crash monitoring.
 */
const TOOLS = [
  { name: 'Terminal',  icon: TerminalIcon, color: '#241F31' },
  { name: 'iTerm2',   icon: TerminalIcon, color: '#000000' },
  { name: 'VS Code',  icon: Code2,        color: '#007ACC' },
  { name: 'Xcode',    icon: Wrench,       color: '#147EFB' },
  { name: 'Safari',   icon: Globe,        color: '#006CFF' },
];

const copy = {
  en: { label: 'Monitors any app with a window' },
  zh: { label: '监控任何有窗口的应用' },
};

/**
 * ToolLogos
 *
 * Renders a horizontal row of app icons representing windows Shepherd can
 * monitor. Uses Lucide icons instead of external CDN to avoid broken images.
 */
export default function ToolLogos({ className = '' }) {
  const { language } = useAppPreferences();
  const t = getLocalizedCopy(copy, language);

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* Label */}
      <p className="text-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
        {t.label}
      </p>

      {/* Icon row */}
      <div className="flex flex-wrap items-center justify-center gap-8">
        {TOOLS.map((tool) => (
          <div
            key={tool.name}
            title={tool.name}
            className="group flex flex-col items-center gap-1.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-white/[0.06] transition-colors group-hover:bg-gray-200 dark:group-hover:bg-white/10">
              <tool.icon
                className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-colors group-hover:text-gray-700 dark:group-hover:text-gray-200"
                strokeWidth={1.75}
              />
            </div>
            <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 transition-colors group-hover:text-gray-600 dark:group-hover:text-gray-300">
              {tool.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
