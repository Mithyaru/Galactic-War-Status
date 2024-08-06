import "./Header.css"
import { Parallax } from 'react-parallax';
import helldiversbg from '../../Assets/helldiversbg.png'
import helldiverlogo from '../../Assets/helldivers-logo.png'

const Header = () => {
    return (
        <Parallax
        bgImage={helldiversbg}
        bgImageStyle={{filter: 'blur(1px)'}}
        strength={500}
        >
        <div className="headerContent">
            <img alt=" " src={helldiverlogo} width={550} height={180}></img>
        </div>
        </Parallax>
    )
}

export default Header
