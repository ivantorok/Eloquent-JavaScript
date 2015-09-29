/* http://eloquentjavascript.net/04_data.html
Deep comparison

The == operator compares objects by identity. But sometimes, you would prefer to compare the values of their actual properties.

Write a function, deepEqual, that takes two values and returns true only if they are the same value or are objects with the same properties whose values are also equal when compared with a recursive call to deepEqual.

To find out whether to compare two things by identity (use the === operator for that) or by looking at their properties, you can use the typeof operator. If it produces "object" for both values, you should do a deep comparison. But you have to take one silly exception into account: by a historical accident, typeof null also produces "object".
*/

// Your code here.
function deepEqual (objA, objB) {
    for(var elementInObject in objA){
        //if (elementInObject == ) {} else{};
        console.log(elementInObject);
        console.log(objA[elementInObject]);
    }
}
​
​
function deepEqualB (objA, objB) {
    if (typeof objA == "object" && objA == null) {} else{return false};
    //if (objA === objB) {return true} else{return false};
}
​var obj = {here: {is: "an"}, object: 2};
/*console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false*/
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true


/*
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