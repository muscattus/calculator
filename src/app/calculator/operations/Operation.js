
export function Operation() {
    this.inputs = [];

    this.addInput = function(number) {
        this.inputs.push(number);
    }

    this.takeLastInput = function() {
        return this.inputs.pop();
    }

    this.hasAllOperands = function() {
        return this.unary && this.inputs.length === 1 || !this.unary && this.inputs.length === 2; 
    }
}