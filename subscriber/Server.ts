import express from 'express'
import ServerLogger from '../middleware/SubscriberMiddleware'
import LogWriter from '../models/LogWriter'

/**
 * Subscriber Server
 * This server serves or processes all subscribing requests
 */
class Subscriber {
    private _Host:string = '127.0.0.1'
    private _Port:number = 9000
    private _Server:express.Application

    constructor() {
        this._Server = express()
        this.startServer()
    }

    /**
     * startServer()
     * This method starts the running process of Subscriber Server
     */
    private startServer() {
        //Logger middleware
        this._Server.use(ServerLogger)

        this._Server.use(express.json())
        this._Server.use(express.urlencoded({extended: false}))

        this._Server.get('/', (request:express.Request, response:express.Response) => {
            response.status(200).json({
                status: 'Success',
                message: 'Welcome to the subscriber'
            })
        })

        this._Server.post('/:id', (request:express.Request, response:express.Response) => {
            LogWriter('../subscriber/logs', 'system', `Subscriber endpoint ${request.params.id} received: => ${JSON.stringify(request.body)}`)
            response.status(200).json({
                status: 'Success',
                message: 'Data received successfully'
            })
        })

        this._Server.listen(this._Port, this._Host, () => {
            LogWriter('../subscriber/logs', 'system', `Subscriber Server has started and running on http://${this._Host}:${this._Port}`)
        })
    }
}

export default Subscriber