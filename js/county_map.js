// let usData = await d3.json('https://d3js.org/us-10m.v2.json');

let svg1 = d3.select("#vis-container2")
              .append("svg")
              .attr("width", 615)
              .attr("height", 375);

let g1 = svg1.append("g").attr("class", "g-county");

// Number of schools in each county
var numSchools = {"Berkshire":12, "Franklin":9, "Hampshire":14, "Hampden":33, "Worcester":59, "Essex":37, "Middlesex":64, "Suffolk":48, "Norfolk":33, "Plymouth":32, "Bristol":28, "Barnstable":11, "Dukes":2, "Nantucket":1};
// Number os students in each county
var numStudents = {"Berkshire":6065, "Franklin":3984, "Hampshire":7140, "Hampden":24752, "Worcester":41677, "Essex":37076, "Middlesex":72632, "Suffolk":32456, "Norfolk":35027, "Plymouth":27129, "Bristol":28054, "Barnstable":8852, "Dukes":842, "Nantucket":533};
// Percentage of schools that offer CS in each county 
var perCS = {"Berkshire":100, "Franklin":78, "Hampshire":86, "Hampden":64, "Worcester":83, "Essex":92, "Middlesex":91, "Suffolk":71, "Norfolk":85, "Plymouth":81, "Bristol":82, "Barnstable":91, "Dukes":50, "Nantucket":100};


// load and display the Massachusetts map
d3.json("../data/ma-counties.topojson").then(function (topology) {

  let datum = topojson.feature(
    topology,
    topology.objects.cb_2015_massachusetts_county_20m
  ).features;

  let projection1 = d3
    .geoMercator()
    .center([0, 0])
    //.scale(5000);
    .scale(7000)
    .rotate([0, 0])
    .translate([9000, 5800]);

  let path1 = d3.geoPath()
                .projection(projection1);

  g1.selectAll("path")
    .data(datum)
    .enter()
    .append("path")
    .attr("class", "county")
    .attr("d", path1)
    .style("stroke", "white")
    .on("mouseover", function (d) {
      mouseEvent(d, this, true);
    })
    .on("mouseout", function (d) {
      mouseEvent(d, this, false);
    })
    .append("title")
    .text((d) => d.properties.NAME);

  function mouseEvent(d, item, bool) {
    d3.select(item)
      .classed("selected", bool);
  }
});
