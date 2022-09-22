export function Multiplication() {
    this.priority = 2;
    this.operands = 2;
    this.symbol = '*';
    this.inputs = [];
    this.calc = function(a, b) {
        return +a * +b;
    };
    this.addInput = function(number) {
        this.inputs.push(number);
    }
}