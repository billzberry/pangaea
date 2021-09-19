import express from 'express'
import HomeRouter from './routers/HomeRouter'
import PublishRouter from './routers/PublishRouter'
import SubscribeRouter from './routers/SubscribeRouter'

/**
 * Publisher Server
 * This server serves or processes all publishing requests
 */
class Publisher {
    private _Host:string = '127.0.0.1'
    private _Port:number = 8000
    private _Server:express.Application

    constructor() {
        this._Server = express()
        this.startServer()
    }

    /**
     * startServer()
     * This method starts the running process of Publisher Server
     */
    private startServer() {
        //Let server process incoming body data as json
        this._Server.use(express.json())

        //Also optionally process url encoded body data
        this._Server.use(express.urlencoded({extended: false}))

        //Router to serve the home route
        this._Server.use('/', HomeRouter)

        //Router to serve subscriptions
        this._Server.use('/subscribe', SubscribeRouter)

        //Router to serve the publish route
        this._Server.use('/publish', PublishRouter)

        //Start server and listen to port
        this._Server.listen(this._Port, this._Host, () => {
            console.log(`Publisher Server has started and running on http://${this._Host}:${this._Port}`)
        })
    }
}

export default Publisher