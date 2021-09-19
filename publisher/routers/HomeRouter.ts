import express from 'express'
// import LogWriter from '../../models/LogWriter'

const HomeRouter:express.Router = express.Router()
/**
 * Home Get Router
 * eg. http://127.0.0.1:8000
 */
HomeRouter.get('/', (request:express.Request, response:express.Response) => {
    response.status(200).json({
        status: 'Success',
        message: 'Welcome to the publisher'
    })
})

export default HomeRouter