import React, { useState } from 'react'; // 1. Importante: importar React

function SeccionDeArticulo({ children, tituloSeccion = "Articulo", bg = "1", url, boton = true }) {
  // Estado para el texto que escribes en el input
  const [textoInput, setTextoInput] = useState("");
  // Estado para el filtro que realmente se aplica (al dar click o enter)
  const [filtroAplicado, setFiltroAplicado] = useState("");

  let bgClass = bg === "2" ? "#2c2b1fff" : "#161515ff";

  // Función que activa el filtro
  const realizarBusqueda = () => {
    setFiltroAplicado(textoInput);
  };

  const manejarKeyDown = (e) => {
    if (e.key === 'Enter') {
      realizarBusqueda();
    }
  };

  // --- LÓGICA DE FILTRADO ---
  // Convertimos los children en un array y filtramos
  const articulosFiltrados = React.Children.toArray(children).filter((child) => {
    // Si no hay filtro, mostramos todo
    if (!filtroAplicado) return true;

    // AQUI ESTA LA CLAVE: Buscamos en las props del hijo. 
    // Intenta leer 'titulo' o 'title'. Asegúrate que tus componentes hijos tengan esa prop.
    const tituloArticulo = child.props.titulo || child.props.title || "";
    
    // Verificamos si el título incluye el texto buscado (ignorando mayúsculas/minúsculas)
    return tituloArticulo.toString().toLowerCase().includes(filtroAplicado.toLowerCase());
  });

  return (
    <div style={{ backgroundColor: bgClass }} className={`pt-10 flex justify-center items-center pb-16`}>
      <div className="pt-8 text-white w-[90vw] text-center">

        {/* Barra de Búsqueda */}
        <div className="bg-gray-950 font-serif flex px-2 py-2 rounded-full border-3 border-yellow-500 overflow-hidden max-w-md mx-auto mb-4">
          <input 
            type='text'
            placeholder='Busca articulos' 
            className="w-full outline-none pl-4 text-sm bg-transparent text-white placeholder-gray-400" 
            value={textoInput}
            onChange={(e) => setTextoInput(e.target.value)}
            onKeyDown={manejarKeyDown}
          />
          <button 
            type='button'
            onClick={realizarBusqueda}
            className="bg-yellow-500 hover:bg-yellow-700 transition-all text-white text-sm rounded-full px-5 py-1.5">
            Search
          </button>
        </div>

        <div className="flex flex-col">
          <h3 className="text-6xl md:text-7xl lg:text-8xl font-gnr hover:text-yellow-500 transition">
            {tituloSeccion}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-10 pb-10 justify-items-center">
            {/* AQUI MOSTRAMOS LA LISTA FILTRADA EN LUGAR DE 'children' DIRECTAMENTE */}
            {articulosFiltrados.length > 0 ? (
              articulosFiltrados
            ) : (
              <p className="col-span-full text-gray-400 text-xl">No se encontraron artículos que coincidan con lo que esta buscando</p>
            )}
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