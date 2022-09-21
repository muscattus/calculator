export const subtraction = {
    priority: 1,
    operands: 2,
    symbol: '-',
    inputs: [],
    calc: function(a, b) {
        return +a - +b;
    },
}