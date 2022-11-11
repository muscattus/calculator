const addition = {
  symbol: '+',
  operator: '+',
  priority: 1,
  unary: false,
  additional: false,
  calculate: function(...operands: string[] ) {
    return +operands[0] + +operands[1];
  }
};

const subtraction = {
  symbol: '-',
  operator: '-',
  priority: 1,
  unary: false,
  additional: false,
  calculate: function(...operands: string[]) {
    return +operands[0] - +operands[1];
  }
};

const division = {
  symbol: '&#247;',
  operator: '/',
  priority: 2,
  unary: false,
  additional: false,
  calculate: function(...operands: string[]) {
    return +operands[0] / +operands[1];
  }
};

const multiplication = {
  symbol: '*',
  operator: '*',
  priority: 2,
  unary: false,
  additional: false,
  calculate: function(...operands: string[]) {
    return +operands[0] * +operands[1];
  }
};

const power = {
  symbol: '^',
  operator: '^',
  priority: 3,
  additional: true,
  unary: false,
  calculate: function(...operands: string[]) {
    return Math.pow(+operands[0], +operands[1]);
  }
};

const squareRoot = {
  symbol: '&#8730;',
  operator: 'sqrt',
  priority: 3,
  unary: true,
  additional: true,
  calculate: function(...operands: string[]) {
    return Math.sqrt(+operands[0]);
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