
import Header from "../components/Header"
import NavigationLeft from "../components/NavigationLeft"
import TitleDashboard from "../components/TitleDashboard"
import Activity from "../components/Activity"
import Time from "../components/Time"
import Recap from "../components/Recap"
import Score from "../components/Score"
import Food from "../components/Food"
import { USER_MAIN_DATA } from "../data/DataMocked";
import calories from '../assets/calories.svg'
import proteine from '../assets/proteine.svg'
import glucides from '../assets/glucides.svg'
import lipides from '../assets/lipides.svg'
import '../styles/Home.css';


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
            <div className="Food">
              <Food
                key={profil[0].keyData.calorieCount}
                img={calories}
                color= 'red'
                firstInfo= {profil[0].keyData.calorieCount}
                secondInfo='Calories'
                denomination='KCal'
              ></Food>
              <Food
                key={profil[0].keyData.proteinCount}
                img={proteine}
                color= 'blue'
                firstInfo= {profil[0].keyData.proteinCount}
                secondInfo='Proteines'
                denomination='g'
              ></Food>
              <Food
                key={profil[0].keyData.carbohydrateCount}
                img={glucides}
                color= 'yellow'
                firstInfo= {profil[0].keyData.carbohydrateCount}
                secondInfo='Glucides'
                denomination='g'
              ></Food>
              <Food
                key={profil[0].keyData.lipidCount}
                img={lipides}
                color= 'pink'
                firstInfo= {profil[0].keyData.lipidCount}
                secondInfo='Lipides'
                denomination='g'
              ></Food>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default App;
