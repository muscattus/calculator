export const division = {
    symbol: '/',
    priority: 2,
    calc: function(a, b) {
        return +a / +b;
    }
}