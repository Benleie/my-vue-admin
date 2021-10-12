
<template>
  <div class="topsec-table">
    <h1 @copy="handleCopy($event)">topsec-table</h1>
    <div class="btn-list">
      <el-button @click="getClicked">click me to do something</el-button>
      <el-button @click="showChild = true">click me to open child in template with v-if</el-button>
    </div>
    <div ref="scrollWraper" class="scroll-wrapper" />
    <div class="d3-wrapper">
      <div id="canvas">
        <h3>hhh333</h3>
        <div id="p-container">
          <p>123</p>
          <p>123</p>
          <p>123</p>
        </div>
      </div>
      <svg />
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
    this.drawSvg();
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
      // const zoom = d3.zoom().on("zoom", this.zoomedFn.bind(this))
      const zoom = d3.zoom().scaleExtent([1, 40]).on("zoom", this.zoomedFn)
      let p = d3.select("#canvas").selectAll("p").text("hello")
      d3.select("#canvas").call(zoom)
          .transition().duration(750).call(zoom.transform, d3.zoomIdentity);
      console.log(d3.selection())
    },

    zoomedFn() {
      const g = d3.select('#p-container')
          .attr("width", 500)
          .attr("height", 500)
      // console.log(d3.event)
      g.attr("tranform", d3.event.transform)
    },
    // d3.js中的zoom缩放 http://www.qiutianaimeili.com/html/page/2019/10/sqbx59y0slf.html
    drawSvg() {
      const width = 500, height = 500
      const randomX = d3.randomNormal(width / 2, 80),
				randomY = d3.randomNormal(height / 2, 80),
				data = d3.range(500).map(function() {
					return [randomX(), randomY()];
				});
      
      const svg = d3.select(".d3-wrapper").select('svg')
          .attr("width", width)
          .attr("height", height)
      const g = svg.append("g")
      // console.log(g.selectAll("circle"))
      g.selectAll("circle")
          .data(data)
          .join("circle")
          .attr("cx", ([x]) => x)
          .attr("cy", ([, y]) => y)
          .attr("r", 5)
          .attr("fill", (d, i) => d3.interpolateRainbow(i / 360))
      
      const zoom = d3.zoom()
				.scaleExtent([1, 40])
				.on("zoom", zoomed);
      svg.call(zoom);
			function zoomed() {
				g.attr("transform", d3.event.transform);
			}
      
    },
  }
}
</script>

<style lang='scss' scoped>
//@import url()
.topsec-table {
  display: flex;
  flex-direction: column;
  padding: 20px;
  .d3-wrapper {
    display: flex;
  }
  #canvas {
    flex: 1;
    border: 1px solid red;
  }
}
</style>
