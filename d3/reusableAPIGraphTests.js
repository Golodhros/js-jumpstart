describe('Reusable Segment Graph Test Suite', function(){
    var lineChart, dataset, fixture;


    beforeEach(function(){
        dataset = {
            events: [
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

    it('should provide getters and setters', function(){
        var defaultWidth = lineChart.width();
        var defaultHeight = lineChart.height();
        var defaultEase = lineChart.ease();

        lineChart.width(1234).height(12).ease('linear');

        var newWidth = lineChart.width();
        var newHeight = lineChart.height();
        var newEase = lineChart.ease();

        expect(defaultWidth).not.toBe(1234);
        expect(defaultHeight).not.toBe(12);
        expect(defaultEase).not.toBe('linear');
        expect(newWidth).toBe(1234);
        expect(newHeight).toBe(12);
        expect(newEase).toBe('linear');
    });

    it('should scope some private and some public fields and methods', function() {
        expect(lineChart.className).toBeUndefined();
        expect(lineChart.ease).toBeDefined();
        expect(typeof lineChart.ease).toBe('function');
    });

    it('should update a chart with new attributes', function(){
        lineChart.width(10000);
        fixture.datum(dataset)
            .call(lineChart);

        lineChart.width(2000);
        fixture.call(lineChart);

        expect(lineChart.width()).toBe(2000);
    });

    xit('should update a chart with new data', function(){});

    it('should render two charts with different configuration', function(){
        fixture.append('div')
            .datum(dataset)
            .call(lineChart);

        var dataset2 = {
            events: [
                {
                    key_as_string: "1899-12-30T00:00:00.000Z",
                    key: "-2209161600000",
                    doc_count: "34"
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

    it('should trigger a callback on events', function(){
        fixture.datum(dataset)
            .call(lineChart);

        var callback = jasmine.createSpy("filterCallback");
        lineChart.on('customHover', callback);

        var line = fixture.selectAll('.eventsData');
        line[0][0].__onmouseover();
        var callBackArguments = callback.argsForCall[0][0];

        expect(callback).toHaveBeenCalled();
        expect(callBackArguments).toBe(dataset[0]);
    });


});