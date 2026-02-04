import { useLayoutEffect, useRef } from "react";
import Navbar from "../components/NavbarHero";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const currentMembers = [
  { name: "Axl Rose", role: "Voz & Piano", img: "/axl.jpg", year: "1985" },
  { name: "Slash", role: "Guitarra Líder", img: "/slash.jpg", year: "1985" },
  { name: "Duff McKagan", role: "Bajo", img: "/duff.jpg", year: "1985" },
  { name: "Dizzy Reed", role: "Teclados", img: "/dizzy.jpg", year: "1990" },
  { name: "Richard Fortus", role: "Guitarra Rítmica", img: "/fortus.jpg", year: "2002" },
  { name: "Isaac Carpenter", role: "Batería", img: "/isaac.jpg", year: "2025" },
  { name: "Melissa Reese", role: "Sintetizadores", img: "/melissa.jpg", year: "2016" },
];

const classicMembers = [
  { name: "Izzy Stradlin", role: "Fundador / Guitarra", img: "/izzy.jpg", year: "1985 - 1991" },
  { name: "Steven Adler", role: "Fundador / Batería", img: "/adler.jpg", year: "1985 - 1990" },
  { name: "Matt Sorum", role: "Batería", img: "/sorum.jpg", year: "1990 - 1997" },
  { name: "Gilby Clarke", role: "Guitarra", img: "/gilby.jpg", year: "1991 - 1994" },
  { name: "Buckethead", role: "Guitarra", img: "/buckethead.jpg", year: "2000 - 2004" },
  { name: "Robin Finck", role: "Guitarra", img: "/robin.jpg", year: "1997 - 2008" },
  { name: "Ron Thal", role: "Guitarra", img: "/ron.jpg", year: "2006 - 2014" },
  { name: "Frank Ferrer", role: "Batería", img: "/frank.jpg", year: "2002 - 2025" },
  { name: "DJ Ashba", role: "Guitarra", img: "/ashba.jpg", year: "2009 - 2015" },
  { name: "Tommy Stinson", role: "Bajo", img: "/tommy.jpg", year: "1997 - 2014" },
];

const GrainAtmosphere = () => (
    <div className="fixed inset-0 z-0 pointer-events-none mix-blend-overlay opacity-[0.15]">
        <svg className="w-full h-full">
            <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>
    </div>
);

const TiltCard = ({ member, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const contentX = useTransform(mouseX, [-0.5, 0.5], ["12px", "-12px"]);
  const contentY = useTransform(mouseY, [-0.5, 0.5], ["12px", "-12px"]);
  
  const bgImageX = useTransform(mouseX, [-0.5, 0.5], ["-3%", "3%"]);
  const bgImageY = useTransform(mouseY, [-0.5, 0.5], ["-3%", "3%"]);

  const highlightX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const highlightY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  const highlightGradient = useMotionTemplate`radial-gradient(circle at ${highlightX} ${highlightY}, rgba(255,255,255,0.2) 0%, transparent 60%)`;

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
      style={{ perspective: 1200 }} 
      className="relative h-120 w-full z-10"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative h-full w-full rounded-xl bg-zinc-900 border border-white/10 overflow-hidden shadow-2xl"
      >
        <motion.div 
            style={{ x: bgImageX, y: bgImageY, scale: 1.15 }} 
            className="absolute inset-0 transform-gpu pointer-events-none"
        >
            <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover object-[center_top] grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
             <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-700" />
        </motion.div>

        <motion.div
           style={{ background: highlightGradient, transform: "translateZ(1px)" }}
           className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay z-20 rounded-xl"
        />
        
        <motion.div 
            style={{ 
                x: contentX, 
                y: contentY,
                transform: "translateZ(50px)" 
            }} 
            className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none z-30"
        >
            {member.year && (
                <div className="absolute right-10 bottom-28 opacity-[0.6] mix-blend-overlay font-gnr text-6xl text-transparent bg-clip-text bg-linear-to-b from-white to-transparent select-none w-55"
                     style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}>
                    {member.year}
                </div>
            )}
            
            <div className="relative z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white font-gnr text-5xl leading-[0.8] mb-3 drop-shadow-lg">
                    {member.name}
                </h3>
                
                <div className="h-0.5 w-12 bg-yellow-500 mb-3 overflow-hidden rounded-full">
                    <div className="h-full bg-yellow-500 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                </div>

                <p className="text-zinc-300 font-mono text-xs tracking-[0.2em] uppercase opacity-80 group-hover:text-white transition-colors">
                    {member.role}
                </p>
            </div>
        </motion.div>

         <div className="absolute inset-0 border-2 border-yellow-500/0 group-hover:border-yellow-500/40 transition-all duration-500 rounded-xl z-40 pointer-events-none"></div>
      </motion.div>
    </motion.div>
  );
};

