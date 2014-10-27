// Parameter Search on Router
routes: {
    'base/:foo': 'search',
    'base/:bar': 'search',
    'base/:foo/:bar': 'search'
},

search: function() {
    var foo, bar, i;

    for(i = arguments.length - 1; i >= 0; i--) {

        if(arguments[i] === 'something to determine foo') {
            foo = arguments[i];
            continue;
        }
        else if(arguments[i] === 'something to determine bar') {
            bar = arguments[i];
            continue;
        }
    }
},