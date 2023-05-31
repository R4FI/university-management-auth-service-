import mongoose from 'mongoose'
import app from './app'
import config from './index'
async function mainserver() {
  try {
    await mongoose.connect(config.databse_url as string)
    console.log('Database Connection Successful')

    app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    console.log('Failled to connect', error)
  }
}
mainserver()
