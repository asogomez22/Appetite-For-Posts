function Hero({nombre = 'Appetite for Posts'}) {
  return (
        <section className='relative h-screen'>
        <img src="2hero2.jpg" alt="Concierto GNR" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-linear-to-t from-[#161515ff]/99 to-[#161515ff]/5"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl -mb-10 font-gnr transition duration-300 ease-in-out hover:text-yellow-500">
            Appetite for Posts
            </h2>
            <h1 className="mt-5 text-7xl sm:text-8xl md:text-9xl lg:text-[200px] font-gnr text-yellow-500 ">
            {nombre}
            </h1>
                          <img
                src="/keep-scrolling.svg"
                alt="flecha"
                className="invert mt-12 animate-bounce w-12"
              />
        </div>
        </section>
  );
}

export default Hero;
