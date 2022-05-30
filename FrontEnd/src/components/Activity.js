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
    const data_activity = profil[0].sessions;


    //Trouver la valeur la plus petite et la plus grande
    let kiloArray = [];
    data_activity.forEach(kilo => {
        kiloArray.push(kilo.kilogram)
    });
    let kiloArrayMin = Math.min.apply(Math, kiloArray);
    kiloArrayMin--;
    let kiloArrayMax = Math.max.apply(Math, kiloArray);
    kiloArrayMax++;

    let caloriesArray = [];
    data_activity.forEach(calorie => {
        caloriesArray.push(calorie.calories)
    });
    let caloriesArrayMax = Math.max.apply(Math, caloriesArray);
    caloriesArrayMax = caloriesArrayMax + 100;
    let caloriesArrayMin = Math.min.apply(Math, caloriesArray);
    if (caloriesArrayMin - 100 > 0) {
        caloriesArrayMin = caloriesArrayMin - 100
    } else {
        caloriesArrayMin = 1;
    }
    
    


    const xScale = d3.scaleBand().domain(data_activity.map((dataPoint) => dataPoint.day)).rangeRound([0, 853]).padding(0.9);
    const xScaleNumber = d3.scaleBand().domain(Array.from(Array(kiloArray.length)).map((e,i)=>i+1)).rangeRound([0, 853]).padding(0.9);
    const yScaleKilo = d3.scaleLinear().domain([kiloArrayMin, kiloArrayMax]).range([220, 0]);
    const yScaleCalorie = d3.scaleLinear().domain([caloriesArrayMin, caloriesArrayMax]).range([220, 0]);
    const yScale = d3.scaleLinear().domain(Array.from(Array(kiloArrayMax - kiloArrayMin)).map((e,i)=>i+kiloArrayMin)).range([192, 0]);

    const container = d3.select('.Activity_graphic');


    let multigraph = container.selectAll(".bar")
                    .data(data_activity)
                    .enter().append("g")
                    .attr("class", "bar")

        multigraph.append("rect")
                .attr("class", "first")
                .attr("class","bar kilogram")
                .attr('width', xScale.bandwidth())
                .attr('height', (data) => 220 - yScaleKilo(data.kilogram))
                .attr('x', data => xScale(data.day))
                .attr('y', data => yScaleKilo(data.kilogram))
                .attr("fill", "#282D30")
                .attr('rx', 5)
                .attr('ry', 5)
                .attr('transform', `translate(-10, 0)`);;

        multigraph.append("rect")
                .attr("class", "second")
                .attr("class","bar calories")
                .attr("width", (xScale.bandwidth()))
                .attr('height', (data) => 220 - yScaleCalorie(data.calories))
                .attr('x', data => xScale(data.day))
                .attr('y', data => yScaleCalorie(data.calories))
                .attr("fill", "#E60000")
                .attr('rx', 5)
                .attr('ry', 5)
                .attr('transform', `translate(10, 0)`);


        container.append("g")
                .call(d3.axisBottom(xScaleNumber).tickSizeOuter(0).tickSizeInner(0))
                .attr('transform', `translate(0, 220)`)
                .attr('color', '#9B9EAC')
                .selectAll('text')
                .attr('dy', '25px')
                .style("font-size", "14px");
                

        container.append("g")
                .call(d3.axisRight(yScale).tickSizeOuter(0).tickSizeInner(0))
                .attr('transform', `translate(800, 0)`)
                .attr('color', '#9B9EAC')
                .selectAll('text')
                .attr('dy', '25px')
                .style("font-size", "14px")
                ;         
                


}





