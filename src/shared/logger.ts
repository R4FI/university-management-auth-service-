/* eslint-disable no-undef */
import{ createLogger, format, transports }  from 'winston';
import  path  from "path";
import  DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, label, printf } = format;

// custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp)
    const hour = date.getHours()
    const minute = date.getMinutes()
    const seconds = date.getSeconds()
    return `${date.toDateString()}:${(hour)}:${(minute)}:${(seconds)} [${label}] ${level}: ${message}`;
  });


const logger = createLogger({
  level: 'info',
  format:combine(
    label({ label: 'PH' }),
    timestamp(),
    myFormat,),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(process.cwd(),'logs/winston',"successess",'phu-%DATE%.log'), 
      datePattern: 'DD-MM-YYYY-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '2s'
    })   
   
  ],
});

const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'PH' }),
    timestamp(),
    myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),   
    new DailyRotateFile({
      filename:path.join(process.cwd(),'logs','winston','errors','phu-%DATE%-error.log'),  
      datePattern: 'DD-MM-YYYY-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '2s'
    })   
   
  ],
});  

export {
    logger,errorLogger
};