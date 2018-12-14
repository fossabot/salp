<template functional>
    <blockquote class="contentelement-quote">
        <div class="contentelement-quote__content-container">
            <SimpleText class="contentelement-quote__text">
                "{{ props.quote }}"
            </SimpleText>
        </div>

        <cite class="contentelement-quote__cite" v-if="slots().source">
            <slot name="source"/>
        </cite>
    </blockquote>
</template>

<script>
import SimpleText from './SimpleText.vue'

export default {
    name: 'Quote',
    functional: true,
    components: {
        SimpleText
    },
    props: {
        quote: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss">
.contentelement-quote {
    margin: 1em 0 1em 2em;
    padding: 1em;
    border-left: 8px solid $--color-primary;

    .contentelement-quote__content-container {
        color: $--color-text-regular;
    }

    .contentelement-quote__cite::before {
        display: inline-block;
        margin-right: 0.5em;
        content: '—';
    }
}
</style>
