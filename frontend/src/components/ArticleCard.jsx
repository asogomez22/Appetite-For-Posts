import { Link } from "react-router-dom";

function ArticleCard({ titulo, descripcion, img, id }) {
  return (
    <article className="group relative flex flex-col w-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden transition-all duration-500 hover:border-yellow-500/50 hover:-translate-y-2 shadow-2xl">
      
      <div className="relative h-52 w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
        <img 
          src={img} 
          alt={titulo} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"  
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col p-6 grow">
        <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-yellow-500 transition-colors duration-300 line-clamp-2 uppercase tracking-tight">
          {titulo}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 font-light">
          {descripcion}
        </p>

        {/* Botón Estilizado */}
        <Link
          to={`/articulo/${id}`}
          className="relative mt-auto inline-flex items-center justify-center overflow-hidden px-6 py-3 font-bold text-white transition duration-300 ease-out border-2 border-yellow-500 rounded-lg shadow-md group/btn"
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-300 -translate-x-full bg-yellow-500 group-hover/btn:translate-x-0 ease">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="Arrow-right"></path>
              <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-yellow-500 transition-all duration-300 transform group-hover/btn:translate-x-full ease">
            Leer Post
          </span>
          <span className="relative invisible">Leer Post</span>
        </Link>
      </div>

      {/* Brillo sutil en el borde (Glow) al hacer hover */}
      <div className="absolute inset-0 rounded-xl border border-yellow-500/0 group-hover:border-yellow-500/50 pointer-events-none transition-all duration-500 shadow-[0_0_30px_rgba(234,179,8,0.05)]" />
    </article>
  );
}

export default ArticleCard;