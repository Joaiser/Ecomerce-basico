import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
    const [cart, setCart] = useState(initialCart);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity = 1) => {
        const productInCart = cart.findIndex(item => item.id === product.id);
        if (productInCart >= 0) {
            const newCart = [...cart];
            newCart[productInCart].quantity += quantity;
            setCart(newCart);
        } else {
            setCart(prevState => ([
                ...prevState,
                {
                    ...product,
                    quantity: quantity
                }
            ]));
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const removeFromCart = product => {
        const productInCart = cart.findIndex(item => item.id === product.id);
        if (productInCart >= 0) {
            const newCart = [...cart];
            newCart[productInCart].quantity -= 1;
            if (newCart[productInCart].quantity === 0) {
                newCart.splice(productInCart, 1);
            }
            setCart(newCart);
        }
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            clearCart,
            removeFromCart
        }}>
            {children}
        </CartContext.Provider>
    );
}