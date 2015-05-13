function start()
{
  getData();
}

function getData()
{
  var value_req = new XMLHttpRequest();
  value_req.onload = tableReturned;
  value_req.open( "get", "get_table_contents" );
  value_req.send();
}

function tableReturned()
{
  var a_y = [];
  var a_r = [];
    console.log( this.responseText );
    var x, y;
    var rows = JSON.parse( this.responseText );
    console.log(rows)
    for( var i = 0; i < rows.length; i++ )
    {
        var yellows = rows[i].YellowsPG
        var reds = rows[i].RedsPG
        a_y[i] = {x: i, y: yellows};
        a_r[i] = {x: i, y: reds};
    }

    var n = 2, // number of layers
        m = 18, // number of samples per layer
        stack = d3.layout.stack(),
        layers = stack(d3.range(n).map(function( layer_idx ) { if(layer_idx == 0)return a_y; else return a_r; })),
        yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
        yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

    var margin = {top: 50, right: 50, bottom: 50, left: 50},
        width = 920 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .domain(d3.range(m))
        .rangeRoundBands([0, width], .08);

    var y = d3.scale.linear()
        .domain([0, yStackMax])
        .range([height, 0]);

    var color = d3.scale.linear()
        .domain([0, n - 1])
        .range(["#ff0", "#f00"]);

    var xAxis = d3.svg.axis()
        .ticks(0)
        .tickValues(ref_names)
        .tickSize(0)
        .tickPadding(6)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .tickSize(0)
        .tickPadding(6)
        .orient("left");

    var svg = d3.select("body").append("svg")
        .attr("width", width + 50 + margin.left + margin.right)
        .attr("height", height + 50 + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var layer = svg.selectAll(".layer")
        .data(layers)
      .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d, i) { return color(i); });

    var rect = layer.selectAll("rect")
        .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", height)
        .attr("width", x.rangeBand())
        .attr("height", 0);

    rect.transition()
        .delay(function(d, i) { return i * 10; })
        .attr("y", function(d) { return y(d.y0 + d.y); })
        .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width + 70)
        .attr("y", height - 6)
        .text("Referee name");

    var ref_names = ["Martin Atkinson",
        "Mark Clattenburg",
        "Mike Dean",
        "Phil Dowd",
        "Roger East",
        "Chris Foy",
        "Kevin Friend",
        "Mike Jones",
        "Robert Madley",
        "Andre Marriner",
        "Lee Mason",
        "Jonathan Moss",
        "Michael Oliver",
        "Craig Pawson",
        "Lee Probert",
        "Neil Swarbrick",
        "Anthony Taylor",
        "Howard Webb"]



  for( var i = m-1; i >= 0; i--)
  {
    svg.append("text")
        .attr("class", i + " label")
        .attr("text-anchor", "end")
        .attr("x", height - 50)
        .attr("y", i*45 - (width - 30))
        .text(ref_names[(m-i)-1])
        .attr("transform", "rotate(90)");

  }

    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("x", 85)
        .attr("y", height - 375)
        //.attr("transform", "rotate(90)")
        .text("Cards per game");

    svg.append("g")
        .attr("class", "y axis")
        //.attr("transform", "translate(0," + height + ")")
        .call(yAxis);

    d3.selectAll("input").on("change", change);

    var timeout = setTimeout(function() {
      d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
    }, 2000);

    function change() {
      clearTimeout(timeout);
      if (this.value === "grouped") transitionGrouped();
      else transitionStacked();
    }

    function transitionGrouped() {
      y.domain([0, yGroupMax]);

      rect.transition()
          .duration(500)
          .delay(function(d, i) { return i * 10; })
          .attr("x", function(d, i, j) { return x(d.x) + x.rangeBand() / n * j; })
          .attr("width", x.rangeBand() / n)
        .transition()
          .attr("y", function(d) { return y(d.y); })
          .attr("height", function(d) { return height - y(d.y); });
    }

    function transitionStacked() {
      y.domain([0, yStackMax]);

      rect.transition()
          .duration(500)
          .delay(function(d, i) { return i * 10; })
          .attr("y", function(d) { return y(d.y0 + d.y); })
          .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
        .transition()
          .attr("x", function(d) { return x(d.x); })
          .attr("width", x.rangeBand());
    }
}
