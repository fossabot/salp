// Plugin to persist stores
import { ipcRenderer } from 'electron'
import { namespace, types } from '@/store/modules/AppState.js'

export default function docker(store) {
    ipcRenderer.on('docker:status', (event, containerName, status) => {
        store.commit(`${namespace}/${types.SET_CONTAINER_STATUS}`, { containerName, status })
    })

    ipcRenderer.on('docker:port', (event, containerName, containerPort, hostPorts) => {
        store.commit(`${namespace}/${types.SET_CONTAINER_PORT}`, { containerName, containerPort, hostPorts })
    })
}
