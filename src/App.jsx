import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { FilterContext } from './context/filters.jsx';
import { Cart } from './components/Cart.jsx';
import { CartProvider } from './context/cart.jsx';
import { Init } from './components/init.jsx';
import { WeekRecomended } from './components/weekrecomended.jsx';
import { SelectionTop } from './components/selecciontop.jsx';
import { FooterReal } from './components/footerReal.jsx';
import { Blog } from './components/blog.jsx';
// Importa los componentes para las nuevas rutas
import { Products } from './components/pages/products.jsx';
import { Intercambios } from './components/pages/exchanges.jsx';
import { Foro } from './components/pages/forum.jsx';
import { Contact } from './components/pages/contact.jsx';
import { AboutUs } from './components/pages/aboutUs.jsx';
import { ScreensBlog } from './components/blogPages/screensBlog.jsx'; 
import { Placabase } from './components/blogPages/placabase.jsx';
import { Tipoteclado } from './components/blogPages/tipoteclado.jsx';

function App() {
  const { filters, setFilters } = useContext(FilterContext);

  return (
    <CartProvider>
      <Router>
        <Header changeFilters={setFilters} />
        <Routes>
         <Route path="/contacto" element={<Contact />} />
         <Route path="/nosotros" element={<AboutUs />} />
         <Route path="/foro" element={<Foro />} />
         <Route path="/intercambios" element={<Intercambios />} />
         <Route path="/screens" element={<ScreensBlog />} />
         <Route path="/placa" element={<Placabase />} />
          <Route path="/tipoteclado" element={<Tipoteclado />} />
         <Route path="/productos" element={<Products />} />
         <Route path="/" element={
           <>
             <Init />
             <SelectionTop />
             <WeekRecomended />
             <Blog />
           </>
         } />
        </Routes>
        <Footer />
        <FooterReal />
      </Router>
    </CartProvider>
  );
}

export default App;