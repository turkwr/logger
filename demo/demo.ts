import { createLogger } from "../src/index.js";

const logger = createLogger({
  file: { enabled: true, dir: "logs", prefix: "demo" },
  colors: { accent: "#a879ff", success: "#7fd889" },
});

logger.banner({ tag: "dev", meta: "3 servers" });
logger.info("Logger started");
logger.success("Connection established");
logger.event("New event received");
logger.warn("Warning: slow response");
logger.error("An error occurred", new Error("sample error"));
logger.debug("Debug message (visible when console minLevel is debug)");
