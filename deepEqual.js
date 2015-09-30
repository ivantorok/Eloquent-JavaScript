/* http://eloquentjavascript.net/04_data.html
Deep comparison

The == operator compares objects by identity. But sometimes, you would prefer to compare the values of their actual properties.

Write a function, deepEqual, that takes two values and returns true only if they are the same value or are objects with the same properties whose values are also equal when compared with a recursive call to deepEqual.

To find out whether to compare two things by identity (use the === operator for that) or by looking at their properties, you can use the typeof operator. If it produces "object" for both values, you should do a deep comparison. But you have to take one silly exception into account: by a historical accident, typeof null also produces "object".
*/

// Your code here.
function deepEqual (objA, objB) {
    if (typeof objA == "object" && objA != null && typeof objB == "object" && objB != null) {
        function lengthOfObject (objX){
    		var length = 0;
    		for (var i in objX) {
    			length++;
    		};
            return length;
    	}
    	if (lengthOfObject(objA) != lengthOfObject(objB)) {
            return false;
        } else{
            for(var i in objA) {
                return deepEqual (objA[i], objB[i]);
            };
        };
    }else{
        return (objA == objB);
    };
}




var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true

/*
2015-09-30 14:08:23 Budapest Time: so much struggle because of not reading the first hint attentively enough. At the beginning I only checked if objA but not objB for being an object and not being null. What a waste of time...

2015-09-30 12:15:30 Budapest Time: so this time I am reading the hint line by line:

Your test for whether you are dealing with a real object will look something like typeof x == "object" && x != null. Be careful to compare properties only when both arguments are objects. In all other cases you can just immediately return the result of applying ===.

// this part should be achieved by this code:
function deepEqual (objA, objB) {
    if (typeof objA == "object" && objA != null) {} else{return (objA === objB)};
}

This returns:
true
false
false


Use a for/in loop to go over the properties. You need to test whether both objects have the same set of property names and whether those properties have identical values. The first test can be done by counting the properties in both objects and returning false if the numbers of properties are different. If they’re the same, then go over the properties of one object, and for each of them, verify that the other object also has the property. The values of the properties are compared by a recursive call to deepEqual.

Returning the correct value from the function is best done by immediately returning false when a mismatch is noticed and returning true at the end of the function.




2015-09-29 09:27:22 Budapest Time: focusing on the hint provided: use for / in.
Trying to understand what it does and how it does.
currently for the third call it returns:
here
{is: "an"}
object
2
undefined

2015-09-28 09:33:21 Budapest Time: As of now it returns 
true
false
false <== this is problematic
*/