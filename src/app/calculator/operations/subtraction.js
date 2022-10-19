export const subtraction = {
    symbol: '-',
    priority: 1,
    calc: function(a, b) {
        return +a - +b;
    }
}