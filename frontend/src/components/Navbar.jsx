import { useEffect, useState } from "react";
import Enlace from "./Enlaces";
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full h-24 flex justify-between items-center px-4 sm:px-10 font-gnr transition-colors duration-500 z-50 text-white ${
        isScrolled ? "bg-[#161515ff]" : "bg-transparent"
      }`}
    >
      <a
        href="/"
        className="text-3xl sm:text-4xl lg:text-5xl hover:text-yellow-500 transition whitespace-nowrap mr-4"
      >
        Appetite for Posts
      </a>
      <nav className="flex gap-4 sm:gap-8 text-xl sm:text-2xl lg:text-3xl">
        <Enlace />
        <Enlace url="/sobregnr" nombre="Sobre GN'R" />
        <Enlace url="/noticias" nombre="Noticias" />
        <Enlace url="/articulos" nombre="Articulos" />
        <Enlace url="/contacto" nombre="Contacto" />
      </nav>
    </header>
  );
}

export default Navbar;
