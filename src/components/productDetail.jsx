import React from 'react';

export function ProductDetail() {


    return(
        <section>
            <div className="container-product">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <img src="https://via.placeholder.com/500" alt="Producto" className="img-fluid" />
                    </div>
                    <div className="col-12 col-md-6">
                        <h1>Producto</h1>
                        <p>Descripción del producto</p>
                        <p>Precio: $100</p>
                        <button className="btn btn-primary">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </section>
    )
}