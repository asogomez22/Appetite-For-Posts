
import { Link } from "react-router-dom";

function ArticleCard({ titulo, descripcion, img, id }) {
  return (
    <article className="flex flex-col max-w-sm mx-auto rounded-lg border-3 font-serif border-yellow-500 bg-gray-950 shadow-lg hover:shadow-yellow-500/30 transition duration-300 w-full sm:w-80 group hover:scale-105">
      <div className="h-48 w-full object-cover">
        <img src={img} alt={titulo} className="w-full h-full object-fill rounded-t"  />
      </div>
      <div className="flex flex-col p-4 grow text-white">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{titulo}</h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-3">{descripcion}</p>
        <Link
          to={`/articulo/${id}`}
          className="mt-auto bg-yellow-500 text-black font-bold px-5 py-2 rounded text-sm self-center w-full text-center hover:bg-yellow-600 transition duration-200"
        >
          Leer Post
        </Link>
      </div>
    </article>
  );
}

export default ArticleCard;
