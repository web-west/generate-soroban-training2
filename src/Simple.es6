import { ArrayRandom, Range, ArraySum } from './helpers'

class Simple {
    constructor (config) {
        this.actions_length = config.actions_length;
        this.topic_number = config.topic_number;
        if (this.topic_number <= 4) {
            this.intermediate_sum_limit = this.topic_number;
        }
        else {
            this.intermediate_sum_limit = 9;
        }
            
        this.exceptions = config.exceptions;
    }

    /**
     * Method generates number
     */
    __generate_number () {
        const rangexy = (start, end) => Array.from({ length: (end + 1 - start) }, (v, k) => k + start);
        
        return ArrayRandom(rangexy(-(this.topic_number),this.topic_number).filter(item => item !== 0));
    }


    /**
     * Method generates number with given exception
     * @param previous_number 
     */
    __generate_with_given_exception (previous_number) {
        let repeat_flag = true;
        let new_number;
        while (repeat_flag) {
            new_number = this.__generate_number();
            repeat_flag = false;

            for (let exception_block in this.exceptions) {
                for (let key in this.exceptions[exception_block]) {
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
    __generate_number_with_given_intermediate_sum (previous_number) {
        let new_number;
        while (true) {
            if (this.exceptions !== undefined) {
                new_number = this.__generate_with_given_exception(previous_number);
            }
            else {
                new_number = this.__generate_number();
            }
            
            let intermediate_sum = parseInt(previous_number) + parseInt(new_number);
            
            if (intermediate_sum >= 0 && intermediate_sum <= this.intermediate_sum_limit) {
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
            if (sum > 0 && sum <= this.topic_number) {
                break;
            }
        }
        return list_of_numbers;
    }
}

export default Simple
