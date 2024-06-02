import { useId } from "react";
import { ClearCartIcon, RemoveFromCartIcon, CartIcon } from "./icons";
import { useCart } from '../hooks/useCart.js';
import './Cart.css';

export function Cart () {
    const cartCheckboxId = useId()
    const { cart, removeFromCart, clearCart } = useCart();

    const handlePay = () => {
        const user = localStorage.getItem('username');
        if (!user) {
            alert('Inicia sesión o crea una cuenta para pagar');
        }
    }

    const calculateTotal = () => {
        return cart.reduce((total, product) => total + product.precio * product.quantity, 0);
    }

    return (
        <>
        <label htmlFor={cartCheckboxId} className="cart-button">
            <CartIcon /> <p id="your-cart">Tu carrito</p>
        </label>
        <input type="checkbox" id={cartCheckboxId} hidden/>

        <aside className="cart">
        <ul style={{ maxHeight: '550px', overflowY: 'scroll', overflowX:'hidden'}}>
            {cart.map((product) => (
                <li key={product.id}>
                    <img src={product.imagen_producto} alt={product.nombre_producto} />
                    <div>
                        <strong>{product.nombre_producto}</strong> - €{product.precio}
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