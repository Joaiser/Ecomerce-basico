import { FiltersProvider } from './context/filters.jsx';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const root = document.getElementById('root');
createRoot(root).render(
  <FiltersProvider>
    <PayPalScriptProvider options={{ "client-id": process.env.PAYPAL_CLIENT_ID.replace(/['"]+/g, '') }}>  
      <App />
    </PayPalScriptProvider> 
  </FiltersProvider>
);