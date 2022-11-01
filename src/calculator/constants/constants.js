export const negativeString = 'neg';
export const negativePattern = /^neg/;
export const allNumbersRegexp = new RegExp(/(neg)?[0-9\.]+/, 'g'); 
export const parenthesesRegexp = new RegExp(/(?<=\()[^()]+(?=\))/);
export const negNumberRegexp = /^(neg)?[0-9\.]+$/;
export const numberPattern = '(neg)?[0-9\.]+';
export const leadingNegativePattern = /^-/;
export const parenthesesPattern = /[()]/;
export const minus = '-';


export const errors ={
  invalidInput: 'Invalid Input',
  invalidParentheses: 'Check Parentheses'
};