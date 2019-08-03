## Генератор примеров по методологии "соробан"

![](https://travis-ci.org/web-west/generate-soroban-training2.svg?branch=master) ![](https://img.shields.io/github/stars/web-west/generate-soroban-training2.svg) ![](https://img.shields.io/github/forks/web-west/generate-soroban-training2.svg) ![](https://img.shields.io/github/tag/web-west/generate-soroban-training2.svg) ![](https://img.shields.io/github/issues/web-west/generate-soroban-training2.svg)

### Установка

`npm i -S generate-soroban-training2`

### API

#### Методы

##### Получение массива примеров
```javascript

...

let examples = s.getArray();
console.log(examples);
/*
[
	{ example: [ 422, 201 ], sum: 623 },
	{ example: [ 135, -201 ], sum: -66 },
 ]
*/
```

##### Получение строк примеров
```javascript

...

let examples = s.getString();
console.log(examples);
/*
[ 
	'332-430+214-204=-88',
	'111-532+111+540=230',
]
*/

...

```

#### Пример

```javascript
import SorobanGenerator from 'generate-soroban-training2';

const config = {
    debug: true, // дебагинг
    digit: 1, // разрядность числа
    examples: 10, // количество генерируемых примеров
    actions_length: 99, // количество математических операций
    topic_number: 4,
    exceptions: [
        [1, 4],
        [2, 3], [2, 4],
        [3, 2], [3, 3], [3, 4],
        [4, 1], [4, 2], [4, 3], [4, 4],
        [5, -1], [5, -2], [5, -3], [5, -4],
        [6, -2], [6, -3], [6, -4],
        [7, -3], [7, -4],
        [8, -4],
    ] // исключает вхождение определенных операций
}

const s = new SorobanGenerator(config);

s.generateSimpleExamples(); 
```