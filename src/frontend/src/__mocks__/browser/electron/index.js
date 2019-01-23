// Mock electron APIs for use in browser
import remote from './remote'
import ipcRenderer from './ipcRenderer'
import shell from './shell'

export {
    remote,
    shell,
    ipcRenderer
}
