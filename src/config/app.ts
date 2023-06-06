import express, { Application } from 'express'
import cors from 'cors';
import globalErorHandler from '../app/middlewires/globalErrorhandler';
import { userRoute } from '../app/modules/users/user.route';



const app: Application = express()
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application route
app.use('/api/v1/users/',userRoute)
//Testing
// app.get('/', async(req: Request, res: Response, next: NextFunction) => {
//   Promise.reject(new Error('Ore Baba Error '))
// ]
// })

app.use(globalErorHandler)

export default app
 