import { NextFunction, Request, Response } from "express"
import config from "../../config"
import { IGenericErrorMessage } from "../../interfaces/error";
import handleValidationError from "../../errors/handleValidationError";
import { error } from "winston";
import ApiError from "../../errors/ApiError";
const globalErorHandler = ((err:any ,req:Request,res:Response,next:NextFunction)=>{
    
   
    let statusCode=500;
    let message = 'Somethin went wrong!'
    let errorMessages :  IGenericErrorMessage[] = []

    if(err?.name === 'validationError' ){
        const simplifiedError = handleValidationError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages
        }
        else if (error instanceof ApiError) {
            statusCode = error?.statusCode
            message = error.message
            errorMessages = error?.message
              ? [
                  {
                    path: '',
                    message: error?.message,
                  },
                ]
              : []
          }


        else if(error instanceof Error){
            message = error?.message
            errorMessages = error?.message?
            [
                {
                    path :"",
                    message : error?.message
                }
            ]:
            []
        }
       
            res.status(400).json({err:err})
            res.status(statusCode).json({
                success:false,
                message,
                errorMessages,
                stack:config.env !== 'production' ? err.stack:undefined
            })
        
   

    next()
})
export default globalErorHandler;