import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules'; // Removed Navigation

const testimonials = [
  {
    id: 1,
    name: "Aisha Rahman",
    role: "Luxury Perfume Buyer",
    quote:
      "Ruhi's fragrances are simply magical. The Royal Promise made me feel like royalty. I can’t stop recommending it to my friends!",
    avatar: "/lovable-uploads/test1.jpg",
  },
  {
    id: 2,
    name: "Fahad Karim",
    role: "Entrepreneur",
    quote:
      "Mystical Garden is my go-to scent. Elegant, long-lasting, and so unique. I finally found a fragrance that feels like *me*.",
    avatar: "/lovable-uploads/test2.jpg",
  },
  {
    id: 3,
    name: "Sana Ibrahim",
    role: "Fashion Blogger",
    quote:
      "From packaging to scent, everything about Ruhi perfumes is premium. The combo packs are such a great deal too!",
    avatar: "/lovable-uploads/test3.jpg",
  },
  {
    id: 4,
    name: "Zara Ali",
    role: "Influencer",
    quote:
      "Mystical Garden is my go-to scent. Elegant, long-lasting, and so unique. I finally found a fragrance that feels like *me*.",
    avatar: "/lovable-uploads/test2.jpg",
  },
  {
    id: 5,
    name: "Omar Sheikh",
    role: "Photographer",
    quote:
      "From packaging to scent, everything about Ruhi perfumes is premium. The combo packs are such a great deal too!",
    avatar: "/lovable-uploads/test1.jpg",
  },
];

const Testimonial = () => {
  return (
    <section
      id="testimonials"
      className="bg-gradient-to-r from-[#f2e6d0] to-[#d1cbb1] py-20 px-4 text-center"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl text-[#3b2e0a] font-extrabold mb-6">
          What Our Customers Say
        </h2>
        <p className="text-black max-w-xl mx-auto mb-12 italic">
          Hear from our happy customers who have experienced the magic of Ruhi perfumes
        </p>

        <Swiper
          modules={[Pagination, Autoplay]} // No Navigation here
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={`${t.id}-${index}`}>
              <div className="bg-white-100 rounded-2xl shadow-md p-6 text-left border border-black/10 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border border-black/20"
                  />
                  <div>
                    <h4 className="font-semibold text-black">{t.name}</h4>
                    <span className="text-sm text-black/50">{t.role}</span>
                  </div>
                </div>
                <p className="text-black/80 text-sm leading-relaxed">
                  “{t.quote}”
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
     