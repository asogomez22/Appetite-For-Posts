import React, { useLayoutEffect, useRef } from "react";
import Navbar from "../components/NavbarHero";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const albums = [
  { 
    titulo: "Appetite for Destruction", 
    anyo: "1987", 
    portada: "/afd.jpg", 
    ventas: "30M+ Copias",
    hits: ["Welcome to the Jungle", "Sweet Child O' Mine", "Paradise City"]
  },
  { 
    titulo: "G N' R Lies", 
    anyo: "1988", 
    portada: "/lies.jpg", 
    ventas: "10M+ Copias",
    hits: ["Patience", "Used to Love Her", "One in a Million"]
  },
  { 
    titulo: "Use Your Illusion I", 
    anyo: "1991", 
    portada: "/uyi1.jpg", 
    ventas: "17M+ Copias",
    hits: ["November Rain", "Don't Cry", "Live and Let Die"]
  },
  { 
    titulo: "Use Your Illusion II", 
    anyo: "1991", 
    portada: "/uyi2.jpg", 
    ventas: "16M+ Copias",
    hits: ["You Could Be Mine", "Civil War", "Knockin' on Heaven's Door"]
  },
  { 
    titulo: "The Spaghetti Incident?", 
    anyo: "1993", 
    portada: "/tsi.jpg", 
    ventas: "6M+ Copias",
    hits: ["Ain't It Fun", "Since I Don't Have You", "Hair of the Dog"]
  },
  { 
    titulo: "Chinese Democracy", 
    anyo: "2008", 
    portada: "/cd.jpg", 
    ventas: "3M+ Copias",
    hits: ["Chinese Democracy", "Better", "This I Love"]
  },
];

const sencillos = [
  { 
    titulo: "ABSUЯD", 
    anyo: "2021", 
    portada: "/absurd.jpg"
  },
  { 
    titulo: "Hard Skool", 
    anyo: "2021", 
    portada: "/hardskool.jpg"
  },
  { 
    titulo: "Perhaps", 
    anyo: "2023", 
    portada: "perhaps.jpg"
  },
  { 
    titulo: "The General", 
    anyo: "2023", 
    portada: "/thegeneral.jpg"
  },
  { 
    titulo: "Nothin'", 
    anyo: "2025", 
    portada: "/nothin.jpg"
  },
  { 
    titulo: "Atlas", 
    anyo: "2025", 
    portada: "/atlas.jpg"
  },
];

function Discografia() {
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
          end: "+=150%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      const initialSize = "3000% auto";
      const finalSize = "50% auto";

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
    <div ref={mainContainerRef} className="bg-zinc-950 min-h-screen relative text-white selection:bg-yellow-500 selection:text-black overflow-x-hidden">
      <Navbar />
      
      
      <section
          ref={heroRef}
          className="relative w-full h-screen flex items-center justify-center bg-zinc-950 z-0"
        >
          <div
            ref={textRef}
            className="relative z-30 text-center pointer-events-none w-full transform translate-y-10"
          >
            <div className="flex flex-col items-center justify-center text-white font-serif px-6 drop-shadow-md">
              <div className="flex flex-col w-full max-w-4xl">
                <h1 className="font-gnr text-9xl text-yellow-500 mb-4 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                  DISCOGRAFÍA
                </h1>
                <p className="text-xl md:text-2xl text-zinc-300">
                  Explora el legado musical de GN'R.
                </p>
              </div>
              <img
                src="/keep-scrolling.svg"
                alt="flecha"
                className="invert mt-12 animate-bounce w-12 opacity-50"
              />
            </div>
          </div>

          <div
            ref={logoMaskRef}
            className="absolute inset-0 z-20 w-full h-full"
            style={{
              maskImage: "url('/gsapalbum.png')",
              WebkitMaskImage: "url('/gsapalbum.png')",
              maskPosition: "center 40%",
              WebkitMaskPosition: "center 40%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskSize: "3000% auto",
              WebkitMaskSize: "3000% auto",
            }}
          >
            <div className="w-full h-full bg-[url(/discografiahero.jpg)] bg-cover bg-position-[center_top_40%] opacity-60" />
          </div>

          <div
            ref={realLogoRef}
            className="absolute inset-0 z-20 w-full h-full pointer-events-none"
            style={{
              backgroundImage: "url('/gsapalbum.png')",
              backgroundPosition: "center 40%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "3000% auto",
              opacity: 0,
            }}
          />
      </section>

      <main className="relative z-10  pb-20 bg-zinc-950">
            
        <div className=" pb-12 text-center">
            <h1 className="font-gnr text-8xl transition hover:text-yellow-500">Álbumes</h1>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-10">
                
                {albums.map((album, index) => (
                    <div
                        key={index}
                        className="group cursor-default" 
                    >
                        <div 
                            className="relative w-full aspect-square bg-zinc-900 rounded-sm shadow-xl transition-transform duration-300 ease-out group-hover:-translate-y-3"
                        >
                            <img 
                                src={album.portada} 
                                alt={album.titulo} 
                                className="w-full h-full object-cover rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                            />
                            
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-sm pointer-events-none"></div>
                            
                            <div className="absolute inset-0 border border-white/10 rounded-sm pointer-events-none"></div>
                        </div>

                        <div className="mt-6 text-center px-2">
                            <h3 className="font-gnr text-3xl text-white mb-2 drop-shadow-md group-hover:text-yellow-500 transition-colors duration-300">
                                {album.titulo}
                            </h3>
                            
                            <div className="flex justify-center items-center gap-3 mb-4 text-sm">
                                <span className="text-yellow-500 font-mono tracking-widest">{album.anyo}</span>
                                <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                                <span className="text-zinc-500 font-serif uppercase tracking-wide">{album.ventas}</span>
                            </div>

                            <div className="border-t border-zinc-800 pt-3 mx-auto max-w-[90%]">
                                <ul className="text-zinc-400 font-serif text-sm space-y-1">
                                    {album.hits.map((hit, i) => (
                                        <li key={i} className="group-hover:text-zinc-200 transition-colors duration-300">
                                            {hit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>
                ))}

            </div>
        </div>

        <div className="pt-20 pb-12 text-center">
            <h1 className="font-gnr text-8xl transition hover:text-yellow-500">Sencillos</h1>
        </div>
                <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-10">
                
                {sencillos.map((sencillo, index) => (
                    <div
                        key={index}
                        className="group cursor-default" 
                    >
                        <div 
                            className="relative w-full aspect-square bg-zinc-900 rounded-sm shadow-xl transition-transform duration-300 ease-out group-hover:-translate-y-3"
                        >
                            <img 
                                src={sencillo.portada} 
                                alt={sencillo.titulo} 
                                className="w-full h-full object-cover rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                            />
                            
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-sm pointer-events-none"></div>
                            
                            <div className="absolute inset-0 border border-white/10 rounded-sm pointer-events-none"></div>
                        </div>

                        <div className="mt-6 text-center px-2">
                            <h3 className="font-gnr text-3xl text-white mb-2 drop-shadow-md group-hover:text-yellow-500 transition-colors duration-300">
                                {sencillo.titulo}
                            </h3>
                            
                            <div className="flex justify-center items-center gap-3 mb-4 text-sm">
                                <span className="text-yellow-500 font-mono tracking-widest">{sencillo.anyo}</span>
                            </div>

                        </div>

                    </div>
                ))}

            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Discografia;