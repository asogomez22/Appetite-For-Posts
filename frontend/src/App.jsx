import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css'
import Home from './pages/Home';
import Contacto from './pages/Contacto';
import Articulo from './pages/Articulos';
import Noticias from './pages/Noticias';
import UserBox from './components/UserBox';
import WhatIf from './pages/WhatIf';
import Discografia from './pages/Discografia';
import Entrevistas from './pages/Entrevistas';
import ArticuloDetalle from './pages/ArticuloDetalle';
import DetalleArticulo from './pages/ArticuloDetalle';
import SobreLaBanda from './pages/Formacion';
import Integrantes from './pages/Integrantes';
import Albumes from './pages/Albumes';


function App() {
  const [articles, setArticles] = useState([])
  useEffect (() => {
    fetch('http://localhost:8000/api/articles/')
    .then(res => res.json())
    .then(res => setArticles(res))
  }, [])
  
  return (
    <>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/articulos" element={<Articulo />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/whatif" element={<WhatIf />} />
            <Route path="/discografia" element={<Discografia />} />
            <Route path="/entrevistas" element={<Entrevistas />} />
            <Route path="/articulo/:id" element={<DetalleArticulo />} />         
            <Route path="/sobregnr" element={<SobreLaBanda />} />   
            <Route path="/integrantes" element={<Integrantes />} />               
            <Route path="/albumes" element={<Albumes />} />               
          </Routes>
        </Router>
      </main>

    </>
  );
}

export default App;
