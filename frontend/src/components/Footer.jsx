import Enlace from './Enlaces';

function Footer() {
  return (
    <div>
      <hr className="h-1 border-0 bg-yellow-500" />

      <footer className="flex min-h-auto flex-col items-center justify-center bg-[#161515ff] py-8 text-center text-white md:min-h-[40vh]">
        <div className="flex h-full w-[90vw] flex-col items-center gap-y-8 md:flex-row md:gap-y-0">
          <div className="w-full flex-1 md:w-auto">
            <h2 className="p-2 text-2xl font-gnr md:p-4 md:text-4xl">Appetite for Posts</h2>
            <p className="px-4 font-serif text-sm md:text-base">
              Los posts de este blog son generados por IA,
              <br className="hidden md:block" />
              pueden contener informacion erronea.
            </p>

            <div className="flex flex-wrap justify-center gap-4 p-4 font-gnr text-xl text-white md:gap-x-8 md:text-2xl">
              <Enlace />
              <Enlace nombre="Articulos" url="/articulos" />
              <Enlace nombre="Contacto" url="/contacto" />
              <Enlace nombre="Admin" url="/admin/articulos" />
            </div>
          </div>

          <div className="my-4 w-24 shrink-0 md:my-0 md:basis-1/9 md:w-auto">
            <img src="/logo.png" alt="Logo" className="h-auto w-full object-contain transition hover:scale-110" />
          </div>

          <div className="w-full flex-1 md:w-auto">
            <h2 className="p-2 text-2xl font-gnr md:text-4xl">Links Oficiales</h2>

            <nav className="flex flex-wrap justify-center gap-4 p-4 font-gnr text-xl text-white md:gap-x-8 md:text-2xl">
              <Enlace nombre="Instagram" url="https://www.instagram.com/gunsnroses/" />
              <Enlace nombre="X" url="https://x.com/gunsnroses" />
              <Enlace nombre="YouTube" url="https://www.youtube.com/channel/UCIak6JLVOjqhStxrL1Lcytw" />
              <Enlace nombre="Web Oficial" url="https://www.gunsnroses.com/" />
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
