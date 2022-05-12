import '../styles/Accueil.css';
import Header from "../components/Header"
import NavigationLeft from "../components/NavigationLeft"
import logo from '../assets/logo.svg'

function Accueil() {
  return (
    <div className="App">
      <Header />
      <div className='nav_vertical_center'>
        <NavigationLeft />
        <div className='dashBoard_accueil'>
            <figure className='figure_logo_accueil'>
                <img src={logo} alt='logo' className='logo_img_accueil'></img>
            </figure>
          <h2 className='Title_Accueil'>Bonjour ! Pour commencer veuillez choisir un profil dans la catégorie Profil.</h2>
        </div>
      </div>
    </div>
  );
}

export default Accueil;