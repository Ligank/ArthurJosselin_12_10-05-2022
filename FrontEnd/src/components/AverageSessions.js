import {profilData} from "../service/getData";
import * as d3 from "d3";
import '../styles/AverageSessions.css';

function AverageSessions() {
    return <div className="averageSessions">
        <p className="sessionsText">Durée moyenne<br></br>des sessions</p>
            
    </div>
}

export default AverageSessions

export async function lineChart() {


    //data
    const data = profilData[2][0].sessions
    const sizeParent = d3.select('.averageSessions').node().getBoundingClientRect();
    const margin = {top:10,left:10,bottom:25,right:10}
    const width = sizeParent.width;
    const height = sizeParent.height - sizeParent.height/4;
    
    //creation of base svg
    let svg = d3.select(".averageSessions")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr('transform', `translate(0, ${sizeParent.height/4})`);
    
    //infos of axis            
    var x = d3.scaleBand()
                    .rangeRound([margin.left,width-margin.right])
                    .domain(data.map(function(d) { return d.day }));
    var xAxis = d3.axisBottom(x);
    var y = d3.scaleLinear()
                    .range([height-margin.bottom,margin.top])
                    .domain([d3.min(data,function(d) { return d.sessionLength; }), d3.max(data, function(d) { return d.sessionLength; })
                    ]);

    //creation of the line
    var line = d3.line()
                 .x(function(d) { return x(d.day) + x.bandwidth()/2; })
                 .y(function(d) { return y(d.sessionLength); })
                    //.curve(d3.curveBasis);
                    
    svg.append("path")
       .datum(data)
       .attr("d",line)
       .attr("fill","none")
       .attr("stroke","white");
           
    //X axis
    svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + (height - margin.bottom)  + ")")
       .call(xAxis);
           
    //creartion of the dots   
    svg.selectAll(".dot")
       .data(data)
       .enter().append("g")
       .attr("class", "circleBox")
       .append("circle")
       .attr("cx", function(d) { return x(d.day) + x.bandwidth()/2; })
       .attr("cy", function(d) { return y(d.sessionLength); })
       .attr("r", 4)
       .attr("fill", "white")
       .attr("opacity", 0)
       .attr("class", "whiteDot")
       .attr("clip-path", "url(#clip)")
       .append("text")
       .text('test');

    //creation of the box text
    svg.selectAll(".circleBox")
       .data(data)
       .append('rect')
       .attr("class", "rectTime")
       .attr('transform', `translate(-20, 10)`)
       .attr("x", function(d) { return x(d.day) + x.bandwidth()/2; })
       .attr("y", function(d) { return y(d.sessionLength); })
       .attr("width", 30)
       .attr("height", 14)
       .attr("opacity", 0)
       .style("fill", "white")

    //creation of text
    svg.selectAll(".circleBox")
       .data(data)
       .append("text")
       .attr("class", "sessionsTime")
       .text(function(d) { return d.sessionLength + " min"; })
       .attr("x", function(d) { return x(d.day) + x.bandwidth()/2; })
       .attr("y", function(d) { return y(d.sessionLength); })
       .style("fill", "black")
       .attr("opacity", 0)
       .attr('transform', `translate(-17, 20)`);
                        
    //hover
    svg.selectAll(".circleBox")
       .on('mouseover', function(d, i) {
       d3.select(this).select('.whiteDot').transition()
       .duration('100')
       .attr('opacity', '1')
       d3.select(this).select(".sessionsTime").transition()
       .duration('100')
       .attr('opacity', '1')
       d3.select(this).select(".rectTime").transition()
       .duration('100')
       .attr('opacity', '1')
       })
       .on('mouseout', function(d, i) {
       d3.select(this).select(".whiteDot").transition()
       .duration('100')
       .attr('opacity', '0')
       d3.select(this).select(".sessionsTime").transition()
       .duration('100')
       .attr('opacity', '0')
       d3.select(this).select(".rectTime").transition()
       .duration('100')
       .attr('opacity', '0')
       });           
}

