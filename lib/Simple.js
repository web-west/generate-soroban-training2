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

        this.actions_length = config.actions_length;
        this.topic_number = config.topic_number;
        if (this.topic_number <= 4) {
            this.intermediate_sum_limit = this.topic_number;
        } else {
            this.intermediate_sum_limit = 9;
        }

        this.exceptions = config.exceptions;
    }

    /**
     * Method generates number
     */


    _createClass(Simple, [{
        key: '__generate_number',
        value: function __generate_number() {
            var rangexy = function rangexy(start, end) {
                return Array.from({ length: end + 1 - start }, function (v, k) {
                    return k + start;
                });
            };

            return (0, _helpers.ArrayRandom)(rangexy(-this.topic_number, this.topic_number).filter(function (item) {
                return item !== 0;
            }));
        }

        /**
         * Method generates number with given exception
         * @param previous_number 
         */

    }, {
        key: '__generate_with_given_exception',
        value: function __generate_with_given_exception(previous_number) {
            var repeat_flag = true;
            var new_number = void 0;
            while (repeat_flag) {
                new_number = this.__generate_number();
                repeat_flag = false;

                for (var exception_block in this.exceptions) {
                    for (var key in this.exceptions[exception_block]) {
                        if (previous_number === this.exceptions[exception_block][key][0] && new_number === this.exceptions[exception_block][key][1]) {
                            repeat_flag = true;
                            continue;
                        }
                    }
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
        value: function __generate_number_with_given_intermediate_sum(previous_number) {
            var new_number = void 0;
            while (true) {
                if (this.exceptions !== undefined) {
                    new_number = this.__generate_with_given_exception(previous_number);
                } else {
                    new_number = this.__generate_number();
                }

                var intermediate_sum = parseInt(previous_number) + parseInt(new_number);

                if (intermediate_sum >= 0 && intermediate_sum <= this.intermediate_sum_limit) {
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
                if (sum > 0 && sum <= this.topic_number) {
                    break;
                }
            }
            return list_of_numbers;
        }
    }]);

    return Simple;
}();

exports.default = Simple;