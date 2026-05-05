function Footer() {
  return (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-black text-gray-400 py-6 border-t border-white/10">
      
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left */}
        <p className="text-sm">
          © {new Date().getFullYear()} PaperNest
        </p>

        {/* Center */}
        <p className="text-sm text-gray-500">
          Built with ❤️ by Drishti Chopra
        </p>

        {/* Right */}
        <div className="flex gap-4 text-sm">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>

      </div>
    </footer>
  );
}