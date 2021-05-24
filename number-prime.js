#! /usr/bin/env node

function numberator(from, to) {
    numbers = [];
    for (x = from; x <= to; x++) {
        numbers.push(x);
    }
    return numbers;
}

function primeNumbers(array) {
    for (i = 0; i < array.length; i++) {
        for (j = 2; j < array[i]; j++) {
            if (array[i] % j == 0) {
                array.splice(i, 1);
            }
        }
    }
    return array;
}

console.log(primeNumbers(numberator(1,100)));
