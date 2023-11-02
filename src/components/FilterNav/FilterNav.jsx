import { NavLink } from "react-router-dom"
import "./FilterNav.css"

function FilterNav() {
    return (
        <nav className="filternav">
            <ul className="navbooks">
                <NavLink to="/books/genres">Historical</NavLink>
                <NavLink to="/books/genres">Non-Fiction</NavLink>
                <NavLink to="/books/genres">Romance</NavLink>
                <NavLink to="/books/genres">Thriller</NavLink>
            </ul>
        </nav>
    )
}

export default FilterNav