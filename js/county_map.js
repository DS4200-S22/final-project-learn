

// let usData = await d3.json('https://d3js.org/us-10m.v2.json');

// let stateData = topojson.feature(usData, usData.objects.states).features.filter((d) => d.id === selectedStateId);

// let countiesData = topojson.feature(usData, usData.objects.counties).features;

// let projection1 = d3.geoIdentity().fitSize([width, height], stateData[0]);


let svg1 = d3
  .select("#vis-container2")
  .append("svg")
  .attr("width", 615)
  .attr("height", 375);

let g1 = svg1.append("g").attr("class", "g-county");


// load and display the Massachusetts map
d3.json("../data/ma-counties2.topojson").then(function (topology) {
    
    //if (error) throw error;

    let datum = topojson.feature(topology, topology.objects.cb_2015_massachusetts_county_20m).features;
    console.log(datum);

    let projection1 = d3.geoMercator()
                    .center([0, 0])
                    //.scale(5000);
                    .scale(7000)
                    .rotate([0, 0])
                    .translate([9000, 5800]);

    //let featureCollection = {"type":"featureCollection","features":topology};
    //projection1.fitSize([615, 375], featureCollection);

    //console.log(featureCollection);

    let path1 = d3.geoPath().projection(projection1);

    // var tooltipDiv = d3.select("body").append("div")    
    // .attr("class", "tooltip")               
    // .style("opacity", 0);

  g1.selectAll("path")
    .data(datum)
    .enter()
    .append("path")
    .attr("class", "county")
    .attr("d", path1)
    .style("stroke", "white")
    .on('mouseover', function(d) {
        mouseEvent(d, this, true);
    })
    .on('mouseout', function(d) {
        mouseEvent(d, this, false);
        // div.transition()        
        //     .duration(500)      
        //     .style("opacity", 0); 
    })
    .append('title')
    .text(d => d.properties.NAME);

    function mouseEvent(d, item, bool) {
        d3.select(item).classed("selected", bool);
        //document.getElementById("county-name").innerHTML = d.vessel_name;
        //d3.select(item).append("div").attr("class", "div.tooltip");
    };

    // console.log(g);
    console.log(g1);

});