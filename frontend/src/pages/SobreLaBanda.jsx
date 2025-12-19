    import { useLayoutEffect, useEffect, useState, useRef } from "react";
    import Navbar from "../components/NavbarHero";
    import Footer from "../components/Footer";
    import SeccionDeArticulo from "../components/SeccionDeArticulo";
    import ArticleCard from "../components/ArticleCard";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";

    gsap.registerPlugin(ScrollTrigger);

    function SobreLaBanda() {
    
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
                className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center text-center px-4 pointer-events-none"
                >
                <h1 className="text-white mt-30 text-4xl sm:text-6xl md:text-9xl tracking-widest font-gnr leading-tight drop-shadow-2xl">
                    Formación clásica
                </h1>
                
                <img 
                    src="/gnfr.png" 
                    alt="Guns N' Roses Logo" 
                    className="w-100 h-auto -mt-20 drop-shadow-xl" 
                />
                </div>
            </div>
            <div className="h-32 bg-linear-to-t from-[#161515ff] to-black"></div>
            <div className="flex flex-row h-screen">
                <div className="flex flex-1 justify-center items-center">
                    <img 
                    src="axl.png" 
                    alt="Axl" 
                    className="h-110 mt-20 object-contain [mask-image:linear-gradient(to_top,transparent,black_50%)]"
                    />            </div>
                <div className="flex flex-1/5">
                    <div className="mt-40">
                    <h2 className="font-serif text-6xl font-semibold text-white">
                            Axl Rose | Voz
                        </h2>
                        <p className="text-white font-serif mt-10 max-w-150">
                            W. Axl Rose es la voz inconfundible y la fuerza creativa detrás de <span className="text-yellow-500">Guns N' Roses</span>. Con un rango vocal asombroso y una presencia escénica electrizante, Axl se consolidó como el frontman definitivo de su generación. Es el arquitecto lírico de himnos inmortales como <span className="text-yellow-500">“Sweet Child O' Mine”</span> y el genio detrás de la ambición épica de <span className="text-yellow-500">“November Rain”</span>. <br /><br /> Su perfeccionismo y pasión indomable mantuvieron vivo el legado de la banda a través de las décadas y el complejo <span className="text-yellow-500">“Chinese Democracy”</span>. Tras la histórica reunión, ha demostrado por qué es considerado uno de los mejores cantantes de la historia, liderando con carisma la <span className="text-yellow-500">leyenda viva</span> del rock and roll.                    </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row h-screen">
                <div className="flex flex-1 justify-center items-center">
                    <img 
                    src="slash.png" 
                    alt="Slash" 
                    className="h-110 mt-20 object-contain [mask-image:linear-gradient(to_top,transparent,black_50%)]"
                    />            </div>
                <div className="flex flex-1/5">
                    <div className="mt-40">
                    <h2 className="font-serif text-6xl font-semibold text-white">
                            Slash | Guitarra Solista
                        </h2>
                        <p className="text-white font-serif mt-10 max-w-150">
                            Saul Hudson es el alma melódica de <span className="text-yellow-500">Guns N' Roses</span> y un ícono absoluto de la cultura rock. Con su inconfundible sombrero de copa y su fiel Gibson Les Paul, Slash ha creado los riffs y solos más memorables de la historia, desde la electricidad de <span className="text-yellow-500">“Welcome to the Jungle” </span>hasta la elegancia épica de <span className="text-yellow-500">“November Rain”</span>. <br /><br /> Su estilo, que fusiona la crudeza del blues con una técnica impecable, definió el sonido de una generación. Tras su regreso en 2016, reafirmó su estatus como el <span className="text-yellow-500"> "Guitar Hero"</span> definitivo de la banda más peligrosa del mundo.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-row h-screen">
                <div className="flex flex-1 justify-center items-center">
                    <img 
                    src="duff.png" 
                    alt="Duff Mckagan" 
                    className="h-110 mt-20 object-contain [mask-image:linear-gradient(to_top,transparent,black_50%)]"
                    />            </div>
                <div className="flex flex-1/5">
                    <div className="mt-40">
                    <h2 className="font-serif text-6xl font-semibold text-white">
                            Duff McKagan | Bajo
                        </h2>
                        <p className="text-white font-serif mt-10 max-w-150">
                            Duff McKagan es el pilar rítmico y la esencia punk de <span className="text-yellow-500">Guns N' Roses</span>. Como el bajista de la formación clásica, su estilo directo y melódico ha sido el motor de canciones emblemáticas como <span className="text-yellow-500">“It’s So Easy”</span> y la potencia imparable detrás de <span className="text-yellow-500">“You Could Be Mine”</span>. <br /><br /> Con su actitud inquebrantable y su sonido metálico característico, Duff aportó la crudeza del underground al éxito masivo de la banda. Su regreso en 2016 devolvió el latido original al grupo, consolidándose como el equilibrio perfecto y la base sólida sobre la que se apoya la <span className="text-yellow-500">leyenda rítmica</span>.                    </p>
                    </div>
                </div>
            </div>
                    <div className="flex flex-row h-screen">
                <div className="flex flex-1 justify-center items-center">
                    <img 
                    src="izzy.png" 
                    alt="Izzy" 
                    className="h-110 mt-20 object-contain [mask-image:linear-gradient(to_top,transparent,black_50%)]"
                    />            </div>
                <div className="flex flex-1/5">
                    <div className="mt-40">
                    <h2 className="font-serif text-6xl font-semibold text-white">
                            Izzy Stradlin | Guitarra Rítmica
                        </h2>
                        <p className="text-white font-serif mt-10 max-w-150">
                            Izzy Stradlin es el motor silencioso y el corazón compositivo detrás de los años dorados de <span className="text-yellow-500">Guns N' Roses</span>. Como cofundador y arquitecto de gran parte de su sonido, Izzy aportó el "groove" y la mística del rock and roll clásico a canciones inmortales como <span className="text-yellow-500">“Patience”</span> y el ritmo sucio y adictivo de <span className="text-yellow-500">“Mr. Brownstone”</span>. <br /><br /> Su estilo relajado pero preciso y su visión artística fueron fundamentales para equilibrar el caos de la banda en su cima. Aunque su camino tomó un rumbo solitario en 1991, su legado como el compositor fundamental de <span className="text-yellow-500">“Appetite for Destruction”</span> y los <span className="text-yellow-500">“Use Your Illusion”</span> sigue siendo la base sobre la que se construyó el mito.                    </p>
                    </div>
                </div>
            </div>
                    <div className="flex flex-row h-screen">
                <div className="flex flex-1 justify-center items-center">
                    <img 
                    src="adler.png" 
                    alt="Adler" 
                    className="h-110 mt-20 object-contain [mask-image:linear-gradient(to_top,transparent,black_50%)]"
                    />            </div>
                <div className="flex flex-1/5">
                    <div className="mt-40">
                    <h2 className="font-serif text-6xl font-semibold text-white">
                            Steven Adler | Batería
                        </h2>
                        <p className="text-white font-serif mt-10 max-w-150">
    Steven Adler es el latido original y la energía pura de <span className="text-yellow-500">Guns N' Roses</span>. Conocido por su inconfundible "swing" y su estilo cargado de groove, la batería de Steven fue el motor rítmico que impulsó la furia de <span className="text-yellow-500">“Welcome to the Jungle”</span> y el ritmo festivo de <span className="text-yellow-500">“Paradise City”</span>. <br /><br /> Su forma de tocar, orgánica y llena de sentimiento, definió el sonido único y peligroso del álbum debut más vendido de la historia: <span className="text-yellow-500">“Appetite for Destruction”</span>. Aunque su camino con el grupo terminó en 1990, su legado como el responsable de darle ese toque de caos y alegría rítmica a la <span className="text-yellow-500">formación clásica</span> es una pieza eterna en la historia del rock.                    </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
        </div>
    );
    }

    export default SobreLaBanda;