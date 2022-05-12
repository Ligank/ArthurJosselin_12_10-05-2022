import '../styles/Profils.css';
import Header from "../components/Header"
import NavigationLeft from "../components/NavigationLeft"
import ProfilCard from "../components/ProfilCard"

function Profils() {
  return (
    <div className="App">
      <Header />
      <div className='nav_vertical_center'>
        <NavigationLeft />
          <div className='profil_selection'>
            <ProfilCard 
              key={`karl`}
              link={'/Home/' + 12}
              firstName= 'Karl'
              lastName='Dovineau'>
            </ProfilCard>
            <ProfilCard 
              key={`Cecilia`}
              link={'/Home/' + 18}
              firstName= 'Cecilia'
              lastName='Ratorez'>
            </ProfilCard>
          </div>
      </div>
    </div>
  );
}

export default Profils;