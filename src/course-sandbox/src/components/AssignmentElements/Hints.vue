<template>
    <div class="hints-container">
        <div v-if="!showHints" class="hints__button-container">
            <Button v-if="!showHints" class="assignment-content__hints-container__show-button .piwikContentIgnoreInteraction"
                    type="info" size="mini" :round="true" @click="handleButtonClick">{{ $t('Assignment.button.hint') }}</Button>
        </div>
        <div v-if="showHints" class="hints__content-container">
            <div class="hints-heading-container">
                <h2>If a hint is useful, please check it.</h2>
            </div>
            <CheckboxGroup class="hints__checkbox-group" v-model="checked"
                           :min="1" :max="getMaxHints" @change="handleChange">
                <HintCheckbox v-for="(hint, index) in getHints" :hint="hint" :assignmentName="assignmentName"
                              :retries="retries" :key="`hint_${index}`"/>
            </CheckboxGroup>
        </div>
    </div>
</template>

<script>
import { CheckboxGroup, Button } from 'element-ui'
import HintCheckbox from './HintCheckbox'

export default {
    name: 'Hints',
    components: {
        Button,
        CheckboxGroup,
        HintCheckbox
    },
    props: {
        hints: {
            type: Array,
            required: true
        },
        assignmentName: {
            type: String,
            required: true
        },
        retries: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            showHints: false,
            checked: []
        }
    },
    methods: {
        handleChange(checked) {
            this.$matomo.trackEvent(this.assignmentName + '_assignment', 'hint', 'selected' + checked)
            this.$emit('hintEvent', false)
        },
        handleButtonClick() {
            this.showHints = true
            this.$emit('hintEvent', true)
        }
    },
    computed: {
        getMaxHints() {
            return this.getHints.length
        },
        getHints() {
            let hints = this.hints
            const none = 'None is useful'
            if (!hints.includes(none)) {
                hints.push(none)
            }

            return hints
        }
    }
}
</script>
<style lang="scss">
.hints-container {
    .hints-heading-container {
        display: flex;
        justify-content: center;
        margin-bottom: .5em;
    }
}
</style>
