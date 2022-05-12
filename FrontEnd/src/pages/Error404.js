import '../styles/Error404.css';
import Header from "../components/Header"
import NavigationLeft from "../components/NavigationLeft"

function Profils() {
  return (
    <div className="App">
      <Header />
      <div className='nav_vertical_center'>
        <NavigationLeft />
        <div className='all_text'>
            <div className='error_box'>
                    <h1 className='text_error'>404</h1>
                    <h3 className='text_error2'>Oups! La page que vous demandez n'existe pas.</h3>
                </div>
                <a href="/" className='lien_error'>Retourner sur la page d’accueil</a>
            </div>
      </div>
    </div>
  );
}

export default Profils;