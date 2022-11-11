export interface IBaseRepository {
  create: (body: any) => object;
  update: (options: object, body: any) => object;
  findOne: (options: object) => object | null;
  findAll: (page?: number, limit?: number, options?: object) => object;
  delete: (options: object) => object;
}
