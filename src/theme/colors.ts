import chalk from "chalk";
import type { LoggerColors, Theme } from "../types.js";

export function createTheme(colors: LoggerColors): Theme {
  return {
    dim: chalk.hex(colors.dim),
    soft: chalk.hex(colors.soft),
    accent: chalk.hex(colors.accent),
    success: chalk.hex(colors.success),
    warn: chalk.hex(colors.warn),
    error: chalk.hex(colors.error),
    count: chalk.hex(colors.count),
  };
}
