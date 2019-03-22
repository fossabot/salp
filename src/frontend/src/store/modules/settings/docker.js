// Docker settings in vuex store
import createSettingsModule from './module'

// types
export const DOCKER_NAMESPACE = 'settings/docker'
export const SOCKET = 'socket'
export const VERIFY_TLS = 'verify_tls'
export const CERT_DIR = 'cert_dir'
export const BASE_IP = 'base_ip'

// store
export default createSettingsModule({
    [SOCKET]: '',
    [VERIFY_TLS]: false,
    [CERT_DIR]: '',
    [BASE_IP]: '127.0.0.1'
})
