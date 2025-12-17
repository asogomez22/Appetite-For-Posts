import { useLayoutEffect, useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SeccionDeArticulo from "../components/SeccionDeArticulo";
import ArticleCard from "../components/ArticleCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const [articles, setArticles] = useState([]);
  const containerRef = useRef(null); 
  const fullImageRef = useRef(null); // Foto de fondo completa (Capa 1)
  const maskedImageRef = useRef(null); // Foto recortada con logo (Capa 2)
  const textRef = useRef(null);

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
      const newArticle = JSON.parse(event.data);
      setArticles((prev) => [...prev, newArticle]);
    };
    return () => ws.close();
  }, []);

  // --- ANIMACIÓN ---
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%", // Aumenté esto para que el zoom dure más tiempo al hacer scroll
          scrub: 1,      
          pin: true,     
        },
      });

      // 1. EL FONDO COMPLETO SE DESVANECE
      tl.to(fullImageRef.current, {
        opacity: 0,
        ease: "power1.inOut",
        duration: 0.5 
      }, 0);

      // 2. LA CAPA DEL LOGO (ZOOM)
      tl.fromTo(
        maskedImageRef.current,
        { 
          // --- AQUÍ ESTÁ LA PROPIEDAD QUE BUSCAS ---
          scale: 150, // ANTES 30. AHORA 150 (Mucho más zoom inicial)
          // -----------------------------------------
          filter: "brightness(1)",
        },
        { 
          scale: 1, // Termina en tamaño normal
          // Efecto final: se vuelve blanco
          filter: "brightness(1)  grayscale(1)", 
          ease: "power2.inOut",
        },
        0
      );

      // 3. TEXTO DESAPARECE RÁPIDO
      tl.to(textRef.current, { opacity: 0, scale: 0.5, duration: 0.1 }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      
      <main className="bg-[#161515ff] overflow-x-hidden">
        
        {/* CONTENEDOR PINNED (FONDO NEGRO) */}
        <div ref={containerRef} className="relative w-full h-screen z-10 overflow-hidden flex flex-col items-center justify-center bg-black">
            
            {/* CAPA 1: FONDO COMPLETO (Para que no se vea negro al principio) */}
            <div 
                ref={fullImageRef}
                className="absolute inset-0 z-0 w-full h-full"
                style={{
                    backgroundImage: "url('/hero.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                }}
            />

            {/* CAPA 2: MÁSCARA (LOGO) */}
            <div 
              ref={maskedImageRef}
              className="relative z-10 w-[80vw] aspect-[3/1] flex items-center justify-center will-change-transform"
              style={{
                backgroundColor: "white",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                
                maskImage: "url('/gnr_logo_mask.png')",
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
                
                WebkitMaskImage: "url('/gnr_logo_mask.png')",
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
              }}
            >
            </div>

            {/* TEXTO */}
            <div ref={textRef} className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center w-full px-4 pointer-events-none">
              <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-widest font-gnr leading-tight drop-shadow-lg">
                Artículos, historias y novedades sobre <br />
                <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl block mt-4 text-shadow-[20px]">
                  Guns N' Roses
                </span>
              </h1>
            </div>

            {/* DEGRADADO INFERIOR */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#161515ff] via-[#161515ff] to-transparent z-30 pointer-events-none"></div>

        </div>

        {/* CONTENIDO */}
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
            <Footer />
        </div>
      </main>
    </>
  );
}

export default Home;