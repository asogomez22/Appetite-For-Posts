function SeccionDeArticulo({ children, tituloSeccion = "Articulo", bg = "1", url, boton = true }) {
  let bgClass = bg === "2" ? "#2c2b1fff" : "#161515ff";

  return (
    <div  style={{ backgroundColor: bgClass }} className={`pt-10 flex justify-center items-center pb-16`}>
      <div className="pt-8 text-white w-[90vw] text-center">
        
        <div className="flex flex-col">
          
          <h3 className="text-6xl md:text-7xl lg:text-8xl font-gnr hover:text-yellow-500 transition">
            {tituloSeccion}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-10 pb-10 justify-items-center">
            {children}
          </div>
          <div className="w-full flex justify-center mt-10">
            {boton && (
              <button className="text-md bg-yellow-500 text-black font-bold px-8 py-4 rounded hover:bg-yellow-600 transition duration-200 w-full sm:w-auto">
                <a href={url}>Ver más posts de '{tituloSeccion}'</a>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeccionDeArticulo;
