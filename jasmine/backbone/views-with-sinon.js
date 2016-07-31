// Reference
// http://tinnedfruit.com/2011/04/26/testing-backbone-apps-with-jasmine-sinon-3.html
describe("TodoListView", function() {

    beforeEach(function() {
        this.view = new TodoListView();
    });

    describe("Instantiation", function() {

        it("should create a list element", function() {
            expect(this.view.el.nodeName).toEqual("UL");
        });

        it("should have a class of 'todos'", function() {
            expect($(this.view.el)).toHaveClass('todos');
        });

    });

    describe("Rendering", function() {

        beforeEach(function() {
            this.todoView = new Backbone.View();
            this.todoView.render = function() {
              this.el = document.createElement('li');
              return this;
            };
            this.todoRenderSpy = sinon.spy(this.todoView, "render");
            this.todoViewStub = sinon.stub(window, "TodoView")
            .returns(this.todoView);
            this.todo1 = new Backbone.Model({id:1});
            this.todo2 = new Backbone.Model({id:2});
            this.todo3 = new Backbone.Model({id:3});
            this.view.collection = new Backbone.Collection([
                this.todo1,
                this.todo2,
                this.todo3
                ]);
            this.view.render();
        });

        afterEach(function() {
            window.TodoView.restore();
        });

        it("should create a Todo view for each todo item", function() {
            expect(this.todoViewStub)
            .toHaveBeenCalledThrice();
            expect(this.todoViewStub)
            .toHaveBeenCalledWith({model:this.todo1});
            expect(this.todoViewStub)
            .toHaveBeenCalledWith({model:this.todo2});
            expect(this.todoViewStub)
            .toHaveBeenCalledWith({model:this.todo3});
        });

        it("appends the todo to the todo list", function() {
            expect($(this.view.el).children().length).toEqual(3);
        });

        it("returns the view object", function() {
            expect(this.view.render()).toEqual(this.view);
        });

        it("produces the correct HTML", function() {
            this.view.render();
            expect(this.view.el.innerHTML)
            .toEqual('<a href="#todo/1"><h2>My Todo</h2></a>');
        });

    });

    describe("Template", function() {

        beforeEach(function() {
            this.view.render();
        });

        it("has the correct URL", function() {
            expect($(this.view.el).find('a'))
            .toHaveAttr('href', '#todo/1');
        });

        it("has the correct title text", function() {
            expect($(this.view.el).find('h2'))
            .toHaveText('My Todo');
        });

    });

    describe("Edit state", function() {

        describe("When edit button handler fired", function() {

            beforeEach(function() {
                $('ul.todos').append(this.view.render().el);
                this.li = $('ul.todos li:first');
                this.li.find('a.edit').trigger('click');
            });

            it("shows the edit input field", function() {
                expect(this.li.find('input.edit'))
                .toBeVisible();
                expect(this.li.find('h2'))
                .not.toBeVisible();
            });

        });

    });

    describe("When edit button handler fired", function() {

        beforeEach(function() {
            $('ul.todos').append(this.view.render().el);
            this.li = $('ul.todos li:first');
            this.li.find('a.edit').trigger('click');
        });

        it("shows the edit input field", function() {
            waits(510);
            runs(function() {
                expect(this.li.find('input.edit'))
                .toBeVisible();
                expect(this.li.find('h2'))
                .not.toBeVisible();
            });
        });

    });

    describe("When edit button handler fired", function() {

        beforeEach(function() {
            this.clock = sinon.useFakeTimers();
            $('ul.todos').append(this.view.render().el);
            this.li = $('ul.todos li:first');
            this.li.find('a.edit').trigger('click');
        });

        afterEach(function() {
            this.clock.restore();
        });

        it("shows the edit input field", function() {
            this.clock.tick(600);
            expect(this.li.find('input.edit'))
            .toBeVisible();
            expect(this.li.find('h2'))
            .not.toBeVisible();
        });

    });

});



// Triggering key events
// function triggerKeyUp() {
//     var e = new $.Event('keyup');

//     // Key 'Enter'
//     e.keyCode = '65';
//     $('.js-search-events').val('A').trigger(e);
// }

// function triggerEnter() {
//     var e = new $.Event('keypress');

//     // Character 'A'
//     e.keyCode = '13';
//     $('.js-search-events').val('A').trigger(e);
// }