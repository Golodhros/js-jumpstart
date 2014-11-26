// Ref: https://github.com/brendajin/jasmine-backbone
describe("Tests for a custom Backbone Model", function() {
  var monster,
    monsterView;

  beforeEach(function() {
    monster = new MonsterModel({
      brandName: 'monster',
      website: 'http://www.monster.com',
      yearFounded: 1858,
      isDepartmentStore: true
    });

    spyOn(MonsterView.prototype, 'render').and.callThrough();

    monsterView = new MonsterView({
      model: monster
    });
  });

  // Test events are set
  it("can test for default events like a ul click", function() {
    expect(monsterView.events['click ul li']).toBeDefined();
    expect(monsterView.events['click ul li']).toEqual('clickCallback');
  });

  // Test view renders when model changes
  it("can test for reactions to Model-level events", function() {
    monster.set('isDepartmentStore', false);
    expect(monsterView.render).toHaveBeenCalled();
  });

  // Check if logic to manipulate DOM is working
  it("can test for functional DOM changes", function() {
    var oldLength, newLength;
    $('body').append(monsterView.render().$el);

    oldLength = monsterView.$('li').length;

    monsterView.$('ul li').click();

    newLength = monsterView.$('li').length;

    expect(newLength - oldLength).toEqual(1);

    monsterView.remove();
  });
});