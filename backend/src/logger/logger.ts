import { createLogger, format, transports, config } from "winston";
const colorsConfig = {
  error: "red",
  warn: "yellow",
  info: "cyan",
};

const colorizer = format.colorize({ all: true, colors: colorsConfig });
const options = {
  file: {
    level: "debug",
    filename: `logs/combined_logs.log`,
    handleExceptions: true,
    format: format.combine(
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.printf(
        ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
      )
    ),
  },
  console: {
    level: "debug", // Capture all log levels from debug upwards
    consoleWarnLevels: ["info", "warn", "error"], // Warn and error go to stderr
    stderrLevels: ["error"], // Only errors routed to stderr
    debugStdout: true, // Ensure debug logs appear on stdout
    eol: "\n", // Standard line ending
    handleExceptions: true,
    format: format.combine(
      format.splat(),
      format.timestamp(),
      format.printf(({ level, message, timestamp, ...args }) => {
        const coloredLevel = colorizer.colorize(
          level,
          `[${level.toUpperCase()}]`
        );
        return `${timestamp} ${coloredLevel}: ${message} ${Object.keys(args).length > 0 ? JSON.stringify(args, null, 2) : ""
          }`;
      })
    ),
  },
};

const logger = createLogger({
  levels: config.syslog.levels,
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console),
  ],
  exitOnError: false,
});

export default logger;
