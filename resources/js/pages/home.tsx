import { Head } from '@inertiajs/react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import ScrollReveal from '@/components/ui/scroll-reveal';
import FloatingWhatsApp from '@/components/shared/floating-whatsapp-button';
import { Slideshow } from '@/components/features/home/hero';
import { Categories } from '@/components/features/home/categories';
import { FeaturedProducts } from '@/components/features/home/featured';
import { WhyChoose } from '@/components/features/home/why-choose';
import { Testimonials } from '@/components/features/home/testimonials';
import { SubscribeSection } from '@/components/features/home/subscribe';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  image?: string;
  category: string;
  inStock: boolean;
  weight?: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
  productCount: number;
}

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  content: string;
  image?: string;
}

interface HomeProps {
  featuredProducts?: Product[];
  categories?: Category[];
  testimonials?: Testimonial[];
}

export default function Home({ featuredProducts = [], categories = [], testimonials = [] }: HomeProps) {
  return (
    <>
      <Head title="Cyperus Enterprise - Premium Tigernut Products" />
      <Header />
      <main>
        {/* Hero section - no animation as it's above the fold */}
        <Slideshow />
        
        {/* Featured Products animate up */}
        <ScrollReveal direction="up" delay={0.2}>
          <FeaturedProducts products={featuredProducts} />
        </ScrollReveal>

        {/* Why Choose section animates from right */}
        <ScrollReveal direction="right">
          <WhyChoose />
        </ScrollReveal>

        {/* Categories animate up */}
        <ScrollReveal direction="up" delay={0.2}>
          <Categories />
        </ScrollReveal>

        {/* Testimonials section animates from left */}
        <ScrollReveal direction="left">
          <Testimonials testimonials={testimonials} />
        </ScrollReveal>

        {/* Subscribe section animates from right */}
        <ScrollReveal direction="right">
          <SubscribeSection />
        </ScrollReveal>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
