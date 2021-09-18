import express from 'express'

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
        this._Server.use(express.json())
        this._Server.use(express.urlencoded({extended: false}))

        this._Server.get('/', (request:express.Request, response:express.Response) => {
            response.status(200).json({
                status: 'Success',
                message: 'Welcome to the subscriber'
            })
        })

        this._Server.listen(this._Port, this._Host, () => {
            console.log(`Subscriber Server has started and running on http://${this._Host}:${this._Port}`);
        })
    }
}

export default Subscriber