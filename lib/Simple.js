'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Simple = function () {
    function Simple(config) {
        _classCallCheck(this, Simple);

        this.actions_length = config.actions_length + 1;
        this.topic_number = config.topic_number;
        this.digit = config.digit || 1;
        this.exceptions = config.exceptions;
        this.rangexy = function (start, end) {
            return Array.from({ length: end + 1 - start }, function (v, k) {
                return k + start;
            });
        };
        this.allowNumbers = this.rangexy(0, this.topic_number);
    }

    /**
     * Method generates number
     */


    _createClass(Simple, [{
        key: '__generate_number',
        value: function __generate_number() {
            var _this = this;

            var minNumber = Math.pow(10, this.digit - 1);
            var maxNumber = this.__maxNumber();
            var array = [];

            array = array.concat(this.rangexy(minNumber, maxNumber));
            array = array.concat(this.rangexy(-maxNumber, -minNumber));

            var newArrat = array.filter(function (item) {
                return _this.__exceptionNumbersOfNumber(item);
            });

            return (0, _helpers.ArrayRandom)(newArrat);
        }
    }, {
        key: '__exceptionNumbersOfNumber',
        value: function __exceptionNumbersOfNumber(number) {
            var str = '' + Math.abs(number);
            var len = str.length;
            var state = true;
            for (var i = 0; i < len; i++) {
                var num = parseInt(str[i]);
                if (this.allowNumbers.indexOf(num) === -1) {
                    state = false;
                    break;
                }
            }
            return state;
        }
    }, {
        key: '__maxNumber',
        value: function __maxNumber() {
            var num = 1;
            for (var i = 1; i < this.digit; i++) {
                num += Math.pow(10, this.digit - i);
            }
            return this.topic_number * num;
        }

        /**
         * Method generates number with given exception
         * @param previous_number 
         */

    }, {
        key: '__generate_with_given_exception',
        value: function __generate_with_given_exception(previous_number) {
            var repeat_flag = true;
            var previous_number_string = '' + Math.abs(previous_number);
            var operator_first = void 0;
            var operator_third = void 0;
            var operator_third_revert = void 0;
            var new_number = void 0;

            while (repeat_flag) {
                repeat_flag = false;
                new_number = this.__generate_number();
                var new_number_string = '' + Math.abs(new_number);

                if (previous_number === 0) break;

                operator_first = previous_number > 0 ? '' : '-';
                operator_third = new_number > 0 ? '+' : '-';
                operator_third_revert = new_number > 0 ? '-' : '+';
                for (var i = 0; i < this.digit; i++) {
                    var action = operator_first + previous_number_string[i] + operator_third + new_number_string[i];
                    var action_revert = operator_first + previous_number_string[i] + operator_third_revert + new_number_string[i];

                    if (this.exceptions.includes(action)) {
                        repeat_flag = true;
                    } else if (this.exceptions.includes(action_revert)) {
                        repeat_flag = true;
                    } else {
                        new_number = -new_number;
                    }
                    if (repeat_flag) break;
                    // console.log(previous_number, new_number, action, action_revert);
                }
            }

            return new_number;
        }

        /**
         * Method checks intermediate sum of two numbers
         * @param previous_number 
         */

    }, {
        key: '__generate_number_with_given_intermediate_sum',
        value: function __generate_number_with_given_intermediate_sum(sum, previous_number) {
            var new_number = void 0;
            var intermediate_sum_limit = this.__maxNumber();
            var min_sum_limit = Math.pow(10, this.digit - 1);
            var topic_numbers_sum_limit = false;
            if (this.digit === 1) {
                if (this.topic_number <= 4 && this.digit === 1) {
                    intermediate_sum_limit = this.topic_number;
                } else {
                    intermediate_sum_limit = 9;
                }
            }
            while (true) {
                if (this.exceptions || null) {
                    new_number = this.__generate_with_given_exception(previous_number);
                } else {
                    new_number = this.__generate_number();
                }

                var intermediate_sum = parseInt(sum) + parseInt(new_number);

                if (this.topic_number <= 4) {
                    topic_numbers_sum_limit = !this.__exceptionNumbersOfNumber(intermediate_sum);
                }

                if (intermediate_sum >= min_sum_limit && intermediate_sum <= intermediate_sum_limit && !topic_numbers_sum_limit) {
                    break;
                }
            }

            return new_number;
        }

        /**
         * Method generates list of numbers
         */

    }, {
        key: 'generate_numbers',
        value: function generate_numbers() {
            var list_of_numbers = void 0;
            while (true) {
                list_of_numbers = Array.from({ length: this.actions_length }, function () {
                    return 0;
                });
                for (var task_index in list_of_numbers) {
                    var previous_number = task_index > 0 ? list_of_numbers[task_index - 1] : 0;
                    var new_number = this.__generate_number_with_given_intermediate_sum((0, _helpers.ArraySum)(list_of_numbers), previous_number);
                    if (new_number !== 0) {
                        list_of_numbers[task_index] = new_number;
                    } else {
                        list_of_numbers[task_index] = previous_number;
                    }
                }

                var sum = (0, _helpers.ArraySum)(list_of_numbers);
                if (sum > 0 && sum <= this.__maxNumber()) {
                    break;
                }
            }
            return list_of_numbers;
        }
    }]);

    return Simple;
}();

exports.default = Simple;