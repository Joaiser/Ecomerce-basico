import { useContext } from 'react'
import { Products } from './components/products.jsx'
import { Header } from './components/Header.jsx' 
import { Footer } from './components/Footer.jsx'
import { FilterContext } from './context/filters.jsx'

function App() {
  const { filters, setFilters } = useContext(FilterContext)

  return (
    <>
    <Header changeFilters={setFilters}/>

    <Products filter={filters} />

    <Footer />
    </>
  )
}

export default App