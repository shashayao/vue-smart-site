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
  height: 80px;
  line-height: 80px;
}
.header-title {
  display: block;
  text-align: center;
  font-size: 2.2em;
  color: #fff;
}
.header-btn-left {
  text-align: left;
  width: 100%;
}
.header-btn-left button,
.mapImg {
  margin-left: 30px;
  font-size: 18px;
}
.header-btn-right {
  text-align: right;
  width: 100%;
}
.header-btn-right button {
  margin-right: 30px;
  font-size: 18px;
}
</style>