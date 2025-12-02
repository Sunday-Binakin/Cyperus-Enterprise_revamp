const benefits = [
  {
    icon: '🌱',
    title: 'Naturally Wholesome',
    description: 'We keep it simple and pure. Our tigernuts are sourced straight from trusted farmers and processed with care — no additives, just the real thing.'
  },
  {
    icon: '🧃',
    title: 'Health You Can Taste',
    description: 'From creamy dairy-free drinks to delicious snacks and popsicles, our products are rich in fiber, iron, and plant-based nutrients. Perfect for everyone — including vegans, kids, and the health-conscious.'
  },
  {
    icon: '⚡',
    title: 'Sustained Energy, Every Day',
    description: 'Whether you\'re starting your morning or need a midday boost, our tigernut-based drinks and snacks give you lasting, natural energy — without the crash.'
  },
  {
    icon: '💼',
    title: 'Made with Purpose',
    description: 'By choosing Cyperus, you\'re supporting a business that\'s creating jobs, empowering women, and transforming Ghana\'s food system — one tigernut at a time.'
  }
];

export default function WhyChoose() {
  return (
    <div className="w-full bg-black py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div className="relative h-[600px] w-full">
          <img
            src="/images/clients/products/footer/choconut.jpg"
            alt="Tigernut Drink Splash"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Content Section */}
        <div className="text-white space-y-8 ml-10">
          <p className="text-[#EFE554] text-lg font-medium">WHY CHOOSE CYPERUS ENTERPRISE</p>
          <h2 className="text-4xl md:text-3xl font-bold leading-tight">
            Experience the Power of Tigernut — Reimagined for You
          </h2>
          <p className="text-gray-300 text-lg">
            At Cyperus Enterprise, we believe tigernut isn't just a superfood — it's a solution for health, taste, and opportunity. Every product we make is crafted to nourish your body and uplift our communities.
          </p>

          {/* Benefits */}
          <div className="space-y-6 mt-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="text-2xl mt-1">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-8 p-6 bg-gray-900 rounded-lg border-l-4 border-[#EFE554]">
            <h3 className="text-[#EFE554] text-xl font-bold mb-3">WHAT DRIVES US</h3>
            <p className="text-gray-300 text-base leading-relaxed mb-4">
              At Cyperus Enterprise, we're driven by more than just food — we're building a future where tigernut powers health, jobs, and purpose.
            </p>
            <p className="text-gray-300 text-base leading-relaxed mb-4">
              From farm to bottle, we create clean, nourishing products, empower young women with skills and jobs, and use every part of the tigernut to reduce waste and grow sustainably.
            </p>
            <p className="text-[#EFE554] font-semibold italic">
              Rooted in Ghana. Crafted for impact.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

