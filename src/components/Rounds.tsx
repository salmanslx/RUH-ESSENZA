
const Rounds = () => {
  const sustainabilityFeatures = [
    { imgSrc: "/lovable-uploads/01.png", label: "100% FRESH" },
    { imgSrc: "/lovable-uploads/02.png", label: "100% ALCOHOL FREE" },
    { imgSrc: "/lovable-uploads/03.png", label: "PREMIUM FRAGRANCE" },
    { imgSrc: "/lovable-uploads/04.png", label: "LONG LASTING" },
    { imgSrc: "/lovable-uploads/05.png", label: "QUALITY ASSURANCE" },
    { imgSrc: "/lovable-uploads/06.png", label: "REUSING" },
    { imgSrc: "/lovable-uploads/07.png", label: "RECYCLING PACKAGE" },
    { imgSrc: "/lovable-uploads/08.png", label: "FREE DELIVERY" },
  ];


  return (
    <section className="bg-gradient-to-r from-[#f2e6d0] to-[#d1cbb1]">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4  max-w-6xl mx-auto">
              {sustainabilityFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-10  rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-17 h-17 rounded-full bg-gradient-to-r from-[#D5CFB3] to-[#E5E0C9] flex items-center justify-center">
                    <img src={feature.imgSrc} alt={feature.label} className="w-40" />
                  </div>
                  <p className="text-sm text-black text-center font-medium leading-tight">
                    {feature.label}
                  </p>
                </div>
              ))}
            </div>
            </section>
  );
};

export default Rounds;