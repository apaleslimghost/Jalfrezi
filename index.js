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

	var withArg = curry.to(fn.length + 1, function withArg_(opt, arg) {
		var args = [].slice.call(arguments, 2);
		var opts = {};
		opts[opt] = arg;
		return base.apply(this, [opts].concat(args));
	});

	var withArg1 = curry(function withArg1_(opt, arg) {
		return function() {
			return withArg(opt, arg);
		};
	});

	for(var opt in def) {
		out['with' + pascalCase(opt)] = fn.length === 1 ? withArg1(opt) : withArg(opt);
	}

	return out;
};