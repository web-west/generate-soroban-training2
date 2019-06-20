export function ArrayRandom(array) {
    return array[Math.floor(Math.random() * array.length)]
}

export function RangeZeroArray(number) {
    return Array(number).fill().map((_, i) => 0);
}

export function ArraySum(array) {
    const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
    return parseInt(array.reduce(reducer));
}
