import { Link, useNavigate } from "react-router-dom";

function MainNavbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("savedItems");

    alert("Logged out successfully!");

    navigate("/login");
  };

  return (
    <nav className="flex flex-wrap justify-between items-center px-8 py-6 border-b border-white/10 bg-black sticky top-0 z-50">
      {/* Logo */}
      <Link to="/home">
        <h1 className="text-3xl font-bold tracking-wide cursor-pointer hover:text-yellow-400 transition">
          PaperNest
        </h1>
      </Link>

      {/* Navigation */}
      <ul className="flex flex-wrap gap-6 text-lg items-center">
        <Link to="/books">
          <li className="hover:text-yellow-400 cursor-pointer transition">
            Books
          </li>
        </Link>

        <Link to="/research">
          <li className="hover:text-yellow-400 cursor-pointer transition">
            Research Papers
          </li>
        </Link>

        <Link to="/newspapers">
          <li className="hover:text-yellow-400 cursor-pointer transition">
            Newspapers
          </li>
        </Link>

        <Link to="/saved">
          <li className="hover:text-yellow-400 cursor-pointer transition">
            Saved
          </li>
        </Link>

        <Link to="/home">
          <li className="hover:text-yellow-400 cursor-pointer transition">
            Home
          </li>
        </Link>
      </ul>

      {/* User Section */}
      <div className="flex flex-wrap gap-4 items-center mt-4 md:mt-0">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-full bg-white/10 border border-white/20 outline-none text-white placeholder-gray-400 focus:border-yellow-400 transition"
        />

        <Link to="/profile">
          <button className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:scale-105 hover:bg-yellow-400 transition">
            {user ? user.fullName.split(" ")[0] : "Profile"}
          </button>
        </Link>

        <button
          onClick={handleLogout}
          className="border border-red-400 text-red-400 px-5 py-2 rounded-full hover:bg-red-400 hover:text-black transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default MainNavbar;