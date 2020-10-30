<template>
  <div>
    <el-row type="flex" class="row-bg">
      <el-col :span="8">
        <div class="grid-content bg-purple header-btn header-btn-left">
          <el-button>考勤管理</el-button>
          <el-button>视频监控</el-button>
          <el-button>质量管理</el-button>
          <el-button>安全管理</el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <span class="header-title">智慧工地综合管理平台</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple header-btn header-btn-right">
          <el-button>施工监测</el-button>
          <el-button>环境监测</el-button>
          <el-button>盾构监测</el-button>
          <el-button>进度管理</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "TopSub",
};
</script>

<style scoped>
.row-bg {
  padding: 1%;
}
.header-title {
  display: block;
  text-align: center;
  font-size: 3vw;
  color: #fff;
}
.header-btn-left {
  text-align: left;
  width: 100%;
}
.header-btn-left button,
.mapImg,
.header-btn-right button {
  /* margin-left: 1%; */
  /* font-size: 18px; */
  padding: 3% 4%;
  background: transparent;
  color: #fff;
  font-size:1vw;
}
.header-btn-right {
  text-align: right;
  width: 100%;
}
/* .header-btn-right button {
  margin-right: 1%;
  font-size: 18px;
  padding: 3% 4%;
} */
</style>