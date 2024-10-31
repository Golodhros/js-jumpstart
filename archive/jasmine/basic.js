// Suites
describe("A suite", function() {
    it("contains spec with an expectation", function() {
        expect(true).toBe(true);
    });
});


// Disabling Suites
xdescribe("A spec", function() {});


// Specs
describe("A suite is just a function", function() {
    var a;

    it("and so is a spec", function() {
        a = true;

        expect(a).toBe(true);
    });
});

describe("A spec", function() {
    it("is just a function, so it can contain any code", function() {
        var foo = 0;
        foo += 1;

        expect(foo).toEqual(1);
    });

    it("can have more than one expectation", function() {
        var foo = 0;
        foo += 1;

        expect(foo).toEqual(1);
        expect(true).toEqual(true);
    });
});


// Pending Specs
describe("Pending specs", function() {
    xit("can be declared 'xit'", function() {
        expect(true).toBe(false);
    });

    it("can be declared with 'it' but without a function");

    it("can be declared by calling 'pending' in the spec body", function() {
        expect(true).toBe(false);
        pending();
    });
});


// Setup and Teardown
describe("A spec (with setup and tear-down)", function() {
    var foo;

    beforeEach(function() {
        foo = 0;
        foo += 1;
    });

    afterEach(function() {
        foo = 0;
    });

    it("is just a function, so it can contain any code", function() {
        expect(foo).toEqual(1);
    });

    it("can have more than one expectation", function() {
        expect(foo).toEqual(1);
        expect(true).toEqual(true);
    });
});


// The this keyword
describe("A spec", function() {
    beforeEach(function() {
        this.foo = 0;
    });

    it("can use the `this` to share state", function() {
        expect(this.foo).toEqual(0);
        this.bar = "test pollution?";
    });

    it("prevents test pollution by having an empty `this` created for the next spec", function() {
        expect(this.foo).toEqual(0);
        expect(this.bar).toBe(undefined);
    });
});


// Nesting
describe("A spec", function() {
    var foo;

    beforeEach(function() {
        foo = 0;
        foo += 1;
    });

    afterEach(function() {
        foo = 0;
    });

    it("is just a function, so it can contain any code", function() {
        expect(foo).toEqual(1);
    });

    it("can have more than one expectation", function() {
        expect(foo).toEqual(1);
        expect(true).toEqual(true);
    });

    describe("nested inside a second describe", function() {
        var bar;

        beforeEach(function() {
            bar = 1;
        });

        it("can reference both scopes as needed", function() {
            expect(foo).toEqual(bar);
        });
    });
});





// Expectations
it("and has a positive case", function() {
    expect(true).toBe(true);
});
