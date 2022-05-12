import '../styles/ProfilCard.css'
import PropTypes from 'prop-types'

function ProfilCard({ link, firstName, lastName }) {
    return (
        <a href={link} className='profil_box'>{firstName} {lastName}</a>
    )
}

ProfilCard.propTypes = {
    link: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
}
 
export default ProfilCard