import {profilData} from "../service/getData";
import * as d3 from "d3";
import '../styles/Performance.css';

function Performance() {
    return <div className="performance">
            
    </div>
}

export default Performance


export async function spiderChart() {
    //various data
    const sizeParent = d3.select('.performance').node().getBoundingClientRect(),
    NUM_OF_SIDES = Object.keys(profilData[3][0].kind).length,
    NUM_OF_LEVEL = 5,
    size = (Math.min( sizeParent.width, sizeParent.height)),
    offset = Math.PI,
    polyangle = ( Math.PI * 2 ) / NUM_OF_SIDES,
    r = 0.8 * size -20,
    r_0 = r/2,
    center = {
        x: size / 2,
        y: size / 2
    };

    //personal data
    const generateData = ( length ) =>
    {
        const data = [];

        for ( let i = 0; i < length; i++ ) 
        {
            data.push(
                {
                    name: profilData[3][0].kind[i + 1],
                    value: profilData[3][0].data[i].value
                }
            );
        }

        return data;

    };

    const dataset = generateData( NUM_OF_SIDES );
    //find max data
    const dataValue = [];
    for ( let i = 0; i < dataset.length; i++ ) 
        {
            dataValue.push(dataset[i].value );
        }
    const maxData = Math.max(...dataValue)


    //creation the base svg
    d3.select(".performance")
      .append("svg")
      .attr("class", "spider")
      .attr( "width", size )
      .attr( "height", size );
    
    const g = d3.select( ".spider" ).append( "g" );

    //size of the chart and range of the data
    const scale = d3.scaleLinear()
    .domain( [ 0, maxData + 20 ] )
    .range( [ 0, r_0 ] )
    .nice();

    //creation of the points
    const generatePoint = ( { length, angle } ) => {
    const point =
    {
        x: center.x + ( length * Math.sin( offset - angle ) ),
        y: center.y + ( length * Math.cos( offset - angle ) )
    };
    return point;
    };

    //path who follow the points
    const drawPath = ( points, parent ) =>
{
    const lineGenerator = d3.line()
        .x( d => d.x )
        .y( d => d.y );

    parent.append( "path" )
        .attr( "d", lineGenerator( points ) );
};
    //Creation the line of the chart
    const generateAndDrawLevels = ( levelsCount, sideCount ) =>
{

    for ( let level = 1; level <= levelsCount; level++ ) 
    {
        const hyp = ( level / levelsCount ) * r_0;

        const points = [];
        for ( let vertex = 0; vertex < sideCount; vertex++ ) 
        {
            const theta = vertex * polyangle;

            points.push( generatePoint( { length: hyp, angle: theta } ) );

        }
        const group = g.append( "g" ).attr( "class", "levels" );
        drawPath( [ ...points, points[ 0 ] ], group );
    }
};

    //constant for the creation of the label
    const drawText = ( text, point, group ) =>
    {
        group.append( "text" )
            .attr( "x", point.x )
            .attr( "y", point.y + 5)
            .html( text )
            .attr("class", "label2")
            .style( "text-anchor", "middle" )
            .attr( "fill", "white" )
            .style( "font-family", "sans-serif" );
    };

    //creation of the path data in red
    const drawData = ( dataset, n ) =>
    {
        const points = [];
        dataset.forEach( ( d, i ) => 
        {
            const len = scale( d.value );
            const theta = i * ( 2 * Math.PI / n );

            points.push(
                {
                    ...generatePoint( { length: len, angle: theta } ),
                    value: d.value
                } );
        } );

    const group = g.append( "g" ).attr( "class", "shape" );

    drawPath( [ ...points, points[ 0 ] ], group );
};

//creation of the labels
const drawLabels = ( dataset, sideCount ) =>
{
    const groupL = g.append( "g" ).attr( "class", "labels" );
    for ( let vertex = 0; vertex < sideCount; vertex++ ) 
    {

        const angle = vertex * polyangle;
        const label = dataset[ vertex ].name;
        const point = generatePoint( { length: 0.89 * ( size / 2 ), angle } );

        drawText( label, point, groupL );
    }
};

    generateAndDrawLevels( NUM_OF_LEVEL, NUM_OF_SIDES );
    drawData( dataset, NUM_OF_SIDES );
    drawLabels( dataset, NUM_OF_SIDES );

}