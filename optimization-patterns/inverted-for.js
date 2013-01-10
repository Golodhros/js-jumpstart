/**
 * Bucle for invertido para mejor performance
 */
var aArray = ['a', 'b', 'c', 'd'],
nArrayLength = aArray.length;

for (var i = nArrayLength; i--;){
	aArray[i] = setSomething();
}
