import './../styles/Activity.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import * as d3 from "d3";
import { USER_ACTIVITY } from "../data/DataMocked";

function Activity() {
    return <div className="Activity">
        <div className='Activity_title_legend'>
            <h5 className='Activity_title'>Activité quotidienne</h5>
            <div className='poids_calories'>
                <p className='Activity_legend poids'><FontAwesomeIcon icon={faCircle} className='black_circle'/> Poids (kg)</p>
                <p className='Activity_legend calories'><FontAwesomeIcon icon={faCircle} className='red_circle'/> Calories brûlées (kCal)</p>
            </div>
        </div>
        <div className='Activity_graphic'>
        </div>
    </div>
    
}

export default Activity



//graphique
let userId = parseInt(window.location.pathname.replace('/Home/', ''));
const profil = !userId ? USER_ACTIVITY : USER_ACTIVITY.filter(profil => profil.userId === userId);
console.log(profil[0].sessions[0].kilogram)
    
const data_activity = profil[0].sessions
       
const container = d3.select("body").selectAll("#root").selectAll('.App').selectAll('.nav_vertical_center').selectAll('.dashBoard').selectAll('.dashboard_down').selectAll('.dashboard_left').selectAll('.Activity').selectAll('.Activity_graphic')
    
container.selectAll('.bar')
         .data(data_activity)
         .enter()
         .append('div')
         .classed('bar', true)
         .style('height', data => (data.kilogram) + 'px')
         .style('width', '7px');