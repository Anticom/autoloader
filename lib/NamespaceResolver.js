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
	//do not modify paths, except making it relative to the including file
	// var Path = require('./Path');
	// var path = new Path(alias, this.getDirectorySeperator());
	// if(path.isPath()) {
		// return this.getBasePath() + alias;
	// }

	//exclude build in modules from resolution (this shouldn't be neccesarry anymore, since it's caught in the useregistry already)
	var buildin = require('repl')._builtinLibs;
	if(buildin.indexOf(alias) != -1) {
		return alias;
	}
	
	//resolve uses
	if(this.useRegistry.hasAlias(alias)) {
		alias = this.useRegistry.lookup(alias);
	}
	
	//build relative include path
	var filePath = this.getBasePath()
	    + alias.split(this.getDelimiter()).join(this.getDirectorySeperator());
	    // + '.js';
	
	var Path = require('./Path');
	var path = new Path(filePath, this.getDirectorySeperator());
	return path.normalize().toString();
}

NamespaceResolver.prototype.isRelativePath = function(str) {
	return (str.search(/(\.\.|\.|\\|\/)*([a-zA-Z0-9]*)+/) != -1);
}

NamespaceResolver.prototype.isAbsolutePath = function(str) {
	return (str.search(/^(\/|\\)([a-zA-Z0-9]*(\.\.|\.|\\|\/)*)+/) != -1);
}

NamespaceResolver.prototype.isPath = function(str) {
	return this.isRelativePath(str) || this.isAbsolutePath(str);
}
