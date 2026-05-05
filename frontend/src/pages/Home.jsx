import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Chatbot from "../components/Chatbot";
function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const featuredContent = [
    {
      title: "Atomic Habits",
      type: "Book",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    },
    {
      title: "AI Revolution 2026",
      type: "Research Paper",
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    },
    {
      title: "Global Daily Times",
      type: "Newspaper",
      image:
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex flex-wrap justify-between items-center px-8 py-6 border-b border-white/10">
        <h1 className="text-3xl font-bold tracking-wide">PaperNest</h1>

        <ul className="flex gap-6 text-lg">
          <Link to="/books">
            <li className="hover:text-yellow-400 cursor-pointer">Books</li>
          </Link>

          <Link to="/research">
            <li className="hover:text-yellow-400 cursor-pointer">
              Research Papers
            </li>
          </Link>

          <Link to="/newspapers">
            <li className="hover:text-yellow-400 cursor-pointer">
              Newspapers
            </li>
          </Link>

          <Link to="/saved">
            <li className="hover:text-yellow-400 cursor-pointer">Saved</li>
          </Link>
        </ul>

        <div className="flex gap-4">
          <Link to="/profile">
            <button className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition">
              Profile
            </button>
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="border border-red-400 text-red-400 px-5 py-2 rounded-full hover:bg-red-400 hover:text-black transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Welcome */}
      <section className="text-center py-14 px-4">
        <h2 className="text-xl uppercase tracking-[0.3em] text-gray-400">
          Welcome Back
        </h2>

        <h1 className="text-5xl md:text-7xl font-extrabold mt-4">
          Your Knowledge Nest Awaits
        </h1>

        <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
          Explore books, discover groundbreaking research, and stay updated with
          the latest news.
        </p>

        <div className="mt-8 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search books, papers, newspapers..."
            className="w-full p-4 rounded-full bg-white/10 border border-white/20 outline-none text-white placeholder-gray-400"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="grid md:grid-cols-3 gap-8 px-8 py-10">
        <Link to="/books">
          <div className="bg-white/10 rounded-3xl p-8 hover:scale-105 transition shadow-xl cursor-pointer">
            <h3 className="text-3xl font-bold">📚 Books</h3>
            <p className="text-gray-300 mt-4">
              Read bestselling books, classics, and educational resources.
            </p>
          </div>
        </Link>

        <Link to="/research">
          <div className="bg-white/10 rounded-3xl p-8 hover:scale-105 transition shadow-xl cursor-pointer">
            <h3 className="text-3xl font-bold">📄 Research Papers</h3>
            <p className="text-gray-300 mt-4">
              Access academic journals and cutting-edge innovation.
            </p>
          </div>
        </Link>

        <Link to="/newspapers">
          <div className="bg-white/10 rounded-3xl p-8 hover:scale-105 transition shadow-xl cursor-pointer">
            <h3 className="text-3xl font-bold">📰 Newspapers</h3>
            <p className="text-gray-300 mt-4">
              Stay informed with trusted daily publications.
            </p>
          </div>
        </Link>
      </section>

      {/* New Releases */}
      <section className="px-8 py-14">
        <h2 className="text-4xl font-bold mb-8">🔥 New Releases</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredContent.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 rounded-3xl overflow-hidden hover:scale-105 transition shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-72 object-cover"
              />

              <div className="p-6">
                <p className="text-yellow-400 uppercase text-sm">
                  {item.type}
                </p>
                <h3 className="text-2xl font-bold mt-2">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Continue Reading */}
      <section className="px-8 pb-20">
        <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-3xl p-10">
          <h2 className="text-4xl font-bold">📖 Continue Reading</h2>

          <p className="text-gray-300 mt-4">
            Resume your last journey from where you left off.
          </p>

          <div className="mt-6">
            <p className="font-semibold">Current Book: Deep Work</p>

            <div className="w-full bg-white/10 rounded-full h-3 mt-3">
              <div className="bg-yellow-400 h-3 rounded-full w-1/2"></div>
            </div>

            <p className="text-sm mt-2 text-gray-400">
              150 / 300 pages
            </p>
          </div>
        </div>
      </section>

{/* 🔥 CHATBOT HERE (ONLY HOME PAGE) */}
<Chatbot />

</div>
);
}

export default Home;