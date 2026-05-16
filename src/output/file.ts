import { mkdir } from "node:fs/promises";
import { appendFile } from "node:fs/promises";
import { join } from "node:path";
import type { LogLevel, ResolvedConfig } from "../types.js";
import { shouldLog, levelLabel } from "../utils/levels.js";
import { formatError } from "../utils/format-error.js";

function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatLine(level: LogLevel, msg: string, error?: unknown): string {
  const ts = new Date().toISOString();
  let line = `[${ts}] [${levelLabel(level)}] ${msg}`;
  if (error !== undefined) {
    line += `\n${formatError(error)}`;
  }
  return line + "\n";
}

export interface FileWriter {
  write(level: LogLevel, msg: string, error?: unknown): void;
}

export function createFileWriter(config: ResolvedConfig): FileWriter {
  let dirReady = false;

  const ensureDir = async () => {
    if (dirReady) return;
    await mkdir(config.file.dir, { recursive: true });
    dirReady = true;
  };

  const logPath = () =>
    join(config.file.dir, `${config.file.prefix}-${todayKey()}.log`);

  return {
    write(level, msg, error) {
      if (!config.file.enabled) return;
      if (!shouldLog(level, config.file.minLevel)) return;

      const line = formatLine(level, msg, error);

      void ensureDir()
        .then(() => appendFile(logPath(), line, "utf8"))
        .catch((err) => {
          process.stderr.write(
            `[@turkwr/logger] file write failed: ${String(err)}\n`,
          );
        });
    },
  };
}
