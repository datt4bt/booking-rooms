import { Sequelize } from 'sequelize';
import { DB_CONFIG } from '../configs';
import { CreationOptional, Model, DataTypes, ForeignKey } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  database: DB_CONFIG.DB,
  host: DB_CONFIG.HOST,
  username: DB_CONFIG.USER,
  password: DB_CONFIG.PASSWORD,
  logging: false,
  query: { raw: true, nest: true }
});

export class BookingsModel extends Model {
  declare id?: number;
  declare user_id: ForeignKey<UsersModel['id']>;
  declare from_date: CreationOptional<Date>;
  declare to_date: CreationOptional<Date>;
  declare status: CreationOptional<string>;
  declare room_id: ForeignKey<RoomsModel['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  static associate(models) {
    BookingsModel.belongsTo(models.RoomsModel, {
      targetKey: 'id',
      foreignKey: 'room_id'
    });
    BookingsModel.belongsTo(models.UsersModel, {
      targetKey: 'id',
      foreignKey: 'user_id'
    });
  }
}

BookingsModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    room_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    from_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    to_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: 'ACTIVE',
      values: ['CANCELED', 'SUCCESS', 'ACTIVE']
    }
  },
  {
    sequelize,
    tableName: 'bookings',
    timestamps: true
  }
);

export class RoomsModel extends Model {
  declare id?: number;
  declare name: string;
  declare type: string;
  declare description: string;
  declare images: Array<object>;
  declare quantity: number;
  declare price: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  static associate(models) {
    RoomsModel.hasMany(models.BookingsModel, {
      sourceKey: 'id',
      foreignKey: 'room_id',
      as: 'bookings'
    });
  }
}

RoomsModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    images: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'rooms'
  }
);

export class UsersModel extends Model {
  declare id?: number;
  declare email: string;
  declare password: string;
  declare role: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  static associate(models) {
    UsersModel.hasMany(models.BookingsModel, {
      sourceKey: 'id',
      foreignKey: 'user_id',
      as: 'bookings'
    });
  }
}

UsersModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: 'CUSTOMER',
      values: ['SUPER_ADMIN', 'ADMIN', 'CUSTOMER']
    }
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true
  }
);

UsersModel.associate(sequelize.models);
BookingsModel.associate(sequelize.models);
RoomsModel.associate(sequelize.models);
