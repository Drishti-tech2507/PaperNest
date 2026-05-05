import { useEffect, useState } from "react";
import MainNavbar from "../components/MainNavbar";
import axios from "axios";

function Research() {
  const [papers, setPapers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("artificial intelligence");
  const [loading, setLoading] = useState(false);

  const fetchPapers = async (query = "artificial intelligence") => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://api.crossref.org/works?query=${encodeURIComponent(
          query
        )}&rows=12`
      );

      setPapers(response.data.message.items || []);
    } catch (error) {
      console.error("Error fetching papers:", error);
      alert("Failed to load research papers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert("Please enter a topic.");
      return;
    }

    fetchPapers(searchTerm);
  };

  const saveItem = (paper) => {
    const existing = JSON.parse(localStorage.getItem("savedItems")) || [];

    const newItem = {
      title: paper.title?.[0] || "Untitled Paper",
      type: "Research Paper",
    };

    const alreadySaved = existing.some(
      (item) => item.title === newItem.title
    );

    if (alreadySaved) {
      alert("Paper already saved!");
      return;
    }

    const updated = [...existing, newItem];

    localStorage.setItem("savedItems", JSON.stringify(updated));

    alert(`${newItem.title} saved to your library!`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNavbar />

      <div className="px-8 py-10">
        <h1 className="text-5xl font-bold mb-4">
          📄 Explore Real Research Papers
        </h1>

        <p className="text-gray-300 mb-8 max-w-3xl">
          Discover live academic papers from Crossref.
        </p>

        {/* Search */}
        <div className="flex gap-4 mb-10">
          <input
            type="text"
            placeholder="Search research papers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="flex-1 p-3 rounded-full bg-white/10 border border-white/20 outline-none text-white"
          />

          <button
            onClick={handleSearch}
            className="bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition"
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <p className="text-center text-xl">
            Loading research papers...
          </p>
        ) : papers.length === 0 ? (
          <p className="text-center text-gray-400">
            No papers found.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {papers.map((paper, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-3xl p-8 hover:scale-105 transition shadow-xl"
              >
                <h2 className="text-2xl font-bold">
                  {paper.title?.[0] || "Untitled Paper"}
                </h2>

                <p className="text-yellow-400 mt-2">
                  {paper.author
                    ?.map(
                      (author) =>
                        `${author.given || ""} ${author.family || ""}`
                    )
                    .join(", ") || "Unknown Author"}
                </p>

                <p className="text-gray-300 mt-4">
                  Published:{" "}
                  {paper.created?.["date-time"]
                    ? new Date(
                        paper.created["date-time"]
                      ).toDateString()
                    : "Unknown Date"}
                </p>

                <p className="text-gray-400 mt-3 line-clamp-3">
                  Publisher: {paper.publisher || "Unknown Publisher"}
                </p>

                <div className="flex gap-4 mt-6">
                  <a
                    href={paper.URL}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white text-black px-5 py-2 rounded-full font-semibold"
                  >
                    Read
                  </a>

                  <button
                    onClick={() => saveItem(paper)}
                    className="border border-yellow-400 text-yellow-400 px-5 py-2 rounded-full hover:bg-yellow-400 hover:text-black transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Research;