type LogLevel = "debug" | "info" | "warn" | "error" | "log";
interface LogOptions {
    forceLog?: boolean;
    method?: string;
    message: (string | number | boolean | object)[];
}
declare const loggerMock: {
    debug: (options: LogOptions) => void;
    info: (options: LogOptions) => void;
    warn: (options: LogOptions) => void;
    error: (options: LogOptions) => void;
    log: (options: LogOptions) => void;
};
export { loggerMock, type LogLevel, type LogOptions };
//# sourceMappingURL=logger.d.ts.map