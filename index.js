var defaults   = require('defaults');
var curry      = require('curry');
var pascalCase = require('pascal-case');

module.exports = function(def, fn) {
	var base = curry.to(fn.length, function(options) {
		var args = [].slice.call(arguments, 1);
		return fn.apply(this, [defaults(options, def)].concat(args));
	});

	var out = base.bind(null, {});
	out[fn.name + '_'] = base;

	var withFn = curry.to(fn.length + 1, function withFn_(opt, fn) {
		var args = [].slice.call(arguments, 2);
		var opts = {};
		opts[opt] = fn;
		return base.apply(this, [opts].concat(args));
	});

	for(var opt in def) {
		out['with' + pascalCase(opt)] = withFn(opt);
	}

	return out;
};