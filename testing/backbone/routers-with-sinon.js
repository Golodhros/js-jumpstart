// Reference
// http://tinnedfruit.com/2011/04/26/testing-backbone-apps-with-jasmine-sinon-3.html

describe("AppRouter routes", function() {
    beforeEach(function() {
        this.router = new AppRouter;
        this.routeSpy = sinon.spy();
        try {
            Backbone.history.start({silent:true, pushState:true});
        } catch(e) {}
        this.router.navigate("elsewhere");
    });

    it("fires the index route with a blank hash", function() {
        this.router.bind("route:index", this.routeSpy);
        this.router.navigate("", true);
        expect(this.routeSpy).toHaveBeenCalledOnce();
        expect(this.routeSpy).toHaveBeenCalledWith();
    });

    it("fires the todo detail route", function() {
        this.router.bind('route:todo', this.routeSpy);
        this.router.navigate("todo/1", true);
        expect(this.routeSpy).toHaveBeenCalledOnce();
        expect(this.routeSpy).toHaveBeenCalledWith("1");
    });

    describe("AppRouter", function() {

        beforeEach(function() {
            this.router = new AppRouter();
            this.collection = new Backbone.Collection();
            this.todoListViewStub = sinon.stub(window, "TodoListView")
            .returns(new Backbone.View());
            this.todosCollectionStub = sinon.stub(window, "Todos")
            .returns(this.collection);
        });

        afterEach(function() {
            window.TodoListView.restore();
            window.Todos.restore();
        });

    });

    describe("Index handler", function() {

        describe("when no Todo list exists", function() {

            beforeEach(function() {
                this.router.index();
            });

            it("creates a Todo list collection", function() {
                expect(this.todosCollectionStub)
                .toHaveBeenCalledOnce();
                expect(this.todosCollectionStub)
                .toHaveBeenCalledWithExactly();
            });

            it("creates a Todo list view", function() {
                expect(this.todoListViewStub)
                .toHaveBeenCalledOnce();
                expect(this.todoListViewStub)
                .toHaveBeenCalledWith({
                    collection: this.collection
                });
            });

        });

    });


});
