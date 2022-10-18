export const numberRegex = new RegExp(/^[+-]?\d+(\.\d+)?$/);
export const negative = '-';
export const numRegex = new RegExp(/(neg)?[0-9\.]+/, 'g'); 
export const parenthesesRegex = new RegExp(/(?<=\()[^()]+(?=\))/g);
// export const minusNumberRegex = /^-?[0-9\.]+$/;
export const negNumberRegex = /^(neg)?[0-9\.]+$/;
export const negNumberString = '^(neg)?[0-9\.]+$';

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