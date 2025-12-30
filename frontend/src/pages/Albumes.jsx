import { useLayoutEffect, useRef, useState } from "react";
import Navbar from "../components/NavbarHero";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, useScroll, useVelocity, useAnimationFrame } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// --- DATOS DE DISCOGRAFÍA ---
const albums = [
  { 
    title: "Appetite for Destruction", 
    year: "1987", 
    cover: "/appetite.jpg", // Asegúrate de tener estas imágenes
    sales: "30M+ Copias",
    hits: ["Welcome to the Jungle", "Sweet Child O' Mine", "Paradise City"]
  },
  { 
    title: "G N' R Lies", 
    year: "1988", 
    cover: "/lies.jpg", 
    sales: "10M+ Copias",
    hits: ["Patience", "Used to Love Her", "One in a Million"]
  },
  { 
    title: "Use Your Illusion I", 
    year: "1991", 
    cover: "/uyi1.jpg", 
    sales: "17M+ Copias",
    hits: ["November Rain", "Don't Cry", "Live and Let Die"]
  },
  { 
    title: "Use Your Illusion II", 
    year: "1991", 
    cover: "/uyi2.jpg", 
    sales: "16M+ Copias",
    hits: ["You Could Be Mine", "Civil War", "Knockin' on Heaven's Door"]
  },
  { 
    title: "The Spaghetti Incident?", 
    year: "1993", 
    cover: "/spaghetti.jpg", 
    sales: "6M+ Copias",
    hits: ["Ain't It Fun", "Since I Don't Have You", "Hair of the Dog"]
  },
  { 
    title: "Chinese Democracy", 
    year: "2008", 
    cover: "/chinese.jpg", 
    sales: "3M+ Copias",
    hits: ["Chinese Democracy", "Better", "This I Love"]
  },
];

// --- ATMÓSFERA GRANO (Consistencia visual) ---
const GrainAtmosphere = () => (
    <div className="fixed inset-0 z-0 pointer-events-none mix-blend-overlay opacity-[0.12]">
        <svg className="w-full h-full">
            <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>
    </div>
);

// --- COMPONENTE: VINYL CARD 3D ---
const VinylCard = ({ album, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Física del tilt (Portado de la vista de integrantes)
  const springConfig = { stiffness: 150, damping: 20 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  // Brillo especular
  const highlightX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const highlightY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  const highlightGradient = useMotionTemplate`radial-gradient(circle at ${highlightX} ${highlightY}, rgba(255,255,255,0.3) 0%, transparent 60%)`;

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0); y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      className="relative w-full max-w-[400px] h-[550px] perspective-container mx-auto"
      style={{ perspective: 1200 }}
    >
      <div 
        className="group relative w-full h-[400px]" // Contenedor de la parte superior (Vinilo + Portada)
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        
        {/* 1. EL DISCO DE VINILO (Detrás de la portada, sale al hover) */}
        <div className="absolute top-2 bottom-2 left-2 right-2 rounded-full bg-black flex items-center justify-center shadow-2xl transition-all duration-700 ease-out group-hover:translate-x-[40%] group-hover:rotate-[180deg]">
            {/* Textura de surcos del vinilo */}
            <div className="absolute inset-0 rounded-full opacity-30" 
                 style={{ background: "repeating-radial-gradient(#111 0, #111 2px, #222 3px, #222 4px)" }}></div>
            
            {/* Brillo del vinilo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50"></div>

            {/* Etiqueta del centro */}
            <div className="w-1/3 h-1/3 bg-yellow-600 rounded-full border-4 border-black relative flex items-center justify-center">
                 <div className="w-2 h-2 bg-black rounded-full"></div>
                 <span className="absolute text-[0.4rem] font-mono text-black uppercase tracking-widest animate-spin-slow" style={{ animationDuration: '4s' }}>Guns N Roses</span>
            </div>
        </div>

        {/* 2. LA PORTADA (Sleeve) con Tilt 3D */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative w-full h-full bg-zinc-900 rounded-sm shadow-2xl z-20"
        >
            <img 
                src={album.cover} 
                alt={album.title} 
                className="w-full h-full object-cover rounded-sm shadow-[5px_5px_15px_rgba(0,0,0,0.5)]"
            />
            
            {/* Efecto de brillo sobre la portada */}
            <motion.div
                style={{ background: highlightGradient }}
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay rounded-sm z-30"
            />
            
            {/* Borde desgastado sutil */}
            <div className="absolute inset-0 border border-white/10 rounded-sm pointer-events-none"></div>
        </motion.div>

      </div>

      {/* 3. INFORMACIÓN DEL ÁLBUM (Debajo) */}
      <div className="mt-8 text-center relative z-10 px-4">
         <h3 className="text-white font-gnr text-4xl md:text-5xl leading-none mb-2 drop-shadow-md">
            {album.title}
         </h3>
         <div className="flex justify-center items-center gap-4 mb-4">
             <span className="text-yellow-500 font-mono text-sm tracking-[0.2em]">{album.year}</span>
             <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
             <span className="text-zinc-400 font-serif text-xs uppercase tracking-wide">{album.sales}</span>
         </div>

         {/* Lista de Hits */}
         <div className="border-t border-white/10 pt-4">
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-2">Key Tracks</p>
            <ul className="text-zinc-300 font-serif text-sm space-y-1">
                {album.hits.map((hit, i) => (
                    <li key={i} className="hover:text-yellow-500 transition-colors cursor-default">
                        {hit}
                    </li>
                ))}
            </ul>
         </div>
      </div>
    </motion.div>
  );
};

// --- MARQUESINA DE TEXTO ANIMADO (Hero) ---
function ParallaxText({ children, baseVelocity = 100 }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  
    const x = useTransform(baseX, (v) => `${v}%`);
  
    const directionFactor = useRef(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
      if (velocityFactor.get() < 0) { directionFactor.current = -1; } 
      else if (velocityFactor.get() > 0) { directionFactor.current = 1; }
  
      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    });
  
    return (
      <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
        <motion.div className="flex whitespace-nowrap flex-nowrap" style={{ x }}>
          <span className="block mr-12 font-gnr text-[15vw] md:text-[12vw] leading-none text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 to-zinc-950 opacity-40">{children} </span>
          <span className="block mr-12 font-gnr text-[15vw] md:text-[12vw] leading-none text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 to-zinc-950 opacity-40">{children} </span>
          <span className="block mr-12 font-gnr text-[15vw] md:text-[12vw] leading-none text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 to-zinc-950 opacity-40">{children} </span>
          <span className="block mr-12 font-gnr text-[15vw] md:text-[12vw] leading-none text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 to-zinc-950 opacity-40">{children} </span>
        </motion.div>
      </div>
    );
  }

