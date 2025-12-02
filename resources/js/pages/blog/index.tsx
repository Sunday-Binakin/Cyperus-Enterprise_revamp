import { Head, router, Link } from '@inertiajs/react';
import { useState } from 'react';
import { LuSearch, LuCalendar, LuUser, LuClock, LuArrowRight, LuEye, LuMessageSquare } from 'react-icons/lu';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

interface Author {
  name: string;
}

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  published_at: string;
  author: Author;
  views: number;
  approved_comments_count: number;
}

interface BlogIndexProps {
  blogs: {
    data: Blog[];
    links: any[];
    current_page: number;
    last_page: number;
  };
  featuredBlogs: Blog[];
  filters: {
    search: string;
    tag: string;
  };
}

export default function BlogIndex({ blogs, featuredBlogs, filters }: BlogIndexProps) {
  const [searchTerm, setSearchTerm] = useState(filters.search);

  const handleSearch = () => {
    router.get('/blog', {
      search: searchTerm,
    }, {
      preserveState: true,
      preserveScroll: true,
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
      <Head title="Blog" />
      <Header />

      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <div className="relative bg-cover bg-center text-white py-16" style={{ backgroundImage: "url('/images/clients/hero/slider1.JPG')" }}>
        <div className="absolute inset-0 bg-black/60" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
              <p className="text-xl mb-8 text-gray-100">
                Insights, tips, and stories from our team
              </p>

              {/* Search Bar */}
              <div className="flex gap-2 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <LuSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="px-6 py-3 bg-[#4A651F] text-white rounded-lg font-semibold hover:bg-[#3a4f18] transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredBlogs.length > 0 && (
          <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-white mb-8">Featured Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {blog.featured_image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.featured_image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#EFE554] transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-3">{blog.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <LuCalendar className="h-4 w-4 mr-1" />
                        {formatDate(blog.published_at)}
                      </span>
                      <span className="flex items-center">
                        <LuEye className="h-4 w-4 mr-1" />
                        {blog.views}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-white mb-8">All Posts</h2>
          
          {blogs.data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.data.map((blog) => (
                  <article
                    key={blog.id}
                    className="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
                  >
                    {blog.featured_image && (
                      <Link href={`/blog/${blog.slug}`} className="block relative h-48 overflow-hidden">
                        <img
                          src={blog.featured_image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                    )}
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <LuUser className="h-4 w-4 mr-1" />
                        <span>{blog.author.name}</span>
                        <span className="mx-2">•</span>
                        <LuCalendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(blog.published_at)}</span>
                      </div>
                      
                      <Link href={`/blog/${blog.slug}`}>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#EFE554] transition-colors">
                          {blog.title}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-300 mb-4 line-clamp-3">{blog.excerpt}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <span className="flex items-center">
                            <LuEye className="h-4 w-4 mr-1" />
                            {blog.views}
                          </span>
                          <span className="flex items-center">
                            <LuMessageSquare className="h-4 w-4 mr-1" />
                            {blog.approved_comments_count}
                          </span>
                        </div>
                        
                        <Link
                          href={`/blog/${blog.slug}`}
                          className="inline-flex items-center text-[#4A651F] hover:text-[#EFE554] font-semibold"
                        >
                          Read More
                          <LuArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {blogs.last_page > 1 && (
                <div className="flex justify-center mt-12">
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    {blogs.links.map((link, index) => (
                      <button
                        key={index}
                        onClick={() => link.url && router.get(link.url)}
                        disabled={!link.url || link.active}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          link.active
                            ? 'z-10 bg-[#4A651F] border-[#4A651F] text-white'
                            : 'bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800'
                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''} ${
                          index === 0 ? 'rounded-l-md' : ''
                        } ${index === blogs.links.length - 1 ? 'rounded-r-md' : ''}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                      />
                    ))}
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-300 text-lg">No blog posts found.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

