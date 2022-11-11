import * as dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import morgan from 'morgan';
import { sequelize } from './models';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import { errorHandler } from './middleware/error.middleware';
import './controllers';
import { RegisterRoutes } from './routes/routes';

const app: Application = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
RegisterRoutes(app);
app.use(errorHandler);

const start = async (): Promise<void> => {
  try {
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
