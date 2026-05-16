import type { LogLevel, ResolvedConfig, Theme } from "../types.js";
import { shouldLog } from "../utils/levels.js";
import { formatError } from "../utils/format-error.js";

const writeStdout = (line: string) => process.stdout.write(`${line}\n`);
const writeStderr = (line: string) => process.stderr.write(`${line}\n`);

export interface ConsoleWriter {
  write(level: LogLevel, msg: string, error?: unknown): void;
}

export function createConsoleWriter(
  config: ResolvedConfig,
  theme: Theme,
): ConsoleWriter {
  const soft = (msg: string) => theme.soft(msg);

  return {
    write(level, msg, error) {
      if (!config.console.enabled) return;
      if (!shouldLog(level, config.console.minLevel)) return;

      const hasError = error !== undefined;

      switch (level) {
        case "debug":
          writeStdout(theme.dim("·") + " " + theme.dim(msg));
          if (hasError) writeStderr(formatError(error));
          break;
        case "info":
          writeStdout(theme.dim("·") + " " + soft(msg));
          if (hasError) writeStderr(formatError(error));
          break;
        case "success":
          writeStdout(theme.success("✓") + " " + soft(msg));
          if (hasError) writeStderr(formatError(error));
          break;
        case "warn":
          if (!hasError) {
            writeStdout(theme.warn("!") + " " + soft(msg));
            return;
          }
          writeStderr(theme.warn("!") + " " + soft(msg));
          writeStderr(formatError(error));
          break;
        case "error":
          writeStderr(theme.error("×") + " " + soft(msg));
          if (hasError) writeStderr(formatError(error));
          break;
        case "event":
          writeStdout(theme.accent("→") + " " + soft(msg));
          if (hasError) writeStderr(formatError(error));
          break;
        case "fatal":
          writeStderr(theme.error("×") + " " + soft(msg));
          if (hasError) writeStderr(formatError(error));
          break;
      }
    },
  };
}
