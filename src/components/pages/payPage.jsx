import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart.js';
import './payPage.css';

export function Pay() {
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const { cart, removeFromCart } = useCart(); // Importa removeFromCart

    const handlePayment = () => {
        // Aquí puedes implementar la lógica de pago
        // Esto podría implicar enviar los detalles de la tarjeta a tu servidor o a un servicio de pago de terceros
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
            <button onClick={() => removeFromCart(product)}>Eliminar</button> {/* Botón para eliminar el producto */}
        </li>
    ));

    return (
        <section id="pay">
            <h1>Pago</h1>
            <form onSubmit={handlePayment}>
                <label>
                    Nombre en la tarjeta:
                    <input type="text" value={cardName} onChange={e => setCardName(e.target.value)} required />
                </label>
                <label>
                    Número de tarjeta:
                    <input type="text" value={cardNumber} onChange={e => setCardNumber(e.target.value)} required />
                </label>
                <label>
                    Fecha de vencimiento:
                    <input type="text" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} required />
                </label>
                <label>
                    CVV:
                    <input type="text" value={cvv} onChange={e => setCvv(e.target.value)} required />
                </label>
                <button type="submit">Pagar</button>
            </form>
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