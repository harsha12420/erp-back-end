import { HttpStatus } from '@nestjs/common';

export function response(httpStatus: HttpStatus, message, data) {
  return {
    statusCode: httpStatus,
    message: message,
    data: data,
  };
}
