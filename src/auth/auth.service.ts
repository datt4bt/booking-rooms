import { SignInDto } from './dto/sign-in.dto';
import { Op } from 'sequelize';
import { RoomService } from '../rooms/rooms.service';
import { Singleton, Inject } from 'typescript-ioc';
import { transformError, transformResponse } from '../helpers';
import { UsersRepository } from '../users/users.repository';
import { compareSync, hashSync } from 'bcrypt';
import _ from 'lodash';
import { JWT_CONFIGS } from '../configs/secret';
import { sign } from 'jsonwebtoken';
import { TYPE_TOKEN } from '../configs';

@Singleton
export class AuthService {
  @Inject
  private repository: UsersRepository;

  async signIn(body: SignInDto): Promise<any> {
    const user = await this.repository.findOne({ email: body.email });
    if (!user || !user.password || !compareSync(body.password, user.password)) {
      transformError('Email or Password is incorrect', 401);
    }
    const payload: object = this.getPayLoadData(user);
    const accessToken = sign(
      { ...payload, type: TYPE_TOKEN.ACCESS_TOKEN },
      JWT_CONFIGS.SECRET_KEY_JWT,
      {
        expiresIn: 60 * parseInt(JWT_CONFIGS.TIME_EXPIRE_ACCESS_TOKEN),
        algorithm: JWT_CONFIGS.JWT_ALGORITHM
      }
    );

    const refreshToken = sign(
      { ...payload, type: TYPE_TOKEN.REFRESH_TOKEN },
      JWT_CONFIGS.SECRET_KEY_JWT,
      {
        expiresIn: 60 * parseInt(JWT_CONFIGS.TIME_EXPIRE_REFRESH_TOKEN),
        algorithm: JWT_CONFIGS.JWT_ALGORITHM
      }
    );
    return transformResponse({
      data: {
        accessToken,
        refreshToken,
        payload
      }
    });
  }
  async signUp(body: SignInDto) {
    const existEmail = await this.repository.findOne({ email: body.email });
    if (existEmail) {
      transformError('Email is exist');
    }
    body.password = hashSync(body.password, 10);
    await this.repository.create(body);
    return transformResponse({ data: { message: 'Sign Up is successfully' } });
  }

  private getPayLoadData(data: object): object {
    return _.omit(data, ['password']);
  }
}
