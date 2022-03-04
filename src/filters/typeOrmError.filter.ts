import { Catch } from '@nestjs/common/decorators/core/catch.decorator';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { ExceptionFilter } from '@nestjs/common/interfaces/exceptions/exception-filter.interface';
import { ArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';

@Catch(QueryFailedError, EntityNotFoundError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const errorCode = exception.driverError.code;
    console.log('errorCode: ', errorCode);

    let errorMessage;

    switch (errorCode) {
      case '23505': {
        errorMessage = '使用者重複';
        break;
      }
      default: {
        errorMessage = exception.driverError.message;
      }
    }

    const { url } = request;
    const errorResponse = {
      path: url,
      timestamp: new Date().toISOString(),
      message: errorMessage,
    };

    response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
  }
}
