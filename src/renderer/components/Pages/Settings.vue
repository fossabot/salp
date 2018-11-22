<template>
  <div id="page-settings">
    <Form ref="form" :model="form" :label-position="'left'" label-width="300px">
        <FormItem label="Use Machine Learning">
            <el-switch v-model="form.ml"></el-switch>
            <span class="form-item__description">If Machine Learning is switched on, you will recieve recommendations for courses and hinds
        based on your inputs.</span>
        </FormItem>
        <FormItem label="Homepath">
            <Input autosize v-model="form.path"></Input>
            <span class="form-item__description">Path to your home folder.</span>
        </FormItem>
    </Form>
  </div>
</template>

<script>
import { Switch , Form, FormItem, Input} from 'element-ui'

export default {
  name: 'Settings',
  components: {
    [Switch.name]: Switch,
    Form,
    FormItem,
    Input
  },
  data() {

    return {
      form: {
          ml: true,
          path: '/~'
      }
    }
  }
}
</script>

<style lang="scss">
.form-item__description {
    display: block;
    font-size: $--font-size-small;
    line-height: 1em;
    color: $--color-info;
    margin-top: 0.5em;
}

.el-input{
    max-width: 40em;
}
</style>
