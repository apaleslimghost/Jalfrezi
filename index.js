var defaults   = require('defaults');
var curry      = require('curry');
var pascalCase = require('pascal-case');

module.exports = function jalfrezi(def, fn) {
	function notInDef(k) {
		return Object.keys(def).indexOf(k) === -1;
	}

	var length = fn._length || fn.length;
	var name = fn.displayName || fn.name;

	var base = curry.to(length, function(options) {
		var args = [].slice.call(arguments, 1);
		var unex = Object.keys(options).filter(notInDef);

		if(unex.length) throw new TypeError('Unexpected option' + (unex.length > 1 ? 's ' : ' ') + unex.join(', '));
		return fn.apply(this, [defaults(options, def)].concat(args));
	});

	var out = base.bind(null, {});
	out[name + '_'] = base;

	var withArg = curry.to(length + 1, function withArg_(opt, arg) {
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
		out['with' + pascalCase(opt)] = length === 1 ? withArg1(opt) : withArg(opt);
	}

	out.applyN = function(n, v) {
		function wrapped() {
			var args = [].slice.call(arguments);
			args.splice(n + 1, 0, v);
			return base.apply(this, args);
		}

		wrapped._length = fn.length - 1;
		return jalfrezi(def, wrapped);
	};

	return out;
};
