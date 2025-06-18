  import { useState, useRef, useEffect } from "react";
  import { Menu, X, ShoppingCart } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { useCart } from "@/contexts/CartContext";

  interface NavbarProps {
    onCartClick: () => void;
  }

  const Navbar = ({ onCartClick }: NavbarProps) => {
    const { getTotalItems } = useCart();
    const totalItems = getTotalItems();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    useEffect(() => {
      if (showSearch) {
        setTimeout(() => searchRef.current?.focus(), 100);
      }
    }, [showSearch]);

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Helper for text color + bold class
    const textColorClass = scrolled
      ? "text-white font-semibold"
      : "text-black font-semibold hover:text-amber-700";

    return (
      <>
        <nav
          className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
            scrolled
              ? "bg-black border-b border-amber-500/20"
              : "bg-gradient-to-r from-[#f2e6d0] to-[#d1cbb1] border-b border-amber-500/20"
          } backdrop-blur-md`}
        >
          <div className="container mx-auto px-4 py-4 flex items-center justify-center">
            {/* Left Nav Links (desktop only) */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#home" className={`transition-colors ${textColorClass}`}>
                Home
              </a>

              <a href="#products" className={`transition-colors ${textColorClass}`}>
                Collections
              </a>
            </div>

            {/* Logo */}
            <div className="mx-2 p-5">
              <img
                src="/lovable-uploads/8bc88281-ee6b-4640-bceb-57661193a427.png"
                alt="Ruh Essenza"
                className="w-[70px] h-auto"
              />
            </div>

            {/* Right Nav Links (desktop only) */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#about" className={`transition-colors ${textColorClass}`}>
                About
              </a>
              <a href="#footer" className={`transition-colors ${textColorClass}`}>
                Contact
              </a>
            </div>

            {/* Cart Icon (always visible) */}
            {/* Use onCartClick directly */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onCartClick}
              className={`relative ml-4 hover:bg-amber-500/10 ${
                scrolled ? "text-white" : "text-black"
              } font-bold`}
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-100 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* Mobile menu toggle */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className={`${scrolled ? "text-white" : "text-black"} font-bold`}
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Optional search bar */}
          {showSearch && (
            <div className="px-6 pb-4">
              <input
                ref={searchRef}
                type="text"
                placeholder="Search..."
                className="w-full md:w-1/2 border border-white/20 text-black placeholder-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
              />
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed top-[138px] left-0 right-0 bg-black/90 backdrop-blur-md px-6 py-5 space-y-4 z-40 border-b border-amber-500/20">
            {["Home", "Products", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`block text-lg transition-colors font-bold ${
                  scrolled ? "text-white" : "text-black hover:text-amber-700"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </>
    );
  };

  export default Navbar;
