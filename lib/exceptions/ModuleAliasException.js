module.exports = ModuleAliasException;

function ModuleAliasException(alias, fqn) {
	this.alias = alias;
	this.fqn = fqn;
	this.message = 'Cannot alias "' + fqn + '" as "' + alias + '" since this is a reserved module name!';
}