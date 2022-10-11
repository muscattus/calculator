import { CODES, EVENT_TYPES } from "../constants/constants";

export class View {

    constructor(model) {
        this.model = model;
        this.clear = document.querySelector('#clear');
        this.equals = document.querySelector('#equals');
        this.input = document.querySelector('#input');
        this.output = document.querySelector('#output');
        this.inputButtons = document.querySelectorAll('.button-input');
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
        this.model.setState(EVENT_TYPES.calculate, equation);
    } 
    
    keyboardHandle(event) {
        if(event.keyCode.toString() === CODES.return) {
            this.createEquation();
        }
        if(event.keyCode === CODES.escape) {
            this.clearInput();
        }
    }

    displayInput(event) {
        const target = event.currentTarget;
        const newInput = target.dataset.val;
        this.input.value += newInput;
        this.input.focus();
    }

    displayResult(result) {
        this.output.textContent = this.input.value;
        this.input.value = result;
        this.input.focus();
    }
    
    update(result) {
        this.displayResult(result);
    }
    
    clearInput() {
        this.input.value = '';
        this.output.textContent = '';
    }
}