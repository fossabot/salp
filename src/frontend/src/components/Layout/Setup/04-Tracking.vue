<template>
    <div id="setup-tracking">
        {{ $t('Pages.Setup.contents.Tracking.part1') }}
        <ExternalLink href="https://matomo.org/">Matomo</ExternalLink>
        {{ $t('Pages.Setup.contents.Tracking.part2') }}

        {{ $t('Pages.Setup.contents.Tracking.optOut') }}
        <Form>
            <FormItem :label="$t('Pages.Setup.contents.Tracking.allowTracking')">
                <ElSwitch v-model="allowTracking"></ElSwitch>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import { Form, FormItem, Switch } from 'element-ui'
import { createHelpers } from '@/store/modules/persisted/UserPreferences.js'
import ExternalLink from '@/components/Elements/ExternalLink.vue'

const { mapStateTwoWay } = createHelpers()

export default {
    name: 'Setup-Tracking',
    pageTitleTranslationKey: 'Pages.Setup.Steps.Tracking',
    components: {
        Form,
        FormItem,
        /* eslint-disable-next-line vue/no-unused-components */
        [Switch.name]: Switch,

        ExternalLink
    },
    computed: mapStateTwoWay(['allowTracking'])
}
</script>
