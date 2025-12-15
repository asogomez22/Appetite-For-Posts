import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SeccionDeArticulo from "../components/SeccionDeArticulo";
import ArticleCard from "../components/ArticleCard";
import SeccionDeContacto from "../components/SeccionDeContacto";

function Home() {
  const [articles, setArticles] = useState([]);

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
      <main>
        <section
          className="relative h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        >
        <div className="absolute inset-0 bg-linear-to-t from-[#161515ff]/99 to-[#161515ff]/5"></div>

          <div className="relative z-10 flex items-center justify-center h-full text-white text-center px-4  ">
            <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-widest font-gnr leading-tight transition hover:text-yellow-500">
              Artículos, historias y novedades sobre <br />
              <span className="text-yellow-500 text-6xl sm:text-7xl md:text-8xl lg:text-9xl block mt-4 transition hover:text-shadow-black text-shadow-[20px]">
                Guns N' Roses
              </span>
            </h1>
          </div>
        </section>

        <SeccionDeArticulo tituloSeccion="Noticias">
          {articles
            .filter((article) => article.section === "noticias")
            .slice(0, 3)
            .map((article) => (
              <ArticleCard
                titulo={article.title}
                descripcion={article.description}
                img={article.img}
                body={article.body}
                id={article.id}
                seccion={article.section}
                key={article.id}
              />
            ))}
        </SeccionDeArticulo>

        <SeccionDeArticulo tituloSeccion="Entrevistas" bg="">
          {articles
            .filter((article) => article.section === "entrevistas")
            .slice(0, 3)
            .map((article) => (
              <ArticleCard
                titulo={article.title}
                descripcion={article.description}
                img={article.img}
                body={article.body}
                id={article.id}
                seccion={article.section}
                key={article.id}
              />
            ))}
        </SeccionDeArticulo>

        <SeccionDeArticulo tituloSeccion="What If?">
          {articles
            .filter((article) => article.section === "whatif")
            .slice(0, 3)
            .map((article) => (
              <ArticleCard
                titulo={article.title}
                descripcion={article.description}
                img={article.img}
                body={article.body}
                id={article.id}
                seccion={article.section}
                key={article.id}
              />
            ))}
        </SeccionDeArticulo>

        <Footer />
      </main>
    </>
  );
}

export default Home;
