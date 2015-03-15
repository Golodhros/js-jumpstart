// Slider Control
// --------------

function sliderControl() {

    // Slider Attributes

    // Slider width.
    var width = 600;

    // Default domain.
    var domain = [0, 100];

    // Default slider callback.
    var onSlide = function(selection) { };

    // Charting function.
    function chart(selection) {
        selection.each(function(data) {

            // Select the container group.
            var group = d3.select(this);

            // Add a line covering the complete width.
            group.selectAll('line')
                .data([data])
                .enter()
                .append('line')
                .call(chart.initLine);

            // Append a circle as handler.
            var handle = group.selectAll('circle')
                .data([data])
                .enter().append('circle')
                .call(chart.initHandle);

            // Set the position scale.
            var posScale = d3.scale.linear()
                .domain(domain)
                .range([0, width]);


            // Set the position of the circle and adds the drag behavior.
            handle.attr('cx', function(d) { return posScale(d); });

            // Create and configure the drag behavior.
            var drag = d3.behavior.drag()
                .on('drag', moveHandle);

            handle.call(drag);

            function moveHandle(d) {
                // Compute the future position of the handle
                var cx = +d3.select(this).attr('cx') + d3.event.dx;

                // Update the position if its within its valid range.
                if ((0 < cx) && (cx < width)) {
                    // Compute the new value and rebind the data
                    d3.select(this)
                        .data([posScale.invert(cx)])
                        .attr('cx', cx)
                        .call(onSlide);
                }
            }
        });
    }

    // Set the initial attributes of the line.
    chart.initLine = function(selection) {
        selection
            .attr('x1', 2)
            .attr('x2', width - 4)
            .attr('stroke', '#777')
            .attr('stroke-width', 4)
            .attr('stroke-linecap', 'round');
    };

    // Set the initial attributes of the handle.
    chart.initHandle = function(selection) {
        selection
            .attr('cx', function(d) { return width / 2; })
            .attr('r', 6)
            .attr('fill', '#aaa')
            .attr('stroke', '#222')
            .attr('stroke-width', 2);
    };

    // Accessor Methods

    // Width
    chart.width = function(value) {
        if (!arguments.length) { return width; }
        width = value;
        return chart;
    };

    // Domain
    chart.domain = function(value) {
        if (!arguments.length) { return domain; }
        domain = value;
        return chart;
    };

    // Slide callback function
    chart.onSlide = function(onSlideFunction) {
        if (!arguments.length) { return onSlide; }
        onSlide = onSlideFunction;
        return chart;
    };

    return chart;
}

// Chart Settings
var width = 600,
    height = 40,
    margin = 10;

// Initial value
var domain = [0, 100],
    value = 35;

// Create the svg element
var svg = d3.select('#chart03').append('svg')
    .attr('width', width + 2 * margin)
    .attr('height', height + 3 * margin);

// Create a color scale with the same range that the slider
var cScale = d3.scale.linear()
    .domain(domain)
    .range(['#edd400', '#a40000']);

// Add a background to the svg element.
var rectangle = svg.append('rect')
    .attr('x', margin)
    .attr('y', 2 * margin)
    .attr('width', width)
    .attr('height', height)
    .attr('fill', cScale(value));

// Create and configure the slider control.
var slider = sliderControl()
    .domain(domain)
    .width(width)
    .onSlide(function(selection) {
        selection.each(function(d) {
            rectangle.attr('fill', cScale(d));
        });
    });

// Create a group to hold the slider and add the slider to it.
var gSlider = svg.selectAll('g')
    .data([value])
    .enter()
    .append('g')
    .attr('transform', 'translate(' + [margin, margin] + ')')
    .call(slider);