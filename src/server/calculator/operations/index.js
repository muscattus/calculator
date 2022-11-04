const addition = {
  symbol: '+',
  operator: '+',
  priority: 1,
  calculate: function(a, b) {
    return +a + +b;
  }
};

const subtraction = {
  symbol: '-',
  operator: '-',
  priority: 1,
  calculate: function(a, b) {
    return +a - +b;
  }
};

const division = {
  symbol: '&#247;',
  operator: '/',
  priority: 2,
  calculate: function(a, b) {
    return +a / +b;
  }
};

const multiplication = {
  symbol: '*',
  operator: '*',
  priority: 2,
  calculate: function(a, b) {
    return +a * +b;
  }
};

const power = {
  symbol: '^',
  operator: '^',
  priority: 3,
  additional: true,
  calculate: function(a, b) {
    return Math.pow(a, b);
  }
};

const squareRoot = {
  symbol: '&#8730;',
  operator: 'sqrt',
  priority: 3,
  unary: true,
  additional: true,
  calculate: function(a) {
    return Math.sqrt(+a);
  }
};

const operations = [
  addition,
  subtraction,
  multiplication,
  power,
  squareRoot,
  division
];

module.exports = operations;
