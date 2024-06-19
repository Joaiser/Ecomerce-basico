import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
    "client-id": "AaEGSw8rYal18Js4GxDAZFy5szZsC7Mc-W-q_C1G8mPXlWJ1C3UCRpcbi7zGmD9OqXkJqU_lHh7sIwl4", 
    "data-client-token": "EKNkdjK9n7VoPJtRwd_q1g6MJrN7odZ7YTn0IaOFIjFAIw1sjPcg-0uUjYSNf3yTx00DP4EdOysZceed", 
    "data-namespace": "sandbox",
    currency: "USD",
    intent: "capture"
};

const PayPalConfig = ({ children }) => {
    return (
        <PayPalScriptProvider options={initialOptions}>
            {children}
        </PayPalScriptProvider>
    );
};

export default PayPalConfig;