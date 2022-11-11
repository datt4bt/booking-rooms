import { BaseRepository } from '../base/base.repository';
import { UsersModel } from '../models';
import { Singleton } from 'typescript-ioc';
import { Op } from 'sequelize';
import moment from 'moment';
import { STATUS_BOOKING } from '../configs';

@Singleton
export class UsersRepository extends BaseRepository<UsersModel> {
  constructor(props: any) {
    super(props);
    this.model = UsersModel;
  }
}
