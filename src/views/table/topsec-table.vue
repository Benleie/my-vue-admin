
<template>
  <div class="topsec-table">
    <h1>topsec-table</h1>
    <el-table
      :data="tableData"
      border
      style="width: 500px"
    >
      <el-table-column
        prop="id"
        label="学号"
        width="50"
      />
      <el-table-column prop="name" label="姓名" width="80" />
      <el-table-column prop="duration" label="学习时长" width="80" />
      <el-table-column prop="chinese" label="语文" width="50" />
      <el-table-column prop="math" label="数学" width="50" />
      <el-table-column prop="english" label="英语" width="50" />
      <el-table-column prop="memo" label="备注" />
    </el-table>
  </div>
</template>

<script>
// import x from ''
/* eslint-disable */
import axios from 'axios'
export default {
  components: {},
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  beforeMount() {
    axios.get('http://localhost:3333/score')
      .then((res) => {
        console.log(res.data)
        this.tableData = res.data
      })
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
//@import url()
.topsec-table {
  display: flex;
  flex-direction: column;
  padding: 20px;
}
</style>
