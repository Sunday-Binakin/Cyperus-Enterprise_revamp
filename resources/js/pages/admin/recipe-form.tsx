import { Head, useForm, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { LuSave, LuArrowLeft, LuImage, LuX, LuPlus } from 'react-icons/lu';

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string | null;
  category: string;
  prep_time: string;
  cook_time: string | null;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  tips: string[];
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  } | null;
  is_active: boolean;
  featured: boolean;
}

interface RecipeFormProps {
  recipe?: Recipe;
}

export default function RecipeForm({ recipe }: RecipeFormProps) {
  const isEditing = !!recipe;
  const [imagePreview, setImagePreview] = useState<string | null>(
    recipe?.image || null
  );

  const { data, setData, post, processing, errors } = useForm({
    title: recipe?.title || '',
    description: recipe?.description || '',
    image: null as File | null,
    category: recipe?.category || 'Beverages',
    prep_time: recipe?.prep_time || '',
    cook_time: recipe?.cook_time || '',
    servings: recipe?.servings || 4,
    difficulty: recipe?.difficulty || 'Easy',
    ingredients: recipe?.ingredients || [''],
    instructions: recipe?.instructions || [''],
    tips: recipe?.tips || [],
    nutrition_calories: recipe?.nutrition?.calories || '',
    nutrition_protein: recipe?.nutrition?.protein || '',
    nutrition_carbs: recipe?.nutrition?.carbs || '',
    nutrition_fat: recipe?.nutrition?.fat || '',
    is_active: recipe?.is_active ?? true,
    featured: recipe?.featured || false,
    _method: isEditing ? 'PUT' : 'POST',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setData('image', null);
    setImagePreview(null);
  };

  const addIngredient = () => {
    setData('ingredients', [...data.ingredients, '']);
  };

  const updateIngredient = (index: number, value: string) => {
    const updated = [...data.ingredients];
    updated[index] = value;
    setData('ingredients', updated);
  };

  const removeIngredient = (index: number) => {
    setData('ingredients', data.ingredients.filter((_, i) => i !== index));
  };

  const addInstruction = () => {
    setData('instructions', [...data.instructions, '']);
  };

  const updateInstruction = (index: number, value: string) => {
    const updated = [...data.instructions];
    updated[index] = value;
    setData('instructions', updated);
  };

  const removeInstruction = (index: number) => {
    setData('instructions', data.instructions.filter((_, i) => i !== index));
  };

  const addTip = () => {
    setData('tips', [...data.tips, '']);
  };

  const updateTip = (index: number, value: string) => {
    const updated = [...data.tips];
    updated[index] = value;
    setData('tips', updated);
  };

  const removeTip = (index: number) => {
    setData('tips', data.tips.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      ...data,
      nutrition: data.nutrition_calories || data.nutrition_protein || data.nutrition_carbs || data.nutrition_fat
        ? {
            calories: data.nutrition_calories,
            protein: data.nutrition_protein,
            carbs: data.nutrition_carbs,
            fat: data.nutrition_fat,
          }
        : null,
    };

    const url = isEditing ? `/admin/recipes/${recipe.id}` : '/admin/recipes';

    post(url, {
      data: formData,
      forceFormData: true,
      onSuccess: () => {
        router.visit('/admin/recipes');
      },
    });
  };

  const categories = ['Beverages', 'Snacks', 'Breakfast', 'Desserts', 'Baking'];

  return (
    <AdminLayout>
      <Head title={isEditing ? 'Edit Recipe' : 'Create Recipe'} />

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {isEditing ? 'Edit Recipe' : 'Create New Recipe'}
            </h1>
            <p className="text-gray-400 mt-1">
              {isEditing ? 'Update your recipe' : 'Add a new tigernut recipe'}
            </p>
          </div>
          <button
            onClick={() => router.visit('/admin/recipes')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <LuArrowLeft className="w-5 h-5" />
            Back to Recipes
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Content Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white">Basic Information</h3>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Recipe Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                placeholder="e.g., Classic Tigernut Horchata"
                required
              />
              {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                id="description"
                rows={3}
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                placeholder="Brief description of the recipe"
                required
              />
              {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Recipe Image</label>
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
              {errors.image && <p className="mt-1 text-sm text-red-400">{errors.image}</p>}
            </div>

            {/* Category, Difficulty, Servings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                  Category <span className="text-red-400">*</span>
                </label>
                <select
                  id="category"
                  value={data.category}
                  onChange={(e) => setData('category', e.target.value)}
                  className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white focus:ring-[#EFE554] focus:border-[#EFE554]"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300 mb-2">
                  Difficulty <span className="text-red-400">*</span>
                </label>
                <select
                  id="difficulty"
                  value={data.difficulty}
                  onChange={(e) => setData('difficulty', e.target.value as 'Easy' | 'Medium' | 'Hard')}
                  className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white focus:ring-[#EFE554] focus:border-[#EFE554]"
                  required
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label htmlFor="servings" className="block text-sm font-medium text-gray-300 mb-2">
                  Servings <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  id="servings"
                  min="1"
                  value={data.servings}
                  onChange={(e) => setData('servings', parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white focus:ring-[#EFE554] focus:border-[#EFE554]"
                  required
                />
              </div>
            </div>

            {/* Prep Time, Cook Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="prep_time" className="block text-sm font-medium text-gray-300 mb-2">
                  Prep Time <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="prep_time"
                  value={data.prep_time}
                  onChange={(e) => setData('prep_time', e.target.value)}
                  className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                  placeholder="e.g., 15 mins"
                  required
                />
              </div>

              <div>
                <label htmlFor="cook_time" className="block text-sm font-medium text-gray-300 mb-2">
                  Cook Time (Optional)
                </label>
                <input
                  type="text"
                  id="cook_time"
                  value={data.cook_time}
                  onChange={(e) => setData('cook_time', e.target.value)}
                  className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                  placeholder="e.g., 30 mins"
                />
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Ingredients</h3>
              <button
                type="button"
                onClick={addIngredient}
                className="inline-flex items-center gap-1 text-sm bg-[#4A651F] hover:bg-[#5a7626] text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                <LuPlus className="w-4 h-4" />
                Add
              </button>
            </div>

            <div className="space-y-2">
              {data.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                    className="flex-1 px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                    placeholder={`Ingredient ${index + 1}`}
                    required
                  />
                  {data.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <LuX className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Instructions</h3>
              <button
                type="button"
                onClick={addInstruction}
                className="inline-flex items-center gap-1 text-sm bg-[#4A651F] hover:bg-[#5a7626] text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                <LuPlus className="w-4 h-4" />
                Add Step
              </button>
            </div>

            <div className="space-y-2">
              {data.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#4A651F] rounded-full flex items-center justify-center text-white font-bold text-sm mt-1">
                    {index + 1}
                  </div>
                  <textarea
                    value={instruction}
                    onChange={(e) => updateInstruction(index, e.target.value)}
                    rows={2}
                    className="flex-1 px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                    placeholder={`Step ${index + 1}`}
                    required
                  />
                  {data.instructions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeInstruction(index)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <LuX className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tips (Optional) */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Chef's Tips (Optional)</h3>
              <button
                type="button"
                onClick={addTip}
                className="inline-flex items-center gap-1 text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                <LuPlus className="w-4 h-4" />
                Add Tip
              </button>
            </div>

            {data.tips.length > 0 && (
              <div className="space-y-2">
                {data.tips.map((tip, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={tip}
                      onChange={(e) => updateTip(index, e.target.value)}
                      className="flex-1 px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                      placeholder={`Tip ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeTip(index)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <LuX className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Nutrition (Optional) */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">Nutrition Facts (Optional)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="nutrition_calories" className="block text-sm font-medium text-gray-300 mb-2">
                  Calories
                </label>
                <input
                  type="text"
                  id="nutrition_calories"
                  value={data.nutrition_calories}
                  onChange={(e) => setData('nutrition_calories', e.target.value)}
                  className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                  placeholder="150"
                />
              </div>
              <div>
                <label htmlFor="nutrition_protein" className="block text-sm font-medium text-gray-300 mb-2">
                  Protein
                </label>
                <input
                  type="text"
                  id="nutrition_protein"
                  value={data.nutrition_protein}
                  onChange={(e) => setData('nutrition_protein', e.target.value)}
                  className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                  placeholder="2g"
                />
              </div>
              <div>
                <label htmlFor="nutrition_carbs" className="block text-sm font-medium text-gray-300 mb-2">
                  Carbs
                </label>
                <input
                  type="text"
                  id="nutrition_carbs"
                  value={data.nutrition_carbs}
                  onChange={(e) => setData('nutrition_carbs', e.target.value)}
                  className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                  placeholder="28g"
                />
              </div>
              <div>
                <label htmlFor="nutrition_fat" className="block text-sm font-medium text-gray-300 mb-2">
                  Fat
                </label>
                <input
                  type="text"
                  id="nutrition_fat"
                  value={data.nutrition_fat}
                  onChange={(e) => setData('nutrition_fat', e.target.value)}
                  className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-[#EFE554] focus:border-[#EFE554]"
                  placeholder="4g"
                />
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">Settings</h3>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={data.is_active}
                  onChange={(e) => setData('is_active', e.target.checked)}
                  className="w-4 h-4 bg-black/30 border-white/20 rounded text-[#4A651F] focus:ring-[#EFE554]"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-gray-300">
                  Active (Visible to customers)
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={data.featured}
                  onChange={(e) => setData('featured', e.target.checked)}
                  className="w-4 h-4 bg-black/30 border-white/20 rounded text-[#4A651F] focus:ring-[#EFE554]"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-300">
                  Featured Recipe
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => router.visit('/admin/recipes')}
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
              {processing ? 'Saving...' : isEditing ? 'Update Recipe' : 'Create Recipe'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

