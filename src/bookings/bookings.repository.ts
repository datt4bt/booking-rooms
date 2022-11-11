import { BaseRepository } from '../base/base.repository';
import { BookingsModel } from '../models';
import { Singleton } from 'typescript-ioc';
import { BookDetailDto } from './dto/create-booking.dto';
import { Op } from 'sequelize';
import moment from 'moment';
import { STATUS_BOOKING } from '../configs';

@Singleton
export class BookingsRepository extends BaseRepository<BookingsModel> {
  constructor(props: any) {
    super(props);
    this.model = BookingsModel;
  }
  public async checkRoomAvailable(data: BookDetailDto) {
    return await this.model.findOne({
      where: {
        room_id: data.room_id,
        from_date: { [Op.gte]: moment(data.from_date).toDate() },
        to_date: { [Op.lte]: moment(data.to_date).toDate() },
        status: STATUS_BOOKING.ACTIVE
      }
    });
  }
}
