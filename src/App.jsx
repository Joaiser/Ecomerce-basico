// App.jsx
import { useState } from 'react'
import { Products } from './components/products.jsx'
import { Header } from './components/Header.jsx' 
import { Footer } from './components/Footer.jsx'

function App() {
  const[filter,setFilter] = useState(
    {
      category: 'all',
      minprice: 0
    }
  )

  return (
    <>
    <Header changeFilters={setFilter}/>

    <Products filter={filter} />

    <Footer />
    </>
  )
}

export default App