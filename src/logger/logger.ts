// Logs the message to the console if the environment is not production or if the logSwitch option is set to true.

type LogLevel = "debug" | "info" | "warn" | "error" | "log";

interface LogOptions {
  forceLog?: boolean;
  method?: string; // Optional since we'll try to get it automatically
  message: (string | number | boolean | object | null | undefined)[]; // Add message array to options
}

function getCallerInfo(): string {
  const error = new Error();
  const stack = error.stack?.split("\n")[3]; // Index 3 contains caller info
  const match = stack?.match(/at\s+(.*)\s+\((.*):(\d+):(\d+)\)/);

  if (match) {
    const [, method, file, line] = match;
    // Extract just the filename from the full path
    const filename = file.split("/").pop() || file;
    return `${filename}:${method}:${line}`;
  }

  // Fallback if we can't parse the stack
  return "Unknown location";
}

const colors = {
  reset: "\x1b[0m",
  gray: "\x1b[90m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  boldRed: "\x1b[1;31m",
  boldGreen: "\x1b[1;32m",
  boldYellow: "\x1b[1;33m",
  boldBlue: "\x1b[1;34m",
};

const levelStyles = {
  debug: {
    level: colors.boldBlue,
    text: colors.blue,
  },
  info: {
    level: colors.boldGreen,
    text: colors.green,
  },
  warn: {
    level: colors.boldYellow,
    text: colors.yellow,
  },
  error: {
    level: colors.boldRed,
    text: colors.red,
  },
  log: {
    level: colors.white,
    text: colors.white,
  },
};

function createLogger() {
  const logger = (options: LogOptions): void => {
    const {
      forceLog = false,
      method = getCallerInfo(),
      message = [],
    } = options;
    const level = "log";

    if (forceLog || process.env.NODE_ENV === "development") {
      const timestamp = new Date().toISOString();
      console[level](
        `[${timestamp}] [${level.toUpperCase()}] ${method} -`,
        ...message
      );
    }
  };

  const createLoggerMethod = (level: LogLevel) => {
    return (options: LogOptions): void => {
      const {
        forceLog = false,
        method = getCallerInfo(),
        message = [],
      } = options;

      if (forceLog || process.env.NODE_ENV === "development") {
        const timestamp = new Date().toISOString();
        const style = levelStyles[level];
        console[level](
          `${colors.gray}[${timestamp}]${colors.reset}`,
          `${style.level}[${level.toUpperCase()}]${colors.reset}`,
          `${colors.cyan}${method}${colors.reset}`,
          `${style.text}-`,
          ...message.map((item) => `${style.text}${item}${colors.reset}`)
        );
      }
    };
  };

  return {
    debug: createLoggerMethod("debug"),
    info: createLoggerMethod("info"),
    warn: createLoggerMethod("warn"),
    error: createLoggerMethod("error"),
    log: logger,
  };
}

const loggerMock = createLogger();

loggerMock.debug({
  forceLog: true,
  message: ["Hello, world!", "My name is John"],
});
loggerMock.info({
  forceLog: true,
  message: ["Hello, world!", "My name is John"],
});
loggerMock.warn({
  forceLog: true,
  message: ["Hello, world!", "My name is John"],
});
loggerMock.error({
  forceLog: true,
  message: ["Hello, world!", "My name is John"],
});
loggerMock.log({
  forceLog: true,
  message: ["Hello, world!", "My name is John"],
});
export { loggerMock, type LogLevel, type LogOptions };