function Integrantes() {
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
      const finalSize = "35% auto";

      tl.fromTo(logoMaskRef.current,
        { maskSize: initialSize, webkitMaskSize: initialSize },
        { maskSize: finalSize, webkitMaskSize: finalSize, ease: "power2.out", duration: 1 },
        0
      );

      tl.fromTo(realLogoRef.current,
        { backgroundSize: initialSize },
        { backgroundSize: finalSize, ease: "power2.out", duration: 1 },
        0
      );

      tl.fromTo(realLogoRef.current,
        { opacity: 0 },
        { opacity: 1, ease: "power1.inOut", duration: 0.7 },
        0.7
      );

      tl.to(textRef.current,
        { opacity: 0, y: -50, scale: 0.9, ease: "power1.in", duration: 0.4 },
        0
      );
    }, mainContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainContainerRef} className="bg-zinc-950 min-h-screen relative selection:bg-yellow-500 selection:text-black">
      <GrainAtmosphere />
      <Navbar />
      
      <main className="relative z-10">
        
        <section
          ref={heroRef}
          className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-zinc-900"
        >
          <div
            ref={logoMaskRef}
            className="absolute inset-0 z-10 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/alineacion.jpg')",
              maskImage: "url('/logo_afd.png')",
              WebkitMaskImage: "url('/logo_afd.png')",
              maskPosition: "center center",
              WebkitMaskPosition: "center center",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          >
            <div className="w-full h-full bg-black/40"></div>
          </div>

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
            className="absolute z-50 flex flex-col items-center justify-center text-center px-4 pointer-events-none mt-10"
          >
             <h1 className="font-gnr text-6xl md:text-9xl text-white transition hover:text-yellow-500 drop-shadow-2xl mb-4 anima">
              ALINEACIÓN
            </h1>
            <p className="text-yellow-500 font-mono text-sm tracking-[0.4em] uppercase animate-pulse">
              Desliza hacia abajo para explorar
            </p>
              <img
                src="/keep-scrolling.svg"
                alt="flecha"
                className="invert mt-12 animate-bounce w-12"
              />
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-zinc-950 to-transparent z-40"></div>
        </section>

        <div className="relative z-40 bg-zinc-950 pb-32">
             
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[10%] left-[-10%] w-125 h-125 bg-red-900 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[20%] right-[-10%] w-150 h-150 bg-yellow-900 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative max-w-350 mx-auto px-6 md:px-12 pt-20">
                
                <div className="text-center mb-16 relative">
                    <span className="text-yellow-500 font-mono text-xs tracking-[0.3em] uppercase block mb-3">Miembros Actuales</span>
                    <h2 className="text-white font-gnr text-6xl md:text-8xl">La Banda</h2>
                    <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6"></div>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {currentMembers.map((member, index) => (
                        <div key={index} className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(25%-1.5rem)] min-w-70 max-w-100">
                            <TiltCard member={member} index={index} />
                        </div>
                    ))}
                </div>

                <div className="py-32 flex flex-col items-center justify-center opacity-30">
                     <div className="h-px w-full max-w-md bg-linear-to-r from-transparent via-white to-transparent"></div>
                </div>

                <div className="text-center mb-16 relative">
                    <span className="text-zinc-500 font-mono text-xs tracking-[0.3em] uppercase block mb-3">Miembros que ya no forman parte de GN'R</span>
                    <h2 className="text-zinc-300 font-gnr text-6xl md:text-7xl">Miembros Anteriores</h2>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {classicMembers.map((member, index) => (
                        <div key={index} className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(25%-1.5rem)] min-w-70 max-w-100">
                            <TiltCard member={member} index={index} />
                        </div>
                    ))}
                </div>

            </div>
        </div>

        <Footer /> 
      </main>
    </div>
  );
}

export default Integrantes;