import {readFileSync, writeFileSync} from 'fs'

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
            console.log(`Error inserting data: => `, error)
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
            console.log(`Error getting subscribers: => `, error)
            return []
        }
    }
}

export default DataStore