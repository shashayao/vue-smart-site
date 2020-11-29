<template>
  <div>
    <div id="map" :style="{ height: autoHeight }"></div>
    <ToolBar :Map="map" :dialogVisible="dialogCoordinate"></ToolBar>
    <el-dialog
      title="标记"
      :visible.sync="dialogFormVisible"
      width="30%"
      center
      top="27vh"
    >
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
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
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
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/leaflet.markercluster-src";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import axios from "axios"
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
      126.046,
      42.68,
      14
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
    G.markersGroup = new L.MarkerClusterGroup(); //聚合
    G.map.addLayer(G.markersGroup);
    let marr = {
      results: [
        {
          objectid: null,
          plotId: "A921368447F60297708AD3ECDA72",
          plotTypeCode: "6",
          plotName: "安白果园",
          planArea: "216.47",
          longitude: "124.73551",
          latitude: "43.9555",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "B5F71308C65EA8E991DDBA1495AF",
          valpha: "50",
          vcolor: "8E0EB0",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 124.73208848 43.95562441, 124.73189536 43.95550083, 124.73195973 43.95546994, 124.73324719 43.95375530, 124.73384801 43.95333822, 124.73672333 43.95426506, 124.73760310 43.95534636, 124.73927680 43.95611870, 124.73861161 43.95662844, 124.73893348 43.95693738, 124.73867598 43.95719997, 124.73822537 43.95690648, 124.73736707 43.95763247, 124.73208848 43.95562441))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "5F017E5E703E8C67565BBA1669F8",
          plotTypeCode: "3",
          plotName: "安白春秋棚",
          planArea: "215.45",
          longitude: "124.73331",
          latitude: "43.95793",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "B5F71308C65EA8E991DDBA1495AF",
          valpha: "50",
          vcolor: "0DCB1D",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 124.72958598 43.95785223, 124.73164592 43.95585962, 124.73731074 43.95789857, 124.73432813 43.96004556, 124.72958598 43.95785223))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "8148E6FDFDDEB131B52EFE78D307",
          plotTypeCode: "6",
          plotName: "种植基地01",
          planArea: "37.26",
          longitude: "124.7371",
          latitude: "43.9604",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "412B171CFBB43298746FFE6D177E",
          valpha: "50",
          vcolor: "02B00B",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 124.73560927 43.96063655, 124.73717568 43.95945881, 124.73864553 43.96020794, 124.73688064 43.96133546, 124.73560927 43.96063655))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "E531F46C85F2C1EA0BF3BB366A2A",
          plotTypeCode: "5",
          plotName: "121",
          planArea: "10.93",
          longitude: "124.72746",
          latitude: "43.9554",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "5823ADCBDF2A2DE531B0BA140D61",
          valpha: "50",
          vcolor: "0DCB1D",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 124.72739509 43.95599017, 124.72650996 43.95558856, 124.72836605 43.95465015, 124.72840896 43.95465015, 124.72739509 43.95599017))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "EE7C0BAE623EDB5433BBFE7A8CAE",
          plotTypeCode: "5",
          plotName: "高标准良田",
          planArea: "73.83",
          longitude: "124.74037",
          latitude: "43.95846",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "412B171CFBB43298746FFE6D177E",
          valpha: "50",
          vcolor: "0DCB1D",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 124.73770139 43.95936614, 124.74124191 43.95699900, 124.74021194 43.95854364, 124.74252937 43.95678275, 124.74291561 43.95718436, 124.74192856 43.95842007, 124.73901031 43.95987199, 124.73901031 43.95981021, 124.73770139 43.95936614))",
          userName: null,
          plotSerial: "5252555",
          normField: "1",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "CCB8AF39CAD2DB011D37F43BAD89",
          plotTypeCode: "6",
          plotName: "2号",
          planArea: "2753.56",
          longitude: "125.66717",
          latitude: "43.60793",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "4BE3E5C6408B9A8E8907F42974A6",
          valpha: "50",
          vcolor: "02B00B",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 125.66798263 43.59836427, 125.67776733 43.60520125, 125.66806846 43.61663591, 125.66300445 43.61626308, 125.66137367 43.61228602, 125.66077285 43.61154030, 125.65502220 43.61116743, 125.66789680 43.59861290, 125.66798263 43.59836427))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "256D2A54AE6C000C0C11F431137A",
          plotTypeCode: "5",
          plotName: "1号",
          planArea: "1134.6",
          longitude: "125.67131",
          latitude: "43.5944",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "0DAAB094F43C8B5B1DB8F4286C10",
          valpha: "50",
          vcolor: "0DCB1D",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 125.66180282 43.59040754, 125.66206031 43.59053187, 125.66188865 43.59040754, 125.66360527 43.59022104, 125.66549354 43.58866687, 125.66892677 43.58916421, 125.67098670 43.59134003, 125.67424827 43.59183734, 125.67716651 43.59562927, 125.67836814 43.60259086, 125.66180282 43.59040754))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "5E5F691037F0361CBE0AF433F183",
          plotTypeCode: "4",
          plotName: "3号",
          planArea: "2451.18",
          longitude: "125.65602",
          latitude: "43.5988",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "A3F0A1B4F7AB74D1F8D4F42F625F",
          valpha: "50",
          vcolor: "0DCB1D",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 125.65339141 43.60911662, 125.65339141 43.60899233, 125.64918571 43.60451759, 125.64935737 43.59475901, 125.65811210 43.59022104, 125.66609436 43.59618871, 125.65339141 43.60911662))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "804352B30B89023CDB2302400F89",
          plotTypeCode: "3",
          plotName: "三合村种植春秋棚",
          planArea: "302.33",
          longitude: "125.77513",
          latitude: "45.37026",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "27842B8277BF78D40FFD023C91E3",
          valpha: "50",
          vcolor: "0DCB1D",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 125.77101528 45.37116675, 125.77350437 45.36785032, 125.77940523 45.36934274, 125.77642261 45.37273445, 125.77101528 45.37116675))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "7FC7F9969C8C18DD502AF442A303",
          plotTypeCode: "7",
          plotName: "渔渔渔",
          planArea: "382268.01",
          longitude: "124.26919",
          latitude: "45.25888",
          userId: "438118E7DAA442CF96419B99BC5B35B6",
          planningId: "B050718CAC58DF7F744EF43E578D",
          valpha: "20",
          vcolor: "2A1FC2",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 124.12288846 45.33052831, 124.10846890 45.32859739, 124.09130277 45.32859739, 124.08031644 45.32183864, 124.06521024 45.30880162, 124.04323758 45.31459622, 124.03980435 45.30783580, 124.04049100 45.30059160, 124.03293790 45.29527859, 124.03225125 45.28465109, 124.05765714 45.28803278, 124.08100308 45.28803278, 124.08374967 45.28948202, 124.12220181 45.30783580, 124.14211453 45.29962563, 124.15310086 45.30300643, 124.17301358 45.31025033, 124.18331326 45.30880162, 124.19086637 45.30204051, 124.19704617 45.25614023, 124.20253934 45.24502195, 124.22039212 45.22664784, 124.23137845 45.22519700, 124.24373807 45.21262150, 124.24511136 45.20875156, 124.22931851 45.20101088, 124.21833219 45.19472080, 124.29866971 45.17487831, 124.37282742 45.17971858, 124.40235318 45.19617242, 124.41402615 45.21165404, 124.41608609 45.22713145, 124.39960660 45.26580653, 124.41127957 45.27740392, 124.28493680 45.30493823, 124.25609769 45.32039023, 124.16820706 45.34307771, 124.14554776 45.34597333, 124.14142789 45.34259509, 124.12288846 45.33052831))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "BB78C2AFD6B817260642F3F7BA24",
          plotTypeCode: "8",
          plotName: "保育",
          planArea: "15.19",
          longitude: "124.98094",
          latitude: "44.50871",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "A344AC7F67386B2CCFA2F3F16551",
          valpha: "50",
          vcolor: "0E0AA6",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 124.98000653 44.50871013, 124.98052151 44.50812864, 124.98054297 44.50812864, 124.98191626 44.50871013, 124.98135836 44.50932223, 124.98000653 44.50871013))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "7D37EE00113D14BA2774F3F848B8",
          plotTypeCode: "8",
          plotName: "哺乳",
          planArea: "25.6",
          longitude: "124.97834",
          latitude: "44.50695",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "A344AC7F67386B2CCFA2F3F16551",
          valpha: "50",
          vcolor: "0E0AA6",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 124.97824700 44.50610866, 124.97947009 44.50659836, 124.97835429 44.50782259, 124.97725995 44.50730229, 124.97824700 44.50610866))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "6D09F910AF381692F4CBF3F6E740",
          plotTypeCode: "8",
          plotName: "育肥",
          planArea: "66.53",
          longitude: "124.97784",
          latitude: "44.50863",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "A344AC7F67386B2CCFA2F3F16551",
          valpha: "50",
          vcolor: "0E0AA6",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 124.97590812 44.50867953, 124.97592957 44.50866423, 124.97708829 44.50733290, 124.97977050 44.50860302, 124.97865470 44.50990371, 124.97590812 44.50867953))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "4505BA05AFBC87D0FEB3F3FA9635",
          plotTypeCode: "7",
          plotName: "沼液",
          planArea: "35.27",
          longitude: "124.97736",
          latitude: "44.5108",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "59E8066BF864DAF0456CF3F5C0D4",
          valpha: "50",
          vcolor: "0A1FC2",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 124.97741015 44.51180114, 124.97607978 44.51126558, 124.97610123 44.51123497, 124.97732432 44.50976599, 124.97865470 44.51037807, 124.97741015 44.51180114))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "93F3AEE7B966B93803FCF3F8DC22",
          plotTypeCode: "8",
          plotName: "后备",
          planArea: "15.33",
          longitude: "124.97873",
          latitude: "44.51133",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "A344AC7F67386B2CCFA2F3F16551",
          valpha: "50",
          vcolor: "0E0AA6",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 124.97927697 44.51037807, 124.97977050 44.51060760, 124.97818263 44.51229079, 124.97771056 44.51206126, 124.97925551 44.51042398, 124.97927697 44.51037807))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "160F96BCFD189B340D9CD9150191",
          plotTypeCode: "5",
          plotName: "标准粮田地块",
          planArea: "23.26",
          longitude: "125.15044",
          latitude: "44.29154",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "2DB14CC438118037DDE1D911AFC8",
          valpha: "50",
          vcolor: "0DCB1D",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 125.14958374 44.29254714, 125.15033476 44.29076546, 125.15039913 44.29073474, 125.15151493 44.29044291, 125.15022747 44.29268537, 125.14958374 44.29254714))",
          userName: null,
          plotSerial: "HN002",
          normField: "1",
          testField: "1",
        },
        {
          objectid: null,
          plotId: "3D70BF7325F34EF5D2C2D9124D66",
          plotTypeCode: "5",
          plotName: "种植地块1",
          planArea: "64.09",
          longitude: "125.14898",
          latitude: "44.29171",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "2DB14CC438118037DDE1D911AFC8",
          valpha: "20",
          vcolor: "1DCB1D",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 125.14759108 44.29215154, 125.14805829 44.29139477, 125.15026453 44.29077663, 125.14983593 44.29170788, 125.14948943 44.29252320, 125.14759108 44.29215154))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "9A7FF08E0595D9DA9A3BCEEAFFC6",
          plotTypeCode: "4",
          plotName: "测试地块",
          planArea: "39.32",
          longitude: "125.15068",
          latitude: "44.28873",
          userId: null,
          planningId: "173F82C4EF68E9BE1198BB2623DF",
          valpha: null,
          vcolor: "#bbff00",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 125.14955521 44.28888375, 125.14951229 44.28888375, 125.15002727 44.28759349, 125.15238762 44.28873015, 125.15189409 44.28955959, 125.14955521 44.28888375))",
          userName: null,
          plotSerial: null,
          normField: null,
          testField: null,
        },
        {
          objectid: null,
          plotId: "94665B5910EDAA9468D8CEB0AAA1",
          plotTypeCode: "8",
          plotName: "养牛场00",
          planArea: "18.93",
          longitude: "124.75684",
          latitude: "43.95803",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "3BBA2211D486241A3B71CEAC23BB",
          valpha: "78",
          vcolor: "8AA616",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 124.75554877 43.95821814, 124.75651436 43.95798644, 124.75629979 43.95735314, 124.75728684 43.95752305, 124.75784474 43.95800961, 124.75691133 43.95865063, 124.75554877 43.95821814))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "C0FBC2693EE2AA842798CEACEB0F",
          plotTypeCode: "8",
          plotName: "养鹿场01",
          planArea: "82.18",
          longitude: "124.7529",
          latitude: "43.95628",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "3BBA2211D486241A3B71CEAC23BB",
          valpha: "50",
          vcolor: "0E0AA6",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 124.75072179 43.95720734, 124.75233111 43.95542324, 124.75367222 43.95509886, 124.75480947 43.95575535, 124.75295339 43.95790243, 124.75072179 43.95720734))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "E3BF494D299A63E4CE09CEAD571E",
          plotTypeCode: "8",
          plotName: "养鹿场02",
          planArea: "53.58",
          longitude: "124.75483",
          latitude: "43.95726",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "3BBA2211D486241A3B71CEAC23BB",
          valpha: "50",
          vcolor: "A60C5F",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 124.75318942 43.95791787, 124.75494895 43.95593299, 124.75644026 43.95680573, 124.75470219 43.95848166, 124.75318942 43.95791787))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "05DFF7B2C5805975EA0BE3A8063D",
          plotTypeCode: "5",
          plotName: "123",
          planArea: "127944.38",
          longitude: "124.77291",
          latitude: "44.4296",
          userId: null,
          planningId: "C00427D65068CFCB8DF9E3A7A47D",
          valpha: "20",
          vcolor: "1DCB1D",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 124.69251923 44.44510733, 124.74985413 44.39680158, 124.81062225 44.37594668, 124.86692719 44.41912037, 124.71861175 44.49018934, 124.69251923 44.44510733))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "FF2E20482BE7D1F2470CD90F9985",
          plotTypeCode: "8",
          plotName: "养殖地块",
          planArea: "228.22",
          longitude: "125.15634",
          latitude: "44.29253",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "B480708DE1BF86CD497DD90EC309",
          valpha: "20",
          vcolor: "2E0AA6",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 125.15332810 44.29449947, 125.15628926 44.28955381, 125.15864961 44.29032180, 125.15757672 44.29499094, 125.15332810 44.29449947))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "A0ABB016F496B1679D25F2F98555",
          plotTypeCode: "5",
          plotName: "地块1",
          planArea: "54.21",
          longitude: "125.15194",
          latitude: "44.29335",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "CD93D18E6C7C16D34FB1F2F93122",
          valpha: "50",
          vcolor: "0DCB1D",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 125.15061742 44.29409198, 125.15100366 44.29237179, 125.15171176 44.29218748, 125.15351420 44.29330869, 125.15287047 44.29429164, 125.15061742 44.29409198))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "78F24D06E09CD98B9C7EF2F9F84C",
          plotTypeCode: "5",
          plotName: "标准粮田",
          planArea: "86.62",
          longitude: "125.15351",
          latitude: "44.29109",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "CD93D18E6C7C16D34FB1F2F93122",
          valpha: "50",
          vcolor: "0DCB1D",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 125.15147573 44.29184958, 125.15203362 44.29062083, 125.15501624 44.28965317, 125.15578872 44.28968389, 125.15362149 44.29264825, 125.15147573 44.29184958))",
          userName: null,
          plotSerial: "002",
          normField: "1",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "38E9A167E667E61CA32DC053532A",
          plotTypeCode: "1",
          plotName: " ",
          planArea: "0",
          longitude: ".00112",
          latitude: ".0004",
          userId: null,
          planningId: "012530CD8CD7FD81C636C0533D92",
          valpha: "0.2",
          vcolor: "1DCB1D",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 0.00112421 0.00039796, 0.00112421 0.00039794, 0.00112423 0.00039794, 0.00112423 0.00039796, 0.00112421 0.00039796))",
          userName: null,
          plotSerial: null,
          normField: null,
          testField: null,
        },
        {
          objectid: null,
          plotId: "6F4EC1B7A3BFA75E939BCF82BDF8",
          plotTypeCode: "1",
          plotName: "一号大棚",
          planArea: "8.62",
          longitude: "125.63577",
          latitude: "43.81805",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "6DB2B3F7C52F818781F0CF81C9F3",
          valpha: "50",
          vcolor: "0DCB1D",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 125.63496578 43.81841744, 125.63496578 43.81798393, 125.63659656 43.81767428, 125.63625324 43.81847937, 125.63625324 43.81810779, 125.63496578 43.81841744))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "75EF4CA15CC5BA6A4C5ECFDFB2DE",
          plotTypeCode: "5",
          plotName: "水稻",
          planArea: "5166.93",
          longitude: "125.63622",
          latitude: "44.10704",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "D352173593099DE58D1CCFAA14F7",
          valpha: "50",
          vcolor: "0DCB1D",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: null,
          width: null,
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 125.62762005 44.11833316, 125.62693340 44.09639302, 125.64478619 44.09614645, 125.64581615 44.11710078, 125.62762005 44.11833316))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
        {
          objectid: null,
          plotId: "66A35AEE3FFAE4EDA6C0D04409D9",
          plotTypeCode: "3",
          plotName: "dk1",
          planArea: "29624.08",
          longitude: "124.92928",
          latitude: "43.92911",
          userId: "3BD9166F947D4A7086D909F51C3AA891",
          planningId: "AEC0ED2F2B5AA826BB2AD0430A1F",
          valpha: "50",
          vcolor: "0DCB1D",
          deptId: "D328F88E06E941A184AEE99AE54CC7B3",
          length: "1000",
          width: "500",
          farmId: null,
          farmName: null,
          planningName: null,
          qyId: null,
          area: null,
          plotTypeName: null,
          shape:
            "POLYGON  (( 124.89144333 43.93844833, 124.89178665 43.93820111, 124.89178665 43.91396834, 124.95942124 43.91322636, 124.97006424 43.93844833, 124.93676193 43.94858356, 124.89144333 43.93844833))",
          userName: null,
          plotSerial: null,
          normField: "2",
          testField: "2",
        },
      ],
    };
    var polygons = [];
    // G.markLayer.clearLayers(); //清除该图层组
    marr.results.forEach((item) => {
      //点图层
      let X = parseFloat(item.longitude).toFixed(5);
      let Y = parseFloat(item.latitude).toFixed(5);
      let myIcon = L.icon({
        iconUrl: this.img,
        iconSize: [25, 41], // size of the icon
        iconAnchor: [25, 41], // point of the icon which will correspond to marker's location
      });
      let markLayer = new L.marker([Y, X], {
        icon: myIcon,
        attritudes: item,
      });
      markLayer.setData = item.plotName;
      G.markersGroup.addLayer(markLayer);
      markLayer.addEventListener('click', e => {
        this.$alert( '<h3>我是'+e.target.setData+'</h3> <p>我的经度是'+e.latlng.lat+'</p> <p>我的维度是'+e.latlng.lng+'</p>','信息', {
          dangerouslyUseHTMLString: true
        });
      })
      //多边形图层
      // G.polygonLayer.clearLayers();
      /* if (item.shape.indexOf("POLYGON") != -1) {
        let wkt = item.shape;
      } else {
        let wkt = "POLYGON" + item.shape;
      }  */
      let wkt = item.shape;
      let geojson = LMap.convert.toGeoJson(wkt);
      let pColor = "#" + item.vcolor;
      let myStyle = {
        color: "",
        fillColor: pColor,
        weight: 2,
        fillOpacity: 0.6,
      };
      let player = LMap.polygon.createPolygon(geojson, { style: myStyle });
      G.polygonLayer.addLayer(player);
      polygons.push(player);
    });
    LMap.zoomByPolygons(polygons, G.map);
    this.getgeoJson();
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
    /* G.markersGroup.on('click', function(e) {
					 var lat = e.latlng.lat //纬度
          			 var lng = e.latlng.lng //经度
          			}) */
                 
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
    getgeoJson() {
      axios.get("../../static/geojson/长春.geojson").then( (data) => {
        var ploys = data.data.features[0].geometry.coordinates[0][0];
          var geojsonFeature = {
            type: "Feature",
            properties: {
              name: "Coors Field",
              amenity: "Baseball Stadium",
              popupContent: "This is where the Rockies play!",
            },
            geometry: {
              type: "LineString",
              coordinates: ploys,
            },
          }; //设置样式
          var myStyle = {
            color: "#ff0000",
            weight: 3,
          };
          var geojsonGroup = L.geoJSON(geojsonFeature, {
            style: myStyle,
          });
          G.map.addLayer(geojsonGroup);
      });
      },
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 100%;
}
.dialog-footer span {
  color: #606266;
}
</style>
