import React from 'react';

export function Contact() {
    return (
        <>
            <section id='contact'>
                <h1>Contacto</h1>
                <div id='contact-center'>
                    <div>
                        <h2>¿Tienes alguna duda?</h2>
                        <p>Si tienes alguna duda, sugerencia o problema, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte.</p>
                        <p>Correo electrónico: <a href="mailto:info@tusitio.com">info@tusitio.com</a></p>
                    </div>
                    <div>
                        <h2>Formulario de contacto</h2>
                        <form>
                            <label>
                                Nombre:
                                <input type="text" name="name" />
                            </label>
                            <label>
                                Correo electrónico:
                                <input type="email" name="email" />
                            </label>
                            <label>
                                Mensaje:
                                <textarea name="message"></textarea>
                            </label>
                            <input type="submit" value="Enviar" />
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}