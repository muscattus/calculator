import { Model } from './mvc/Model';
import { View } from './mvc/View';
import { Controller } from './mvc/Controller';
import './assets/loader.gif'

function initPage(){
  const model = new Model();
  const view = new View(model);
  const controller = new Controller(model);
  model.subscribe('displayResult', view);
  model.subscribe('showError', view);
  model.subscribe('calculate', controller);
}


window.onload = initPage;
