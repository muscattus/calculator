import { EVENT_TYPES, validationError, historyLength  as defaultHistoryLength, historyLengthAtLoad} from "./constants/constants";
import { ERROR_MESSAGES} from "../api/constants/constants";
import { Model } from './Model';
import CalculatorApi from '../api/CalculatorApi';
import { DefaultOperation, Operations, historyEntry} from "./constants/interfaces";
export class View {

  additionalOperations: HTMLElement | null;
  clear: HTMLElement | null;
  backspace: HTMLElement | null;
  equals: HTMLElement | null;
  input: HTMLInputElement | null;
  output: HTMLElement | null;
  keypad: HTMLElement | null;
  errors: string[];
  expand: HTMLElement | null;
  historyLog: HTMLElement | null;
  operations: DefaultOperation[] = [];
  history: historyEntry[] = [];
  validationRegexp: RegExp = new RegExp('');
  constructor(private model: Model) {
    this.model = model;
    this.additionalOperations = document.querySelector('#additional-operations');
    this.getOperations();
    this.clear = document.querySelector('#clear');
    this.backspace = document.querySelector('#backspace');
    this.equals = document.querySelector('#equals');
    this.input = document.querySelector('#input');
    this.output = document.querySelector('#output');
    this.historyLog = document.querySelector('#history');
    this.keypad = document.getElementById('keypad');
    this.expand = document.getElementById('expand');
    this.input!.focus();
    this.asignEventListeners();
    this.errors = Object.values(ERROR_MESSAGES);
    this.displayHistory(historyLengthAtLoad);
  }


  asignEventListeners(){
    const keypad = document.getElementById('keypad');
    keypad?.addEventListener( 'click', (event) =>  this.displayInput(event));
    this.equals!.addEventListener('click', () => this.createEquation());
    this.clear!.addEventListener('click', () => this.clearInput());
    this.backspace!.addEventListener('click', () => this.deleteLastChar());
    document.addEventListener('keyup', (event) => this.keyboardHandle(event));
    this.input!.addEventListener('input', (event: any) => this.checkKeyboardInput(event.data));
    this.expand!.addEventListener('click', () => this.expandCollapseOperations());
    this.historyLog!.addEventListener('click', (event) => this.inputFromHistory(event))
  }
  
  addOperationsButtons(operations: DefaultOperation[]) {
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
    this.additionalOperations!.innerHTML = '';
    this.additionalOperations!.append(operationsButtons);
    this.additionalOperations!.addEventListener('click', (event) => this.handleAdditionalOperations(event));
  }
  
  handleAdditionalOperations(event: any) {
    this.expandCollapseOperations();
    this.displayInput(event);
  }

  validateEquation(equation: string) {
    return !!equation && this.validationRegexp.test(equation);
  }

  createEquation() {
    const equation = this.input!.value;
    if (!this.validateEquation(equation)){
      this.update({errorMessage: validationError});
      return;
    }
    this.history.push({equation});
    this.model.setState(EVENT_TYPES.calculate, equation);
  } 

  expandCollapseOperations() {
    this.additionalOperations!.classList.toggle('expanded');
  }
  
  keyboardHandle(event: KeyboardEvent) {
    if(event.key === 'Enter') {
      this.createEquation();
    }
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
    this.output!.textContent = `${this.input!.value}=`;
    this.input!.value = result;
    this.input!.focus();
  }

  checkKeyboardInput(newInput: string) {
    if(this.checkErrorInInput()){
      this.input!.value = '';
      this.input!.value += newInput;
      this.input!.focus();
    }
  }
  checkErrorInInput() {
    return this.errors.some(message => this.input!.value.match(message))
  }
  
  update(data: any): void {
    this.displayResult(data.result || data.errorMessage);
    console.log(data);
    if (data.isLogged) {
      this.addToHistory(data.result);
    } else {
      this.history.pop();
    }
  }

  addToHistory(result: string): void{
    this.history[this.history.length - 1].calculatedresult = result;
    this.history.shift();
    this.displayHistory(this.history.length);
  }

  async displayHistory(historyLength: number): Promise<void> {
    if (this.history.length < 1) {
      try {
        this.history = await CalculatorApi.getHistory();
      } catch (error) {
        const errorMessage = this.createHistoryEntry({entryText:'History is unavailabe'});
        this.historyLog!.append(errorMessage);
        return;
      }
    }
    const log = new DocumentFragment();
    for (let i = 0; i <= historyLength - 2; i++) {
    // for (let i = 0; i < this.history.length; i++) {
      const entry = this.history[i];
      const entryText = `${entry.equation}=${entry.calculatedresult}`;
      const entryContainer = this.createHistoryEntry({data: entry.equation, entryText});
      log.append(entryContainer);
    }
    this.historyLog!.innerHTML = '';
    this.historyLog!.append(log);
  }
  
  createHistoryEntry(entry: any): HTMLElement {
    const entryContainer = document.createElement('p');
    entryContainer.classList.add('history-entry');
    entryContainer.dataset.equation = entry.data;
    entryContainer.textContent = entry.entryText;
    return entryContainer;
  }

  inputFromHistory(event: any) {
    const equation = event.target.dataset.equation || null;
    if(event.target.dataset.equation) {
      this.input!.value = equation;
    }
  }
  
  clearInput() {
    this.input!.value = '';
    this.output!.textContent = '';
  }

  deleteLastChar() {
    this.input!.value = this.input!.value.slice(0,-1);
  }

  async getOperations() {
    const response = await CalculatorApi.getOperations();
    this.validationRegexp = new RegExp(response.regexp);
    this.addOperationsButtons(response.operations)
  }
}
