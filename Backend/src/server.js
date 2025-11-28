import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => logger.info(`Servidor rodando na porta ${PORT}`));
  } catch (error) {
    logger.error("Erro ao iniciar o servidor", { error: error.message });
    process.exit(1);
  }
};

startServer();
