var defaults = require('defaults');
var curry    = require('curry');

module.exports = function(def, fn) {
	return curry.to(fn.length + 1, function(options) {
		return fn.apply(this, [
			defaults(options, def)
		].concat([].slice.call(arguments, 1)));
	});
};