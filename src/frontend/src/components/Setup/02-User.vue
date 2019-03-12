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
import { createHelpers } from '@/store/modules/persisted/UserPreferences.js'

const { mapStateTwoWay } = createHelpers()

export default {
    name: 'Setup-User',
    pageTitleTranslationKey: 'Pages.Setup.Steps.User',
    components: {
        Form,
        FormItem,
        /* eslint-disable-next-line vue/no-unused-components */
        [Input.name]: Input
    },
    computed: mapStateTwoWay(['username'])
}
</script>
