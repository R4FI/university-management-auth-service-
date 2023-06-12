/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unreachable */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErorHandler from '../app/middlewires/globalErrorhandler';
import routes from '../app/routes';
import httpStatus from 'http-status';

const app: Application = express();
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application route
// console.log(process.env)
app.use('/api/v1', routes);

// app.get('/', (req: Request, res: Response,next) => {
// //  throw new ApiError(400,'hello world')
//  next('hello')
// })
// global error handler
// eslint-disable-next-line no-undef
app.use(globalErorHandler);

// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    sucess: 'False',
    message: 'Not Found !',
    erroMessages: [
      {
        path: req.originalUrl,
        message: 'Api not found'
      }
    ]
  });
});
export default app;
