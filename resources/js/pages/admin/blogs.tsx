import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { LuPlus, LuSearch, LuPencil, LuTrash2, LuEye, LuMessageSquare } from 'react-icons/lu';
import Swal from 'sweetalert2';

interface Author {
  id: number;
  name: string;
}

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  status: 'draft' | 'published';
  published_at: string | null;
  featured: boolean;
  views: number;
  comments_count: number;
  author: Author;
  created_at: string;
}

interface PaginatedBlogs {
  data: Blog[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface Stats {
  total: number;
  published: number;
  drafts: number;
  featured: number;
}

interface Filters {
  search: string;
  status: string;
}

interface BlogsProps {
  blogs: PaginatedBlogs;
  filters: Filters;
  stats: Stats;
}

export default function Blogs({ blogs, filters, stats }: BlogsProps) {
  const [search, setSearch] = useState(filters.search);
  const [status, setStatus] = useState(filters.status);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/admin/blogs', { search, status }, { preserveState: true });
  };

  const handleDelete = (blog: Blog) => {
    Swal.fire({
      title: 'Are you sure?',
      html: `You are about to delete <strong>"${blog.title}"</strong>.<br>This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: '#1F2937',
      color: '#FFFFFF',
      customClass: {
        popup: 'dark-swal',
        title: 'text-white',
        htmlContainer: 'text-gray-300',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/admin/blogs/${blog.id}`, {
          preserveScroll: true,
          onSuccess: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Blog post has been deleted successfully.',
              icon: 'success',
              confirmButtonColor: '#4A651F',
              background: '#1F2937',
              color: '#FFFFFF',
              timer: 2000,
              showConfirmButton: false,
            });
          },
          onError: () => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the blog post. Please try again.',
              icon: 'error',
              confirmButtonColor: '#DC2626',
              background: '#1F2937',
              color: '#FFFFFF',
            });
          },
        });
      }
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <AdminLayout>
      <Head title="Blog Management" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Blog Management</h1>
            <p className="text-gray-400 mt-1">Manage your blog posts and articles</p>
          </div>
          <Link
            href="/admin/blogs/create"
            className="inline-flex items-center gap-2 bg-[#4A651F] hover:bg-[#5a7626] text-white px-4 py-2 rounded-lg transition-colors"
          >
            <LuPlus className="w-5 h-5" />
            Create Blog Post
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Total Posts</div>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Published</div>
            <div className="text-3xl font-bold text-green-400">{stats.published}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Drafts</div>
            <div className="text-3xl font-bold text-yellow-400">{stats.drafts}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Featured</div>
            <div className="text-3xl font-bold text-[#EFE554]">{stats.featured}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search blog posts..."
                  className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                />
              </div>
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white focus:ring-[#EFE554] focus:border-[#EFE554]"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            <button
              type="submit"
              className="px-6 py-2 bg-[#4A651F] hover:bg-[#5a7626] text-white rounded-lg transition-colors"
            >
              Filter
            </button>
          </form>
        </div>

        {/* Blog Posts Table */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Stats
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Published
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {blogs.data.length > 0 ? (
                  blogs.data.map((blog) => (
                    <tr key={blog.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-white">{blog.title}</div>
                          {blog.excerpt && (
                            <div className="text-sm text-gray-400 line-clamp-1 mt-1">
                              {blog.excerpt}
                            </div>
                          )}
                          {blog.featured && (
                            <span className="inline-block mt-1 text-xs bg-[#EFE554]/20 text-[#EFE554] px-2 py-0.5 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {blog.author.name}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            blog.status === 'published'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {blog.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <LuEye className="w-4 h-4" />
                            {blog.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <LuMessageSquare className="w-4 h-4" />
                            {blog.comments_count}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {blog.published_at ? formatDate(blog.published_at) : '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            title="View"
                          >
                            <LuEye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/admin/blogs/${blog.id}/edit`}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <LuPencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(blog)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <LuTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                      No blog posts found. Create your first blog post to get started!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {blogs.last_page > 1 && (
            <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing {blogs.data.length} of {blogs.total} results
              </div>
              <div className="flex gap-2">
                {Array.from({ length: blogs.last_page }, (_, i) => i + 1).map((page) => (
                  <Link
                    key={page}
                    href={`/admin/blogs?page=${page}`}
                    className={`px-3 py-1 rounded ${
                      page === blogs.current_page
                        ? 'bg-[#4A651F] text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {page}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

