'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Simple = require('./Simple');

var _Simple2 = _interopRequireDefault(_Simple);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(config) {
        _classCallCheck(this, _class);

        this.config = config;
        this.examples = [];
    }

    _createClass(_class, [{
        key: 'log',
        value: function log(data) {
            if (this.config.debug || null) {
                console.log(data);
            }
        }
    }, {
        key: 'generateSimpleExamples',
        value: function generateSimpleExamples() {
            var start = new Date().getTime();
            var simple = new _Simple2.default(this.config);
            var exmples = Array.from({ length: this.config.examples || 1 }, function () {
                return 0;
            });
            for (var key in exmples) {
                exmples[key] = simple.generate_numbers();
            }

            this.example = exmples;
            var end = new Date().getTime();
            this.log('Simple: ' + this.config.topic_number + ', Time complile: ' + (end - start) / 1000 + 's');
            // this.log(this.getArray());
            this.log(this.getString());
        }
    }, {
        key: 'getArray',
        value: function getArray() {
            var exmples = Array.from({ length: this.config.examples || 1 }, function () {
                return {
                    example: [],
                    sum: 0
                };
            });
            for (var key in exmples) {
                exmples[key].example = this.example[key];
                exmples[key].sum = (0, _helpers.ArraySum)(this.example[key]);
            }
            return exmples;
        }
    }, {
        key: 'getString',
        value: function getString() {
            var exmples = Array.from({ length: this.config.examples || 1 }, function () {
                return 0;
            });
            for (var key in this.example) {
                var actions = '';
                for (var ex in this.example[key]) {
                    actions += this.example[key][ex] > 0 ? '+' + this.example[key][ex] : this.example[key][ex];
                }
                exmples[key] = actions + '=' + (0, _helpers.ArraySum)(this.example[key]);
            }
            return exmples;
        }
    }]);

    return _class;
}();

exports.default = _class;