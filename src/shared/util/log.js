import { isDebug, isElectronMainProcess } from './env'
import log from 'electron-log'

export function setup() {
    // Configure logging
    if (isElectronMainProcess) {
        if (isDebug) {
            log.transports.file.level = false
            log.transports.console.level = 'debug'
        } else {
            log.transports.console.level = false
        }
    }
}

export default log
