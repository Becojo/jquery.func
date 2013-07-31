# jquery.func
_Some utility functions jQuery_

## Functions
### $.fn.reverse() → jQuery object
Props to Michael Geary for this functions. It reverses the elements of a jQuery object.

	$([1,2,3]).reverse(); // [3,2,1]

It modifies the object and does not create a new one.

	var a = $([1,2,3]);
	a == a.reverse() // this is true
	a == $(a).reverse() // this is false

### $.fn.all(iterator) → Boolean
Only if all the elements contained in the jQuery object makes the `iterator` returns true, the function will return `true`.

	var even = function(){ return this % 2 == 0 };
	$([1,2,3,4]).all(even); // false;
	$([2,4,6,8]).all(even); // true;

If any of the elements makes the `iterator` return `false`, the function quits immediately and also returns `false`

### $.fn.any(iterator) → Boolean
If any of the elements contained in the jQuery object makes the `iterator` returns true, the function will return `true`.
	
	$([1,3,5,7,8]).any(even); // true

If any of the elements makes the `iterator` return `true`, the function quits immediately and also returns `true`

### $.fn.intercept(interceptor) → jQuery object
Allows to call the interceptor with the current jQuery object without making modifications (think of `Object#tap` in Ruby). It is useful for debugging chains. 

	var log = function(e){ 
		// the value of `this` is `e`
		console.log(e);
	};
	$("1,2,3".split(",")).tap(log).reverse().tap(log);

### $.method(name, [args, …]) → Function
Returns a closure of the jQuery function named `name` with the arguments `args`. Useful with `$.fn.map` or `$.fn.each`.

	var getId = $.method("attr", "id");
	$("div").map(getId);
	
---

	var blinking = $.method("is", "div.blinking");
	$("header > *").any(blinking);
	$("footer > *").all(blinking);
	
### $.fn.invoke(name, [args, ...]) → jQuery object
Maps the jQuery function named `name` with the arguments `args` to all elements of an object.

	$("div").invoke("attr", "id"); // returns an array of all the ids of all divs

## License
This is free and unencumbered public domain software. For more information, see http://unlicense.org/ or the accompanying UNLICENSE file.