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

    ipcRenderer.on('docker:ready', (event, ready, message) => {
        if (!ready) {
            store.commit(`${namespace}/${types.SET_DOCKER_ERROR}`, { message })
        } else {
            store.commit(`${namespace}/${types.SET_DOCKER_ERROR}`, '')
        }
        store.commit(`${namespace}/${types.SET_DOCKER_READY}`, { ready })
    })

    ipcRenderer.on('docker:pullProgress', (event, current, total) => {
        store.commit(`${namespace}/${types.SET_DOCKER_PULL_PROGRESS}`, { current, total })
    })
}
