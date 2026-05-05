import { useEffect, useState } from "react";
import MainNavbar from "../components/MainNavbar";

function Saved() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("savedItems")) || [];
    setItems(saved);
  }, []);

  // ✅ REMOVE FUNCTION (ADDED)
  const removeItem = (title) => {
    if (!window.confirm("Remove this item?")) return;

    const existing =
      JSON.parse(localStorage.getItem("savedItems")) || [];

    const updated = existing.filter(
      (item) => item.title !== title
    );

    localStorage.setItem("savedItems", JSON.stringify(updated));

    setItems(updated); // instant UI update
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNavbar />

      <div className="px-8 py-10">
        <h1 className="text-4xl font-bold mb-8">
          ❤️ Saved Library
        </h1>

        {items.length === 0 ? (
          <p className="text-gray-400">No saved items yet</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <div
                key={i}
                className="bg-white/10 p-4 rounded-2xl relative hover:scale-105 transition"
              >
                {/* ❌ REMOVE BUTTON */}
                <button
                  onClick={() => removeItem(item.title)}
                  className="absolute top-2 right-2 bg-red-500 w-7 h-7 rounded-full text-sm flex items-center justify-center hover:scale-110"
                >
                  ✕
                </button>

                <img
                  src={item.image}
                  className="w-full h-48 object-cover rounded-xl"
                />

                <h2 className="text-xl mt-3 font-bold">
                  {item.title}
                </h2>

                <p className="text-yellow-400">{item.type}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Saved;