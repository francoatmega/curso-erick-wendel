// Strict Mode was introduced in ECMAScript 5 a.k.a ES5, publish in 2009.
// In ES5 specification the intent why Strict Mode was created was:
// "...They might do so in the interests of security, to avoid
// what they consider to be error-prone features, to get enhanced error checking, or for other reasons of their
// choosing."

// So, we can resume in 3 statements:

// * Enhance security
// * Enhance error checking
// * Other reason they like

// First example we'll see is enhanced security. I know that eval function is danger and discourage, but in some very specific situations they can be used, and, for that situations 
// using strict mode will be very helpful, look the code below:

// (()=> {
//     eval("var x = 2;");
//     console.log(x);
// })()

// Without use strict, the code can create variables out of the eval scope, and... Use your imagination to exploit something with this behavior.
// A more secure code is:

// (()=> {
//     "use strict";
//     eval ("var x = 2;");
//     console.log(x);
// })()

// When a reference to variable was used external to eval scope and RefereceError will be throw

const { throws } = require('assert')

const secureEval = () => { 
    "use strict"; 
    eval ("var x = 2;"); 
    console.log(x); 
}

throws(() => secureEval(), ReferenceError)

//Second example is enhancing error checking. When use the above code without "use strict" expression, the code will create a new global variable

//  x = 3.14; 

//  A more secure way is to avoid usage of variable without declarations, so the above code will throw an error and the x will never be created globally

// 'use strict';
// x = 3.14;

const useVariableWithoutDeclaration = () => {
    "use strict";
    eval ("var x = 2;");
    console.log(x);
}

throws(() => useVariableWithoutDeclaration(), ReferenceError)

// For explanation’s sake, let's assume that the third statement "Other reason they like" is that programmers don't want to allow usage of octal representations in code they are writing.
// So, strict mode will help to archive this goal.

// Allow octal representation
// let x = 010;

// Not allow octal representation and will throw a SyntaxError exception
// "use strict";
// let x = 010; 

// Note that "strict mode" is not a keyword, it's a string literal statement interpreted by javascript engines, and it can be used in two scopes, globally or inside a function.

// For a more detailed view of strict mode and all the things it support we can check in ES5 specification doc (https://www.ecma-international.org/wp-content/uploads/ECMA-262_5th_edition_december_2009.pdf)