import {Calculator} from './calculator/Calculator';

const calculator = new Calculator();

function evaluate() {
    console.log('22*3=', calculator.evaluate('22*3'));
    console.log('2*3+6=', calculator.evaluate('2*3+6'));
    console.log('2*(3+6)=', calculator.evaluate('2*(3+6)'));
    console.log('(3+6)=', calculator.evaluate('(3+6)'));
    console.log('(3+6)+1=', calculator.evaluate('(3+6)+1'));
    console.log('3+4*(2+6)=', calculator.evaluate('3+4*(2+6)'));
    console.log('11*5-3^2=', calculator.evaluate('11*5-3^2'));
    console.log('11*(5-3)^2=', calculator.evaluate('11*(5-3)^2'));
    console.log('1*3+6+3-4^2=', calculator.evaluate('1*3+6+3-4^2'));
}

document.getElementById('eval').addEventListener('click', evaluate);