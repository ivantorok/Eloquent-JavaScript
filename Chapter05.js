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

/*2015-12-15 10:26:36 Budapest Time: I do not understand the "/ 4" part at the end of the sample code here:
http://eloquentjavascript.net/05_higher_order.html
###############################################################################

Great-great-great-great-...

My grandfather, Philibert Haverbeke, is included in the data file. By starting with him, I can trace my lineage to find out whether the most ancient person in the data, Pauwels van Haverbeke, is my direct ancestor. And if he is, I would like to know how much DNA I theoretically share with him.

To be able to go from a parent’s name to the actual object that represents this person, we first build up an object that associates names with people.

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

console.log(byName["Philibert Haverbeke"]);
// → {name: "Philibert Haverbeke", …}
Now, the problem is not entirely as simple as following the father properties and counting how many we need to reach Pauwels. There are several cases in the family tree where people married their second cousins (tiny villages and all that). This causes the branches of the family tree to rejoin in a few places, which means I share more than 1/2G of my genes with this person, where G for the number of generations between Pauwels and me. This formula comes from the idea that each generation splits the gene pool in two.

A reasonable way to think about this problem is to look at it as being analogous to reduce, which condenses an array to a single value by repeatedly combining values, left to right. In this case, we also want to condense our data structure to a single value but in a way that follows family lines. The shape of the data is that of a family tree, rather than a flat list.

The way we want to reduce this shape is by computing a value for a given person by combining values from their ancestors. This can be done recursively: if we are interested in person A, we have to compute the values for A’s parents, which in turn requires us to compute the value for A’s grandparents, and so on. In principle, that’d require us to look at an infinite number of people, but since our data set is finite, we have to stop somewhere. We’ll allow a default value to be given to our reduction function, which will be used for people who are not in the data. In our case, that value is simply zero, on the assumption that people not in the list don’t share DNA with the ancestor we are looking at.

Given a person, a function to combine values from the two parents of a given person, and a default value, reduceAncestors condenses a value from a family tree.

function reduceAncestors(person, f, defaultValue) {
  function valueFor(person) {
    if (person == null)
      return defaultValue;
    else
      return f(person, valueFor(byName[person.mother]),
                       valueFor(byName[person.father]));
  }
  return valueFor(person);
}
The inner function (valueFor) handles a single person. Through the magic of recursion, it can simply call itself to handle the father and the mother of this person. The results, along with the person object itself, are passed to f, which returns the actual value for this person.

We can then use this to compute the amount of DNA my grandfather shared with Pauwels van Haverbeke and divide that by four.

SAMPLE CODE COMES HERE
###############################################################################
function sharedDNA(person, fromMother, fromFather) {
  if (person.name == "Pauwels van Haverbeke")
    return 1;
  else
    return (fromMother + fromFather) / 2;
}
var ph = byName["Philibert Haverbeke"];
console.log(reduceAncestors(ph, sharedDNA, 0) / 4);
// → 0.00049
###############################################################################
THE TEXT CONTIUES LIKE THIS:

The person with the name Pauwels van Haverbeke obviously shared 100 percent of his DNA with Pauwels van Haverbeke (there are no people who share names in the data set), so the function returns 1 for him. All other people share the average of the amounts that their parents share.

So, statistically speaking, I share about 0.05 percent of my DNA with this 16th-century person.

MY QUESTION IS THIS: WHY DO WE NEED THE "/ 4" AT THE END OF LINE 8?
IF I CHANGE THE ph VALUE TO 
byName["Pauwels van Haverbeke"]
THEN I GET THE RESULT 0.25
AS FAR AS I UNDERSTAND I SHOULD GET 1 HERE, AS "Pauwels van Haverbeke" SHARES 100% OF HIS OWN DNA.

Could you please advise?

###############################################################################
*/