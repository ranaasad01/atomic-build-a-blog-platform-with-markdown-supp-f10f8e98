export const dynamic = "force-dynamic";
import Link from 'next/link';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { Post } from '@/types/post';
import { Navbar } from '@/components/Navbar';

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function TagBadge({ tag }: { tag: string }) {
  return (
    <Link
      href={'/tags/' + encodeURIComponent(tag)}
      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
    >
      {tag}
    </Link>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200">
      {post.coverImage && (
        <Link href={'/blog/' + post.slug} tabIndex={-1} aria-hidden="true">
          <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          <Link href={'/blog/' + post.slug} className="focus:outline-none focus-visible:underline">
            {post.title}
          </Link>
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-7 h-7 rounded-full object-cover bg-gray-200 dark:bg-gray-700"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{post.author.name}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
            <span>{formatDate(post.date)}</span>
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function FeaturedCard({ post }: { post: Post }) {
  return (
    <article className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200 flex flex-col md:flex-row">
      {post.coverImage && (
        <Link href={'/blog/' + post.slug} tabIndex={-1} aria-hidden="true" className="md:w-2/5 shrink-0">
          <div className="aspect-video md:h-full overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}
      <div className="flex flex-col justify-center p-6 md:p-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-600 text-white">
            Featured
          </span>
          {post.tags.slice(0, 2).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          <Link href={'/blog/' + post.slug} className="focus:outline-none focus-visible:underline">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full object-cover bg-gray-200 dark:bg-gray-700"
            />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{post.author.name}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">{formatDate(post.date)} · {post.readingTime} min read</p>
            </div>
          </div>
          <Link
            href={'/blog/' + post.slug}
            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
          >
            Read more
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function HomePage() {
  const allPosts = getAllPosts();
  const allTags = getAllTags();
  const featuredPosts = allPosts.filter((p) => p.featured);
  const recentPosts = allPosts.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="bg-gradient-to-b from-indigo-50 dark:from-indigo-950/30 to-white dark:to-gray-950 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              {allPosts.length} articles published
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight tracking-tight">
              Thoughts on modern
              <br />
              <span className="text-indigo-600 dark:text-indigo-400">web development</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              Deep dives into React, TypeScript, Next.js, and the tools that make building for the web a joy. Written by developers, for developers.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="#posts"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-sm transition-colors shadow-sm"
              >
                Browse articles
              </Link>
              <Link
                href="/about"
                className="px-5 py-2.5 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl font-medium text-sm transition-colors"
              >
                About this blog
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section aria-labelledby="featured-heading">
              <h2 id="featured-heading" className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-indigo-500" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Featured
              </h2>
              <div className="space-y-6">
                {featuredPosts.map((post) => (
                  <FeaturedCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* Browse by Topic */}
          {allTags.length > 0 && (
            <section aria-labelledby="tags-heading" className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
              <h2 id="tags-heading" className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Browse by topic
              </h2>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => {
                  const count = allPosts.filter((p) => p.tags.includes(tag)).length;
                  return (
                    <Link
                      key={tag}
                      href={'/tags/' + encodeURIComponent(tag)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm"
                    >
                      {tag}
                      <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-full">
                        {count}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* All Posts Grid */}
          <section id="posts" aria-labelledby="posts-heading">
            <div className="flex items-center justify-between mb-6">
              <h2 id="posts-heading" className="text-xl font-bold text-gray-900 dark:text-white">
                Latest articles
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">{allPosts.length} posts</span>
            </div>
            {recentPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                <p className="font-medium">No posts yet</p>
                <p className="text-sm mt-1">Check back soon for new articles.</p>
              </div>
            )}
          </section>

          {/* Newsletter CTA */}
          <section aria-labelledby="newsletter-heading" className="bg-indigo-600 dark:bg-indigo-700 rounded-2xl p-8 sm:p-10 text-center text-white">
            <h2 id="newsletter-heading" className="text-2xl font-bold mb-3">Stay in the loop</h2>
            <p className="text-indigo-100 mb-6 max-w-md mx-auto">
              Get notified when new articles drop. No spam, no fluff — just quality content about web development delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <label htmlFor="email-input" className="sr-only">Email address</label>
              <input
                id="email-input"
                type="email"
                placeholder="you@example.com"
                className="flex-1 px-4 py-2.5 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="button"
                className="px-5 py-2.5 bg-white text-indigo-600 font-semibold rounded-xl text-sm hover:bg-indigo-50 transition-colors shrink-0"
              >
                Subscribe
              </button>
            </div>
            <p className="text-xs text-indigo-200 mt-3">Unsubscribe anytime. We respect your privacy.</p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 mt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white mb-3">
                <span className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center text-white text-xs font-bold">D</span>
                DevBlog
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                A blog about web development, TypeScript, React, and modern tooling.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Navigation</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Blog</Link></li>
                <li><Link href="/about" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</Link></li>
                <li><Link href="/tags/React" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">React posts</Link></li>
                <li><Link href="/tags/TypeScript" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">TypeScript posts</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Twitter / X
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@devblog.example.com" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    hello@devblog.example.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              &copy; {new Date().getFullYear()} DevBlog. Built with Next.js &amp; Tailwind CSS.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">All posts are for educational purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
