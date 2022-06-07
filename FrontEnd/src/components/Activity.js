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
    //kiloArrayMax++;
   
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
    

    const container = d3.select('.Activity_graphic');
    const containerWidth = d3.select('.Activity_graphic').node().getBoundingClientRect().width;
    let containerHeight = d3.select('.Activity_graphic').node().getBoundingClientRect().height;
    containerHeight = containerHeight - 40;
    
    const xScale = d3.scaleBand().domain(data_activity.map((dataPoint) => dataPoint.day)).rangeRound([0, containerWidth]).padding(0.9);
    const xScaleNumber = d3.scaleBand().domain(Array.from(Array(kiloArray.length)).map((e,i)=>i+1)).rangeRound([0, containerWidth]).padding(0.9);
    const yScaleKilo = d3.scaleLinear().domain([kiloArrayMin, kiloArrayMax]).range([containerHeight, 0]);
    const yScaleCalorie = d3.scaleLinear().domain([caloriesArrayMin, caloriesArrayMax]).range([containerHeight, 0]);
    const yScale = d3.scalePoint().domain(Array.from(Array(kiloArrayMax - kiloArrayMin + 1)).map((e,i)=>i+kiloArrayMin)).rangeRound([containerHeight, 0]);      

    //Création de la div back et gestion du hover
    let multigraph = container.selectAll(".bar")
                    .data(data_activity)
                    .enter().append("g")
                    .attr("class", "bar group")
                    .lower()
                    .on('mouseover', function(d, i) {
                        d3.select(this).select('.back').transition()
                        .duration('50')
                        .attr('opacity', '0.5')
                        d3.select(this).select('.dataShow').transition()
                        .duration('50')
                        .attr('opacity', '1')
                        d3.select(this).selectAll('.textHover').transition()
                        .duration('50')
                        .attr('opacity', '1')
                    })
                    .on('mouseout', function(d, i) {
                        d3.select(this).select('.back').transition()
                        .duration('50')
                        .attr('opacity', '0')
                        d3.select(this).select('.dataShow').transition()
                        .duration('50')
                        .attr('opacity', '0')
                        d3.select(this).selectAll('.textHover').transition()
                        .duration('50')
                        .attr('opacity', '0')
                    })
                    ;

         multigraph.append("rect")
                    .attr("class", "first")
                    .attr("class","back")
                    .attr('width', 52)
                    .attr('height', (data) => containerHeight - yScaleKilo(data.kilogram) + 10)
                    .attr('x', data => xScale(data.day))
                    .attr('y', data => yScaleKilo(data.kilogram))
                    .attr("fill", "#C4C4C4")
                    .attr('opacity', '0')
                    .attr('transform', `translate(-20, 0)`);
                    

        //creation des barres            
        multigraph.append("rect")
                  .attr("class", "first")
                  .attr("class","bar kilogram")
                  .attr('width', 11)
                  .attr('height', (data) => containerHeight - yScaleKilo(data.kilogram))
                  .attr('x', data => xScale(data.day))
                  .attr('y', data => yScaleKilo(data.kilogram))
                  .attr("fill", "#282D30")
                  .attr('rx', 5, 0)
                  .attr('transform', `translate(-10, 10)`);

        multigraph.append("rect")//fausse ligne pour arrondi
                  .attr("class", "first")
                  .attr("class","bar ghost")
                  .attr('width', 11)
                  .attr('height', (data) => containerHeight - 10 - yScaleKilo(data.kilogram))
                  .attr('x', data => xScale(data.day))
                  .attr('y', data => yScaleKilo(data.kilogram))
                  .attr("fill", "#282D30")
                  .attr('transform', `translate(-10, 20)`);

        multigraph.append("rect")
                  .attr("class", "second")
                  .attr("class","bar calories")
                  .attr("width", 11)
                  .attr('height', (data) => containerHeight - yScaleCalorie(data.calories))
                  .attr('x', data => xScale(data.day))
                  .attr('y', data => yScaleCalorie(data.calories))
                  .attr("fill", "#E60000")
                  .attr('rx', 5)
                  .attr('transform', `translate(10, 10)`);

        multigraph.append("rect")//fausse ligne pour arrondi
                  .attr("class", "second")
                  .attr("class","bar ghost")
                  .attr("width", 11)
                  .attr('height', (data) => containerHeight - 10 - yScaleCalorie(data.calories))
                  .attr('x', data => xScale(data.day))
                  .attr('y', data => yScaleCalorie(data.calories))
                  .attr("fill", "#E60000")
                  .attr('transform', `translate(10, 20)`);

        //Axis and yaxis
        container.append("g")
                 .call(d3.axisBottom(xScaleNumber).tickSizeOuter(0).tickSizeInner(0))
                 .attr('transform', `translate(0, ${containerHeight})`)
                 .attr('color', '#9B9EAC')
                 .selectAll('text')
                 .attr('dy', '25px')
                 .style("font-size", "14px");           
        container.append("g")
                 .call(d3.axisRight(yScale).tickSizeOuter(0).tickSizeInner(containerWidth - 2*containerWidth))
                 .attr('transform', `translate(${containerWidth - 40}, 10)`)
                 .attr("class","yaxis")
                 .style("stroke-dasharray", ("2, 3"))
                 .attr('color', '#9B9EAC')
                 .lower()
                 .selectAll('text')
                 .attr('dx', '15px')
                 .style("font-size", "14px");

        //changements de la taille et de la position de la div back si la barre calorie est plus grande que la barre kilos        
        let back = multigraph.selectAll('.back')
        back.each(function(p,j) {
            let caloriesHeight = d3.select(this.nextElementSibling.nextElementSibling.nextElementSibling).node().getBoundingClientRect().height;
            let backHeight = d3.select(this).node().getBoundingClientRect().height;
            d3.select(this)
              .attr('height', function() {
                    if(caloriesHeight > backHeight) {
                        return (caloriesHeight + 10)
                    } else {
                        return backHeight
                    }
                })
                .attr('y', function() {
                    if(caloriesHeight > backHeight) {
                        return this.nextElementSibling.nextElementSibling.nextElementSibling.getBBox().y;
                    } else {
                        return this.getBBox().y;
                    }
                })
            })

        //creation des div contenant les données de chaque barre    
        multigraph.each(function(p,j) {
            let caloriesHeight = d3.select(this).select('.calories').node().getBoundingClientRect().height;
            let kiloHeight = d3.select(this).select('.kilogram').node().getBoundingClientRect().height;
            let newY = this.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.getBBox().y;
            let actualY = this.firstChild.nextElementSibling.getBBox().y
            d3.select(this).append('rect')
                    .attr('class', 'dataShow')
                    .attr('height', 63)
                    .attr('width', 40)
                    .attr("fill", "#E60000")
                    .attr('y', function() {
                        if(caloriesHeight > kiloHeight) {
                            return newY
                        } else {
                            return actualY
                        }
                    })
                    .attr('x', this.firstChild.nextElementSibling.getBBox().x + 35)
                    .attr('opacity', '0')

            d3.select(this).append('text')
                    .text(data => data.kilogram + 'kg')
                    .attr("fill", "#FFFFFF")
                    .attr('class', 'textHover')
                    .style("font-size", "9px")
                    .attr('y', function() {
                        if(caloriesHeight > kiloHeight) {
                            return newY + 20
                        } else {
                            return actualY + 20
                        }
                    })
                    .attr('x', this.firstChild.nextElementSibling.getBBox().x + 45)
                    .attr('opacity', '0')

            d3.select(this).append('text')
                    .text(data => data.calories + 'Kcal')
                    .attr("fill", "#FFFFFF")
                    .attr('class', 'textHover')
                    .style("font-size", "9px")
                    .attr('y', function() {
                        if(caloriesHeight > kiloHeight) {
                            return newY + 45
                        } else {
                            return actualY + 45
                        }
                    })
                    .attr('x', this.firstChild.nextElementSibling.getBBox().x + 39)
                    .attr('opacity', '0')
        })

}




