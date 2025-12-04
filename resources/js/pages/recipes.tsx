import { Head, Link } from '@inertiajs/react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import FloatingWhatsApp from '@/components/shared/floating-whatsapp-button';
import { TigernutsCTA } from '@/components/features/pages';
import { Clock, Users, ChefHat, ArrowRight } from 'lucide-react';

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string | null;
  prep_time: string;
  cook_time: string | null;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

interface RecipesProps {
  recipes: Recipe[];
  filters: {
    category: string;
    difficulty: string;
    search: string;
  };
}

export default function Recipes({ recipes, filters }: RecipesProps) {

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

  return (
    <>
      <Head title="Recipes - Cyperus Enterprise" />
      <Header />
      
      <main className="bg-black">
        {/* Hero Section */}
        <section className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('/images/clients/hero/slider1.JPG')" }}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative h-full flex flex-col justify-center text-white px-4">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto text-left">
                <nav className="mb-4">
                  <ol className="flex items-center space-x-2 text-sm text-gray-200">
                    <li><a href="/" className="hover:text-white text-gray-300">Home</a></li>
                    <li><span className="mx-2">›</span></li>
                    <li className="text-white font-medium">Recipes</li>
                  </ol>
                </nav>
                <h1 className="text-4xl md:text-6xl font-bold text-white">Recipes</h1>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-12 px-4 bg-black">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Discover Delicious Tigernut Recipes
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Explore our collection of healthy and easy-to-make recipes featuring the goodness of tigernuts.
            </p>
          </div>
        </section>

        {/* Recipes Grid */}
        <section className="py-12 px-4 bg-black">
          <div className="container mx-auto max-w-6xl">
            {recipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                  <Link
                    key={recipe.id}
                    href={`/recipes/${recipe.id}`}
                    className="group block bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-[#EFE554]/50 transition-all duration-300 hover:transform hover:scale-[1.03] hover:shadow-xl hover:shadow-[#EFE554]/20"
                  >
                    {/* Recipe Image */}
                    <div className="relative h-48 bg-gradient-to-br from-[#4A651F] to-[#3a4f18] overflow-hidden">
                      {recipe.image ? (
                        <img 
                          src={recipe.image} 
                          alt={recipe.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-6xl transform group-hover:scale-110 transition-transform duration-300">
                            {recipe.category === 'Beverages' ? '🥤' : 
                             recipe.category === 'Snacks' ? '🍪' : 
                             recipe.category === 'Breakfast' ? '🥞' : 
                             recipe.category === 'Desserts' ? '🍰' : 
                             recipe.category === 'Baking' ? '🍞' : '🥜'}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Recipe Content */}
                    <div className="p-5">
                      {/* Category */}
                      <div className="mb-2">
                        <span className="text-xs font-medium text-[#EFE554] uppercase tracking-wider">
                          {recipe.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#EFE554] transition-colors">
                        {recipe.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                        {recipe.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {recipe.prep_time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {recipe.servings}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#EFE554] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🥜</div>
                <h3 className="text-2xl font-bold text-white mb-2">No Recipes Yet</h3>
                <p className="text-gray-400">
                  Check back soon for delicious tigernut recipes!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <TigernutsCTA />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

