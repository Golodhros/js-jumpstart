describe('Reusable LineChart Graph Test Suite', function(){
    var lineChart, dataset, fixture;

    beforeEach(function(){
        dataset = {
            event: [
                {
                    key_as_string: "1899-12-30T00:00:00.000Z",
                    key: "-2209161600000",
                    doc_count: "3854"
                },
                {
                    key_as_string: "2011-01-07T00:00:00.000Z",
                    key: "1294358400000",
                    doc_count: "14"
                },
                {
                    key_as_string: "2011-01-11T00:00:00.000Z",
                    key: "1294704000000",
                    doc_count: "17"
                },
                {
                    key_as_string: "2011-02-07T00:00:00.000Z",
                    key: "1297036800000",
                    doc_count: "10"
                },
                {
                    key_as_string: "2011-02-11T00:00:00.000Z",
                    key: "1297382400000",
                    doc_count: "21"
                }
            ],
            size: [
                {
                    key_as_string: "1899-12-30T00:00:00.000Z",
                    key: "-2209161600000",
                    doc_count: "384"
                },
                {
                    key_as_string: "2011-01-07T00:00:00.000Z",
                    key: "1294358400000",
                    doc_count: "144"
                },
                {
                    key_as_string: "2011-01-11T00:00:00.000Z",
                    key: "1294704000000",
                    doc_count: "137"
                },
                {
                    key_as_string: "2011-02-07T00:00:00.000Z",
                    key: "1297036800000",
                    doc_count: "110"
                },
                {
                    key_as_string: "2011-02-11T00:00:00.000Z",
                    key: "1297382400000",
                    doc_count: "201"
                }
            ],
            loyalty: [
                {
                    key_as_string: "1899-12-30T00:00:00.000Z",
                    key: "-2209161600000",
                    doc_count: "34"
                },
                {
                    key_as_string: "2011-01-07T00:00:00.000Z",
                    key: "1294358400000",
                    doc_count: "194"
                },
                {
                    key_as_string: "2011-01-11T00:00:00.000Z",
                    key: "1294704000000",
                    doc_count: "179"
                },
                {
                    key_as_string: "2011-02-07T00:00:00.000Z",
                    key: "1297036800000",
                    doc_count: "910"
                },
                {
                    key_as_string: "2011-02-11T00:00:00.000Z",
                    key: "1297382400000",
                    doc_count: "291"
                }
            ],
            revenue: [
                {
                    key_as_string: "1899-12-30T00:00:00.000Z",
                    key: "-2209161600000",
                    doc_count: "354"
                },
                {
                    key_as_string: "2011-01-07T00:00:00.000Z",
                    key: "1294358400000",
                    doc_count: "814"
                },
                {
                    key_as_string: "2011-01-11T00:00:00.000Z",
                    key: "1294704000000",
                    doc_count: "317"
                },
                {
                    key_as_string: "2011-02-07T00:00:00.000Z",
                    key: "1297036800000",
                    doc_count: "410"
                },
                {
                    key_as_string: "2011-02-11T00:00:00.000Z",
                    key: "1297382400000",
                    doc_count: "121"
                }
            ]
        };
        lineChart = SP.graphs.lineChart();
        fixture = d3.select('body').append('div').classed('test-container', true);
    });

    afterEach(function(){
        fixture.remove();
    });

    it('should render a chart with minimal requirements', function(){
        fixture.datum(dataset).call(lineChart);
        expect(fixture.select('.chart')).toBeDefined(1);
    });

    it('should scope some private and some public fields and methods', function() {
        expect(lineChart.className).toBeUndefined();
        expect(lineChart.ease).toBeDefined();
        expect(typeof lineChart.ease).toBe('function');
    });

    // Gettters and Setters
    it('should provide animation getters and setters', function(){
        var defaultEase = lineChart.ease();
        lineChart.ease('linear');
        var newEase = lineChart.ease();

        expect(defaultEase).not.toBe('linear');
        expect(newEase).toBe('linear');
    });

    it('should provide width and height getters and setters', function(){
        var defaultWidth = lineChart.width();
        var defaultHeight = lineChart.height();

        lineChart.width(1234).height(12);

        var newWidth = lineChart.width();
        var newHeight = lineChart.height();

        expect(defaultWidth).not.toBe(1234);
        expect(defaultHeight).not.toBe(12);
        expect(newWidth).toBe(1234);
        expect(newHeight).toBe(12);
    });

    it('should provide margin getter and setter', function(){
        var defaultMargin = lineChart.margin();
        var testMargin = {top: 4, right: 4, bottom: 4, left: 4};

        lineChart.margin(testMargin);

        var newMargin = lineChart.margin();

        expect(defaultMargin).not.toBe(testMargin);
        expect(newMargin).toBe(testMargin);
    });

    it('should provide currency getter and setter', function(){
        var defaultCurrency = lineChart.currency();
        var testCurrency = '&';

        lineChart.currency(testCurrency);

        var newCurrency = lineChart.currency();

        expect(defaultCurrency).not.toBe(testCurrency);
        expect(newCurrency).toBe(testCurrency);
    });

    // Changes
    it('should update a chart with new attributes', function(){
        lineChart.width(10000);
        fixture.datum(dataset)
            .call(lineChart);

        lineChart.width(2000);
        fixture.call(lineChart);

        expect(lineChart.width()).toBe(2000);
    });

    // TODO: Not able to access the dom elements data
    xit('should update a chart with new data', function(){
        fixture.datum(dataset)
            .call(lineChart);

        var eventsLine = fixture.selectAll('.eventData');
        var firstDataSet = eventsLine[0][0].__data__;

        var dataset2 = {
            event: [
                {
                    key_as_string: "1899-12-30T00:00:00.000Z",
                    key: "-2209161600000",
                    doc_count: "3854"
                },
                {
                    key_as_string: "2011-01-07T00:00:00.000Z",
                    key: "1294358400000",
                    doc_count: "14765"
                },
                {
                    key_as_string: "2011-01-11T00:00:00.000Z",
                    key: "1294704000000",
                    doc_count: "17"
                },
                {
                    key_as_string: "2011-02-07T00:00:00.000Z",
                    key: "1297036800000",
                    doc_count: "10"
                },
                {
                    key_as_string: "2011-02-11T00:00:00.000Z",
                    key: "1297382400000",
                    doc_count: "21"
                }
            ],
            size: [
                {
                    key_as_string: "1899-12-30T00:00:00.000Z",
                    key: "-2209161600000",
                    doc_count: "384"
                },
                {
                    key_as_string: "2011-01-07T00:00:00.000Z",
                    key: "1294358400000",
                    doc_count: "144"
                },
                {
                    key_as_string: "2011-01-11T00:00:00.000Z",
                    key: "1294704000000",
                    doc_count: "137"
                },
                {
                    key_as_string: "2011-02-07T00:00:00.000Z",
                    key: "1297036800000",
                    doc_count: "110"
                },
                {
                    key_as_string: "2011-02-11T00:00:00.000Z",
                    key: "1297382400000",
                    doc_count: "201"
                }
            ],
            loyalty: [
                {
                    key_as_string: "1899-12-30T00:00:00.000Z",
                    key: "-2209161600000",
                    doc_count: "34"
                },
                {
                    key_as_string: "2011-01-07T00:00:00.000Z",
                    key: "1294358400000",
                    doc_count: "194"
                },
                {
                    key_as_string: "2011-01-11T00:00:00.000Z",
                    key: "1294704000000",
                    doc_count: "179"
                },
                {
                    key_as_string: "2011-02-07T00:00:00.000Z",
                    key: "1297036800000",
                    doc_count: "910"
                },
                {
                    key_as_string: "2011-02-11T00:00:00.000Z",
                    key: "1297382400000",
                    doc_count: "291"
                }
            ],
            revenue: [
                {
                    key_as_string: "1899-12-30T00:00:00.000Z",
                    key: "-2209161600000",
                    doc_count: "354"
                },
                {
                    key_as_string: "2011-01-07T00:00:00.000Z",
                    key: "1294358400000",
                    doc_count: "814"
                },
                {
                    key_as_string: "2011-01-11T00:00:00.000Z",
                    key: "1294704000000",
                    doc_count: "317"
                },
                {
                    key_as_string: "2011-02-07T00:00:00.000Z",
                    key: "1297036800000",
                    doc_count: "410"
                },
                {
                    key_as_string: "2011-02-11T00:00:00.000Z",
                    key: "1297382400000",
                    doc_count: "121"
                }
            ]
        };
        fixture.datum(dataset2)
            .call(lineChart);

        var eventsLine2 = fixture.selectAll('.eventData');
        var secondDataSet = eventsLine2[0][0].__data__;

        expect(firstDataSet).toBe(dataset);
        expect(secondDataSet).toBe(dataset2);
    });

    // Composition and multiple instances
    it('should render two charts with different configuration', function(){
        fixture.append('div')
            .datum(dataset)
            .call(lineChart);

        var dataset2 = {
            event: [
                {
                    key_as_string: "1899-12-30T00:00:00.000Z",
                    key: "-2209161600000",
                    doc_count: "3854"
                },
                {
                    key_as_string: "2011-01-07T00:00:00.000Z",
                    key: "1294358400000",
                    doc_count: "14"
                },
                {
                    key_as_string: "2011-01-11T00:00:00.000Z",
                    key: "1294704000000",
                    doc_count: "17"
                },
                {
                    key_as_string: "2011-02-07T00:00:00.000Z",
                    key: "1297036800000",
                    doc_count: "10"
                },
                {
                    key_as_string: "2011-02-11T00:00:00.000Z",
                    key: "1297382400000",
                    doc_count: "21"
                }
            ],
            size: [
                {
                    key_as_string: "1899-12-30T00:00:00.000Z",
                    key: "-2209161600000",
                    doc_count: "384"
                },
                {
                    key_as_string: "2011-01-07T00:00:00.000Z",
                    key: "1294358400000",
                    doc_count: "144"
                },
                {
                    key_as_string: "2011-01-11T00:00:00.000Z",
                    key: "1294704000000",
                    doc_count: "137"
                },
                {
                    key_as_string: "2011-02-07T00:00:00.000Z",
                    key: "1297036800000",
                    doc_count: "110"
                },
                {
                    key_as_string: "2011-02-11T00:00:00.000Z",
                    key: "1297382400000",
                    doc_count: "201"
                }
            ],
            loyalty: [
                {
                    key_as_string: "1899-12-30T00:00:00.000Z",
                    key: "-2209161600000",
                    doc_count: "34"
                },
                {
                    key_as_string: "2011-01-07T00:00:00.000Z",
                    key: "1294358400000",
                    doc_count: "194"
                },
                {
                    key_as_string: "2011-01-11T00:00:00.000Z",
                    key: "1294704000000",
                    doc_count: "179"
                },
                {
                    key_as_string: "2011-02-07T00:00:00.000Z",
                    key: "1297036800000",
                    doc_count: "910"
                },
                {
                    key_as_string: "2011-02-11T00:00:00.000Z",
                    key: "1297382400000",
                    doc_count: "291"
                }
            ],
            revenue: [
                {
                    key_as_string: "1899-12-30T00:00:00.000Z",
                    key: "-2209161600000",
                    doc_count: "354"
                },
                {
                    key_as_string: "2011-01-07T00:00:00.000Z",
                    key: "1294358400000",
                    doc_count: "814"
                },
                {
                    key_as_string: "2011-01-11T00:00:00.000Z",
                    key: "1294704000000",
                    doc_count: "317"
                },
                {
                    key_as_string: "2011-02-07T00:00:00.000Z",
                    key: "1297036800000",
                    doc_count: "410"
                },
                {
                    key_as_string: "2011-02-11T00:00:00.000Z",
                    key: "1297382400000",
                    doc_count: "121"
                }
            ]
        };
        var lineChart2 = SP.graphs.lineChart().ease('linear');

        fixture.append('div')
            .datum(dataset2)
            .call(lineChart2);

        var charts = fixture.selectAll('.chart');

        expect(charts[0].length).toBe(2);
        expect(lineChart2.ease()).not.toBe(lineChart.ease());
    });

    it('can be composed with another one', function(){
        fixture.datum(dataset)
            .call(lineChart);

        var lineChart2 = SP.graphs.lineChart();

        fixture.selectAll('.chart')
            .datum(dataset)
            .call(lineChart2);

        var charts = fixture.selectAll('.chart');

        expect(charts[0].length).toBe(2);
        expect(charts[0][1].parentElement).toBe(charts[0][0]);
    });

    // Not sure what's going on here
    xit('should trigger a callback on events', function(){
        fixture.datum(dataset)
            .call(lineChart);

        var callback = jasmine.createSpy("filterCallback");
        lineChart.on('customHover', callback);

        var line = fixture.selectAll('.eventData');
        line[0][0].__onmouseover();
        var callBackArguments = callback.argsForCall[0][0];

        expect(callback).toHaveBeenCalled();
        expect(callBackArguments).toBe(dataset[0]);
    });

    // Adding Lines
    it('should provide an update method for showing size line and axis', function(){
        fixture.datum(dataset)
            .call(lineChart);

        lineChart.updateLine('size', 'show');

        var sizeLine = fixture.selectAll('.sizeData');
        var sizeLineAxis = fixture.selectAll('.y-axis-group-size');

        expect(sizeLine).toHaveLength(1);
        expect(sizeLineAxis).toHaveLength(1);
    });
    it('should provide an update method for showing loyalty line and axis', function(){
        fixture.datum(dataset)
            .call(lineChart);

        lineChart.updateLine('loyalty', 'show');

        var loyaltyLine = fixture.selectAll('.loyaltyData');
        var loyaltyLineAxis = fixture.selectAll('.y-axis-group-loyalty');

        expect(loyaltyLine).toHaveLength(1);
        expect(loyaltyLineAxis).toHaveLength(1);
    });
    it('should provide an update method for showing revenue line and axis', function(){
        fixture.datum(dataset)
            .call(lineChart);

        lineChart.updateLine('revenue', 'show');

        var revenueLine = fixture.selectAll('.revenueData');
        var revenueLineAxis = fixture.selectAll('.y-axis-group-revenue');

        expect(revenueLine).toHaveLength(1);
        expect(revenueLineAxis).toHaveLength(1);
    });

    //Removing Lines
    it('should provide an update method for hiding size line and axis', function(){
        fixture.datum(dataset)
            .call(lineChart);

        lineChart.updateLine('size', 'show');
        lineChart.updateLine('size', 'hide');

        var sizeLine = fixture.selectAll('.sizeData');
        var sizeLineAxis = fixture.selectAll('.y-axis-group-size');

        expect(sizeLine[0].length).toBe(0);
        expect($(sizeLineAxis[0][0])).toBeHidden();
    });
    it('should provide an update method for hiding loyalty line and axis', function(){
        fixture.datum(dataset)
            .call(lineChart);

        lineChart.updateLine('loyalty', 'show');
        lineChart.updateLine('loyalty', 'hide');

        var loyaltyLine = fixture.selectAll('.loyaltyData');
        var loyaltyLineAxis = fixture.selectAll('.y-axis-group-loyalty');

        expect(loyaltyLine[0].length).toBe(0);
        expect($(loyaltyLineAxis[0][0])).toBeHidden();
    });
    it('should provide an update method for hiding revenue line and axis', function(){
        fixture.datum(dataset)
            .call(lineChart);

        lineChart.updateLine('revenue', 'show');
        lineChart.updateLine('revenue', 'hide');

        var revenueLine = fixture.selectAll('.revenueData');
        var revenueLineAxis = fixture.selectAll('.y-axis-group-revenue');

        expect(revenueLine[0].length).toBe(0);
        expect($(revenueLineAxis[0][0])).toBeHidden();
    });

});