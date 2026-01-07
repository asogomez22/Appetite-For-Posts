import { useLayoutEffect, useEffect, useState, useRef } from "react";
import Navbar from "../components/NavbarHero";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const mainContainerRef = useRef(null);
  const heroRef = useRef(null);
  const logoMaskRef = useRef(null);
  const realLogoRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=180%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      const initialSize = "3000% auto";
      const finalSize = "35% auto";

      tl.fromTo(
        [logoMaskRef.current, realLogoRef.current],
        {
          maskSize: initialSize,
          webkitMaskSize: initialSize,
          backgroundSize: initialSize,
        },
        {
          maskSize: finalSize,
          webkitMaskSize: finalSize,
          backgroundSize: finalSize,
          ease: "power2.out",
          duration: 1,
        },
        0
      );

      tl.fromTo(
        realLogoRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "power1.inOut",
          duration: 0.6,
        },
        0.6
      );

      tl.to(
        textRef.current,
        {
          opacity: 0,
          y: -50,
          scale: 0.9,
          ease: "power1.in",
          duration: 0.5,
        },
        0
      );
    }, mainContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainContainerRef} className="bg-zinc-800 overflow-hidden">
      <Navbar />

      <main>
        {/* SECTION HERO */}
        <section
          ref={heroRef}
          // Aseguramos que sea bg-zinc-800 igual que la sección de abajo
          className="relative w-full h-screen flex items-center justify-center bg-zinc-800 z-0"
        >
          {/* 
             HE ELIMINADO EL DIV DE bg-black/50 AQUI.
             Esto hacía que el fondo se viera más oscuro que la sección siguiente.
          */}

          <div
            ref={textRef}
            className="relative z-30 text-center pointer-events-none w-full transform translate-y-10"
          >
            {/* Agregué drop-shadow para que el texto se lea bien sin el fondo negro extra */}
            <div className="flex flex-col items-center justify-center text-white font-serif px-6 drop-shadow-md">
              <div className="flex flex-col w-full max-w-4xl">
                <img src="/logorosas.png" alt="Logo" className="mx-auto" />
                <h2 className="text-3xl mt-10">
                  Explora las historias jamás contadas, artículos exclusivos y
                  las últimas novedades.
                </h2>
              </div>
              <img
                src="/keep-scrolling.svg"
                alt="flecha"
                className="invert mt-12 animate-bounce w-12"
              />
            </div>
          </div>

          <div
            ref={logoMaskRef}
            className="absolute inset-0 z-20 w-full h-full"
            style={{
              maskImage: "url('/logo.png')",
              WebkitMaskImage: "url('/logo.png')",
              maskPosition: "center 40%",
              WebkitMaskPosition: "center 60%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskSize: "3000% auto",
              WebkitMaskSize: "3000% auto",
            }}
          >
            {/* Aquí la imagen de fondo tiene opacity-60 para mezclarse con el zinc-800 */}
            <div className="w-full h-full bg-[url(/hero.jpg)] bg-cover bg-position-[center_top_40%] opacity-60" />
          </div>

          <div
            ref={realLogoRef}
            className="absolute inset-0 z-20 w-full h-full pointer-events-none"
            style={{
              backgroundImage: "url('/logo.png')",
              backgroundPosition: "center 60%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "3000% auto",
              opacity: 0,
            }}
          />
        </section>

        {/* CONTENIDO SIGUIENTE: bg-zinc-800 */}
        <div className="relative z-40 bg-zinc-800">
          
          {/* TICKER */}
          <div className="relative w-full py-4 md:py-6 bg-yellow-500 text-black border-y-4 border-black">
            <motion.div
              className="flex w-fit"
              animate={{ x: "-50%" }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              {[0, 1].map((key) => (
                <div key={key} className="flex whitespace-nowrap shrink-0">
                  {["noticias", "artículos", "novedades", "historias"].map(
                    (texto, i) => (
                      <div key={i} className="flex items-center">
                        <span className="tracking-wide text-2xl md:text-5xl font-black px-8 uppercase">
                          {texto}
                        </span>
                        <span className="text-2xl md:text-5xl">•</span>
                      </div>
                    )
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* SECCIÓN 1 */}
          <section className="min-h-[80vh] flex items-center justify-center py-20 px-6 bg-zinc-800">
            <div className="max-w-7xl mx-auto w-full">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">             
                  <div className="relative group basis-[45%] flex justify-end">
                    <div className="relative border-3 border-yellow-500 rounded-2xl overflow-hidden shadow-2xl transition hover:-translate-y-3">
                      <div 
                        className="bg-[url('/articuloshero.avif')] bg-cover bg-center w-75 h-75 sm:w-100 sm:h-100 lg:w-md lg:h-md transition-all duration-500 group-hover:scale-110 group-hover:shadow-[2px_5px_0_0_black]"
                        role="img"
                        aria-label="Hero Artículos"
                      ></div>
                    </div>
                  </div>
                <div className="flex flex-1 flex-col items-center lg:items-start text-center lg:text-left">
                  <span className="text-yellow-500 font-mono tracking-widest uppercase text-sm mb-4">
                    Novedades & Prensa
                  </span>
                  
                  <h2 className="font-gnr tracking-normal text-6xl md:text-8xl text-white mb-6 leading-tight hover:text-yellow-500 transition-colors cursor-default">
                    Artículos
                  </h2>
                  
                  <p className="font-serif text-zinc-400 text-xl md:text-2xl max-w-xl leading-relaxed mb-10">
                    Explora noticias exclusivas, entrevistas y crónicas sobre la trayectoria de la banda.
                  </p>

                  <a 
                    href="/articulos" 
                    className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-500 bg-zinc-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 border border-white/10 hover:bg-white hover:text-black overflow-hidden"
                  >
                    <span className="relative z-10 uppercase tracking-widest text-sm">Ver todos los artículos</span>
                    <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-800"></div>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <div className="bg-zinc-800 py-2 flex justify-center">
            <div className="w-[50%] h-px bg-linear-to-r from-transparent via-yellow-500/50 to-transparent"></div>
          </div>

          <section className="min-h-[80vh] flex items-center justify-center py-20 px-6 bg-zinc-800">
            <div className="max-w-7xl mx-auto w-full">
              <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
                
                <div className="flex flex-1 flex-col items-center lg:items-end text-center lg:text-right">
                  <span className="text-yellow-500 font-mono tracking-widest uppercase text-sm mb-4">
                    Álbumes y Formación
                  </span>

                  <h2 className="font-gnr tracking-normal text-6xl md:text-8xl text-white mb-6 leading-tight hover:text-yellow-500 transition-colors cursor-default">
                    Sobre GN'R
                  </h2>

                  <p className="font-serif text-zinc-400 text-xl md:text-2xl max-w-xl leading-relaxed mb-10">
                    Descubre la historia detrás de GN'R, así como su discografía
                  </p>

                  <a
                    href="/sobregnr"
                    className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-500 bg-zinc-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 border border-white/10 hover:bg-white hover:text-black overflow-hidden"
                  >
                    <span className="relative z-10 uppercase tracking-widest text-sm">Ver más sobre la banda</span>
                    <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-800"></div>
                  </a>
                </div>

                <div className="relative group basis-[45%] flex justify-start">
                  <div className="relative border-3 border-yellow-500 rounded-2xl overflow-hidden shadow-2xl transition hover:-translate-y-3">
                    <div
                      className="bg-[url('/sobregnrhero.webp')] bg-cover bg-center w-75 h-75 sm:w-100 sm:h-100 lg:w-md lg:h-md transition-all duration-500 group-hover:scale-110 group-hover:shadow-[2px_5px_0_0_black]"
                      role="img"
                      aria-label="Hero Artículos"
                    ></div>
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  );
}

export default Home;