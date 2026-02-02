import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="
        w-full
        bg-gray-700/90
        text-gray-300
        text-sm
      "
    >
      <div
        className="
          max-w-7xl mx-auto
          px-4 py-4
          flex flex-col sm:flex-row
          items-center
          justify-between
          gap-3
        "
      >
        <p className="text-center sm:text-left">
          © 2026 Mood Banadu. All rights reserved.
        </p>

        <a
          href="https://github.com/manojrahar"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className="
            hover:text-white
            transition-colors duration-200
          "
        >
          <FaGithub size={22} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
