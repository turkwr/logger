import type { ChalkInstance } from "chalk";

export type LogLevel =
  | "debug"
  | "info"
  | "success"
  | "warn"
  | "error"
  | "event"
  | "fatal";

export interface LoggerColors {
  dim: string;
  soft: string;
  accent: string;
  success: string;
  warn: string;
  error: string;
  count: string;
}

export interface LoggerConfig {
  colors?: Partial<LoggerColors>;
  gradient?: { from?: string; to?: string };
  banner?: { title?: string };
  console?: { enabled?: boolean; minLevel?: LogLevel };
  file?: {
    enabled?: boolean;
    dir?: string;
    prefix?: string;
    minLevel?: LogLevel;
  };
}

export interface ResolvedConfig {
  colors: LoggerColors;
  gradient: { from: string; to: string };
  banner: { title: string };
  console: { enabled: boolean; minLevel: LogLevel };
  file: {
    enabled: boolean;
    dir: string;
    prefix: string;
    minLevel: LogLevel;
  };
}

export interface BannerOptions {
  title?: string;
  tag?: string;
  meta?: string;
}

export interface Logger {
  debug(msg: string, error?: unknown): void;
  info(msg: string, error?: unknown): void;
  success(msg: string, error?: unknown): void;
  warn(msg: string, error?: unknown): void;
  error(msg: string, error?: unknown): void;
  event(msg: string, error?: unknown): void;
  fatal(msg: string, error?: unknown): void;
  banner(options?: BannerOptions): void;
}

export interface Theme {
  dim: ChalkInstance;
  soft: ChalkInstance;
  accent: ChalkInstance;
  success: ChalkInstance;
  warn: ChalkInstance;
  error: ChalkInstance;
  count: ChalkInstance;
}
