import mongoose from "mongoose";

import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Please specifiy a MONGODB_URI varibale in .env.<development/production>.local"
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to Database in ${NODE_ENV} mode`);
  } catch (error) {
    console.log("Error connecting to Database: ", error);
    process.exit(1);
  }
};

export default connectToDatabase;
