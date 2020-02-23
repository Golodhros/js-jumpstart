// Welcome to Facebook!

// This is just a simple shared plaintext pad, with no execution capabilities.

// When you know what language you would like to use for your interview,
// simply choose it from the dropdown in the top bar.

// Enjoy your interview!

items = [
  {type: 'phone', name: 'iPhone', color: 'gold'},
  {type: 'laptop', name: 'Chromebook', color: 'gray'},
  // ...
]

excludes = [
  {k: 'color', v: 'gold'},
  {k: 'color', v: 'silver'},
  {k: 'type', v: 'tv'},
  {k: 'name', v: 'iPhone'},
  // ...
]


const createMapFromFilters = (excludes) => {
  let map = {};

  excludes.forEach(function({k, v}) {
    if (map[k]) {
      map[k].push(v);
    } else {
      map[k] = [v];
    }
  });

  return map;
}


function applyFilters(items, excludes) {
  const filterMap = createMapFromFilters(excludes);

  let filteredItems = items.filter((item) => {
    let shouldBeIn = true;

    Objet.keys(item).forEach((key) => {
      if(filterMap[key]) {
        if(filterMap[key].includes(item[key])) {
          shouldBeIn = false;

          break;
        }
      }
    });

    return shouldBeIn;
  });

  return filteredItems;
}


// Function to filter out the items given the list of excludes
// Assumptions
// - All keys are present for each item
// - All values on items don't need to be defined, if they are not defined, we won't show it
// - Items is a long list
// - Items properties could grow in the future
// - Array.prototype.includes is supported


// color:["gold", "silver"]
// type: ["phone"]
// name: ["iPhone"]




//   A         B
//  / \       / \
// O   O     O   O
//    /|\       /|\
//   x O O     y O O

// y = find(A, B, x);


// Find y
// Assumptions
// Same structure
// DOM - we know the
// Tree can be as deep as it could be
//

const find = (A, B, x) => {
  let stack = [];

  // Traversing A
  let node = x;
  while (node !== A) {
    let parent = x.parentNode; //

    parent.children.forEach((n, index) => {
      if (n =  node) {
        stack.push(index);
        break;
      }
    }

    node = parent;
  }

  // Finding y
  let y = B;
  while(stack.length) {
    let index = stack.pop();

    y = B.children[index];
  }

  return y;
}









