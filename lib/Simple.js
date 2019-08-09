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
            var operator = void 0;
            var new_number = void 0;

            while (repeat_flag) {
                repeat_flag = false;
                new_number = this.__generate_number();
                var new_number_string = '' + Math.abs(new_number);

                if (new_number > 0) {
                    operator = '+';
                } else {
                    operator = '-';
                }

                for (var key in this.exceptions) {
                    var ex_operator = void 0,
                        first_number = this.exceptions[key][0],
                        third_number = this.exceptions[key][1];

                    if (third_number < 0) {
                        ex_operator = '-';
                    } else {
                        ex_operator = '+';
                    }

                    for (var i = 0; i < this.digit; i++) {
                        var sub_previous_number = parseInt(previous_number_string[i]),
                            sub_new_number = parseInt(new_number_string[i]);
                        if (previous_number === 0 && first_number === sub_previous_number && third_number === sub_new_number && ex_operator === operator) {
                            repeat_flag = true;
                            // console.log('ex:', first_number, ex_operator, third_number, '||', previous_number_string, operator, new_number_string)
                            break;
                            // continue;
                        }
                    }
                }

                // console.log(previous_number, operator, new_number, repeat_flag)
            }

            return new_number;
        }

        /**
         * Method checks intermediate sum of two numbers
         * @param previous_number 
         */

    }, {
        key: '__generate_number_with_given_intermediate_sum',
        value: function __generate_number_with_given_intermediate_sum(previous_number) {
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
                if (this.exceptions !== undefined) {
                    new_number = this.__generate_with_given_exception(previous_number);
                } else {
                    new_number = this.__generate_number();
                }

                var intermediate_sum = parseInt(previous_number) + parseInt(new_number);

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
                    var new_number = this.__generate_number_with_given_intermediate_sum((0, _helpers.ArraySum)(list_of_numbers));
                    list_of_numbers[task_index] = new_number;
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