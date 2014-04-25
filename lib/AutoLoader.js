module.exports = AutoLoader;

function AutoLoader(basePath, delimiter, directorySeperator) {
	var _delimiter = '_',
	    _directorySeperator = '/',
		_basePath = './../';
	_delimiter = _delimiter || delimiter;
	_directorySeperator = _directorySeperator || directorySeperator;
	_basePath = _basePath || basePath;

	var NamespaceResolver = require('./NamespaceResolver');
	this.namespaceResolver = new NamespaceResolver(_basePath, _delimiter, _directorySeperator);
	
	this.getDelimiter = function() {
		return _delimiter;
	}
	
	this.getDirectorySeperator = function() {
		return _directorySeperator;
	}
	
	this.getBasePath = function() {
		return _basePath;
	}
}

AutoLoader.prototype.namespaceResolver = null;
AutoLoader.prototype.instanciatedClasses = [];

AutoLoader.prototype.require = function(fqn) {
	var file = this.namespaceResolver.resolve(fqn);
	console.log('attempting to require: ' + file);
	return require(file);
}

/*
AutoLoader.prototype.call = function() {
	var args = this.parseArguments(arguments);
	
	var method = args.shift();
	var params = args;
	
	//require
	var file = this.namespaceResolver.resolve(method);
	var METHOD = require(file);
	
	//call & return
	return Function.apply(METHOD, params);
}

AutoLoader.prototype.callStatic = function() {
	//TODO
}

AutoLoader.prototype.instanciate = function() {
	var args = this.parseArguments(arguments);
	
	var cls = args.shift();
	var params = args;
	
	//require
	var file = namespaceResolver.resolve(cls);
	var CLASS = require(file);
	
	//call & return
}

AutoLoader.prototype.single = function() {
	var args = this.parseArguments(arguments);
	
	var cls = args.shift();
	var params = args;
	
	//check if instanciated
	if(instanciated) {
		//retrieve from cache
		
		//return
		
	} else {
		//require
		
		//store in cache
		
		//return
	}
}
*/
//shortcuts
AutoLoader.prototype.use = function(fqn, alias) {
	this.namespaceResolver.useRegistry.set(fqn, alias);
}

//auxiliaries
AutoLoader.prototype.parseArguments = function(a) {
	return Array.prototype.slice.call(a);
}
