import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import { notFoundMiddleware } from "./middleware/notFound.middleware";
import { errorMiddleware } from "./middleware/error.middleware";
import { env } from "./config/env";
// import router from "./routes";
// import authRoutes from "./modules/auth";
import cookieParser from "cookie-parser";




const app = express();

// Security Middleware
app.use(helmet());

// CORS
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

// Parse JSON request body
app.use(express.json());

app.use(cookieParser())

// Health Check Route
app.use("/api/v1", routes);
// router.use("/auth", authRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;