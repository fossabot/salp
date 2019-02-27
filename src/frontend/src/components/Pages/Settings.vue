<template>
  <div id="page-settings">
    <Form ref="form" :label-position="'left'" label-width="300px">
        <FormItem label="Allow tracking">
            <ElSwitch v-model="allowTracking"></ElSwitch>
            <span class="form-item__description">Define whether you want to allow user tracking/analytics.</span>
        </FormItem>
        <FormItem label="Use Machine Learning">
            <ElSwitch v-model="ml"></ElSwitch>
            <span class="form-item__description">If Machine Learning is switched on, you will recieve recommendations for courses and hinds
        based on your inputs.</span>
        </FormItem>
        <FormItem label="Homepath">
            <Input autosize v-model="path"/>
            <span class="form-item__description">Path to your home folder.</span>
        </FormItem>
    </Form>
  </div>
</template>

<script>
import { Switch, Form, FormItem, Input } from 'element-ui'
import { createHelpers } from '@/store/modules/persisted/UserPreferences.js'

const { mapStateTwoWay } = createHelpers()

export default {
    name: 'Settings',
    pageTitleTranslationKey: 'App.pages.settings',
    components: {
        /* eslint-disable-next-line vue/no-unused-components */
        [Switch.name]: Switch,
        Form,
        FormItem,
        Input
    },
    computed: mapStateTwoWay(['allowTracking', 'ml', 'path'])
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
