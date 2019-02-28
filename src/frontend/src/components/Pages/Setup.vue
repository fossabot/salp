<template>
    <div id="page-setup">
        <Steps :active="currentStep">
            <Step v-for="(title, index) in steps" :key="`setup-step-${index}`" :title="title"/>
        </Steps>

        <SectionHeader>{{ steps[currentStep] }}</SectionHeader>

        <router-view @pageTitle="handleStepPageTitle"/>

        <div class="button-container">
            <Button @click="handleNextButtonClick" type="primary">{{ nextButtonLabel }}</Button>
        </div>
    </div>
</template>

<script>
import { Steps, Step, Button } from 'element-ui'
import { namespace, types } from '@/store/modules/persisted/UserPreferences.js'
import SectionHeader from '@/components/Layout/Content/SectionHeader.vue'

// import all steps dynamically
const stepsContext = require.context('../Layout/Setup', false, /\.vue$/)
const steps = stepsContext.keys().map(file => stepsContext(file).default)
let stepsPages = steps.map(step => ({
    name: step.name,
    path: step.name.replace('Setup-', '').toLocaleLowerCase(),
    component: step
}))
stepsPages.unshift({
    path: '',
    name: 'setup',
    redirect: { name: stepsPages[0].name }
})

export { stepsPages }

export default {
    name: 'Setup',
    pageTitleTranslationKey: 'App.pages.setup',
    components: {
        Steps,
        Step,
        Button,

        SectionHeader
    },
    data() {
        return {
            steps: steps.map(s => this.$t(s.pageTitleTranslationKey)),
            nextButtonLabel: this.$t('Pages.Setup.button.next')
        }
    },
    computed: {
        currentStep() {
            // subtract 1 because first page is default/redirect
            return stepsPages.findIndex(s => s.name === this.$route.name) - 1
        }
    },
    methods: {
        handleStepPageTitle(stepTitle) {
            const currentTitle = this.$t(this.options.pageTitleTranslationKey)
            const title = `${currentTitle} - ${stepTitle}`

            this.$emit('pageTitle', title)
        },
        handleNextButtonClick() {
            const stepsCount = steps.length
            const nextStep = this.currentStep + 1

            if (nextStep >= stepsCount) {
                this.$store.commit({
                    type: `${namespace}/${types.SET}`,
                    name: 'setupDone',
                    value: true
                })

                this.$router.push({ name: 'home' })

                return
            }

            // show next step (+1 because first page is default route)
            this.$router.push({ name: stepsPages[nextStep + 1].name })

            if (nextStep === stepsCount - 1) {
                this.nextButtonLabel = this.$t('Pages.Setup.button.start')
            }
        }
    }
}
</script>

<style lang="scss">
#page-setup {
    .button-container {
        display: flex;
        justify-content: center;
        margin-top: 1em;
    }
}
</style>
