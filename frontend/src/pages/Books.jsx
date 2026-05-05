import { useEffect, useState } from "react";
import MainNavbar from "../components/MainNavbar";

function Books() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("harry potter"); // better default
  const [loading, setLoading] = useState(false);

  // 🔑 your API key (restrict it in GCP)
  const API_KEY = "AIzaSyA3WHI5p0rP-8O6r8LGL0vjCNSz529rbrc";

  // 🔍 FETCH BOOKS (REAL DATA + FALLBACK)
  const fetchBooks = async (query = "harry potter") => {
    try {
      setLoading(true);

      // primary request
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&maxResults=12&printType=books&key=${API_KEY}`
      );

      const data = await res.json();
      console.log("Books API:", data);

      // if primary has results
      if (data?.items && data.items.length > 0) {
        setBooks(data.items);
      } else {
        // 🔁 fallback query (still REAL API)
        const fallbackRes = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=12&printType=books&key=${API_KEY}`
        );
        const fallbackData = await fallbackRes.json();
        console.warn("Fallback API:", fallbackData);
        setBooks(fallbackData.items || []);
      }
    } catch (err) {
      console.error("FETCH ERROR:", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 💾 SAVE (localStorage)
  const saveItem = (book) => {
    const existing =
      JSON.parse(localStorage.getItem("savedItems")) || [];

    const newItem = {
      title: book?.volumeInfo?.title || "Untitled",
      type: "Book",
      image:
        book?.volumeInfo?.imageLinks?.thumbnail ||
        "https://via.placeholder.com/150",
    };

    const alreadySaved = existing.some(
      (item) => item.title === newItem.title
    );

    if (alreadySaved) {
      alert("Already saved!");
      return;
    }

    const updated = [...existing, newItem];
    localStorage.setItem("savedItems", JSON.stringify(updated));

    alert("Saved successfully ❤️");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNavbar />

      <div className="px-8 py-10">
        <h1 className="text-5xl font-bold mb-4">
          📚 Explore Real Books
        </h1>

        {/* SEARCH */}
        <div className="flex gap-4 mb-10">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchBooks(searchTerm);
            }}
            className="flex-1 p-3 rounded-full bg-white/10 border border-white/20 outline-none"
          />

          <button
            onClick={() => fetchBooks(searchTerm)}
            className="bg-white text-black px-6 py-3 rounded-full font-bold"
          >
            Search
          </button>
        </div>

        {/* LOADING */}
        {loading ? (
          <p className="text-center text-xl">Loading...</p>
        ) : books.length === 0 ? (
          <p className="text-center text-gray-400">
            No books found
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {books.map((book, i) => {
              const info = book.volumeInfo || {};

              return (
                <div
                  key={i}
                  className="bg-white/10 p-6 rounded-3xl hover:scale-105 transition"
                >
                  <img
                    src={
                      info.imageLinks?.thumbnail ||
                      "https://via.placeholder.com/150"
                    }
                    alt={info.title || "Book"}
                    className="w-full h-64 object-cover rounded-2xl"
                  />

                  <h2 className="text-xl font-bold mt-4">
                    {info.title || "No Title"}
                  </h2>

                  <p className="text-gray-400 text-sm mt-1">
                    {info.authors?.join(", ") ||
                      "Unknown Author"}
                  </p>

                  <p className="text-gray-300 text-sm mt-2 line-clamp-3">
                    {info.description ||
                      "No description available."}
                  </p>

                  <div className="flex gap-2 mt-4 flex-wrap">
                    {/* READ */}
                    {info.previewLink && (
                      <a
                        href={info.previewLink}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-white text-black px-3 py-1 rounded"
                      >
                        Read
                      </a>
                    )}

                    {/* SAVE */}
                    <button
                      onClick={() => saveItem(book)}
                      className="border border-yellow-400 px-3 py-1 rounded"
                    >
                      Save
                    </button>

                    {/* BUY OPTIONS */}
                    <a
                      href={`https://www.amazon.in/s?k=${encodeURIComponent(
                        info.title || ""
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-green-500 px-3 py-1 rounded"
                    >
                      Amazon
                    </a>

                    <a
                      href={`https://www.flipkart.com/search?q=${encodeURIComponent(
                        info.title || ""
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-500 px-3 py-1 rounded"
                    >
                      Flipkart
                    </a>

                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(
                        info.title || ""
                      )}+book+price`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-gray-500 px-3 py-1 rounded"
                    >
                      Compare
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Books;