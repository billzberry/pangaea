import express from 'express'
import DataStore from '../../data/DataStore'

const PublishRouter:express.Router = express.Router()

PublishRouter.post('/:id', (request:express.Request, response:express.Response) => {
    try {
        response.status(200).json({
            topic: request.params,
            data: request.body
        })
    } catch (error) {
        console.log(`Error publishing: => `, error)
        response.status(502).json({
            status: 'Bad Gateway',
            message: 'Something went wrong'
        })
    }
})

export default PublishRouter