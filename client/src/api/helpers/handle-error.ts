import { ERROR_MESSAGES } from "../constants/constants";

export function handleError(error: any): string {
  let errorMessage: string;
  if (error.status === 503) {   //Can I do like this???
    errorMessage = ERROR_MESSAGES.serviceUnavailable;
  } else {
    if (error.errorName === 'ValidationError') {
      errorMessage = ERROR_MESSAGES.validationError;
    } else {
      errorMessage = ERROR_MESSAGES.generalError;
    }
  }
  return errorMessage;
}