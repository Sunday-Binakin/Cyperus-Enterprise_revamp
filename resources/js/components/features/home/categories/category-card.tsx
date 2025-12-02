import { Link } from '@inertiajs/react';

interface CategoryCardProps {
  name: string;
  image: string;
  link: string;
}

export default function CategoryCard({ name, image, link }: CategoryCardProps) {
  return (
    <Link href={link} className="block relative w-full h-[400px] group">
      <div className="relative w-full h-full overflow-hidden p-5">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-5 border border-[#eadb08] opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white text-2xl font-bold text-center drop-shadow-lg">
            {name}
          </h3>
        </div>
      </div>
    </Link>
  );
}

