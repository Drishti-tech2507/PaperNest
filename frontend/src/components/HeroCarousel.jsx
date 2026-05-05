import { motion } from "framer-motion";

const cards = [
  {
    title: "Books",
    subtitle: "Explore timeless stories",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
  {
    title: "Research",
    subtitle: "Discover innovation",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
  },
  {
    title: "Newspapers",
    subtitle: "Stay informed daily",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
  },
];

function HeroCarousel() {
  return (
    <div className="flex flex-wrap justify-center gap-8 mt-32 px-8">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: index * 0.3 }}
          whileHover={{ scale: 1.05 }}
          className="relative w-72 h-[430px] rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
            <h2 className="text-3xl font-bold">{card.title}</h2>
            <p className="text-lg text-gray-200">{card.subtitle}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default HeroCarousel;