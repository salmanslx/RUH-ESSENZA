import { useState } from "react";
import ProductModal from "./ProductModal";
import { useCart } from "@/contexts/CartContext";

interface ComboCollectionProps {
  openCart: () => void;
}

const ComboCollection = ({ openCart }: ComboCollectionProps) => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const comboProducts = [
    {
      id: "c1",
      name: "Ruhi Duo – Soul & Garden",
      basePrice: 249,
      baseOriginalPrice: 340,
      image: "/lovable-uploads/28438f1e-c75e-44eb-980d-e440bf882ec5.png",
      category: "Combo Offer",
      description:
        "A perfect pairing of two enchanting fragrances: Essence of Soul & Mystical Garden.",
      variations: [{ size: "2x50ml", price: 249, originalPrice: 340 }],
    },
    {
      id: "c2",
      name: "Desert Royal Combo",
      basePrice: 295,
      baseOriginalPrice: 400,
      image: "/lovable-uploads/20897607-2105-4c87-931d-8debd8449d4d.png",
      category: "Combo Offer",
      description: "Golden Sands & Royal Promise in one majestic combo.",
      variations: [{ size: "2x50ml", price: 295, originalPrice: 400 }],
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
    addToCart({
      id: product.id,
      name: product.name,
      price: product.basePrice,
      image: product.image,
      category: product.category,
    });
    openCart();
  };

  return (
    <>
      <section
        id="combo"
        className="py-12 px-4 w-full bg-gradient-to-r from-[#f2e6d0] to-[#d1cbb1]"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 px-2 sm:px-4">
            <h2 className="text-4xl md:text-5xl text-[#3b2e0a] font-extrabold sm:text-3xl md:text-4xl font-bold mb-2">
              Combo Collection
            </h2>
            <p className="text-xl sm:text-lg text-black max-w-xl mx-auto italic">
              Enjoy exclusive savings with our specially curated perfume duos
            </p>
          </div>

          <div className="flex flex-col-2 gap-3 ">
            {comboProducts.map((product) => (
              <div
                key={product.id}
                className="max-w-2xl mx-auto w-full bg-white-100 border border-black/20 shadow-xl rounded-xl flex flex-col lg:flex-row overflow-hidden hover:shadow-2xl transition cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div
                  className="relative w-full h-48 sm:h-56 lg:w-64 lg:h-auto flex-shrink-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${product.image})` }}
                  title={product.name}
                >
                  <div className="absolute top-2 left-2 bg-white text-xs px-3 py-1 rounded-full font-bold text-black select-none">
                    {Math.round(
                      ((product.baseOriginalPrice - product.basePrice) /
                        product.baseOriginalPrice) *
                        100
                    )}
                    % OFF
                  </div>
                </div>

                <div className="p-4 sm:p-6 flex flex-col justify-between leading-normal flex-1">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 uppercase font-semibold mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-700 text-sm mb-4">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 mb-4">
                    <span className="flex items-center gap-1 font-semibold text-gray-800 text-base sm:text-lg">
                      <img
                        src="/lovable-uploads/dlogo.png"
                        className="w-5 h-5"
                        alt="currency"
                      />
                      {product.basePrice}
                    </span>
                    <span className="line-through text-red-500 text-xs sm:text-sm flex items-center gap-1">
                      <img
                        src="/lovable-uploads/dlogo.png"
                        className="w-4 h-4 inline-block"
                        alt="currency"
                      />
                      {product.baseOriginalPrice}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      className="flex-1 bg-black text-white text-sm py-2 rounded hover:bg-gray-900 transition"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="flex-1 border border-black text-black text-sm py-2 rounded hover:bg-black hover:text-white transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product);
                      }}
                    >
                      View Details
                    </button>
                  </div>
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

export default ComboCollection;
