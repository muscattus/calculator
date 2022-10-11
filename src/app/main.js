// import { throws } from 'assert';
import { Model } from './calculator/main';
import { View } from './calculator/View';
import { Controller } from './calculator/Controller'

function initPage() {
    const model = new Model();
    const view = new View(model);
    const controller = new Controller(model);
    model.subscribe('displayResult', view);
    model.subscribe('calculate', controller);
}

window.onload = initPage;