function Discografia() {
  const containerRef = useRef(null);

  // Animación de entrada suave
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
       gsap.from(".album-card", {
          y: 100,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          scrollTrigger: {
             trigger: ".album-grid",
             start: "top 80%",
          }
       });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-zinc-950 min-h-screen relative selection:bg-yellow-500 selection:text-black overflow-x-hidden">
      <GrainAtmosphere />
      <Navbar />
      
      <main className="relative z-10 pt-32 pb-20">
        
        {/* --- HEADER: MARQUESINA INFINITA --- */}
        <section className="mb-24 relative">
             <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950 z-20 pointer-events-none"></div>
             <ParallaxText baseVelocity={-2}>DISCOGRAPHY LEGACY </ParallaxText>
             <ParallaxText baseVelocity={2}>STUDIO ALBUMS </ParallaxText>
             
             {/* Título superpuesto estático */}
             <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                 <h1 className="text-white font-gnr text-6xl md:text-8xl drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                     THE RECORDS
                 </h1>
             </div>
        </section>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 album-grid">
            
            {/* GRID DE ÁLBUMES */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
                {albums.map((album, index) => (
                    <div key={index} className="album-card flex justify-center">
                        <VinylCard album={album} index={index} />
                    </div>
                ))}
            </div>

            {/* SECCIÓN ESTADÍSTICAS EXTRA */}
            <div className="mt-40 border-t border-white/10 pt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div>
                        <span className="block text-6xl font-gnr text-yellow-500 mb-2">100M+</span>
                        <span className="text-zinc-400 font-mono text-sm tracking-widest uppercase">Records Sold</span>
                    </div>
                    <div>
                        <span className="block text-6xl font-gnr text-white mb-2">6</span>
                        <span className="text-zinc-400 font-mono text-sm tracking-widest uppercase">Studio Albums</span>
                    </div>
                    <div>
                        <span className="block text-6xl font-gnr text-yellow-500 mb-2">#1</span>
                        <span className="text-zinc-400 font-mono text-sm tracking-widest uppercase">Best Selling Debut</span>
                    </div>
                </div>
            </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Discografia;