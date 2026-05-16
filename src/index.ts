export { createLogger } from "./create-logger.js";
export { gradient } from "./theme/gradient.js";
export { createTheme } from "./theme/colors.js";
export { mergeConfig, DEFAULT_COLORS, DEFAULT_CONFIG } from "./config/defaults.js";
export { formatError } from "./utils/format-error.js";
export type {
  LogLevel,
  LoggerColors,
  LoggerConfig,
  ResolvedConfig,
  BannerOptions,
  Logger,
  Theme,
} from "./types.js";

import { createLogger } from "./create-logger.js";

export default createLogger;
