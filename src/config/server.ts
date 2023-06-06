import mongoose from 'mongoose'
import app from './app'
import config from './index'
import {logger,errorLogger} from '../shared/logger';
import {Server} from 'http';

process.on('unhandledRejection',error=>{
  errorLogger.error(error)
  process.exit(1)
})

let server:Server;

async function mainserver() {
 
  try {
    await mongoose.connect(config.databse_url as string)
    logger.info('Database Connection Successful')

    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error ('Failled to connect', error)
  }
  process.on('unhandledRejection',error=>{
    console.log('closing server due to unhandled rejecton')
    if(server){
      server.close(()=>{
      errorLogger.error(error)
      process.exit(1)  
      })
    }
    else{ 
      process.exit(1)
    }

  })
}
mainserver()

process.on('SIGTERM',()=>{
  logger.info('SIGTERM recieved')
  if(server){
    server.close()
  }
})