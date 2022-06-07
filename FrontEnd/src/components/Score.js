import { USER_MAIN_DATA } from "../data/DataMocked";
import * as d3 from "d3";
import '../styles/Score.css';

function Score() {
    return <div className="scoreBox">
            <h1 className="scoreTitle">Score</h1>
            <div className="scoreCircle"></div>
    </div>
}

export default Score


export async function scoreCircle() {

    //get Id and data
    let id = parseInt(window.location.pathname.replace('/Home/', ''));
    const profil = !id ? USER_MAIN_DATA : USER_MAIN_DATA.filter(profil => profil.id === id);
    let score = profil[0].todayScore * 100;

    function radialProgress(selector) {

            //creation of the parent box
            const parent = d3.select(selector)
                    const size = parent.node().getBoundingClientRect()
                    const svg = parent.append('svg')
                      .attr('width', size.width)
                      .attr('height', size.height);

                    //data of the arc
                    const outerRadius = Math.min(size.width, size.height) * 0.45;
                    const thickness = 10;
                    let value = 0;
                    const mainArc = d3.arc()
                      .startAngle(0)
                      .endAngle(Math.PI * 2)
                      .innerRadius(outerRadius-thickness)
                      .outerRadius(outerRadius)
                    
                    //creation of the arc
                    const mainArcPath = svg.append("path")
                      .attr('class', 'progress-bar')
                      .attr('transform', `translate(${size.width/2},${size.height/2})`)
                    
                    //border radius start and end
                    svg.append("circle")
                      .attr('class', 'progress-bar')
                      .attr('transform', `translate(${size.width/2},${size.height/2-outerRadius+thickness/2})`)
                      .attr('width', thickness)
                      .attr('height', thickness)
                      .attr('r', thickness/2)
                    const end = svg.append("circle")
                      .attr('class', 'progress-bar')
                      .attr('transform', `translate(${size.width/2},${size.height/2-outerRadius+thickness/2})`)
                      .attr('width', thickness)
                      .attr('height', thickness)
                      .attr('r', thickness/2)
                    
                    //text center
                    let percentLabel = svg.append("text")
                      .attr('class', 'progress-label')
                      .attr('transform', `translate(${size.width/2},${size.height/2})`)
                      .text('0 %')
                      svg.append("text")
                      .attr('class', 'objectif')
                      .attr('transform', `translate(${size.width/2},${size.height/2 + 20})`)
                      .text('de votre')
                      svg.append("text")
                      .attr('class', 'objectif')
                      .attr('transform', `translate(${size.width/2},${size.height/2 + 40})`)
                      .text('objectif')
                  
                    return {
                      update: function(progressPercent) {
                        const startValue = value
                        const startAngle = Math.PI * startValue / 50
                        const angleDiff = Math.PI * progressPercent / 50 - startAngle;
                        const startAngleDeg = startAngle / Math.PI * 180
                        const angleDiffDeg = angleDiff / Math.PI * 180
                        const transitionDuration = 1500
                  
                        mainArcPath.transition().duration(transitionDuration).attrTween('d', function(){
                          return function(t) {
                            mainArc.endAngle(startAngle + angleDiff * t)
                            return mainArc();
                          }
                        })
                        end.transition().duration(transitionDuration).attrTween('transform', function(){
                          return function(t) {
                            return `translate(${size.width/2},${size.height/2})`+
                              `rotate(${(startAngleDeg + angleDiffDeg * t)})`+
                              `translate(0,-${outerRadius-thickness/2})`
                          }
                        })
                        percentLabel.transition().duration(transitionDuration).tween('bla', function() {
                          return function(t) {
                            percentLabel.text(Math.round(startValue + (progressPercent - startValue) * t) + ' %');
                          }
                        })
                        value = progressPercent
                      }
                    }
                  }
                  
    let chart = radialProgress('.scoreCircle')
    let progress = [score, score]
    let state = 0
    d3.interval(function(){
        chart.update(progress[state])
            state = (state + 1) % progress.length
        }, 1500)
  }

