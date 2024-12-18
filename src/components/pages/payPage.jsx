import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart.js';
import './payPage.css';
import { PayPalButtons } from "@paypal/react-paypal-js";

export function Pay() {
    const { cart, removeFromCart } = useCart();
    const [showModal, setShowModal] = useState(false);
    const [buyerName, setBuyerName] = useState("");

    const clearCart = () => {
        cart.forEach(product => removeFromCart(product));
    };

    const calculateTotal = () => {
        return cart.reduce((total, product) => total + product.precio * product.quantity, 0);
    };

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
            
            <article>
                <h2>Artículos seleccionados</h2>
                <ul className="cart-items">
                    {renderCartItems}
                </ul>
                <div id="total-pay">Total a pagar: {calculateTotal().toFixed(2)}€</div>
            </article>

            <div id="paypal-button-container" style={{ color: 'black' }}>
                <PayPalButtons
                    style={{
                        layout: 'vertical',
                        color: 'black',
                        shape: 'rect',
                        label: 'paypal',
                        tagline: false,
                    }}
                    createOrder={(_data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: calculateTotal().toFixed(2)
                                }
                            }]
                        });
                    }}
                    onApprove={(_data, actions) => {
                        return actions.order.capture().then((details) => {
                            setBuyerName(details.payer.name.given_name);
                            setShowModal(true);
                            clearCart();
                        });
                    }}
                />
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>¡Gracias por tu compra, {buyerName}!</h2>
                        <p>Tu pedido llegará en 3 días. Esperamos que disfrutes de tu compra.</p>
                        <button onClick={() => setShowModal(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </section>
    );
}