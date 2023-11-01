import { NavLink } from "react-router-dom"
import './Nav.css'

function Nav() {
    return (
        <nav>
            <ul>
                <NavLink to='/'>Book Swap</NavLink>
            </ul>
            <ul className="navbooks">
                <NavLink to="/books/claimed">Claimed Books</NavLink>
                <NavLink to="/">Available Books</NavLink>
                <NavLink to="/addabook">Add a Book</NavLink>
            </ul>
        </nav>
    )
}

export default Nav