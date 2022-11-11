import { BaseRepository } from '../base/base.repository';
import { BookingsModel, RoomsModel } from '../models';
import { Singleton } from 'typescript-ioc';
import { Op } from 'sequelize';
import moment from 'moment';
import { AvailableRoomDto } from './dto/available-room.dto';
import { STATUS_BOOKING } from '../configs';

@Singleton
export class RoomRepository extends BaseRepository<RoomsModel> {
  constructor(props: any) {
    super(props);
    this.model = RoomsModel;
  }
  public async getAllRoomsAvailable(query: AvailableRoomDto) {
    const dateQuery = moment(query.date ? query.date : new Date(), 'YYYY-DD-DD')
      .startOf('day')
      .toDate();

    return await this.model.findAll({
      include: {
        model: BookingsModel,
        where: {
          from_date: { [Op.lte]: dateQuery },
          to_date: { [Op.gte]: dateQuery },
          status: STATUS_BOOKING.ACTIVE
        },
        as: 'bookings',
        required: false
      },
      raw: false,
      order: [['createdAt', 'DESC']]
    });
  }
}
