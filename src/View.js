import { CODES, EVENT_TYPES } from "./constants/constants";
import { operations } from "./calculator/operations";

export class View {

    constructor(model) {
        this.model = model;
        this.clear = document.querySelector('#clear');
        this.backspace = document.querySelector('#backspace');
        this.additionaOperations = document.querySelector('#additional-operations');
        this.equals = document.querySelector('#equals');
        this.input = document.querySelector('#input');
        this.output = document.querySelector('#output');
        this.addOperationsButtons();
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
        this.backspace.addEventListener('click', () => this.deleteLastChar());
        document.addEventListener('keyup', (event) => this.keyboardHandle(event));
    }
    
    addOperationsButtons() {
        const operationsButtons = new DocumentFragment();
        operations.forEach(operation => {
            if(operation.additional) {
                const button = document.createElement('div');
                button.classList.add('button', 'button-input');
                button.dataset.val = operation.operator;
                button.innerHTML = operation.symbol;
                operationsButtons.append(button);
            }
        })
        this.additionaOperations.append(operationsButtons);
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

    deleteLastChar() {
        this.input.value = this.input.value.slice(0,-1);
    }
}