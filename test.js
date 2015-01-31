var expect   = require('expect.js');
var jalfrezi = require('./');

exports.Jalfrezi = {
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
				d: 5
			});

			expect(o).to.eql({
				a: 1,
				b: 'b',
				c: 'c',
				d: 5
			});
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