import { config } from 'dotenv';
import mongoose from 'mongoose';
import to from '../helper/to';
config();

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, MONGO_INITDB_DATABASE, DB_HOST } =
  process.env;

const PARAMS = 'readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';

const db = `mongodb://${MONGO_INITDB_ROOT_USERNAME}

:${MONGO_INITDB_ROOT_PASSWORD}@
${DB_HOST}/
${MONGO_INITDB_DATABASE}?${PARAMS}`;

const connectDB = () => {
  mongoose
    .connect(db, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Failed to connect to MongoDB', err));
};

export const disconnectDb = async () => {
  const disconnect = () => mongoose.connection.close;

  const [err, result] = await to(disconnect());

  return err ? err : result;
};

export default connectDB;
