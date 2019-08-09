import { ArrayRandom, Range, ArraySum } from './helpers'

class Simple {
    constructor (config) {
        this.actions_length = config.actions_length + 1;
        this.topic_number = config.topic_number;
        this.digit = config.digit || 1;            
        this.exceptions = config.exceptions;
        this.rangexy = (start, end) => Array.from({ length: (end + 1 - start) }, (v, k) => k + start);
        this.allowNumbers = this.rangexy(0,this.topic_number);
    }

    /**
     * Method generates number
     */
    __generate_number () {
        let minNumber = Math.pow(10, this.digit - 1)
        let maxNumber = this.__maxNumber()
        let array = []

        array = array.concat(this.rangexy(minNumber,maxNumber));
        array = array.concat(this.rangexy(-maxNumber, -minNumber));

        let newArrat = array.filter((item) => {
            return this.__exceptionNumbersOfNumber(item);
        })

        return ArrayRandom(newArrat);
    }

    __exceptionNumbersOfNumber (number) {
        let str = ''+(Math.abs(number));
        let len = str.length;
        let state = true;
        for (let i = 0; i < len; i++) {
            let num = parseInt(str[i])
            if (this.allowNumbers.indexOf(num) === -1) {
                state = false;
                break;
            }
        }
        return state;
    }

    __maxNumber () {
        let num = 1;
        for (let i = 1; i < this.digit; i++) {
            num += Math.pow(10, this.digit - i);
        }
        return this.topic_number * num;
    }


    /**
     * Method generates number with given exception
     * @param previous_number 
     */
    __generate_with_given_exception (previous_number) {
        let repeat_flag = true;
        let previous_number_string = ''+(Math.abs(previous_number));
        let operator_first;
        let operator_third;
        let operator_third_revert;
        let new_number;
                
        while (repeat_flag) {
            repeat_flag = false;
            new_number = this.__generate_number();
            let new_number_string = ''+(Math.abs(new_number));

            if (previous_number === 0) break;
            
            operator_first = previous_number > 0 ? '' : '-';
            operator_third = new_number > 0 ? '+' : '-';
            operator_third_revert = new_number > 0 ? '-' : '+';
            for(let i = 0; i < this.digit; i++) {
                let action = operator_first + previous_number_string[i] + operator_third + new_number_string[i];
                let action_revert = operator_first + previous_number_string[i] + operator_third_revert + new_number_string[i];
                
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
    __generate_number_with_given_intermediate_sum (sum, previous_number) {
        let new_number;
        let intermediate_sum_limit = this.__maxNumber();
        let min_sum_limit = Math.pow(10, this.digit - 1)
        let topic_numbers_sum_limit = false
        if (this.digit === 1) {
            if (this.topic_number <= 4 && this.digit === 1) {
                intermediate_sum_limit = this.topic_number;
            }
            else {
                intermediate_sum_limit = 9;
            }
        }
        while (true) {
            if (this.exceptions || null) {
                new_number = this.__generate_with_given_exception(previous_number);
            }
            else {
                new_number = this.__generate_number();
            }
            
            let intermediate_sum = parseInt(sum) + parseInt(new_number);

            if (this.topic_number <= 4) {
                topic_numbers_sum_limit = !this.__exceptionNumbersOfNumber(intermediate_sum);
            }
            
            if (intermediate_sum >= min_sum_limit && intermediate_sum <= intermediate_sum_limit && !topic_numbers_sum_limit) {
                break;
            }
        }
            
        return new_number
    }

    /**
     * Method generates list of numbers
     */
    generate_numbers () {
        let list_of_numbers
        while (true) {
            list_of_numbers = Array.from({ length: this.actions_length }, () => 0);
            for (let task_index in list_of_numbers) {
                let previous_number = task_index > 0 ? list_of_numbers[task_index - 1] : 0;
                let new_number = this.__generate_number_with_given_intermediate_sum(ArraySum(list_of_numbers), previous_number);
                if (new_number !== 0) {
                    list_of_numbers[task_index] = new_number;
                } else {
                    list_of_numbers[task_index] = previous_number;
                }
            }
                
            let sum = ArraySum(list_of_numbers);
            if (sum > 0 && sum <= this.__maxNumber()) {
                break;
            }
        }
        return list_of_numbers;
    }
}

export default Simple
