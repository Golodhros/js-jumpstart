const isValid = (value) => {
  return typeof value !== "undefined";
}

class Model {
  attributes = {};
  handlers = [];

  constructor(initialObject) {
    let keys = Object.keys(initialObject);

    keys.forEach((key) => {
      if (isValid(initialObject[key])) {
        this.attributes[key] = initialObject[key];
      }
    });
  }

  get(key) {
    if (isValid(this[key])) {
      return this.attributes[key];
    } else {
      return false;
    }
  }

  set(key, value) {
    if (isValid(value)) {
      let oldState = Object.assign({}, this.attributes);
      let oldValue = this.attributes[key];

      this.attributes[key] = value;

      if (oldValue !== value) {
        this.handlers.forEach(({attribute, cb}) => {
          if (key === attribute) {
            cb(this.attributes[key]);
          }
          if (attribute === 'all') {
            cb(this.attributes, oldState);
          }
        });
      }
    }
  }

  has(key) {
    return isValid(this.attributes[key]);
  }

  unset(key) {
    let oldValue = this.attributes[key];
    let oldState = Object.assign({}, this.attributes);
    this.attributes[key] = undefined;

    this.handlers.forEach(({attribute, cb}) => {
      if (key === attribute) {
        cb(this.attributes[key], oldValue);
      }
      if (attribute === 'all') {
        cb(this.attributes, oldState);
      }
    });
  }

  on(eventName, cb) {
    let [event, attribute] = eventName.split(':');

    if (!attribute) {
      attribute = 'all';
    }

    this.handlers.push({attribute, cb});
  }

}


// Create a Model class that has the following methods:
var person = new Model({ name: 'John', age: 10, gender: 'M',  });

// Assumptions
// - '', false and null are valid values
// - undefined is not valid, when getting, it will return false
// - no type checking
// - regular sizes, no constrained
// - we override repeated keys

console.log(person.get('name'));
person.set('name', 'Bob');
console.log(person.get('name'));

console.log(person.get('set'));
person.unset('has');
console.log(person.has('gender'));
person.unset('gender');
console.log(person.has('gender'));

person.on('change', (objStates, oldState) => console.log('changed', objStates, oldState));
person.on('change:name', (name, oldName) => console.log('changed name:' + name + ' from ' + oldName));
person.on('change:age', (age, oldAge) => console.log('changed age:' + age + ' from ' + oldAge));


person.set('name', "john");

// changed { name: John, age: 10, gender: 'M'}
// changed name: John

person.set('age', 10);
// changed { name: John, age: 20, gender: 'M'}

