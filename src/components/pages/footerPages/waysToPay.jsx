import React from 'react';
export function WaysToPay() {
    return(
        <section>
            <article>
                <h1>
                    Formas de pago
                </h1>
                <h2>Tarjetas de Débito o Crédito</h2>
                <p>
                Esta forma de pago es inmediata, cómoda y segura. Al terminar tu pedido, nuestra pasarela de pagos 
                comunica con tu banco para autorizar y procesar el pago. PcComponentes no recibe estos datos ni tiene 
                acceso a ellos. Un pedido por tarjeta se puede pagar en la hora siguiente a su confirmación. Pasado ese
                 tiempo, si no llega el pago, el pedido será anulado automáticamente.
                </p>
                <p>
                En los pagos realizados por tarjeta, por seguridad y cumplimiento de la normativa PSD2, tu banco establece 
                un proceso por el cual te enviará un código al móvil para finalizar el pago, (por SMS o notificación), para así autorizar tu compra.  
                </p>
                <p>
                Para posteriores compras, nuestro sistema puede recordar tus datos de tarjeta, indicando que deseas guardar 
                los datos de la tarjeta al realizar la primera compra.  Si deseas desactivar esta funcionalidad, solo tienes
                 que acceder a la sección "Tarjetas vinculadas" de tu cuenta de usuario y eliminar la tarjeta que corresponda. 
                </p>
                <h2>
                Bizum
                </h2>
                <p>
                Bizum es la solución de pagos a través del móvil, impulsada por la banca española, instantánea, rápida, cómoda
                 y universal. Actualmente, permite realizar pagos entre particulares, donaciones a ONG y pagar en los comercios online.
                </p>
                <h3>
                ¿Cómo darse de alta en Bizum?
                </h3>
                <p>
                Tienes que comprobar que tu banco tiene integrado Bizum. Puedes ver una lista de los bancos con Bizum en este enlace: https://bizum.es/activar-bizum/
                Si ya tienes descargada la App de tu banco en tu móvil, tienes que ir al apartado correspondiente a Bizum para activarlo y darte de alta.
                El proceso es muy rápido y sencillo. Una vez dado de alta tendrás tu clave PIN, necesaria para realizar pagos con Bizum. Es una clave única para todas las compras, compuesta por 4 dígitos, que solo conocerás tú y que podrás modificar cuando quieras.
                </p>
                <h3>
                ¿Cómo pagar con Bizum en PcAitor?
                </h3>
                <p>
                Para poder pagar con Bizum en PcComponentes, simplemente necesitas la clave PIN de Bizum. Funciona de forma
                 similar al PIN de una tarjeta. Te explicamos como es el proceso de pago:
                </p>
                <ul>
                    <li style={{color:'black'}}>
                    Elige Bizum para pagar el pedido en nuestra web, dentro de las opciones de pago.
                    </li>
                    <li style={{color:'black'}}>
                    En la pantalla que aparece, introduce el número de teléfono asociado a Bizum y el Pin (código de 4 letras que te proporciona el Banco).
                    </li>
                    <li style={{color:'black'}}>
                    A continuación, recibes en el teléfono, vía SMS o notificación de la App del banco, un código de confirmación de la compra que debes introducir en la ventana de pago que aparece y finalizas el pago.
                    </li>
                    <li style={{color:'black'}}>
                    Te indicaremos que el pago ha sido realizado con éxito y comenzaremos a preparar tu pedido.
                    </li>
                </ul>
                <p style={{fontSize:'1.3rem'}}>¡Buena Compra!</p>
            </article>
        </section>
    )
}