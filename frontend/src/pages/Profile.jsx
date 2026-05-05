import { useEffect, useState } from "react";
import MainNavbar from "../components/MainNavbar";

const avatars = [
  "https://api.dicebear.com/7.x/bottts/svg?seed=Leo",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Nova",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Zara",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Max",
];

function Profile() {
  const [user, setUser] = useState(null);
  const [savedItems, setSavedItems] = useState([]);
  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || avatars[0]
  );

  const [stats, setStats] = useState({
    savedCount: 0,
    hours: 0,
    streak: 0,
  });

  // 🔥 Load data
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const saved =
      JSON.parse(localStorage.getItem("savedItems")) || [];

    setUser(userData);
    setSavedItems(saved);

    setStats({
      savedCount: saved.length,
      hours: saved.length * 2,
      streak: saved.length > 0 ? 5 : 0,
    });
  }, []);

  const changeAvatar = (img) => {
    setAvatar(img);
    localStorage.setItem("avatar", img);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNavbar />

      <div className="px-8 py-10 space-y-10">

        {/* 🔥 PROFILE CARD */}
        <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 flex flex-col md:flex-row items-center gap-10 shadow-xl animate-fadeIn">

          {/* Avatar */}
          <div className="relative group">
            <img
              src={avatar}
              alt="avatar"
              className="w-32 h-32 rounded-full border-4 border-yellow-400 transition-transform duration-300 group-hover:scale-110"
            />

            <div className="flex gap-2 mt-4 justify-center">
              {avatars.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => changeAvatar(img)}
                  className="w-10 h-10 rounded-full cursor-pointer border hover:scale-110 transition"
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold">
              {user?.fullName || "User"}
            </h2>
            <p className="text-gray-400 mt-2">
              {user?.email || "user@email.com"}
            </p>

            {/* Stats */}
            <div className="flex gap-8 mt-6 justify-center md:justify-start">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-400">
                  {stats.savedCount}
                </p>
                <p className="text-gray-400 text-sm">Saved</p>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">
                  {stats.hours}
                </p>
                <p className="text-gray-400 text-sm">Hours</p>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold text-red-400">
                  {stats.streak}
                </p>
                <p className="text-gray-400 text-sm">Streak</p>
              </div>
            </div>
          </div>
        </div>

        {/* 🔥 PROGRESS BAR */}
        <div className="bg-white/5 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            📈 Reading Progress
          </h2>

          <div className="w-full bg-white/10 h-4 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(stats.savedCount * 10, 100)}%`,
              }}
            ></div>
          </div>

          <p className="text-gray-400 mt-2 text-sm">
            Keep reading to grow your progress 🚀
          </p>
        </div>

        {/* 🔥 SAVED LIBRARY */}
        <div>
          <h2 className="text-3xl font-bold mb-6">
            📚 Your Library
          </h2>

          {savedItems.length === 0 ? (
            <p className="text-gray-400">
              No saved items yet
            </p>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-4">
              {savedItems.map((item, i) => (
                <div
                  key={i}
                  className="min-w-[220px] bg-white/10 rounded-2xl p-4 hover:scale-105 transition duration-300"
                >
                  <img
                    src={item.image}
                    className="w-full h-40 object-cover rounded-xl"
                  />

                  <h3 className="mt-3 font-bold">
                    {item.title}
                  </h3>
                  <p className="text-yellow-400 text-sm">
                    {item.type}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 🔥 RECENT ACTIVITY */}
        <div>
          <h2 className="text-3xl font-bold mb-6">
            🔥 Recent Activity
          </h2>

          {savedItems.length === 0 ? (
            <p className="text-gray-400">
              Start reading to see activity
            </p>
          ) : (
            <div className="space-y-3">
              {savedItems.slice(0, 3).map((item, i) => (
                <div
                  key={i}
                  className="bg-white/10 p-4 rounded-xl flex justify-between hover:bg-white/20 transition"
                >
                  <span>{item.title}</span>
                  <span className="text-gray-400 text-sm">
                    Saved recently
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Profile;