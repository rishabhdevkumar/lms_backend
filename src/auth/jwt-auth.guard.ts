import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    let token = request.headers['authorization'] || request.headers['Authorization'];

    if (!token) {
      const response = context.switchToHttp().getResponse();
      response.status(200).json({
        ok: false,
        type: 'LOGIN',
        msg: 'No token provided',
      });
      return false;
    }

    if (typeof token === 'string' && token.startsWith('Bearer ')) {
      token = token.slice(7).trim();
    }

    try {
      const secret = process.env.TOKEN_SECRET || 'your_secret_key';
      const decoded = jwt.verify(token, secret);
      request.user = decoded;
      request.student = decoded;
      request.faculty = decoded;
      return true;
    } catch (err) {
      const response = context.switchToHttp().getResponse();
      response.status(200).json({
        ok: false,
        type: 'LOGIN',
        msg: 'Invalid token',
      });
      return false;
    }
  }
}
