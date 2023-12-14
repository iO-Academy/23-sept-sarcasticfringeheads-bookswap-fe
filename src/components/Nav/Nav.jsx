import { NavLink } from "react-router-dom"
import { useState, useEffect } from "react";
import './Nav.css'

function Nav() {

    const [navSize, setnavSize] = useState("8rem");
    const [navColor, setnavColor] = useState("transparent");
    const [fontColor, setFontColor] = useState("rgba(0,0,0,1");
    const listenScrollEvent = () => {
       
    window.scrollY > 10 ? setnavColor("rgba(0, 0, 0, .8)") : setnavColor("transparent");
    window.scrollY > 10 ? setFontColor("rgba(255, 255, 255, 1") : setFontColor("rgba(0, 0, 0, 1");
    window.scrollY > 10 ? setnavSize("4rem") : setnavSize("8rem");
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => {
          window.removeEventListener("scroll", listenScrollEvent);
        };
        }, []);

    return (
        <nav style={{backgroundColor: navColor, height: navSize, transition: "all 1s", letterSpacing: 1}}>
            <ul>
                <NavLink style={{color: fontColor, transition: "color 1.5s"}} to='/'>Book Swap</NavLink>
            </ul>
            <ul className="navbooks">
                <NavLink style={{color: fontColor, transition: "color 1.5s"}} to="/books/claimed">Claimed Books</NavLink>
                <NavLink style={{color: fontColor, transition: "color 1.5s"}} to="/">Available Books</NavLink>
                <NavLink style={{color: fontColor, transition: "color 1.5s"}} to="/books/addabook">Add a Book</NavLink>
            </ul>
        </nav>
    )
}

export default Nav