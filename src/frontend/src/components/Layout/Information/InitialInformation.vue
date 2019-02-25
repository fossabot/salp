<template>
    <div id="initial-information">
        <Steps :active="currentStep">
            <Step v-for="(title, index) in steps" :key="`initial-step${index}`" :title="title"/>
        </Steps>
        <Heading v-if="currentStep === 0" :level="1">{{ $t('Pages.InitialInformation.text.salp.heading') }}</Heading>
        <SimpleText v-if="currentStep === 0">
            {{ $t('Pages.InitialInformation.text.salp.text') }}
        </SimpleText>
        <SimpleText v-if="currentStep === 1">
            {{ $t('Pages.InitialInformation.text.username') }}
            <Form ref="form" labelPosition="left" :inline="true" class="profile-form">
                <FormItem :label="$t('Pages.Profile.description.usernameLabel')">
                    <ElInput autosize v-model="username">
                        <Icon icon="faEdit" slot="suffix"/>
                    </ElInput>
                </FormItem>
            </Form>
        </SimpleText>
        <SimpleText v-if="currentStep === 2">
            {{ $t('Pages.InitialInformation.text.docker.description1') }}<SimpleLink href="https://www.docker.com/">Docker</SimpleLink>{{ $t('Pages.InitialInformation.text.docker.description2') }}
        </SimpleText>
        <SimpleText v-if="currentStep === 2">
            {{ $t('Pages.InitialInformation.text.docker.installation1') }}<SimpleLink href="https://docs.docker.com/install/">{{ $t('Pages.InitialInformation.text.docker.install') }}</SimpleLink>{{ $t('Pages.InitialInformation.text.docker.installation2') }}
        </SimpleText>
        <SimpleText v-if="currentStep === 3">
            {{ $t('Pages.InitialInformation.text.matomo.part1') }} <SimpleLink href="https://matomo.org/">Matomo</SimpleLink>{{ $t('Pages.InitialInformation.text.matomo.part2') }}
        </SimpleText>
        <SimpleText v-if="currentStep === 3">
            {{ $t('Pages.InitialInformation.text.matomo.optOut') }}
            <Form>
                <FormItem :label="$t('Pages.InitialInformation.text.matomo.allowTracking')">
                    <ElSwitch v-model="allowTracking"></ElSwitch>
                </FormItem>
            </Form>
        </SimpleText>
        <SimpleText v-if="currentStep === 4">
            {{ $t('Pages.InitialInformation.text.ready') }}
        </SimpleText>
        <div class="button-container">
            <Button @click="handleButtonClick" type="primary">{{ buttonText }}</Button>
        </div>
    </div>
</template>

<script>
import { Switch, FormItem, Form, Steps, Step, Button, Input } from 'element-ui'
import { createHelpers, namespace as userPreferencesNamespace, types as userPreferencesTypes } from '@/store/modules/persisted/UserPreferences.js'
import Heading from '@/components/ContentElements/Heading.vue'
import SimpleText from '@/components/ContentElements/SimpleText.vue'
import SimpleLink from '@/components/ContentElements/SimpleLink.vue'

const { mapStateTwoWay } = createHelpers()

export default {
    name: 'InitialInformation',
    pageTitleTranslationKey: 'App.pages.home',
    components: {
        /* eslint-disable-next-line vue/no-unused-components */
        [Switch.name]: Switch,
        /* eslint-disable-next-line vue/no-unused-components */
        [Input.name]: Input,
        Button,
        Steps,
        Step,
        Heading,
        SimpleText,
        Form,
        FormItem,
        SimpleLink
    },
    data() {
        return {
            steps: [
                this.$t('Pages.InitialInformation.description.salp'),
                this.$t('Pages.InitialInformation.description.username'),
                this.$t('Pages.InitialInformation.description.docker'),
                this.$t('Pages.InitialInformation.description.matomo'),
                this.$t('Pages.InitialInformation.description.start')
            ],
            currentStep: 0,
            buttonText: this.$t('Pages.InitialInformation.button.next')
        }
    },
    computed: mapStateTwoWay(['allowTracking', 'username']),
    methods: {
        handleButtonClick() {
            if (this.currentStep === this.steps.length - 1) {
                this.$store.commit({
                    type: `${userPreferencesNamespace}/${userPreferencesTypes.SET}`,
                    name: 'showInitialInformation',
                    value: false
                })
            }

            if (this.currentStep + 1 === this.steps.length - 1) {
                this.buttonText = this.$t('Pages.InitialInformation.button.start')
            }

            if (this.currentStep < this.steps.length - 1) {
                this.currentStep = this.currentStep + 1
            }
        }
    }
}
</script>
<style lang="scss">
#initial-information {
    .button-container {
        display: flex;
        justify-content: center;
        margin-top: 1em;
    }
}
</style>
