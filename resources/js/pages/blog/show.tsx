import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEvent, useState, useEffect } from 'react';
import { LuCalendar, LuUser, LuClock, LuEye, LuMessageSquare, LuArrowLeft } from 'react-icons/lu';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Swal from 'sweetalert2';

interface Author {
  name: string;
}

interface Comment {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_image: string | null;
  comment: string;
  created_at: string;
}

interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  featured_image: string | null;
  published_at: string;
  author: Author;
  views: number;
  approved_comments_count: number;
  approved_comments: Comment[];
  tags: string[];
}

interface RelatedBlog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  published_at: string;
}

interface BlogShowProps {
  blog: Blog;
  relatedBlogs: RelatedBlog[];
}

export default function BlogShow({ blog, relatedBlogs }: BlogShowProps) {
  const { flash } = usePage().props as any;
  const { data, setData, post, processing, errors, reset } = useForm({
    customer_name: '',
    customer_email: '',
    comment: '',
  });

  const [showCommentForm, setShowCommentForm] = useState(false);

  // Show success message from backend
  useEffect(() => {
    if (flash?.success) {
      Swal.fire({
        title: 'Success!',
        text: flash.success,
        icon: 'success',
        confirmButtonColor: '#4A651F',
        background: '#1F2937',
        color: '#FFFFFF',
        timer: 3000,
        showConfirmButton: true,
      });
    }
  }, [flash]);

  const handleSubmitComment = (e: FormEvent) => {
    e.preventDefault();
    
    post(`/blog/${blog.id}/comments`, {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setShowCommentForm(false);
      },
      onError: (errors) => {
        if (Object.keys(errors).length > 0) {
          const firstError = Object.values(errors)[0];
          Swal.fire({
            title: 'Error!',
            text: firstError as string,
            icon: 'error',
            confirmButtonColor: '#DC2626',
            background: '#1F2937',
            color: '#FFFFFF',
          });
        }
      },
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Head title={blog.title} />
      <Header />

      <main className="bg-black">
        {/* Hero Section */}
        <section className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: blog.featured_image ? `url('${blog.featured_image}')` : "url('/images/clients/hero/slider1.JPG')" }}>
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative h-full flex flex-col justify-center text-white px-4">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto text-left">
                <Link
                  href="/blog"
                  className="inline-flex items-center text-[#EFE554] hover:text-[#EFE554]/80 mb-4 transition-colors"
                >
                  <LuArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Link>
                <nav className="mb-4">
                  <ol className="flex items-center space-x-2 text-sm text-gray-300">
                    <li><Link href="/" className="hover:text-white">Home</Link></li>
                    <li><span className="mx-2">›</span></li>
                    <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                    <li><span className="mx-2">›</span></li>
                    <li className="text-white font-medium line-clamp-1">{blog.title}</li>
                  </ol>
                </nav>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  {blog.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                  <span className="flex items-center">
                    <LuUser className="h-4 w-4 mr-2" />
                    {blog.author.name}
                  </span>
                  <span className="flex items-center">
                    <LuCalendar className="h-4 w-4 mr-2" />
                    {formatDate(blog.published_at)}
                  </span>
                  <span className="flex items-center">
                    <LuEye className="h-4 w-4 mr-2" />
                    {blog.views} views
                  </span>
                  <span className="flex items-center">
                    <LuMessageSquare className="h-4 w-4 mr-2" />
                    {blog.approved_comments_count} comments
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Main Article */}
            <article className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg p-8 md:p-12 mb-12">
              <div
                className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-[#EFE554] prose-a:hover:text-[#EFE554]/80 prose-strong:text-white prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:text-gray-300 prose-blockquote:text-gray-400 prose-code:text-[#EFE554]"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </article>

            {/* Related Posts */}
            {relatedBlogs.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Related Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedBlogs.map((related) => (
                    <Link
                      key={related.id}
                      href={`/blog/${related.slug}`}
                      className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden hover:border-[#EFE554]/50 transition-all hover:shadow-xl hover:shadow-[#EFE554]/10 group"
                    >
                      {related.featured_image && (
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={related.featured_image}
                            alt={related.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#EFE554] line-clamp-2 transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2">{related.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-2xl font-bold text-white mb-8">
                Comments ({blog.approved_comments_count})
              </h2>

              {/* Comment Form */}
              {showCommentForm ? (
                <form onSubmit={handleSubmitComment} className="mb-8 p-6 bg-white/5 rounded-lg border border-white/20">
                  <div className="mb-4">
                    <label htmlFor="customer_name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="customer_name"
                      value={data.customer_name}
                      onChange={(e) => setData('customer_name', e.target.value)}
                      className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-md text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                      required
                    />
                    {errors.customer_name && <p className="mt-1 text-sm text-red-400">{errors.customer_name}</p>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="customer_email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="customer_email"
                      value={data.customer_email}
                      onChange={(e) => setData('customer_email', e.target.value)}
                      className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-md text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                      required
                    />
                    {errors.customer_email && <p className="mt-1 text-sm text-red-400">{errors.customer_email}</p>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-2">
                      Comment <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="comment"
                      rows={4}
                      value={data.comment}
                      onChange={(e) => setData('comment', e.target.value)}
                      className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-md text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                      required
                    />
                    {errors.comment && <p className="mt-1 text-sm text-red-400">{errors.comment}</p>}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={processing}
                      className="px-6 py-2 bg-[#4A651F] text-white rounded-md hover:bg-[#5a7626] disabled:opacity-50 transition-colors"
                    >
                      {processing ? 'Submitting...' : 'Submit Comment'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCommentForm(false)}
                      className="px-6 py-2 bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setShowCommentForm(true)}
                  className="mb-8 px-6 py-3 bg-[#4A651F] text-white rounded-md hover:bg-[#5a7626] transition-colors"
                >
                  Leave a Comment
                </button>
              )}

              {/* Comments List */}
              {blog.approved_comments.length > 0 ? (
                <div className="space-y-6">
                  {blog.approved_comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 pb-6 border-b border-white/10 last:border-0">
                      <div className="flex-shrink-0">
                        {comment.customer_image ? (
                          <img
                            src={comment.customer_image}
                            alt={comment.customer_name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-[#4A651F] flex items-center justify-center text-white font-semibold">
                            {comment.customer_name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white">{comment.customer_name}</h4>
                          <span className="text-sm text-gray-400">
                            {formatDate(comment.created_at)}
                          </span>
                        </div>
                        <p className="text-gray-300">{comment.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

