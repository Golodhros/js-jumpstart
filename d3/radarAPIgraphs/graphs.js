SP.graphs = {};

SP.graphs.utils = {
    // x: x-coordinate
    // y: y-coordinate
    // w: width
    // h: height
    // r: corner radius
    roundedRect: function(x, y, w, h, r) {
        var retval;
        retval  = "M" + (x + r) + "," + y;
        retval += "h" + (w - 2*r);
        retval += "a" + r + "," + r + " 0 0 1 " + r + "," + r;
        retval += "v" + (h - 2*r);
        retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + r;
        retval += "h" + (2*r - w);
        retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + -r;
        retval += "v" + (2*r - h);
        retval += "a" + r + "," + r + " 0 0 1 " + r + "," + -r;
        retval += "z";
        return retval;
    }
};

SP.graphs.dataManager = function module(){
    var exports = {},
        dispatch = d3.dispatch('dataReady', 'dataLoading', 'dataError'),
        data;

    d3.rebind(exports, dispatch, 'on');

    exports.loadJsonData = function(_file, _cleaningFn){
        var loadJson = d3.json(_file);

        loadJson.on('progress', function(){
            dispatch.dataLoading(d3.event.loaded);
        });

        loadJson.get(function (_err, _response){
            if(!_err){
                _response.data.forEach(function(d){
                    _cleaningFn(d);
                });
                data = _response.data;
                dispatch.dataReady(_response.data);
            }else{
                dispatch.dataError(_err.statusText);
            }
        });
    };

    // If we need more types of data geoJSON, csv, etc. we will need
    // to create methods for them

    exports.getCleanedData = function(){
        return data;
    };

    return exports;
};

