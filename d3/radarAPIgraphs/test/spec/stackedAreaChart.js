describe('Reusable stackedAreaChart Test Suite', function(){
    var stackedAreaChart, dataset, fixture;

    beforeEach(function(){
        dataset =  [
                {
                    "category": "Product",
                    "events": 0,
                    "date": "1294185600000",
                    "dateUTC": "2011-01-05T00:00:00.000Z"
                },
                {
                    "category": "Product",
                    "events": 10,
                    "date": "1294272000000",
                    "dateUTC": "2011-01-06T00:00:00.000Z",
                    "alert": {
                        "type": "improvement",
                        "description": "9% loyalty rise"
                    }
                },
                {
                    "category": "Product",
                    "events": 16,
                    "date": "1294358400000",
                    "dateUTC": "2011-01-07T00:00:00.000Z",
                    "alert": {
                        "type": "alert",
                        "description": "9% loyalty drop"
                    }
                },
                {
                    "category": "Product",
                    "events": 23,
                    "date": "1294444800000",
                    "dateUTC": "2011-01-08T00:00:00.000Z"
                },
                {
                    "category": "CRM",
                    "events": 23,
                    "date": "1294185600000",
                    "dateUTC": "2011-01-05T00:00:00.000Z"
                },
                {
                    "category": "CRM",
                    "events": 16,
                    "date": "1294272000000",
                    "dateUTC": "2011-01-06T00:00:00.000Z"
                },
                {
                    "category": "CRM",
                    "events": 10,
                    "date": "1294358400000",
                    "dateUTC": "2011-01-07T00:00:00.000Z"
                },
                {
                    "category": "CRM",
                    "events": 0,
                    "date": "1294444800000",
                    "dateUTC": "2011-01-08T00:00:00.000Z"
                },
                {
                    "category": "Support",
                    "events": 10,
                    "date": "1294185600000",
                    "dateUTC": "2011-01-05T00:00:00.000Z"
                },
                {
                    "category": "Support",
                    "events": 20,
                    "date": "1294272000000",
                    "dateUTC": "2011-01-06T00:00:00.000Z"
                },
                {
                    "category": "Support",
                    "events": 26,
                    "date": "1294358400000",
                    "dateUTC": "2011-01-07T00:00:00.000Z"
                },
                {
                    "category": "Support",
                    "events": 33,
                    "date": "1294444800000",
                    "dateUTC": "2011-01-08T00:00:00.000Z"
                }
            ];
        stackedAreaChart = SP.graphs.stackedAreaChart();
        fixture = d3.select('body').append('div').classed('test-container', true);
    });

    afterEach(function(){
        fixture.remove();
    });

    it('should render a chart with minimal requirements', function(){
        fixture.datum(dataset).call(stackedAreaChart);
        expect(fixture.select('.stacked-area-chart')).toBeDefined(1);
    });

    it('should render container, axis and chart groups', function(){
        fixture.datum(dataset).call(stackedAreaChart);

        expect(fixture.select('g.container-group')[0]).toHaveLength(1);
        expect(fixture.select('g.chart-group')[0]).toHaveLength(1);
        expect(fixture.select('g.x-axis-group')[0]).toHaveLength(1);
        expect(fixture.select('g.y-axis-group')[0]).toHaveLength(1);
    });

    it('should render an X and Y axis', function(){
        fixture.datum(dataset).call(stackedAreaChart);

        expect(fixture.select('.x.axis')[0]).toHaveLength(1);
        expect(fixture.select('.y.axis')[0]).toHaveLength(1);
    });

    it('should scope some private and some public fields and methods', function() {
        expect(stackedAreaChart.className).toBeUndefined();
        expect(stackedAreaChart.ease).toBeDefined();
        expect(typeof stackedAreaChart.ease).toBe('function');
    });

    // Gettters and Setters
    it('should provide animation getters and setters', function(){
        var defaultEase = stackedAreaChart.ease();
        stackedAreaChart.ease('linear');
        var newEase = stackedAreaChart.ease();

        expect(defaultEase).not.toBe('linear');
        expect(newEase).toBe('linear');
    });

    it('should provide width and height getters and setters', function(){
        var defaultWidth = stackedAreaChart.width();
        var defaultHeight = stackedAreaChart.height();

        stackedAreaChart.width(1234).height(12);

        var newWidth = stackedAreaChart.width();
        var newHeight = stackedAreaChart.height();

        expect(defaultWidth).not.toBe(1234);
        expect(defaultHeight).not.toBe(12);
        expect(newWidth).toBe(1234);
        expect(newHeight).toBe(12);
    });

    it('should provide margin getter and setter', function(){
        var defaultMargin = stackedAreaChart.margin();
        var testMargin = {top: 4, right: 4, bottom: 4, left: 4};

        stackedAreaChart.margin(testMargin);

        var newMargin = stackedAreaChart.margin();

        expect(defaultMargin).not.toBe(testMargin);
        expect(newMargin).toBe(testMargin);
    });

    it('should provide currency getter and setter', function(){
        var defaultCurrency = stackedAreaChart.currency();
        var testCurrency = '&';

        stackedAreaChart.currency(testCurrency);

        var newCurrency = stackedAreaChart.currency();

        expect(defaultCurrency).not.toBe(testCurrency);
        expect(newCurrency).toBe(testCurrency);
    });

    it('should provide timeframe getter and setter', function(){
        var defaultTimeframe = stackedAreaChart.timeframe();
        var testTimeframe = 'week';

        stackedAreaChart.timeframe(testTimeframe);

        var newTimeframe = stackedAreaChart.timeframe();

        expect(defaultTimeframe).not.toBe(testTimeframe);
        expect(newTimeframe).toBe(testTimeframe);
    });

    it('should provide colors getter and setter', function(){
        var defaultColors = stackedAreaChart.colors();
        var testColors = ["#aaa", "#bbb"];

        stackedAreaChart.colors(testColors);

        var newColors = stackedAreaChart.colors();

        expect(defaultColors).not.toBe(testColors);
        expect(newColors).toBe(testColors);
    });

    it('should provide title getter and setter', function(){
        var defaultTitle = stackedAreaChart.title();
        var testTitle = "Test Title";

        stackedAreaChart.title(testTitle);

        var newTitle = stackedAreaChart.title();

        expect(defaultTitle).not.toBe(testTitle);
        expect(newTitle).toBe(testTitle);
    });

    it('should provide legend getter and setter', function(){
        var defaultLegend = stackedAreaChart.legend();
        var testLegend = {
            xOffset   : 220,
            yOffset   : -38,
            width     : 100,
            squareSize: 16
        };

        stackedAreaChart.legend(testLegend);

        var newLegend = stackedAreaChart.legend();

        expect(defaultLegend).not.toBe(testLegend);
        expect(newLegend).toBe(testLegend);
    });

    // Changes
    it('should update a chart with new attributes', function(){
        stackedAreaChart.width(10000);
        fixture.datum(dataset)
            .call(stackedAreaChart);

        stackedAreaChart.width(2000);
        fixture.call(stackedAreaChart);

        expect(stackedAreaChart.width()).toBe(2000);
    });

    // Composition and multiple instances
    it('should render two charts with different configuration', function(){
        fixture.append('div')
            .datum(dataset)
            .call(stackedAreaChart);

        var dataset2 = [
                {
                    "category": "Product",
                    "events": 3,
                    "date": "1294185600000",
                    "dateUTC": "2011-01-05T00:00:00.000Z"
                },
                {
                    "category": "Product",
                    "events": 10,
                    "date": "1294272000000",
                    "dateUTC": "2011-01-06T00:00:00.000Z",
                    "alert": {
                        "type": "improvement",
                        "description": "9% loyalty rise"
                    }
                },
                {
                    "category": "Product",
                    "events": 16,
                    "date": "1294358400000",
                    "dateUTC": "2011-01-07T00:00:00.000Z",
                    "alert": {
                        "type": "alert",
                        "description": "9% loyalty drop"
                    }
                },
                {
                    "category": "Product",
                    "events": 23,
                    "date": "1294444800000",
                    "dateUTC": "2011-01-08T00:00:00.000Z"
                },
                {
                    "category": "CRM",
                    "events": 23,
                    "date": "1294185600000",
                    "dateUTC": "2011-01-05T00:00:00.000Z"
                },
                {
                    "category": "CRM",
                    "events": 16,
                    "date": "1294272000000",
                    "dateUTC": "2011-01-06T00:00:00.000Z"
                },
                {
                    "category": "CRM",
                    "events": 10,
                    "date": "1294358400000",
                    "dateUTC": "2011-01-07T00:00:00.000Z"
                },
                {
                    "category": "CRM",
                    "events": 0,
                    "date": "1294444800000",
                    "dateUTC": "2011-01-08T00:00:00.000Z"
                },
                {
                    "category": "Support",
                    "events": 10,
                    "date": "1294185600000",
                    "dateUTC": "2011-01-05T00:00:00.000Z"
                },
                {
                    "category": "Support",
                    "events": 20,
                    "date": "1294272000000",
                    "dateUTC": "2011-01-06T00:00:00.000Z"
                },
                {
                    "category": "Support",
                    "events": 26,
                    "date": "1294358400000",
                    "dateUTC": "2011-01-07T00:00:00.000Z"
                },
                {
                    "category": "Support",
                    "events": 33,
                    "date": "1294444800000",
                    "dateUTC": "2011-01-08T00:00:00.000Z"
                }
            ];
        var stackedAreaChart2 = SP.graphs.stackedAreaChart().ease('linear');

        fixture.append('div')
            .datum(dataset2)
            .call(stackedAreaChart2);

        var charts = fixture.selectAll('.stacked-area-chart');

        expect(charts[0].length).toBe(2);
        expect(stackedAreaChart2.ease()).not.toBe(stackedAreaChart.ease());
    });

    it('can be composed with another one', function(){
        fixture.datum(dataset)
            .call(stackedAreaChart);

        var stackedAreaChart2 = SP.graphs.stackedAreaChart();

        fixture.selectAll('.stacked-area-chart')
            .datum(dataset)
            .call(stackedAreaChart2);

        var charts = fixture.selectAll('.stacked-area-chart');

        expect(charts[0].length).toBe(2);
        expect(charts[0][1].parentElement).toBe(charts[0][0]);
    });


});