# loggermock

A flexible and type-safe mock logger for testing and development with colored console output.

## Installation

```bash
npm install loggermock
```

## Features

- Type-safe logging interface
- Colored console output for different log levels
- Automatic caller information tracking
- Environment-aware logging (development/production)
- Timestamp support
- Zero dependencies

## Usage

```typescript
import { loggerMock } from "loggermock";

// Basic usage
loggerMock.info({
  message: ["User logged in", { userId: "123" }],
});

// Force logging even in production
loggerMock.debug({
  message: ["Debug information"],
  forceLog: true,
});

// Custom method name
loggerMock.error({
  message: ["Operation failed", new Error("Database error")],
  method: "CustomMethod",
});
```

## API

### LogOptions Interface

```typescript
interface LogOptions {
  forceLog?: boolean; // Force logging even in production
  method?: string; // Optional method name (auto-detected if not provided)
  message: (string | number | boolean | object)[]; // Message content
}
```

### Methods

Each method accepts a `LogOptions` object:

- `debug(options: LogOptions): void` - Blue colored debug messages
- `info(options: LogOptions): void` - Green colored info messages
- `warn(options: LogOptions): void` - Yellow colored warning messages
- `error(options: LogOptions): void` - Red colored error messages
- `log(options: LogOptions): void` - Standard log messages

### Output Format

The logger outputs messages in the following format:

```
[TIMESTAMP] [LEVEL] filename:method:line - message content
```

### Environment Behavior

- Development: All messages are logged by default
- Production: Messages are only logged when `forceLog: true`

## Examples

### Basic Usage

```typescript
import { loggerMock } from "loggermock";

// Debug with object data
loggerMock.debug({
  message: ["Processing request", { method: "GET", path: "/users" }],
});

// Warning with custom method
loggerMock.warn({
  message: ["Rate limit approaching"],
  method: "RateLimiter",
});

// Error with error object
loggerMock.error({
  message: ["Failed to connect", new Error("Connection timeout")],
});
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
