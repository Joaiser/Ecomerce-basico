import '../footerReal.css';

export function FooterReal() {
    return(
        <footer>
            <div id='footer-center'>
                <div>
                    <h2>Por qué comprar</h2>
                    <ul>
                        <li><a href="#">Como comprar</a></li>
                        <li><a href="#">Formas de pago</a></li>
                        <li><a href="#">Gastos de envio</a></li>
                        <li><a href="#">Preguntas frequentes</a></li>
                    </ul>
                </div>
                <div>
                    <h2>Quienes somos</h2>
                    <ul>
                        <li><a href="#">Sobre nosotros</a></li>
                        <li><a href="#">Nuestras Marcas</a></li>
                        <li><a href="#">Aviso legal</a></li>
                        <li><a href="#">Politica de privacidad</a></li>
                    </ul>
                </div>
                <div>
                    <h2>Atención al cliente</h2>
                    <ul>
                        <li><a href="#">Contacto</a></li>
                        <li><a href="#">Devoluciones</a></li>
                        <li><a href="#">Reclamaciones</a></li>
                        <li><a href="#">Garantias</a></li>
                    </ul>
                </div>
                <div>
                    <h2>Contactar</h2>
                    <ul>
                        <li><a href="#">Centro de soporte</a></li>
                        <li><a href="#">Contacto</a></li>
                        <li><a href="#">Trabaja con nosotros</a></li>
                        <li><a href="#">Politita de cookies</a></li>
                    </ul>
                </div>
                <aside>
                <div>
                    <img className="img-footer-aside" src="/static/img/visa-logo-visa-icon-free-free-vector.jpg" alt="imagen de pagar con visa" />
                    <img className="img-footer-aside" src="/static/img/img-mastercard.png" alt="Imagen de pagar con mastercard" />
                </div>
            </aside>
            </div>
            <div id='center-div'>
                <p>© 2021, Todos los derechos reservados</p>
            </div>
           
           
        </footer>



    )
}