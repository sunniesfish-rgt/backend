import { HttpStatus, HttpException } from '@nestjs/common';

export class BookNotFoundException extends HttpException {
  constructor(id: string) {
    super(`도서 ID ${id}를 찾을 수 없습니다`, HttpStatus.NOT_FOUND);
  }
}

export class BookOperationException extends HttpException {
  constructor(operation: string, error?: string) {
    super(
      `도서 ${operation} 중 오류가 발생했습니다: ${error || ''}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
