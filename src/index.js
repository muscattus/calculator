import { Model } from './mvc/Model';
import { View } from './mvc/View.js';
import { Controller } from './mvc/Controller.js';
import { CalculatorApi } from './api/CalculatorApi';

function initPage(){
  const api = new CalculatorApi();
  const model = new Model();
  const view = new View(model, api);
  const controller = new Controller(model, api);
  model.subscribe('displayResult', view);
  model.subscribe('showError', view);
  model.subscribe('calculate', controller);
}


window.onload = initPage;
