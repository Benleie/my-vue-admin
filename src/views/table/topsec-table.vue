
<template>
  <div class="topsec-table">
    <h1 @copy="handleCopy($event)">topsec-table</h1>
    <div class="btn-list">
      <el-button @click="getClicked">click me to do something</el-button>
      <el-button @click="showChild = true">click me to open child in template with v-if</el-button>
    </div>
    <div ref="scrollWraper" class="scroll-wrapper" />
    <div id="canvas">
      <div>
        <p>123</p>
        <p>123</p>
        <p>123</p>
      </div>
    </div>
    <el-input
      v-model="search"
      placeholder="请输入学号或姓名"
      prefix-icon="el-icon-search"
      style="width:300px;"
      @change="searchData"
    />
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
    <el-pagination background layout="prev, pager, next, total" :current-page.sync="currentPage" :page-size="5" :total="totalCounts" :hide-on-single-page="true" @current-change="handleChange" />

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
import { fetchTableData } from '@/api/ben'
import * as d3 from 'd3';

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
      currentPage: 1,
      totalCounts: 1,
      search: ''
    }
  },
  beforeMount() {
    window.addEventListener("resize", (event) => {
      console.log(event)
      console.log(new Date())
    })
    // this.getTableData()

  },
  mounted() { 
    this.drawOne();
  },
  beforeDestroy() {
    this.$message("确定离开么？")
    window.addEventListener('beforeunload', (event) => {
      console.log(event)
      event.preventDefault();
    })
  },
  methods: {
    handleChange(e) {
      console.log(e)
      this.getTableData()
    },
    getTableData() {
      fetchTableData({
          _limit: 5,
          _page: this.currentPage
      })
      .then((res) => {
          this.tableData = res.data
          this.totalCounts = 60
      })
    },

    searchData() {
      const params = this.search 
        ? { id: this.search } 
        : { _limit: 5, _page: this.currentPage }

      fetchTableData(params).then((res) => {
          this.tableData = res.data
          this.totalCounts = res.data.length < 5 ? 1 : 60
      })
    },

    getClicked() {
      // this.showDialog = true;
      console.log(this.totalCounts)
    },

    handleCopy(e) {
      this.$message("hhh, you've copied something!")
      console.log(e)
    },

    drawOne() {
      let p = d3.select("#canvas").selectAll("p").text("hello")
      console.log(p)
      console.log(d3.selection())
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
