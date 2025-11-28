import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, { maxPoolSize: 10 });
    logger.info(`MongoDB conectado: ${conn.connection.host}`);
  } catch (err) {
    logger.error("Erro ao conectar ao MongoDB", { error: err.message });
    process.exit(1);
  }
};

export default connectDB;
