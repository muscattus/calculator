export const regexpPatterns = {
  negative: /^neg/,
  negNumber: /^(neg)?[0-9\.]+$/,
  leadingNegative: /^-/,
  brackets: /[()]/
}

export const regexpStrings = {
  negative: 'neg',
  number: '(neg)?[0-9\.]+',
  minus: '-'
}

export const regexp = {
  allNumbers: new RegExp(/(neg)?[0-9\.]+/, 'g'),
  brackets: new RegExp(/(?<=\()[^()]+(?=\))/)
}