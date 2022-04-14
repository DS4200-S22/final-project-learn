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
};

/////////////////////
// COUNTY MAP CODE://
/////////////////////

// Dictionaries of County Data
// Names of counties
let countyNames = {
  Berkshire: "Berkshire",
  Franklin: "Franklin",
  Hampshire: "Hampshire",
  Hampden: "Hampden",
  Worcester: "Worcester",
  Essex: "Essex",
  Middlesex: "Middlesex",
  Suffolk: "Suffolk",
  Norfolk: "Norfolk",
  Plymouth: "Plymouth",
  Bristol: "Bristol",
  Barnstable: "Barnstable",
  Dukes: "Dukes",
  Nantucket: "Nantucket",
};

// Number of schools in each county
let numSchools = {
  Berkshire: 12,
  Franklin: 9,
  Hampshire: 14,
  Hampden: 33,
  Worcester: 59,
  Essex: 37,
  Middlesex: 64,
  Suffolk: 48,
  Norfolk: 33,
  Plymouth: 32,
  Bristol: 28,
  Barnstable: 11,
  Dukes: 2,
  Nantucket: 1,
};

// Number os students in each county
let numStudents = {
  Berkshire: 6065,
  Franklin: 3984,
  Hampshire: 7140,
  Hampden: 24752,
  Worcester: 41677,
  Essex: 37076,
  Middlesex: 72632,
  Suffolk: 32456,
  Norfolk: 35027,
  Plymouth: 27129,
  Bristol: 28054,
  Barnstable: 8852,
  Dukes: 842,
  Nantucket: 533,
};

// Percentage of schools that offer CS in each county
let perCS = {
  Berkshire: 100,
  Franklin: 78,
  Hampshire: 86,
  Hampden: 64,
  Worcester: 83,
  Essex: 92,
  Middlesex: 91,
  Suffolk: 71,
  Norfolk: 85,
  Plymouth: 81,
  Bristol: 82,
  Barnstable: 91,
  Dukes: 50,
  Nantucket: 100,
};

const tooltip2 = d3
  .select("#vis-container2")
  .append("div")
  .attr("id", "tooltip2")
  .style("opacity", 0)
  .attr("class", "tooltip");

const mouseover2 = function (event, d) {
  let name = d.properties.NAME;
  tooltip2.html(
    "Name: " +
      name +
      "<br>" +
      "Total Schools: " +
      numSchools.name +
      "<br>" +
      "Total Students: " +
      numStudents.name +
      "<br>" +
      "Percentage that offer CS: " +
      perCS.name
  );
};

const mousemove2 = function (event, d) {
  tooltip2
    .style("left", event.pageX + "px")
    .style("top", event.pageY + yTooltipOffset + "px");
};

const mouseleave2 = function (event, d) {
  tooltip2.style("opacity", 0);
};

// initialize brush for left map and circles for both point maps
let brush1, myCircles1, myCircles2;

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
  // add scales for maps
  let x1, y1;

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
      .on("mouseleave", mouseleave1);
  });

  // load and display the Massachusetts map
  // add scales for maps
  d3.json("../data/ma-towns.topojson").then(function (topology) {
    g2.selectAll("path")
      .data(topojson.feature(topology, topology.objects.towns).features)
      .enter()
      .append("path")
      .attr("class", "town")
      .attr("d", path)
      .style("stroke", "white");

    x1 = d3
      .scaleLinear()
      .domain([0, width])
      .range([50, width - 50]);

    y1 = d3
      .scaleLinear()
      .domain([0, height])
      .range([height - 50, 50]);
    // add circles to svg
    myCircles2 = svg3
      .selectAll("#vis-container3")
      .data(data)
      .enter()
      .append("circle", "#vis-container3")
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
      });

    // define a brush and add brush1 to svg
    brush1 = d3.brush().extent([
      [0, 0],
      [width, height],
    ]);
    svg3.call(brush1.on("start", clear).on("brush", updateChart1));
  });

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
      .attr("class", "county")
      .attr("d", path1)
      .style("stroke", "white")
      .on("mouseover", mouseover2)
      .on("mousemove", mousemove2)
      .on("mouseleave", mouseleave2)
      .on("mouseover", function (text) {
        mouseEvent(text, this, true);
      })
      .on("mouseout", function (text) {
        mouseEvent(text, this, false);
      })
      .append("title")
      .text((d) => d.properties.NAME);

    function mouseEvent(text, item, bool) {
      d3.select(item).classed("selected", bool);
    }
  });

  // Brushing Code

  // Call to remove existing brushes
  function clear() {
    // Clear existing brush from svg1
    svg3.call(brush1.move, null);
  }

  // Call when left map is brushed
  function updateChart1(brushEvent) {
    // find coordinates of brushed region
    let coords = d3.brushSelection(this);

    // give bold outline to all points within the brush region in left map
    myCircles1.classed("selected", function (d) {
      return isBrushed(coords, x1(d.Latitude), y1(d.Longitude));
    });

    // give bold outline to all points in second map
    myCircles2.classed("selected", function (d) {
      return isBrushed(coords, x1(d.Latitude), y1(d.Longitude));
    });
  }

  // Is this region brushed?
  function isBrushed(brush_coords, cx, cy) {
    if (brush_coords === null) return;

    let x0 = brush_coords[0][0],
      x1 = brush_coords[1][0],
      y0 = brush_coords[0][1],
      y1 = brush_coords[1][1];
    return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1; // This return TRUE or FALSE depending on if the points is in the selected area
  }
});
