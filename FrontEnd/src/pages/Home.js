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
import {removeSecond} from "../components/Score"
import {removeSecond2} from "../components/Performance"
import {fetchName} from "../service/getData";
import {fetchFood} from "../service/getData";
import React, { useState, useEffect } from "react";
import '../styles/Home.css';

window.onload = start
/**
 * Starts the four graphics last
 */
function start() {
  removeSecond()
  removeSecond2()
}

function App() {
  const [food, setFood] = useState([])
  const [name, setName] = useState([])
  let isLoading = false

  useEffect(() => {
    fetchInformationUser()
  }, [isLoading])

  async function fetchInformationUser () {
    const info = await fetchFood('')
    setFood(info)
    const infoUser = await fetchName('')
    setName(infoUser)
  }

  return (
    <div className="App">
      <Header />
      <div className='nav_vertical_center'>
        <NavigationLeft />
        <div className='dashBoard'>
       <TitleDashboard 
              key={`${name?.id}`}
              name={name?.firstName}>
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
                key={food?.calorieCount}
                img={calories}
                color= 'red'
                firstInfo= {food?.calorieCount}
                secondInfo='Calories'
                denomination='KCal'
              ></Food>
              <Food
                key={food?.proteinCount}
                img={proteine}
                color= 'blue'
                firstInfo= {food?.proteinCount}
                secondInfo='Proteines'
                denomination='g'
              ></Food>
              <Food
                key={food?.carbohydrateCount}
                img={glucides}
                color= 'yellow'
                firstInfo= {food?.carbohydrateCount}
                secondInfo='Glucides'
                denomination='g'
              ></Food>
              <Food
                key={food?.lipidCount}
                img={lipides}
                color= 'pink'
                firstInfo= {food?.lipidCount}
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

