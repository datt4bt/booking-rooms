import { Op } from 'sequelize';
import { Singleton, Inject } from 'typescript-ioc';
import { transformError, transformResponse } from '../helpers';
import { UsersRepository } from './users.repository';
import { TYPE_TOKEN } from '../configs';

@Singleton
export class AuthService {
  @Inject
  private repository: UsersRepository;
  async getOne(id: number) {
    const data = await this.repository.findOne({ id });
    if (!data) {
      transformError('User is not found');
    }
    return data;
  }
}
