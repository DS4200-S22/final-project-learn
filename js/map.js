let width = 615;
let height = 375;
let yTooltipOffset = 15;

let projection = d3.geoMercator()
                    .center([0, 0])
                    .scale(width / 2.5 / Math.PI)
                    .rotate([0, 0])
                    .translate([width / 2, height / 2]);

let path = d3.geoPath()
              .projection(null);

let svg = d3.select("#vis-container")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

let g = svg.append("g").attr("class", "g-town");

// This code selects the div associated with the id hard-coded-bar
// and appends a new div with the id tooltip1 that has a class tooltip
// ad currenly has opacity 0 (can't be seen).
const tooltip1 = d3.select("#vis-container") 
                    .append("div") 
                    .attr('id', "tooltip1") 
                    .style("opacity", 0) 
                    .attr("class", "tooltip"); 

// This creates a constant that represents a function that
// allows for the tooltip to display information when the mouse is
// over the object
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.School + "<br> County: " + d.County + "<br>" + "Offers CS?: " + d.offers_cs + "<br> Type: " + d.School_Type) 
          .style("opacity", 1)
          .style("background-color", "white")
          .style("padding", "10px")
          .style("box-shadow", "0 30px 40px rgba(0,0,0,.2)");  
}

// This creates a constant that represents a function that
// allows for the tooltip to follow the mouse while it is moving
// on the object
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.pageX)+"px") 
          .style("top", (event.pageY + yTooltipOffset) +"px"); 
}

// This creates a constant that represents a function that
// sets the tooltip opacity back to 0 (invisible) after the mouse
// leaves the object
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

// Handmade legend
svg.append("circle")
  .attr("cx", 10)
  .attr("cy", 330)
  .attr("r", 6)
  .style("fill", "deepskyblue");

svg.append("circle")
  .attr("cx", 10)
  .attr("cy", 360)
  .attr("r", 6)
  .style("fill", "salmon");

svg.append("text")
  .attr("x", 20)
  .attr("y", 331.5)
  .text("Teaches CS")
  .style("font-size", "15px")
  .attr("alignment-baseline", "middle");

svg.append("text")
  .attr("x", 20)
  .attr("y", 361.5)
  .text("Does Not Teach CS")
  .style("font-size", "15px")
  .attr("alignment-baseline", "middle");

// load and display the Massachusetts map
d3.json("../data/ma-towns.topojson").then(function (topology) {
  g.selectAll("path")
    .data(topojson.feature(topology, topology.objects.towns).features)
    .enter()
    .append("path")
    .attr("class", "town")
    .attr("d", path)
    .style("stroke", "white");

  // load csv data
  d3.csv("../data/cs_report.csv").then((data) => {
  // add circles to svg
  svg.selectAll("#vis-container")
  .data(data)
  .enter()
  .append("circle", "#vis-container")
  .attr("r", 4)
  .raise()
  .attr("fill", function (d) {
    return d.offers_cs === "Yes" ? "deepskyblue" : "salmon";
  })
  .attr("transform", function(d) {
    return "translate(" + projection([
      + d.Longitude * 100.4 - 1,
      + d.Latitude * 94.3
    ]) + ")";
    })
    .on("mouseover", mouseover1) 
    .on("mousemove", mousemove1)
    .on("mouseleave", mouseleave1);
  });
});