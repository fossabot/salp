// Docker settings in vuex store
import createSettingsModule from './module'
import { SOCKET, VERIFY_TLS, CERT_DIR, BASE_IP  } from './docker-types'

// types
export const DOCKER_NAMESPACE = 'settings/docker'
export { SOCKET, VERIFY_TLS, CERT_DIR, BASE_IP }

// store
export default createSettingsModule({
    [SOCKET]: '',
    [VERIFY_TLS]: false,
    [CERT_DIR]: '',
    [BASE_IP]: '127.0.0.1'
})
