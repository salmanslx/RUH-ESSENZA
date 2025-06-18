import { useState } from "react";
import ProductModal from "./ProductModal";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface FeaturedProductsProps {
  openCart: () => void;
}

const FeaturedProducts = ({ openCart }: FeaturedProductsProps) => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = [
    {
      id: "1",
      name: "Ruhi - Essence of Soul",
      basePrice: 145,
      baseOriginalPrice: 190,
      image: "/lovable-uploads/28438f1e-c75e-44eb-980d-e440bf882ec5.png",
      category: "Signature Collection",
      description:
        "A captivating blend of oriental spices and woody notes that captures the essence of your soul with every spray.",
      variations: [
        { size: "50ml", price: 145, originalPrice: 190 },
        { size: "100ml", price: 265, originalPrice: 350 },
      ],
    },
    {
      id: "2",
      name: "Ruhi - Mystical Garden",
      basePrice: 155,
      baseOriginalPrice: 210,
      image: "/lovable-uploads/20897607-2105-4c87-931d-8debd8449d4d.png",
      category: "Oriental Essences",
      description:
        "Fresh florals meet deep black in this enchanting fragrance that transports you to a mystical garden.",
      variations: [
        { size: "50ml", price: 155, originalPrice: 210 },
        { size: "100ml", price: 285, originalPrice: 380 },
      ],
    },
    {
      id: "3",
      name: "Ruhi - Golden Sands",
      basePrice: 125,
      baseOriginalPrice: 165,
      image: "/lovable-uploads/34bad979-9feb-46bf-a728-e5fe25f5a520.png",
      category: "Modern Classics",
      description:
        "Warm desert winds carry notes of sandalwood and rose, creating an unforgettable golden experience.",
      variations: [
        { size: "50ml", price: 125, originalPrice: 165 },
        { size: "100ml", price: 225, originalPrice: 295 },
      ],
    },
    {
      id: "4",
      name: "Ruhi - Royal Promise",
      basePrice: 225,
      baseOriginalPrice: 285,
      image: "/lovable-uploads/2d4f454c-ace8-4724-885a-27c72eb2af3a.png",
      category: "Limited Edition",
      description:
        "An opulent fragrance with rare oud and precious florals that makes a royal promise of luxury.",
      variations: [
        { size: "50ml", price: 225, originalPrice: 285 },
        { size: "100ml", price: 395, originalPrice: 495 },
      ],
    },
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();

    // Define blocked sizes per product ID (same logic as ProductModal)
    const blockedSizes =
      product.id === "1" || product.id === "2"
        ? ["50ml"]
        : product.id === "3" || product.id === "4"
        ? ["100ml"]
        : [];

    // Filter valid variations (exclude blocked sizes)
    const validVariations = product.variations.filter(
      (v) => !blockedSizes.includes(v.size.toLowerCase())
    );

    if (validVariations.length === 0) {
      toast.error("No available size variations for this product.");
      return;
    }

    // Pick the first valid variation
    const selectedVariation = validVariations[0];

    addToCart({
      id: `${product.id}-${selectedVariation.size}`,
      name: `${product.name} - ${selectedVariation.size}`,
      price: selectedVariation.price,
      image: product.image,
      category: product.category,
      // quantity: 1,
    });

    openCart();
  };

  return (
    <>
      <section
        id="products"
        className="py-16 px-4 bg-gradient-to-r from-[#f2e6d0] to-[#d1cbb1]"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16 px-2">
            <h2 className="text-4xl md:text-5xl text-[#3b2e0a] font-extrabold sm:text-4xl md:text-5xl font-bold mb-4">
              Featured Collection
            </h2>
            <p className="text-xl sm:text-lg text-black max-w-xl mx-auto italic">
              Discover our most beloved fragrances, crafted with the finest ingredients
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="group relative bg-[#D5CFB3] rounded-2xl overflow-hidden border border-black/30 hover:border-black/60 transition-all duration-500 hover:scale-[1.03] cursor-pointer shadow-md flex flex-col"
                style={{ animationDelay: `${index * 0.1}s`, maxHeight: "440px" }}
                onClick={() => handleProductClick(product)}
              >
                <div
                  className="relative overflow-hidden bg-slate-800 flex-shrink-0"
                  style={{ height: "200px" }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <button
                    className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 bg-white hover:bg-back hover:text-black text-black text-xs font-semibold px-4 py-1.5 rounded-full opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-500 ease-in-out z-10"
                    type="button"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add to Cart
                  </button>
                </div>

                <div className="p-5 text-black flex flex-col flex-grow">
                  <span className="text-sm text-black/60 font-medium mb-1 truncate">
                    {product.category}
                  </span>

                  <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-black/80 transition-colors truncate">
                    {product.name}
                  </h3>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-black/80 mt-auto">
                    <span className="font-semibold flex items-center gap-1">
                      From{" "}
                      <img
                        src="/lovable-uploads/dlogo.png"
                        alt="currency"
                        className="w-5 h-5 inline-block"
                      />{" "}
                      {product.basePrice}
                    </span>
                    <span className="line-through text-red-600 flex items-center gap-1">
                      <img
                        src="/lovable-uploads/dlogo.png"
                        alt="currency"
                        className="w-5 h-5 inline-block"
                      />{" "}
                      {product.baseOriginalPrice}
                    </span>
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-white text-slate-900 text-xs px-3 py-1 rounded-full font-semibold shadow-sm select-none">
                  {Math.round(
                    ((product.baseOriginalPrice - product.basePrice) /
                      product.baseOriginalPrice) *
                      100
                  )}
                  % OFF
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default FeaturedProducts;
