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
        let new_number = this.__generate_number();
        let new_number_string = ''+(Math.abs(new_number));
        let previous_number_string = ''+(Math.abs(previous_number));
        let operator;
        
        // console.log(previous_number)
        
        while (repeat_flag) {
            repeat_flag = false;

            if (new_number > 0) {
                operator = '+'
            } else {
                operator = '-'
            }

            for (let key in this.exceptions) {
                let ex_operator,
                    first_number = this.exceptions[key][0],
                    third_number = this.exceptions[key][1];

                if (third_number < 0) {
                    ex_operator = '-';
                } else {
                    ex_operator = '+';
                }

                for(let i = 0; i < this.digit; i++) {
                    let sub_previous_number = parseInt(previous_number_string[i]),
                        sub_new_number = parseInt(new_number_string[i]);
                    if (first_number === sub_previous_number && third_number === sub_new_number && ex_operator === operator) {
                        repeat_flag = true;
                        // console.log('ex:', first_number, ex_operator, third_number, '||', previous_number_string, operator, new_number_string)
                        break;
                        // continue;
                    }
                }
            }

            new_number = this.__generate_number();
            new_number_string = ''+(Math.abs(new_number))
        }
        
        return new_number;
    }

    /**
     * Method checks intermediate sum of two numbers
     * @param previous_number 
     */
    __generate_number_with_given_intermediate_sum (previous_number) {
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
            if (this.exceptions !== undefined) {
                new_number = this.__generate_with_given_exception(previous_number);
            }
            else {
                new_number = this.__generate_number();
            }
            
            let intermediate_sum = parseInt(previous_number) + parseInt(new_number);

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
                let new_number = this.__generate_number_with_given_intermediate_sum(ArraySum(list_of_numbers));
                list_of_numbers[task_index] = new_number;
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
