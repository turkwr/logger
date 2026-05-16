# @turkwr/logger

Configurable CLI logger with gradient text, chalk colors, and optional file logging to `logs/`.

## Install

```bash
npm install @turkwr/logger
```

## Quick start

```typescript
import { createLogger } from "@turkwr/logger";

const logger = createLogger({
  colors: {
    success: "#7fd889",
    accent: "#a879ff",
  },
  gradient: { from: "#a879ff", to: "#ffffff" },
  file: {
    enabled: true,
    dir: "logs",
    prefix: "app",
    minLevel: "info",
  },
  console: { minLevel: "debug" },
});

logger.banner({ tag: "prod", meta: "12 servers" });
logger.info("started");
logger.success("connected");
logger.warn("slow response");
logger.error("failed", new Error("details"));
logger.event("incoming event");
logger.fatal("critical", err);
```

## API

| Method | Description |
|--------|-------------|
| `debug` | Dim dot, stdout |
| `info` | Dim dot, stdout |
| `success` | Green check, stdout |
| `warn` | Yellow bang; stderr if error passed |
| `error` | Red cross, stderr |
| `event` | Accent arrow, stdout |
| `fatal` | Red cross, stderr |
| `banner` | Gradient title + optional tag/meta line |

Pass a second argument (`unknown`) to append a formatted stack trace.

## File logging

When `file.enabled` is `true`, logs are appended to:

```
logs/{prefix}-YYYY-MM-DD.log
```

Example line:

```
[2026-05-16T14:32:01.123Z] [INFO] started
```

The `logs/` directory is created automatically. File output has no ANSI colors.

## Config

```typescript
interface LoggerConfig {
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
```

Log levels (lowest to highest): `debug` → `info` → `success` → `event` → `warn` → `error` → `fatal`.

## Default colors

| Key | Default |
|-----|---------|
| dim | `#5f5f6a` |
| soft | `#e8e8ea` |
| accent | `#a879ff` |
| success | `#7fd889` |
| warn | `#f4b560` |
| error | `#ef6a6a` |
| count | `#d4c2ff` |

## Utilities

```typescript
import { gradient, formatError, createTheme, mergeConfig } from "@turkwr/logger";
```

## Publish (maintainers)

1. Create an npm automation token and add `NPM_TOKEN` to GitHub secrets.
2. Create a GitHub release with tag `v0.1.0` (or bump version in `package.json`).
3. The publish workflow runs `npm publish --provenance --access public`.

## License

MIT
