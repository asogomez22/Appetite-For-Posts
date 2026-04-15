import Navbar from "../components/NavbarHero"
import Footer from "../components/Footer"
import SeccionDeArticulo from "../components/SeccionDeArticuloConBuscador"
import ArticleCard from '../components/ArticleCard';
import Hero from "../components/Hero";
import { useEffect, useState } from "react";
import { fetchArticles, subscribeToArticles } from "../lib/articles";



function Entrevistas() {

    const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  
    useEffect(() => {
      fetchArticles()
        .then((data) => setArticles(data))
        .catch((err) => console.error(err));
    }, []);
  
    useEffect(() => {
      return subscribeToArticles(
        (newArticle) => setArticles((prev) => [...prev, newArticle]),
        (err) => console.error(err)
      );
    }, []);
  

  return (
    <>
    
      <Navbar />
      <Hero nombre="Entrevistas" />
      <div>
        
        <SeccionDeArticulo tituloSeccion="" boton={false} searchValue={search} onSearch={setSearch}>
          {articles
            .filter((article) => article.section === "entrevistas")
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
              <ArticleCard titulo={article.title}  id={article.id}  descripcion={article.description} img={article.img} body={article.body} seccion={article.section} key={article.id} />
            ))}
        </SeccionDeArticulo>
      </div>
      <Footer />

    </>
  )
}

export default Entrevistas
