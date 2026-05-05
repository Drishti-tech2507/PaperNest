import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-10 py-6">
      <h1 className="text-3xl font-bold tracking-wide text-white">
        PaperNest
      </h1>

      <ul className="hidden md:flex gap-8 text-lg">
        <li className="hover:text-yellow-400 cursor-pointer">Books</li>
        <li className="hover:text-yellow-400 cursor-pointer">Research Papers</li>
        <li className="hover:text-yellow-400 cursor-pointer">Newspapers</li>
        <li className="hover:text-yellow-400 cursor-pointer">Community</li>
      </ul>

      <Link to="/login">
        <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition">
          Register / Login
        </button>
      </Link>
    </nav>
  );
}

export default Navbar;