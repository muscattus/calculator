import { Model } from './mvc/Model.js';
import { View } from './mvc/View.js';
import { Controller } from './mvc/Controller.js';

function initPage() {
  const model = new Model();
  const view = new View(model);
  const controller = new Controller(model);
  model.subscribe('displayResult', view);
  model.subscribe('showError', view);
  model.subscribe('calculate', controller);
}


window.onload = initPage;
