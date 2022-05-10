import '../styles/NavigationLeft.css';
import { Link } from 'react-router-dom'
import meditate from '../assets/meditate.svg'
import natation from '../assets/natation.svg'
import bike from '../assets/bike.svg'
import dumbbells from '../assets/dumbbells.svg'

function NavigationLeft() {
    return <div className="Navigation">
                <nav className='lien-vertical-box'>
                    <Link to='/meditation' className='nav_vertical_link' id='meditation'>
                        <figure className='figure_nav'>
                            <img src={meditate} alt='meditate' className='nav_img'></img>
                        </figure>
                    </Link>
                    <Link to='/natation' className='nav_vertical_link' id='natation'>
                        <figure className='figure_nav'>
                            <img src={natation} alt='natation' className='nav_img'></img>
                        </figure>
                    </Link>
                    <Link to='/velo' className='nav_vertical_link' id='velo'>
                        <figure className='figure_nav'>
                            <img src={bike} alt='bike' className='nav_img'></img>
                        </figure>
                    </Link>
                    <Link to='/musculation' className='nav_vertical_link' id='musculation'>
                        <figure className='figure_nav'>
                            <img src={dumbbells} alt='dumbbells' className='nav_img'></img>
                        </figure>
                    </Link>
                </nav>
                <div className='copyright'>
                    <p>Copiryght, SportSee 2020</p>
                </div>
    </div>
}

export default NavigationLeft