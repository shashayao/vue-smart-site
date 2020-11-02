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

<style>
@import "../assets/css/base.css";
.container {
  font-size: 0.9rem;
  width: 100%;
  height: 100vh;
}
</style>