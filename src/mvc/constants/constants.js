const CODES = {
  return: '13',
  backspace: '08',
  zero: 48,
  nine: 57,
  open: 40,
  escape: 27
}

const EVENT_TYPES = {
  calculate: 'calculate',
  display: 'displayResult',
  showError: 'showError'
}

const ERROR_MESSAGES = {
  validationError: 'Invalid input',
  generalError: 'Error'
}

module.exports = {
  CODES,
  EVENT_TYPES,
  ERROR_MESSAGES
}