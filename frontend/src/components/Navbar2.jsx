import Enlace from "../components/Enlaces";

function Navbar() {
  return (
    <header className="fixed w-full h-24 flex justify-between items-center px-4 sm:px-10 font-gnr transition-colors duration-500 z-50 text-white bg-black">
      <a
        className="hover:text-yellow-500 transition text-3xl sm:text-4xl lg:text-5xl whitespace-nowrap mr-4"
        href="/"
      >
        Appetite for Posts
      </a>
      <nav className="flex gap-4 sm:gap-8 text-xl sm:text-2xl lg:text-3xl">
        <Enlace url="/noticias" nombre="Noticias" />
        <Enlace url="/articulos" nombre="Artículos" />
        <Enlace url="/contacto" nombre="Contacto" />
      </nav>
    </header>
  );
}

export default Navbar;
