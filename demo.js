var AutoLoader = require('./lib/').AutoLoader;

var i = new AutoLoader();

i.use('my_test_namespace_file', 'app');
i.require('app')();

/*
//misc tests:
var i = new AutoLoader();
var nr = i.namespaceResolver;

i.use('my_namespace_cls');
i.use('my_namespace_method');
i.use('my_namespace_singleton', 'myService');
console.log(nr);

//raise an error:
try {
	i.use('this_is_going_wrong', 'http');
} catch(e) {
	console.log();
	console.log(e);
}

//raise another error:
try {
	i.use('my_cls');
} catch(e) {
	console.log();
	console.log(e);
}

console.log();
console.log(nr.resolve('myService'));
console.log(nr.resolve('cls'));
console.log(nr.resolve('this_is_unkown'));
console.log(nr.resolve('http'));
*/