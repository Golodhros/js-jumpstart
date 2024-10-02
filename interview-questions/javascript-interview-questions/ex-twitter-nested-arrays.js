
// Given a nested list of integers, return the sum of all integers in the list weighted by their depth.
// Each element is either an integer, or a list – whose elements may also be integers or other lists.

// I: [[1,1],2,[1,1]]
// O: (1*2 + 1*2) + 2*1 + (1*2 + 1*2) = 10

// I: [1,[4,[6]]]
// O: (1*1) + (4*2) + (6*3) = 27

// I: [[1]]
// O: (1*2) = 2

// I: [[[[1]]]]
// O: 4

 // public int sum(List<NestedInteger> nestedList) {}
 //  // This is the interface that allows for creating nested lists.
 //  // You should not implement it, or speculate about its implementation
 //  public interface NestedInteger {
 //      // Constructor initializes an empty nested list.
 //      public NestedInteger();

 //      // Constructor initializes a single integer.
 //      public NestedInteger(int value);

 //      // @return true if this NestedInteger holds a single integer, rather than a nested list.
 //      public boolean isInteger();

 //      // @return the single integer that this NestedInteger holds, if it holds a single integer
 //      // Return null if this NestedInteger holds a nested list
 //      public Integer getInteger();

 //      // @return the nested list that this NestedInteger holds, if it holds a nested list
 //      // Return null if this NestedInteger holds a single integer
 //      public List<NestedInteger> getList();
 //  }

// Assumptions
// - all elelments are numbers (non-null, non-empty, non-undefines)
// - all positive
// - no nesting limitations
// - There could be levels with no numbers

// O(p) with p number of "["

// I: [[1,1],2,[1,1]]  List<NestedInteger>
// extract [1,1],2,[1,1] [1,1] ==> NestedInteger
// iteration = 1
// iterate, is array?
    // not - iteration * number + ...
    // is - add it to a stack
    // iteration++
    // pop next element stack

// [[1,1],2,[1,1]]  - [2, [1,1], [1,1], [[2]]]
// [2,[1,1], [1,[2]], [[2]]]
// O(p) with p number of "["

// [1, [2]]
//[2] ==> NestedInteger
//  [[1,1],2,[[1]]] = 9
// [[[1]], [1,1],2]

// [[1]]

//[[[1]]], iteration = 1
// [[1]], 2
// ==> [1], 3
const sum = (nestedList) => {
    // Checks
    let stack = [{item: nestedList, iteration: 1}];
    // let iteration = 1;
    let result = 0;

    while(stack.length) {
        let list = stack.pop();

        list.getList().forEach(({item, iteration}) => {
            if (item.isInteger()) {
                result = result + (iteration * item.getInteger());
            } else {
                stack.push({item, iteration + 1});
            }
        });
    }

    return result;
}

// 2
