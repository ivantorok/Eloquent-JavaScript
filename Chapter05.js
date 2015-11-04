/*2015-10-01 11:32:39 Budapest Time: 
Higher-Order Functions
	Abstraction
	Abstracting array traversal
		forEach(array, action) OR object.forEach(action)
	Higher-order functions
		Functions that operate on other functions, either by taking them as arguments or by returning them, are called higher-order functions.
		For example, you can have functions that create new functions.
		And you can have functions that change other functions.
		You can even write functions that provide new types of control flow.
	Passing along arguments
		apply method
	JSON
		JSON.stringify takes a JavaScript value and returns a JSON-encoded string
		JSON.parse takes such a string and converts it to the value it encodes.
*/
var string = JSON.stringify({name: "X", born: 1980});
console.log(string);
// → {"name":"X","born":1980}
console.log(JSON.parse(string).born);
// → 1980

/*
		ancestry.js
2015-10-01 11:37:00 Budapest Time: to be continued from here:
###############################################################################
The variable ANCESTRY_FILE, available in the sandbox for this chapter and in a downloadable file on the website, contains the content of my JSON file as a string. Let’s decode it and see how many people it contains.


1
var ancestry = JSON.parse(ANCESTRY_FILE);
2
console.log(ancestry.length);
3
// → 39
39
Filtering an array
###############################################################################



*/

/*
2015-11-04 09:33:24 Budapest Time: 
Filtering an array
	PURE: a function is pure when it does not modify the array / argument it is given. Such as when it builds a new array which contains the filtered items from the original array.

Transforming with map
	The map method transforms an array by applying a function to all of its elements and building a new array from the returned values. The new array will have the same length as the input array, but its content will have been “mapped” to a new form by the function.

Summarizing with reduce (or sometimes fold)
*/

function reduce(array, combine, start) {
  var current = start;
  for (var i = 0; i < array.length; i++)
    current = combine(current, array[i]);
  return current;
}

console.log(reduce([1, 2, 3, 4], function(a, b) {
  return a + b;
}, 0));
// → 10

/*
Composability
	Higher-order functions start to shine when you need to compose functions. As an example, let’s write code that finds the average age for men and for women in the data set.
*/

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}
function age(p) { return p.died - p.born; }
function male(p) { return p.sex == "m"; }
function female(p) { return p.sex == "f"; }

console.log(average(ancestry.filter(male).map(age)));
// → 61.67
console.log(average(ancestry.filter(female).map(age)));
// → 54.56

/*
	Instead of tangling the logic into a big loop, it is neatly composed into the concepts we are interested in—determining sex, computing age, and averaging numbers. We can apply these one by one to get the result we are looking for.

	This is fabulous for writing clear code. Unfortunately, this clarity comes at a cost.

The cost
	In the happy land of elegant code and pretty rainbows, there lives a spoil-sport monster called inefficiency.

	A program that processes an array is most elegantly expressed as a sequence of cleanly separated steps that each do something with the array and produce a new array. But building up all those intermediate arrays is somewhat expensive.

	It is helpful to roughly keep track of how often a piece of your program is going to run. If you have a loop inside a loop (either directly or through the outer loop calling a function that ends up performing the inner loop), the code inside the inner loop will end up running N×M times, where N is the number of times the outer loop repeats and M is the number of times the inner loop repeats within each iteration of the outer loop. If that inner loop contains another loop that makes P rounds, its body will run M×N×P times, and so on. This can add up to large numbers, and when a program is slow, the problem can often be traced to only a small part of the code, which sits inside an inner loop.

Great-great-great-great-...
2015-11-04 09:53:15 Budapest Time: to be continued from here...
*/