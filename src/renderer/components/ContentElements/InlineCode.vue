<template functional>
    <code class="contentelement-inline-code"><slot/></code>
</template>

<script>

export default {
    name: 'InlineCode',
    functional: true
}
</script>

<style lang="scss">
.contentelement-inline-code {
    display: inline-block;
    border-radius: 4px;
    margin: 0 0 0 0;
    padding: 0 0.25em;
    background-color: rgba(orangered, 0.2);
}
</style>
