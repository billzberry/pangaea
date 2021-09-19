import { createWriteStream, existsSync, mkdirSync } from 'fs'

/**
 * 
 * @param pathToLogDirectory - The path to the directory where log files are stored
 * @param logType - The type of file the log message should be written into [error, system, request]
 * @param data - The message to be written
 */
const LogWriter = (pathToLogDirectory: string, logType: string, data: string) => {
    try {
        const logFile: string = logType + '.log'
        const currentDate = new Date()

        let logWriteStream:any

        if (!existsSync(__dirname + '/' + pathToLogDirectory)) {
            mkdirSync(__dirname + '/' + pathToLogDirectory)
        }
        logWriteStream = createWriteStream(__dirname + '/' + pathToLogDirectory + '/' + logFile, { flags: 'a' })
        logWriteStream.write(`=>>>>>>>>>>>>> [${currentDate.toLocaleDateString()}] - [${currentDate.toLocaleTimeString()}] \n` + data + ` \n\n`)
        logWriteStream.end();
    } catch (error) {
        console.log(`Writing log failed: ===>`, error);
    }
}

export default LogWriter


