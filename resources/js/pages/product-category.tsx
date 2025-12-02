import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import ProductCategoryPage from '@/components/features/product/product-category-page';
import { Product } from '@/types/product';

interface ProductCategoryProps {
  title: string;
  description?: string;
  products: Product[];
  categoryPath: string;
}

export default function ProductCategory({ title, description, products, categoryPath }: ProductCategoryProps) {
  return (
    <>
      <Header />
      <ProductCategoryPage
        title={title}
        description={description}
        products={products}
        categoryPath={categoryPath}
      />
      <Footer />
    </>
  );
}

