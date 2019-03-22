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
import { mapSettings } from '@/store/modules/settings/utils'
import { GENERAL_NAMESPACE, USERNAME } from '@/store/modules/settings/general'
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
    computed: mapSettings(GENERAL_NAMESPACE, {
        username: USERNAME
    })
}
</script>