SP.graphs.lineChart = function module(){
    // Default Values
    var margin = {top: 20, right: 20, bottom: 40, left: 40},
        width = 500,
        height = 500,
        ease = 'bounce',
        currency = '$',
        timeframe,
        graphH, graphW,
        svg, data, eventLine, sizeLine, loyaltyLine, revenueLine,
        xScale, eventScale, sizeScale, loyaltyScale, revenueScale, yScalePaddingRatio = 1.2,
        xAxis, eventAxis, sizeAxis, loyaltyAxis, revenueAxis,
        firstLine, secondLine,
        tooltipBoxHeight = 20,
        tooltipBoxWidth = 100,
        tooltipTransitionDuration = 100,
        overlayBarWidth = 20,
        criteriaColor = {
            size   : "#98cb60",
            revenue: "#f6d020",
            loyalty: "#de516e",
            event  : "#e09bec"
        },
        // Formats
        noDecimalFormat = d3.format(",.0f"),
        oneDecimalFormat = d3.format(",.1f"),
        twoDecimalFormat = d3.format(",.2f"),
        largeNumberFormat = d3.format("s"),
        dayMonthFormat = d3.time.format("%b. %d"),
        monthYearFormat = d3.time.format("%b %Y"),
        loyaltyTickFormat = function(d) {
            return noDecimalFormat(d) + "%";
        },
        currencyFormat = function(d) {
            if(d > 10000){
                return currency + largeNumberFormat(d);
            }else{
                return currency + noDecimalFormat(d);
            }
        },
        eventFormat = function(d) {
            if(d > 10000){
                return largeNumberFormat(d);
            }else{
                return noDecimalFormat(d);
            }
        },
        sizeFormat = function(d) {
            if(d > 10000){
                return largeNumberFormat(d);
            }else{
                return noDecimalFormat(d);
            }
        },
        loyaltyFormat = function(d) {
            return loyaltyTickFormat(d);
        },
        revenueFormat = function(d) {
            return currencyFormat(d);
        },
        // Dispatcher for the 'customHover' event
        dispatch = d3.dispatch('customHover');

    function exports(_selection) {

        _selection.each(function(_data) {
            var allDates, xDomain;

            graphW = width - margin.left - margin.right;
            graphH = height - margin.top - margin.bottom;

            data = _data;

            allDates = _.union( _data.event, _data.size, _data.revenue );
            xDomain = d3.extent( allDates, function(d) { return d.key; });

            xScale = d3.time.scale()
                .domain( d3.extent(xDomain) )
                .range([0, graphW]);

            xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom");

            if(timeframe === 'all' || timeframe === 'year'){
                xAxis.tickFormat(monthYearFormat);
            }else{
                xAxis.tickFormat(dayMonthFormat);
            }

            // Set Up axis and scales
            eventScale = d3.scale.linear()
                .domain([0, yScalePaddingRatio*d3.max(_data.event, function(d) { return parseInt(d.doc_count, 10); })])
                .range([graphH, 0]);

            eventAxis = d3.svg.axis()
                .scale(eventScale)
                .tickFormat(eventFormat);

            sizeScale = d3.scale.linear()
                .domain([0, yScalePaddingRatio*d3.max(_data.size, function(d) { return parseInt(d.doc_count, 10); })])
                .range([graphH, 0]);

            sizeAxis = d3.svg.axis()
                .scale(sizeScale)
                .tickFormat(sizeFormat);

            loyaltyScale = d3.scale.linear()
                .domain([0, 100])
                // .domain([0, d3.max(_data.loyalty, function(d) { return parseInt(d.doc_count, 10); }) ])
                .range([graphH, 0]);

            loyaltyAxis = d3.svg.axis()
                .scale(loyaltyScale)
                .tickFormat(loyaltyFormat);

            revenueScale = d3.scale.linear()
                .domain([0, yScalePaddingRatio*d3.max(_data.revenue, function(d) { return parseInt(d.doc_count, 10); })])
                .range([graphH, 0]);

            revenueAxis = d3.svg.axis()
                .scale(revenueScale)
                .tickFormat(revenueFormat);

            // Trick to just append the svg skeleton once
            svg = d3.select(this)
                .selectAll("svg")
                .data([_data]);

            svg.enter().append("svg")
                .classed("chart", true);

            var container = svg.append("g").classed("container-group", true);

            container.append("g").classed("chart-group", true);
            container.append("g").classed("x-axis-group axis", true);
            // Right Axis
            container.append("g").classed("y-axis-group-event axis", true);
            container.append("g").classed("y-axis-group-size axis", true);
            container.append("g").classed("y-axis-group-loyalty axis", true);
            container.append("g").classed("y-axis-group-revenue axis", true);

            svg.transition().ease(ease).attr({width: width, height: height});

            svg.select(".container-group")
                .attr({transform: "translate(" + margin.left + "," + margin.top + ")"});

            svg.select(".x-axis-group.axis")
                .transition()
                .ease(ease)
                .attr({transform: "translate(0," + (graphH) + ")"})
                .call(xAxis);

            // Draw Lines
            // create a line function that can convert data[] into x and y points
            eventLine = d3.svg.line()
                .x(function(d) {
                    return xScale(d.key);
                })
                .y(function(d) {
                    return eventScale(parseInt(d.doc_count, 10));
                });

            sizeLine = d3.svg.line()
                .x(function(d) {
                    return xScale(d.key);
                })
                .y(function(d) {
                    return sizeScale(parseInt(d.doc_count, 10));
                });

            loyaltyLine = d3.svg.line()
                .x(function(d) {
                    return xScale(d.key);
                })
                .y(function(d) {
                    return loyaltyScale(parseInt(d.doc_count, 10));
                });

            revenueLine = d3.svg.line()
                .x(function(d) {
                    return xScale(d.key);
                })
                .y(function(d) {
                    return revenueScale(parseInt(d.doc_count, 10));
                });

            // Initial State with Events and Loyalty
            // TODO: Add as a graph method
            exports.updateLine('event', 'show');
            firstLine = 'event';
            exports.updateLine('size', 'show');

            exports.prepareTooltips();
        });
    }

    exports.width = function(_x) {
        if (!arguments.length) return width;
        width = _x;
        return this;
    };

    exports.height = function(_x) {
        if (!arguments.length) return height;
        height = _x;
        return this;
    };

    exports.margin = function(_x) {
        if (!arguments.length) return margin;
        margin = _x;
        return this;
    };

    exports.ease = function(_x) {
        if (!arguments.length) return ease;
        ease = _x;
        return this;
    };

    exports.currency = function(_x) {
        if (!arguments.length) return currency;
        currency = _x;
        return this;
    };

    exports.timeframe = function(_x) {
        if (!arguments.length) return timeframe;
        timeframe = _x;
        return this;
    };

    exports.updateLine = function(criteria, newStatus){
        var lines = {
            event  : eventLine,
            size   : sizeLine,
            loyalty: loyaltyLine,
            revenue: revenueLine
        };

        if(criteria){
            if(newStatus === 'show'){
                svg.select(".chart-group")
                    .append("svg:path")
                    .data(data[criteria])
                    .on("mouseover", dispatch.customHover)
                    .style("stroke", function(d) { return criteriaColor[criteria]; })
                    .transition()
                    .ease(ease)
                    .attr("d", lines[criteria](data[criteria]))
                    .attr("class", "criteriaPath " + criteria + "Data");

                secondLine = criteria;
            }else{
                svg.select(".chart-group").selectAll('.' + criteria + 'Data')
                    .transition()
                    .ease(ease)
                    .style({opacity: 0})
                    .remove();
                svg.select(".y-axis-group-" + criteria + ".axis")
                    .transition()
                    .ease(ease)
                    .style({opacity: 0});

                if(firstLine === criteria){
                    firstLine = secondLine;
                    secondLine = '';
                }else if(secondLine === criteria){
                    secondLine = '';
                }
            }
            exports.updateGrid();
        }
    };

    // Axis positioning
    exports.updateGrid = function(){
        var criteriaAxis = {
            size   : sizeAxis,
            revenue: revenueAxis,
            loyalty: loyaltyAxis,
            event  : eventAxis
        };

        function showFirstAxis(criteria){
            if(criteria){
                criteriaAxis[criteria]
                    .orient("left")
                    .tickSize(-(graphW), 0, 0)
                    .tickPadding([5]);

                svg.select(".y-axis-group-" + criteria + ".axis")
                    .transition()
                    .ease(ease)
                    .attr({transform: "translate(0,0)"})
                    .style({opacity: 1})
                    .call(criteriaAxis[criteria]);

                svg.select(".y-axis-group-" + criteria + ".axis")
                    .selectAll('.tick line')
                    .style({opacity: 1});

                svg.select(".y-axis-group-" + criteria + ".axis")
                    .selectAll('.tick text')
                    .style("fill", criteriaColor[criteria]);
            }
        }

        function showSecondAxis(criteria){
            if(criteria){
                criteriaAxis[criteria]
                    .tickPadding([0])
                    .orient("right");

                svg.select(".y-axis-group-" + criteria + ".axis")
                    .transition()
                    .ease(ease)
                    .attr({transform: "translate(" + (graphW) + ",0)"})
                    .style({opacity: 1})
                    .call(criteriaAxis[criteria]);

                svg.select(".y-axis-group-" + criteria + ".axis")
                    .selectAll('.tick line')
                    .style({opacity: 0});

                svg.select(".y-axis-group-" + criteria + ".axis")
                    .selectAll('.tick text')
                    .style("fill", criteriaColor[criteria]);
            }
        }

        showFirstAxis(firstLine);
        showSecondAxis(secondLine);
    };

    exports.prepareTooltips = function(){
        var focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("rect")
            .attr("class", "x")
            .attr("y1", graphH)
            .attr("y2", 0)
            .attr("height", graphH)
            .attr("width", overlayBarWidth)
            .attr('fill','rgba(65, 72, 83, 0.12)');

        // Circle and Text for the first criteria line
        focus.append("circle")
            .attr("class", "y0")
            .attr("r", 4);

        focus.append("path")
            .attr("class", "y0")
            .attr("d", SP.graphs.utils.roundedRect(0, 0, tooltipBoxWidth, tooltipBoxHeight, 6))
            .attr("fill", "#f9fcfd");

        focus.append("text")
            .attr("class", "y0")
            .attr("dy", "-2px")
            .attr("dx", "5px");

        // Circle and Text for the second criteria line
        focus.append("circle")
            .attr("class", "y1")
            .attr("r", 4);

        focus.append("path")
            .attr("class", "y1")
            .attr("d", SP.graphs.utils.roundedRect(0, 0, tooltipBoxWidth, tooltipBoxHeight, 6))
            .attr("fill", "#f9fcfd");

        focus.append("text")
            .attr("class", "y1")
            .attr("dy", "15px")
            .attr("dx", "5px");

        // Appending a rectangle where the tooltips are shown
        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", graphW)
            .attr("height", graphH)
            .attr({ transform: "translate(" + margin.left + "," + margin.top + ")" })
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() {
                focus.style("display", "none");

                focus.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .on("mousemove", mousemove);

        // TODO: Extract method to create tooltips?
        function mousemove() {
            var bisectDate = d3.bisector(function(d) { return d.key; }).left,
                scales = {
                    event  : eventScale,
                    size   : sizeScale,
                    loyalty: loyaltyScale,
                    revenue: revenueScale
                },
                tooltipFormats = {
                    event  : function(d){ return "Actions: " + eventFormat(d); },
                    size   : function(d){ return "People: " + sizeFormat(d); },
                    loyalty: function(d){ return "Churn: " + loyaltyFormat(d); },
                    revenue: function(d){ return "Rev: " + revenueFormat(d); }
                },
                firstScale = scales[firstLine],
                firstFormat = tooltipFormats[firstLine],
                secondFormat = tooltipFormats[secondLine],
                // Calculating the data points for the mouse position
                x0 = xScale.invert(d3.mouse(this)[0]),
                indexFirstLine = bisectDate(data[firstLine], x0, 1),
                d0f = data[firstLine][indexFirstLine - 1],
                d1f = data[firstLine][indexFirstLine],
                df = x0 - parseInt(d0f.doc_count, 10) > parseInt(d1f.doc_count, 10) - x0 ? d1f : d0f,
                // As we don't know if there is a second line, we just declare the variables
                secondScale, indexSecondLine, d0s, d1s, ds,
                tooltip1Xposition, tooltip2Xposition,
                isPointInLastQuarter = (xScale(df.key) + margin.left) > graphW*0.75;

            focus.transition()
                .duration(tooltipTransitionDuration)
                .style("opacity", 0.9);

            // We flip the tooltips at the end of the graph to not overlap the axis
            if(isPointInLastQuarter){
                tooltip1Xposition = (xScale(df.key) + margin.left) - tooltipBoxWidth;
            }else{
                tooltip1Xposition = (xScale(df.key) + margin.left);
            }

            focus.select("circle.y0")
                .transition()
                .duration(tooltipTransitionDuration)
                .ease(ease)
                .style("fill", function(d) { return criteriaColor[firstLine]; })
                .style("stroke", "#ffffff")
                .attr("transform", "translate(" + (xScale(df.key) + margin.left) + "," + (firstScale(parseInt(df.doc_count,10)) + margin.top) + ")");
            focus.select("path.y0")
                .transition()
                .duration(tooltipTransitionDuration)
                .ease(ease)
                .style("fill", "#414853")
                .attr("transform", "translate(" + tooltip1Xposition + "," + (firstScale(parseInt(df.doc_count,10)) + margin.top - tooltipBoxHeight*1.3) + ")");
            focus.select("text.y0")
                .transition()
                .duration(tooltipTransitionDuration)
                .ease(ease)
                .style("fill", "#fff")
                .attr("transform", "translate(" + tooltip1Xposition + "," + (firstScale(parseInt(df.doc_count,10)) + margin.top - tooltipBoxHeight/2) + ")").text(firstFormat(df.doc_count));

            if(secondLine){
                secondScale = scales[secondLine];
                indexSecondLine = bisectDate(data[secondLine], x0, 1);
                d0s = data[secondLine][indexSecondLine - 1];
                d1s = data[secondLine][indexSecondLine];
                ds = x0 - parseInt(d0s.doc_count, 10) > parseInt(d1s.doc_count, 10) - x0 ? d1s : d0s;

                if(isPointInLastQuarter){
                    tooltip2Xposition = (xScale(df.key) + margin.left) - tooltipBoxWidth;
                }else{
                    tooltip2Xposition = (xScale(df.key) + margin.left);
                }

                focus.select("circle.y1")
                    .transition()
                    .duration(tooltipTransitionDuration)
                    .ease(ease)
                    .style("fill", function(d) { return criteriaColor[secondLine]; })
                    .style("stroke", "#ffffff")
                    .attr("transform", "translate(" + (xScale(ds.key) + margin.left) + "," + (secondScale(parseInt(ds.doc_count, 10)) + margin.top) + ")")
                    .style({opacity: 1});
                focus.select("path.y1")
                    .transition()
                    .duration(tooltipTransitionDuration)
                    .ease(ease)
                    .style("fill", "#414853")
                    .attr("transform", "translate(" + tooltip2Xposition + "," + (secondScale(parseInt(ds.doc_count, 10)) + margin.top + tooltipBoxHeight/4) + ")")
                    .style({opacity: 1});
                focus.select("text.y1")
                    .transition()
                    .duration(tooltipTransitionDuration)
                    .ease(ease)
                    .style("fill", "#fff")
                    .attr("transform", "translate(" + tooltip2Xposition + "," + (secondScale(parseInt(ds.doc_count, 10)) + margin.top + tooltipBoxHeight/5) + ")").text(secondFormat(ds.doc_count))
                    .style({opacity: 1});
            }else{
                focus.select("circle.y1")
                    .transition()
                    .duration(tooltipTransitionDuration)
                    .ease(ease)
                    .style({opacity: 0});
                focus.select("path.y1")
                    .transition()
                    .duration(tooltipTransitionDuration)
                    .ease(ease)
                    .style({opacity: 0});
                focus.select("text.y1")
                    .transition()
                    .duration(tooltipTransitionDuration)
                    .ease(ease)
                    .style({opacity: 0});
            }

            // Vertical Line on X axis
            focus.select(".x")
                .transition()
                .duration(tooltipTransitionDuration)
                .ease(ease)
                .attr("transform", "translate(" + (xScale(df.key) + margin.left - overlayBarWidth/2) + "," + margin.top + ")");
        }
    };

    d3.rebind(exports, dispatch, "on");

    return exports;
};

// IMPORTANT: This one should be the reference for future graphs
// Chad's design look and feel Graph
SP.graphs.stackedAreaChartChad = function module(){
    // Default Values
    var margin = {top: 20, right: 20, bottom: 40, left: 40},
        width = 500, height = 500,
        ease = 'bounce',
        currency = false,
        colors = [ '#9999d1', '#6dace3', '#6dcad1', '#53bd99', '#f0737b'],
        graphTitle = false,
        timeframe,
        graphH, graphW,
        svg, data, dataPoints = {},
        xScale, yScale, colorScale,
        xAxis, yAxis,
        layers, area,
        overlay, tooltipBox,
        legend = {
            xOffset   : 220,
            yOffset   : -38,
            width     : 100,
            squareSize: 16
        },
        tooltip = {
            tooltipXOffset       : 20,
            tooltipYOffset       : -20,
            tooltipWidth         : 100,
            tooltipHeight        : 120,
            tooltipTextColor     : '#c0c6cc',
            tooltipBodyYOffset   : 25,
            tooltipBodyTextHeight: 18
        },
        overlayWidth          = 20,
        titleXOffset          = 80,
        pointsSize            = 1.5,
        pointsAlertSize       = 4,
        pointsColor           = '#c0c6cc',
        pointsAlertColor      = '#f0737b',
        pointsBorderColor     = "#ffffff",
        pointsImprovementColor= '#53bd99',
        numVerticalTicks      = 5,
        numHorizontalTicks    = 5,
        scaleTextColor        = "#4a5864",
        verticalTicksLabelOffset= -50,
        // Dispatcher for the 'customHover' event
        dispatch = d3.dispatch('customHover');

    // Formats
    var noDecimalFormat   = d3.format(",.0f"),
        largeNumberFormat = d3.format("s"),
        dayAndMonthFormat = d3.time.format("%b. %d"),
        hourAndMinFormat  = d3.time.format('%H:%M %p'),
        currencyFormat    = function(d) {
            if(d > 10000){
                return currency + largeNumberFormat(d);
            }else{
                return currency + noDecimalFormat(d);
            }
        },
        eventFormat       = function(d) {
            if(d > 10000){
                return largeNumberFormat(d);
            }else{
                return noDecimalFormat(d);
            }
        },
        revenueFormat     = function(d) {
            return currencyFormat(d);
        },
        xTickFormat;

    function buildScales(){
        xScale = d3.time.scale()
            .domain(d3.extent(data, function(d) { return d.date; }))
            .range([0, width]);

        yScale = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d.y0 + d.y; })])
            .range([height, 0])
            .nice([numVerticalTicks + 1]);

        colorScale = d3.scale.ordinal()
              .range(colors);
    }

    function buildAxis(){
        if( !timeframe || timeframe === 'all' || timeframe === 'year'){
            xTickFormat = dayAndMonthFormat;
        }else{
            xTickFormat = hourAndMinFormat;
        }

        xAxis = d3.svg.axis()
            .scale(xScale)
            .ticks(numHorizontalTicks)
            .orient("bottom")
            .tickSize(-(height), 0, 0)
            .tickPadding([10])
            .tickFormat(function(d,i) {
                return xTickFormat(d);
            });

        yAxis = d3.svg.axis()
            .scale(yScale)
            .ticks(numVerticalTicks)
            .tickFormat(largeNumberFormat)
            .tickSize(-(width), 0, 0)
            .outerTickSize([50])
            .tickPadding([4])
            .orient("right");

        if(currency){
            yAxis.tickFormat(function(d,i) {
                return currencyFormat(d);
            });
        }
    }

    function buildContainerGroups(){
        var container = svg.append("g").classed("container-group", true);

        container.append("g").classed("chart-group", true);
        container.append("g").classed("x-axis-group axis", true);
        container.append("g").classed("y-axis-group axis", true);
        container.append("g").classed("pane-group", true);
        container.append("g").classed("metadata-group", true);
    }

    function buildLayers(){
        var stack = d3.layout.stack()
            .offset("zero")
            .values(function(d) { return d.values; })
            .x(function(d) { return d.date; })
            .y(function(d) { return d.events; });

        var nest = d3.nest()
           .key(function(d) { return d.category; });

        layers = stack(nest.entries(data));
    }

    function drawAxis(){
        svg.select('.x-axis-group.axis')
            .transition()
            .ease(ease)
            .attr({transform: "translate(0," + (graphH + margin.top + margin.top) + ")"})
            .style("fill", scaleTextColor)
            .call(xAxis);

        svg.select(".y-axis-group.axis")
            .transition()
            .ease(ease)
            .attr({ transform: "translate(" + (graphW) + ", 0)" })
            .style("fill", scaleTextColor)
            .call(yAxis);

        // Moving the YAxis tick labels to the right side
        d3.selectAll('.y-axis-group .tick text').attr("transform", "translate(" + verticalTicksLabelOffset + ", -10)");
    }

    function drawDataReferencePoints(){
        // Creates Dots on Data points
        var points = svg.select('.chart-group').selectAll('.dots')
        // var points = svg.selectAll(".dots")
            .data(layers)
          .enter().append("g")
            .attr("class", "dots")
            .attr("d", function(d) { return area(d.values); })
            .attr("clip-path", "url(#clip)");

        // Processes the points
        points.selectAll('.dot')
            .data(function(d, index){
                var a = [];
                d.values.forEach(function(point,i){
                    if(point.alert){
                        a.push({'index': index, 'point': point, 'alert': point.alert});
                    }else{
                        a.push({'index': index, 'point': point});
                    }
                });
                return a;
            })
            .enter()
            .append('circle')
            .attr('class','dot')
            .attr("r", function(d){
                if(d.alert){
                    return pointsAlertSize;
                }else{
                    return pointsSize;
                }
            })
            .attr('fill', function(d,i){
                if(d.alert){
                    if( d.alert.type === "alert"){
                        return pointsAlertColor;
                    }else{
                        return pointsImprovementColor;
                    }
                }else{
                    return pointsColor;
                }
            })
            .attr("stroke-width", function(d){
                return d.alert ? "2" : "0";
            })
            .attr("stroke", pointsBorderColor)
            .attr("transform", function(d) {
                var key = xScale(d.point.date);

                dataPoints[key] = dataPoints[key] || [];
                dataPoints[key].push(d);
                return "translate(" + xScale(d.point.date) + "," + yScale(d.point.y+d.point.y0) + ")"; }
            );
    }

    function drawHoverOverlay(){
        overlay = svg.select('.metadata-group').append('rect')
            .attr('class','overlay')
            .attr('y1', 0)
            .attr('y2', height)
            .attr('height', height)
            .attr('width', overlayWidth)
            .attr('fill','rgba(65, 72, 83, 0.12)')
            .style("display", "none");
    }

    function drawStackedAreas(){
        // Creating Area function
        area = d3.svg.area()
            .interpolate("cardinal")
            .x(function(d) { return xScale(d.date); })
            .y0(function(d) { return yScale(d.y0); })
            .y1(function(d) { return yScale(d.y0 + d.y); });

        // Drawing Areas
        svg.select('.chart-group').selectAll(".layer")
            .data(layers)
          .enter().append("path")
            .attr("class", "layer")
            .transition()
            .ease(ease)
            .attr("d", function(d) {
                return area(d.values);
            })
            .style("fill", function(d, i) { return colorScale(i); });
    }

    function drawTitle(){
        if(graphTitle){
            svg.select('.pane-group')
                .append("text")
                .attr("x", titleXOffset )
                .attr("y", 0 - (margin.top / 2))
                .attr("class", "graph-title")
                .attr("text-anchor", "middle")
                .text(graphTitle);
        }
    }

    function drawTooltip(){
        tooltipBox = svg.select('.metadata-group').append("g")
            .attr("class", "tooltip")
            .style("opacity", 0);

        tooltipBox.append("path")
            .attr("d", SP.graphs.utils.roundedRect(0, 0, tooltip.tooltipWidth, tooltip.tooltipHeight, 6))
            .attr("fill", "#414853")
            .style("opacity", 1);

        tooltipBox.append("text")
            .attr("x", 30)
            .attr("dy", "1.5em")
            .attr("class", "tooltip-title")
            .style("text-anchor", "left")
            .attr("font-size", "12px")
            .attr("fill", tooltip.tooltipTextColor);

        tooltipBox.append("g")
            .attr("x", 30)
            .attr("dy", "2.5em")
            .attr("class", "tooltip-body");
    }

    function addMouseEvents(){
        // Declare mouse related Behaviours
        svg.select('.container-group')
            .on("mouseover", function() { overlay.style("display", null); })
            .on("mouseout", function() {
                overlay.style("display", "none");

                tooltipBox.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .on("mousemove", function(){
                var coordinates = d3.mouse(this),
                    mouseX = coordinates[0],
                    invertedx = xScale.invert(mouseX),
                    mouseY = coordinates[1],
                    dps = [];

                // From http://codepen.io/ashokgowtham/pen/LpnHe?editors=001
                var keys = _.keys(dataPoints).sort(function(a, b){ return a-b; });
                var epsilon = (keys[1]-keys[0])/2;
                var nearest = _.find(keys, function(a) {
                    return Math.abs(a - mouseX) <= epsilon;
                });
                var tooltipXposition;

                if(nearest){
                    dps = dataPoints[nearest];

                    // Checking if tooltip is at the end of the graph
                    if((nearest + tooltip.tooltipXOffset) > 0.8*graphW){
                        tooltipXposition = nearest - tooltip.tooltipWidth - tooltip.tooltipXOffset/2;
                    }else{
                        tooltipXposition = nearest + tooltip.tooltipXOffset;
                    }

                    overlay.attr("transform", "translate(" + (nearest - overlayWidth/2) + ", 0)");
                    tooltipBox.attr("transform", "translate(" + tooltipXposition + "," + (mouseY + tooltip.tooltipYOffset) + ")");
                    tooltipBox.transition()
                        .duration(200)
                        .style("opacity", 0.9);

                    tooltipBox.select(".tooltip-title")
                        .text(xTickFormat(invertedx));

                    updateTooltipBodyContent(dps);
                }
            });
    }

    function updateTooltipBodyContent(currentDataPoints){
        var tooltipLegend,
            points = _.pluck(currentDataPoints, "point"),
            count = _.reduce(_.pluck(points, "events"), function(memo, num){
                return memo + num;
            }),
            dataPointsCopy = currentDataPoints.slice(0),
            alert = _.compact(_.pluck(dataPointsCopy, "alert")),
            isAlertTooltip = false;

        if(alert.length){
            dataPointsCopy.unshift({ index: "alert", point: alert[0] });
            isAlertTooltip = true;
        }
        dataPointsCopy.push({ index: dataPointsCopy.length, point: { category: "Total", events: count } });

        // We clean the previous legend
        tooltipBox.selectAll('.tooltip-legend').remove();

        // Creates the group element that encloses the legend
        tooltipLegend = tooltipBox.selectAll(".tooltip-body")
            .remove()
            .data(dataPointsCopy)
            .enter()
            .append("g")
            .attr("class", "tooltip-legend")
            .attr("transform", function (d, i) {
                return "translate(0," + (tooltip.tooltipBodyYOffset + i * tooltip.tooltipBodyTextHeight) + ")";
            });

        // The text with the category and data
        tooltipLegend.append("text")
            .attr("x", 10)
            .attr("y", 9)
            .attr("dy", ".25em")
            .text(function (d) {
                if(d.point.description){
                    return d.point.description;
                }else{
                    return d.point.category + ": " + d.point.events;
                }
            })
            .style("text-anchor", "left")
            .attr("font-size", "12px")
            .attr("fill", function(d, i) {
                if(d.point.description){
                    if(d.point.type === "alert"){
                        return pointsAlertColor;
                    }else{
                        return pointsImprovementColor;
                    }
                }else{
                    if(i < (dataPointsCopy.length-1)){
                        if(isAlertTooltip){
                            return colorScale(i - 1);
                        }else{
                            return colorScale(i);
                        }
                    }else{
                        return tooltip.tooltipTextColor;
                    }
                }
            });
    }

    function drawGraphLegend(){
        var legendContainer = svg.select(".pane-group").append("g")
                .attr("class", "legend-container"),
            legendBox = legendContainer.selectAll(".legend")
                .data(layers)
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function (d, i) {
                    return "translate(" + (legend.xOffset + i * legend.width) + "," + (legend.yOffset) + ")";
                });

        legendBox.append("rect")
            .attr("width", legend.squareSize)
            .attr("height", legend.squareSize)
            .style("fill", function(d, i) { return colorScale(i); });

        legendBox.append("text")
            .attr("y", 9)
            .attr("dy", ".25em")
            .attr("dx", "20px")
            .attr("class", "legend-label")
            .style("text-anchor", "start")
            .text(function (d) {
                return d.key;
            });
    }

    function exports(_selection) {
        _selection.each(function(_data){
            graphW = width - margin.left - margin.right;
            graphH = height - margin.top - margin.bottom;
            data = _data;

            buildLayers();
            buildScales();
            buildAxis();

            // Trick to just append the svg skeleton once
            svg = d3.select(this)
                .selectAll("svg")
                .data([_data]);

            svg.enter().append("svg")
                .classed("stacked-area-chart", true);

            buildContainerGroups();
            svg.transition().ease(ease).attr({width: width + margin.left + margin.right, height: height + margin.top + margin.bottom });
            svg.select(".container-group")
                .attr({transform: "translate(" + margin.left + "," + margin.top + ")"});

            drawStackedAreas();
            drawAxis();
            drawDataReferencePoints();
            drawTitle();
            drawGraphLegend();

            addMouseEvents();
            drawHoverOverlay();
            drawTooltip();
        });
    }

    exports.width = function(_x) {
        if (!arguments.length) return width;
        width = _x;
        return this;
    };

    exports.height = function(_x) {
        if (!arguments.length) return height;
        height = _x;
        return this;
    };

    exports.margin = function(_x) {
        if (!arguments.length) return margin;
        margin = _x;
        return this;
    };

    exports.ease = function(_x) {
        if (!arguments.length) return ease;
        ease = _x;
        return this;
    };

    exports.currency = function(_x) {
        if (!arguments.length) return currency;
        currency = _x;
        return this;
    };

    exports.timeframe = function(_x) {
        if (!arguments.length) return timeframe;
        timeframe = _x;
        return this;
    };

    exports.colors = function(_x) {
        if (!arguments.length) return colors;
        colors = _x;
        return this;
    };

    exports.title = function(_x) {
        if (!arguments.length) return graphTitle;
        graphTitle = _x;
        return this;
    };

    exports.legend = function(_x) {
        if (!arguments.length) return legend;
        legend = _x;
        return this;
    };

    d3.rebind(exports, dispatch, "on");

    return exports;
};

