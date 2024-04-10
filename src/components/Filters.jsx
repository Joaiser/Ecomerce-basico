import { useId, useContext } from 'react';
import { FilterContext } from '../context/filters';
import './Filters.css';

export function Filters() {
    const { filters, setFilters } = useContext(FilterContext);
    const minPriceFilterId = useId();
    const categoryFilterId = useId();

    const handleChangeMinPrice = (event) => {
        setFilters(prevState => ({
            ...prevState,
            minprice: event.target.value
        }));
    }

    const handleChangeCategory = (event) => {
        setFilters(prevState => ({
            ...prevState,
            category: event.target.value
        }));
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor={categoryFilterId} id='category'>Categoria</label>
                <select id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value="all">Todos</option>
                    <option value="men's clothing">Ropa Hombre </option>
                    <option value="women's clothing">Ropa Mujer </option>
                    <option value="jewelery">Joyas</option>
                    <option value="electronics">Electronica </option>
                </select>
            </div>
            <div>
                <label htmlFor={minPriceFilterId}>Precio a partir de: </label>
                <input type="range"
                id={minPriceFilterId} 
                min='0'
                max='1000'
                onChange={handleChangeMinPrice}/>
               <span>${filters.minprice}</span>
            </div>
        </section>
    )
}