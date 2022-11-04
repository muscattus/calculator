const regexpPatterns = {
  negative: /^neg/,
  negNumber: /^(neg)?[0-9\.]+$/,
  leadingNegative: /^-/,
  brackets: /[()]/
}

const regexpStrings = {
  negative: 'neg',
  number: '(neg)?[0-9\.]+',
  minus: '-'
}

const regexp = {
  allNumbers: new RegExp(/(neg)?[0-9\.]+/, 'g'),
  brackets: new RegExp(/(?<=\()[^()]+(?=\))/)
}

module.exports = {
  regexpPatterns,
  regexpStrings,
  regexp
}