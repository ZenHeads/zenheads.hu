function renderPieChart(container_selector, data, w, h) {
  
  var margin = {top: 30, right: 30, bottom: 10, left: 30},
      width = w - margin.left - margin.right,
      height = h - margin.top - margin.bottom;
  var colors = ['#4D4D4D', '#5DA5DA', '#FAA43A', '#60BD68', '#F17CB0', '#B2912F', '#B276B2', '#DECF3F', '#F15854'];
  
  var radius = height / 2;        
  
  var color = d3.scale.ordinal()
      .range(colors);
  var row_color = d3.scale.ordinal()
      .range(colors);
  
  var arc = d3.svg.arc()
      .outerRadius(radius - 10);
  
  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.input; });
  
  var svg = d3.select(container_selector).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
  var svg_center = svg.append("g")
      .attr("transform", "translate(" + height / 2 + "," + height / 2 + ")");
          
  


  if(data.length == 0) {
    var g = svg_center.selectAll(".arc")
        .data(pie([{select: 'placeholder', input: 1}]))
        .enter().append("g")
        .attr("class", "arc");
    g.append("path")
      .attr("d", arc)
      .style("fill", '#f2f2f2');
  } else {
    var g = svg_center.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");
        g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.select); });
        }
  
    d3.selectAll('#rows .legend')
      .style("border-color", function(d, i) { return row_color(i); });
  }

function updatePieCharts() {
  $('.chart').html('');
  calculateWeeklyTotal();
  var now_data = [], ideal_data = [];
  
  rows.map(function(row) {
    now_data.push({
      select: row.select,
      input: row.input_now
    });
    ideal_data.push({
      select: row.select,
      input: row.input_ideal
    });
  });
  
  renderPieChart('#chart-now', now_data, 200, 200);
  renderPieChart('#chart-ideal', ideal_data, 200, 200);
}

function calculateWeeklyTotal() {
  var total_now = 0,
      total_ideal = 0;
  rows.map(function(row) {
    total_now += parseFloat(row.input_now);
    total_ideal += parseFloat(row.input_ideal);
  });
  $('#weekly-total-now').html(total_now);
  $('#weekly-total-ideal').html(total_ideal);
  $('.weekly-hours').removeClass('text-danger');
  if(total_now > 168) {
    $('.weekly-hours.now').addClass('text-danger');
  }
  if(total_ideal > 168) {
    $('.weekly-hours.ideal').addClass('text-danger');
  }
}