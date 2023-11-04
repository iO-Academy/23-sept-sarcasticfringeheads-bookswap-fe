import { motion, useAnimationControls} from "framer-motion"
import { NavLink } from "react-router-dom"
import './Error.css'
import { useEffect } from "react"
function Error() {

    const controls = useAnimationControls()
    const controls2 = useAnimationControls()
    const controls3 = useAnimationControls()
    
    useEffect(() => {
        setInterval(() => {
            controls.start({rotate: [0, 360], transition: {duration: 1.3}})
        }, 2000)
    
        controls2.start({ x: [2000, -2000], transition: {duration: 12}})
        setInterval(() => {
            controls2.start({ x: [2000, -2000], transition: {duration: 4}})
        }, 12000)
    })
    
    
    return (
        <div>
        <motion.div id='error-wrapper' animate={controls}>

    <h1>Are You Lost?</h1>   

        </motion.div>

        <motion.div id='second-error-wrapper' animate={controls2}>
        <NavLink to="/">Click me to get Home</NavLink>
        </motion.div>

        <motion.div id='running-dude' animate={controls3}></motion.div>

        </div>
    )
}
export default Error