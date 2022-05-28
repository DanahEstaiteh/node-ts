import express from 'express'
import connect from '../core/db'
import { Request,Response,NextFunction , ErrorRequestHandler} from 'express'
import userRouter from '../modules/user/routes'
import { ApiError } from '../errors/ApiError'
import auditQueue from '../queues/auditLog'
import responseTime from 'response-time'
import {ITimeRequest} from "../types/ITimeRequest"
import {Methods} from '../types/Ilog'
import {createBullBoard} from '@bull-board/api'
import {BullAdapter} from '@bull-board/api/bullAdapter.js'
import {ExpressAdapter} from '@bull-board/express'


const port : number= 3000


connect().then(()=>{
    const app =express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
  
    app.use(responseTime((req : ITimeRequest, res, time) => {
     let Who, What, Method, How,When,ResponseTime 
     Who = req.userId
     What = `localhost:${port}${req.url}`
     Method= Methods[req.method]
     How = res.statusCode
     When = new Date()
     ResponseTime=time
     if(!What.includes('/queues')){
        auditQueue.add({Who, What, Method, How,When,ResponseTime})
     }

      }));
    app.use('/users', userRouter)

    const serverAdapter = new ExpressAdapter();
    createBullBoard({
       queues: [new BullAdapter(auditQueue)],
       serverAdapter: serverAdapter,
     });


    app.use((err : ErrorRequestHandler, req : Request, res : Response, next : NextFunction) => {
        if (err instanceof ApiError) {
            return res.status(err.code).json(err)
        }
        res.status(500).send({
            code: 500,
            message: 'Something broke!'
        })
    })
     
    serverAdapter.setBasePath('/admin/queues');
    app.use('/admin/queues', serverAdapter.getRouter());

    app.listen(port,async ()=>{
        console.log("App is running...")
    })
    
    
}).catch((error)=>{
    console.log(error)
})