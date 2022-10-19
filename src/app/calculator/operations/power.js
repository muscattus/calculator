export const power = {
    symbol: '^',
    priority: 3,
    calc: function(a, b) {
        return Math.pow(a, b);
    }
}