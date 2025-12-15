import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import SeccionDeArticulo from "../components/SeccionDeArticuloConBuscador"
import ArticleCard from '../components/ArticleCard';
import Hero from "../components/Hero";
import { useEffect, useState } from "react";



function WhatIf() {

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
      <Hero nombre="What If?" />
      <div>
        
        <SeccionDeArticulo tituloSeccion="" boton={false} searchValue={search} onSearch={setSearch}>
          {articles
            .filter((article) => article.section === "whatif")
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
              <ArticleCard titulo={article.title} id={article.id} descripcion={article.description} img={article.img} body={article.body} seccion={article.section} key={article.id} />
            ))}
        </SeccionDeArticulo>
      </div>
      <Footer />

    </>
  )
}

export default WhatIf
