const addition = {
    symbol: '+',
    priority: 1,
    calc: function(a, b) {
        return +a + +b;
    }
};

const subtraction = {
    symbol: '-',
    priority: 1,
    calc: function(a, b) {
        return +a - +b;
    }
};

const division = {
    symbol: '/',
    priority: 2,
    calc: function(a, b) {
        return +a / +b;
    }
};

const multiplication = {
    symbol: '*',
    priority: 2,
    calc: function(a, b) {
        return +a * +b;
    }
};

const power = {
    symbol: '^',
    priority: 3,
    calc: function(a, b) {
        return Math.pow(a, b);
    }
};

const squareRoot = {
    symbol: 'sqrt',
    priority: 3,
    unary: true,
    calc: function(a) {
       return Math.sqrt(+a);
    }
};

export const operations = [
    addition,
    subtraction,
    multiplication,
    power,
    squareRoot,
    division
];

