import { useLayoutEffect, useRef } from "react";
import Navbar from "../components/NavbarHero";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SobreLaBanda() {
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
                    anticipatePin: 1
                },
            });

            const initialSize = "3000% auto";
            const finalSize = "35% auto";

            // 1. Animación de la Máscara (El recorte de la imagen de fondo)
            tl.fromTo(logoMaskRef.current,
                { maskSize: initialSize, webkitMaskSize: initialSize },
                {
                    maskSize: finalSize,
                    webkitMaskSize: finalSize,
                    ease: "power2.out",
                    duration: 1
                },
                0
            );

            // 2. Animación del Logo Real (Sincronizado)
            tl.fromTo(realLogoRef.current,
                { backgroundSize: initialSize },
                {
                    backgroundSize: finalSize,
                    ease: "power2.out",
                    duration: 1
                },
                0
            );

            // 3. Aparición gradual del Logo Real al final
            tl.fromTo(realLogoRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    ease: "power1.inOut",
                    duration: 0.7
                },
                0.7
            );

            // 4. Desvanecimiento del texto principal
            tl.to(textRef.current, {
                opacity: 0,
                y: -50,
                scale: 0.9,
                ease: "power1.in",
                duration: 0.4
            }, 0);

        }, mainContainerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={mainContainerRef}>
            <Navbar />
            <main className="bg-[#161515ff] overflow-x-hidden">
                
                <section
                    ref={heroRef}
                    className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black"
                >
                    
                    <div
                        ref={logoMaskRef}
                        className="absolute inset-0 z-10 w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: "url('https://www.rockfm.fm/files/og_thumbnail/uploads/2025/05/23/68308601dd996.jpeg')",
                            maskImage: "url('/logo_afd.png')",
                            WebkitMaskImage: "url('/logo_afd.png')",
                            maskPosition: "center center",
                            WebkitMaskPosition: "center center",
                            maskRepeat: "no-repeat",
                            WebkitMaskRepeat: "no-repeat",
                        }}
                    >
                        {/* Overlay oscuro para legibilidad */}
                        <div className="w-full h-full bg-black/40"></div>
                    </div>

                    {/* CAPA 2: EL LOGO REAL (Se vuelve visible al final) */}
                    <div
                        ref={realLogoRef}
                        className="absolute inset-0 z-20 w-full h-full pointer-events-none"
                        style={{
                            backgroundImage: "url('/logo_afd.png')",
                            backgroundPosition: "center center",
                            backgroundRepeat: "no-repeat",
                            opacity: 0,
                        }}
                    />
                    

                    
                    <div
                        ref={textRef}
                        className="absolute z-30 flex flex-col items-center justify-center text-center px-4 pointer-events-none bg"
                    >
                        <h1 className="font-gnr text-6xl md:text-9xl text-white transition hover:text-yellow-500 drop-shadow-2xl">
                            Explora los miembros <br /> y su discografía
                        </h1>
                        
                        <img 
                            src="/keep-scrolling.svg" 
                            alt="flecha" 
                            className="invert mt-10 animate-bounce w-12" 
                        />

                    </div>
                    

                    <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-zinc-800 to-transparent z-40"></div>
                </section>

                          <section className="min-h-[80vh] flex items-center justify-center py-20 px-6 bg-zinc-800">
            <div className="max-w-7xl mx-auto w-full">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">             
                  <div className="relative group basis-[45%] flex justify-end">
                    <div className="relative border-3 border-yellow-500 rounded-2xl overflow-hidden shadow-2xl transition hover:-translate-y-3">
                      <div 
                        className="bg-[url('/formacion.webp')] bg-cover bg-center w-75 h-75 sm:w-100 sm:h-100 lg:w-md lg:h-md transition-all duration-500 group-hover:scale-110 group-hover:shadow-[2px_5px_0_0_black]"
                        role="img"
                        aria-label="Hero Artículos"
                      ></div>
                    </div>
                  </div>
                <div className="flex flex-1 flex-col items-center lg:items-start text-center lg:text-left">
                  <span className="text-yellow-500 font-mono tracking-widest uppercase text-sm mb-4">
                    Formación de la banda
                  </span>
                  
                  <h2 className="font-gnr tracking-normal text-6xl md:text-8xl text-white mb-6 leading-tight hover:text-yellow-500 transition-colors cursor-default">
                    Integrantes
                  </h2>
                  
                  <p className="font-serif text-zinc-400 text-xl md:text-2xl max-w-xl leading-relaxed mb-10">
                    Descubre quien ha formado parte de la banda a lo largo de su historia.
                  </p>

                  <a 
                    href="/albumes" 
                    className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-500 bg-zinc-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 border border-white/10 hover:bg-white hover:text-black overflow-hidden"
                  >
                    <span className="relative z-10 uppercase tracking-widest text-sm">Ver todos los integrantes</span>
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
                    Álbumes
                  </span>

                  <h2 className="font-gnr tracking-normal text-6xl md:text-8xl text-white mb-6 leading-tight hover:text-yellow-500 transition-colors cursor-default">
                    Discografía
                  </h2>

                  <p className="font-serif text-zinc-400 text-xl md:text-2xl max-w-xl leading-relaxed mb-10">
                   Explora toda la discografía de GN'R
                  </p>

                  <a
                    href="/integrantes"
                    className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-500 bg-zinc-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 border border-white/10 hover:bg-white hover:text-black overflow-hidden"
                  >
                    <span className="relative z-10 uppercase tracking-widest text-sm">Ver toda la discografía</span>
                    <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-800"></div>
                  </a>
                </div>

                <div className="relative group basis-[45%] flex justify-start">
                  <div className="relative border-3 border-yellow-500 rounded-2xl overflow-hidden shadow-2xl transition hover:-translate-y-3">
                    <div
                      className="bg-[url('/discografia.jpg')] bg-cover bg-center w-75 h-75 sm:w-100 sm:h-100 lg:w-md lg:h-md transition-all duration-500 group-hover:scale-110 group-hover:shadow-[2px_5px_0_0_black]"
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
            </main>
        </div>
    );
}

export default SobreLaBanda;
