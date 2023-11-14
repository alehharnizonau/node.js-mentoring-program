import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "src/online-shop/log/error.log",
      level: "error",
    }),
  ],
});

export default logger;
