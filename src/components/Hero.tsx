import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/lovable-uploads/622a370b-1c0e-4b3d-888e-595ccdf9852d.png",
  "/lovable-uploads/20897607-2105-4c87-931d-8debd8449d4d.png",
  "/lovable-uploads/28438f1e-c75e-44eb-980d-e440bf882ec5.png",
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000); // slower transition every 6s

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-[#f2e6d0] to-[#d1cbb1] overflow-hidden px-6 md:px-16 py-20"
    >
      {/* Left Text Content */}
      <div className="md:w-1/2 z-20 mt-20 max-w-lg text-center md:text-left ">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-extrabold tracking-tight text-[#3b2e0a] drop-shadow-lg"
        >
          RUH ESSENZA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-2xl text-[#574b0d] font-semibold"
        >
          Essence of the Soul
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 text-base text-[#5a5032cc] leading-relaxed"
        >
          Discover our exclusive range of non-alcoholic fragrances — crafted with passion and purity to elevate your soul.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="mt-8 flex justify-center md:justify-start"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#cbbf88] to-[#f3e7be] text-[#4a3f0c] font-semibold px-10 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={() =>
              document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Collection
          </Button>
        </motion.div>
      </div>

      {/* Right Image Slider */}
      <div className="md:w-1/2 relative w-full p-10 max-w-md h-[420px] mt-20 rounded-xl overflow-hidden ">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={images[currentImage]}
            alt={`Slide ${currentImage + 1}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="object-cover w-full h-full rounded-xl"
          />
        </AnimatePresence>

        {/* Overlay for subtle gradient */}
        <div className="absolute inset-0  rounded-xl pointer-events-none"></div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/971509027555"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 shadow-lg rounded-full p-3 flex items-center justify-center transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <img className="w-10" src="https://img.icons8.com/?size=100&id=16713&format=png&color=000000" alt="" />
      </a>
    </section>
  );
};

export default Hero;
