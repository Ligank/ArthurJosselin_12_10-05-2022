import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import * as d3 from "d3";
import { USER_ACTIVITY } from "../data/DataMocked";
import './../styles/Activity.css';

function Activity() {
    
    return <div className="Activity">
        <div className='Activity_title_legend'>
            <h5 className='Activity_title'>Activité quotidienne</h5>
            <div className='poids_calories'>
                <p className='Activity_legend poids'><FontAwesomeIcon icon={faCircle} className='black_circle'/> Poids (kg)</p>
                <p className='Activity_legend calories'><FontAwesomeIcon icon={faCircle} className='red_circle'/> Calories brûlées (kCal)</p>
            </div>
        </div>
        <svg className='Activity_graphic'>
        </svg>
    </div>
}
window.onload = graphique
export default Activity

//graphique
export async function graphique() {
    let userId = parseInt(window.location.pathname.replace('/Home/', ''));
    const profil = !userId ? USER_ACTIVITY : USER_ACTIVITY.filter(profil => profil.userId === userId);
    console.log(profil[0].sessions[0].kilogram);
        
    const data_activity = profil[0].sessions;

    const xScale = d3.scaleBand().domain(data_activity.map((dataPoint) => dataPoint.day)).rangeRound([0, 853]).padding(0.9);
    const yScale = d3.scaleLinear().domain([74, 82]).range([220, 0]);

    const container = d3.select('.Activity_graphic');
        
    container.selectAll(".bar")
             .data(data_activity)
             .enter()
             .append("rect")
             .classed("bar", true)
             .attr('width', xScale.bandwidth())
             .attr('height', (data) => 220 - yScale(data.kilogram))
             .attr('x', data => xScale(data.day))
             .attr('y', data => yScale(data.kilogram))
             .attr("fill", "#E60000")
             .attr('rx', 5)
             .attr('ry', 5)

    container.append("g")
             .call(d3.axisBottom(xScale).tickSizeOuter(0).tickSizeInner(0))
             .attr('transform', `translate(0, 220)`)
             .attr('color', '#9B9EAC')
             .selectAll('text')
             .attr('dy', '20px');





}





