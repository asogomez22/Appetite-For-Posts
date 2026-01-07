import Enlace from "./Enlaces";

function Footer() {
  return (

    <div>
<hr class="h-1 bg-yellow-500 border-0 "/>

<footer className="bg-[#161515ff] text-white py-8 text-center min-h-auto md:min-h-[40vh] flex flex-col justify-center items-center">
  <div className="flex flex-col md:flex-row w-[90vw] items-center gap-y-8 md:gap-y-0 h-full">
    
    <div className="flex-1 w-full md:w-auto">
      <h2 className="text-2xl md:text-4xl font-gnr p-2 md:p-4">Appetite for Posts</h2>
      <p className="font-serif text-sm md:text-base px-4">
        Los posts de este blog son generados por IA,<br className="hidden md:block"/> pueden contener información erronea.
      </p>
              
      <div className="flex flex-wrap gap-4 md:gap-x-8 p-4 text-white justify-center font-gnr text-xl md:text-2xl">
        <Enlace/>
        <Enlace nombre="Articulos" url="/articulos"/>
        <Enlace nombre="Contacto" url="/contacto"/>
      </div>
    </div>


    <div className="w-24 md:w-auto md:basis-1/9 shrink-0 my-4 md:my-0">
      <img src="/logo.png" alt="Logo" className="w-full h-auto object-contain"/>
    </div>

    <div className="flex-1 w-full md:w-auto">
      <h2 className="text-2xl md:text-4xl font-gnr p-2">Links Oficiales</h2>
              
      <nav className="flex flex-wrap gap-4 md:gap-x-8 p-4 text-white justify-center font-gnr text-xl md:text-2xl">
        <Enlace nombre="Instagram" url="https://www.instagram.com/gunsnroses/"/>
        <Enlace nombre="X" url="https://x.com/gunsnroses"/>
        <Enlace nombre="YouTube" url="https://www.youtube.com/channel/UCIak6JLVOjqhStxrL1Lcytw"/>
        <Enlace nombre="Web Oficial" url="https://www.gunsnroses.com/"/>
      </nav>  
    </div>

  </div>


</footer>
</div>
  );
}

export default Footer;
