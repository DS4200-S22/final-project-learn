let width = 615;
let height = 375;
let yTooltipOffset = 15;

let projection = d3
  .geoMercator()
  .center([0, 0])
  .scale(width / 2.5 / Math.PI)
  .rotate([0, 0])
  .translate([width / 2, height / 2]);

let path = d3.geoPath().projection(null);

let svg = d3
  .select("#vis-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

let g = svg.append("g").attr("class", "g-town");

let svg2 = d3
  .select("#vis-container2")
  .append("svg")
  .attr("width", 615)
  .attr("height", 375);

let g1 = svg2.append("g").attr("class", "g-county");

let svg3 = d3
  .select("#vis-container3")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

let g2 = svg3.append("g").attr("class", "g-link");

// This code selects the div associated with the id hard-coded-bar
// and appends a new div with the id tooltip1 that has a class tooltip
// ad currenly has opacity 0 (can't be seen).
const tooltip1 = d3
  .select("#vis-container")
  .append("div")
  .attr("id", "tooltip1")
  .style("opacity", 0)
  .attr("class", "tooltip");

// This creates a constant that represents a function that
// allows for the tooltip to display information when the mouse is
// over the object
const mouseover1 = function (event, d) {
  tooltip1
    .html(
      "Name: " +
        d.School +
        "<br> County: " +
        d.County +
        "<br>" +
        "Offers CS?: " +
        d.offers_cs +
        "<br> Type: " +
        d.School_Type
    )
    .style("opacity", 1)
    .style("background-color", "white")
    .style("padding", "10px")
    .style("box-shadow", "0 30px 40px rgba(0,0,0,.2)");

  d3.select("#" + d.County.split(" ")[0]).style("fill", "deepskyblue");
};

// This creates a constant that represents a function that
// allows for the tooltip to follow the mouse while it is moving
// on the object
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

  d3.select("#" + d.County.split(" ")[0]).style("fill", "black");
};

const tooltip2 = d3
  .select("#vis-container2")
  .append("div")
  .attr("id", "tooltip2")
  .style("opacity", 0)
  .attr("class", "tooltip");

function mouseEvent(item, bool) {
  d3.select(item).classed("selected", bool);
}

const mouseover2 = function (event, d) {
  tooltip2
    .html("County: " + d.properties.NAME)
    .style("opacity", 1)
    .style("background-color", "white")
    .style("padding", "10px")
    .style("box-shadow", "0 30px 40px rgba(0,0,0,.2)");
};

const mousemove2 = function (event, d) {
  mouseEvent(this, true);
  tooltip2
    .style("left", event.pageX + "px")
    .style("top", event.pageY + yTooltipOffset + "px");
};

const mouseleave2 = function (event, d) {
  mouseEvent(this, false);
  tooltip2.style("opacity", 0);
};

// initialize brush for left map and circles for both point maps
let myCircles1;

// Handmade legend
svg
  .append("circle")
  .attr("cx", 10)
  .attr("cy", 330)
  .attr("r", 6)
  .style("fill", "deepskyblue");

svg
  .append("circle")
  .attr("cx", 10)
  .attr("cy", 360)
  .attr("r", 6)
  .style("fill", "salmon");

svg
  .append("text")
  .attr("x", 20)
  .attr("y", 331.5)
  .text("Teaches CS")
  .style("font-size", "15px")
  .attr("alignment-baseline", "middle");

svg
  .append("text")
  .attr("x", 20)
  .attr("y", 361.5)
  .text("Does Not Teach CS")
  .style("font-size", "15px")
  .attr("alignment-baseline", "middle");

// load csv data
d3.csv("../data/cs_report.csv").then((data) => {
  // load and display the Massachusetts map
  d3.json("../data/ma-counties.topojson").then(function (topology) {
    let datum = topojson.feature(
      topology,
      topology.objects.cb_2015_massachusetts_county_20m
    ).features;

    let projection1 = d3
      .geoMercator()
      .center([0, 0])
      .scale(7000)
      .rotate([0, 0])
      .translate([9000, 5800]);

    let path1 = d3.geoPath().projection(projection1);

    g1.selectAll("path")
      .data(datum)
      .enter()
      .append("path")
      .attr("d", path1)
      .attr("id", function (d) {
        return d.properties.NAME;
      })
      .style("stroke", "white")
      .on("mouseover", mouseover2)
      .on("mousemove", mousemove2)
      .on("mouseleave", mouseleave2);
  });

  // load data for point map
  d3.json("../data/ma-towns.topojson").then(function (topology) {
    g.selectAll("path")
      .data(topojson.feature(topology, topology.objects.towns).features)
      .enter()
      .append("path")
      .attr("class", "town")
      .attr("d", path)
      .style("stroke", "white");

    // add circles to svg
    myCircles1 = svg
      .selectAll("#vis-container")
      .data(data)
      .enter()
      .append("circle", "#vis-container")
      .attr("r", 4)
      .raise()
      .attr("fill", function (d) {
        return d.offers_cs === "Yes" ? "deepskyblue" : "salmon";
      })
      .attr("transform", function (d) {
        return (
          "translate(" +
          projection([+d.Longitude * 100.4 - 1, +d.Latitude * 94.3]) +
          ")"
        );
      })
      .on("mouseover", mouseover1)
      .on("mousemove", mousemove1)
      .on("mouseleave", mouseleave1)
      .on("click", function () {});
  });
});
