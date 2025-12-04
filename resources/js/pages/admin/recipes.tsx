import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { LuPlus, LuSearch, LuPencil, LuTrash2, LuEye, LuClock, LuUsers, LuChefHat } from 'react-icons/lu';
import Swal from 'sweetalert2';

interface Recipe {
  id: number;
  title: string;
  description: string;
  category: string;
  prep_time: string;
  cook_time: string | null;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  is_active: boolean;
  featured: boolean;
  views: number;
  image: string | null;
  created_at: string;
}

interface PaginatedRecipes {
  data: Recipe[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface Stats {
  total: number;
  active: number;
  featured: number;
}

interface Filters {
  search: string;
  category: string;
  difficulty: string;
}

interface RecipesProps {
  recipes: PaginatedRecipes;
  filters: Filters;
  stats: Stats;
}

export default function Recipes({ recipes, filters, stats }: RecipesProps) {
  const [search, setSearch] = useState(filters.search);
  const [category, setCategory] = useState(filters.category);
  const [difficulty, setDifficulty] = useState(filters.difficulty);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/admin/recipes', { search, category, difficulty }, { preserveState: true });
  };

  const handleDelete = (recipe: Recipe) => {
    Swal.fire({
      title: 'Are you sure?',
      html: `You are about to delete <strong>"${recipe.title}"</strong>.<br>This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: '#1F2937',
      color: '#FFFFFF',
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/admin/recipes/${recipe.id}`, {
          preserveScroll: true,
          onSuccess: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Recipe has been deleted successfully.',
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
              text: 'Failed to delete the recipe. Please try again.',
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

  const categories = ['Beverages', 'Snacks', 'Breakfast', 'Desserts', 'Baking'];

  return (
    <AdminLayout>
      <Head title="Recipe Management" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Recipe Management</h1>
            <p className="text-gray-400 mt-1">Manage your tigernut recipes</p>
          </div>
          <Link
            href="/admin/recipes/create"
            className="inline-flex items-center gap-2 bg-[#4A651F] hover:bg-[#5a7626] text-white px-4 py-2 rounded-lg transition-colors"
          >
            <LuPlus className="w-5 h-5" />
            Create Recipe
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Total Recipes</div>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Active</div>
            <div className="text-3xl font-bold text-green-400">{stats.active}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Featured</div>
            <div className="text-3xl font-bold text-[#EFE554]">{stats.featured}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search recipes..."
                  className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                />
              </div>
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white focus:ring-[#EFE554] focus:border-[#EFE554]"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white focus:ring-[#EFE554] focus:border-[#EFE554]"
            >
              <option value="all">All Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <button
              type="submit"
              className="px-6 py-2 bg-[#4A651F] hover:bg-[#5a7626] text-white rounded-lg transition-colors"
            >
              Filter
            </button>
          </form>
        </div>

        {/* Recipes Table */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Recipe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Stats
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {recipes.data.length > 0 ? (
                  recipes.data.map((recipe) => (
                    <tr key={recipe.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {recipe.image ? (
                            <img
                              src={recipe.image}
                              alt={recipe.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#4A651F] to-[#3a4f18] flex items-center justify-center text-2xl">
                              🥜
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-white">{recipe.title}</div>
                            <div className="text-sm text-gray-400 line-clamp-1">
                              {recipe.description}
                            </div>
                            {recipe.featured && (
                              <span className="inline-block mt-1 text-xs bg-[#EFE554]/20 text-[#EFE554] px-2 py-0.5 rounded">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                          {recipe.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <LuClock className="w-3.5 h-3.5" />
                            {recipe.prep_time}
                            {recipe.cook_time && ` + ${recipe.cook_time}`}
                          </div>
                          <div className="flex items-center gap-1">
                            <LuUsers className="w-3.5 h-3.5" />
                            {recipe.servings} servings
                          </div>
                          <div className="flex items-center gap-1">
                            <LuChefHat className="w-3.5 h-3.5" />
                            {recipe.difficulty}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <LuEye className="w-4 h-4" />
                          {recipe.views} views
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            recipe.is_active
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          {recipe.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/recipes/${recipe.id}`}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            title="View"
                          >
                            <LuEye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/admin/recipes/${recipe.id}/edit`}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <LuPencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(recipe)}
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
                      No recipes found. Create your first recipe to get started!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {recipes.last_page > 1 && (
            <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing {recipes.data.length} of {recipes.total} results
              </div>
              <div className="flex gap-2">
                {Array.from({ length: recipes.last_page }, (_, i) => i + 1).map((page) => (
                  <Link
                    key={page}
                    href={`/admin/recipes?page=${page}`}
                    className={`px-3 py-1 rounded ${
                      page === recipes.current_page
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

