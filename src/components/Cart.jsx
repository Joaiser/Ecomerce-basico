import { useEffect, useId, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ClearCartIcon, RemoveFromCartIcon, CartIcon } from "./icons";
import { useCart } from '../hooks/useCart.js';
import './Cart.css';

export function Cart () {
    const cartCheckboxId = useId()
    const { cart, removeFromCart, clearCart } = useCart();
    const cartCheckboxRef = useRef(null);
    const navigate = useNavigate();
    const handlePay = () => {
        const user = localStorage.getItem('username');
        if (!user) {
            alert('Inicia sesión o crea una cuenta para pagar');
            return; // Agrega un return aquí para evitar que se ejecute el resto de la función si el usuario no está logueado
        }
        if (cart.length === 0) { // Verifica si el carrito está vacío
            alert('Tu carrito está vacío');
            return; // Agrega un return aquí para evitar que se ejecute el resto de la función si el carrito está vacío
        }
        if (cartCheckboxRef.current) {
            cartCheckboxRef.current.checked = false;
        }
        navigate('/payPage');
    }

    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const calculateTotal = () => {
        return cart.reduce((total, product) => total + product.precio * product.quantity, 0);
    }

    return (
        <>
        <label htmlFor={cartCheckboxId} className="cart-button">
            <CartIcon /> <p id="your-cart">Tu carrito</p>
        </label>
        <input type="checkbox" id={cartCheckboxId} hidden ref={cartCheckboxRef}/>

        <aside className="cart">
        <ul style={{ maxHeight: '550px', overflowY: 'scroll', overflowX:'hidden'}}>
            {cart.map((product) => (
                <li key={product.id}>
                    <img src={product.imagen_producto} alt={product.nombre_producto} />
                    <div>
                        <strong>
                            {product.nombre_producto} - €{product.precio}
                        </strong>
                    </div>
                    <footer>
                        <small>
                            Qty: {product.quantity}
                        </small>
                        <button onClick={() => removeFromCart(product)}>-</button>
                    </footer>
                </li>
            ))}
        </ul>
        <div>Total: €{calculateTotal().toFixed(2)}</div>
        <button onClick={clearCart}>
            <ClearCartIcon/>
        </button>
        <button onClick={handlePay}>
            Pagar
        </button>
        </aside>
        </>
    )
}