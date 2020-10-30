<template>
  <div class="top-sub">
    <el-row type="flex">
      <el-col :span="9">
        <el-row type="flex" class="header-btn">
          <el-col :span="6"><el-button>考勤管理</el-button></el-col>
          <el-col :span="6"><el-button>视频监控</el-button></el-col>
          <el-col :span="6"><el-button>质量管理</el-button></el-col>
          <el-col :span="6"><el-button>安全管理</el-button></el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <h1 class="header-title">智慧工地综合管理平台</h1>
      </el-col>
      <el-col :span="9">
        <el-row type="flex" class="header-btn">
          <el-col :span="6"><el-button>施工监测</el-button></el-col>
          <el-col :span="6"><el-button>环境监测</el-button></el-col>
          <el-col :span="6"><el-button>盾构监测</el-button></el-col>
          <el-col :span="6"><el-button>进度管理</el-button></el-col>
        </el-row>
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
.header-title {
  font-size: 1.75rem;
  color: #fff;
  text-align: center;
}
.header-btn {
  text-align: center;
}
.header-btn button{
  background: transparent;
  color: #fff;
}
.el-row{
  align-items: center;
  justify-items: center;
}
</style>