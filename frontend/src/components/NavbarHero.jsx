import { useEffect, useState } from "react";
import Enlace from "./Enlaces";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1550);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full h-20 md:h-24 flex justify-between items-center px-6 md:px-10 font-gnr transition-all duration-500 z-50 text-white ${
        isScrolled || isMenuOpen ? "bg-[#161515ff]" : "bg-transparent"
      }`}
    >
      <a
        href="/"
        className="text-2xl md:text-4xl lg:text-5xl hover:text-yellow-500 transition whitespace-nowrap z-50 relative"
        onClick={() => setIsMenuOpen(false)}
      >
        Appetite for Posts
      </a>

      <nav className="hidden lg:flex gap-8 text-2xl lg:text-3xl items-center">
        <Enlace />
        <Enlace url="/sobregnr" nombre="Sobre GN'R" />
        <Enlace url="/noticias" nombre="Noticias" />
        <Enlace url="/articulos" nombre="Articulos" />
        <Enlace url="/contacto" nombre="Contacto" />
      </nav>

      <button
        className="lg:hidden text-white z-50 focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      <div
        className={`fixed inset-0 bg-[#161515] flex flex-col justify-center items-center transition-transform duration-500 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 40 }}
      >
        <nav className="flex flex-col gap-8 text-3xl text-center">
          <div onClick={() => setIsMenuOpen(false)}>
            <Enlace />
          </div>
          <div onClick={() => setIsMenuOpen(false)}>
            <Enlace url="/sobregnr" nombre="Sobre GN'R" />
          </div>
          <div onClick={() => setIsMenuOpen(false)}>
             <Enlace url="/noticias" nombre="Noticias" />
          </div>
          <div onClick={() => setIsMenuOpen(false)}>
            <Enlace url="/articulos" nombre="Articulos" />
          </div>
          <div onClick={() => setIsMenuOpen(false)}>
            <Enlace url="/contacto" nombre="Contacto" />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;