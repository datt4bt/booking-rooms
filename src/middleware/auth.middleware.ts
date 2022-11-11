import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { TYPE_TOKEN } from '../configs';
import { JWT_CONFIGS } from '../configs/secret';
import { transformError } from '../helpers';
import { AuthService } from '../users/users.service';

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  roles?: string[]
): Promise<any> {
  const token = request.headers.authorization;
  const authService = new AuthService();

  return new Promise(async (resolve, reject) => {
    if (!token) {
      reject(transformError('No token provided', 403));
    }
    jwt.verify(
      token,
      JWT_CONFIGS.SECRET_KEY_JWT,
      async function (err: any, decoded: any) {
        if (err) {
          reject(err);
        } else {
          if (decoded.type != TYPE_TOKEN.ACCESS_TOKEN) {
            transformError('Token is invalid', 403);
          }
          if (!roles.includes(decoded.role)) {
            transformError('You do not permission', 403);
          }
          const user = await authService.getOne(decoded.id);
          request['user'] = user;
          resolve(decoded);
        }
      }
    );
  });
}