// Justin's design look and feel
SP.graphs.stackedAreaChart = function module(){
    // Default Values
    var margin = {top: 20, right: 20, bottom: 40, left: 40},
        width = 500, height = 500,
        ease = 'bounce',
        currency = false,
        colors = [ '#9999d1', '#6dace3', '#6dcad1', '#53bd99', '#f0737b'],
        graphTitle = false,
        timeframe,
        graphH, graphW,
        svg, data, dataPoints = {},
        xScale, yScale, colorScale,
        xAxis, yAxis,
        layers, area,
        overlay, tooltipBox,
        legend = {
            xOffset   : 220,
            yOffset   : -38,
            width     : 100,
            squareSize: 16
        },
        tooltip = {
            tooltipXOffset       : 20,
            tooltipYOffset       : -20,
            tooltipWidth         : 100,
            tooltipHeight        : 120,
            tooltipTextColor     : '#c0c6cc',
            tooltipBodyYOffset   : 25,
            tooltipBodyTextHeight: 18
        },
        overlayWidth          = 20,
        titleXOffset          = 80,
        pointsSize            = 4,
        pointsAlertSize       = 4,
        pointsColor           = "#ffffff",
        pointsAlertColor      = '#f0737b',
        pointsBorderColor     = "#ffffff",
        pointsImprovementColor= '#53bd99',
        numVerticalTicks      = 5,
        numHorizontalTicks    = 5,
        scaleTextColor        = "#4a5864",
        verticalTicksLabelOffset= -50,
        // Dispatcher for the 'customHover' event
        dispatch = d3.dispatch('customHover');

    // Formats
    var noDecimalFormat   = d3.format(",.0f"),
        largeNumberFormat = d3.format("s"),
        monthFormat       = d3.time.format("%b"),
        dayAndMonthFormat = d3.time.format("%b. %d"),
        hourAndMinFormat  = d3.time.format('%H:%M %p'),
        currencyFormat    = function(d) {
            if(d > 10000){
                return currency + largeNumberFormat(d);
            }else{
                return currency + noDecimalFormat(d);
            }
        },
        eventFormat       = function(d) {
            if(d > 10000){
                return largeNumberFormat(d);
            }else{
                return noDecimalFormat(d);
            }
        },
        revenueFormat     = function(d) {
            return currencyFormat(d);
        },
        xTickFormat;

    function buildScales(){
        var maxY = d3.max(data, function(d) {
            return d.y0 + d.y;
        });

        xScale = d3.time.scale()
            .domain(d3.extent(data, function(d) { return d.date; }))
            .range([0, graphW]);

        yScale = d3.scale.linear()
            .domain([0, maxY])
            .range([height, 0])
            .nice([numVerticalTicks + 1]);

        colorScale = d3.scale.ordinal()
              .range(colors);
    }

    function buildAxis(){
        if( !timeframe || timeframe === 'all' || timeframe === 'year'){
            xTickFormat = monthFormat;
        }else{
            xTickFormat = hourAndMinFormat;
        }

        xAxis = d3.svg.axis()
            .scale(xScale)
            .ticks(numHorizontalTicks)
            .orient("bottom")
            .tickPadding([10])
            .tickFormat(function(d,i) {
                return xTickFormat(d);
            });

        yAxis = d3.svg.axis()
            .scale(yScale)
            .ticks(numVerticalTicks)
            .tickFormat(largeNumberFormat)
            .tickSize(-(graphW), 0, 0)
            .outerTickSize([50])
            .tickPadding([4])
            .orient("right");

        if(currency){
            yAxis.tickFormat(function(d,i) {
                return currencyFormat(d);
            });
        }
    }

    function buildContainerGroups(){
        var container = svg.append("g").classed("container-group", true);

        container.append("g").classed("chart-group", true);
        container.append("g").classed("x-axis-group axis", true);
        container.append("g").classed("y-axis-group axis", true);
        container.append("g").classed("pane-group", true);
        container.append("g").classed("metadata-group", true);
    }

    function buildLayers(){
        var stack = d3.layout.stack()
            .offset("zero")
            .values(function(d) { return d.values; })
            .x(function(d) { return d.date; })
            .y(function(d) { return d.events; });

        var nest = d3.nest()
           .key(function(d) { return d.category; });

        layers = stack(nest.entries(data));
    }

    function drawAxis(){
        svg.select('.x-axis-group.axis')
            .transition()
            .ease(ease)
            .attr({transform: "translate(0," + (graphH + margin.top + margin.bottom) + ")"})
            .style("fill", scaleTextColor)
            .call(xAxis);

        svg.select(".y-axis-group.axis")
            .transition()
            .ease(ease)
            .attr({ transform: "translate(" + (graphW) + ", 0)" })
            .style("fill", scaleTextColor)
            .call(yAxis);

        // Moving the YAxis tick labels to the right side
        d3.selectAll('.y-axis-group .tick text').attr("transform", "translate(" + (-graphW - 40) + ", 0)");
    }

    function drawDataReferencePoints(){
        // Creates Dots on Data points
        var points = svg.select('.chart-group').selectAll('.dots')
        // var points = svg.selectAll(".dots")
            .data(layers)
          .enter().append("g")
            .attr("class", "dots")
            .attr("d", function(d) { return area(d.values); })
            .attr("clip-path", "url(#clip)");

        // Processes the points
        points.selectAll('.dot')
            .data(function(d, index){
                var a = [];
                d.values.forEach(function(point,i){
                    if(point.alert){
                        a.push({'index': index, 'point': point, 'alert': point.alert});
                    }else{
                        a.push({'index': index, 'point': point});
                    }
                });
                return a;
            })
            .enter()
            .append('circle')
            .attr('class','dot')
            .attr("r", function(d){
                if(d.alert){
                    return pointsAlertSize;
                }else{
                    return pointsSize;
                }
            })
            .attr('fill', function(d,i){
                if(d.alert){
                    if( d.alert.type === "alert"){
                        return pointsAlertColor;
                    }else{
                        return pointsImprovementColor;
                    }
                }else{
                    return pointsColor;
                }
            })
            .attr("stroke-width", function(d){
                return d.alert ? "4" : "3";
                // return d.alert ? "2" : "0";
            })
            .attr("stroke", function(d){
                return colors[d.index];
            })
            .attr("transform", function(d) {
                var key = xScale(d.point.date);

                dataPoints[key] = dataPoints[key] || [];
                dataPoints[key].push(d);
                return "translate(" + xScale(d.point.date) + "," + yScale(d.point.y+d.point.y0) + ")"; }
            );
    }

    function drawHoverOverlay(){
        overlay = svg.select('.metadata-group').append('rect')
            .attr('class','overlay')
            .attr('y1', 0)
            .attr('y2', height)
            .attr('height', height)
            .attr('width', overlayWidth)
            .attr('fill','rgba(65, 72, 83, 0.12)')
            .style("display", "none");
    }

    function drawStackedAreas(){
        var colorsForKeys = {
            "At Risk": '#de516e',
            "Moderate": '#f6d020',
            "Safe": '#98cb60'
        };

        // Creating Area function
        area = d3.svg.area()
            .interpolate("cardinal")
            .x(function(d) { return xScale(d.date); })
            .y0(function(d) { return yScale(d.y0); })
            .y1(function(d) { return yScale(d.y0 + d.y); });

        // Drawing Areas
        svg.select('.chart-group').selectAll(".layer")
            .data(layers)
          .enter().append("path")
            .attr("class", "layer")
            .style("stroke", function(d){
                    return "#ffffff";
                // if(colorsForKeys[d.key]){
                //     return colorsForKeys[d.key];
                // }else{
                // }
            })
            .transition()
            .ease(ease)
            .attr("d", function(d) {
                return area(d.values);
            })
            .style("fill", function(d, i) { return colorScale(i); });
    }

    function drawTitle(){
        if(graphTitle){
            svg.select('.pane-group')
                .append("text")
                .attr("x", titleXOffset )
                .attr("y", 0 - (margin.top / 2))
                .attr("class", "graph-title")
                .attr("text-anchor", "middle")
                .text(graphTitle);
        }
    }

    function drawTooltip(){
        tooltipBox = svg.select('.metadata-group').append("g")
            .attr("class", "tooltip")
            .style("opacity", 0);

        tooltipBox.append("path")
            .attr("d", SP.graphs.utils.roundedRect(0, 0, tooltip.tooltipWidth, tooltip.tooltipHeight, 6))
            .attr("fill", "#414853")
            .style("opacity", 1);

        tooltipBox.append("text")
            .attr("x", 30)
            .attr("dy", "1.5em")
            .attr("class", "tooltip-title")
            .style("text-anchor", "left")
            .attr("font-size", "12px")
            .attr("fill", tooltip.tooltipTextColor);

        tooltipBox.append("g")
            .attr("x", 30)
            .attr("dy", "2.5em")
            .attr("class", "tooltip-body");
    }

    function addMouseEvents(){
        // Declare mouse related Behaviours
        svg.select('.container-group')
            .on("mouseover", function() { overlay.style("display", null); })
            .on("mouseout", function() {
                overlay.style("display", "none");

                tooltipBox.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .on("mousemove", function(){
                var coordinates = d3.mouse(this),
                    mouseX = coordinates[0],
                    invertedx = xScale.invert(mouseX),
                    mouseY = coordinates[1],
                    dps = [];

                // From http://codepen.io/ashokgowtham/pen/LpnHe?editors=001
                var keys = _.keys(dataPoints).sort(function(a, b){ return a-b; });
                var epsilon = (keys[1]-keys[0])/2;
                var nearest = _.find(keys, function(a) {
                    return Math.abs(a - mouseX) <= epsilon;
                });
                var tooltipXposition;

                if(nearest){
                    dps = dataPoints[nearest];

                    // Checking if tooltip is at the end of the graph
                    if((nearest + tooltip.tooltipXOffset) > 0.8*graphW){
                        tooltipXposition = nearest - tooltip.tooltipWidth - tooltip.tooltipXOffset;
                    }else{
                        tooltipXposition = nearest + tooltip.tooltipXOffset;
                    }

                    overlay.attr("transform", "translate(" + (nearest - overlayWidth/2) + ", 0)");
                    tooltipBox.attr("transform", "translate(" + tooltipXposition + "," + (mouseY + tooltip.tooltipYOffset) + ")");
                    tooltipBox.transition()
                        .duration(200)
                        .style("opacity", 0.9);

                    tooltipBox.select(".tooltip-title")
                        .text(xTickFormat(invertedx));

                    updateTooltipBodyContent(dps);
                }
            });
    }

    function updateTooltipBodyContent(currentDataPoints){
        var tooltipLegend,
            points = _.pluck(currentDataPoints, "point"),
            count = _.reduce(_.pluck(points, "events"), function(memo, num){
                return memo + num;
            }),
            dataPointsCopy = currentDataPoints.slice(0),
            alert = _.compact(_.pluck(dataPointsCopy, "alert")),
            isAlertTooltip = false;

        if(alert.length){
            dataPointsCopy.unshift({ index: "alert", point: alert[0] });
            isAlertTooltip = true;
        }
        dataPointsCopy.push({ index: dataPointsCopy.length, point: { category: "Total", events: count } });

        // We clean the previous legend
        tooltipBox.selectAll('.tooltip-legend').remove();

        // Creates the group element that encloses the legend
        tooltipLegend = tooltipBox.selectAll(".tooltip-body")
            .remove()
            .data(dataPointsCopy)
            .enter()
            .append("g")
            .attr("class", "tooltip-legend")
            .attr("transform", function (d, i) {
                return "translate(0," + (tooltip.tooltipBodyYOffset + i * tooltip.tooltipBodyTextHeight) + ")";
            });

        // The text with the category and data
        tooltipLegend.append("text")
            .attr("x", 10)
            .attr("y", 9)
            .attr("dy", ".25em")
            .text(function (d) {
                if(d.point.description){
                    return d.point.description;
                }else{
                    return d.point.category + ": " + d.point.events;
                }
            })
            .style("text-anchor", "left")
            .attr("font-size", "12px")
            .attr("fill", function(d, i) {
                if(d.point.description){
                    if(d.point.type === "alert"){
                        return pointsAlertColor;
                    }else{
                        return pointsImprovementColor;
                    }
                }else{
                    if(i < (dataPointsCopy.length-1)){
                        if(isAlertTooltip){
                            return colorScale(i - 1);
                        }else{
                            return colorScale(i);
                        }
                    }else{
                        return tooltip.tooltipTextColor;
                    }
                }
            });
    }

    function drawGraphLegend(){
        var legendContainer = svg.select(".pane-group").append("g")
                .attr("class", "legend-container"),
            legendBox = legendContainer.selectAll(".legend")
                .data(layers)
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function (d, i) {
                    return "translate(" + (legend.xOffset + i * legend.width) + "," + (legend.yOffset) + ")";
                });

        legendBox.append("rect")
            .attr("width", legend.squareSize)
            .attr("height", legend.squareSize/4)
            .attr("y", legend.squareSize/3)
            .style("fill", function(d, i) { return colorScale(i); });

        legendBox.append("text")
            .attr("y", 9)
            .attr("dy", ".25em")
            .attr("dx", "20px")
            .attr("class", "legend-label")
            .style("text-anchor", "start")
            .text(function (d) {
                return d.key;
            });
    }

    function exports(_selection) {
        _selection.each(function(_data){
            graphW = width - margin.left - margin.right;
            graphH = height - margin.top - margin.bottom;
            data = _data;

            buildLayers();
            buildScales();
            buildAxis();

            // Trick to just append the svg skeleton once
            svg = d3.select(this)
                .selectAll("svg")
                .data([_data]);

            svg.enter().append("svg")
                .classed("stacked-area-chart", true);

            buildContainerGroups();
            svg.transition().ease(ease).attr({width: width, height: height + margin.top + margin.bottom });
            svg.select(".container-group")
                .attr({transform: "translate(" + margin.left + "," + margin.top + ")"});

            drawStackedAreas();
            drawAxis();
            drawDataReferencePoints();
            drawTitle();
            drawGraphLegend();

            addMouseEvents();
            drawHoverOverlay();
            drawTooltip();
        });
    }

    exports.width = function(_x) {
        if (!arguments.length) return width;
        width = _x;
        return this;
    };

    exports.height = function(_x) {
        if (!arguments.length) return height;
        height = _x;
        return this;
    };

    exports.margin = function(_x) {
        if (!arguments.length) return margin;
        margin = _x;
        return this;
    };

    exports.ease = function(_x) {
        if (!arguments.length) return ease;
        ease = _x;
        return this;
    };

    exports.currency = function(_x) {
        if (!arguments.length) return currency;
        currency = _x;
        return this;
    };

    exports.timeframe = function(_x) {
        if (!arguments.length) return timeframe;
        timeframe = _x;
        return this;
    };

    exports.colors = function(_x) {
        if (!arguments.length) return colors;
        colors = _x;
        return this;
    };

    exports.title = function(_x) {
        if (!arguments.length) return graphTitle;
        graphTitle = _x;
        return this;
    };

    exports.legend = function(_x) {
        if (!arguments.length) return legend;
        legend = _x;
        return this;
    };

    d3.rebind(exports, dispatch, "on");

    return exports;
};