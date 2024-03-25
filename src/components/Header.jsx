import { Filters } from './Filters.jsx';
import { CartIcon } from './icons.jsx';

export function Header({ changeFilters }) {
    return (
        <header>
            <h1>Tienda <CartIcon /></h1>
            <Filters onChange={changeFilters} />
        </header>
    );
}