/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unreachable */
import express, { Application } from 'express'
import cors from 'cors';
import userRoute from '../app/modules/users/user.route'

import globalErorHandler from '../app/middlewires/globalErrorhandler';

const app: Application = express()
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// application route
// console.log(process.env)
app.use('/api/v1/users/',userRoute)



// app.get('/', (req: Request, res: Response,next) => {
// //  throw new ApiError(400,'hello world')
//  next('hello')
// })
// global error handler
// eslint-disable-next-line no-undef
app.use(globalErorHandler)

export default app
 