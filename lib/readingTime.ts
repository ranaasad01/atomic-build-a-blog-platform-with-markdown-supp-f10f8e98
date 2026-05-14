const WORDS_PER_MINUTE = 200;

export function calculateReadingTime(content: string): number {
  // Strip markdown syntax to get plain text word count
  let text = content;
  // Remove fenced code blocks
  text = text.replace(/```[\s\S]*?```/g, '');
  // Remove headings markers
  text = text.replace(/^#{1,6}\s+/gm, '');
  // Collapse whitespace
  text = text.replace(/\s+/g, ' ').trim();

  const wordCount = text.split(' ').filter(Boolean).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  return Math.max(1, minutes);
}
