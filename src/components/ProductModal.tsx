import { useState } from "react";
import { X, Minus, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductVariation {
  size: string;
  price: number;
  originalPrice: number;
}

interface ProductModalProps {
  product: {
    id: string;
    name: string;
    basePrice: number;
    baseOriginalPrice: number;
    image: string;
    category: string;
    description: string;
    variations: ProductVariation[];
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const { addToCart, openCart } = useCart();

  // Define blocked sizes per product ID
  const blockedSizes =
    product.id === "1" || product.id === "2"
      ? ["50ml"]
      : product.id === "3" || product.id === "4"
      ? ["100ml"]
      : [];

  const validVariations = product.variations.filter(
    (v) => !blockedSizes.includes(v.size.toLowerCase())
  );

  const [selectedVariation, setSelectedVariation] = useState(validVariations[0]);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    const productWithVariation = {
      id: `${product.id}-${selectedVariation.size}`,
      name: `${product.name} - ${selectedVariation.size}`,
      price: selectedVariation.price,
      image: product.image,
      category: product.category,
      quantity,
    };

    addToCart(productWithVariation);
    toast.success(`${productWithVariation.name} (${quantity}x) added to cart!`);

    onClose();
    openCart();
  };

  const discount = Math.round(
    ((selectedVariation.originalPrice - selectedVariation.price) / selectedVariation.originalPrice) * 100
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gradient-to-r from-[#f2e6d0] to-[#d1cbb1] rounded-2xl w-full max-w-md md:max-w-4xl overflow-hidden relative border border-amber-500/20 flex flex-col md:flex-row max-h-[90vh]">
        {/* Left - Product Image */}
        <div className="w-full md:w-1/2 h-48 md:h-auto flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
          />
        </div>

        {/* Right - Content */}
        <div className="w-full md:w-1/2 p-4 md:p-6 relative flex flex-col">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-3 right-3 text-amber-100 hover:text-amber-400 z-10"
          >
            <X className="h-6 w-6" />
          </Button>

          <h2 className="text-2xl font-bold text-black mb-1">{product.name}</h2>
          <p className="text-grey text-sm mb-2">{product.category}</p>

          {/* Rating */}
          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-2 text-black text-sm">1 reviews |</span>
            <span className="ml-2 text-black text-sm">
              <a href="#">Write a review</a>
            </span>
          </div>

          <p className="text-black text-sm mb-4 leading-relaxed flex-grow overflow-auto">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-3xl font-bold text-black">
              <img src="/lovable-uploads/dlogo.png" alt="currency" className="w-6 h-6 inline-block" />
              {selectedVariation.price}
            </span>
            <span className="text-lg text-black line-through">
              <img src="/lovable-uploads/dlogo.png" alt="currency" className="w-6 h-6 inline-block" />
              {selectedVariation.originalPrice}
            </span>
            <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              {discount}% OFF
            </span>
          </div>

          {/* Size Selection */}
          <div className="mb-4">
            <h3 className="text-black font-medium mb-2">Available in</h3>
            <div className="flex flex-wrap gap-2">
              {product.variations.map((variation) => {
                const isBlocked = blockedSizes.includes(variation.size.toLowerCase());
                const isSelected = selectedVariation.size === variation.size;

                return (
                  <button
                    key={variation.size}
                    onClick={() => {
                      if (!isBlocked) setSelectedVariation(variation);
                    }}
                    disabled={isBlocked}
                    className={`relative px-4 py-2 rounded-full border transition-all duration-300 text-sm
                      ${isBlocked
                        ? "border-gray-300 text-gray-400 cursor-not-allowed bg-gray-100"
                        : isSelected
                        ? " bg-amber-400/20 text-black"
                        : " hover:border-black text-black"
                      }
                    `}
                  >
                    {variation.size}
                    {isBlocked && (
                      <span className="absolute inset-0 w-full h-full pointer-events-none">
                        <svg
                          viewBox="0 0 100 100"
                          className="absolute top-0 left-0 w-full h-full text-gray-400 opacity-50"
                        >
                          <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="4" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 bg-black rounded-full p-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-10 w-10 rounded-full text-amber-200 hover:text-amber-400"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-amber-100 font-medium w-12 text-center text-lg">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="h-10 w-10 rounded-full text-amber-200 hover:text-amber-400"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            className="w-full bg-white hover:bg-amber-600 text-black font-semibold py-4 rounded-full transform hover:scale-105 transition-all duration-300 text-lg"
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
