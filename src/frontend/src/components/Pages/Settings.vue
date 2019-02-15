<template>
  <div id="page-settings">
    <Form ref="form" :label-position="'left'" label-width="300px">
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
                <Input autosize v-model="baseIp" @blur="testDocker"/>
                <span class="form-item__description">{{ $t('Pages.Settings.description.baseIp') }}</span>
            </FormItem>
            <FormItem :label="$t('Pages.Settings.label.socket')">
                <Input autosize v-model="socket" @blur="testDocker"/>
                <span class="form-item__description">{{ $t('Pages.Settings.description.socket') }}</span>
            </FormItem>
            <FormItem :label="$t('Pages.Settings.label.certificate')">
                <Input autosize v-model="certDir" @click.native="handleCertClick" @blur="testDocker"/>
                <span class="form-item__description">{{ $t('Pages.Settings.description.certificate') }}</span>
            </FormItem>
            <FormItem :label="$t('Pages.Settings.label.tls')">
                <ElSwitch v-model="verifyTls" @click.native="testDocker"></ElSwitch>
                <span class="form-item__description">{{ $t('Pages.Settings.description.tls') }}</span>
            </FormItem>
        </div>
    </Form>
    <ErrorLog :error="errorMessage"/>
  </div>
</template>

<script>
import { Switch, Form, FormItem, Input, Tag } from 'element-ui'
import { namespace, types } from '@/store/modules/AppState.js'
import { createHelpers } from '@/store/modules/persisted/UserPreferences.js'
import { ipcRenderer, remote } from 'electron'
import ErrorLog from '@/components/Elements/ErrorLog.vue'

const { mapStateTwoWay } = createHelpers()

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
        ...mapStateTwoWay(['ml', 'socket', 'certDir', 'verifyTls', 'baseIp']),
        deamonFound() {
            this.testDocker()

            return this.$store.getters[namespace + '/' + types.GET_DOCKER_READY]
        },
        errorMessage() {
            return this.$store.getters[namespace + '/' + types.GET_DOCKER_ERROR]
        },
        dockerStatus() {
            return this.deamonFound ? 'Docker found and ready to use' : 'Docker not found'
        }
    },
    methods: {
        testDocker() {
            ipcRenderer.send('docker:test')
        },
        handleCertClick() {
            const path = remote.dialog.showOpenDialog({ properties: ['openDirectory'] })
            if (path) {
                this.certDir = path[0]
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
