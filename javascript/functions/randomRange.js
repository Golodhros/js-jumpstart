// provide a random value between min and max.
function rand(min, max, integer) {
  var r = Math.random() * (max - min) + min;
  return integer ? r|0 : r;
}
console.log(rand(2,5)); // float random between 2 and 5 inclusive
console.log(rand(1,100,true)); // integer random between 1 and 100