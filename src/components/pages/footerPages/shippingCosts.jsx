import React from 'react';

export function ShippingCosts() {
    return(
        <section>
            <article>
                <h1>
                Gastos de envío
                </h1>
                <p>
                Para calcular el importe de los gastos de envío:
                </p>
                <ul>
                    <li style={{color:'black'}}>
                    Añade los artículos que desees al carro.
                    </li>
                    <li style={{color:'black'}}>
                    Indica el destino y podrás ver el importe de dichos gastos, incluido en el total de la compra.
                    </li>
                </ul>
                <h2>
                Entregas en España peninsular
                </h2>
                    <ul>
                        <li  style={{color:'black'}}>
                            <strong>Entrega en 24 horas en domicilio:</strong>
                            El plazo de entrega de tu pedido en tu domicilio es de 24 horas en toda la península (plazo estimado, en campaña de Navidad u otras puede sufrir retraso la entrega). El coste varía en función del peso y del tamaño, y lo verás reflejado en el carrito. Si tu pedido supera los 50 € el envío será totalmente gratuito (promoción aplicable para envíos a Península y para productos vendidos y enviados por PcComponentes, exceptuando grandes electrodomésticos).
                        </li>
                        <li style={{color:'black'}}>
                            <strong>Entrega en puntos de recogida:</strong>
                            Si prefieres recoger tus pedidos con total flexibilidad, tienes la opción de que sean entregados en nuestros puntos de recogida (no disponible para todos los códigos postales). El tiempo de entrega varía entre 24 - 72 horas hábiles, y encontrarás todos los detalles necesarios durante el proceso de compra.
                        </li>
                        <li style={{color:'black'}}>
                            <strong>Entrega hoy:</strong>
                            Sabemos que hay cosas que no pueden esperar, por lo que si necesitas una entrega urgente, podrás recibir el pedido el mismo día entre las 15:00 y las 21:00 horas, siempre que realices el pago antes de la 13:00. Esta opción estará disponible dependiendo del código postal del destino.
                        </li>
                        <li style={{color:'black'}}>
                            <strong>Entrega en tienda:</strong>
                            Para aquellos que vivan en Murcia, Madrid y Barcelona, tienen disponible la opción de recogida en tienda sin coste adicional. Podrás recoger tu pedido cuando recibas el email de confirmación, donde se indicará que ya está disponible para recogerlo.
                        </li>
                        <li style={{color:'black'}}>
                            <strong>Entrega Eco:</strong>
                            Comprometidos con el medioambiente, ofrecemos la opción de "Entrega ECO" para aquellos pedidos que no requieren urgencia. Esta alternativa permite plazos de entrega más amplios, de 1 a 3 días, contribuyendo a la optimización de rutas y al uso de vehículos sostenibles en la última milla, reduciendo así el impacto ambiental.
                        </li>
                    </ul>
                <p style={{fontSize:'1.3rem'}}>¡Buena Compra!</p>
            </article>
        </section>
    )
}