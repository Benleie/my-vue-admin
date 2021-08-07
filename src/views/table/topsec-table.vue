
<template>
  <div class="topsec-table">
    <h1>topsec-table</h1>
    <el-table
      :data="tableData"
      border
      style="width: 600px"
    >
      <el-table-column
        prop="id"
        label="学号"
        width="50"
      />
      <el-table-column prop="name" label="姓名" width="200" />
      <el-table-column prop="duration" label="学习时长" width="80" />
      <el-table-column prop="chinese" label="语文" width="50" />
      <el-table-column prop="math" label="数学" width="50" />
      <el-table-column prop="english" label="英语" width="50" />
      <el-table-column prop="memo" label="备注" />
    </el-table>
    <el-pagination background layout="prev, pager, next" :current-page.sync="currentPage" :page-size="5" :total="60" @current-change="handleChange" />
    <el-button @click="currentPage++">change-current</el-button>
    <el-button @click="showDialog = true">click me to open childDialog</el-button>
    <el-button @click="showChild = true">click me to open child in template with v-if</el-button>
    <template v-if="showChild">
      <child-dialog :visible.sync="showChild" />
    </template>
    <el-dialog :visible.sync="showDialog">
      <div>hhhh</div>
      <child-dialog />
    </el-dialog>
  </div>
</template>

<script>
// import x from ''
/* eslint-disable */
import ChildDialog from '@/components/Ben/firstComponent'
import axios from 'axios'
export default {
  components: { ChildDialog },
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
      ],
      showDialog: false,
      showChild: false,
      currentPage: 1
    }
  },
  beforeMount() {
    this.getTableData()
  },
  methods: {
    handleChange(e) {
      console.log(e)
      this.getTableData()
    },
    getTableData() {
      axios.get('http://localhost:3333/score', {
        params: {
          _limit: 5,
          _page: this.currentPage
        }
      }).then((res) => {
          this.tableData = res.data
      })
    }
  }
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
