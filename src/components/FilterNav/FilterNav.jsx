import { NavLink } from "react-router-dom"
import "./FilterNav.css"

function FilterNav() {
    return (
        <nav className="filternav">
            <ul className="navbooks">
                <NavLink to="/books/genre/1">Genre</NavLink>
                <NavLink to="/books/genre/2">Genre</NavLink>
                <NavLink to="/books/genre/3">Genre</NavLink>
                <NavLink to="/books/genre/4">Genre</NavLink>
                <NavLink to="/books/genre/5">Genre</NavLink>
                <NavLink to="/books/genre/6">Genre</NavLink>
            </ul>
        </nav>
    )
}

export default FilterNav