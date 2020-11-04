<template>
  <div>
    <div style class="toolbarDiv" v-show="showToolBar">
      <div class="closeToolBar" @click="showOrHideToolBar(true)">
        <i class="el-icon-arrow-right" style="line-height:50px;"></i>
      </div>
      <el-popover popper-class="mapPop" placement="bottom" width="100" trigger="click">
        <div @click="measureDis">
          <svg
            class="icon"
            style="width: 14px; height: 14px;vertical-align: middle;fill: currentColor;overflow: hidden;"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1803"
          >
            <path
              d="M43.933358 473.011011l938.177933 0.061398-0.01842 285.520849-938.178956-0.060375L43.933358 473.011011zM941.305285 717.802226l0.013304-203.943902-101.975618-0.00614-0.007163 122.366955c-0.001023 11.271718-9.134405 20.392446-20.397375 20.391423-11.262969 0-20.394305-9.122775-20.394305-20.394493l0.008187-122.366955-61.185985-0.004093-0.004093 61.182454c0 11.272741-9.133382 20.394493-20.396352 20.393469-11.262969 0-20.394305-9.123798-20.393281-20.396539l0.00307-61.182454-61.185985-0.004093-0.007163 122.367979c-0.001023 11.271718-9.133382 20.392446-20.397375 20.391423-11.263993 0-20.395328-9.122775-20.394305-20.394493l0.008187-122.366955-61.185985-0.004093-0.00307 61.182454c-0.001023 11.272741-9.133382 20.394493-20.398398 20.393469-11.260923 0-20.392258-9.123798-20.392258-20.396539l0.004093-61.182454-61.185985-0.004093-0.008187 122.366955c-0.001023 11.271718-9.133382 20.393469-20.397375 20.392446-11.263993 0-20.394305-9.122775-20.393281-20.394493l0.007163-122.366955-61.185985-0.004093-0.00307 61.182454c-0.001023 11.272741-9.132359 20.394493-20.396352 20.394493-11.262969-0.001023-20.395328-9.124821-20.394305-20.397562l0.00307-61.182454-61.184961-0.004093-0.008187 122.366955c0 11.271718-9.131335 20.392446-20.395328 20.391423-11.262969 0-20.396352-9.121751-20.395328-20.393469l0.008187-122.366955-101.975618-0.007163L84.706618 717.746968 941.305285 717.802226zM41.376011 335.577918l940.921529 0 0 53.721529-940.921529 0 0-53.721529Z"
              p-id="1804"
            />
          </svg>
          距离量测
        </div>
        <div @click="measureArea">
          <svg
            class="icon"
            style="width: 16px; height: 16px;vertical-align: middle;fill: currentColor;overflow: hidden;"
            viewBox="0 0 1449 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="10008"
          >
            <path
              d="M204.613 720.844l693.927-693.935 275.798 275.836-693.89 693.91-275.836-275.811zM245.562 720.844l234.884 234.863 652.971-652.963-234.877-234.892-65.248 65.248 72.076 72.063-20.474 20.466-72.061-72.063-63.031 63.024 145.659 145.659-20.459 20.466-145.659-145.659-63.018 63.008 72.061 72.078-20.474 20.466-72.063-72.07-63.031 63.031 145.687 145.644-20.474 20.483-145.687-145.651-63.001 63.008 72.055 72.048-20.466 20.476-72.055-72.058-63.031 63.037 145.659 145.644-20.468 20.476-145.659-145.66-63.023 63.018 72.063 72.063-20.468 20.459-72.063-72.05-66.325 66.34z"
              p-id="10009"
            />
          </svg>
          面积量测
        </div>
        <div @click="coordinate">
          <svg
            class="icon"
            style="width: 16px; height: 16px;vertical-align: middle;fill: currentColor;overflow: hidden;"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3226"
          >
            <path
              d="M953.516204 675.271574l-218.559784-80.486102 0 64.685231L608.510566 659.470703c-7.797593-119.770827-103.564727-215.537961-223.335554-223.335554L385.175011 282.901185l64.685231 0L369.37414 64.310701l-80.486102 218.590484 64.685231 0 0 153.23294c-119.743198 7.79964-215.507262 103.56575-223.304855 223.335554L70.482773 659.46968l0 31.601742 59.785641 0c7.797593 119.769804 103.561657 215.536938 223.304855 223.336578l0 45.280276 31.602765 0 0-45.280276c119.771851-7.797593 215.537961-103.56575 223.335554-223.336578l126.44483 0 0 64.685231L953.516204 675.271574zM485.522464 659.46968l-100.347452 0 0-100.347452C437.276646 566.141084 478.503607 607.368044 485.522464 659.46968zM353.573269 559.124274l0 100.346429-100.31573 0C260.27435 607.371114 301.496194 566.145178 353.573269 559.124274zM253.257539 691.071422l100.31573 0 0 100.346429C301.49824 784.392854 260.27742 743.150544 253.257539 691.071422zM385.175011 791.417851l0-100.346429 100.346429 0C478.50156 743.152591 437.2746 784.395924 385.175011 791.417851z"
              p-id="3227"
            />
          </svg>
          坐标量算
        </div>
        <div slot="reference">
          <svg
            class="icon"
            style="width: 20px; height: 20px;vertical-align: middle;fill: currentColor;overflow: hidden;"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2081"
          >
            <path
              d="M722.863674 0h240.941106a60.235276 60.235276 0 0 1 60.235276 60.235276v903.529146a60.235276 60.235276 0 0 1-60.235276 60.235277h-240.941106a60.235276 60.235276 0 0 1-60.235276-60.235277V60.235276a60.235276 60.235276 0 0 1 60.235276-60.235276z m0 60.235276v903.529146h240.941106V60.235276h-240.941106zM25.670468 450.469515L453.491518 25.389169a87.521857 87.521857 0 0 1 123.271494 0A86.738798 86.738798 0 0 1 602.393122 86.919504v850.160691A87.10021 87.10021 0 0 1 515.112206 1023.999699a87.461621 87.461621 0 0 1-61.620688-25.389169L25.64035 573.530184a86.648445 86.648445 0 0 1 0-123.060669z m42.46587 42.736928a26.413169 26.413169 0 0 0 0 37.586813l427.790933 425.080345a27.226345 27.226345 0 0 0 19.184935 7.890821 26.864933 26.864933 0 0 0 27.045639-26.684227V86.919504a26.503522 26.503522 0 0 0-7.830586-18.793406 27.28658 27.28658 0 0 0-38.399988 0L68.136338 493.206443zM255.43793 465.136804l133.993372-134.02349a45.176457 45.176457 0 0 1 77.101154 31.924697v268.04698a45.176457 45.176457 0 0 1-77.101154 31.924696l-134.02349-133.993372a45.176457 45.176457 0 0 1 0-63.879511z m150.889367 129.596198v-195.312884l-97.671501 97.641383 97.671501 97.671501zM667.808632 210.823467m30.117638 0l120.470553 0q30.117638 0 30.117638 30.117639l0 0q0 30.117638-30.117638 30.117638l-120.470553 0q-30.117638 0-30.117638-30.117638l0 0q0-30.117638 30.117638-30.117639ZM667.808632 602.352764m30.117638 0l120.470553 0q30.117638 0 30.117638 30.117638l0 0q0 30.117638-30.117638 30.117638l-120.470553 0q-30.117638 0-30.117638-30.117638l0 0q0-30.117638 30.117638-30.117638ZM667.808632 421.646935m30.117638 0l60.235276 0q30.117638 0 30.117639 30.117638l0 0q0 30.117638-30.117639 30.117638l-60.235276 0q-30.117638 0-30.117638-30.117638l0 0q0-30.117638 30.117638-30.117638ZM667.808632 813.176231m30.117638 0l60.235276 0q30.117638 0 30.117639 30.117639l0 0q0 30.117638-30.117639 30.117638l-60.235276 0q-30.117638 0-30.117638-30.117638l0 0q0-30.117638 30.117638-30.117639Z"
              p-id="2082"
            />
          </svg>
          <p>量测</p>
        </div>
      </el-popover>

      <el-popover popper-class="mapPop" placement="bottom" width="100" trigger="click">
        <div @click="markerPoint">
          <i class="el-icon-place"></i>
          标记点
        </div>
        <div @click="markerLine">
          <i class="el-icon-add-location"></i>
          标记线
        </div>
        <div @click="markerPolygon">
          <i class="el-icon-map-location"></i>
          标记面
        </div>
        <div @click="markerThing">
          <i class="el-icon-location-outline"></i>
          标记事件
        </div>
        <div slot="reference">
          <i class="el-icon-s-flag" style="font-size:20px;"></i>
          <p>标记</p>
        </div>
      </el-popover>

      <div @click="selectEquirement">
        <svg
          class="icon"
          style="width: 16px; height: 16px;vertical-align: middle;fill: currentColor;overflow: hidden;"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2816"
        >
          <path
            d="M898.59 839.44c0 32.9-26.67 59.56-59.56 59.56H183.88c-32.9 0-59.56-26.66-59.56-59.56V184.29c0-32.9 26.66-59.56 59.56-59.56h655.15c32.9 0 59.56 26.66 59.56 59.56v655.15zM839.03 65.17H183.88c-65.78 0-119.12 53.34-119.12 119.12v655.15c0 65.79 53.34 119.12 119.12 119.12h655.15c65.79 0 119.12-53.33 119.12-119.12V184.29c0-65.78-53.33-119.12-119.12-119.12z"
            p-id="2817"
          />
        </svg>
        <p>框选</p>
      </div>
      <!-- <div @click="sx">
        <i class="el-icon-pie-chart" style="font-size:20px;"></i>
        <p>扇形</p>
      </div> -->
      <div @click="deleteLayer">
        <i class="el-icon-delete" style="font-size:20px;"></i>
        <p>清除</p>
      </div>
      <div @click="deleteAll">
        <i class="el-icon-delete-solid" style="font-size:20px;"></i>
        <p>清屏</p>
      </div>
      <div @click="printMap">
        <i class="el-icon-scissors" style="font-size:20px;"></i>
        <p>截屏</p>
      </div>
      <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->
      <div @click="changeMap(2)" v-show="showIndex==3?true:false">
        <svg
          class="icon"
          style="width: 16px; height: 16px;vertical-align: middle;fill: currentColor;overflow: hidden;"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6141"
        >
          <path
            d="M870.4 563.2h-175.616a1767.424 1767.424 0 0 1-144.384 187.904l-38.4 42.496-38.4-42.496A1767.424 1767.424 0 0 1 329.216 563.2H153.6l-153.6 460.8h1024zM768 256A256 256 0 0 0 256 256c0 175.104 256 460.8 256 460.8s256-285.696 256-460.8zM409.6 256a102.4 102.4 0 1 1 102.4 102.4 102.4 102.4 0 0 1-102.4-102.4z"
            p-id="6142"
          />
        </svg>
        <p>影像地图</p>
      </div>
      <div @click="changeMap(3)" v-show="showIndex==2?true:false">
        <svg
          class="icon"
          style="width: 16px; height: 16px;vertical-align: middle;fill: currentColor;overflow: hidden;"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6348"
        >
          <path
            d="M723.2 509.866667a298.496 298.496 0 0 0 79.274667-280.832l106.453333-45.653334a21.333333 21.333333 0 0 1 29.738667 19.626667V810.666667l-298.666667 128-256-128-268.928 115.242666a21.333333 21.333333 0 0 1-29.738667-19.626666V298.666667l133.504-57.216a298.368 298.368 0 0 0 81.962667 268.373333L512 721.066667l211.2-211.2z m-60.330667-60.330667L512 600.32l-150.869333-150.826667a213.333333 213.333333 0 1 1 301.738666 0z"
            p-id="6349"
          />
        </svg>
        <p>矢量地图</p>
      </div>
    </div>

   <div class="toolIcon" @click="showOrHideToolBar(showToolBar)">
      <i class="el-icon-shopping-bag-1" style="font-size:20px;margin-top:5px;"></i>
      <p>工具箱</p>
    </div>
    <el-dialog
      title="坐标量算"
      :visible.sync="dialogCoordinateVisible"
      width="30%"
      center
      top="40vh"
      :modal="false"
      class="coordinatePop"
    >
      <el-form :model="form">
        <el-form-item label="坐标1" :label-width="formLabelWidth">
          <el-input v-model="form.coordinate1" autocomplete="off"></el-input>
          <i class="el-icon-location-outline icon-location" @click="coordinate1"></i>
        </el-form-item>
        <el-form-item label="坐标2" :label-width="formLabelWidth" style="margin-top:20px;">
          <el-input v-model="form.coordinate2"></el-input>
          <i class="el-icon-location-outline icon-location" @click="coordinate2"></i>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCoordinateVisible = false">取 消</el-button>
        <el-button type="primary" @click="computerBtn">确 定</el-button>
      </div>
    </el-dialog>
    <div></div>
  </div>
