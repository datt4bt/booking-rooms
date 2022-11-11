import { BookDetailDto, CreateBookingDto } from './dto/create-booking.dto';
import { Op } from 'sequelize';
import { BookingsRepository } from './bookings.repository';
import { RoomService } from '../rooms/rooms.service';
import { Singleton, Inject } from 'typescript-ioc';
import {
  checkImagesExist,
  deleteImages,
  transformError,
  transformResponse
} from '../helpers';
import { UpdateBookingDto } from './dto/update-bookings.dto';
import { STATUS_BOOKING } from '../configs';

@Singleton
export class BookingsService {
  @Inject
  private repository: BookingsRepository;
  @Inject
  private roomService: RoomService;

  /**
   * Create Room
   * @param body
   * @returns object
   */
  async create(body: CreateBookingDto): Promise<any> {
    const listRooms = body.data.map((item) => item.room_id);
    await Promise.all(
      listRooms.map(async (roomId) => {
        await this.roomService.getOne(roomId);
      })
    );
    await this.checkDataBookings(body.data);
    body.data = body.data.map((item) => {
      return { ...item, user_id: 1 };
    });
    return await this.repository.bulkCreate(body.data);
  }
  async getAll(
    page?: number,
    limit?: number,
    status?: string,
    userId?: number
  ): Promise<any> {
    return await this.repository.findAll(page, limit, {
      status,
      user_id: userId
    });
  }

  async getOne(id: number): Promise<any> {
    const data = await this.repository.findOne({ id });
    if (!data) {
      transformError('Room is not found');
    }
    return data;
  }
  async update(id: number, body: UpdateBookingDto): Promise<any> {
    const data = await this.repository.findOne({ id });
    if (!data) {
      transformError('Room is not found');
    }
    const bodyUpdate: any = {};
    //if (body.name) {
    //  const nameExist = await this.repository.findOne({
    //    name: body.name,
    //    id: { [Op.ne]: id }
    //  });
    //  if (nameExist) {
    //    transformError('Name is exist');
    //  }
    //  bodyUpdate.name = body.name;
    //}

    return await this.repository.update(bodyUpdate, { id });
  }

  async cancelBooking(id: number): Promise<any> {
    const data = await this.repository.findOne({
      id,
      status: STATUS_BOOKING.ACTIVE
    });
    if (!data) {
      transformError('Data Booking is not found');
    }
    await this.repository.update({ status: STATUS_BOOKING.CANCELED }, { id });
  }

  async checkDataBookings(data: BookDetailDto[]) {
    return await Promise.all(
      data.map(async (item) => {
        const dataBooking = await this.repository.checkRoomAvailable(item);
        if (dataBooking) {
          transformError('Can not booking');
        }
      })
    );
  }
}
