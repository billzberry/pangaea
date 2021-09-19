import express from 'express'

const HomeRouter:express.Router = express.Router()

HomeRouter.get('/', (request:express.Request, response:express.Response) => {
    response.status(200).json({
        status: 'Success',
        message: 'Welcome to the publisher'
    })
})

export default HomeRouter