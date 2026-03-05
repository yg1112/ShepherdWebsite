import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { journeyPostsByLanguage } from '../data/journeyPosts';
import JourneyPostContent from '../components/JourneyPostContent';
import { useAppPreferences } from '../contexts/AppPreferencesContext';
import { getLocalizedCopy } from '../i18n/localize';

const pageCopy = {
  en: {
    title: 'Build Journey',
    subtitle: 'Field notes on building Shepherd — the design decisions, architecture pivots, and tradeoffs behind a macOS utility.',
    selectPost: 'Select a post',
    posts: 'Posts',
  },
  zh: {
    title: 'Build Journey',
    subtitle: '记录 Shepherd 的构建过程——设计决策、架构转向，以及一款 macOS 工具背后的取舍。',
    selectPost: '选择篇章',
    posts: '篇章',
  },
};

const BuildJourneyPage = () => {
  const location = useLocation();
  const { language } = useAppPreferences();
  const localizedPosts = getLocalizedCopy(journeyPostsByLanguage, language);
  const copy = getLocalizedCopy(pageCopy, language);
  const [activePostId, setActivePostId] = useState(`journey-${localizedPosts[0]?.id || ''}`);

  useEffect(() => {
    if (!localizedPosts.length) return;
    if (!localizedPosts.find((post) => `journey-${post.id}` === activePostId)) {
      setActivePostId(`journey-${localizedPosts[0].id}`);
      return;
    }
    if (!location.hash) return;
    const sectionId = location.hash.slice(1);
    const targetPost = localizedPosts.find((post) => `journey-${post.id}` === sectionId);
    if (targetPost) setActivePostId(sectionId);
  }, [activePostId, localizedPosts, location.hash]);

  const activePost = localizedPosts.find((post) => `journey-${post.id}` === activePostId) || localizedPosts[0];

  const switchPost = (postId) => {
    setActivePostId(postId);
    window.history.replaceState(null, '', `${location.pathname}#${postId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="pt-28 min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <section className="mb-12 max-w-3xl">
          <h1 className="text-4xl md:text-5xl leading-tight tracking-tight font-medium text-gray-900 dark:text-gray-100 mb-5">
            {copy.title}
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {copy.subtitle}
          </p>
        </section>

        <div className="mb-6 lg:hidden">
          <label htmlFor="journey-post-select" className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
            {copy.selectPost}
          </label>
          <select
            id="journey-post-select"
            value={activePostId}
            onChange={(event) => switchPost(event.target.value)}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-800 dark:text-gray-100"
          >
            {localizedPosts.map((post) => (
              <option key={post.id} value={`journey-${post.id}`}>
                {post.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-8">
          <aside className="hidden lg:block lg:sticky lg:top-28 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
            <p className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
              {copy.posts}
            </p>
            <nav className="space-y-1">
              {localizedPosts.map((post) => {
                const postId = `journey-${post.id}`;
                const isActive = activePostId === postId;
                return (
                  <button
                    key={post.id}
                    onClick={() => switchPost(postId)}
                    className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-black/[0.06] dark:bg-white/[0.08] text-gray-900 dark:text-white font-medium'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <p>{post.title}</p>
                  </button>
                );
              })}
            </nav>
          </aside>

          <article>
            {activePost && (
              <section id={`journey-${activePost.id}`} className="scroll-mt-28">
                <JourneyPostContent post={activePost} headingPrefix={activePostId} />
              </section>
            )}
          </article>
        </div>
      </div>
    </main>
  );
};

export default BuildJourneyPage;
