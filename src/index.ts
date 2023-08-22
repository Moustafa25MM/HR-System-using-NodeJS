import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { indexRouter } from './routes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const mongoUrl = process.env.MONGO_URL as string;
mongoose
  .connect(mongoUrl)
  .then(() => console.log('DB connected'))
  .catch(() => console.log('DB connection failed'));

export const app: Express = express();
app.use(express.json());
app.use(morgan('tiny'));

app.use(indexRouter);
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`The server is running on port " ${port}"`);
});
