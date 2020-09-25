<template>
  <el-row type="flex" class="row-bg">
    <el-col :span="4">
      <div>
        <label>环境监测</label>
      </div>
    </el-col>
    <el-col :span="4">
      <div>
        <label>其他问题统计</label>
      </div>
    </el-col>
    <el-col :span="4">
      <div>
        <label>9月质量问题统计</label>
      </div>
    </el-col>
    <el-col :span="4">
      <div>
        <label>9月安全问题统计</label>
      </div>
    </el-col>
    <el-col :span="8">
      <div>
        <label>形象进度</label>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name:'BottomSub'
};
</script>

<style scoped>
.row-bg {
  height: 80px;
  line-height: 80px;
}
</style>