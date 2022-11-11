export * from './enum';

interface IDB_CONFIG {
  HOST?: string;
  USER?: string;
  PASSWORD?: string;
  DB?: string;
  DIALECT?: string;
}
export const DB_CONFIG: IDB_CONFIG = {
  HOST: process.env.DATABASE_HOST,
  USER: process.env.DATABASE_USER,
  PASSWORD: process.env.DATABASE_PASSWORD,
  DB: process.env.DATABASE_NAME,
  DIALECT: process.env.DATABASE_DIALECT
};
