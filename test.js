var expect   = require('expect.js');
var jalfrezi = require('./');

exports.Jalfrezi = {
	'base function': {
		'calls with defaults': function() {
			var o;
			var g = function(o2) {
				o = o2;
			};
			var f = jalfrezi({
				a: 1,
				b: 2,
				c: 3
			}, g);

			f();

			expect(o).to.eql({
				a: 1,
				b: 2,
				c: 3
			});
		},

		'keeps other args': function() {
			var o, a, b, c;
			var g = function(o2, a2, b2, c2) {
				o = o2;
				a = a2;
				b = b2;
				c = c2;
			};
			var f = jalfrezi({
				a: 1,
				b: 2,
				c: 3
			}, g);

			f(1, 2, 3);

			expect([a, b, c]).to.eql([1, 2, 3]);
		}
	},

	with: {
		'just the options': function() {
			var o;
			var g = function g(o2) {
				o = o2;
			};
			var f = jalfrezi({
				a: 1,
				b: 2,
				c: 3
			}, g);

			var h = f.withA('a');
			h();

			expect(o).to.eql({
				a: 'a',
				b: 2,
				c: 3
			});
		},

		'and other stuff': function() {
			var o, a, b;
			var g = function g(o2, a2, b2) {
				o = o2;
				a = a2;
				b = b2;
			};
			var f = jalfrezi({
				a: 1,
				b: 2,
				c: 3
			}, g);

			var h = f.withA('a');
			h('a', 'b');

			expect(o).to.eql({
				a: 'a',
				b: 2,
				c: 3
			});

			expect(a).to.be('a');
			expect(b).to.be('b');
		}
	},

	defaults: {
		'not giving anything': function() {
			var o;
			var g = function g(o2) {
				o = o2;
			};
			var f = jalfrezi({
				a: 1,
				b: 2,
				c: 3
			}, g);

			f.g_({});

			expect(o).to.eql({
				a: 1,
				b: 2,
				c: 3
			});
		},

		'filling stuff in': function() {
			var o;
			var g = function g(o2) {
				o = o2;
			};
			var f = jalfrezi({
				a: 1,
				b: 2,
				c: 3
			}, g);

			f.g_({
				b: 'b',
				c: 'c',
			});

			expect(o).to.eql({
				a: 1,
				b: 'b',
				c: 'c'
			});
		},

		'unexpected parameters': function() {
			var g = function g(o) {};
			var f = jalfrezi({
				a: 1,
				b: 2,
				c: 3
			}, g);

			expect(function() {
				f.g_({d: 4});
			}).to.throwException(/Unexpected option d/);
		}
	},

	currying: function() {
		var o, a, b, c;
		var g = function(o2, a2, b2, c2) {
			o = o2;
			a = a2;
			b = b2;
			c = c2;
		};

		var f = jalfrezi({}, g);
		var f_ = f(1);
		var f__ = f_(2);
		f__(3);

		expect([o, a, b, c]).to.eql([
			{}, 1, 2, 3
		]);
	}
};