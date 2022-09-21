export const multiplication = {
    priority: 2,
    operands: 2,
    symbol: '*',
    inputs: [],
    calc: function(a, b) {
        return +a * +b;
    },
}