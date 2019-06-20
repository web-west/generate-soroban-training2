"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ArrayRandom = ArrayRandom;
exports.RangeZeroArray = RangeZeroArray;
exports.ArraySum = ArraySum;
function ArrayRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function RangeZeroArray(number) {
    return Array(number).fill().map(function (_, i) {
        return 0;
    });
}

function ArraySum(array) {
    var reducer = function reducer(accumulator, currentValue) {
        return parseInt(accumulator) + parseInt(currentValue);
    };
    return parseInt(array.reduce(reducer));
}