<template>
  <el-row type="flex">
    <el-col :span="4">
      <div class="environment">
        <label>环境监测</label>
        <table class="environment-list">
          <tr>
            <td>温度</td>
            <td>湿度</td>
            <td>天气情况</td>
          </tr>
          <tr>
            <td>17°</td>
            <td>50</td>
            <td>晴</td>
          </tr>
          <tr>
            <td>风向</td>
            <td>风速等级</td>
            <td>风速</td>
          </tr>
          <tr>
            <td>东风</td>
            <td>1级</td>
            <td>2m/s</td>
          </tr>
        </table>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="otherSub">
        <label>其他问题统计</label>
        <e-charts :options="otherP" />
      </div>
    </el-col>
    <el-col :span="4">
      <div class="qualitySub">
        <label>9月质量问题统计</label>
        <e-charts :options="qualityP" />
      </div>
    </el-col>
    <el-col :span="4">
      <div class="securitySub">
        <label>9月安全问题统计</label>
        <e-charts :options="securityP" />
      </div>
    </el-col>
    <el-col :span="8">
      <div class="image-progress">
        <label>形象进度</label>
        <table class="progress-sub">
          <tr>
            <td colspan="2">华庆路</td>
            <td colspan="2">一英里</td>
            <td colspan="2">风井</td>
          </tr>
          <tr>
            <td>土方</td>
            <td>66.41%</td>
            <td>围护桩</td>
            <td>45.90%</td>
            <td>钢支撑</td>
            <td>31.56%</td>
          </tr>
          <tr>
            <td>冠梁</td>
            <td>48.70%</td>
            <td>土方</td>
            <td>8.75%</td>
            <td>锚喷</td>
            <td>46.30%</td>
          </tr>
          <tr>
            <td>围护桩</td>
            <td>100%</td>
            <td>抗拔桩</td>
            <td>44.50%</td>
            <td>土方</td>
            <td>95%</td>
          </tr>
          <tr>
            <td>钢支撑</td>
            <td>31%</td>
            <td>冠梁</td>
            <td>5.96%</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>锚喷</td>
            <td>34.60%</td>
            <td>格构柱</td>
            <td>63t</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>格构柱</td>
            <td>43.40%</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
export default {
  name: "BottomSub",
  components: {
    ECharts,
  },
  data() {
    return {
      otherP: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}",
        },
        xAxis: {
          type: "category",
          name: "x",
          splitLine: { show: false },
          data: ["第一周", "第二周", "第三周", "第四周"],
          axisLabel: {
            color: "#ccc",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "4%",
          containLabel: true,
          height: 220,
        },
        yAxis: {
          type: "log",
          name: "y",
          minorTick: {
            show: true,
          },
          minorSplitLine: {
            show: true,
          },
          axisLabel: {
            color: "#ccc",
          },
          max: 20,
        },
        series: [
          {
            name: "其他问题统计",
            type: "line",
            data: [1, 10, 9, 20],
          },
        ],
      },
      qualityP: {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "4%",
          containLabel: true,
          height: "220px",
          width: "310px;",
        },
        xAxis: [
          {
            type: "category",
            data: ["第一周", "第二周", "第三周", "第四周"],
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              color: "#ccc",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "#ccc",
            },
          },
        ],
        series: [
          {
            name: "9月质量问题",
            type: "bar",
            barWidth: "10%",
            data: [2, 3, 4, 3],
          },
        ],
      },
      securityP: {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "4%",
          containLabel: true,
          height: "220px",
          width: "310px;",
        },
        xAxis: [
          {
            type: "category",
            data: ["第一周", "第二周", "第三周", "第四周"],
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              color: "#ccc",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "#ccc",
            },
          },
        ],
        series: [
          {
            name: "9月质量问题",
            type: "bar",
            barWidth: "10%",
            data: [2, 3, 4, 3],
          },
        ],
      },
      
    };
  },
};
</script>

<style scoped>
.environment {
}
.environment label,
.otherSub label,
.qualitySub label,
.securitySub label,
.image-progress label {
  display: block;
  height: 30px;
  line-height: 30px;
  margin-bottom: 20px;
  color: #fff;
  padding: 0 10px;
}
.environment-list {
  width: 90%;
  margin: 0 auto;
  font-size: 14px;
  background: #eee;
  text-align: center;
  opacity: 0.7;
}
.environment-list tr {
  height: 50px;
}
.otherSub {
  width: 100%;
}
.echarts {
  width: 317px;
  height: 260px;
}
.image-progress{
  padding-left: 20px;
}
.progress-sub{
  text-align: center;
  background: #fff;
  opacity: 0.7;
}
.progress-sub tr{
  font-size: 14px;
  height: 30px;
  line-height: 30px;
}
.progress-sub tr td{
  
}
</style>