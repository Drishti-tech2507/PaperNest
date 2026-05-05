import { useEffect, useState } from "react";
import MainNavbar from "../components/MainNavbar";
import axios from "axios";

function Newspapers() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("technology");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const fetchNews = async (query = "technology") => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=12&apiKey=${API_KEY}`
      );

      setArticles(response.data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const saveItem = (article) => {
    const existing = JSON.parse(localStorage.getItem("savedItems")) || [];

    const newItem = {
      title: article.title,
      type: "Newspaper",
    };

    const alreadySaved = existing.some(
      (item) => item.title === newItem.title
    );

    if (alreadySaved) {
      alert("Article already saved!");
      return;
    }

    const updated = [...existing, newItem];

    localStorage.setItem("savedItems", JSON.stringify(updated));

    alert(`${article.title} saved to your library!`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNavbar />

      <div className="px-8 py-10">
        <h1 className="text-5xl font-bold mb-4">
          📰 Live Newspapers & News
        </h1>

        <p className="text-gray-300 mb-8 max-w-3xl">
          Stay updated with real-time global headlines.
        </p>

        {/* Search */}
        <div className="flex gap-4 mb-10">
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 rounded-full bg-white/10 border border-white/20 outline-none"
          />

          <button
            onClick={() => fetchNews(searchTerm)}
            className="bg-white text-black px-6 py-3 rounded-full font-bold"
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <p className="text-center text-xl">Loading news...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-3xl overflow-hidden hover:scale-105 transition shadow-xl"
              >
                <img
                  src={
                    article.urlToImage ||
                    "https://via.placeholder.com/300"
                  }
                  alt={article.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">
                  <p className="text-yellow-400 uppercase text-sm">
                    {article.source?.name}
                  </p>

                  <h2 className="text-2xl font-bold mt-2 line-clamp-3">
                    {article.title}
                  </h2>

                  <p className="text-gray-300 mt-3 line-clamp-4">
                    {article.description ||
                      "No description available."}
                  </p>

                  <div className="flex gap-3 mt-6">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white text-black px-4 py-2 rounded-full font-semibold"
                    >
                      Read
                    </a>

                    <button
                      onClick={() => saveItem(article)}
                      className="border border-yellow-400 text-yellow-400 px-4 py-2 rounded-full hover:bg-yellow-400 hover:text-black transition"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Newspapers;