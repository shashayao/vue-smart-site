<template>
  <div class="container" :style="{ backgroundImage: 'url(' + bgImg + ')' }">
    <!-- header -->
    <top-sub />
    <center-sub />
    <bottom-sub />
  </div>
</template>

<script>
import TopSub from "./TopSub";
import CenterSub from "./CenterSub";
import BottomSub from "./BottomSub"
export default {
  components: {
    TopSub,
    CenterSub,
    BottomSub
  },
  data() {
    return {
      bgImg: require("assets/img/bg.jpg"),
    };
  },
};
</script>

<style scoped>
.container {
  font-size: 20px;
  width: 100%;
  height: auto;
}
</style>