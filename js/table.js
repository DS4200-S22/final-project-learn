d3.csv("../data/cs_report.csv").then((data) => {
  // the columns you'd like to display
  columns = [
    "School",
    "offers_cs",
    "num_students",
    "School District Name",
    "County",
  ];

  (table = d3.select("#table-container").append("table")),
    (thead = table.append("thead")),
    (tbody = table.append("tbody"));

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
  rows = tbody.selectAll("tr")
              .data(data)
              .enter()
              .append("tr");

  // create a cell in each row for each column
  cells = rows.selectAll("td")
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

  d3.select("#gene_search_box").on("keyup", function () {
    // filter according to key pressed
    (searched_data = data), (text = this.value.trim().toUpperCase());
    //console.log(text);

    searchResults = searched_data.map(function (r) {
      regex = new RegExp(text);
      if (regex.test(r.School)) {
        // if there are any results
        return regex.exec(r.School)[0]; // return them to searchResults
        
      }
    });

    // filter blank entries from searchResults
    searchResults = searchResults.filter(function (r) {
      return r != undefined;
    });


    // filter dataset as with searchResults
    searched_data = searchResults.map(function (r) {
      return data.filter(function (p) {
        return p.School.indexOf(r) != -1;
      }); 
    });

    // flatten array
    searched_data = [].concat.apply([], searched_data);

    // data bind with new data
    rows = table.select("tbody")
                .selectAll("tr")
                .data(searched_data, function (d) {
                  return d.School;
                });

    // enter the rows
    rows.enter()
        .append("tr");

    // enter td's in each row
    row_entries = rows.selectAll("td")
                      .data(function (d) {
                        arr = [];
                        for (k in d) {
                          if (d.hasOwnProperty(k)) {
                            arr.push(d[k]);
                          }
                        }
                        return [arr[8], arr[9], arr[28], arr[29], arr[1]];
                        // 7 = school; 8 = School District Name; 27 = num_students; 28 = offers_cs; 1 = county
                      })
                      .enter()
                      .append("td");

    // draw row entries with no anchor
    row_entries_no_anchor = row_entries.filter(function (d) {
      return /https?:\/\//.test(d) == false;
    });
    row_entries_no_anchor.text(function (d) {
      return d;
    });

    /*
    // draw row entries with anchor
    row_entries_with_anchor = row_entries.filter(function (d) {
      return /https?:\/\//.test(d) == true;
    });
    row_entries_with_anchor.append("a")
                            .attr("href", function (d) {
                              return d;
                            })
                            .attr("target", "_blank")
                            .text(function (d) {
                              return d;
                            });*/

    // exit
    rows.exit().remove();
  });
});