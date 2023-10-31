import { NavLink } from "react-router-dom"
import './Nav.css'

function Nav() {
    return (
        <nav>
            <ul>
                <NavLink to='/'>Book Swap</NavLink>
            </ul>

            <ul className="navbooks">
                <NavLink to="/books/claimed" activeClassName="active">Claimed Books</NavLink>
                <NavLink to="/" activeClassName="active">Available Books</NavLink>
            </ul>

        
        </nav>
    )
}
export default Nav