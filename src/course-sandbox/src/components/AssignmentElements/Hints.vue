<template>
    <div class="hints-container">
        <div v-if="!showHints" class="hints__button-container">
            <Button v-if="!showHints" class="assignment-content__hints-container__show-button .piwikContentIgnoreInteraction"
                    @click="handleButtonClick">Show Hint</Button>
        </div>
        <div v-if="showHints" class="hints__content-container">
            <SimpleText>If a hint is useful, please check it.</SimpleText>
            <CheckboxGroup class="hints__checkbox-group" v-model="checked"
                           :min="0" :max="getMaxHints" @change="handleChange">
                <HintCheckbox v-for="(hint, index) in hints" :hint="hint" :assignmentName="assignmentName"
                              :retries="retries" :key="`hint_${index}`"/>
            </CheckboxGroup>
        </div>
    </div>
</template>

<script>
import { CheckboxGroup } from 'element-ui'
import HintCheckbox from './HintCheckbox'
import SimpleText from '../ContentElements/SimpleText'

export default {
    name: 'Hints',
    components: {
        CheckboxGroup,
        SimpleText,
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
            buttonText: this.$t('Assignment.button.hints'),
            showHints: false,
            checked: []
        }
    },
    methods: {
        handleChange(checked) {
            // this.$matomo.trackEvent(this.assignmentName + '_assignment', 'mc_' + this.question, '' + this.answer, checked ? 1 : 0)
        },
        handleButtonClick() {
            this.$emit('selected', checked)
        }
    },
    computed: {
        getMaxHints() {
            return this.hints.length
        }
    }
}
</script>
