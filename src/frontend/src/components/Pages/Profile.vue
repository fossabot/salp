<template>
    <div id="page-profile">
        <div class="profile-info__container">
            <h3>
                <Icon icon="faUser"/>
                <span class="user-icon__text">{{ $t('Pages.Profile.description.user') }}</span>
            </h3>
            <Form ref="form" labelPosition="left" :inline="true" class="profile-form">
                <FormItem :label="$t('Pages.Profile.description.usernameLabel')">
                    <ElInput autosize v-model="username">
                        <Icon icon="faEdit" slot="suffix"/>
                    </ElInput>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import { Form, FormItem, Input } from 'element-ui'
import { faEdit, faUser } from '@fortawesome/free-regular-svg-icons'
import { createHelpers } from '@/store/modules/persisted/UserPreferences.js'

const { mapStateTwoWay } = createHelpers()

export default {
    name: 'Profile',
    pageTitleTranslationKey: 'App.pages.profile',
    components: {
        Form,
        FormItem,
        /* eslint-disable-next-line vue/no-unused-components */
        [Input.name]: Input
    },
    icons: {
        faEdit,
        faUser
    },
    data() {
        return {
            label: 'Edit'
        }
    },
    computed: {
        ...mapStateTwoWay(['username'])
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

.user-icon__text {
    margin-left: 0.5em;
}

.el-input {
    max-width: 40em;
}

.statistics-coursesoverview {
    margin-top: 2em;
}

.profile-statistics-icon__container {
    display: flex;
    margin-bottom: 1em;

    .statistics-icon__text {
        margin-left: 0.5em;
    }
}
</style>
