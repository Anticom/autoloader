module.exports.version = '0.0.1';

module.exports.NamespaceResolver    = require('./NamespaceResolver');
module.exports.AutoLoader           = require('./AutoLoader');
module.exports.UseRegistry          = require('./UseRegistry');

module.exports.ModuleAliasException = require('./exceptions/ModuleAliasException');
module.exports.ReassignedException  = require('./exceptions/ReassignedException');

/*
module.exports.boot = function() {
	return new module.exports.Loader();
};
*/