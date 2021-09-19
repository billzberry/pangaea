import {readFileSync, writeFileSync} from 'fs'
import LogWriter from '../models/LogWriter'

type dataItem = {
    topic:string,
    url:string
}

class DataStore {
    private _dataStore:any

    constructor() {
        this._dataStore = readFileSync(__dirname+'/MainData.json')
        this._dataStore = JSON.parse(this._dataStore)
    }

    public insert(data:dataItem):boolean {
        try {
            if (this._dataStore[data.topic]) {
                this._dataStore[data.topic].push(data.url)
            } else {
                this._dataStore[data.topic] = [data.url]
            }
            writeFileSync(__dirname+'/MainData.json', JSON.stringify(this._dataStore))
            return true
        } catch (error) {
            LogWriter('../publisher/logs', 'error', `Error inserting data: => ${JSON.stringify(error)}`)
            return false
        }
    }

    public getSubscribers(topic:string):any {
        try {
            if (this._dataStore[topic]) {
                return this._dataStore[topic]
            } else {
                return []
            }
        } catch (error) {
            LogWriter('../publisher/logs', 'error', `Error getting subscribers: => ${JSON.stringify(error)}`)
            return []
        }
    }
}

export default DataStore