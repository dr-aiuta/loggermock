# loggermock

A flexible and type-safe mock logger for testing applications.

## Installation

```bash
npm install loggermock
```

## Features

- Type-safe logging interface
- Easy assertion of logged messages
- Support for different log levels (debug, info, warn, error)
- Clear and fluent API for testing
- Zero dependencies

## Usage

```typescript
import { LoggerMock } from "loggermock";

// Create a new logger mock instance
const logger = new LoggerMock();

// Use the logger in your code
logger.info("User logged in", { userId: "123" });
logger.error("Operation failed", new Error("Database connection error"));

// Assert logged messages in your tests
expect(logger.messages).toHaveLength(2);
expect(logger.messages[0].level).toBe("info");
expect(logger.messages[0].message).toBe("User logged in");
expect(logger.messages[0].meta).toEqual({ userId: "123" });
```

## API

### LoggerMock

#### Constructor

```typescript
const logger = new LoggerMock();
```

#### Methods

- `debug(message: string, ...meta: any[]): void` - Log a debug message
- `info(message: string, ...meta: any[]): void` - Log an info message
- `warn(message: string, ...meta: any[]): void` - Log a warning message
- `error(message: string, ...meta: any[]): void` - Log an error message

#### Properties

- `messages: LogMessage[]` - Array of all logged messages
- `debugMessages: LogMessage[]` - Array of debug level messages
- `infoMessages: LogMessage[]` - Array of info level messages
- `warnMessages: LogMessage[]` - Array of warning level messages
- `errorMessages: LogMessage[]` - Array of error level messages

### LogMessage Interface

```typescript
interface LogMessage {
  level: "debug" | "info" | "warn" | "error";
  message: string;
  meta: any[];
  timestamp: Date;
}
```

## Examples

### Basic Usage

```typescript
const logger = new LoggerMock();

logger.info("Application started");
logger.debug("Processing request", { method: "GET", path: "/users" });
logger.error("Failed to connect", new Error("Connection timeout"));

// Assert messages
expect(logger.messages).toHaveLength(3);
expect(logger.infoMessages).toHaveLength(1);
expect(logger.debugMessages).toHaveLength(1);
expect(logger.errorMessages).toHaveLength(1);
```

### Testing Specific Log Levels

````typescript
const logger = new LoggerMock();

function processUser(user: any) {
  logger.debug('Processing user', user);
  // ... processing logic
  logger.info('User processed successfully');
}

// In your test
processUser({ id: '123', name: 'John' });

expect(logger.debugMessages[0].meta[0]).toEqual({ id: '123', name: 'John' });
expect(logger.infoMessages[0].message).toBe('User processed successfully');
```README.md

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
````

This README provides a comprehensive overview of the loggermock library, including installation instructions, usage examples, and API documentation. It's formatted in a clear and organized way to help users quickly understand how to use the library in their projects.

The examples demonstrate both basic usage and more specific testing scenarios, which should help users understand how to effectively use the mock logger in their tests.
