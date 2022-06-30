import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import D3Activity from './D3/D3Activity';
import React, { useState, useEffect } from "react";
import {fetchActivity} from "../service/getData";
import './../styles/Activity.css';

function Activity() {

    const [activity, setActivity] = useState([])
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActivityUser()
  }, [])

  async function fetchActivityUser () {
    const info = await fetchActivity('activity')
    setActivity(info)
    setIsLoading(false);
  }
    
    return <div className="Activity">
        <div className='Activity_title_legend'>
            <h5 className='Activity_title'>Activité quotidienne</h5>
            <div className='poids_calories'>
                <p className='Activity_legend poids'><FontAwesomeIcon icon={faCircle} className='black_circle'/> Poids (kg)</p>
                <p className='Activity_legend calories'><FontAwesomeIcon icon={faCircle} className='red_circle'/> Calories brûlées (kCal)</p>
            </div>
        </div>
        <svg className='Activity_graphic'>
        {!isLoading && <D3Activity data={activity} />}
        </svg>
    </div>
}

export default Activity
