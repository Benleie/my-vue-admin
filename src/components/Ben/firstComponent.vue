<template>
  <div class="child">
    <h4>this is a child component</h4>
    <el-button @click="emitFunc">点我传参，深入李姐$event</el-button>
    <el-button v-if="visible" @click="hideMe">hide me and my family!</el-button>
  </div>
</template>

<script>
// import x from ''
export default {
  name: 'ChildDialog',
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
    },
    emitFunc() {
      this.$emit('pure', 'ggg', 'mmm')
    }
  }
}
</script>

<style lang='scss' scoped>
//@import url()

</style>
