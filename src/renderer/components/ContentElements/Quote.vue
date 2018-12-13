<template functional>
    <blockquote class="contentelement-quote">
        <div class="contentelement-quote__flex-wrapper">
            <div class="contentelement-quote__left-border"></div>

            <div class="contentelement-quote-content__wrapper">
                <SimpleText>
                    "{{ props.quote }}"
                </SimpleText>

                <cite class="contentelement-quote__cite">
                    <SimpleLink class="contentelement-quote__cite__link" :url="props.source"/>
                </cite>
            </div>
        </div>
    </blockquote>
</template>

<script>
import SimpleText from './SimpleText.vue'
import SimpleLink from './SimpleLink.vue'

export default {
    name: 'Quote',
    functional: true,
    components: {
        SimpleText,
        SimpleLink
    },
    props: {
        quote: {
            type: String,
            required: true
        },
        source: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss">
.contentelement-quote {
    margin: 1em 0 1em 2em;

    .contentelement-quote__flex-wrapper {
        display: flex;
        flex-direction: row;

        .contentelement-quote__left-border {
            background-color: $--color-primary;
            flex-basis: 0.8%;
        }

        .contentelement-quote-content__wrapper {
            padding-left: 1em;

            .contentelement-quote__cite::before {
                display: inline-block;
                content: '—';
            }
        }
    }
}
</style>
