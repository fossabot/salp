<template functional>
    <h3 class="section-header" v-bind="data.attrs" v-on="listeners" :class="[data.class, data.staticClass]">
        <slot/>
    </h3>
</template>

<style lang="scss">
.section-header {
    line-height: 2em;
    border-bottom: $--border-base;
    border-color: $--collapse-border-color;
}
</style>
