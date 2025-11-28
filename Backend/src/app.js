import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import apiRoutes from "./routes/index.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json());
app.use(morgan("combined"));

app.use("/api", apiRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.use((req, res, next) => res.status(404).json({ message: "Rota não encontrada" }));
app.use((err, req, res, next) => {
  console.error("Erro:", err);
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === "production" ? "Erro interno do servidor" : err.message;
  res.status(statusCode).json({ message, ...(process.env.NODE_ENV !== "production" && { stack: err.stack }) });
});

export default app;
