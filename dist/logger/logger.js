"use strict";
// Logs the message to the console if the environment is not production or if the logSwitch option is set to true.
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMock = void 0;
function getCallerInfo() {
    var _a;
    const error = new Error();
    const stack = (_a = error.stack) === null || _a === void 0 ? void 0 : _a.split("\n")[3]; // Index 3 contains caller info
    const match = stack === null || stack === void 0 ? void 0 : stack.match(/at\s+(.*)\s+\((.*):(\d+):(\d+)\)/);
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
    const logger = (options) => {
        const { forceLog = false, method = getCallerInfo(), message = [], } = options;
        const level = "log";
        if (forceLog || process.env.NODE_ENV === "development") {
            const timestamp = new Date().toISOString();
            console[level](`[${timestamp}] [${level.toUpperCase()}] ${method} -`, ...message);
        }
    };
    const createLoggerMethod = (level) => {
        return (options) => {
            const { forceLog = false, method = getCallerInfo(), message = [], } = options;
            if (forceLog || process.env.NODE_ENV === "development") {
                const timestamp = new Date().toISOString();
                const style = levelStyles[level];
                console[level](`${colors.gray}[${timestamp}]${colors.reset}`, `${style.level}[${level.toUpperCase()}]${colors.reset}`, `${colors.cyan}${method}${colors.reset}`, `${style.text}-`, ...message.map((item) => `${style.text}${item}${colors.reset}`));
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
exports.loggerMock = loggerMock;
