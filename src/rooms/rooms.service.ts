import CreateRoomDto from './dto/create-room.dto';
import { Op } from 'sequelize';
import { RoomRepository } from './rooms.repository';
import { Singleton, Inject } from 'typescript-ioc';
import {
  checkImagesExist,
  deleteImages,
  transformError,
  transformResponse
} from '../helpers';
import { UpdateRoomDto } from './dto/update-room.dto';
import { AvailableRoomDto } from './dto/available-room.dto';
import moment from 'moment';

@Singleton
export class RoomService {
  @Inject
  private roomRepository!: RoomRepository;

  /**
   * Create Room
   * @param body
   * @returns object
   */
  async create(body: CreateRoomDto): Promise<any> {
    const nameExist = await this.roomRepository.findOne({ name: body.name });
    if (nameExist) {
      transformError('Name is exist');
    }
    await checkImagesExist(body.images);
    return await this.roomRepository.create(body);
  }
  async getAll(page?: number, limit?: number): Promise<any> {
    return await this.roomRepository.findAll(page, limit);
  }
  async getAllRoomsAvailable(query: AvailableRoomDto): Promise<object> {
    if (!query.date) {
      transformError('Date is required');
    }
    if (
      moment(query.date).startOf('day').valueOf() <
      moment().startOf('day').valueOf()
    ) {
      transformError('Cannot query old date');
    }
    const data = await this.roomRepository.getAllRoomsAvailable(query);
    const listRoomsAvailable = data.filter(
      (item: any) => item.bookings.length == 0
    );
    return listRoomsAvailable;
  }

  async getOne(id: number): Promise<any> {
    const data = await this.roomRepository.findOne({ id });
    if (!data) {
      transformError('Room is not found');
    }
    return data;
  }
  async update(id: number, body: UpdateRoomDto): Promise<any> {
    const data = await this.roomRepository.findOne({ id });
    if (!data) {
      transformError('Room is not found');
    }
    const bodyUpdate: any = {};
    if (body.name) {
      const nameExist = await this.roomRepository.findOne({
        name: body.name,
        id: { [Op.ne]: id }
      });
      if (nameExist) {
        transformError('Name is exist');
      }
      bodyUpdate.name = body.name;
    }
    if (body.description) {
      bodyUpdate.description = body.description;
    }
    if (body.price) {
      bodyUpdate.price = body.price;
    }
    if (body.quantity) {
      bodyUpdate.quantity = body.quantity;
    }
    if (body.images) {
      await checkImagesExist(body.images);
      const diffImages = data.images.filter(
        (image: any) => !body.images.some((img) => img.path == image.path)
      );
      await deleteImages(diffImages);
      bodyUpdate.images = body.images;
    }
    return await this.roomRepository.update(bodyUpdate, { id });
  }

  async delete(id: number): Promise<any> {
    const data = await this.roomRepository.findOne({ id });
    if (!data) {
      transformError('Room is not found');
    }
    await this.roomRepository.delete({ id });
    return await deleteImages(data.images);
  }
}
