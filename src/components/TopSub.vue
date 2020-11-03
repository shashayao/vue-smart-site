<template>
  <div class="top-sub">
    <el-row type="flex">
      <el-col :span="9">
        <el-row type="flex" class="header-btn">
          <el-col :span="6"
            ><el-button @click="dialogTableVisible = true"
              >考勤管理</el-button
            ></el-col
          >
          <el-col :span="6"><el-button>视频监控</el-button></el-col>
          <el-col :span="6"
            ><el-button @click="quality">质量管理</el-button></el-col
          >
          <el-col :span="6"
            ><el-button @click="quality">安全管理</el-button></el-col
          >
        </el-row>
      </el-col>
      <el-col :span="6">
        <h1 class="header-title">智慧工地综合管理平台</h1>
      </el-col>
      <el-col :span="9">
        <el-row type="flex" class="header-btn">
          <el-col :span="6"><el-button>施工监测</el-button></el-col>
          <el-col :span="6"
            ><el-button @click="dialogWeatherVisible = true"
              >环境监测</el-button
            ></el-col
          >
          <el-col :span="6" class="shield">
            <el-popover
              placement="top"
              trigger="click"
              popper-class="shield-popover"
            >
              <div>
                <el-button>沉降点监测</el-button>
                <el-button>地下管线监测</el-button>
                <el-button>进出洞段监测</el-button>
                <el-button>隧道内变形监测</el-button>
                <el-button>气体监测</el-button>
              </div>
              <el-button v-popover:popover slot="reference">盾构监测</el-button>
            </el-popover>
          </el-col>
          <el-col :span="6"><el-button>进度管理</el-button></el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 考勤管理弹出框 -->
    <el-dialog title="考勤管理" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column
          property="date"
          label="日期"
          width="150"
        ></el-table-column>
        <el-table-column
          property="name"
          label="姓名"
          width="200"
        ></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 环境监测弹出框 -->
    <el-dialog
      title="环境监测"
      :visible.sync="dialogWeatherVisible"
      width="22%"
      custom-class="dialogWeather"
    >
      <div class="weather-sub">
        <h1>{{ weatherData.citynm }}</h1>
        <div>
          <img :src="weatherData.weather_icon" />
          <div class="currWeather">
            <p>{{ weatherData.weather_curr }}</p>
            <p>{{ weatherData.temperature_curr }}</p>
          </div>
        </div>
        <table class="environment-list">
          <tr>
            <td>日期</td>
            <td>星期</td>
          </tr>
          <tr>
            <td>{{ weatherData.days }}</td>
            <td>{{ weatherData.week }}</td>
          </tr>
          <tr>
            <td>最高气温</td>
            <td>最低气温</td>
          </tr>
          <tr>
            <td>{{ weatherData.temp_low }}℃</td>
            <td>{{ weatherData.temp_high }}℃</td>
          </tr>
          <tr>
            <td>风向</td>
            <td>风速</td>
          </tr>
          <tr>
            <td>{{ weatherData.wind }}</td>
            <td>{{ weatherData.winp }}</td>
          </tr>
          <tr>
            <td>空气指数</td>
            <td>pm2.5</td>
          </tr>
          <tr>
            <td>{{ weatherData.aqi }}</td>
            <td>{{ weatherData.pm2_5 }}</td>
          </tr>
          <tr>
            <td>湿度</td>
            <td>空气质量</td>
          </tr>
          <tr>
            <td>{{ weatherData.humidity }}</td>
            <td>{{ weatherData.quality }}</td>
          </tr>
        </table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getWeatherData, getPm2_5Data } from "@/network/dapin"; //调用天气
export default {
  name: "TopSub",
  data() {
    return {
      shieldShow: true,
      dialogTableVisible: false,
      dialogWeatherVisible: false,
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      weatherData: [],
    };
  },
  created() {
    this.MgetWeatherData();
    this.MgetPm2_5Data();
  },
  methods: {
    // 质量管理连接
    quality() {
      window.open("http://zjjt-quality.1357.cn/Admin/Login", "_blank");
    },
    //
    MgetWeatherData() {
      getWeatherData().then((res) => {
        // console.log(res.result);
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
    MgetPm2_5Data() {
      getPm2_5Data().then((res) => {
        if (!res.error) {
          this.weatherData.quality = res[0].quality;
          this.weatherData.pm2_5 = res[0].pm2_5;
        }
      });
    },
  },
};
</script>

<style scoped>
.header-title {
  font-size: 1.75rem;
  color: #fff;
  text-align: center;
}
.header-btn {
  text-align: center;
}
.header-btn button {
  background: transparent;
  color: #fff;
}
.el-row {
  align-items: center;
  justify-items: center;
}
.shield {
  position: relative;
}

.shield-popover button {
  background: #023864;
  color: #fff;
}

.weather-sub {
  color: #fff;
  margin: 0 1.5vw;
}
.currWeather {
  float: right;
  font-size: 1.5rem;
  margin-right: 3vw;
}
.environment-list {
  width: 100%;
  border: none;
}
.environment-list tr:nth-child(even) td {
  font-size: 1.5rem;
  /* border-bottom: 1px solid #fff; */
  padding: 1.3vh 0;
}
.environment-list tr:nth-child(odd) td {
  color: #ccc;
}
</style>
<style>
.dialogWeather {
  background-image: linear-gradient(#023863, #06111e);
}
.dialogWeather span {
  color: #fff;
}
</style>