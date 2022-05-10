import '../styles/Home.css';
import Header from "../components/Header"
import NavigationLeft from "../components/NavigationLeft"
import TitleDashboard from "../components/TitleDashboard"
import Activity from "../components/Activity"
import Time from "../components/Time"
import Recap from "../components/Recap"
import Score from "../components/Score"
import Food from "../components/Food"

function App() {
  return (
    <div className="App">
      <Header />
      <div className='nav_vertical_center'>
        <NavigationLeft />
        <div className='dashBoard'>
          <TitleDashboard />
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
