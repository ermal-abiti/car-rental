import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const { MONGO_URI } = process.env;

export const connect = () => {
    mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
}
