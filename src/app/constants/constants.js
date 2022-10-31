// export const numberRegexp = new RegExp(/^[-]?\d+(\.\d+)?$/);
export const negativeString = 'neg';
export const negativePattern = /^neg/;
export const allNumbersRegexp = new RegExp(/(neg)?[0-9\.]+/, 'g'); 
export const parenthesesRegexp = new RegExp(/(?<=\()[^()]+(?=\))/);
export const negNumberRegexp = /^(neg)?[0-9\.]+$/;
export const numberPattern = '(neg)?[0-9\.]+';
export const leadingNegativePattern = /^-/;
export const parenthesesPattern = /[()]/;
export const minus = '-';

export const parentheses = {
    open: '(',
    close: ')'
};

export const CODES = {
    return: '13',
    backspace: '08',
    zero: 48,
    nine: 57,
    open: 40,
    escape: 27
}

export const EVENT_TYPES = {
    calculate: 'calculate',
    display: 'displayResult'
}

export const errors ={
    invalidInput: 'INVALID INPUT'
};