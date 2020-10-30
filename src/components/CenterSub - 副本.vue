<template>
  <el-row type="flex">
    <el-col :span="17">
      <div class="grid-content bg-purple mainImg">
        <img :src="mapImg" class="mapImg" />
      </div>
    </el-col>
    <el-col :span="7">
      <div class="grid-content bg-purple center-right">
        <div class="center-right-num">
          <div class="num-title">
            <label>安全施工天数</label><label>实施作业人数</label>
          </div>
          <div class="num-content"><label>388天</label><label>52人</label></div>
        </div>
        <div class="center-right-clockIn">
          <label class="clockIn-title">人员打卡记录</label>

          <el-table
            :data="tableData"
            class="clockIn-content"
            @cell-mouse-enter="evtEnter"
            @cell-mouse-leave="evtOut"
            :header-cell-style="{ background: '#050e1a', color: '#fff' }"
            :cell-style="{
              background: '#050e1a',
              color: '#fff',
            }"
          >
            <el-table-column prop="name" label="姓名"> </el-table-column>
            <el-table-column prop="company" label="单位" st> </el-table-column>
            <el-table-column prop="date" label="时间"> </el-table-column>
            <el-table-column prop="status" label="状态"> </el-table-column>
          </el-table>
        </div>
        <div class="center-right-output">
          <label class="output-title">9月产值完成情况</label>
          <e-charts :options="output" ref="output" />
        </div>
      </div>
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
          name: "王小h",
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
          date: "2016-05-02",
          name: "王小11",
          company: "上海市普陀区金沙江路 1518 弄",
          status: "正常打卡",
        },
        {
          date: "2016-05-04",
          name: "王虎22",
          company: "上海市普陀区金沙江路 1517 弄",
          status: "正常打卡",
        },
        {
          date: "2016-05-01",
          name: "王小h3",
          company: "上海市普陀区金沙江路 1519 弄",
          status: "正常打卡",
        },
        {
          date: "2016-05-03",
          name: "小虎4",
          company: "上海市普陀区金沙江路 1516 弄",
          status: "正常打卡",
        },
      ],
      activeIndex: 4,
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
    this.autoSlide();
    this.echartResize();
  },
  methods: {
    evtEnter() {
      clearInterval(this.timer);
    },
    evtOut() {
      this.autoSlide();
    },
    autoSlide() {
      //  获取表格体
      let t = document.getElementsByClassName("el-table__body-wrapper");
      let tH = document.getElementsByClassName("el-table__header-wrapper");

      let marginTop = 0;
      this.timer = setInterval(() => {
        tH[0].style.position = "relative";
        tH[0].style.zIndex = 2;
        tH[0].style.backgroundColor = "transparent";
        t[0].style.backgroundColor = "transparent";
        t[0].style.zIndex = 1;
        marginTop = -(48 * (this.activeIndex - 3)) + "px";

        this.activeIndex++;
        if (this.activeIndex == this.tableData.length) {
          this.activeIndex = 4;
          t[0].style.transition = "0s";
          t[0].style.marginTop = 0;
        } else {
          t[0].style.transition = "all 0.5s";
          t[0].style.marginTop = marginTop;
        }
      }, 2000);
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
.mainImg{
  text-align: center;
}
.mapImg {
  width: 95%;
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
  height: 3vh;
  line-height: 3vh;
  width: 50%;
}
.num-title {
  text-align: left;
}
.num-content {
  text-align: center;
}
/* 人员打卡记录 */
.clockIn-title,
.output-title {
  display: block;
  height: 6vh;
  line-height: 6vh;
}
.clockIn-content {
  width: 100%;
  height: 24vh;
}
.echarts {
  width: 27vw;
  height: 30vh;
}
</style>