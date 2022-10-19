export const multiplication = {
    symbol: '*',
    priority: 2,
    calc: function(a, b) {
        return +a * +b;
    }
}