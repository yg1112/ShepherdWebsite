import React from 'react';

const parseInlineMarkdown = (text) => {
  if (!text) return text;
  const parts = [];
  const pattern = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)/g;
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    if (match[1]) parts.push(<strong key={key++} className="font-semibold">{match[2]}</strong>);
    else if (match[3]) parts.push(<em key={key++}>{match[4]}</em>);
    else if (match[5]) parts.push(<code key={key++} className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">{match[6]}</code>);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length > 0 ? parts : text;
};

const slugifyHeading = (text) =>
  text.toLowerCase().trim().replace(/[^a-z0-9\u4e00-\u9fff\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

export const extractJourneyHeadings = (content, prefix = 'journey') => {
  if (!content) return [];
  const seenIds = new Map();
  return content.split('\n\n').filter((p) => p.startsWith('### ')).map((p, idx) => {
    const label = p.replace('### ', '').trim();
    const base = slugifyHeading(label) || `section-${idx + 1}`;
    const count = seenIds.get(base) || 0;
    seenIds.set(base, count + 1);
    return { id: count === 0 ? `${prefix}-${base}` : `${prefix}-${base}-${count + 1}`, label };
  });
};

const JourneyPostContent = ({ post, headingPrefix = 'journey' }) => {
  if (!post) return null;
  const headings = extractJourneyHeadings(post.content, headingPrefix);
  let headingIndex = 0;

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
          <span>{post.category}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-gray-100">{post.title}</h2>
      </div>
      <div className="prose-content">
        {post.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            const heading = headings[headingIndex];
            headingIndex += 1;
            return (
              <h3 key={idx} id={heading?.id} className="text-xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4 scroll-mt-28">
                {parseInlineMarkdown(paragraph.replace('### ', ''))}
              </h3>
            );
          }
          if (paragraph.startsWith('```')) {
            const code = paragraph.replace(/```.*\n?/g, '');
            return (
              <pre key={idx} className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 overflow-x-auto mb-4">
                <code className="text-sm text-gray-800 dark:text-gray-200">{code}</code>
              </pre>
            );
          }
          if (paragraph.match(/^\d+\.\s/)) {
            const items = paragraph.split('\n').filter((line) => line.match(/^\d+\.\s/));
            return (
              <ol key={idx} className="list-decimal list-outside ml-6 mb-4 space-y-1">
                {items.map((item, i) => (
                  <li key={i} className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {parseInlineMarkdown(item.replace(/^\d+\.\s*/, ''))}
                  </li>
                ))}
              </ol>
            );
          }
          if (paragraph.startsWith('- ')) {
            const items = paragraph.split('\n').filter((line) => line.startsWith('- '));
            return (
              <ul key={idx} className="list-disc list-outside ml-6 mb-4 space-y-1">
                {items.map((item, i) => (
                  <li key={i} className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {parseInlineMarkdown(item.replace(/^-\s*/, ''))}
                  </li>
                ))}
              </ul>
            );
          }
          if (paragraph.startsWith('>')) {
            return (
              <blockquote key={idx} className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 italic text-gray-600 dark:text-gray-400">
                {parseInlineMarkdown(paragraph.replace(/^>\s*/, ''))}
              </blockquote>
            );
          }
          return (
            <p key={idx} className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {parseInlineMarkdown(paragraph)}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default JourneyPostContent;