</template>

<script>
import LMap from "../../utils/LMap";
import G from "../../utils/common";
// import Screenfull from "@/components/Screenfull";
import Img from "@/assets/img/marker-icon.png";
export default {
  name: "Map",
  props: {
    Map: Object,
    dialogVisible: Object,
  },
  components: {
    // Screenfull,
  },
  data() {
    return {
      // map: this.Map,
      newDialogVisible: this.dialogVisible,
      img: require("@/assets/img/marker-icon.png"),
      drawnItems: null, //后台传给的值
      curEditLayer: null,
      showToolBar: false,
      dialogCoordinateVisible: false,
      showIndex: 2,
      coordinateType: null,
      drawPointlat1: null,
      drawPointlng1: null,
      drawPointlat2: null,
      drawPointlng2: null,
      form: {
        coordinate1: "",
        coordinate2: "",
      },
      formLabelWidth: "60px",
      // showIndex: false,
    };
  },
  created() {},
  watch: {
    dialogVisible(value) {
      this.dialogCoordinateVisible = value.dialog;
      if (this.coordinateType == "1") {
        this.drawPointlat1 = value.layer._latlng.lat.toFixed(6);
        this.drawPointlng1 = value.layer._latlng.lng.toFixed(6);
        this.form.coordinate1 =
          value.layer._latlng.lng.toFixed(6).toFixed(6) +
          "," +
          value.layer._latlng.lat.toFixed(6).toFixed(6);
      } else {
        this.drawPointlat2 = value.layer._latlng.lat.toFixed(6);
        this.drawPointlng2 = value.layer._latlng.lng.toFixed(6);
        this.form.coordinate2 =
          value.layer._latlng.lng.toFixed(6).toFixed(6) +
          "," +
          value.layer._latlng.lat.toFixed(6).toFixed(6);
      }
    },
  },
  methods: {
    //扇形
    /* sx() {
      G.markerType = "sx";
      let json1 = LMap.geometryAnalyse.sector([126.43,43.52],1000,30,60);
      let mmLayer=  L.geoJSON(json1);
      G.map.addLayer(mmLayer)
    }, */
   
    //控制图层板块显隐
    /* showView() {
      this.showIndex = !this.showIndex;
    }, */
    showOrHideToolBar(flag) {
      this.showToolBar = !flag;
    },
    measureDis() {
      LMap.measureDistince(G.map);
      
    },
    measureArea() {
      LMap.measureArea(G.map);
    },
    markerPoint() {
      G.markerType = "markerPoint";
      const icon = LMap.marker.createMarkerIcon(this.img, 20, 30);
      LMap.drawMark(G.map, icon);
    },
    markerLine() {
      G.markerType = "markerLine";
      const lineOptions = {
        //配置绘面的样式
        stroke: true, //设置是否显示边框
        color: "#3388ff", //设置边框颜色
        weight: 4, //设置边框宽度
        opacity: 0.5, //填充透明度
        fill: false, //是否填充
        clickable: true,
      };
      LMap.drawLine(G.map, lineOptions);
    },
    markerPolygon() {
      G.markerType = "markerPolygon";
      const shapeOptions = {
        //配置绘面的样式
        stroke: true, //设置是否显示边框
        color: "#3388ff", //设置边框颜色
        weight: 4, //设置边框宽度
        opacity: 0.5, //填充透明度
        fill: true, //是否填充
        clickable: true,
      };
      LMap.drawPolygon(G.map, shapeOptions);
    },
    markerThing() {
      G.markerType = "markerThing";
      var icon = LMap.marker.createMarkerIcon(this.img, 20, 30);
      LMap.drawMark(G.map, icon);
    },
    selectEquirement() {
      G.isSelectEquipment = true;
      LMap.drawRectangle(G.map, null);
    },
    deleteLayer() {
      LMap.drawDelete(G.map, G.drawItems);
    },
    deleteAll() {
      if (G.feelEquipmentLayers) {
        G.feelEquipmentLayers.clearLayers();
      }
      if (G.selectQeuipmentLayers) {
        G.selectQeuipmentLayers.clearLayers();
      }
      if (G.selectQeuipmentLayers) {
        G.selectQeuipmentLayers.clearLayers();
      }
      LMap.removeAllLayer();
    },
    coordinate1() {
      this.dialogCoordinateVisible = false;
      var icon = LMap.marker.createMarkerIcon(this.img, 20, 30);
      LMap.drawMark(G.map, icon);
      G.markerType = "coordinate";
      this.coordinateType = "1";
    },
    coordinate2() {
      this.dialogCoordinateVisible = false;
      let icon = LMap.marker.createMarkerIcon(this.img, 20, 30);
      LMap.drawMark(G.map, icon);
      G.markerType = "coordinate";
      this.coordinateType = "2";
    },
    computerBtn() {
      this.dialogCoordinateVisible = false;
      let latlng = L.latLng(this.drawPointlat1, this.drawPointlng1);
      latlng.distanceTo(L.latLng(this.drawPointlat2, this.drawPointlng2));
      let lineArr = [
        [this.drawPointlat1, this.drawPointlng1],
        [this.drawPointlat2, this.drawPointlng2],
      ];
      let myIcon = L.divIcon({
        html:
          '<div style="font-size:14px;width:200px;color:red;">' +
          (
            latlng.distanceTo(
              L.latLng(this.drawPointlat2, this.drawPointlng2)
            ) / 1000
          ).toFixed(2) +
          "Km<div>",
        className: "my-div-icon",
      });
      L.marker([this.drawPointlat2, this.drawPointlng2], {
        icon: myIcon,
      }).addTo(G.map);
      let line = L.polyline(
        lineArr,
        {
          color: "red",
          opacity: "0.8",
          weight: "3",
        },
        {
          showMeasurements: true,
          measurementOptions: {
            imperial: true,
          },
        }
      ).addTo(G.map);
    },
    changeMap(type) {
      this.showIndex = type;
      this.$parent.changeMap(G.map, type);
    },
    printMap() {
      LMap.printMap();
    },
    coordinate() {
      this.dialogCoordinateVisible = true;
    },
    derivedData() {
    
    },
    getEditLayer(layer, layerType) {
      //获得编辑Layer事件函数
      this.curEditLayer = layer;
    },
    layerControl() {
      this.dialogLayerControlVisible = true;
    },
    assignS() {},
  },
};
</script>

