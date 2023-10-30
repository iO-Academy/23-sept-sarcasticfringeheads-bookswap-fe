import { NavLink } from "react-router-dom"
import './Nav.css'

function Nav() {
    return (
        <>
        <nav>
            <ul>
                <NavLink to='/'>Book Swap</NavLink>
            </ul>
        </nav>
        </>
    )
}
export default Nav