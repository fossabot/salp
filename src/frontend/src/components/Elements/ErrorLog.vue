<template>
    <div class="error-log" v-if="error">
        <Alert title="Error" :description="error" type="error" show-icon :closable="false" />
    </div>
</template>

<script>
import { Alert } from 'element-ui'

export default {
    name: 'ErrorLog',
    props: {
        error: String
    },
    components: {
        Alert
    }
}
</script>
