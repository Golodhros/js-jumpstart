// Ref: http://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute
var start = new Date().getTime();
console.log('start!');

// do something

var end = new Date().getTime(),
    time = end - start;
console.log('Execution time: ' + time);