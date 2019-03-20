<template>
    <div id="setup-tracking">
        <p>
            {{ $t('Pages.Setup.contents.Tracking.part1') }}
            <ExternalLink href="https://matomo.org/">Matomo</ExternalLink>
            {{ $t('Pages.Setup.contents.Tracking.part2') }}
        </p>

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
import { namespacedTypes as persistedTypes } from '@/store/modules/persisted'
import ExternalLink from '@/components/Elements/ExternalLink.vue'

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
    computed: {
        allowTracking: {
            get() {
                return this.$store.getters[persistedTypes.GET_ALLOW_TRACKING]
            },
            set(value) {
                this.$store.commit({
                    type: persistedTypes.SET_ALLOW_TRACKING,
                    value
                })
            }
        }
    }
}
</script>
