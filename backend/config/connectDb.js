import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

let isConnected = false;

export const isDbConnected = () => {
  return mongoose.connection.readyState === 1;
};

const connectDb = async () => {
  if (isConnected) return;
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    throw error;
  }
};

export default connectDb;
