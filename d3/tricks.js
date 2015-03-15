// Accessor Functions
// Adding the date accessor function
var value = function(d){ return d.date; };

// Accessor for the value function
chart.value = function(accessorFunction) {
    if(!arguments.length){ return value; }
    value = accessorFunction;
    return chart;
}

// Using it
var xScale = d3.time.scale()
    .domain(d3.extent(data, value));


// Chart Initializator
// Initialize the SVG Element
function svgInit(svg){
    // Set the SVG size
    svg
        .attr('width', width)
        .attr('height', height);

    // Create and translate the container group
    var g = svg.append('g')
        .attr('class', 'chart-content')
        .attr('transform', 'translate(' + [margin.top, margin.left] + ')');

    // Add a background rectangle
    g.append('rect')
        .attr('width', width - margin.left - margin.right)
        .attr('height', height - margin.top - margin.bottom)
        .attr('fill', 'white');


    // Other Version
    // Compute the width and height of the charting area
    var margin = chart.margin(),
        width = chart.width() - margin.left - margin.right,
        height = chart.height() - margin.top - margin.bottom,
        translate = windmill.svg.translate;

    // Set the size of the svg element
    svg
        .attr('width', chart.width())
        .attr('height', chart.height());

    // Chart Container
    svg.append('g')
        .attr('class', 'chart')
        .attr('transform', translate(margin.left, margin.top));

    // X Axis Container
    svg.append('g')
        .attr('class', 'axis xaxis')
        .attr('transform', translate(margin.left, margin.top + height));

    // Y Axis Container
    svg.append('g')
        .attr('class', 'axis yaxis')
        .attr('transform', translate(margin.left, margin.top));
};

// Using it
function chart(selection){
    selection.each(function(data){
        var div = d3.select(this),
            svg = div.selectAll('svg').data([data]);

        // Call the svgInit function on enter
        svg.enter()
            .append('svg')
            .call(svgInit);
    });
}


// Layout Algorithms
// Every chart makes assumptions about the kind and structure of thte data that they
// can display.

// Radial Layout
var radialLayout = function(){
    // Default date accessor
    var value = function(d) { return d.date; }

    // Default values for the angle extent
    var startAngle = 0,
        endAngle = 2 * Math.PI;

    // Layout algorithm
    function layout(data){
        // Create a map to stroe the data for each hour
        var hours = d3.range(0, 24),
            gmap = d3.map(),
            groups = [];

        // Angle for each hour item
        var itemAngle = (endAngle - startAngle) / 24;

        // Append a data item for each hour
        hours.forEach(function(h){
            gmap.set(h, {
                hour: h,
                startAngle: startAngle + h * itemAngle,
                endAngle: startAngle + (h + 1) * itemAngle,
                count: 0
            });
        });

        data.forEach(function(d){
            // Get the hour from the date attribute of each data item
            var hour = d.date.getHours();

            // Get the output data item corresponding to the item hour
            var val = gmap.get(hour);

            // We increment the count and set the value in the map
            val.count += 1;
            gmap.set(hour, val);
        })

        // Copy the values of the map and sort the output data array
        groups = gmap.values();
        groups.sort(function(a,b){ return a.hour > b.hour ? 1 : -1; });
        return groups;
    }

    layout.value = function(accessorFunction){
        if(!arguments.length){ return value; }
        value = accessorFunction;
        return layout;
    }

    layout.angleExtent = function(value){
        if(!arguments.length){ return value; }
        startAngle = value[0];
        endAngle = value[1];
        return layout;
    }

    return layout;
};

// Using it:
var layout = radialLayout()
    .angleExtent([Math.PI / 3, 2 * Math.PI / 3]);
var output = layout(data);


// Legend Charts
// Div element that contains paragraphs

function legendChart(){
    // Color Scale
    var cScale = d3.scale.category20();

    // Charting function
    function chart(selection){
        // Select the container element and set its attributes
        var containerDiv = d3.select(this)
            .style('width', width + 'px');

        // Add the label 'Legend' on enter
        containerDiv.selectAll('p.legent-title')
            .data([data])
            .enter().append('p')
            .attr('class', 'legend-title')
            .text('Legend');

        // Add a div for each data item
        var itemDiv = containerDiv.selectAll('div.item')
            .data(data)
            .enter().append('div')
            .attr('class', 'item');

        itemP.append('span').text('..')
            .style('color', cScale)
            .style('background', cScale);

    }

    // Color Scale Accessor
    chart.colorScale = function(value){
        if(!arguments.length){ return cScale; }
        cScale = value;
        return chart;
    };

    return chart;
}

// Using it
var legend = legendChart()
    .colorScale(chart.colorScale());

var legendDiv = d3.select('#legend')
    .data([chart.colorScale().domain()])
    .call(legend);




// TODO Harvest BB chp







// Create an accessor function for the given attribute
function createAccessor(attr) {
    // Accessor function
    function accessor(value) {
        if (!arguments.length) { return attributes[attr]; }
        attributes[attr] = value;
        return chart;
    }
    return accessor;
}

// Using it
chart['width'] = createAccessor('width');


// Default Attribute Container
var attributes = {
    width: 600,
    height: 300,
    margin: {top: 20, right: 20, bottom: 40, left: 40},
    colorExtent: ['#000', '#aaa'],
    value: function(d) { return d.value; },
    row: function(d) { return d.row; },
    column: function(d) { return d.column; }
};

// Create accessors for each element in attributes
for (var attr in attributes) {
    if ((!chart[attr]) && (attributes.hasOwnProperty(attr))) {
        chart[attr] = createAccessor(attr);
    }
}


// Generate a sample data array
var data = [];
var size = 20;
for (var k = 0; k < size; k += 1) {
    for (var j = 0; j < size; j += 1) {
        data.push({
            name: 'whatever ' + k + j,
            value: Math.cos(Math.PI * k * j / 60)
        });
    }
}



// Layout function
function layout(data) {
   // Output data array
   var groupedData = [];

   // Group and aggregate the input values...

   return groupedData;
}