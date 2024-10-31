/* jshint ignore:start */

// HTML Fixtures
// From Jasmine jQuery project: https://github.com/velesin/jasmine-jquery

// By default, fixtures are loaded from spec/javascripts/fixtures. You can configure this path:
jasmine.getFixtures().fixturesPath = '../public/static/test/fixtures/';

loadFixtures(fixtureUrl[, fixtureUrl, ...])
// Loads fixture(s) from one or more files and automatically appends them to the DOM (to the fixtures container).

appendLoadFixtures(fixtureUrl[, fixtureUrl, ...])
// Same as load, but adds the fixtures to the pre-existing fixture container.

readFixtures(fixtureUrl[, fixtureUrl, ...])
// Loads fixture(s) from one or more files but instead of appending them to the DOM returns them as a string (useful if you want to process fixture's content directly in your test).

setFixtures(html)
// Doesn't load fixture from file, but instead gets it directly as a parameter (html parameter may be a string
// or a jQuery element, so both set('<div></div>') and set($('<div/>')) will work). Automatically appends fixture to the DOM (to the fixtures container). It is useful if your fixture is too simple to keep it in an external file or is constructed procedurally, but you still want Fixture module to automatically handle DOM insertion and clean-up between tests for you.

appendSetFixtures(html)
// Same as set, but adds the fixtures to the pre-existing fixture container.

sandbox({
  id: 'my-id',
  class: 'my-class',
  myattr: 'my-attr'
})
// Will return:
// <div id="my-id" class="my-class" myattr="my-attr"></div>
// Sandbox method is useful if you want to quickly create simple fixtures in your tests without polluting them with HTML strings

/* jshint ignore:end */
