import { useContext,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { FilterContext } from './context/filters.jsx';
import { Cart } from './components/Cart.jsx';
import { CartProvider } from './context/cart.jsx';
import { Init } from './components/init.jsx';
import {Contest} from './components/pages/contest.jsx';
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
import { ErgonomicChairs } from './components/blogPages/sillasErgonomicas.jsx';
import { ProductDetail } from './components/productDetails/productDetail.jsx'; 
import { ProductDetailWeekRecomended } from './components/productDetails/productDetailWeekRecomended.jsx';
import { ProductGender } from './components/productGender/productGender.jsx';
// Importación de la página de inicio de sesión
import { LoginPage } from './components/pages/login.jsx';
//importaciones del footer
import { HowToBuy } from './components/pages/footerPages/howBuy.jsx';
import { WaysToPay } from './components/pages/footerPages/waysToPay.jsx';
import { ShippingCosts } from './components/pages/footerPages/shippingCosts.jsx';
import {AvisoLegal} from './components/pages/footerPages/avisoLegal.jsx';
import { Privacidad } from './components/pages/footerPages/privacidad.jsx';
import { Devoluciones } from './components/pages/footerPages/devoluciones.jsx';
import { Cookies } from './components/pages/footerPages/cookies.jsx';
import { Reclamaciones } from './components/pages/footerPages/reclamaciones.jsx';
  
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <FooterReal />
    </>
  );
}

function App() {
  const { filters, setFilters } = useContext(FilterContext);

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Routes>
         <Route path="/login" element={<LoginPage />} />
         <Route path="*" element={
           <Layout>
             <Routes>
               <Route path="/concurso" element={<Contest />} />
               <Route path="/contacto" element={<Contact />} />
               <Route path="/nosotros" element={<AboutUs />} />
               <Route path="/foro" element={<Foro />} />
               <Route path="/intercambios" element={<Intercambios />} />
               <Route path="/screens" element={<ScreensBlog />} />
               <Route path="/placa" element={<Placabase />} />
               <Route path="/tipoteclado" element={<Tipoteclado />} />
               <Route path="/todosproductos" element={<Products />} />
               <Route path="/sillasergonomicas" element={<ErgonomicChairs />} />
               <Route path="/productos/:Id_producto" element={<ProductDetail />} /> 
               <Route path="/productos/recomendados/:Id_producto" element={<ProductDetailWeekRecomended />} />
               <Route path="/productos/genero/:Genero" element={<ProductGender />} />
               {/*Rutas del footer*/}
               <Route path="/como-comprar" element={<HowToBuy />} />
               <Route path="/formas-de-pago" element={<WaysToPay />} />
               <Route path="/gastos-de-envio" element={<ShippingCosts />} />
                <Route path="/aviso-legal" element={<AvisoLegal />} />
                <Route path="/politica-de-privacidad" element={<Privacidad />} />
                <Route path="/devoluciones" element={<Devoluciones />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/reclamaciones" element={<Reclamaciones />} />
               <Route path="/" element={
                 <>
                   <Init />
                   <SelectionTop />
                   <WeekRecomended />
                   <Blog />
                 </>
               } />
             </Routes>
           </Layout>
         } />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;