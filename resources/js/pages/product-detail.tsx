import { Head, Link } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '../components/ui/button';
import { useCart } from '../store/cartHooks';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    features: string[];
    price: number;
    comparePrice?: number;
    image?: string;
    images: string[];
    category: string;
    categorySlug: string;
    inStock: boolean;
    stock: number;
    weight: string;
}

interface ProductDetailProps {
    product: Product;
    relatedProducts: any[];
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image || '',
            quantity: 1,
            weight: product.weight,
        });
    };

    return (
        <>
            <Header />
            <Head title={product.name} />
            <div className="bg-black text-white min-h-screen">

            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center gap-2 text-sm">
                    <Link href="/" className="text-gray-300 hover:text-white">
                        Home
                    </Link>
                    <span className="text-gray-500">/</span>
                    <Link
                        href={`/category/${product.categorySlug}`}
                        className="text-gray-300 hover:text-white"
                    >
                        {product.category}
                    </Link>
                    <span className="text-gray-500">/</span>
                    <span className="text-[#EFE554]">{product.name}</span>
                </nav>

                {/* Product Details */}
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Product Image */}
                    <div className="space-y-4">
                        <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900">
                            <img
                                src={product.image || '/images/placeholder.jpg'}
                                alt={product.name}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Thumbnail Gallery */}
                        {product.images && product.images.length > 0 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="overflow-hidden rounded-lg border border-gray-800"
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                {product.name}
                            </h1>
                            <p className="mt-2 text-sm text-gray-400">
                                Category: {product.category}
                            </p>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-[#EFE554]">
                                GH₵{product.price.toLocaleString()}
                            </span>
                            {product.comparePrice && (
                                <span className="text-lg text-gray-500 line-through">
                                    GH₵{product.comparePrice.toLocaleString()}
                                </span>
                            )}
                        </div>

                        {/* Stock Status */}
                        <div>
                            {product.inStock ? (
                                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                    In Stock ({product.stock} available)
                                </span>
                            ) : (
                                <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <div className="prose max-w-none">
                            <p className="text-gray-300">{product.description}</p>
                        </div>

                        {/* Features */}
                        {product.features && product.features.length > 0 && (
                            <div>
                                <h3 className="mb-3 text-lg font-semibold text-white">Key Features:</h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-2 text-gray-300"
                                        >
                                            <span className="mt-1 text-[#4A651F]">•</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Weight */}
                        <div className="text-sm text-gray-400">
                            Weight: <span className="font-medium text-white">{product.weight}</span>
                        </div>

                        {/* Add to Cart */}
                        <Button
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            size="lg"
                            className="w-full"
                        >
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts && relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="mb-6 text-2xl font-bold text-white">Related Products</h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {relatedProducts.map((relatedProduct) => (
                                <Link
                                    key={relatedProduct.id}
                                    href={`/products/${relatedProduct.slug}`}
                                    className="group overflow-hidden rounded-lg border border-gray-800 bg-gray-900 transition-shadow hover:shadow-lg"
                                >
                                    <div className="aspect-square overflow-hidden bg-gray-800">
                                        <img
                                            src={
                                                relatedProduct.image ||
                                                '/images/placeholder.jpg'
                                            }
                                            alt={relatedProduct.name}
                                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-white">
                                            {relatedProduct.name}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-400">
                                            {relatedProduct.category?.name}
                                        </p>
                                        <p className="mt-2 text-lg font-bold text-[#EFE554]">
                                            GH₵{relatedProduct.price.toLocaleString()}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            </div>
            <Footer />
        </>
    );
}

