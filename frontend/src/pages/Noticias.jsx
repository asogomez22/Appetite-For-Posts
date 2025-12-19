import Navbar from "../components/NavbarHero"
import Footer from "../components/Footer"
import SeccionDeArticulo from "../components/SeccionDeArticuloConBuscador"
import ArticleCard from '../components/ArticleCard';
import Hero from "../components/Hero";
import { useEffect, useState } from "react";

function Noticias() {

  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  
  // Fetch inicial
  useEffect(() => {
    fetch("http://localhost:8000/api/articles/")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error(err));
  }, []);
  
  // WebSocket para tiempo real
  useEffect(() => {
    // Asegúrate de que tu backend soporte WS en esta ruta, si no, puedes quitar este useEffect
    const ws = new WebSocket("ws://localhost:8000/ws/articles");
    ws.onmessage = (event) => {
      const newArticle = JSON.parse(event.data);
      setArticles((prev) => [...prev, newArticle]);
    };
    return () => ws.close();
  }, []);
  

  return (
    <>
      <Navbar />
      <Hero nombre="Noticias" />
      <div>
        <SeccionDeArticulo tituloSeccion="" boton={false} searchValue={search} onSearch={setSearch}>
          {articles
            .filter((article) => article.section === "noticias")
            .filter((article) => {
              if (!search) return true;
              const s = search.toLowerCase();
              return (
                (article.title && article.title.toLowerCase().includes(s)) ||
                (article.description && article.description.toLowerCase().includes(s)) ||
                (article.body && article.body.toLowerCase().includes(s))
              );
            })
            .sort((a, b) => b.id - a.id)
            .map((article) => (
              <ArticleCard 
                key={article.id}          // Para uso interno de React
                id={article.id}           // <--- CORRECCIÓN AQUÍ: Pasamos el ID como prop
                titulo={article.title} 
                descripcion={article.description} 
                img={article.img} 
                body={article.body} 
                seccion={article.section} 
              />
            ))}
        </SeccionDeArticulo>
      </div>
      <Footer />
    </>
  )
}

export default Noticias