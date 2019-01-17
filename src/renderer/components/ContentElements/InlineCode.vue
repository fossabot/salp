<template functional>
    <pre class="contentelement-inline-code"><slot/></pre>
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
    background-color: rgba(orangered, 0.2);
}
</style>
