<h1 align="center">
	Jalfrezi<br>

	<a href="http://badge.fury.io/js/jalfrezi">
		<img src="https://badge.fury.io/js/jalfrezi.svg" alt="npm version">
	</a>
	<a href="https://travis-ci.org/quarterto/Jalfrezi">
		<img src="https://travis-ci.org/quarterto/Jalfrezi.svg" alt="Build status">
	</a>
</h1>

Curried default option functions.

```js

function f(options, a, b) {
	console.log(options, a, b);
}

var g = jalfrezi({
	foo: 1,
	bar: 2
}, f);

g('a', 'b'); //⇒ {foo: 1, bar: 2} 'a' 'b'
g.withFoo(100)('a', 'b') //⇒ {foo: 100, bar: 2} 'a' 'b'
g.f_({bar: 200})('a', 'b') //⇒ {foo: 1, bar: 200} 'a' 'b'
```

Licence
---

MIT