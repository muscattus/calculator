import {Calculator} from './calculator/main';

const calculator = new Calculator();

function evaluate() {
    console.log('click');
    // calculator.evaluate('1*3+6*3');
    // calculator.evaluate('1*3+6*3-4^2');
    calculator.evaluate('1 * 3 + 6 + 3 - 4 ^ 2');
    calculator.evaluate('11 * 3 - 5 ^ 2');
}

document.getElementById('eval').addEventListener('click', evaluate);