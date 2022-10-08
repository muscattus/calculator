// import { throws } from 'assert';
import { Model } from './calculator/main';
import { CODES } from './constants/constants'

function initPage() {
    new CalculatorGui();
}


class CalculatorGui {

    constructor() {
        this.clear = document.querySelector('#clear');
        this.equals = document.querySelector('#equals');
        this.input = document.querySelector('#input');
        this.output = document.querySelector('#output');
        this.inputButtons = document.querySelectorAll('.button-input');
        this.model = new Model()
        this.model.subscribe(this);
        this.asignEventListeners();
        this.input.focus();
    }

    asignEventListeners(){
        this.equals.addEventListener('click', () => this.createEquation());
        this.inputButtons.forEach(button => button.addEventListener('click', (event) => {
            this.displayInput(event);
        }));
        this.clear.addEventListener('click', () => this.clearInput());
        document.addEventListener('keyup', (event) => this.keyboardHandle(event))
    }
    
    createEquation() {
        const equation = this.input.value;
        this.model.setEquation(equation);
    } 
    
    keyboardHandle(event) {
        if(event.keyCode.toString() === CODES.return) {
            this.createEquation();
        }
    }

    displayInput(event) {
        const target = event.currentTarget;
        const newInput = target.dataset.val;
        this.input.value += newInput;
    }
    
    update(result) {
        this.output.textContent = this.input.value;
        this.input.value = result;
    }
    
    clearInput() {
        this.input.value = '';
        this.output.textContent = '';
    }
}

window.onload = initPage;