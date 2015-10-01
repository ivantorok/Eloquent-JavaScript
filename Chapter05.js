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