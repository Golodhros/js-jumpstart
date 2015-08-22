/*global describe, it, beforeEach, afterEach, loadFixtures, expect, jasmine, $, SP, _, setTimeout, Dragdealer, appendLoadFixtures */

(function () {
    'use strict';

    xdescribe("Event Tracking Module", function(){

        describe("Initialization", function(){

            it('should define a namespace on SP', function(){
                expect(SP.tracker).toBeDefined();
            });

            it('should have default services', function(){
                SP.tracker.defaultServices = ['mixpanel', 'elasticsearch', 'ga'];
                SP.tracker.init([]);
                expect(SP.tracker.activeServices).toHaveLength(3);
            });

            it('should add the provided services to the default ones', function(){
                SP.tracker.defaultServices = ['mixpanel', 'elasticsearch'];
                SP.tracker.init(['ga']);
                expect(SP.tracker.activeServices).toHaveLength(3);
            });

            it('should initialize the active services', function(){
                SP.tracker.init(['ga', 'mixpanel', 'elasticsearch']);

                expect(window.ga).toBeDefined();
                expect(window.mixpanel).toBeDefined();
                expect(window._saq).toBeDefined();
            });
        });

        describe("Event Tracking", function(){
            var eventData;

            beforeEach(function(){
                eventData = {category: 'testCategory', action: 'testAction', label: 'testLabel', value: 1};

                SP.tracker.init(['ga', 'mixpanel', 'elasticsearch']);

                spyOn(window, 'ga').and.callThrough();
                spyOn(_saq, 'push').and.callThrough();
                spyOn(mixpanel, 'track').and.callThrough();
            });

            // {category: '', action: '', label: '', value: '', page: ''}
            it('should track events', function(){

                $(document).trigger("SP.event", eventData);

                setTimeout(function(){
                    expect(window.ga).toHaveBeenCalled();
                    expect(mixpanel.track).toHaveBeenCalled();
                    expect(_saq.push).toHaveBeenCalled();

                    expect(window.ga).toHaveBeenCalledWith('send', 'event', eventData.category, eventData.action, eventData.label, eventData.value);
                    expect(mixpanel.track).toHaveBeenCalledWith( eventData.category + " " + eventData.action + "; " + eventData.label + " " + eventData.value);
                });
            });
        });

        describe("Page View Tracking", function(){
            var pageViewData;

            beforeEach(function(){
                pageViewData = {page: 'dummy/url'};

                spyOn(window, 'ga').and.callThrough();
                spyOn(_saq, 'push').and.callThrough();
                spyOn(mixpanel, 'track').and.callThrough();
            });

            it('should track page views', function(){

                $(document).trigger("SP.event", pageViewData);

                setTimeout(function(){
                    expect(window.ga).toHaveBeenCalled();
                    expect(mixpanel.track).toHaveBeenCalled();
                    expect(_saq.push).toHaveBeenCalled();

                    expect(window.ga).toHaveBeenCalledWith('send', 'pageview', pageViewData.page);
                    expect(mixpanel.track).toHaveBeenCalledWith( "Pageview: " + pageViewData.page );
                    expect(_saq.push).toHaveBeenCalledWith( ['_trackPageview'] );
                });
            });
        });

    });

})();