// credit to http://bl.ocks.org/michaschwab/411cbbd398e9b74e297f4aecf0410f70 for initial d3 v4 county mapcode
// credit to https://bl.ocks.org/tophtucker/87f02769353208d625c4762a02a3ad55 for color legend

let width = 615;
let height = 375;

let projection = d3.geoMercator()
                    .center([0, 0])
                    .scale(width / 2.5 / Math.PI)
                    .rotate([0, 0])
                    .translate([width / 2, height / 2]);

let path = d3.geoPath().projection(null);

let svg = d3
  .select("#vis-container")
  .append("svg")
  .attr("width", 615)
  .attr("height", 375);

let g = svg.append("g").attr("class", "g-town");

const tooltip1 = d3.select("#vis-container")
                    .append("div")
                    .attr('id', "tooltip1")
                    .style("opacity", 0)
                    .attr("class", "tooltip");

const mouseover1 = function(event, d) {
    tooltip1.html("School Name: [INSERT SCHOOL NAME HERE], School Type: Public, County: [County Name]");
}

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

// load and display the Massachusetts map
d3.json("../data/ma-towns.topojson").then(function (topology) {
  g.selectAll("path")
    .data(topojson.feature(topology, topology.objects.towns).features)
    .enter()
    .append("path")
    .attr("class", "town")
    .attr("d", path)
    .style("stroke", "white");

  let data = [
    [100, 10, "red"],
    [10, 280, "lightgreen"],
    [10, 23, "red"],
    [1, 1, "lightgreen"],
    [-8, -6, "red"],
    [1, 50, "lightgreen"],
    [-100, -1, "red"],
    [-104, -1, "lightgreen"],
    [-104, 10, "lightgreen"],
    [-105, 30, "red"],
    [-130, 50, "lightgreen"],
    [-105, 31, "red"],
    [-130, 52, "lightgreen"],
    [-150, 30, "red"],
    [-150, 60, "lightgreen"],
    [-100, 50, "lightgreen"],
    [-9, 31, "red"],
    [-90, 70, "lightgreen"],
    [-80, 60, "red"],
    [-75, 50, "lightgreen"],
    [90, -50, "red"],
    [100, -40, "lightgreen"],
    [100, -60, "red"],
    [90, -20, "red"],
    [90, -40, "lightgreen"],
    [80, -60, "lightgreen"],
    [70, -20, "lightgreen"],
    [70, 40, "red"],
    [80, 42, "lightgreen"],
    [70, 50, "red"],
    [80, 45, "lightgreen"],
    [75, 40, "lightgreen"],
    [85, 40, "red"],
    [30, 70, "red"],
    [80, 75, "lightgreen"],
    [75, 75, "lightgreen"],
    [85, 70, "red"],
    [-40, 40, "lightgreen"],
    [-180, 40, "red"],
    [-180, 20, "lightgreen"],
  ];

  // add circles to svg
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      console.log(projection(d));
      return projection(d)[0];
    })
    .attr("cy", function (d) {
      return projection(d)[1];
    })
    .attr("r", "4px")
    .attr("fill", function (d) {
      return d[2];
    });
});