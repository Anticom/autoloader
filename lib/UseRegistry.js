var ModuleAliasException = require('./exceptions/ModuleAliasException');
var ReassignedException  = require('./exceptions/ReassignedException');

module.exports = UseRegistry;

function UseRegistry(delimiter) {
	var buildIn = require('repl')._builtinLibs;

	this.getDelimiter = function() {
		return delimiter;
	}
	
	this.getBuildIn = function() {
		return buildIn;
	}
}

UseRegistry.prototype.registry = {};

UseRegistry.prototype.set = function(key, alias) {
	if(alias === undefined) {
		//take name portion of fqn and use it as alias
		alias = key.split(this.getDelimiter()).pop();
	} else {
		//don't allow aliasing as a build in module name
		if(this.getBuildIn().indexOf(alias) != -1) {
			throw new ModuleAliasException(alias, key);
		}
	}

	//don't allow re-assignment of aliases
	if(this.hasAlias(alias)) {
		throw new ReassignedException(alias, this.lookup(alias));
	}

	this.registry[alias] = key;
}

UseRegistry.prototype.unset = function(alias) {
	if(this.has(alias)) {
		this.registry.remove(alias);
		
		return true;
	} else {
		return false;
	}
}

UseRegistry.prototype.clear = function() {
	UseRegistry.registry = {};
}

UseRegistry.prototype.has = function(alias) {
	for(alias in this.registry) {
		var currentKey = this.registry[alias];
		if(currentKey == key) {
			return true;
		}
	}
	
	return false;
}

UseRegistry.prototype.hasAlias = function(alias) {
	return (this.lookup(alias) !== undefined);
}

UseRegistry.prototype.lookup = function(alias) {
	return this.registry[alias];
}
