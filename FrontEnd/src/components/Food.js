import '../styles/Food.css';

function Food({img, color, firstInfo, secondInfo, denomination }) {
    return <div className='food_boxes'>
            <div className={`logoFood ${ color }` } >
                <figure className='figureLogoFood'>
                    <img src={img} alt='logoFood' className={`${ color + 'logo' }` }></img>
                </figure>
            </div>
            <div className='infos'>
                <p className='firstInfo'>{firstInfo} {denomination}</p>
                <p className='secondInfo'>{secondInfo}</p>
            </div>
        </div>            
}

export default Food