import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar2";
import Footer from "../components/Footer";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import PageContainer from "../components/PageContainer"; 

function DetalleArticulo() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => setArticle(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!article)
    return <p className="text-center text-white">Cargando artículo...</p>;

  const processedContent = article.body.replace(
    /\[\[(.*?)\]\]/g,
    "[$1](__custom_span)"
  );

  return (
    <>
      <Navbar />
      <PageContainer>
      <div className="bg-[#161515ff]">
                <section
                    className="relative h-screen w-full bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${article.img}')` }}
                >
          <div className="absolute inset-0 bg-linear-to-t from-[#161515ff] to-[#161515ff]/20"></div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="leading-tight text-6xl sm:text-7xl md:text-8xl font-gnr mt-24 mb-10 transition hover:text-yellow-500">
                {article.title}
              </h1>
            </div>
          </div>
        </section>

        <div className="mt-20 relative w-full py-4 md:py-6 bg-yellow-500  text-black z-20 overflow-hidden border-y-4 border-black mb-12 ">
          <motion.div
            className="flex w-fit will-change-transform "
            animate={{ x: "-50%" }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(4)].map((_, i) => (
                  <span
                    key={i}
                    className="tracking-wide text-2xl md:text-5xl font-black px-8 flex items-center gap-4 uppercase"
                  >
                    {article.description}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex flex-col text-center items-center">
          <div className="prose prose-invert w-full max-w-4xl text-left font-serif items-center">
            <ReactMarkdown
              components={{
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-3xl text-yellow-500 font-bold mt-8 mb-4 border-b border-gray-700 pb-2"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-2xl text-yellow-500 font-semibold mt-6 mb-3"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="mb-4 text-gray-300 leading-relaxed"
                    {...props}
                  />
                ),
                a: ({ node, href, children, ...props }) => {
                  if (href === "__custom_span") {
                    return (
                      <span className="text-yellow-500 font-bold">
                        {children}
                      </span>
                    );
                  }
                  return (
                    <a
                      href={href}
                      className="text-blue-400 hover:underline"
                      {...props}
                    >
                      {children}
                    </a>
                  );
                },
              }}
            >
              {processedContent}
            </ReactMarkdown>
          </div>
          <div>
            <button className="m-10 text-md bg-yellow-500 text-black font-bold px-8 py-4 rounded hover:bg-yellow-600 transition duration-200 w-full sm:w-auto">
              <a href="/articulos">Leer más posts</a>
            </button>
          </div>
          
        </div>
      </div>
        </PageContainer>



      <Footer />
    </>
  );
}

export default DetalleArticulo;
