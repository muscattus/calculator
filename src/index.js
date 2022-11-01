import { Model } from './Model';
import { View } from './View';
import { Controller } from './Controller';

function initPage() {
  const model = new Model();
  const view = new View(model);
  const controller = new Controller(model);
  model.subscribe('displayResult', view);
  model.subscribe('showError', view);
  model.subscribe('calculate', controller);
}


window.onload = initPage;