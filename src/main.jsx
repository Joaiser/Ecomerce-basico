import { FiltersProvider } from './context/filters.jsx'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root = document.getElementById('root');
createRoot(root).render(
  <FiltersProvider>
    <PayPalScriptProvider options={{ "client-id": "AaEGSw8rYal18Js4GxDAZFy5szZsC7Mc-W-q_C1G8mPXlWJ1C3UCRpcbi7zGmD9OqXkJqU_lHh7sIwl4" }}>  
    <App />
    </PayPalScriptProvider> 
  </FiltersProvider>
);