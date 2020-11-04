<template>
  <div>
    <div id="map" :style="{height: autoHeight}"></div>
    <ToolBar :Map="map" :dialogVisible="dialogCoordinate"></ToolBar>
    <el-dialog title="标记" :visible.sync="dialogFormVisible" width="30%" center top="27vh">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <ProcessTree></ProcessTree> -->
  </div>
</template>

<script>
import ToolBar from "./toolBar/index";
// import ProcessTree from '@/components/processTree';
import LMap from "../utils/LMap";
import G from "../utils/common";
export default {
  name: "Map",
  data() {
    return {
      img: require("@/assets/img/marker-icon.png"),
      map: G.map,
      drawItems: null, //后台传给的值
      curEditLayer: null,
      dialogFormVisible: false,
      route: this.$route,
      dialogCoordinate: {
        dialog: false,
        layer: null,
      },
      autoHeight: document.body.clientHeight - 130 + "px",
      form: {
        name: "",
        desc: "",
      },
      formLabelWidth: "60px",
      screenWidth: document.body.clientWidth,
      property: {
        //属性
        mapLayerType: {
          //地图图层类型
          tianditu: 0,
          tiandituvector: 1,
          google: 2,
          googlevector: 3,
        },
        baseLayers: null, //底图图层组
      },
      // mapOpetation: {//地图操作对象

      Layer: {
        //图层对象
        downloadimage: {
          //下载
          satellite: L.tileLayer.chinaProvider("DownLoadImages.satellite.Map", {
            //矢量底图
            maxZoom: 13,
            minZoom: 5,
          }),
          overlay: L.tileLayer.chinaProvider("DownLoadImages.overlay.Map", {
            //矢量底图
            maxZoom: 13,
            minZoom: 5,
          }),
          roadmap: L.tileLayer.chinaProvider("DownLoadImages.roadmap.Map", {
            //矢量底图
            maxZoom: 13,
            minZoom: 5,
          }),
        },
        offlinetms: {
          department: L.tileLayer.chinaProvider(
            "OffLineTms.department.ArcGIS",
            {
              //行政区划
              maxZoom: 12,
              minZoom: 7,
            }
          ),
        },
        tianditu: {
          //天地图
          normalMap: L.tileLayer.chinaProvider("TianDiTu.Normal.Map", {
            //矢量底图
            maxZoom: 22,
            minZoom: 5,
          }),
          annotion: L.tileLayer.chinaProvider("TianDiTu.Normal.Annotion", {
            //矢量注记
            maxZoom: 22,
            minZoom: 5,
          }),
          satelliteMap: L.tileLayer.chinaProvider("TianDiTu.Satellite.Map", {
            //影像底图
            maxZoom: 22,
            minZoom: 1,
          }),
          asatelliteMap: L.tileLayer.chinaProvider(
            "TianDiTu.Satellite.Annotion",
            {
              //影像注记
              maxZoom: 22,
              minZoom: 1,
            }
          ),
        },
        google: {
          normalMap: L.tileLayer.chinaProvider("Google.Normal.Map", {
            //矢量底图
            maxZoom: 22,
            minZoom: 5,
          }),
          satelliteMap: L.tileLayer.chinaProvider("Google.Satellite.Map", {
            //影像底图
            maxZoom: 22,
            minZoom: 5,
          }),
          asatelliteMap: L.tileLayer.chinaProvider(
            "Google.Satellite.Annotion",
            {
              //影像注记
              maxZoom: 22,
              minZoom: 5,
            }
          ),
        },
      },
    };
  },
  components: {
    ToolBar,
    // LeftBtn
  },
  mounted() {
    G.map = this.showMap(
      "map",
      this.property.mapLayerType.google,
      126.45,
      43.95,
      10
    ); //加载地图
    LMap.registerDrawComplete(
      G.map,
      this.drawComplete,
      this.getEditLayer,
      true
    ); //第三个参数是否允许编辑
    /* var json1 = LMap.geometryAnalyse.sector([126.43, 43.52], 10, 30, 60);
    var mmLayer = L.geoJSON(json1);
    G.map.addLayer(mmLayer); */
    // 点图层
    G.markLayer = L.layerGroup();
    G.map.addLayer(G.markLayer);
    //多边形图层
    G.polygonLayer = L.layerGroup();
    G.map.addLayer(G.polygonLayer);
    let marr = {
      results: [
        {
          DEPT_ID: "D328F88E06E941A184AEE99AE54CC7B3",
          LONGITUDE: 126.45644,
          REPT_AREA: 0,
          REPT_PER: "6222F3A1DF444D30A544DDC2DF4F0AA3",
          REPT_TEL: null,
          REPT_ID: "79C7DA1DCAB44B23A01A293B7852112A",
          VALPHA: "50",
          SHAPE:
            "POLYGON  (( 126.45632731 43.95711276, 126.45635681 43.95706642, 126.45654725 43.95713400, 126.45651238 43.95717648, 126.45632731 43.95711276))",
          DESCRIPTION: null,
          REPT_NAME: "原粮仓",
          ADDRESS: null,
          DISTRICT_CODE: null,
          REPT_TYPE_CODE: "0",
          VCOLOR: "FFFFFF",
          CREATE_TIME: "2020-02-24 00:00:00",
          LATITUDE: 43.95712,
          STORAGE_TYPE: "1",
        },
        {
          DEPT_ID: "D328F88E06E941A184AEE99AE54CC7B3",
          LONGITUDE: 126.4564,
          REPT_AREA: 0.03,
          REPT_PER: "6222F3A1DF444D30A544DDC2DF4F0AA3",
          REPT_TEL: null,
          REPT_ID: "4D23347466E141DA8189B0C878A5699D",
          VALPHA: "50",
          SHAPE:
            "POLYGON  (( 126.45635681 43.95705098, 126.45638095 43.95702781, 126.45645337 43.95704905, 126.45641582 43.95707028, 126.45635681 43.95705098))",
          DESCRIPTION: null,
          REPT_NAME: "农资库",
          ADDRESS: null,
          DISTRICT_CODE: null,
          REPT_TYPE_CODE: "2",
          VCOLOR: "FFFFFF",
          CREATE_TIME: "2020-02-24 00:00:00",
          LATITUDE: 43.95705,
          STORAGE_TYPE: "1",
        },
        {
          DEPT_ID: "D328F88E06E941A184AEE99AE54CC7B3",
          LONGITUDE: 125.14691,
          REPT_AREA: 0.13,
          REPT_PER: "6222F3A1DF444D30A544DDC2DF4F0AA3",
          REPT_TEL: "12359588525",
          REPT_ID: "05C2682D8B494F5BBFE39E9B57CF2E93",
          VALPHA: "50",
          SHAPE:
            "POLYGON  (( 125.14681033 44.38199307, 125.14685861 44.38194131, 125.14701418 44.38200073, 125.14697663 44.38204291, 125.14681033 44.38199307))",
          DESCRIPTION: null,
          REPT_NAME: "储藏室",
          ADDRESS: null,
          DISTRICT_CODE: null,
          REPT_TYPE_CODE: "3",
          VCOLOR: "FFFFFF",
          CREATE_TIME: "2020-01-15 00:00:00",
          LATITUDE: 44.38199,
          STORAGE_TYPE: "1",
        },
        {
          DEPT_ID: "D328F88E06E941A184AEE99AE54CC7B3",
          LONGITUDE: 125.43783,
          REPT_AREA: 0.11,
          REPT_PER: "6222F3A1DF444D30A544DDC2DF4F0AA3",
          REPT_TEL: null,
          REPT_ID: "97F8E7C61D9B4213A78078145327711D",
          VALPHA: "50",
          SHAPE:
            "POLYGON  (( 125.43775281 43.82702883, 125.43779573 43.82696884, 125.43790435 43.82701141, 125.43786010 43.82707333, 125.43775281 43.82702883))",
          DESCRIPTION: null,
          REPT_NAME: "aa",
          ADDRESS: null,
          DISTRICT_CODE: null,
          REPT_TYPE_CODE: "0",
          VCOLOR: "FFFFFF",
          CREATE_TIME: "2020-04-03 00:00:00",
          LATITUDE: 43.82702,
          STORAGE_TYPE: "1",
        },
        {
          DEPT_ID: "D328F88E06E941A184AEE99AE54CC7B3",
          LONGITUDE: 39.56423,
          REPT_AREA: 11111,
          REPT_PER: "6222F3A1DF444D30A544DDC2DF4F0AA3",
          REPT_TEL: null,
          REPT_ID: "9BD55DB9E3AE49C4AB4225D2F87A97FE",
          VALPHA: "50",
          SHAPE:
            "POLYGON  (( 39.41442848 49.52175053, 38.64538551 49.01996830, 39.67810036 48.45481923, 40.51306130 48.86121047, 39.41442848 49.52175053))",
          DESCRIPTION: null,
          REPT_NAME: "R测试-稻花香库",
          ADDRESS: null,
          DISTRICT_CODE: null,
          REPT_TYPE_CODE: "0",
          VCOLOR: "FFFFFF",
          CREATE_TIME: "2020-06-04 00:00:00",
          LATITUDE: 48.97372,
          STORAGE_TYPE: "1",
        },
        {
          DEPT_ID: "D328F88E06E941A184AEE99AE54CC7B3",
          LONGITUDE: 125.43758,
          REPT_AREA: 36.35,
          REPT_PER: "32BF0ACFA0894DCAA50A768D44D9543B",
          REPT_TEL: "17804304455",
          REPT_ID: "FED543C33F8B432281B7637A7C94F6D2",
          VALPHA: "50",
          SHAPE:
            "POLYGON  (( 125.43611406 43.86037396, 125.43710111 43.85929093, 125.43701528 43.85916716, 125.43916105 43.86130225, 125.43886064 43.86158074, 125.43611406 43.86037396))",
          DESCRIPTION: null,
          REPT_NAME: "仓库",
          ADDRESS: null,
          DISTRICT_CODE: null,
          REPT_TYPE_CODE: "3",
          VCOLOR: "FFFFFF",
          CREATE_TIME: "2020-03-28 00:00:00",
          LATITUDE: 43.86047,
          STORAGE_TYPE: "1",
        },
        {
          DEPT_ID: "D328F88E06E941A184AEE99AE54CC7B3",
          LONGITUDE: 122.11084,
          REPT_AREA: 28659.36,
          REPT_PER: "6222F3A1DF444D30A544DDC2DF4F0AA3",
          REPT_TEL: null,
          REPT_ID: "6CBE090E0A6A4C0FB283AC0B1946B59E",
          VALPHA: "50",
          SHAPE:
            "POLYGON  (( 122.07351975 43.94692850, 122.11059860 43.90835490, 122.14767746 43.92517211, 122.11197189 43.96571171, 122.07351975 43.94692850))",
          DESCRIPTION: null,
          REPT_NAME: "原粮库",
          ADDRESS: null,
          DISTRICT_CODE: null,
          REPT_TYPE_CODE: "0",
          VCOLOR: "FFFFFF",
          CREATE_TIME: "2020-04-29 00:00:00",
          LATITUDE: 43.93678,
          STORAGE_TYPE: "1",
        },
        {
          DEPT_ID: "D328F88E06E941A184AEE99AE54CC7B3",
          LONGITUDE: 125.33648,
          REPT_AREA: 17,
          REPT_PER: "32BF0ACFA0894DCAA50A768D44D9543B",
          REPT_TEL: "17804308476",
          REPT_ID: "93CB7D6D632A45E68E616A1E6054227B",
          VALPHA: "50",
          SHAPE:
            "POLYGON  (( 125.33579763 43.81496666, 125.33609804 43.81375894, 125.33699926 43.81397572, 125.33704218 43.81509053, 125.33579763 43.81496666))",
          DESCRIPTION: null,
          REPT_NAME: "仓库",
          ADDRESS: null,
          DISTRICT_CODE: null,
          REPT_TYPE_CODE: "3",
          VCOLOR: "FFFFFF",
          CREATE_TIME: "2020-03-26 00:00:00",
          LATITUDE: 43.81448,
          STORAGE_TYPE: "1",
        },
      ],
    };
    var polygons=[];
      // G.markLayer.clearLayers(); //清除该图层组
    marr.results.forEach((item) => {
      //点图层
      let X = parseFloat(item.LONGITUDE).toFixed(5);
      let Y = parseFloat(item.LATITUDE).toFixed(5);
      let myIcon = L.icon({
        iconUrl: this.img,
        iconSize: [25, 41], // size of the icon
        iconAnchor: [25, 41], // point of the icon which will correspond to marker's location
      });
      let markLayer = new L.marker([Y, X], {
        icon: myIcon,
        attritudes: item,
      });
      G.markLayer.addLayer(markLayer);
      //多边形图层
      // G.polygonLayer.clearLayers();
      /* if (item.shape.indexOf("POLYGON") != -1) {
        let wkt = item.shape;
      } else {
        let wkt = "POLYGON" + item.shape;
      }  */
      let wkt = item.SHAPE;
      let geojson = LMap.convert.toGeoJson(wkt);
      let pColor = '#'+ item.VCOLOR;
      let myStyle = {
        color: "",
        fillColor: pColor,
        weight: 2,
        fillOpacity: 0.6,
      };
      let player = LMap.polygon.createPolygon(geojson, { style: myStyle });
      G.polygonLayer.addLayer(player);
      polygons.push(player)
    });
    LMap.zoomByPolygons(polygons,G.map)
    // G.equipmentLayers = new L.MarkerClusterGroup();
    // G.map.addLayer(G.equipmentLayers);
    var that = this;
    window.onresize = function temp() {
      that.autoHeight = document.body.clientHeight - 131 + "px";
    };
  },
  created() {},
  watch: {
    autoHeight: function () {
      return this.autoHeight + "px";
    },
  },
  methods: {
    changeMap: function (map, layerType) {
      if (this.property.baseLayers) {
        map.removeLayer(this.property.baseLayers);
      }
      var Layers = [];
      if (layerType == this.property.mapLayerType.google) {
        Layers.push(this.Layer.google.satelliteMap);
        Layers.push(this.Layer.google.asatelliteMap);
      } else if (layerType == this.property.mapLayerType.googlevector) {
        Layers.push(this.Layer.google.normalMap.setZIndex(0));
      }

      this.property.baseLayers = L.layerGroup(Layers);
      map.addLayer(this.property.baseLayers);
    },
    showMap: function (mapId, layerType, lon, lat, zoom, loadTitle) {
      //显示基本地图，地图类型，经度，纬度，放大级别
      if (!lat) {
        lat = 42.48;
      }
      if (!lon) {
        lon = 126.29;
      }
      if (!zoom) {
        zoom = 10;
      }
      if (!layerType) {
        layerType = 0;
      }
      var Layers = [];
      if (layerType == this.property.mapLayerType.tianditu) {
        Layers.push(this.Layer.tianditu.satelliteMap);
        Layers.push(this.Layer.tianditu.asatelliteMap);
      }
      if (layerType == this.property.mapLayerType.tiandituvector) {
        Layers.push(this.Layer.tianditu.normalMap);
        Layers.push(this.Layer.tianditu.annotion);
      } else if (layerType == this.property.mapLayerType.google) {
        Layers.push(this.Layer.google.satelliteMap);
        Layers.push(this.Layer.google.asatelliteMap);
      } else if (layerType == this.property.mapLayerType.googlevector) {
        Layers.push(this.Layer.google.normalMap);
      }
      this.property.baseLayers = L.layerGroup(Layers);
      var map = L.map(mapId, {
        center: [lat, lon],
        zoom: zoom,
        doubleClickZoom: false,
        //layers: Layers,
        zoomControl: false,
      });
      map.addLayer(this.property.baseLayers);
      /* var miniMap = new L.Control.MiniMap(
        L.layerGroup([
          this.Layer.tianditu.normalMap,
          this.Layer.tianditu.annotion,
        ]),
        { toggleDisplay: true }
      ).addTo(map); */

      return map;
    },
    drawComplete(sWkt, layer, layerType, drawItems) {
      G.drawItems = drawItems;
      if (layerType == "polyline") {
        //标记线
        if (G.markerType == "markerPolyline") {
          this.dialogFormVisible = true;
        }
      } else if (layerType == "polygon") {
        //画区域

        if (G.markerType == "markerPolygon") {
          this.dialogFormVisible = true;
        }
      } else if (layerType == "marker") {
        if (G.markerType == "markerPoint") {
          this.dialogFormVisible = true;
        } else if (G.markerType == "markerThing") {
          this.dialogFormVisible = true;
        } else if (G.markerType == "coordinate") {
          this.dialogCoordinate = {
            dialog: true,
            layer: layer,
          };
        }
      }
    },
    assignS() {},
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
