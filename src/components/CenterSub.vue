<template>
  <el-row type="flex" class="center-sub">
    <el-col :span="15">
      <div class="grid-content bg-purple mainImg">
        <img :src="mapImg" class="mapImg" />
      </div>
    </el-col>
    <el-col :span="9">
      <el-col type="flex">
        <el-row :span="5"
          ><div class="center-right-num">
            <div class="num-title">
              <label>安全施工天数</label><label>实施作业人数</label>
            </div>
            <div class="num-content">
              <label>388天</label><label>52人</label>
            </div>
          </div></el-row
        >
        <el-row :span="7">
          <div class="center-right-clockIn">
            <label class="clockIn-title">人员打卡记录</label>
            <div class="clockIn-header">
              <ul>
                <li>姓名</li>
                <li>单位</li>
                <li>时间</li>
                <li>状态</li>
              </ul>
            </div>
            <div class="clockIn-item">
              <ul ref="clockIn" :class="{'animate-up':animateUp}">
                <li v-for="item in tableData" :key="item.name">
                  <span>{{ item.name }}</span>
                  <span>{{ item.company }}</span>
                  <span>{{ item.date }}</span>
                  <span>{{ item.status }}</span>
                </li>
              </ul>
            </div>
          </div>
        </el-row>
        <el-row :span="7">
          <div class="center-right-output">
            <label class="output-title">9月产值完成情况</label>
            <e-charts :options="output" ref="output" />
          </div>
        </el-row>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import { EleResize } from "../assets/js/esresize";
export default {
  name: "CenterSub",
  components: {
    ECharts,
  },
  data() {
    return {
      mapImg: require("assets/img/main.png"),
      tableData: [
        {
          date: "2016-05-02",
          name: "王小",
          company: "上海市普陀区金沙江路 1518 弄",
          status: "正常打卡",
        },
        {
          date: "2016-05-04",
          name: "王虎",
          company: "上海市普陀区金沙江路 1517 弄",
          status: "正常打卡",
        },
        {
          date: "2016-05-01",
          name: "王大",
          company: "上海市普陀区金沙江路 1519 弄",
          status: "正常打卡",
        },
        {
          date: "2016-05-03",
          name: "小虎",
          company: "上海市普陀区金沙江路 1516 弄",
          status: "正常打卡",
        },
        {
          date: "2016-05-03",
          name: "大虎",
          company: "上海市普陀区金沙江路 1516 弄",
          status: "正常打卡",
        },
      ],
      activeIndex: 0,
      animateUp:false,
      timer: "",
      output: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: "{c}万元",
        },
        grid: {
          left: "3%",
          right: "10%",
          bottom: 0,
          top: 0,
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisLabel: {
            color: "#ccc",
            formatter: "{value}万元",
          },
        },
        yAxis: {
          type: "category",
          data: ["盾构区间", "区间风间", "银河一英里", "华庆路站"],
          axisLabel: {
            color: "#ccc",
          },
        },
        series: [
          {
            name: "产值",
            type: "bar",
            data: [0, 1464.67, 414.12, 828.31],
            color: ["#37A2DA"],
            barWidth: 20,
          },
        ],
      },
    };
  },
  mounted() {
    this.timer = setInterval(this.autoSlide,2000);
    this.echartResize();
  },
  methods: {
    autoSlide() {
      this.animateUp = true;
      setTimeout(()=>{
        this.tableData.push(this.tableData[0])
        this.tableData.shift()
        this.animateUp = false
      },500)
    },
    echartResize() {
      let twChart = this.$refs.output;
      setTimeout(function () {
        window.onresize = function () {
          twChart.resize();
        };
      }, 200);
    },
  },
};
</script>

<style scoped>
.center-sub {
  color: #fff;
}
.mainImg {
  text-align: center;
}
.mapImg {
  width: 97%;
}
.center-right {
  color: #fff;
}
/* 施工天数和人数 */
.center-right-num,
.center-right-clockIn,
.center-right-output {
  margin: 0 3%;
  border-bottom: 1px solid #eee;
}
.center-right-output {
  border: none;
}
.center-right-num div label {
  display: inline-block;
  line-height: 4vh;
  width: 50%;
}
.num-title {
  text-align: left;
}
.num-content {
  text-align: center;
}
/* 人员打卡记录 */
.clockIn-header {
  height: 4vh;
}
.clockIn-header ul li {
  float: left;
  width: 25%;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 4vh;
}
.clockIn-item {
  height: 16vh;
  overflow: hidden;
}
.clockIn-item ul li {
  line-height: 4vh;
}
.clockIn-title,
.output-title {
  display: block;
  line-height: 5vh;
}
.echarts {
  width: 100%;
  height: 30vh;
}
.clockIn-item li,.clockIn-header ul{
  display: flex;
  text-align: center;
}
.clockIn-item li span:nth-child(1),.clockIn-header li:nth-child(1){
  flex: 1;  
}
.clockIn-item li span:nth-child(2),.clockIn-header li:nth-child(2){
  flex: 5;
}
.clockIn-item li span:nth-child(3),.clockIn-header li:nth-child(3){
  flex: 2;
}
.clockIn-item li span:nth-child(4),.clockIn-header li:nth-child(4){
  flex: 2;
}
.animate-up{
  transition: all 0.5s ease-in-out;
  transform: translateY(-4vh);
}
</style>