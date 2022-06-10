
import Header from "../components/Header"
import NavigationLeft from "../components/NavigationLeft"
import TitleDashboard from "../components/TitleDashboard"
import Activity from "../components/Activity"
import AverageSessions from "../components/AverageSessions"
import Performance from "../components/Performance"
import Score from "../components/Score"
import Food from "../components/Food"
import calories from '../assets/calories.svg'
import proteine from '../assets/proteine.svg'
import glucides from '../assets/glucides.svg'
import lipides from '../assets/lipides.svg'
import {graphique} from "../components/Activity"
import {scoreCircle} from "../components/Score"
import {spiderChart} from "../components/Performance"
import {lineChart} from "../components/AverageSessions"
import {profilData} from "../service/getData";
import '../styles/Home.css';

window.onload = start
function start() {
  graphique()
  scoreCircle()
  spiderChart()
  lineChart()
}

function App() {
  return (
    <div className="App">
      <Header />
      <div className='nav_vertical_center'>
        <NavigationLeft />
        <div className='dashBoard'>
          <TitleDashboard 
              key={`${profilData[0][0].id}`}
              name={profilData[0][0].userInfos.firstName}>
          </TitleDashboard>
          <div className='dashboard_down'>
            <div className='dashboard_left'>
              <Activity />
              <div className='dashboard_left_down'>
                <AverageSessions />
                <Performance />
                <Score />
              </div>
            </div>
            <div className="Food">
              <Food
                key={profilData[0][0].keyData.calorieCount}
                img={calories}
                color= 'red'
                firstInfo= {profilData[0][0].keyData.calorieCount}
                secondInfo='Calories'
                denomination='KCal'
              ></Food>
              <Food
                key={profilData[0][0].keyData.proteinCount}
                img={proteine}
                color= 'blue'
                firstInfo= {profilData[0][0].keyData.proteinCount}
                secondInfo='Proteines'
                denomination='g'
              ></Food>
              <Food
                key={profilData[0][0].keyData.carbohydrateCount}
                img={glucides}
                color= 'yellow'
                firstInfo= {profilData[0][0].keyData.carbohydrateCount}
                secondInfo='Glucides'
                denomination='g'
              ></Food>
              <Food
                key={profilData[0][0].keyData.lipidCount}
                img={lipides}
                color= 'pink'
                firstInfo= {profilData[0][0].keyData.lipidCount}
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
