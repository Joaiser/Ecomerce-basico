import React from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ total, clearCart }) => {
    return (
        <PayPalButtons
            style={{
                layout: 'vertical',  // 'vertical' | 'horizontal'
                color:  'black',      // 'gold' | 'blue' | 'silver' | 'white' | 'black'
                shape:  'rect',      // 'rect' | 'pill'
                label:  'paypal',    // 'paypal' | 'checkout' | 'buynow' | 'pay' | 'installment'
                tagline: false,
            }}
            createOrder={(_data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: total // Cambia el valor por el monto de tu producto
                        }
                    }]
                });
            }}
            onApprove={(_data, actions) => {
                return actions.order.capture().then((details) => {
                    alert("Transaction completed by " + details.payer.name.given_name);
                    clearCart();
                    // Puedes realizar más acciones como actualizar tu base de datos
                });
            }}
        />
    );
}

export default PayPalButton;