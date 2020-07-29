import winston from 'winston';
export const logger = winston.createLogger({
  level: 'verbose',
  format: winston.format.simple(),
  transports: [new winston.transports.Console({ level: 'info' })],
});
