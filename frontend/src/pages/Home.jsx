import { useLayoutEffect, useEffect, useState, useRef } from "react";
import Navbar from "../components/NavbarHero";
import Footer from "../components/Footer";
import SeccionDeArticulo from "../components/SeccionDeArticulo";
import ArticleCard from "../components/ArticleCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const [articles, setArticles] = useState([]);
  
  const mainContainerRef = useRef(null);
  const heroRef = useRef(null);
  const logoMaskRef = useRef(null); 
  const realLogoRef = useRef(null); 
  const textRef = useRef(null);
  const bgImageRef = useRef(null);

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

      // 1. MÁSCARA (Recorte de la foto): Se encoge durante toda la animación
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

      // 2. LOGO REAL (Tamaño): Se encoge sincronizado con la máscara
      tl.fromTo(realLogoRef.current,
        { backgroundSize: initialSize },
        { 
          backgroundSize: finalSize, 
          ease: "power2.out", 
          duration: 1 
        },
        0 
      );

      // 3. LOGO REAL (Opacidad): Empieza invisible y aparece DESPUÉS de la mitad
      tl.fromTo(realLogoRef.current,
        { opacity: 0 },
        { 
          opacity: 1, 
          ease: "power1.inOut", 
          duration: 0.7 // Dura desde el 50% hasta el 100%
        },
        0.7 // <--- Retraso de inicio (Start at 50%)
      );

      // 4. TEXTO: Desaparece al principio
      tl.to(textRef.current, {
          opacity: 0,
          y: -50,
          scale: 0.9,
          ease: "power1.in",
          duration: 0.4
        }, 0 
      );

      // 5. Parallax
      tl.to(bgImageRef.current, { scale: 1.1, duration: 1 }, 0);

    }, mainContainerRef);

    return () => ctx.revert();
  }, []);

  // --- Fetch y Sockets ---
  useEffect(() => {
    fetch("http://localhost:8000/api/articles/")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/articles");
    ws.onmessage = (event) => {
      try {
        const newArticle = JSON.parse(event.data);
        setArticles((prev) => [...prev, newArticle]);
      } catch (e) { console.error(e) }
    };
    return () => { if (ws.readyState === 1) ws.close(); };
  }, []);

  return (
    <div ref={mainContainerRef}>
      <Navbar />
      
      <main className="bg-[#161515ff] overflow-x-hidden">
        
        {/* --- HERO PINNED --- */}
        <div 
          ref={heroRef} 
          className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black"
        >
            {/* CAPA 1: MÁSCARA (Foto recortada) */}
            <div 
                ref={logoMaskRef}
                className="absolute inset-0 z-10 w-full h-full"
                style={{
                    maskImage: "url('/logo.png')",
                    WebkitMaskImage: "url('/logo.png')",
                    maskPosition: "center center",
                    WebkitMaskPosition: "center center",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                }}
            >
                <div 
                    ref={bgImageRef}
                    className="w-full h-full"
                    style={{
                        backgroundImage: "url('/hero.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            </div>

            {/* CAPA 2: LOGO REAL (Overlay) */}
            <div 
                ref={realLogoRef}
                className="absolute inset-0 z-20 w-full h-full pointer-events-none"
                style={{
                    backgroundImage: "url('/logo.png')",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0, // Controlado por GSAP
                }}
            />

            {/* TEXTO */}
            <div 
              ref={textRef} 
              className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center px-4 pointer-events-none"
            >
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl tracking-widest font-gnr leading-tight drop-shadow-2xl">
                Artículos, historias y novedades sobre <br />
                <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl block mt-4 text-shadow-[20px]">
                  Guns N' Roses
                </span>
              </h1>
            </div>

            {/* DEGRADADO INFERIOR */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#161515ff] to-transparent z-20 pointer-events-none"></div>

        </div>

        {/* --- CONTENIDO --- */}
        <div className="relative z-20 pb-10 bg-[#161515ff]">
            <SeccionDeArticulo tituloSeccion="Noticias">
            {articles
                .filter((article) => article.section === "noticias")
                .slice(0, 3)
                .map((article) => (
                <ArticleCard
                    key={article.id}
                    titulo={article.title}
                    descripcion={article.description}
                    img={article.img}
                    body={article.body}
                    id={article.id}
                    seccion={article.section}
                />
                ))}
            </SeccionDeArticulo>

            <SeccionDeArticulo tituloSeccion="Whati If?">
            {articles
                .filter((article) => article.section === "whatif")
                .slice(0, 3)
                .map((article) => (
                <ArticleCard
                    key={article.id}
                    titulo={article.title}
                    descripcion={article.description}
                    img={article.img}
                    body={article.body}
                    id={article.id}
                    seccion={article.section}
                />
                ))}
            </SeccionDeArticulo>

                        <SeccionDeArticulo tituloSeccion="Discografía">
            {articles
                .filter((article) => article.section === "discografia")
                .slice(0, 3)
                .map((article) => (
                <ArticleCard
                    key={article.id}
                    titulo={article.title}
                    descripcion={article.description}
                    img={article.img}
                    body={article.body}
                    id={article.id}
                    seccion={article.section}
                />
                ))}
            </SeccionDeArticulo>
            <Footer />
        </div>
      </main>
    </div>
  );
}

export default Home;