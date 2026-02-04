import { useParams, Link } from "react-router-dom"; 
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#161515ff] text-white">
        <p className="animate-pulse text-xl">Cargando artículo...</p>
      </div>
    );

  const processedContent = article.body.replace(
    /\[\[(.*?)\]\]/g,
    "[$1](__custom_span)"
  );

  return (
    <>
      <Navbar />
      <PageContainer>
        <div className="bg-[#161515ff] min-h-screen pb-20">
          
          
          <section
            className="relative w-full h-[60vh] md:h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${article.img}')` }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-[#161515ff] via-[#161515ff]/40 to-transparent"></div>

            <div className="relative z-10 flex flex-col items-center justify-end md:justify-center h-full text-white text-center px-4 pb-12 md:pb-0">
              <div className="max-w-5xl mx-auto">
                <h1 className="leading-tight text-7xl sm:text-6xl md:text-8xl font-gnr mb-4 md:mb-10 transition hover:text-yellow-500 drop-shadow-lg">
                  {article.title}
                </h1>
              </div>
            </div>
          </section>

          <div className="relative w-full py-3 md:py-6 bg-yellow-500 text-black z-20 overflow-hidden border-y-4 border-black mb-12 shadow-lg">
            <motion.div
              className="flex w-fit will-change-transform"
              animate={{ x: "-50%" }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              {[0, 1].map((key) => (
                <div key={key} className="flex whitespace-nowrap shrink-0">
                  {[...Array(4)].map((_, i) => (
                    <span
                      key={i}
                      className="tracking-wide text-xl md:text-4xl font-black px-4 md:px-8 flex items-center gap-4 uppercase"
                    >
                      {article.description} •
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex flex-col items-center px-4 sm:px-6 md:px-0">
            <div className="prose prose-invert prose-sm sm:prose-base md:prose-lg w-full max-w-3xl text-left font-serif">
              <ReactMarkdown
                components={{
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-2xl md:text-3xl text-yellow-500 font-bold mt-8 mb-4 border-b border-gray-700 pb-2 leading-snug"
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      className="text-xl md:text-2xl text-yellow-500 font-semibold mt-6 mb-3"
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      className="mb-4 text-gray-300 leading-relaxed text-base md:text-lg"
                      {...props}
                    />
                  ),
                  img: ({ node, ...props }) => (
                    <img 
                       className="rounded-xl shadow-lg border border-gray-700 my-6 w-full"
                       loading="lazy"
                       {...props} 
                    />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-yellow-500 pl-4 italic text-gray-400 my-6" {...props} />
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
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-500 hover:text-white underline decoration-yellow-500/50 hover:decoration-white transition-all"
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

            <div className="mt-16 mb-8 w-full flex justify-center">
              <Link 
                to="/articulos"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black transition-all duration-200 bg-yellow-500 font-pj rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 border-2 border-yellow-500 hover:bg-transparent hover:text-yellow-500 w-full sm:w-auto text-center"
              >
                Leer más posts
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
      <Footer />
    </>
  );
}

export default DetalleArticulo;