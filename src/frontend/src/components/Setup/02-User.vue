<template>
    <div id="setup-user">
        {{ $t('Pages.Setup.contents.User.username') }}
        <Form ref="form" labelPosition="left" :inline="true" class="profile-form">
            <FormItem :label="$t('Pages.Profile.description.usernameLabel')">
                <ElInput autosize v-model="username">
                    <Icon icon="faEdit" slot="suffix"/>
                </ElInput>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import { Form, FormItem, Input } from 'element-ui'
import { namespacedTypes as persistedTypes } from '@/store/modules/persisted'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export default {
    name: 'Setup-User',
    pageTitleTranslationKey: 'Pages.Setup.Steps.User',
    components: {
        Form,
        FormItem,
        /* eslint-disable-next-line vue/no-unused-components */
        [Input.name]: Input
    },
    icons: {
        faEdit
    },
    computed: {
        username: {
            get() {
                return this.$store.getters[persistedTypes.GET_USERNAME]
            },
            set(value) {
                this.$store.commit({
                    type: persistedTypes.SET_USERNAME,
                    value
                })
            }
        }
    }
}
</script>
