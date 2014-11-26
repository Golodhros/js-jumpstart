// Ref: https://github.com/brendajin/jasmine-backbone
describe("Tests for a custom Backbone Model", function() {
  var monster;

  beforeEach(function() {
    monster = new MonsterModel({
      brandName: 'monster',
      website: 'http://www.monster.com',
      yearFounded: 1858,
      isDepartmentStore: true
    });
  })

  // Test Defaults
  it("can have default properties such as brandName, website, yearFounded, and isDepartmentStore", function() {
    expect(monster.defaults).toBeDefined();
    expect(monster.defaults.brandName).toBeDefined();
    expect(monster.defaults.website).toBeDefined();
    expect(monster.defaults.yearFounded).toBeDefined();
    expect(monster.defaults.isDepartmentStore).toBeDefined();
  });

  // Test Model methods are defined
  it("can have a custom method called calculateAge", function() {
    expect(monster.calculateAge).toBeDefined();
  });

  it("can have a custom method called fetchDepartments", function() {
    expect(monster.fetchDepartments).toBeDefined();
  });

  // Test Model methods actually work
  it("will set the age after calculateAge is called", function() {
    monster.calculateAge();
    expect(monster.get('age')).toBeDefined();
    expect(monster.get('age')).toEqual((new Date().getFullYear()) - monster.get('yearFounded'));
  });

  it("can make sure that calculateAge is called when instantiated", function() {
    spyOn(monster, 'calculateAge');
    monster.initialize();
    expect(monster.calculateAge).toHaveBeenCalled();
  });

  // Test Initialization process
  it("can make sure that fetchDepartments is called when instantiated, but only if isDepartmentStore is true", function() {
    spyOn(monster, 'fetchDepartments');


    console.log(monster.get('isDepartmentStore'))
    // remember isDepartmentStore was set to true
    monster.initialize();
    expect(monster.fetchDepartments).toHaveBeenCalled();

    monster.set('isDepartmentStore', false);
    monster.initialize();
    expect(monster.fetchDepartments.calls.count()).toEqual(1);
  });

  it("can test Model events using spies in the spec", function() {
    var myObject = {
      aFakeCallback: function() {
        return true;
      }
    }

    spyOn(myObject, 'aFakeCallback');
    monster.on('customEvent', myObject.aFakeCallback);

    monster.triggerCustomEvent();
    expect(myObject.aFakeCallback).toHaveBeenCalled();
  });
});