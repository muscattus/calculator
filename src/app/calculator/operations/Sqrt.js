export const squareRoot = {
    symbol: 'sqrt',
    priority: 3,
    unary: true,
    calc: function(a) {
       return Math.sqrt(+a);
    }
}