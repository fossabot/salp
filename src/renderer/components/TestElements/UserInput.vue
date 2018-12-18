<template>
    <div class="user-input__container" v-bind:class="{left: isLeftPosition, top: isTopPosition}">
        <h1 class="user-input__container__text">{{ question }}</h1>
        <Input class="user-input__container__input" :value="answer" @input="handleInput" placeholder="Insert Answer"/>
    </div>
</template>

<script>
import { Input } from 'element-ui'

export default {
    name: 'UserInput',
    components: {
        Input
    },
    model: {
        prop: 'answer',
        event: 'change'
    },
    props: {
        question: {
            type: String,
            required: true
        },
        questionPosition: {
            type: String,
            default() {
                return 'top'
            }
        },
        answer: String
    },
    data() {
        return {

        }
    },
    computed: {
        isLeftPosition() {
            return this.questionPosition === 'left' || this.questionPosition === 'Left'
        },
        isTopPosition() {
            return this.questionPosition === 'top' || this.questionPosition === 'Top'
        }
    },
    methods: {
        handleInput(value) {
            this.$emit('change', value)
        }
    }
}
</script>

<style lang="scss">
.user-input__container {
    display: flex;

    .user-input__container__input {
        width: fit-content;
        margin-left: 1em;
    }
}

.left {
    flex-direction: row;
}

.top {
    flex-direction: column;
}
</style>
