import './footerReal.css';
import { Link } from 'react-router-dom';

export function FooterReal() {
    return(
        <footer>
            <div id='footer-center'>
            <div>
                <h2>Por qué comprar</h2>
                    <ul>
                        <li><Link to="/como-comprar">Como comprar</Link></li>
                        <li><Link to="/formas-de-pago">Formas de pago</Link></li>
                        <li><Link to="/gastos-de-envio">Gastos de envio</Link></li>
                        <li><Link to="/preguntas-frecuentes">Preguntas frequentes</Link></li>
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
                <aside id='aside-footer'>
                <div>
                    <img className="img-footer-aside" src="/static/img/visa-logo-visa-icon-free-free-vector.jpg" alt="imagen de pagar con visa" loading='lazy'/>
                    <img className="img-footer-aside" src="/static/img/img-mastercard.png" alt="Imagen de pagar con mastercard" loading='lazy'/>
                </div>
            </aside>
            </div>
            <div id='center-div'>
                <p>© 2024, Todos los derechos reservados</p>
            </div>
           
           
        </footer>
    )
}