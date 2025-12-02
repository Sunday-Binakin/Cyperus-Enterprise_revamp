type ProductDetailsProps = {
  category: string;
  description: string;
};

export function ProductDetails({ category, description }: ProductDetailsProps) {
  return (
    <section aria-labelledby="details-heading" className="mt-12">
      <h2 id="details-heading" className="sr-only">Additional details</h2>
      <div className="border-t border-gray-700 divide-y divide-gray-700">
        <div>
          <h3>
            <button
              type="button"
              className="group relative w-full py-6 flex justify-between items-center text-left"
              aria-controls="disclosure-1"
              aria-expanded="false"
            >
              <span className="text-white font-medium">Product Details</span>
            </button>
          </h3>
          <div className="pb-6" id="disclosure-1">
            <div className="space-y-6 text-base text-gray-300">
              <p>{description}</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="px-3 py-1.5 bg-gray-800 rounded-full border border-gray-700">
                <span className="text-sm font-semibold text-[#EFE554]">{category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

