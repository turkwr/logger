import { mergeConfig } from "./config/defaults.js";
import { createTheme } from "./theme/colors.js";
import { gradient } from "./theme/gradient.js";
import { createConsoleWriter } from "./output/console.js";
import { createFileWriter } from "./output/file.js";
import type {
  BannerOptions,
  Logger,
  LoggerConfig,
  LogLevel,
} from "./types.js";

const writeStdout = (line: string) => process.stdout.write(`${line}\n`);

export function createLogger(userConfig?: LoggerConfig): Logger {
  const config = mergeConfig(userConfig);
  const theme = createTheme(config.colors);
  const consoleWriter = createConsoleWriter(config, theme);
  const fileWriter = createFileWriter(config);

  const log =
    (level: LogLevel) =>
    (msg: string, error?: unknown): void => {
      consoleWriter.write(level, msg, error);
      fileWriter.write(level, msg, error);
    };

  return {
    debug: log("debug"),
    info: log("info"),
    success: log("success"),
    warn: log("warn"),
    error: log("error"),
    event: log("event"),
    fatal: log("fatal"),

    banner(options?: BannerOptions) {
      const title = options?.title ?? config.banner.title;
      const tag = options?.tag;
      const meta = options?.meta;

      writeStdout("");
      writeStdout(
        "  " + gradient(title, config.gradient.from, config.gradient.to),
      );

      if (tag !== undefined || meta !== undefined) {
        let line = "  " + theme.dim(tag ?? "");
        if (tag !== undefined && meta !== undefined) {
          line += theme.dim(" · ") + theme.count(meta);
        } else if (meta !== undefined) {
          line = "  " + theme.count(meta);
        }
        writeStdout(line);
      }

      writeStdout("");
    },
  };
}
