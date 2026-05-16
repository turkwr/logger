import type { LogLevel } from "../types.js";

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  success: 2,
  event: 3,
  warn: 4,
  error: 5,
  fatal: 6,
};

export function shouldLog(level: LogLevel, minLevel: LogLevel): boolean {
  return LEVEL_ORDER[level] >= LEVEL_ORDER[minLevel];
}

export function levelLabel(level: LogLevel): string {
  return level.toUpperCase();
}
