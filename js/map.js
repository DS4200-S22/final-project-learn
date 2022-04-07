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
            .attr("width", 615)
            .attr("height", 375);

let g = svg.append("g").attr("class", "g-town");

const tooltip1 = d3.select("#vis-container")
                    .append("div")
                    .attr("id", "tooltip1")
                    .style("opacity", 0)
                    .attr("class", "tooltip");

const mouseover1 = function (event, d) {
  tooltip1.html(
    "School Name: [INSERT SCHOOL NAME HERE], School Type: Public, County: [County Name]"
  );
};

const mousemove1 = function (event, d) {
  tooltip1
    .style("left", event.pageX + "px")
    .style("top", event.pageY + yTooltipOffset + "px");
};

// This creates a constant that represents a function that
// sets the tooltip opacity back to 0 (invisible) after the mouse
// leaves the object
const mouseleave1 = function (event, d) {
  tooltip1.style("opacity", 0);
};

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

  let data = [
    [100, 10, "deepskyblue"],
    [10, 280, "deepskyblue"],
    [10, 23, "salmon"],
    [1, 1, "deepskyblue"],
    [-8, -6, "salmon"],
    [1, 50, "deepskyblue"],
    [-100, -1, "salmon"],
    [-104, -1, "deepskyblue"],
    [-104, 10, "deepskyblue"],
    [-105, 30, "salmon"],
    [-130, 50, "deepskyblue"],
    [-105, 31, "salmon"],
    [-130, 52, "deepskyblue"],
    [-150, 30, "salmon"],
    [-150, 60, "deepskyblue"],
    [-100, 50, "deepskyblue"],
    [-9, 31, "salmon"],
    [-90, 70, "deepskyblue"],
    [-80, 60, "salmon"],
    [-75, 50, "deepskyblue"],
    [90, -50, "salmon"],
    [100, -40, "deepskyblue"],
    [100, -60, "salmon"],
    [90, -20, "salmon"],
    [90, -40, "deepskyblue"],
    [80, -60, "deepskyblue"],
    [70, -20, "deepskyblue"],
    [70, 40, "salmon"],
    [80, 42, "deepskyblue"],
    [70, 50, "salmon"],
    [80, 45, "deepskyblue"],
    [75, 40, "deepskyblue"],
    [85, 40, "salmon"],
    [30, 70, "salmon"],
    [80, 75, "deepskyblue"],
    [75, 75, "deepskyblue"],
    [85, 70, "salmon"],
    [-40, 40, "deepskyblue"],
    [-180, 40, "salmon"],
    [-180, 20, "deepskyblue"],
  ];

  // add circles to svg
  svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function (d) {
          return projection(d)[0];
        })
        .attr("cy", function (d) {
          return projection(d)[1];
        })
        .attr("r", "4px")
        .attr("fill", function (d) {
          return d[2];
        })
          .on("mouseover", mouseover1)
          .on("mousemove", mousemove1)
          .on("mouseleave", mouseleave1);
});
