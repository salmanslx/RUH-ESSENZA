import { motion } from "framer-motion";

const Categories = () => {
  return (
    <section
      id="about"
      className="py-24 px-6 bg-gradient-to-r from-[#f2e6d0] to-[#d1cbb1] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl text-[#3b2e0a] font-extrabold  mb-3 tracking-wide">
            About Ruh Essenza
          </h2>
          <p className="text-xl text-black max-w-2xl mx-auto italic">
            Essence of the soul
          </p>
        </div>

        {/* Content Row */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16 px-4 text-right md:text-right">
          {/* Image Section - Animate Right to Left */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 rounded-xl shadow-2xl overflow-hidden hover:scale-105 transform transition-transform duration-500 cursor-pointer"
          >
            <img
              src="/lovable-uploads/aboutus.jpeg"
              alt="About Ruh Essenza"
              className="w-full h-auto object-cover"
              loading="lazy"
              draggable={false}
            />
          </motion.div>

          {/* Text Section - Animate Left to Right */}
          <motion.div
            initial={{ opacity: 0, x: -80, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full md:w-1/2  text-gray-900 text-lg leading-relaxed"
          >
            <p className="mb-6 text-start">
              Ruh Essenza is more than just a fragrance; it’s a feeling.
              Crafted with care, our perfumes are water-based and free from alcohol,
              making them gentle on your skin and kind to your senses.
              Inspired by nature and the purity of water, Ruh Essenza captures the essence
              of scent in its most authentic form. Each mist offers a moment of calm, and
              each note carries a whisper of elegance.
            </p>
            <p className="mb-6 text-start">
              With no harsh chemicals and no irritation, just lasting freshness,
              Ruh Essenza is your everyday luxury for a conscious, modern lifestyle.
            </p>
            <p className="font-semibold text-black text-xl text-start">
              Ruh Essenza — the essence of purity, bottled.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Optional subtle decorative shapes */}
      <div
        className="absolute top-10 left-10 w-24 h-24 rounded-full bg-amber-300 opacity-20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-amber-400 opacity-15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
};

export default Categories;
