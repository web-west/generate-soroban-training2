import Simple from './Simple'
import { ArraySum } from './helpers';

export default class {
    constructor (config) {
        this.config = config;
        this.examples = [];
    }

    log (data) {
        if (this.config.debug || null) {
            console.log(data)
        }
    }

    generateSimpleExamples () {
        const start = new Date().getTime();
        let simple = new Simple(this.config);
        let exmples = Array.from({ length: this.config.examples || 1 }, () => 0);
        for (let key in exmples) {
            exmples[key] = simple.generate_numbers();
        }

        this.example = exmples;
        const end = new Date().getTime();
        this.log(`Simple: ${this.config.topic_number}, Time complile: ${(end - start)/1000}s`)
        // this.log(this.getArray());
        this.log(this.getString());
    }

    getArray () {
        let exmples = Array.from({ length: this.config.examples || 1 }, () => {
            return {
                example: [],
                sum: 0
            }
        });
        for (let key in exmples) {
            exmples[key].example = this.example[key];
            exmples[key].sum = ArraySum(this.example[key]);
        }
        return exmples;
    }

    getString () {
        let exmples = Array.from({ length: this.config.examples || 1 }, () => 0);
        for (let key in this.example) {
            let actions = ''
            for (let ex in this.example[key]) {
                actions += this.example[key][ex] > 0 ? `+${ this.example[key][ex] }` : this.example[key][ex]
            }
            exmples[key] = `${ actions }=${ ArraySum(this.example[key]) }`;
        }
        return exmples;
    }
}