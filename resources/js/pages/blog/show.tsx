import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { LuCalendar, LuUser, LuClock, LuEye, LuMessageSquare, LuArrowLeft } from 'react-icons/lu';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

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
  const { data, setData, post, processing, errors, reset } = useForm({
    customer_name: '',
    customer_email: '',
    comment: '',
  });

  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleSubmitComment = (e: FormEvent) => {
    e.preventDefault();
    
    post(`/blog/${blog.id}/comments`, {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setShowCommentForm(false);
        alert('Thank you! Your comment is awaiting moderation.');
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

      <div className="min-h-screen bg-gray-50">
        {/* Article Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link
              href="/blog"
              className="inline-flex items-center text-[#4A651F] hover:text-[#EFE554] mb-6"
            >
              <LuArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
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

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {blog.featured_image && (
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <img
              src={blog.featured_image}
              alt={blog.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* Related Posts */}
          {relatedBlogs.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
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
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#EFE554] line-clamp-2">
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
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Comments ({blog.approved_comments_count})
            </h2>

            {/* Comment Form */}
            {showCommentForm ? (
              <form onSubmit={handleSubmitComment} className="mb-8 p-6 bg-gray-50 rounded-lg">
                <div className="mb-4">
                  <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="customer_name"
                    value={data.customer_name}
                    onChange={(e) => setData('customer_name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  {errors.customer_name && <p className="mt-1 text-sm text-red-600">{errors.customer_name}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="customer_email"
                    value={data.customer_email}
                    onChange={(e) => setData('customer_email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  {errors.customer_email && <p className="mt-1 text-sm text-red-600">{errors.customer_email}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                    Comment <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="comment"
                    rows={4}
                    value={data.comment}
                    onChange={(e) => setData('comment', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  {errors.comment && <p className="mt-1 text-sm text-red-600">{errors.comment}</p>}
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={processing}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {processing ? 'Submitting...' : 'Submit Comment'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCommentForm(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowCommentForm(true)}
                className="mb-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Leave a Comment
              </button>
            )}

            {/* Comments List */}
            {blog.approved_comments.length > 0 ? (
              <div className="space-y-6">
                {blog.approved_comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4 pb-6 border-b last:border-0">
                    <div className="flex-shrink-0">
                      {comment.customer_image ? (
                        <img
                          src={comment.customer_image}
                          alt={comment.customer_name}
                          className="w-12 h-12 rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                          {comment.customer_name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{comment.customer_name}</h4>
                        <span className="text-sm text-gray-500">
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

