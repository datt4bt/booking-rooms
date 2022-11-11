import { Model } from 'sequelize';
import { IBaseRepository } from '../base/interfaces/base.repository.interface';
import { UpdateStatusBookingDto } from '../bookings/dto/update-bookings.dto';
import { transformError } from '../helpers';
import { sequelize } from '../models';
import { UpdateRoomDto } from '../rooms/dto/update-room.dto';

type Constructor<T> = new (...args: any[]) => T;
type ModelType<T extends Model<T>> = Constructor<T> & typeof Model;
export class BaseRepository<T extends Model> implements IBaseRepository {
  constructor(protected model: ModelType<T>) {}

  async create(body: any): Promise<T> {
    const data = await this.model.create(body);
    return await data.save();
  }

  async bulkCreate(body: any): Promise<T[]> {
    const transaction = await sequelize.transaction({});
    try {
      const data = await this.model.bulkCreate(body, { transaction });
      await transaction.commit();
      return data;
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      transformError(error);
    }
  }

  async findAll(page?: number, limit?: number, options?: object): Promise<any> {
    const perPage = limit && limit > 0 ? limit : 10;
    const currentPage = page && page > 0 ? page : 1;
    const offset = (currentPage - 1) * perPage;
    return await this.model.findAndCountAll({
      limit: perPage,
      where: { ...options },
      offset,
      order: [['createdAt', 'DESC']]
    });
  }

  async findOne(options: object): Promise<T | null> {
    return this.model.findOne({ where: { ...options } });
  }

  async update(
    body: UpdateRoomDto | UpdateStatusBookingDto,
    options: object
  ): Promise<any> {
    return await this.model.update(body, { where: { ...options } });
  }

  async delete(options: object): Promise<number> {
    return this.model.destroy({ where: { ...options } });
  }
}
