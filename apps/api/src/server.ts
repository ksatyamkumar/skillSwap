import app from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { connectDatabase } from "./config/database";

const PORT = env.PORT;

async function startServer() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.fatal(error);
    process.exit(1);
  }
}

startServer();