<style lang="scss" scoped >
* {
  margin: 0;
  padding: 0;
}

.toolbarDiv,
.toolIcon {
  position: absolute;
  top: 10px;
  right: 133px;
  z-index: 9999;
  background-color: rgba(9, 60, 85, 0.8);
  height: 50px;
  font-size: 14px;
}
.closeToolBar {
  background: rgb(17, 142, 203) !important;
  width: 15px !important;
  height: 100%;
  margin-top: 0 !important;
}
.toolbarDiv div,
.toolIcon {
  color: #fff;
  width: 73px;
  text-align: center;
  margin-top: 5px;
  border-right: 1px solid rgba(24, 91, 128, 1);
  float: left;
  cursor: pointer;
}
.toolbarDiv p {
  margin-top: 3px;
}
.toolIcon {
  // background: rgba(9, 60, 85, 0.8) url(../../assets/image/toolBar.png) no-repeat;
  background-size: 100% 100%;
  height: 50px !important;
  margin-top: 0px !important;
  right: 60px;
}

#screenfull {
  margin-top: 6px;
}
.el-button--medium {
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
}

.el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 400;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.el-button--primary {
  color: #fff;
  background-color: #e72528;
  border-color: #e72528;
}
.icon-location {
  color: #fff;
  font-size: 16px;
  position: absolute;
  top: 10px;
  right: -25px;
  cursor: pointer;
}
.el-form-item__content {
  margin-right: 20px;
}
</style>
