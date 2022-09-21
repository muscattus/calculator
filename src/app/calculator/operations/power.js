export const power = {
    priority: 3,
    operands: 2,
    symbol: '^',
    inputs: [],
    calc: function(a, b) {
        return Math.pow(+a, +b);
    },
}