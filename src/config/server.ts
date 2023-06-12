import mongoose from 'mongoose'
import app from './app'
import config from './index'
import {logger,errorLogger} from '../shared/logger'
async function mainserver() {
  try {
    await mongoose.connect(config.databse_url as string)
    logger.info('Database Connection Successful')

    app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error ('Failled to connect', error)
  }
}
mainserver()
