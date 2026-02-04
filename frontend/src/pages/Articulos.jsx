
import Navbar from "../components/NavbarHero";
import Footer from "../components/Footer";
import SeccionDeArticulo from "../components/SeccionDeArticulo";
import ArticleCard from "../components/ArticleCard";
import Hero from "../components/Hero";
import { useEffect, useState } from "react";

function Articulo() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/articles/")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
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
      <Hero nombre="Artículos" />
      <div>

        <SeccionDeArticulo tituloSeccion="What If?" url = "whatif">
          {articles.filter(article => article.section === 'whatif').sort((a, b) => b.id - a.id).slice(0,3).map((article) => (
            <ArticleCard titulo={article.title} descripcion={article.description} img={article.img} body={article.body} seccion={article.section} id={article.id} key={article.id} />
          ))}
        </SeccionDeArticulo> 
        
        <SeccionDeArticulo tituloSeccion="Entrevistas" url = "entrevistas">
          {articles.filter(article => article.section === 'entrevistas').sort((a, b) => b.id - a.id).slice(0,3).map((article) => (
            <ArticleCard titulo={article.title} descripcion={article.description} img={article.img} body={article.body} seccion={article.section}  id={article.id}  key={article.id} />
          ))}
        </SeccionDeArticulo>

        <SeccionDeArticulo tituloSeccion="Discografía" url = "discografia">
          {articles.filter(article => article.section === 'discografia').sort((a, b) => b.id - a.id).slice(0,3).map((article) => (
            <ArticleCard titulo={article.title} descripcion={article.description} img={article.img} body={article.body} seccion={article.section}  id={article.id}  key={article.id} />
          ))}
        </SeccionDeArticulo> 

      </div>
      <Footer />
    </>
  );
}

export default Articulo;
