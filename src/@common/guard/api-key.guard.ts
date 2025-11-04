import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly validApiKey = process.env.API_PASSWORD || 'test-key';
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];

    if (apiKey !== this.validApiKey) {
      throw new UnauthorizedException({
        success: false,
        detail: 'API_KEY_INVALID',
        message: 'Clave API no válida',
      });
    }

    return true;
  }
}
