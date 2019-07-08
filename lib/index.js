'use strict';

var _SorobanGenerator = require('./SorobanGenerator');

var _SorobanGenerator2 = _interopRequireDefault(_SorobanGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
    debug: true,
    digit: 4,
    examples: 99,
    actions_length: 99,
    topic_number: 5,
    exceptions: [[[8, -4], [7, -4], [6, -4], [5, -4], [1, 4], [2, 4], [3, 4], [4, 4]], [[7, -3], [6, -3], [5, -3], [2, 3], [3, 3], [4, 3]], [[6, -2], [5, -2], [3, 2], [4, 2]], [[5, -1], [4, 1]]]
};

var s = new _SorobanGenerator2.default(config);

s.generateSimpleExamples();
s.getArray();

// s.getString()
// s.getTest()

module.exports = _SorobanGenerator2.default;