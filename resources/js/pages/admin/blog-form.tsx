import { Head, useForm, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { LuSave, LuArrowLeft, LuImage, LuX } from 'react-icons/lu';

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  status: 'draft' | 'published';
  published_at: string | null;
  featured: boolean;
  tags: string[];
}

interface BlogFormProps {
  blog?: Blog;
}

export default function BlogForm({ blog }: BlogFormProps) {
  const isEditing = !!blog;
  const [imagePreview, setImagePreview] = useState<string | null>(
    blog?.featured_image || null
  );

  const { data, setData, post, processing, errors } = useForm({
    title: blog?.title || '',
    excerpt: blog?.excerpt || '',
    content: blog?.content || '',
    featured_image: null as File | null,
    status: blog?.status || 'draft',
    published_at: blog?.published_at || '',
    featured: blog?.featured || false,
    tags: blog?.tags || [],
    _method: isEditing ? 'PUT' : 'POST',
  });

  const [tagInput, setTagInput] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('featured_image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setData('featured_image', null);
    setImagePreview(null);
  };

  const addTag = () => {
    if (tagInput.trim() && !data.tags.includes(tagInput.trim())) {
      setData('tags', [...data.tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setData('tags', data.tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const url = isEditing ? `/admin/blogs/${blog.id}` : '/admin/blogs';

    post(url, {
      forceFormData: true,
      onSuccess: () => {
        router.visit('/admin/blogs');
      },
    });
  };

  return (
    <AdminLayout>
      <Head title={isEditing ? 'Edit Blog Post' : 'Create Blog Post'} />

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h1>
            <p className="text-gray-400 mt-1">
              {isEditing ? 'Update your blog post' : 'Write and publish a new blog post'}
            </p>
          </div>
          <button
            onClick={() => router.visit('/admin/blogs')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <LuArrowLeft className="w-5 h-5" />
            Back to Blogs
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Content Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                placeholder="Enter blog post title"
                required
              />
              {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300 mb-2">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                rows={3}
                value={data.excerpt}
                onChange={(e) => setData('excerpt', e.target.value)}
                className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                placeholder="Brief summary of the blog post (optional)"
              />
              {errors.excerpt && <p className="mt-1 text-sm text-red-400">{errors.excerpt}</p>}
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                Content <span className="text-red-400">*</span>
              </label>
              <textarea
                id="content"
                rows={15}
                value={data.content}
                onChange={(e) => setData('content', e.target.value)}
                className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554] font-mono text-sm"
                placeholder="Write your blog post content here (HTML supported)"
                required
              />
              {errors.content && <p className="mt-1 text-sm text-red-400">{errors.content}</p>}
              <p className="mt-2 text-xs text-gray-400">
                You can use HTML tags for formatting. For example: &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;a&gt;
              </p>
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Featured Image
              </label>
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  >
                    <LuX className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-[#EFE554]/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <LuImage className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="mb-2 text-sm text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
              {errors.featured_image && (
                <p className="mt-1 text-sm text-red-400">{errors.featured_image}</p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                  placeholder="Add a tag and press Enter"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
              {data.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#4A651F]/20 text-[#EFE554] rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-400 transition-colors"
                      >
                        <LuX className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Settings Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white">Publishing Settings</h3>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
                Status <span className="text-red-400">*</span>
              </label>
              <select
                id="status"
                value={data.status}
                onChange={(e) => setData('status', e.target.value as 'draft' | 'published')}
                className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white focus:ring-[#EFE554] focus:border-[#EFE554]"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
              {errors.status && <p className="mt-1 text-sm text-red-400">{errors.status}</p>}
            </div>

            {/* Published Date */}
            {data.status === 'published' && (
              <div>
                <label htmlFor="published_at" className="block text-sm font-medium text-gray-300 mb-2">
                  Publish Date
                </label>
                <input
                  type="datetime-local"
                  id="published_at"
                  value={data.published_at}
                  onChange={(e) => setData('published_at', e.target.value)}
                  className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white focus:ring-[#EFE554] focus:border-[#EFE554]"
                />
                {errors.published_at && (
                  <p className="mt-1 text-sm text-red-400">{errors.published_at}</p>
                )}
              </div>
            )}

            {/* Featured */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={data.featured}
                onChange={(e) => setData('featured', e.target.checked)}
                className="w-4 h-4 bg-black/30 border-white/20 rounded text-[#4A651F] focus:ring-[#EFE554]"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-300">
                Mark as Featured Post
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => router.visit('/admin/blogs')}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#4A651F] hover:bg-[#5a7626] text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <LuSave className="w-5 h-5" />
              {processing ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

