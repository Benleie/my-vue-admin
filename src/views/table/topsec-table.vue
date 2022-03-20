
<template>
  <div class="topsec-table">
    <h1 @copy="handleCopy($event)">topsec-table</h1>
    <el-form :model="formInline" inline>
      <el-form-item label="Approved by">
        <el-input v-model="formInline.user" placeholder="Approved by" />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="formInline.region" placeholder="Activity zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Query</el-button>
      </el-form-item>
    </el-form>
    <div class="btn-list">
      <el-button @click="getClicked">click me to do something</el-button>
      <el-button @click="showChild = true">click me to open child in template with v-if</el-button>
    </div>
    <template v-if="showChild">
      <child-dialog
        :visible.sync="showChild"
        @pure="handlePureEmit"
      />
    </template>
    <div class="card-wrapper">
      <section class="scroll-wrapper">
        <div class="moveable-container">
          <div>123</div>
          <div>456</div>
          <div>9867</div>
        </div>
      </section>
      <section>center</section>
    </div>
    <!-- <div class="d3-wrapper">
      <div ref="scrollWraper" class="scroll-wrapper">
        <div class="moveable-container">
          <div>123</div>
          <div>456</div>
          <div>9867</div>
        </div>
      </div>
      <svg />
    </div> -->
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
      formInline: {
        user: '',
        region: ''
      },
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
    onSubmit() {
      console.log('submit!');
    },
    handlePureEmit(str1) {
      console.log('?????')
      console.log(str1)
    },
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
      this.showDialog = true;
      console.log(this.totalCounts)
    },

    handleCopy(e) {
      this.$message("hhh, you've copied something!")
      console.log(e)
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
      console.log(g.selectAll("circle"))
      g.selectAll("circle")
        .data(data)
        .join("circle")
        // .enter().append("circle")   // 数据绑定
          .attr("cx", ([x]) => x)
          .attr("cy", ([, y]) => y)
          .attr("r", 5)
          .attr("fill", (d, i) => d3.interpolateRainbow(i / 360))
      console.log(g.selectAll("circle"))
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
    width: 100%;
    display: flex;
  }
  .card-wrapper {
    display: flex;
    > :last-child{
      width: 400px;
      height: 400px;
      background-color: lightgray;
    }
  }
  .scroll-wrapper {
    flex: 1;
    // overflow: hidden;
    border: 1px solid red;
    .moveable-container {
      background-color: gray;
      display: flex;
      > div {
        flex-shrink: 0;
        width: 400px;
        background-color: orange;
        // & + div {
        //   margin-left: 15px;
        // }
        &:not(:last-of-type) {
          margin-right: 15px;
        }
      }
    }
  }
}


</style>
