import { useContext } from 'react'
import { Products } from './components/products.jsx'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { FilterContext } from './context/filters.jsx'
import { Cart } from './components/Cart.jsx'
import { CartProvider } from './context/cart.jsx'
import {Init} from './components/init.jsx'
import { WeekRecomended } from './components/weekrecomended.jsx'
import { FooterReal } from './components/footerReal.jsx'

function App() {
  const { filters, setFilters } = useContext(FilterContext)

  return (
    <CartProvider>
      <Header changeFilters={setFilters}/>
      <Init/>
      {/*<Products/>*/}
      <WeekRecomended/>
      <Footer />
      <FooterReal/> 
    </CartProvider>
  )
}

export default App