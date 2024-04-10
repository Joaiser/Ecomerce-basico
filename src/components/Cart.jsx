import { useId } from "react";
import { ClearCartIcon, RemoveFromCartIcon, CartIcon } from "./icons";
import './Cart.css';

export function Cart () {
    const cartCheckboxId = useId()
    return (
        <>
        <label htmlFor={cartCheckboxId} className="cart-button">
            <CartIcon /> <p>Tu carrito</p>
        </label>
        <input type="checkbox" id={cartCheckboxId} hidden/>

        <aside className="cart">
        <ul>
            <li>
            <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1631220221000" 
            alt="Iphone">
            </img>
                 <div>
                    <strong>Iphone</strong> - $1000
                 </div>
                 <footer>
                    <small>
                        Qty: 1
                    </small>
                    <button>+</button>
                 </footer>
            </li>
        </ul>
        <button>
            <ClearCartIcon/>
        </button>
        </aside>
        </>
        )
}