// Reference:
// http://tinnedfruit.com/2011/03/25/testing-backbone-apps-with-jasmine-sinon-2.html
// https://github.com/froots/backbone-jasmine-examples

// Spying $.ajax with Sinon
it("should make the correct server request", function() {

    var episode = new Backbone.Model({
        title: "Hollywood - Part 2",
        url: "/episodes/1"
    });

    // Spy on jQuery's ajax method
    var spy = sinon.spy(jQuery, 'ajax');

    // Save the model
    episode.save();

    // Spy was called
    expect(spy).toHaveBeenCalled();
    // Check url property of first argument
    expect(spy.getCall(0).args[0].url)
    .toEqual("/episodes/1");

    // Restore jQuery.ajax to normal
    jQuery.ajax.restore();
});

// Using Sinon fake server to spec a model
describe("Episode model", function() {
    beforeEach(function() {
        this.server = sinon.fakeServer.create();
    });

    afterEach(function() {
        this.server.restore();
    });

    it("should fire the change event", function() {
        var callback = sinon.spy();

        // Set how the fake server will respond
        // This reads: a GET request for /episode/123
        // will return a 200 response of type
        // application/json with the given JSON response body
        this.server.respondWith("GET", "/episode/123",
            [200, {"Content-Type": "application/json"},
            '{"id":123,"title":"Hollywood - Part 2"}']);

        var episode = new Episode({id: 123});

        // Bind to the change event on the model
        episode.bind('change', callback);

        // makes an ajax request to the server
        episode.fetch();

        // Fake server responds to the request
        this.server.respond();

        // Expect that the spy was called with the new model
        expect(callback.called).toBeTruthy();
        expect(callback.getCall(0).args[0].attributes)
        .toEqual({
            id: 123,
            title: "Hollywood - Part 2"
        });
    });
});

// You can make it pass with
var Episode = Backbone.Model.extend({
    url: function() {
        return "/episode/" + this.id;
    }
});


// -----

describe('Todo model', function() {

    beforeEach(function() {
        this.todo = new Todo({
            title: 'Rake leaves'
        });
    });

    describe('when instantiated', function() {

        it('should exhibit attributes', function() {
            expect(this.todo.get('title'))
            .toEqual('Rake leaves');
        });

        it('should set the priority to default', function() {
            expect(this.todo.get('priority')).toEqual(3);
        });
    });

    describe("url", function() {
        beforeEach(function() {
            var collection = {
                url: "/collection"
            };
            this.todo.collection = collection;
        });

        describe("when no id is set", function() {
            it("should return the collection URL", function() {
                expect(this.todo.url()).toEqual("/collection");
            });
        });

        describe("when id is set", function() {
            it("should return the collection URL and id", function() {
                this.todo.id = 1;
                expect(this.todo.url()).toEqual("/collection/1");
            });
        });
    });

    it("should not save when title is empty", function() {
        var eventSpy = sinon.spy();
        this.todo.bind("error", eventSpy);
        this.todo.save({"title": ""});
        expect(this.eventSpy.calledOnce).toBeTruthy();
        expect(this.eventSpy.calledWith(
            this.todo,
            "cannot have an empty title"
            )).toBeTruthy();
    });

    describe("when instantiated with model literal", function() {
        beforeEach(function() {
            this.todoStub = sinon.stub(window, "Todo");
            this.model = new Backbone.Model({
                id: 5,
                title: "Foo"
            });
            this.todoStub.returns(this.model);
            this.todos = new Todos();
            this.todos.model = Todo; // reset model relationship to use stub
            this.todos.add({
                id: 5,
                title: "Foo"
            });
        });

        afterEach(function() {
            this.todoStub.restore();
        });

        it("should add a model", function() {
            expect(this.todos.length).toEqual(1);
        });

        it("should find a model by id", function() {
            expect(this.todos.get(5).get("id")).toEqual(5);
        });
    });


});