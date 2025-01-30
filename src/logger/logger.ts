// Logs the message to the console if the environment is not production or if the logSwitch option is set to true.

type LogLevel = "debug" | "info" | "warn" | "error" | "log";

interface LogOptions {
  forceLog?: boolean;
  level?: LogLevel;
  method?: string; // Optional since we'll try to get it automatically
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

function loggerMock(
  message: string,
  options: LogOptions = {},
  ...args: any[]
): void {
  const { forceLog = false, level = "log", method = getCallerInfo() } = options;

  if (forceLog || process.env.NODE_ENV === "development") {
    const timestamp = new Date().toISOString();
    console[level](
      `[${timestamp}] [${level.toUpperCase()}] ${method} -`,
      message,
      ...args
    );
  }
}

export { loggerMock, type LogLevel, type LogOptions };
