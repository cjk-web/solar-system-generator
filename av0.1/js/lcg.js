// https://en.wikipedia.org/wiki/Linear_congruential_generator
// values for lcg parameters taken from wiki page
const lcgParameters = [
    { modulus: 4294967296, multiplier: 1664525,     increment: 1013904223 },
    { modulus: 4294967296, multiplier: 22695477,    increment: 1 },
    { modulus: 2147483648, multiplier: 1103515245,  increment: 12345 },
    { modulus: 4294967296, multiplier: 134775813,   increment: 1 },
    { modulus: 2147483648, multiplier: 65539,       increment: 0 }
];


// pass any number value as seed for generator
// pass index to array of parameters
// generator formula: seed = (a * seed + c) % m;
function lcg(seed, parameterIdx) {
    // grab parameters from array or fallback to default if no index was passed 
    var param = parameterIdx ? lcgParameters[parameterIdx] : lcgParameters[0];

    // assign parameters
    this.m = param.modulus;
    this.a = param.multiplier;
    this.c = param.increment;
    // assign seed value or fallback to default
    this.state = seed ? seed : 1;
}
// return a random int from lcg
lcg.prototype.getInt = function() {
    this.state = (this.a * this.state + this.c) % this.m;
    return this.state;
}

// return an int within specified values
lcg.prototype.getIntInRange = function(min, max) {
    return (this.getInt() % (max - min)) + min;
}

// Usage
// get random values:
// create a new generator as variable, optionally define seed and parameters
// var lcg = new lcg(random_seed_value, indexWithinRangeOfArray);
// to obtain a random integer: 
// lcg.getInt() 