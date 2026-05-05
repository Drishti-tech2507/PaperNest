import Navbar from "../components/Navbar";
import HeroCarousel from "../components/HeroCarousel";

function Splash() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10">
        <Navbar />

        <div className="text-center pt-32 px-4">
          <h2 className="text-xl uppercase tracking-[0.4em] text-gray-300">
            Read • Research • Rise
          </h2>

          <h1 className="text-6xl md:text-8xl font-extrabold mt-4">
            Explore Worlds Beyond Pages
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Books, Research Papers, and Newspapers — all in one intelligent ecosystem.
          </p>
        </div>

        <HeroCarousel />
      </div>
    </div>
  );
}

export default Splash;