import {Calculator} from './calculator/main';

const calculator = new Calculator();

function evaluate() {
    console.log(calculator.evaluate('1 * 3 + 6 + 3 - 4 ^ 2'));
    console.log(calculator.evaluate('11 * 3 - 5 ^ 2'));
    console.log(calculator.evaluate('20 + 30 + 4 + 11'));
}

document.getElementById('eval').addEventListener('click', evaluate);