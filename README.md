# jquery.func

_Some utility functions for jQuery_

## Download

`bower install jquery.func`

## Tests

Everything needed to run the tests are in this repository. 

	git clone git@github.com:Becojo/jquery.func.git
	cd jquery.func/test
	open SpecRunner.html

Jasmine is released under the MIT license. 

See `test/lib/jasmine-1.3.1/MIT.LICENSE`.

## Docs
### $.fn.reverse() → jQuery object

Props to Michael Geary for this functions. It reverses the elements of a jQuery object.

```javascript
$([1,2,3]).reverse(); // [3,2,1]
```

**Note**: It modifies the object and does not create a new one.

	var a = $([1,2,3]);
	a == a.reverse() // this is true
	a == $(a).reverse() // this is false

### $.fn.all(iterator) → Boolean

Returns `true` if all of the elements in the jQuery object pass the `iterator` truth test.

**Example**: Determining if all number in the given list are even.

```javascript
var even = function() { return this % 2 == 0 };
$([1,2,3,4]).all(even); // false;
$([2,4,6,8]).all(even); // true;
```

**Note**: If any of the elements does not pass the truth test, the function quits immediately and returns `false`.

### $.fn.any(iterator) → Boolean

Returns `true` if any of the elements contained in the jQuery object pass the `iterator` truth test.

**Example**: determining if any number in the given list is even.

```javascript
$([1,3,5,7,8]).any(even); // true
```

**Note**: On the first element that passes the truth test, the function quits immediately and returns `true`.

### $.fn.intercept(interceptor) → jQuery object

Invokes the interceptor with the current jQuery object and returns the same object (similar to `Object#tap` in Ruby).

**Example**: `console.log` the value of the jQuery object in a chain.

```javascript
var log = function(e){ 
	// the value of `this` is equal to `e`
	console.log(e);
};

$("div").tap(log).reverse().tap(log);
```

**Note**: The object can be modified in the `interceptor`.

### $.method(name, [args, …]) → Function

Returns a closure of the jQuery function named `name` with the arguments `args`. 

**Example**: Fixing `$.fn.is` which only checks the first element.

```javascript
var blinking = $.method("is", "div.blinking");

if($("header > *").any(blinking)) {
	// ...
}

if($("footer > *").all(blinking)) {
	// ...
}
```
	
### $.fn.invoke(name, [args, ...]) → jQuery object

Returns a new jQuery object where the jQuery function named `name` has been applied to every elements.

**Example**: Creating an array containing the value of an attribute.

```javascript
$("div").invoke("attr", "id");

// is the same as 

var getId = $.method("attr", "id");
$("div").map(getId);
```

### $.fn.reduce(iterator, seed) → Object

Allows to reduce a list into a single value.

**Example**: Finding the biggest element in a list

```javascript
$([1, 2, 3]).inject(function(biggest, value) {
	return value > biggest ? value : biggest;
});
```

## License

This is free and unencumbered public domain software. For more information, see http://unlicense.org/ or the accompanying UNLICENSE file.
