import express from 'express'
import LogWriter from '../models/LogWriter'

const ServerLogger = (request:express.Request, response:express.Response, next:express.NextFunction) => {
    const url = request.url

    const method = request.method

    const currentDateTime = new Date()

    const date = currentDateTime.toLocaleDateString()

    const time = currentDateTime.toLocaleTimeString()

    const logData:string = `[${url}] - [${method}] - [${date}] - [${time}]`

    LogWriter('../publisher/logs', 'request', logData)

    next()
}

export default ServerLogger