import '../styles/Home.css';
import Header from "../components/Header"
import NavigationLeft from "../components/NavigationLeft"
import TitleDashboard from "../components/TitleDashboard"
import Activity from "../components/Activity"
import Time from "../components/Time"
import Recap from "../components/Recap"
import Score from "../components/Score"
import Food from "../components/Food"
import { USER_MAIN_DATA } from "../data/DataMocked";

function App() {
    let id = parseInt(window.location.pathname.replace('/Home/', ''));
    const profil = !id ? USER_MAIN_DATA : USER_MAIN_DATA.filter(profil => profil.id === id);
  return (
    <div className="App">
      <Header />
      <div className='nav_vertical_center'>
        <NavigationLeft />
        <div className='dashBoard'>
          <TitleDashboard 
              key={`${id}`}
              name={profil[0].userInfos.firstName}>
          </TitleDashboard>
          <div className='dashboard_down'>
            <div className='dashboard_left'>
              <Activity />
              <div className='dashboard_left_down'>
                <Time />
                <Recap />
                <Score />
              </div>
            </div>
          <Food />
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default App;
