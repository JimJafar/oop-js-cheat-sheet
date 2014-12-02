/**
 * Created by jim on 28/11/14.
 */

// **********************************************************************************
// * Object literal
// * The simplest way of grouping properties and methods
// **********************************************************************************
var ObjectLiteral = {
    property: 42,
    method: function() {
        return this.property;
    }
};

console.log(ObjectLiteral.property); // 42
console.log(ObjectLiteral.method()); // 42


// **********************************************************************************
// * Pseudo class with constructor and private members
// * Useful if you need more than one similar objects that share some functionality
// **********************************************************************************
var PseudoClass = function(arg) {
    // This is the constructor

    // Private members:
    var privateProperty = 42;

    var privateMethod = function() {
        return 'private';
    };

    // instance variables - copied by each instance
    this.instanceVariable = arg;

    this.getPrivateProperty = function() {
        return privateProperty;
    };

    this.callPrivateMethod = function() {
        return privateMethod();
    };
};

// The prototype - shared by all instances (NOT copied)
PseudoClass.prototype.instanceVarToString = function() {
    return 'my instanceVariable is ' + this.instanceVariable;
};

// Make some instances
var instanceOne = new PseudoClass('A');
var instanceTwo = new PseudoClass('B');

console.log(instanceOne.privateProperty); // undefined
console.log(instanceTwo.privateProperty); // undefined

console.log(instanceOne.getPrivateProperty()); // 42
console.log(instanceTwo.getPrivateProperty()); // 42

console.log(typeof instanceOne.privateMethod); // undefined
console.log(typeof instanceTwo.privateMethod); // undefined

console.log(instanceOne.callPrivateMethod()); // private
console.log(instanceTwo.callPrivateMethod()); // private

console.log(instanceOne.instanceVariable); // A
console.log(instanceTwo.instanceVariable); // B

console.log(instanceOne.instanceVarToString()); // my instanceVariable is A
console.log(instanceTwo.instanceVarToString()); // my instanceVariable is B


// **********************************************************************************
// * Immediately Invoked Function Expression (IIFE)
// * Useful for wrapping code so you don't pollute the global scope
// **********************************************************************************
(function() {
    var wrappedVar = 42; // this will not be visible outside the function's scope

    // do something useful here

})(); // <-- the () causes the function to be invoked as soon as it is created

console.log(wrappedVar); // undefined


// **********************************************************************************
// * Closure - a function or object that is returned from an outer function
// * Useful if you need to maintain state
// **********************************************************************************
function Factory(arg) {

    // The returned object or function (closure) will retain access to this function's scope

    // Private (closed) members:
    var privateProperty = arg;

    var privateMethod = function() {
        return 'private';
    };

    // The closure
    return {
        publicProperty: 42,

        getprivateProperty: function() {
            return privateProperty;
        },

        callPrivateMethod: function() {
            return privateMethod();
        },

        setState: function(to) {
            privateProperty = to;
        }
    };
};

var closure = Factory('on');

console.log(typeof privateProperty); // undefined
console.log(typeof privateMethod); // undefined

console.log(closure.privateProperty); // undefined
console.log(typeof closure.privateMethod); // undefined

console.log(closure.publicProperty); // 42

console.log(closure.callPrivateMethod()); // private

console.log(closure.getprivateProperty()); // on
closure.setState('off');
console.log(closure.getprivateProperty()); // off


// **********************************************************************************
// * Module pattern (basically a closure wrapped in an IIFE)
// * Useful if you need a single object that supports private members and state
// **********************************************************************************
var Module = (function() {
    // Private members:
    var privateProperty = 42;

    var privateMethod = function() {
        return 'private';
    };

    // Public members
    return {
        publicProperty: 'pan galactic gargle blaster',

        getprivateProperty: function() {
            return privateProperty;
        },

        callPrivateMethod: function() {
            return privateMethod();
        }
    };
})();

console.log(Module.privateProperty); // undefined
console.log(typeof Module.privateMethod); // undefined

console.log(Module.publicProperty); // pan galactic gargle blaster
console.log(Module.getprivateProperty()); // 42
console.log(Module.callPrivateMethod()); // private

