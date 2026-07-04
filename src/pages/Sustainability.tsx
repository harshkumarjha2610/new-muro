import React, { useState } from "react";
import { Heart } from "lucide-react";

const serifFont = "Georgia, 'Times New Roman', serif";
const containerClass = "max-w-[1400px] mx-auto px-4 md:px-8";

// Mock data generator for products
const generateProducts = (startId: number, count: number) => {
  const brands = ["Postery", "Postery Kids", "Postery Atelier", "Moomin"];
  const titles = [
    "My Tree House", "Sleeping Teddy", "The Green Balloon Ride", "The Balloon Ride", 
    "Porsche in the City", "Un Café", "Elephant Pilot", "Moomin And His Friends In The Woods",
    "Poolside Paradise", "Empty Resort", "Beach Surfboards", "Groovy Blossom",
    "Monkey Ride", "Turtle Ride", "Dotty Giraffes", "Moomin Sunset by the Sea"
  ];
  
  const images = [
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1945&auto=format&fit=crop", // art 1
    "https://images.unsplash.com/photo-1581337204873-ef36aa186caa?q=80&w=2056&auto=format&fit=crop", // art 2
    "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=1948&auto=format&fit=crop", // art 3
    "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=2070&auto=format&fit=crop", // abstract 1
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop", // interior
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop", // minimal
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop", // frame
    "https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?q=80&w=2052&auto=format&fit=crop"  // painting
  ];

  const hoverImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?q=80&w=2070&auto=format&fit=crop"
  ];

  return Array.from({ length: count }).map((_, i) => {
    const id = startId + i;
    const isPremium = Math.random() > 0.5;
    return {
      id: id,
      brand: brands[id % brands.length],
      title: titles[id % titles.length],
      price: isPremium ? 9.99 : 6.99,
      originalPrice: isPremium ? 17.99 : 12.99,
      image: images[id % images.length],
      hoverImage: hoverImages[id % hoverImages.length],
      isNew: id % 7 === 0
    };
  });
};

const INITIAL_COUNT = 24;
const TOTAL_PRODUCTS = 2425;
const LOAD_MORE_COUNT = 12;

const Sustainability: React.FC = () => {
  const [products, setProducts] = useState(generateProducts(0, INITIAL_COUNT));
  const [isLoading, setIsLoading] = useState(false);

  const handleShowMore = () => {
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setProducts(prev => [
        ...prev, 
        ...generateProducts(prev.length, Math.min(LOAD_MORE_COUNT, TOTAL_PRODUCTS - prev.length))
      ]);
      setIsLoading(false);
    }, 600);
  };

  const progressPercentage = Math.min((products.length / TOTAL_PRODUCTS) * 100, 100);

  return (
    <main className="min-h-screen bg-white text-[#111111] font-sans selection:bg-[#111111] selection:text-white pt-10 pb-20">
      <div className={containerClass}>
        
        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer flex flex-col">
              
              {/* Image Container */}
              <div className="relative bg-[#f4f4f4] rounded-[8px] overflow-hidden aspect-[3/4] mb-4 flex items-center justify-center p-6 md:p-8">
                
                {/* Heart Icon */}
                <button className="absolute top-3 right-3 p-2 z-10 text-gray-500 hover:text-black transition-colors">
                  <Heart className="w-5 h-5" strokeWidth={1.5} />
                </button>

                {/* New Badge */}
                {product.isNew && (
                  <div className="absolute top-4 left-4 z-10 bg-white px-2 py-1 text-[10px] font-bold tracking-wider uppercase text-black rounded-sm shadow-sm">
                    New
                  </div>
                )}

                {/* Product Image (Simulating a physical poster with a subtle drop shadow) */}
                <div className="relative w-full h-full flex items-center justify-center">
                   <img 
                      src={product.image} 
                      alt={product.title} 
                      className="absolute max-w-full max-h-full object-contain shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-opacity duration-500 group-hover:opacity-0"
                    />
                   <img 
                      src={product.hoverImage} 
                      alt={`${product.title} framed`} 
                      className="absolute w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    />
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow">
                <span className="text-[12px] text-[#777777] mb-1">{product.brand}</span>
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-[13px] font-medium text-[#111111] leading-snug line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-[13px] font-medium text-[#111111]">£{product.price.toFixed(2)}</span>
                    <span className="text-[12px] text-[#999999] line-through">£{product.originalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Pagination / Show More Section */}
        {products.length < TOTAL_PRODUCTS && (
          <div className="mt-20 flex flex-col items-center justify-center">
            <p className="text-[14px] font-medium text-[#111111] mb-4">
              You have viewed {products.length} of {TOTAL_PRODUCTS} products
            </p>
            
            {/* Progress Bar */}
            <div className="w-[240px] h-[2px] bg-[#E5E5E5] mb-8">
              <div 
                className="h-full bg-[#111111] transition-all duration-500 ease-out" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <button 
              onClick={handleShowMore}
              disabled={isLoading}
              className="px-8 py-2.5 rounded-full border border-[#111111] text-[#111111] text-[13px] font-bold tracking-wider hover:bg-[#111111] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : "Show more"}
            </button>
          </div>
        )}

      </div>
    </main>
  );
};

export default Sustainability;
