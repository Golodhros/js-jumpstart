// The node() function provides access to the lowest level DOM operations attached to the DOM Node.

var selection = d3.select('body').append('div').html('zomg')

selection.attr('foo', 'bar')

// <body> <div foo='bar'> zomg </div> </body>

var n = selection.node()

// common useful things found on the node

console.log(n.nodeName)         // 'div'
console.log(n.attributes)       // { 0: 'foo' }
console.log(n.getClientRects()) // returns the bounding box for the element
console.log(n.hidden)           // false
console.log(n.innerHTML)        // 'zomg'
console.log(n.hasChildNodes())  // false

// append a child node
selection.append('div').html('a child node')
console.log(n.hasChildNodes())  // true