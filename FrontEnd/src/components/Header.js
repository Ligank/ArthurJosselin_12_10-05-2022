import './../styles/Header.css';
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

function Header() {
    return <div className="banner">
            <figure className='figure_logo'>
                <img src={logo} alt='logo' className='logo_img'></img>
                </figure>
            <nav className='lien-pages-box'>
                <Link to='/' className='nav_link' id='accueil'>Accueil</Link>
                <Link to='/profil' className='nav_link' id='profil'>Profil</Link>
                <Link to='/reglage' className='nav_link' id='reglage'>Réglage</Link>
                <Link to='/communaute' className='nav_link' id='communaute'>Communauté</Link>
            </nav>
    </div>
}

export default Header