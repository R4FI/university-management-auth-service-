import express, { Application, Request, Response } from 'express'
import cors from 'cors';
import userRoute from '../app/modules/users/user.route'

const app: Application = express()
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// application route
app.use('/api/v1/users/',userRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
 