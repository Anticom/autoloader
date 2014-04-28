module.exports = Path;

function Path(pathString, delimiter) {
	var _delimiter = '/';
	_delimiter = _delimiter || delimiter;
	
	this.pathString = pathString;
	
	this.getDelimiter = function() {
		return _delimiter;
	}
}

Path.prototype.isAbsolute = function() {
	return (this.pathString.substr(0, 1) == this.getDelimiter());
};
Path.prototype.isRelative = function() {
	return (this.pathString.substr(0, 1) != this.getDelimiter());
};
Path.prototype.isPath = function() {
	return (this.pathString.indexOf(this.getDelimiter()) != -1);
};
// Path.prototype.isURI = function() {};
// Path.prototype.isURL = function() {};
// Path.prototype.toURI = function() {};
// Path.prototype.toURL = function() {};

Path.prototype.normalize = function() {
	var segments = this.pathString.split(this.getDelimiter());
	var newSegments = [];
	
	var i, currentSegment;
	for(i = 0; i < segments.length; i++) {
		currentSegment = segments[i];
		
		switch(currentSegment) {
			case '.':
				//do nothing :)
				break;
			case '..':
				if(newSegments.length > 0) {
					newSegments.pop();
				} else {
					//throw error or something?!
					
					//unable to normalize... this will be attempted in a future call, when more previous segments are available
					newSegments.push('..');
				}
				break;
			// case '':
				// break;
			default:
				newSegments.push(currentSegment);
				break;
		}
	}
	
	this.pathString = newSegments.join(this.getDelimiter());
	
	return this;
};
Path.prototype.absolutify = function(relativeTo) {
	var _relativeTo = '';
	_relativeTo = _relativeTo || relativeTo;
	
	//do not resolve, if path is already absolute
	if(this.isAbsolute()) {
		return this;
	}
	
	var newPath = _relativeTo + this.pathString;
	
	var tmpPath = new Path(newPath, this.getDelimiter());
	this.pathString = tmpPath.normalize().toString();
	
	return this;
};

Path.prototype.toString = function() {
	return this.pathString;
};
Path.prototype.getDir = function() {};
Path.prototype.getFile = function() {};
