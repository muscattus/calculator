import { CODES, EVENT_TYPES, ERROR_MESSAGES } from "./constants/constants";
import { Model } from './Model';
import { CalculatorApi } from '../api/CalculatorApi';
import { DefaultOperation, Operations } from "./constants/interfaces";
export class View {

  additionalOperations: HTMLElement | null;
  clear: HTMLElement | null;
  backspace: HTMLElement | null;
  equals: HTMLElement | null;
  input: HTMLInputElement | null;
  output: HTMLElement | null;
  keypad: HTMLElement | null;
  constructor(private model: Model) {
    this.model = model;
    this.additionalOperations = document.querySelector('#additional-operations');
    this.addOperationsButtons();
    this.clear = document.querySelector('#clear');
    this.backspace = document.querySelector('#backspace');
    this.equals = document.querySelector('#equals');
    this.input = document.querySelector('#input');
    this.output = document.querySelector('#output');
    this.keypad = document.getElementById('keypad');
    this.input!.focus();
    this.asignEventListeners();
  }

  asignEventListeners(){
    const keypad = document.getElementById('keypad');
    keypad?.addEventListener( 'click', (event) =>  this.displayInput(event));
    this.equals!.addEventListener('click', () => this.createEquation());
    this.clear!.addEventListener('click', () => this.clearInput());
    this.backspace!.addEventListener('click', () => this.deleteLastChar());
    document.addEventListener('keyup', (event) => this.keyboardHandle(event));
  }
  
  async addOperationsButtons() {
    const operations = await getOperations();
    const operationsButtons = new DocumentFragment();
    operations.forEach((operation: DefaultOperation) => {
      if(operation.additional) {
        const button = document.createElement('div');
        button.classList.add('button', 'button-input');
        button.dataset.val = operation.operator;
        button.innerHTML = operation.symbol;
        operationsButtons.append(button);
      }
    })
    this.additionalOperations!.append(operationsButtons);
  }
  
  
  createEquation() {
    const equation = this.input!.value;
    this.model.setState(EVENT_TYPES.calculate, equation);
  } 
  
  keyboardHandle(event: KeyboardEvent) {
    // if(event.keyCode.toString() === CODES.return) {
    if(event.key === 'Enter') {
      this.createEquation();
    }
    // if(event.keyCode === CODES.escape) {
    if(event.key === 'Escape') {
      this.clearInput();
    }
  }

  displayInput(event: MouseEvent) {
    const target = event.target;
    if(!(target instanceof HTMLElement)){
      return;
    }
    const newInput = target!.dataset.val;
    if(newInput) {
      if (this.checkErrorInInput()) {
        this.input!.value = '';
      }
      this.input!.value += newInput;
      this.input!.focus();
    }
  }

  displayResult(result: string) {
    this.output!.textContent = this.input!.value;
    this.input!.value = result;
    this.input!.focus();
  }

  checkErrorInInput() {
    const errorMessages = Object.values(ERROR_MESSAGES);
    return errorMessages.some(message => this.input!.value.match(message));
  }
  
  update(data: string): void {
    this.displayResult(data);
  }
  
  clearInput() {
    this.input!.value = '';
    this.output!.textContent = '';
  }

  deleteLastChar() {
    this.input!.value = this.input!.value.slice(0,-1);
  }
}

async function getOperations() {
  const response = await CalculatorApi.getOperations();
  return response;
}