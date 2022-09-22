export function Operation() {
    this.inputs = [];

    this.addInput = function(number) {
        this.inputs.push(number);
    }

    this.takeLastInput = function() {
        return this.inputs.pop();
    }
}