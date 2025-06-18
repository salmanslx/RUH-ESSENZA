import React, { useState } from "react";
import { CartProvider } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Cart from "@/components/Cart";
import Hero from "@/components/Hero";
import Rounds from "@/components/Rounds";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Combo from "@/components/ComboCollection";
import Test from "@/components/Testimonial";
import Footer from "@/components/Footer";



const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <Navbar onCartClick={openCart} />
        <Cart isOpen={cartOpen} onClose={closeCart} />
        <Hero />
        <Rounds />
        <Categories />
        <FeaturedProducts openCart={openCart} />
        <Combo openCart={openCart} />
        <Test />
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Index;
