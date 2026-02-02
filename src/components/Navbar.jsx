const Navbar = () => {
  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50
        bg-white/60 backdrop-blur-md
        border-b border-black/5
      "
    >
      <div
        className="
          max-w-7xl mx-auto
          px-3 sm:px-6 lg:px-10
          h-14
          flex items-center
          justify-between
        "
      >
        {/* Logo */}
        <a
          href="/"
          className="
            font-bold
            text-sm sm:text-base
            whitespace-nowrap
          "
        >
          Mood Banadu
        </a>

        {/* Links */}
        <div
          className="
            flex items-center
            gap-3 sm:gap-6
            text-xs sm:text-sm
            whitespace-nowrap
          "
        >
          <a
            href="/"
            className="text-gray-700 hover:text-black transition"
          >
            Home
          </a>
          <a
            href="#how-it-works"
            className="text-gray-700 hover:text-black transition"
          >
            How it works
          </a>
          <a
            href="#why-mood-banadu"
            className="text-gray-700 hover:text-black transition"
          >
            Why Mood Banadu
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
