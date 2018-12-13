<template functional>
    <blockquote class="contentelement-cite">
        <div class="contentelement-cite__flex-wrapper">
            <div class="contentelement-cite__left-border"></div>

            <div class="contentelement-cite-content__wrapper">
                <SimpleText>
                    "{{ props.cite }}"
                </SimpleText>

                <cite class="contentelement-cite__cite">
                    <SimpleLink class="contentelement-cite__cite__link" :url="props.source"/>
                </cite>
            </div>
        </div>
    </blockquote>
</template>

<script>
import SimpleText from './SimpleText.vue'
import SimpleLink from './SimpleLink.vue'

export default {
    name: 'Citation',
    functional: true,
    components: {
        SimpleText,
        SimpleLink
    },
    props: {
        cite: {
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
.contentelement-cite {
    margin: 1em 0 1em 2em;

    .contentelement-cite__flex-wrapper {
        display: flex;
        flex-direction: row;

        .contentelement-cite__left-border {
            background-color: $--color-primary;
            flex-basis: 0.8%;
        }

        .contentelement-cite-content__wrapper {
            padding-left: 1em;

            .contentelement-cite__cite::before {
                display: inline-block;
                content: '—';
            }
        }
    }
}
</style>
