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
                    </ul>
                </div>
                <div>
                    <h2>Quienes somos</h2>
                    <ul>
                        <li><Link to="/nosotros">Sobre nosotros</Link></li>
                        <li><Link to="/aviso-legal">Aviso legal</Link ></li>
                        <li><Link to="/politica-de-privacidad">Politica de privacidad </Link></li>
                    </ul>
                </div>
                <div>
                    <h2>Atención al cliente</h2>
                    <ul>
                        <li><Link to= "/contacto">Contacto</Link></li>
                        <li><Link to= "/devoluciones">Devoluciones</Link></li>
                        <li><Link to= "/reclamaciones">Reclamaciones</Link></li>
                    </ul>
                </div>
                <div>
                    <h2>Contactar</h2>
                    <ul>
                        <li><Link to= "/contacto">Centro de soporte</Link></li>
                        <li><Link to= "/contacto">Contacto</Link></li>
                        <li><Link to="/cookies">Politita de cookies</Link></li>
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