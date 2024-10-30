import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// Contextos
import { CartProvider } from './context/cart.jsx';
import { FilterContext } from './context/filters.jsx';

// Componentes generales
import { Header } from './components/Header.jsx';
import { FooterReal } from './components/footerReal.jsx';

// Componentes de páginas
import { AboutUs } from './components/pages/aboutUs.jsx';
import { Contact } from './components/pages/contact.jsx';
import { Contest } from './components/pages/contest.jsx';
import { Foro } from './components/pages/forum.jsx';
import { Intercambios } from './components/pages/exchanges.jsx';
import { LoginPage } from './components/pages/login.jsx';
import { Pay } from './components/pages/payPage.jsx';
import { Products } from './components/pages/products.jsx';

// Componentes de páginas de blog
import { ErgonomicChairs } from './components/blogPages/sillasErgonomicas.jsx';
import { Placabase } from './components/blogPages/placabase.jsx';
import { ScreensBlog } from './components/blogPages/screensBlog.jsx';
import { Tipoteclado } from './components/blogPages/tipoteclado.jsx';

// Componentes de detalles de productos
import { ProductDetail } from './components/productDetails/productDetail.jsx';
import {AllProductDetail} from './components/productDetails/allProductsDetail.jsx';
import { ProductDetailWeekRecomended } from './components/productDetails/productDetailWeekRecomended.jsx';
import { ProductGender } from './components/productGender/productGender.jsx';
import { ProductAllDetail } from './components/productDetails/productAllDetail.jsx';

// Componentes de la página principal
import { Blog } from './components/blog.jsx';
import { Init } from './components/init.jsx';
import { SelectionTop } from './components/selecciontop.jsx';
import { WeekRecomended } from './components/weekrecomended.jsx';

// Componentes de páginas del footer
import { AvisoLegal } from './components/pages/footerPages/avisoLegal.jsx';
import { Cookies } from './components/pages/footerPages/cookies.jsx';
import { Devoluciones } from './components/pages/footerPages/devoluciones.jsx';
import { HowToBuy } from './components/pages/footerPages/howBuy.jsx';
import { Privacidad } from './components/pages/footerPages/privacidad.jsx';
import { Reclamaciones } from './components/pages/footerPages/reclamaciones.jsx';
import { ShippingCosts } from './components/pages/footerPages/shippingCosts.jsx';
import { WaysToPay } from './components/pages/footerPages/waysToPay.jsx';

// Componente de detalles del foro
import { ForumDetails } from './components/pages/forumDetails.jsx';

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
                <Route path="/foro/:postId" element={<ForumDetails />} /> 
                <Route path="/intercambios" element={<Intercambios />} />
                <Route path="/screens" element={<ScreensBlog />} />
                <Route path="/placa" element={<Placabase />} />
                <Route path="/tipoteclado" element={<Tipoteclado />} />
                <Route path="/todosproductos" element={<Products />} />
                <Route path="/todosproductos/:id" element={<ProductAllDetail />} />
                <Route path="/sillasergonomicas" element={<ErgonomicChairs />} />
                <Route path="/productos/:Id_producto" element={<ProductDetail />} /> 
                <Route path="/todosproductos/:id" element={<AllProductDetail />} />
                <Route path="/productos/recomendados/:Id_producto" element={<ProductDetailWeekRecomended />} />
                <Route path="/productos/genero/:Genero" element={<ProductGender />} />
                <Route path='/payPage' element={<Pay />} />
                {/* Rutas del footer */}
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