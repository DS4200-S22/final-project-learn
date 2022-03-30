//This is filler -- delete it and start coding your visualization tool here
/*d3.select("#vis-container")
  .append("text")
  .attr("x", 20)
  .attr("y", 20)
  .text("Hello World!");*/

function tabulate(data, columns) {
  var table = d3.select("#table-container").append("table");
  var thead = table.append("thead");
  var tbody = table.append("tbody");

  // append the header row
  thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
        .text(function (column) {
        return column;
        });

  // create a row for each object in the data
  var rows = tbody.selectAll("tr")
                    .data(data)
                    .enter()
                    .append("tr");

  // create a cell in each row for each column
  var cells = rows
    .selectAll("td")
    .data(function (row) {
      return columns.map(function (column) {
        return { column: column, value: row[column] };
      });
    })
    .enter()
    .append("td")
    .text(function (d) {
      return d.value;
    });

  return table;
}

var columns = [
  "School Name",
  "Offers CS?",
  "Number Students per school",
  "School District Name",
  "County Name",
];

// hard coded data bc the file is not being accessed properly
var data = [
  {
    "School Name": "School1",
    "Offers CS?": "yes",
    "Number Students per school": "1000",
    "School District Name": "Boston",
    "County Name": "Suffolk",
  },
  {
    "School Name": "School2",
    "Offers CS?": "yes",
    "Number Students per school": "1000",
    "School District Name": "Boston",
    "County Name": "Suffolk",
  },
  {
    "School Name": "School3",
    "Offers CS?": "yes",
    "Number Students per school": "1000",
    "School District Name": "Boston",
    "County Name": "Suffolk",
  },
  {
    "School Name": "School4",
    "Offers CS?": "yes",
    "Number Students per school": "1000",
    "School District Name": "Boston",
    "County Name": "Suffolk",
  },
  {
    "School Name": "School5",
    "Offers CS?": "yes",
    "Number Students per school": "1000",
    "School District Name": "Boston",
    "County Name": "Suffolk",
  },
  {
    "School Name": "School6",
    "Offers CS?": "yes",
    "Number Students per school": "1000",
    "School District Name": "Boston",
    "County Name": "Suffolk",
  },
  {
    "School Name": "School7",
    "Offers CS?": "yes",
    "Number Students per school": "1000",
    "School District Name": "Boston",
    "County Name": "Suffolk",
  },
  {
    "School Name": "School8",
    "Offers CS?": "yes",
    "Number Students per school": "1000",
    "School District Name": "Boston",
    "County Name": "Suffolk",
  },
  {
    "School Name": "School9",
    "Offers CS?": "yes",
    "Number Students per school": "1000",
    "School District Name": "Boston",
    "County Name": "Suffolk",
  },
  {
    "School Name": "School10",
    "Offers CS?": "yes",
    "Number Students per school": "1000",
    "School District Name": "Boston",
    "County Name": "Suffolk",
  },
  {
    "School Name": "School11",
    "Offers CS?": "yes",
    "Number Students per school": "1000",
    "School District Name": "Boston",
    "County Name": "Suffolk",
  },
  {
    "School Name": "School12",
    "Offers CS?": "yes",
    "Number Students per school": "1000",
    "School District Name": "Boston",
    "County Name": "Suffolk",
  },
  {
    "School Name": "School13",
    "Offers CS?": "no",
    "Number Students per school": "1000",
    "School District Name": "Boston",
    "County Name": "Suffolk",
  },
  {
    "School Name": "School14",
    "Offers CS?": "yes",
    "Number Students per school": "1000",
    "School District Name": "Boston",
    "County Name": "Suffolk",
  },
  {
    "School Name": "School15",
    "Offers CS?": "yes",
    "Number Students per school": "1000",
    "School District Name": "Boston",
    "County Name": "Suffolk",
  },
];

tabulate(data, columns);