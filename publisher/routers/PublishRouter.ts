import axios from 'axios'
import express from 'express'
import DataStore from '../../data/DataStore'
import LogWriter from '../../models/LogWriter'

const PublishRouter:express.Router = express.Router()

PublishRouter.post('/:id', async (request:express.Request, response:express.Response) => {
    try {
        const dataStore:DataStore = new DataStore()
        let result = dataStore.getSubscribers(request.params.id)
        if (Array.isArray(result) && result.length > 0) {
            for (let i = 0; i < result.length; i++) {
                const url = result[i];
                forwardToSubscribers(url, {
                    topic: request.params.id,
                    data: request.body
                })
            }
            response.status(200).json({
                status: 'Success',
                message: 'Post is published successfully'
            })
        } else {
            response.status(502).json({
                status: 'Bad Gateway',
                message: 'Something went wrong!'
            })
        }
    } catch (error) {
        LogWriter('../publisher/logs', 'error', `Error publishing: => ${JSON.stringify(error)}`)
        response.status(502).json({
            status: 'Bad Gateway',
            message: 'Something went wrong'
        })
    }
})

export default PublishRouter

async function forwardToSubscribers(url:string, data:object) {
    await axios.post(url, data).then(response => {
        LogWriter('../publisher/logs', 'system', `Post to subscriber server response: => ${JSON.stringify(response.status)}`)
    }).catch(error => {
        LogWriter('../publisher/logs', 'error', `Error posting to subscriber server response: => ${JSON.stringify(error)}`)
    })
}