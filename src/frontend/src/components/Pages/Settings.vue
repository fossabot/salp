<template>
  <div id="page-settings">
    <Form ref="form" :label-position="'left'" label-width="300px">
        <FormItem label="Allow tracking">
            <ElSwitch v-model="allowTracking" @change="handleTrackingChange"></ElSwitch>
            <span class="form-item__description">Define whether you want to allow user tracking/analytics.</span>
        </FormItem>
        <FormItem :label="$t('Pages.Settings.label.ml')">
            <ElSwitch v-model="ml"></ElSwitch>
            <span class="form-item__description">{{ $t('Pages.Settings.description.ml') }}</span>
        </FormItem>
        <div class="page-settings__docker-settings">
            <div class="status-container">
                <h3>Docker</h3>
                <FormItem :label="$t('Pages.Settings.label.status')">
                    <Tag disable-transitions
                        :type="deamonFound ? 'success': 'danger'">
                    {{ dockerStatus }}
                    </Tag>
                </FormItem>
            </div>
            <FormItem :label="$t('Pages.Settings.label.baseIp')">
                <Input autosize v-model="baseIp"/>
                <span class="form-item__description">{{ $t('Pages.Settings.description.baseIp') }}</span>
            </FormItem>
            <FormItem :label="$t('Pages.Settings.label.socket')">
                <Input autosize v-model="socket"/>
                <span class="form-item__description">{{ $t('Pages.Settings.description.socket') }}</span>
            </FormItem>
            <FormItem :label="$t('Pages.Settings.label.certificate')">
                <Input autosize v-model="certDir" @click.native="handleCertClick"/>
                <span class="form-item__description">{{ $t('Pages.Settings.description.certificate') }}</span>
            </FormItem>
            <FormItem :label="$t('Pages.Settings.label.tls')">
                <ElSwitch v-model="verifyTls" @change="testDocker"></ElSwitch>
                <span class="form-item__description">{{ $t('Pages.Settings.description.tls') }}</span>
            </FormItem>
        </div>
    </Form>
    <ErrorLog :error="errorMessage"/>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { userInputDebounceTimer } from '@/constants'
import { Switch, Form, FormItem, Input, Tag } from 'element-ui'
import { namespace, types } from '@/store/modules/AppState.js'
import { GENERAL_NAMESPACE, ALLOW_TRACKING, MACHINE_LEARNING } from '@/store/modules/settings/general'
import { DOCKER_NAMESPACE, VERIFY_TLS, BASE_IP, CERT_DIR, SOCKET } from '@/store/modules/settings/docker'
import { ipcRenderer, remote } from 'electron'
import ErrorLog from '@/components/Elements/ErrorLog.vue'

export default {
    name: 'Settings',
    pageTitleTranslationKey: 'App.pages.settings',
    components: {
        /* eslint-disable-next-line vue/no-unused-components */
        [Switch.name]: Switch,
        Form,
        FormItem,
        Input,
        Tag,
        ErrorLog
    },
    computed: {
        allowTracking: {
            get() {
                return this.$store.state.settings.general[ALLOW_TRACKING]
            },
            set(value) {
                this.$store.dispatch({
                    type: GENERAL_NAMESPACE + '/' + ALLOW_TRACKING,
                    value
                })
            }
        },
        ml: {
            get() {
                return this.$store.state.settings.general[MACHINE_LEARNING]
            },
            set(value) {
                this.$store.dispatch({
                    type: GENERAL_NAMESPACE + '/' + MACHINE_LEARNING,
                    value
                })
            }
        },
        verifyTls: {
            get() {
                return this.$store.state.settings.docker[VERIFY_TLS]
            },
            set(value) {
                this.$store.dispatch({
                    type: DOCKER_NAMESPACE + '/' + VERIFY_TLS,
                    value
                })
            }
        },
        baseIp: {
            get() {
                return this.$store.state.settings.docker[BASE_IP]
            },
            set(value) {
                this.$store.dispatch({
                    type: DOCKER_NAMESPACE + '/' + BASE_IP,
                    value
                })
            }
        },

        deamonFound() {
            this.testDocker()

            return this.$store.getters[namespace + '/' + types.GET_DOCKER_READY]
        },
        errorMessage() {
            return this.$store.getters[namespace + '/' + types.GET_DOCKER_ERROR]
        },
        dockerStatus() {
            return this.deamonFound ? 'Docker found and ready to use' : 'Docker not found'
        },
        certDir: {
            set(value) {
                this.$store.dispatch({
                    type: DOCKER_NAMESPACE + '/' + CERT_DIR,
                    value
                })

                this.testDocker()
            },
            get() {
                return this.$store.state.settings.docker[CERT_DIR]
            }
        },
        socket: {
            set(value) {
                this.$store.dispatch({
                    type: DOCKER_NAMESPACE + '/' + SOCKET,
                    value
                })

                this.testDocker()
            },
            get() {
                return this.$store.state.settings.docker[SOCKET]
            }
        }
    },
    methods: {
        testDocker: debounce(() => {
            ipcRenderer.send('docker:test')
        }, userInputDebounceTimer * 2),
        handleCertClick() {
            const path = remote.dialog.showOpenDialog({ properties: ['openDirectory'] })
            if (path) {
                this.certDir = path[0]
            }
        },
        handleTrackingChange() {
            if (this.allowTracking) {
                this.$matomo.setConsentGiven()
            } else {
                this.$matomo.forgetConsentGiven()
            }
        }
    }
}
</script>

<style lang="scss">
.form-item__description {
    display: block;
    font-size: $--font-size-small;
    line-height: 1em;
    color: $--color-info;
    margin-top: 0.5em;
}

.el-input {
    max-width: 40em;
}
</style>
