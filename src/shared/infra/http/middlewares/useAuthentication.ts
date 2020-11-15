import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  user_id: string;
}

export default function useAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (authHeader) {
    throw new Error('JWT token is missing.');
  }

  const [, token] = authHeader?.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { user_id } = decoded as ITokenPayload;

    request.user = {
      id: user_id,
    };

    return next();
  } catch {
    throw new Error('Invalid JWT token.');
  }
}
