import { Head, Link } from '@inertiajs/react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import FloatingWhatsApp from '@/components/shared/floating-whatsapp-button';
import { Clock, Users, ChefHat, ArrowLeft, Printer } from 'lucide-react';

interface RecipeDetailProps {
  recipe: {
    id: number;
    title: string;
    description: string;
    image: string | null;
    prep_time: string;
    cook_time?: string | null;
    servings: number;
    difficulty: string;
    category: string;
    ingredients: string[];
    instructions: string[];
    tips?: string[] | null;
    nutrition?: {
      calories: string;
      protein: string;
      carbs: string;
      fat: string;
    } | null;
  };
}

export default function RecipeDetail({ recipe }: RecipeDetailProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Medium':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Hard':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Head title={`${recipe.title} - Recipes - Cyperus Enterprise`} />
      <Header />
      
      <main className="bg-black min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[40vh] bg-cover bg-center" style={{ backgroundImage: "url('/images/clients/hero/slider1.JPG')" }}>
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative h-full flex flex-col justify-center text-white px-4">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto text-left">
                <Link href="/recipes" className="inline-flex items-center gap-2 text-[#EFE554] hover:text-[#EFE554]/80 mb-4 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Recipes
                </Link>
                <nav className="mb-4">
                  <ol className="flex items-center space-x-2 text-sm text-gray-300">
                    <li><Link href="/" className="hover:text-white">Home</Link></li>
                    <li><span className="mx-2">›</span></li>
                    <li><Link href="/recipes" className="hover:text-white">Recipes</Link></li>
                    <li><span className="mx-2">›</span></li>
                    <li className="text-white font-medium">{recipe.title}</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* Recipe Content */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Recipe Header */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <span className="inline-block bg-[#4A651F]/20 text-[#EFE554] text-xs font-medium px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                    {recipe.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    {recipe.title}
                  </h1>
                  <p className="text-gray-300 text-lg">
                    {recipe.description}
                  </p>
                </div>
                <button
                  onClick={handlePrint}
                  className="ml-4 p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors print:hidden"
                  title="Print Recipe"
                >
                  <Printer className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Recipe Meta */}
              <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-5 h-5 text-[#EFE554]" />
                  <div>
                    <div className="text-xs text-gray-500">Prep Time</div>
                    <div className="font-medium">{recipe.prep_time}</div>
                  </div>
                </div>
                {recipe.cook_time && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <ChefHat className="w-5 h-5 text-[#EFE554]" />
                    <div>
                      <div className="text-xs text-gray-500">Cook Time</div>
                      <div className="font-medium">{recipe.cook_time}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-300">
                  <Users className="w-5 h-5 text-[#EFE554]" />
                  <div>
                    <div className="text-xs text-gray-500">Servings</div>
                    <div className="font-medium">{recipe.servings} people</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium px-4 py-2 rounded-full border ${getDifficultyColor(recipe.difficulty)}`}>
                    {recipe.difficulty}
                  </span>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-[#4A651F] rounded-lg flex items-center justify-center text-sm">📋</span>
                Ingredients
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <span className="w-2 h-2 bg-[#EFE554] rounded-full mt-2 flex-shrink-0" />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-[#4A651F] rounded-lg flex items-center justify-center text-sm">👨‍🍳</span>
                Instructions
              </h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4 text-gray-300">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#4A651F] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </span>
                    <span className="pt-1">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Tips (if available) */}
            {recipe.tips && recipe.tips.length > 0 && (
              <div className="bg-[#4A651F]/10 border border-[#4A651F]/30 rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-[#4A651F] rounded-lg flex items-center justify-center text-sm">💡</span>
                  Chef&apos;s Tips
                </h2>
                <ul className="space-y-3">
                  {recipe.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="text-[#EFE554] mt-1">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Nutrition (if available) */}
            {recipe.nutrition && (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-[#4A651F] rounded-lg flex items-center justify-center text-sm">📊</span>
                  Nutrition Facts
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-[#EFE554]">{recipe.nutrition.calories}</div>
                    <div className="text-sm text-gray-400 mt-1">Calories</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-[#EFE554]">{recipe.nutrition.protein}</div>
                    <div className="text-sm text-gray-400 mt-1">Protein</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-[#EFE554]">{recipe.nutrition.carbs}</div>
                    <div className="text-sm text-gray-400 mt-1">Carbs</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-[#EFE554]">{recipe.nutrition.fat}</div>
                    <div className="text-sm text-gray-400 mt-1">Fat</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Back to Recipes CTA */}
        <section className="py-12 px-4 bg-gradient-to-b from-black to-gray-950">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Looking for More Recipes?
            </h2>
            <p className="text-gray-400 mb-6">
              Explore our full collection of delicious tigernut recipes
            </p>
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 bg-[#4A651F] hover:bg-[#5a7626] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#4A651F]/30"
            >
              <ArrowLeft className="w-5 h-5" />
              View All Recipes
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

