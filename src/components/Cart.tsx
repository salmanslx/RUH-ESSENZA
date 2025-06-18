import { useState, useEffect } from "react";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import CheckoutForm from "./CheckoutForm";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  // Countdown logic to next 5 PM cutoff
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      let cutoff = new Date();
      cutoff.setHours(17, 0, 0, 0); // 5 PM today

      if (now >= cutoff) {
        cutoff.setDate(cutoff.getDate() + 1); // Set to 5 PM tomorrow
      }

      const distance = cutoff.getTime() - now.getTime();

      if (distance <= 0) {
        setTimeLeft("Offer ended");
      } else {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Delivery date range logic
  const getDeliveryDates = () => {
    const now = new Date();
    const cutoff = new Date();
    cutoff.setHours(17, 0, 0, 0); // 5 PM today

    let startDate: Date;
    let endDate: Date;

    if (now < cutoff) {
      // Before 5 PM: tomorrow or day after tomorrow
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() + 1);

      endDate = new Date(now);
      endDate.setDate(endDate.getDate() + 2);
    } else {
      // After 5 PM: day after tomorrow or two days later
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() + 2);

      endDate = new Date(now);
      endDate.setDate(endDate.getDate() + 3);
    }

    const formatDate = (date: Date) =>
      date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });

    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (items.length === 0) return;
    setShowCheckout(true);
  };

  const handleBackToCart = () => {
    setShowCheckout(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#f0e9d6] shadow-2xl border-l border-[#58503D]/30">
        {!showCheckout ? (
          <>
            <div className="flex items-center justify-between p-6 border-b border-[#58503D]/30">
              <h2 className="text-2xl font-bold text-black flex items-center">
                <ShoppingCart className="mr-2" />
                Shopping Cart
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-black hover:text-[#D5CFB3]"
                aria-label="Close cart"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Delivery Estimate Section */}
            <div className="px-6 pt-2 text-sm text-black">
              <p>
                Order in <span className="text-[#a96c32] font-semibold">{timeLeft}</span>
              </p>
              <p className="text-sm mt-1">
                Get it delivered by{" "}
                <span className="font-bold text-[#1f1f1f]">{getDeliveryDates()}</span>
              </p>
              {timeLeft === "Offer ended" && (
                <p className="text-red-500 text-sm mt-2">The limited-time offer has ended.</p>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart className="h-16 w-16 text-black mx-auto mb-4" />
                  <p className="text-black text-lg">Your cart is empty</p>
                  <p className="text-black text-sm mt-2">
                    Add some beautiful fragrances to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#4B4533]/70 rounded-lg p-4 border border-[#58503D]/20"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-white font-medium text-sm">{item.name}</h3>
                          <p className="text-white font-semibold flex items-center gap-1">
                            <img
                              src="/lovable-uploads/dlogo.png"
                              alt="currency"
                              className="w-5 h-5 inline-block"
                            />
                            {item.price}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 text-white hover:text-[#FFF]"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-white font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 text-white hover:text-[#FFF]"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="h-8 w-8 text-red-500 hover:text-red"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-[#58503D]/30 p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-semibold text-black">Total:</span>
                  <span className="text-2xl font-bold text-black flex items-center gap-1">
                    <img
                      src="/lovable-uploads/dlogo.png"
                      alt="currency"
                      className="w-6 h-6 inline-block"
                    />
                    {getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-[#3E392A] via-[#4B4533] to-[#58503D] hover:from-[#58503D] hover:via-[#4B4533] hover:to-[#3E392A] text-white font-semibold py-3 rounded-full transform hover:scale-105 transition-all duration-300"
                  aria-label="Proceed to checkout"
                >
                  Proceed to Checkout
                </Button>
                <Button
                  onClick={onClose}
                  className="w-full bg-black text-white font-semibold py-3 rounded-full transform hover:scale-105 transition-all duration-300 mt-5"
                  aria-label="Continue shopping"
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </>
        ) : (
          <CheckoutForm onBack={handleBackToCart} onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default Cart;
