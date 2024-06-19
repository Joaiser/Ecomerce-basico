import React from 'react';
import { useCart } from '../../hooks/useCart.js';
import './payPage.css';
import PayPalButton from '../paypal/paypalButton.jsx';

export function Pay() {
    const { cart, removeFromCart } = useCart();

    const clearCart = () => {
        cart.forEach(product => removeFromCart(product));
    }

    const calculateTotal = () => {
        return cart.reduce((total, product) => total + product.precio * product.quantity, 0);
    }

    const renderCartItems = cart.map((product) => (
        <li key={product.id}>
            <img src={product.imagen_producto} alt={product.nombre_producto} />
            <div>
                <strong>
                    {product.nombre_producto} - €{product.precio}
                </strong>
            </div>
            <div>
                Cantidad: {product.quantity}
            </div>
            <button onClick={() => removeFromCart(product)}>Eliminar</button>
        </li>
    ));

    return (
        <section id="pay">
            <h1>Pago</h1>
            <div id="paypal-button-container" style={{color:'black'}}>
            <PayPalButton total={calculateTotal().toFixed(2)} clearCart={clearCart} />
            </div>
            <article>
            <h2>Articulos seleccionados</h2>
            <ul className="cart-items">
                {renderCartItems}
            </ul>
            <div id='total-pay'>Total a pagar: {calculateTotal().toFixed(2)}€</div>
            </article>
        </section>
    )
}