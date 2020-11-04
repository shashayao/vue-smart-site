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
          <el-col :span="6"><el-button @click="dialogConstructionVisible = true">数字工地</el-button></el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 考勤管理弹出框 -->
    <el-dialog title="考勤管理" :visible.sync="dialogTableVisible" custom-class="check-manage" top="5vh">
      <!-- 长春市春成道路工程有公司 -->
      <div>
        <h1>长春市春成道路工程有公司</h1>
        <el-table :data="ccData" height="180" row-class-name="check-cc">
          <el-table-column property="date" label="日期"></el-table-column>
          <el-table-column property="name" label="姓名"></el-table-column>
          <el-table-column property="status" label="打卡状态"></el-table-column>
        </el-table>
      </div>

      <!-- 长春市新雨建筑劳务有限公司 -->
      <div>
        <h1>长春市新雨建筑劳务有限公司</h1>
        <el-table :data="xyData" height="180" row-class-name="check-xy">
          <el-table-column property="date" label="日期"></el-table-column>
          <el-table-column property="name" label="姓名"></el-table-column>
          <el-table-column property="status" label="打卡状态"></el-table-column>
        </el-table>
      </div>

      <!-- 辽宁志诚岩土工程有限公司 -->
      <div>
        <h1>辽宁志诚岩土工程有限公司</h1>
        <el-table :data="zcData" height="180" row-class-name="check-zc">
          <el-table-column property="date" label="日期"></el-table-column>
          <el-table-column property="name" label="姓名"></el-table-column>
          <el-table-column property="status" label="打卡状态"></el-table-column>
        </el-table>
      </div>
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
            <td>湿度</td>
          </tr>
          <tr>
            <td>{{ weatherData.aqi }}</td>
            <td>{{ weatherData.humidity }}</td>
          </tr>
        </table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getWeatherData } from "@/network/dapin"; //调用天气
export default {
  name: "TopSub",
  data() {
    return {
      shieldShow: true,
      dialogTableVisible: false,
      dialogWeatherVisible: false,
      ccData: [
        {
          date: "2020.4.1",
          name: "屈彦喜",
          status: "正常打卡",
        },
        {
          date: "2020.4.1",
          name: "杨学权",
          status: "正常打卡",
        },
        {
          date: "2020.4.4",
          name: "杨玉栋",
          status: "正常打卡",
        },
        {
          date: "2020.4.1",
          name: "张浩",
          status: "正常打卡",
        },
        {
          date: "2020.4.8",
          name: "邹建平",
          status: "正常打卡",
        },
        {
          date: "2020.4.1",
          name: "韩长玉",
          status: "正常打卡",
        },
        {
          date: "2020.4.1",
          name: "张晓辉",
          status: "正常打卡",
        },
        {
          date: "2020.4.13",
          name: "宫春龙",
          status: "正常打卡",
        },
        {
          date: "2020.4.1",
          name: "郭旭",
          status: "正常打卡",
        },
        {
          date: "2020.4.1",
          name: "马守彬",
          status: "正常打卡",
        },
        {
          date: "2020.4.1",
          name: "刘磊",
          status: "正常打卡",
        },
        {
          date: "2020.5.1",
          name: "张军",
          status: "正常打卡",
        },
        {
          date: "2020.5.11",
          name: "孙海杰",
          status: "正常打卡",
        },
      ],
      xyData: [
        {
          date: "2020.4.1",
          name: "屈彦喜",
          status: "正常打卡",
        },
        {
          date: "2020.4.1",
          name: "杨学权",
          status: "正常打卡",
        },
        {
          date: "2020.4.4",
          name: "杨玉栋",
          status: "正常打卡",
        },
        {
          date: "2020.4.1",
          name: "张浩",
          status: "正常打卡",
        },
        {
          date: "2020.4.8",
          name: "邹建平",
          status: "正常打卡",
        },
        {
          date: "2020.4.1",
          name: "韩长玉",
          status: "正常打卡",
        },
        {
          date: "2020.4.1",
          name: "张晓辉",
          status: "正常打卡",
        },
        {
          date: "2020.4.13",
          name: "宫春龙",
          status: "正常打卡",
        },
        {
          date: "2020.4.1",
          name: "郭旭",
          status: "正常打卡",
        },
        {
          date: "2020.4.1",
          name: "马守彬",
          status: "正常打卡",
        },
        {
          date: "2020.4.1",
          name: "刘磊",
          status: "正常打卡",
        },
        {
          date: "2020.5.1",
          name: "张军",
          status: "正常打卡",
        },
        {
          date: "2020.5.11",
          name: "孙海杰",
          status: "正常打卡",
        },
      ],
      zcData: [
        {
          date: "2020.4.1",
          name: "屈彦喜",
          status: "正常打卡",
        },
        {
          date: "2020.4.1",
          name: "杨学权",
          status: "正常打卡",
        },
        {
          date: "2020.4.4",
          name: "杨玉栋",
          status: "正常打卡",
        },
        {
          date: "2020.4.1",
          name: "张浩",
          status: "正常打卡",
        },
        {
          date: "2020.4.8",
          name: "邹建平",
          status: "正常打卡",
        },
        {
          date: "2020.4.1",
          name: "韩长玉",
          status: "正常打卡",
        },
        {
          date: "2020.4.1",
          name: "张晓辉",
          status: "正常打卡",
        },
        {
          date: "2020.4.13",
          name: "宫春龙",
          status: "正常打卡",
        },
        {
          date: "2020.4.1",
          name: "郭旭",
          status: "正常打卡",
        },
        {
          date: "2020.4.1",
          name: "马守彬",
          status: "正常打卡",
        },
        {
          date: "2020.4.1",
          name: "刘磊",
          status: "正常打卡",
        },
        {
          date: "2020.5.1",
          name: "张军",
          status: "正常打卡",
        },
        {
          date: "2020.5.11",
          name: "孙海杰",
          status: "正常打卡",
        },
      ],
      weatherData: [],
    };
  },
  created() {
    this.MgetWeatherData();
  },
  methods: {
    // 质量管理连接
    quality() {
      window.open("http://zjjt-quality.1357.cn/Admin/Login", "_blank");
    },
    //
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
  background: transparent;
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
.dialogWeather,.shield-popover,.check-manage {
  background-image: linear-gradient(#023863, #06111e);
}
.dialogWeather span ,.check-manage span,.check-manage h1{
  color: #fff;
}
.check-manage .el-table .check-cc,
.check-manage .el-table .check-xy,
.check-manage .el-table .check-zc{
  background: linear-gradient(#023863, #06111e);
  color: #fff;
}
</style>