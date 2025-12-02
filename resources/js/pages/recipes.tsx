import { Head } from '@inertiajs/react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import FloatingWhatsApp from '@/components/shared/floating-whatsapp-button';

export default function Recipes() {
  // Dummy recipe data - you can later fetch this from the database
  const recipes = [
    {
      id: 1,
      title: 'Classic Tigernut Horchata',
      description: 'A refreshing Spanish-style drink made with fresh tigernuts, perfect for hot days.',
      image: '/images/recipes/horchata.jpg',
      prepTime: '15 mins',
      servings: 4,
      difficulty: 'Easy',
      ingredients: [
        '200g tigernuts (soaked overnight)',
        '1 liter water',
        '3-4 tbsp honey or sugar',
        '1 tsp vanilla extract',
        '1 cinnamon stick',
        'Ice cubes'
      ],
      instructions: [
        'Drain soaked tigernuts and blend with 500ml water until smooth',
        'Strain mixture through cheesecloth or fine mesh',
        'Add remaining water, sweetener, vanilla, and cinnamon',
        'Refrigerate for 2-3 hours',
        'Serve over ice, garnish with cinnamon'
      ]
    },
    {
      id: 2,
      title: 'Tigernut Energy Balls',
      description: 'No-bake protein-packed snacks perfect for pre-workout or afternoon pick-me-up.',
      image: '/images/recipes/energy-balls.jpg',
      prepTime: '20 mins',
      servings: 12,
      difficulty: 'Easy',
      ingredients: [
        '1 cup tigernut flour',
        '1/2 cup dates (pitted)',
        '1/4 cup almond butter',
        '2 tbsp honey',
        '1/4 cup dark chocolate chips',
        '2 tbsp chia seeds',
        'Pinch of sea salt'
      ],
      instructions: [
        'Blend dates and almond butter in food processor',
        'Add tigernut flour, honey, and salt - pulse until combined',
        'Fold in chocolate chips and chia seeds',
        'Roll into 1-inch balls',
        'Refrigerate for 30 minutes before serving',
        'Store in airtight container in fridge for up to 2 weeks'
      ]
    },
    {
      id: 3,
      title: 'Tigernut Milk Smoothie Bowl',
      description: 'A nutritious and delicious breakfast bowl packed with vitamins and fiber.',
      image: '/images/recipes/smoothie-bowl.jpg',
      prepTime: '10 mins',
      servings: 2,
      difficulty: 'Easy',
      ingredients: [
        '1 cup tigernut milk',
        '2 frozen bananas',
        '1 cup frozen mixed berries',
        '1 tbsp tigernut flour',
        '1 tbsp chia seeds',
        'Toppings: granola, fresh fruit, coconut flakes'
      ],
      instructions: [
        'Blend tigernut milk, frozen bananas, and berries until thick',
        'Add tigernut flour and chia seeds, blend again',
        'Pour into bowls',
        'Top with your favorite toppings',
        'Serve immediately'
      ]
    },
    {
      id: 4,
      title: 'Tigernut Pancakes',
      description: 'Fluffy, gluten-free pancakes with a subtle nutty flavor - perfect for weekend brunch.',
      image: '/images/recipes/pancakes.jpg',
      prepTime: '25 mins',
      servings: 4,
      difficulty: 'Medium',
      ingredients: [
        '1 cup tigernut flour',
        '2 eggs',
        '1 cup tigernut milk',
        '2 tbsp honey',
        '1 tsp baking powder',
        '1/2 tsp vanilla extract',
        'Pinch of salt',
        'Butter for cooking'
      ],
      instructions: [
        'Whisk together dry ingredients in a bowl',
        'In another bowl, beat eggs and add milk, honey, and vanilla',
        'Combine wet and dry ingredients - mix until just combined',
        'Let batter rest for 5 minutes',
        'Heat butter in pan over medium heat',
        'Pour 1/4 cup batter per pancake',
        'Cook until bubbles form, flip and cook other side',
        'Serve with maple syrup and fresh berries'
      ]
    },
    {
      id: 5,
      title: 'Tigernut Chocolate Chip Cookies',
      description: 'Chewy, delicious cookies that are both healthy and indulgent - perfect with tigernut milk!',
      image: '/images/recipes/cookies.jpg',
      prepTime: '30 mins',
      servings: 20,
      difficulty: 'Medium',
      ingredients: [
        '2 cups tigernut flour',
        '1/2 cup coconut oil (melted)',
        '1/2 cup coconut sugar',
        '2 eggs',
        '1 tsp vanilla extract',
        '1 tsp baking soda',
        '1/2 tsp salt',
        '1 cup dark chocolate chips'
      ],
      instructions: [
        'Preheat oven to 350°F (175°C)',
        'Mix coconut oil and sugar until combined',
        'Add eggs and vanilla, beat well',
        'In separate bowl, combine flour, baking soda, and salt',
        'Gradually add dry ingredients to wet mixture',
        'Fold in chocolate chips',
        'Drop tablespoons of dough onto baking sheet',
        'Bake 12-15 minutes until golden',
        'Cool on wire rack'
      ]
    },
    {
      id: 6,
      title: 'Tigernut Coffee Creamer',
      description: 'A dairy-free, naturally sweet creamer that elevates your morning coffee.',
      image: '/images/recipes/creamer.jpg',
      prepTime: '10 mins',
      servings: 8,
      difficulty: 'Easy',
      ingredients: [
        '1 cup tigernut milk',
        '2 dates (pitted)',
        '1 tsp vanilla extract',
        '1/4 tsp cinnamon',
        'Pinch of nutmeg (optional)'
      ],
      instructions: [
        'Blend all ingredients until smooth',
        'Strain through fine mesh if desired',
        'Store in airtight container in fridge',
        'Use within 5 days',
        'Shake well before each use'
      ]
    }
  ];

  return (
    <>
      <Head title="Recipes - Cyperus Enterprise" />
      <Header />
      
      <main className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Tigernut Recipes
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto">
              Discover delicious ways to enjoy the wholesome goodness of tigernuts. 
              From drinks to desserts, these recipes are healthy, tasty, and easy to make!
            </p>
          </div>
        </section>

        {/* Recipes Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <article
                  key={recipe.id}
                  className="bg-zinc-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                >
                  {/* Recipe Image */}
                  <div className="h-64 bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">🥜</div>
                      <h3 className="text-2xl font-bold text-white">{recipe.title}</h3>
                    </div>
                  </div>

                  {/* Recipe Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center justify-between mb-4 text-sm text-amber-400">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {recipe.prepTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        {recipe.servings} servings
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        recipe.difficulty === 'Easy' 
                          ? 'bg-green-900 text-green-300' 
                          : 'bg-amber-900 text-amber-300'
                      }`}>
                        {recipe.difficulty}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4">
                      {recipe.description}
                    </p>

                    {/* Ingredients Preview */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-amber-400 mb-2">Ingredients:</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-500 mt-1">•</span>
                            <span>{ingredient}</span>
                          </li>
                        ))}
                        {recipe.ingredients.length > 3 && (
                          <li className="text-amber-400 italic">
                            +{recipe.ingredients.length - 3} more ingredients...
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Instructions Preview */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-amber-400 mb-2">Instructions:</h4>
                      <ol className="text-sm text-gray-400 space-y-1">
                        {recipe.instructions.slice(0, 2).map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-500 font-semibold">{idx + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                        {recipe.instructions.length > 2 && (
                          <li className="text-amber-400 italic ml-5">
                            +{recipe.instructions.length - 2} more steps...
                          </li>
                        )}
                      </ol>
                    </div>

                    {/* Try Button */}
                    <button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                      View Full Recipe
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Try These Recipes?
            </h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Get our premium tigernut products delivered to your door and start creating delicious, healthy meals today!
            </p>
            <a
              href="/products"
              className="inline-block bg-white text-amber-900 font-bold py-4 px-8 rounded-lg hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Shop Tigernut Products
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

