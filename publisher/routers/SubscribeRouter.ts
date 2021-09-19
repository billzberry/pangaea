import express from 'express'
import DataStore from '../../data/DataStore'
import LogWriter from '../../models/LogWriter'

const SubscribeRouter:express.Router = express.Router()

SubscribeRouter.post('/:id', (request:express.Request, response:express.Response) => {
    try {
        const dataStore:DataStore = new DataStore()

        let result = dataStore.insert({
            topic: request.params.id,
            url: request.body.url
        })
        if (result) {
            response.status(200).json({
                url: request.body.url,
                topic: request.params.id
            })
        } else {
            response.status(502).json({
                status: 'Bad Gateway',
                message: 'Something went wrong!'
            })
        }
    } catch (error) {
        LogWriter('../publisher/logs', 'error', `Error posting subscriber topic: => ${JSON.stringify(error)}`)
        response.status(502).json({
            status: 'Bad Gateway',
            message: 'Something went wrong'
        })
    }
})

export default SubscribeRouter


