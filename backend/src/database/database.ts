import mongoose from 'mongoose';
import { config } from '../config/app.config.js';

const connectDb = async () => {
  try {
    const MONGO_URI_CONN = config.NODE_ENV === 'PRODUCTION' ? config.MONGO_URI : config.MONGO_URI_LOCAL;

    const conn = await mongoose.connect(MONGO_URI_CONN, {});
    console.info(`MongoDb Database Successfully Connected with HOST: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1); // Exit process with failure message if connection fails.
  }
};

export default connectDb;
