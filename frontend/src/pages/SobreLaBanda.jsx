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

            tl.fromTo(realLogoRef.current,
                { backgroundSize: initialSize },
                {
                    backgroundSize: finalSize,
                    ease: "power2.out",
                    duration: 1
                },
                0
            );

            tl.fromTo(realLogoRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    ease: "power1.inOut",
                    duration: 0.7
                },
                0.7
            );

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
                            backgroundImage: "url('https://www.rockfm.fm/files/og_thumbnail/uploads/2025/05/23/68308601dd 996.jpeg')",
                            maskImage: "url('/logo.png')",
                            WebkitMaskImage: "url('/logo.png')",
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
                            backgroundImage: "url('/logo.png')",
                            backgroundPosition: "center center",
                            backgroundRepeat: "no-repeat",
                            opacity: 0,
                        }}
                    />

                    <div
                        ref={textRef}
                        className="absolute z-30 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
                    >
                        <h1 className="font-gnr text-6xl md:text-9xl text-white transition hover:text-yellow-500 drop-shadow-2xl">
                            Explora los miembros <br /> fundadores
                        </h1>
                        
                        <img 
                            src="/keep-scrolling.svg" 
                            alt="flecha" 
                            className="invert mt-10 animate-bounce w-12" 
                        />
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-[#161515ff] to-transparent z-40"></div>
                </section>

                <section className="h-screen flex items-center justify-center">
                    <h2 className="text-white text-4xl font-gnr">Aquí comienza la discograf...</h2>
                </section>

                <Footer />
            </main>
        </div>
    );
}

export default SobreLaBanda;
