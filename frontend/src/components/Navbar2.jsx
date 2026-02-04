import { useState, useEffect } from "react";
import Enlace from "../components/Enlaces";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-20 md:h-24 flex justify-between items-center px-4 sm:px-10 font-gnr transition-colors duration-500 z-50 text-white bg-black">
        
        <a
          className="hover:text-yellow-500 transition text-2xl sm:text-4xl lg:text-5xl whitespace-nowrap z-50 relative"
          href="/"
          onClick={() => setIsOpen(false)}
        >
          Appetite for Posts
        </a>

        <nav className="hidden lg:flex gap-8 text-2xl lg:text-3xl items-center">
          <Enlace />
          <Enlace url="/sobregnr" nombre="Sobre GN'R" />
          <Enlace url="/noticias" nombre="Noticias" />
          <Enlace url="/articulos" nombre="Artículos" />
          <Enlace url="/contacto" nombre="Contacto" />
        </nav>

        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden text-white focus:outline-none p-2"
          aria-label="Abrir menú"
        >
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
        </button>
      </header>

      
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-60 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[75%] max-w-sm bg-zinc-900 border-l border-white/10 shadow-2xl z-70 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
                    <div className="flex justify-end mb-8 h-20 items-center">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-yellow-500 transition"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-6 text-2xl font-gnr text-white text-center">
            <div onClick={() => setIsOpen(false)}><Enlace /></div>
            <div onClick={() => setIsOpen(false)}><Enlace url="/sobregnr" nombre="Sobre GN'R" /></div>
            <div onClick={() => setIsOpen(false)}><Enlace url="/noticias" nombre="Noticias" /></div>
            <div onClick={() => setIsOpen(false)}><Enlace url="/articulos" nombre="Artículos" /></div>
            <div onClick={() => setIsOpen(false)}><Enlace url="/contacto" nombre="Contacto" /></div>
          </nav>

        </div>
      </div>
    </>
  );
}

export default Navbar;