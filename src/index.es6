import SorobanGenerator from './SorobanGenerator';

/* const config = {
    debug: true,
    digit: 3,
    examples: 1,
    actions_length: 10,
    topic_number: 8,
    exceptions: [
        [1, 4],
        [2, 3], [2, 4],
        [3, 2], [3, 3], [3, 4],
        [4, 1], [4, 2], [4, 3], [4, 4],
        [5, -1], [5, -2], [5, -3], [5, -4],
        [6, -2], [6, -3], [6, -4],
        [7, -3], [7, -4],
        [8, -4],
    ]
}

const s = new SorobanGenerator(config);

s.generateSimpleExamples(); 
s.getArray()

// s.getString()
// s.getTest() */

module.exports = SorobanGenerator;
