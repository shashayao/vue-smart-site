<template>
  <el-row type="flex" class="bottom-sub">
    <el-col :span="18">
      <el-row type="flex">
        <el-col :span="3">
          <div class="environment">
            <label>环境监测</label>
            <table class="environment-list">
              <tr>
                <td>温度</td>
                <td>湿度</td>
              </tr>
              <tr>
                <td>{{ weatherData.temperature_curr }}</td>
                <td>{{ weatherData.humidity }}</td>
              </tr>
              <tr>
                <td>天气情况</td>
                <td>风向</td>
              </tr>
              <tr>
                <td>{{ weatherData.weather_curr }}</td>
                <td>{{ weatherData.wind }}</td>
              </tr>
              <tr>
                <td>风速等级</td>
                <td>空气指数</td>
              </tr>
              <tr>
                <td>{{ weatherData.winp }}</td>
                <td>{{ weatherData.aqi }}</td>
              </tr>
            </table>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="otherSub">
            <label>其他问题统计</label>
            <e-charts :options="otherP" />
          </div>
        </el-col>
        <el-col :span="7">
          <div class="qualitySub">
            <label>9月质量问题统计</label>
            <e-charts :options="qualityP" />
          </div>
        </el-col>
        <el-col :span="7">
          <div class="securitySub">
            <label>9月安全问题统计</label>
            <e-charts :options="securityP" />
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6">
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
import { getWeatherData } from "@/network/dapin"; //调用天气
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
          bottom: 0,
          top: "6%",
          containLabel: true,
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
          bottom: 0,
          top: "6%",
          containLabel: true,
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
          bottom: 0,
          top: "6%",
          containLabel: true,
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
      weatherData: [],
    };
  },
  created() {
    this.MgetWeatherData();
  },
  methods: {
    MgetWeatherData() {
      getWeatherData().then((res) => {
        
        this.weatherData = res.result;
        switch (res.result.weather) {
          case "晴":
            this.weatherData.weather_icon = require("assets/img/fine.png");
            break;
          case "多云":
            this.weatherData.weather_icon = require("assets/img/cloudy.png");
            break;
          case "阴":
            this.weatherData.weather_icon = require("assets/img/yin.png");
            break;
          case "阵雨":
            this.weatherData.weather_icon = require("assets/img/rain.png");
            break;
        }
      });
    },
  },
};
</script>

<style scoped>
.bottom-sub {
  color: #fff;
}
.environment label,
.otherSub label,
.qualitySub label,
.securitySub label,
.image-progress label {
  display: block;
  height: 4vh;
  line-height: 4vh;
  padding: 0 3%;
}
.environment-list {
  width: 90%;
  margin: 3% auto;
  font-size: 14px;
  text-align: left;
}
.environment-list tr,
.progress-sub tr {
  font-size: 0.8rem;
  height: 2.7vh;
}
.otherSub {
  width: 100%;
}
.echarts {
  width: 100%;
  height: 19vh;
}
.image-progress {
  padding-left: 20px;
}
.progress-sub {
  width: 100%;
  text-align: center;
}
</style>