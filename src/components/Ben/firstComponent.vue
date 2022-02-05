<template>
  <div class="">
    <h4>this is a child component</h4>
    <el-button v-if="visible" @click="hideMe">hide me and my family!</el-button>
  </div>
</template>

<script>
// import x from ''
export default {
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showMe: this.visible
    }
  },
  mounted() {
    console.log('first child is mounted')
  },
  destroyed() {
    console.log('已经被销毁')
  },
  methods: {
    hideMe() {
      this.$emit('update:visible', this.showMe = false)
    }
  }
}
</script>

<style lang='scss' scoped>
//@import url()

</style>
