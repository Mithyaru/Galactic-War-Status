import "./Header.css"
import { Parallax } from 'react-parallax';

const Header = () => {
    return (
        <Parallax
        bgImage='../../Assets/helldiversbg.png'
        bgImageStyle={{filter: 'blur(1px)'}}
        strength={500}
        >
        <div className="headerContent">
            <img alt=" " src='../../Assets/helldivers-logo.png' width={550} height={180}></img>
        </div>
        </Parallax>
    )
}

export default Header
