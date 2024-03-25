import { useContext } from 'react'
import { Products } from './components/products.jsx'
import { Header } from './components/Header.jsx' 
import { Footer } from './components/Footer.jsx'
import { FilterContext } from './context/filters.jsx'
import { Cart } from './components/Cart.jsx'
import { CartProvider } from './context/cart.jsx'

function App() {
  const { filters, setFilters } = useContext(FilterContext)

  return (
    <CartProvider>
    <Header changeFilters={setFilters}/>

    <Cart />
    

    <Products/>

    <Footer />
    </CartProvider>
  )
}

export default App