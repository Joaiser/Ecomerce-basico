import { useState, useId } from 'react';
import './Filters.css';

export function Filters({onChange}) {
    const [minPrice, setPrice] = useState(0);
    const minPriceFilterId = useId();
    const categoryFilterId = useId();


    const handleChangeMinPrice = (event) => {
        setPrice(event.target.value);

        onChange(prevState => ({
            ...prevState,
            minprice: event.target.value
        }));
    }

    const handleChangeCategory = (event) => {
        onChange(prevState => ({
            ...prevState,
            category: event.target.value
        }));
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilterId}>Precio a partir de: </label>
                <input type="range"
                id={minPriceFilterId} 
                min='0'
                max='1000'
                onChange={handleChangeMinPrice}/>
               <span>${minPrice}</span>
            </div>
            <div>
                <label htmlFor={categoryFilterId}>Categoria</label>
                <select id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value="all">Todos</option>
                    <option value="men's clothing">Ropa Hombre </option>
                    <option value="women's clothing">Ropa Mujer </option>
                    <option value="jewelery">Joyas</option>
                    <option value="electronics">Electronica </option>
                </select>
            </div>
        </section>
    )
}