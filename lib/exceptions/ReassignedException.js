module.exports = ReassignedException;

function ReassignedException(alias, fqn) {
	this.alias = alias;
	this.fqn = fqn;
	this.message = 'The alias "' + alias + '" has already been assinged to FQN: "' + fqn + '"';
}