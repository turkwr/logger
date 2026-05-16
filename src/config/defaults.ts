import type { LoggerColors, LoggerConfig, ResolvedConfig } from "../types.js";

export const DEFAULT_COLORS: LoggerColors = {
  dim: "#5f5f6a",
  soft: "#e8e8ea",
  accent: "#a879ff",
  success: "#7fd889",
  warn: "#f4b560",
  error: "#ef6a6a",
  count: "#d4c2ff",
};

export const DEFAULT_CONFIG: ResolvedConfig = {
  colors: DEFAULT_COLORS,
  gradient: { from: "#a879ff", to: "#ffffff" },
  banner: { title: "my-app" },
  console: { enabled: true, minLevel: "debug" },
  file: {
    enabled: false,
    dir: "logs",
    prefix: "app",
    minLevel: "info",
  },
};

export function mergeConfig(user?: LoggerConfig): ResolvedConfig {
  return {
    colors: { ...DEFAULT_CONFIG.colors, ...user?.colors },
    gradient: {
      from: user?.gradient?.from ?? DEFAULT_CONFIG.gradient.from,
      to: user?.gradient?.to ?? DEFAULT_CONFIG.gradient.to,
    },
    banner: {
      title: user?.banner?.title ?? DEFAULT_CONFIG.banner.title,
    },
    console: {
      enabled: user?.console?.enabled ?? DEFAULT_CONFIG.console.enabled,
      minLevel: user?.console?.minLevel ?? DEFAULT_CONFIG.console.minLevel,
    },
    file: {
      enabled: user?.file?.enabled ?? DEFAULT_CONFIG.file.enabled,
      dir: user?.file?.dir ?? DEFAULT_CONFIG.file.dir,
      prefix: user?.file?.prefix ?? DEFAULT_CONFIG.file.prefix,
      minLevel: user?.file?.minLevel ?? DEFAULT_CONFIG.file.minLevel,
    },
  };
}
