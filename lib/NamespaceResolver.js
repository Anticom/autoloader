var UseRegistry = require('./UseRegistry');

module.exports = NamespaceResolver;

function NamespaceResolver(basePath, delimiter, directorySeperator) {
	this.useRegistry = new UseRegistry(delimiter);
	
	this.getDelimiter = function() {
		return delimiter;
	}
	
	this.getDirectorySeperator = function() {
		return directorySeperator;
	}
	
	this.getBasePath = function() {
		return basePath;
	}
}

NamespaceResolver.prototype.useRegistry = null;

NamespaceResolver.prototype.resolve = function(alias) {
	var buildin = require('repl')._builtinLibs;
	if(buildin.indexOf(alias) != -1) {
		return alias;
	}
	
	//TODO add support for paths (that shouldn't be resolved)
	
	//resolve uses
	if(this.useRegistry.hasAlias(alias)) {
		alias = this.useRegistry.lookup(alias);
	}
	
	return this.getBasePath()
	    + alias.split(this.getDelimiter()).join(this.getDirectorySeperator())
	    + '.js';
}
