<template functional>
    <blockquote class="contentelement-quote">
        <div class="contentelement-quote__content-container">
            <slot class="contentelement-quote__content"></slot>
        </div>

        <cite class="contentelement-quote__cite" v-if="slots().source">
            <slot name="source"/>
        </cite>
    </blockquote>
</template>

<script>
export default {
    name: 'Quote',
    functional: true
}
</script>

<style lang="scss">
.contentelement-quote {
    margin: 1em 0 0 2em;
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
