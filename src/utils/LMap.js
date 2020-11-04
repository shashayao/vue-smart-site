
    import Terraformer from 'terraformer-wkt-parser'
    import turf from 'turf'
    import 'leaflet/dist/leaflet.css'
    import L from 'leaflet'
    import Draw from 'leaflet-draw'
    import Canvas2Image from './canvas2image'
    import html2canvas from 'html2canvas'
    import measure from './leaflet.measure'
    import measureArea from './leaflet.area'
    import MiniMap from './Control.MiniMap'
    import China from './leaflet.ChineseTmsProviders'
    import turfCircle from '@turf/circle';
    import turfBooleanContains from '@turf/boolean-contains'
    import turfBooleanOverlap from '@turf/boolean-overlap'
    export default {
        toolBarType: -1,
        curDrawObj: null,
        printer: null,
        sideControl:null,//卷帘控件
        drawControl: null,
        drawItems:null,
        property: {//属性
            mapLayerType: {//地图图层类型
                tianditu: 0,
                tiandituvector: 1,
                google: 2,
                googlevector: 3,
            },
            baseLayers: null//底图图层组
        },
    // mapOpetation: {//地图操作对象

        Layer: {//图层对象
            downloadimage: {//下载
                satellite: L.tileLayer.chinaProvider('DownLoadImages.satellite.Map', {//矢量底图
                    maxZoom: 13,
                    minZoom: 5
                }),
                overlay: L.tileLayer.chinaProvider('DownLoadImages.overlay.Map', {//矢量底图
                    maxZoom: 13,
                    minZoom: 5
                }),
                roadmap: L.tileLayer.chinaProvider('DownLoadImages.roadmap.Map', {//矢量底图
                    maxZoom: 13,
                    minZoom: 5
                }),
            },
            offlinetms: {
                department: L.tileLayer.chinaProvider('OffLineTms.department.ArcGIS', {//行政区划
                    maxZoom: 12,
                    minZoom: 7
                }),

            },
            tianditu: {//天地图
                normalMap: L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {//矢量底图
                    maxZoom: 22,
                    minZoom: 5
                }),
                annotion: L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {//矢量注记
                    maxZoom: 22,
                    minZoom: 5
                }),
                satelliteMap: L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {//影像底图
                    maxZoom: 22,
                    minZoom: 1
                }),
                asatelliteMap: L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {//影像注记
                    maxZoom: 22,
                    minZoom: 1
                })
            },
            google: {

                normalMap: L.tileLayer.chinaProvider('Google.Normal.Map', {//矢量底图
                    maxZoom: 22,
                    minZoom: 5
                }),
                satelliteMap: L.tileLayer.chinaProvider('Google.Satellite.Map', {//影像底图
                    maxZoom: 22,
                    minZoom: 5
                }),
                asatelliteMap: L.tileLayer.chinaProvider('Google.Satellite.Annotion', {//影像注记
                    maxZoom: 22,
                    minZoom: 5
                }),
            }
        },
        changeMap: function (map,layerType) {
            if (this.property.baseLayers) {
                map.removeLayer(this.property.baseLayers);
            }
            var Layers = [];
            if (layerType == this.property.mapLayerType.google) {

                Layers.push(this.Layer.downloadimage.satellite.setZIndex(0));
                Layers.push(this.Layer.downloadimage.overlay.setZIndex(1));

            }
            else if (layerType == this.property.mapLayerType.googlevector) {
                //Layers.push(MapObj.mapOpetation.Layer.google.normalMap.setZIndex(0));
                Layers.push(this.Layer.downloadimage.roadmap.setZIndex(0));
            }
            else if (layerType == this.property.mapLayerType.tianditu) {
                Layers.push(this.Layer.tianditu.satelliteMap.setZIndex(0));
                Layers.push(this.Layer.tianditu.asatelliteMap.setZIndex(1));
            }
            else if (layerType == this.property.mapLayerType.tiandituvector) {
                Layers.push(this.Layer.tianditu.normalMap.setZIndex(0));
                Layers.push(this.Layer.tianditu.annotion.setZIndex(1));
            }
            this.property.baseLayers = L.layerGroup(Layers);
            map.addLayer(this.property.baseLayers);

        },
        showMap: function (mapId, layerType, lon, lat, zoom,loadTitle) {//显示基本地图，地图类型，经度，纬度，放大级别

                if (!lat) {
                    lat = 42.48
                }
                if (!lon) {
                    lon = 126.29
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
                }
                else if (layerType == this.property.mapLayerType.google) {

                    Layers.push(this.Layer.google.satelliteMap);
                    Layers.push(this.Layer.google.asatelliteMap);

                }
                else if (layerType == this.property.mapLayerType.googlevector) {
                    Layers.push(this.Layer.google.normalMap);

                }
                this.property.baseLayers = L.layerGroup(Layers);
                var map = L.map(mapId, {
                    center: [lat, lon],
                    zoom: zoom,
                    doubleClickZoom:false,
                    //layers: Layers,
                    zoomControl: false
                });
                map.addLayer(this.property.baseLayers);
                var miniMap = new L.Control.MiniMap(L.layerGroup([this.Layer.tianditu.normalMap, this.Layer.tianditu.annotion]), { toggleDisplay: true }).addTo(map);

                return map


        },
        removeDrawLayer: function (layer) {//删除当前绘制层
            this.drawItems.removeLayer(layer);
        },
        overlapOrContains: function(arr, arr1, layer, type) {
            //判断区域是否重合
            let isOverlapArr = [];
            let isBoolArr = [];
            let trueOrFalse;
            if (arr.length > 0) {
              arr.forEach(item =>{
                if(type == 1) {
                  var geoJson = this.convert.toGeoJson(item); 
                  var polygon = this.polygon.createPolygon(geoJson,null);
                }else{
                  var geoJson = this.convert.toGeoJson(item);
                  var polygon = this.polygon.createPolygon(geoJson,null);
                }
                let isOverlap = this.geometryAnalyse.booleanOverlap(
                  polygon.toGeoJSON().features[0],
                  layer.toGeoJSON()
                );
                isOverlapArr.push(isOverlap)
              })
            }
            //判断是否包含
            if (arr1) { //区域2是否在区域1内依次推
              var geoJson = this.convert.toGeoJson(arr1)
              var polygon = this.polygon.createPolygon(geoJson,null);
              var isBool = this.geometryAnalyse.booleanContains(polygon.toGeoJSON().features[0], layer.toGeoJSON());
              isBoolArr.push(isBool); 
            };
         
            if(isOverlapArr.length > 0 || isBoolArr.length > 0) {
              if (type == '1') {
                  trueOrFalse = isOverlapArr.findIndex(target => target === true) == -1
              } else {
                  trueOrFalse = isOverlapArr.findIndex(target => target === true) == -1 && isBoolArr.findIndex(target => target === true) != -1;
              }
          
              if (trueOrFalse) {
                return true;
    
              } else {
                  if (type == '1') {
                      alert("该区域" + type + "与别的区域" + type + "有冲突!请重新画区域");
                  } else {
                      alert("该区域" + type + "与别的区域" + type + "有冲突或者区域" + type + "没有在区域" + parseFloat(type - 1) + "内!请重新画区域");
                  }
                  this.drawItems.removeLayer(layer);
                  return false;
              }
            }
        },
        zoomByPolygons: function (polygons, map) {
            if (polygons.length > 1) {
                var unionLayer = null;
                for (var i = 0; i < polygons.length - 1; i++) {
                    if (unionLayer != null) {
                        unionLayer = this.geometryAnalyse.union(unionLayer, polygons[i + 1].toGeoJSON().features[0]);
                    }
                    else {
                        unionLayer = this.geometryAnalyse.union(polygons[i].toGeoJSON().features[0], polygons[i + 1].toGeoJSON().features[0]);
                    }

                }
                var unionLayer = L.geoJson(unionLayer);
                map.fitBounds(unionLayer.getBounds());
            }
            else if (polygons.length == 1)
            {
                map.fitBounds(polygons[0].getBounds());
            }

        },
        zoomByPoint: function (points, map) {
            if (points.length > 1) {
                var bounds = L.latLngBounds(points);
                map.fitBounds(bounds);
            }
            else {
                map.flyTo(points[0], map.getZoom());
            }
        },

    // },
        // toolBar: {//地图常用工具条
            // toolBarType: -1,
            // curDrawObj: null,
            // printer: null,
            // sideControl:null,//卷帘控件
            printMap: function () {//打印地图
                var mapObj = document.getElementById("map"); //将jQuery对象转换为dom对象
                // 点击转成canvas
                var width = mapObj.clientWidth,//shareContent.offsetWidth; //获取dom 宽度
                  height = mapObj.clientHeight,//shareContent.offsetHeight; //获取dom 高度
                  canvas = document.createElement("canvas"), //创建一个canvas节点
                  scale =1; //定义任意放大倍数 支持小数
                canvas.width = width * scale; //定义canvas 宽度 * 缩放
                canvas.height = height * scale; //定义canvas高度 *缩放
                canvas.style.width = mapObj.clientWidth * scale + "px";
                canvas.style.height = mapObj.clientHeight * scale + "px";
                canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
                var opts = {
                  scale: scale, // 添加的scale 参数
                  canvas: canvas, //自定义 canvas
                  logging: false, //日志开关，便于查看html2canvas的内部执行流程
                  width: width, //dom 原始宽度
                  height: height,
                  useCORS: true // 【重要】开启跨域配置
                };
                html2canvas(mapObj, opts).then(function (canvas) {
                  // document.body.appendChild(canvas);
                  // canvas宽度
                  var canvasWidth = canvas.width;
                  // canvas高度
                  var canvasHeight = canvas.height;
                  // 渲染canvas
                  //$('.toCanvas').after(canvas);
                  // 显示‘转成图片’按钮
                  //$('.toPic').show(1000);
                  // 点击转成图片
                  Canvas2Image.saveAsImage(canvas, canvasWidth, canvasHeight, "png", "输出图片");




                });
            },
            sideMapShow: function (map, layer1, layer2) {
                MapObj.toolBar.sideControl = L.control.sideBySide(layer1, layer2);
                MapObj.toolBar.sideControl.addTo(map);

            },
            sideMapHide: function () {
                MapObj.toolBar.sideControl.remove();
            },
            measureDistince: function (map) {//距离测量
                this.removeDrawState();
                var config = {
                    lineColor: 'red',
                    lineWeight: 2,
                    lineDashArray: '20, 20',
                    lineOpacity: 1,
                };
                measure.initialize(config);
                measure.measureDistance(map);
                this.curDrawObj = measure;
            },
            measureArea: function (map) {//距离测量
                this.removeDrawState();
                var config = {
                    lineColor: 'red',
                    lineWeight: 2,
                    lineDashArray: '20, 20',
                    lineOpacity: 1,
                };
                measureArea.initialize(config);
                measureArea.measureArea(map);
                this.curDrawObj = measureArea;

            },
            registerDrawComplete: function (map,drawFun,editFun,isBingEdit)//注册编辑事件
            {
                this.drawItems = new L.FeatureGroup();
                map.addLayer(this.drawItems);
                this.drawControl = new L.Control.Draw({});
                var that =this;

                map.on(L.Draw.Event.CREATED, function (e) {
                    var res = "";
                    res = that.convert.toWkt(e.layer)
                    that.drawItems.addLayer(e.layer)
                    drawFun(res,e.layer,e.layerType,that.drawItems)

                    if (isBingEdit) {
                        e.layer.on("mousedown ", function (m) {
                            if (m.originalEvent.button == 2) {
                                e.layer.editing.enable();
                                editFun(e.layer,e.layerType)

                            }
                        })
                    }

                });
                map.on('draw:edited', function(e) {
                    console.log(e)
                })
                  map.on('draw:deleted', function(e) {
                    console.log(e)
                })
            },

            removeDrawState: function () {//删除绘制状态
                if (this.curDrawObj) {
                    this.curDrawObj.disable();
                }
            },
            drawLine: function (map, shapeOptions) {//画线
                this.removeDrawState();
                this.curDrawObj = new L.Draw.Polyline(map)
                if (shapeOptions) {
                    this.curDrawObj.options.shapeOptions = shapeOptions
                }
                this.curDrawObj.enable();

            },
            drawRectangle: function (map, shapeOptions) {
                this.removeDrawState();
                this.curDrawObj = new L.Draw.Rectangle(map)
                if (shapeOptions) {
                    this.curDrawObj.options.shapeOptions = shapeOptions
                }
                this.curDrawObj.enable();
            },
            drawMark: function (map, icon) {//绘制图标
                this.removeDrawState();
                this.curDrawObj = new L.Draw.Marker(map);
                this.curDrawObj.options.icon = icon;
                this.curDrawObj.enable();
            },
            drawPolygon: function (map,shapeOptions) {//绘制多边形
                this.removeDrawState();
                this.curDrawObj = new L.Draw.Polygon(map);
                if (shapeOptions) {
                    this.curDrawObj.options.shapeOptions = shapeOptions
                }

                this.curDrawObj.enable();

            },
            drawCircle: function (map, shapeOptions) {//画圆

                this.removeDrawState();
                this.curDrawObj = new L.Draw.Circle(map);
                if (shapeOptions) {
                    this.curDrawObj.options.shapeOptions = shapeOptions
                }

                this.curDrawObj.enable();
            },
            drawDelete : function (map,options) {
                this.removeDrawState();
                this.curDrawObj = new L.EditToolbar.Delete(map,{featureGroup: options});
                this.curDrawObj.enable();


            },
            removeAllLayer: function () {//删除当前绘制层
                if(this.drawItems) {
                    this.drawItems.clearLayers();
                }




            },

        // },
        marker: {//图片标记
            createMarkerIcon: function (imgUrl, width, height, anchorX, anchorY) {//创建Icon
                if (!anchorX) {
                    anchorX = width / 2;
                    anchorY = height
                }
                var myIcon = L.icon({
                    iconUrl: imgUrl,
                    iconSize: [width, height],
                    iconAnchor: [anchorX, anchorY],


                });
                return myIcon;
            },
            createMarker: function (latlon, imgUrl, width, height, attr, anchorX, anchorY) {//创建Marker
                if (!anchorX) {
                    anchorX = width / 2;
                    anchorY = height
                }

                var myIcon = L.icon({
                    iconUrl: imgUrl,
                    iconSize: [width, height],
                    iconAnchor: [anchorX, anchorY],


                });
                return L.marker(latlon, { icon: myIcon, attr: attr });

            },
            createMarkerText: function (X,Y,imgUrl, text, width, height,classname,atrr, anchorX, anchorY) {//创建包含文本

                var farmName = "<div><img  src='" + imgUrl + "' style='width:" + width + ";height:" + height + "'></div><div style='width: 200px;color:red;font-size:14px;'>" + text + "</div>";
                var myIcon = L.divIcon({
                    html: farmName,
                    className: classname,
                    //     iconSize: [farmName.length * 20, 40]
                });

                var txtLayer = new L.marker([Y, X], { icon: myIcon, attritudes: atrr })
                return txtLayer;
            },
            createText: function (X,Y, text,atrr,id, width, height,classname,pId, anchorX, anchorY) {//创建包含文本
                var farmName ="<div style='width: 200px;color:red;'>" + text + "</div>";
                var myIcon = L.divIcon({
                    html: farmName,
                    className: classname,
                    id: id,
                    pId: pId,
                    attr:atrr
                });

                var txtLayer = new L.marker([Y, X], { icon: myIcon })
                return txtLayer;
            }
        },
        circle: {
            createCircle: function (lat, log, radius, style) {

                var circle = new L.Circle([lat, log], radius, style);
                return circle;
            }
        },
        polyline: {
            createPolyLine: function (geojson, style, attr) {

                var polyline = L.geoJson(geojson, { style: style,attr:attr })
                return polyline
            },
            createPolyLineByCoord: function (coords, style) {
                var polyline = L.polyline(coords, style);
                return polyline;
            }
        },
        polygon: {
            createPolygon: function (geojson, style, attr) {

                var polygon = L.geoJson(geojson, { style: style, attr: attr })
                return polygon
            },
            createPolygonByWkt: function (wkt, style, attr) {

                var geoJson = L.geoJson(geojson)
                var polygon = L.polygon(geoJson._layers[157]._latlngs)
                return polygon
            }
        },
        convert: {
            toGeoJson: function (wkt) {//转GeoJson
                var geojson = Terraformer.parse(wkt);
                return geojson;
            },
            toWkt: function (layer) {//转WKT
                var sWkt = Terraformer.convert(layer.toGeoJSON().geometry)
                return sWkt;
            },
            toTurfGeoJson: function (wkt) {//通过wkt转换为turfGeoJson
                var geojson = Terraformer.WKT.parse(wkt);
                var LGeoJson = L.geoJSON(geojson);
                return LGeoJson.toGeoJSON();
            }
        },
        bigData: {//大数据
            heatMap: function (map, Data) {
                var cfg = {
                    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
                    // if scaleRadius is false it will be the constant radius used in pixels
                    "radius": 2,
                    "maxOpacity": .8,
                    // scales the radius based on map zoom
                    "scaleRadius": true,
                    // if set to false the heatmap uses the global maximum for colorization
                    // if activated: uses the data maximum within the current map boundaries
                    //   (there will always be a red spot with useLocalExtremas true)
                    "useLocalExtrema": true,
                    // which field name in your data represents the latitude - default "lat"
                    latField: 'lat',
                    // which field name in your data represents the longitude - default "lng"
                    lngField: 'lng',
                    // which field name in your data represents the data value - default "value"
                    valueField: 'count'
                };
                //var testData = {
                //    max: 8,
                //    data: [{lat: 43.6408, lng:126.7728, count: 3},{lat: 44.75, lng:126.55, count: 1}]
                //};

                var heatmapLayer = new HeatmapOverlay(cfg);
                map.addLayer(heatmapLayer);
                heatmapLayer.setData(Data);

            },
            myChart:null,
            iniEchart: function (map) {//初始化Echart
                if (document.getElementById('echart')) {
                    document.body.removeChild(document.getElementById('echart'))
                }

                var echartDiv = document.createElement("div");
                echartDiv.id = "echart";
                echartDiv.style.position = "absolute";
                echartDiv.style.width = "100%";
                echartDiv.style.height = "100%";
                //echartDiv.style.display = "none";
                document.body.appendChild(echartDiv);
                myChart = echarts.init(document.getElementById('echart'));
                document.getElementById('echart').appendChild(document.getElementById("map"));
                echartLeaflet.map = map
                window.addEventListener("optimizedResize", function () {
                    myChart.resize({
                        width: 'auto',
                        height: 'auto'
                    });
                });


                //echartDiv.appendChild(document.getElementById("map"))

            },
            setEChartOption: function (options) {//显示散点

                myChart.setOption(options)
            },
            removeEChart: function (map) {
                map.removeLayer(echartLeaflet.echartLayer);

                document.body.appendChild(document.getElementById("map"));
                document.body.removeChild(document.getElementById("echart"))


                echartLeaflet.map = null;
            }
        },
        geometryAnalyse: {//几何分析
            point:function(pointArr) {
                var point = turf.point(pointArr);
                return point

            },
            circle:function(center, radius, options){
                //return turf.circle(center, radius, options);
                //var center = [-75.343, 39.984];
                //var radius = 5;
                //var options = { steps: 10, units: 'kilometers', properties: { foo: 'bar' } };
                var circle = turfCircle(center, radius, options);
                return circle;
            },
            polygon: function (latlngs) {
                var polygon = turf.polygon(latlngs);
                return polygon;
            },

            buffer: function (geojson,len,unit) {//缓冲区
                return turf.buffer(geojson, len, {
                    units: unit
                });
            },
            along: function (line,length,unit) {//根据指定距离返回一点
                var options = { units: unit };

                var along = turf.along(line, length, options);
                return along;
            },
            area: function (polygon) {//获取面积
                var area = turf.area(polygon);
                return area;
            },
            cleanCoords: function (geojson) {//清除数组中多余的数据
                return turf.cleanCoords(geojson);
            },
            flip: function (geojson) {//颠倒坐标
                return turf.flip(geojson);
            },
            round: function (num, precision) {//返回指定长度的数字
                return turf.round(num, precision)
            },
            truncate: function (point) {//根据指定长度返回坐标
                var options = { precision: 3, coordinates: 2 };
                var truncated = turf.truncate(point, options);
                return truncated;
            },
            bboxClip: function (poly,bbox) {//按范围进行裁剪
                var clipped = turf.bboxClip(poly, bbox);
            },
            bezierSpline: function (line) {//生成贝塞尔曲线
                var curved = turf.bezierSpline(line);
                return curved
            },
            difference: function (poly1, poly2) {//获取两个面不同的地方
                var difference = turf.difference(polygon1, polygon2);
                return difference;
            },
            distance: function (turfpoint1,turfpoint2,units) {//获取两点之前的距离

                var options = { units: units };

                var distance = turf.distance(turfpoint1, turfpoint2, options);
                return distance;
            },
            dissolve: function (features, propertyName) {//按属性进行融合
                var dissolved = turf.dissolve(features, { propertyName: propertyName });
                return dissolved;
            },
            intersect: function (poly1, poly2) {//相交获取到结果
                var intersection = turf.intersect(poly1, poly2);
                return intersection
            },
            lineOffset: function (line,distance,unit) {//按指定距离偏移线
                var offsetLine = turf.lineOffset(line, distance, { units: unit });
                return offsetLine
            },
            simplify: function (geojson, options) {//简化几何形状

                var simplified = turf.simplify(geojson, options);
                return simplified
            },
            tesselate: function (poly) {//将一个多边形分成多个三角形
                var triangles = turf.tesselate(poly);
                return triangles
            },
            transformRotate: function (poly,point1,jd) {//将一个多边形按一个坐标移动，并按一个角度旋转
                var options = { pivot: point1 };
                var rotatedPoly = turf.transformRotate(poly, jd, options);
                return rotatedPoly
            },
            transformScale: function (poly, scale) {//按比例将一个几何对象进行放大
                var scaledPoly = turf.transformScale(poly, scale);
                return scaledPoly
            },
            transformTranslate: function (poly, distance, jd) {//按着指定距离，沿着一个角度进行移动几何对象
                var translatedPoly = turf.transformTranslate(poly, distance, jd);
                return;
            },
            union: function (poly1, poly2) {//将两个面合并成一个面
                var union = turf.union(poly1, poly2);
                return union;
            },
            voronoi:function(){//按一定范围内根据点生成面
                var options = {
                    bbox: [-70, 40, -60, 60]
                };
                var points = turf.randomPoint(100, options);
                var voronoiPolygons = turf.voronoi(points, options);

            },
            combine: function (featureCollection) {//讲多个point,line,polygon合并到(MultiPoint|MultiLineString|MultiPolygon
                var combined = turf.combine(featureCollection);
                return combined
            },
            explode: function (polygon) {//提取面上的节点
                var explode = turf.explode(polygon);
                return explode
            },
            lineToPolygon: function (line) {//线转面
                var polygon = turf.lineToPolygon(line);
                return polygon
            },
            polygonToLine: function (plygon) {//面转线
                var line = turf.polygonToLine(poly);
                return line;
            },
            kinks: function (plygon) {//返回一个几何对象自身的交点
                var kinks = turf.kinks(poly);
                return kinks;
            },
            lineArc:function(){//根据某一点，半径，开始角度，结束角度获取弧线
                var center = turf.point([-75, 40]);
                var radius = 5;
                var bearing1 = 25;
                var bearing2 = 47;

                var arc = turf.lineArc(center, radius, bearing1, bearing2);
            },
            rhumbDistance: function (turfpoint1, turfpoint2, units) {//获取两点之前的距离

                var options = { units: units };

                var distance = turf.rhumbDistance(turfpoint1, turfpoint2, options);
                return distance;
            },
            greatCircle: function (start,end) {//获得两点之间的曲线
                var greatCircle = turf.greatCircle(start, end);
                return greatCircle
            },
            length: function (line,unit) {//获得线的长度
                var length = turf.length(line, { units: unit });
                return length;
            },
            bearing: function (point1,point2) {//获取到两点之间的角度
                var bearing = turf.bearing(point1, point2);
                return bearing;
            },
            rhumbBearing: function (point1, point2) {//获取到两点之间的角度
                var bearing = turf.rhumbBearing(point1, point2);
                return bearing;
            },
            destination: function (point1,distance,bearing,units) {//根据已知点，距离，角度，单位获取另一个点
                var distance = distance;
                var bearing = bearing;
                var options = { units: units };

                var destination = turf.destination(point, distance, bearing, options);
                return destination
            },
            rhumbDestination: function (point1, distance, bearing, units) {//根据已知点，距离，角度，单位获取另一个点
                var distance = distance;
                var bearing = bearing;
                var options = { units: units };

                var destination = turf.rhumbDestination(point, distance, bearing, options);
                return destination
            },
            midpoint: function (point1, point2) {//根据已知两点，获取中心点
                var midpoint = turf.midpoint(point1, point2);
                return midpoint;
            },
            polygonTangents: function (point,polygon) {//过已知点到多边形的切线，与多边形相交的点


                var tangents = turf.polygonTangents(point, polygon);
                return tangents
            },
            pointToLineDistance: function (pt,line,unit) {//点到线的距离
                var distance = turf.pointToLineDistance(pt, line, { units: unit });
                return;
            },
            envelop: function (featureCollections) {
                var features = turf.featureCollection(featureCollections);

                var enveloped = turf.envelope(features);
                return enveloped
            },
            lineChunk:function(geojson,len,unit){//按指定的距离分割线
                return turf.lineChunk(line, len, { units: unit });
            },

            lineIntersect: function (line1, line2) {//获取两条线相交点
                var intersects = turf.lineIntersect(line1, line2);
                return intersects
            }
            ,

            lineOverlap: function (line1, line2) {//获取两条线重合
                var overlapping = turf.lineOverlap(line1, line2);
                return overlapping
            },
            lineSlice: function (point1, point2, line) {//根据已知的起点和重点截取线
                var sliced = turf.lineSlice(start, stop, line);
                return sliced
            },
            lineSliceAlong: function (line, start, stop,unit) {//根据起始距离和终止距离来截取线段
                var sliced = turf.lineSliceAlong(line, start, stop, { units: unit });
                return sliced
            },
            lineSplit: function (line1, line2) {//线分割
                var split = turf.lineSplit(line, splitter);
                return split
            },
            nearestPointOnLine: function (point, lines,unit) {
                var snapped = turf.nearestPointOnLine(line, pt, { units: unit });
                return snapped
            },
            sector: function (center, radius, bearing1, bearing2) {//根据中心点，半径，起始角度，结束角度生成扇形
                var sector = turf.sector(center, radius, bearing1, bearing2);
                return sector;
            },
            mask: function (polygon,mask) {//面扣除


                var masked = turf.mask(polygon, mask);
                return masked;
            },
            bbox: function (geojson) {//返回minx,miny,maxx,maxy
                return turf.bbox(geojson)
            },
            bboxPolygon: function (bbox) {//根据范围获取到
                return turf.bboxPolygon(bbox)
            },
            bboxPolygon: function (bbox) {//根据范围获取到
                return turf.bboxPolygon(bbox)
            },
            centerOfMass: function (geojson) {//获得质心中点
                turf.centerOfMass(geojson)
            },
            centroid: function (geojson)//计算平均值中心点
            {
                return turf.centroid(geojson);
            },

            pointsWithinPolygon: function (points, searchWithin) {//查询出在面中的点
                var ptsWithin = turf.pointsWithinPolygon(points, searchWithin);
                return ptsWithin
            },
            nearestPoint: function (targetPoint,points) {//返回最近点
                var nearest = turf.nearestPoint(targetPoint, points);
                return nearest;
            },
            booleanContains: function (geojson1, geojson2)//检查第二个几何完全在第一之内
            {

                return turfBooleanContains(geojson1, geojson2)
            },
            booleanCrosses: function (geojson1, geojson2)//检查两个几何是否相交
            {
                return turf.booleanCrosses(geojson)
            },
            booleanEqual: function (geojson1, geojson2)//重合
            {
                return turf.booleanEqual(geojson1, geojson2)
            },
            booleanOverlap: function (geojson1, geojson2)//检查是否重叠
            {
                return turfBooleanOverlap(geojson1, geojson2)
            },
            booleanParallel: function (geojsonline1, geojsonline2)//检查线是否平行
            {
                return turf.booleanParallel(geojsonline1, geojsonline2)
            },
            booleanPointInPolygon: function (geojsonpoint,geojsonplygon)//检查点是否在面中
            {
                return turf.booleanPointInPolygon(geojsonpoint, geojsonplygon)
            },
            booleanPointOnLine: function (geojsonpoint, geojsonline)//点是否在线上
            {
                return turf.booleanPointOnLine(geojsonpoint, geojsonline)
            },
            booleanWithin: function (geojson1, geojson2)//第二个包含第一个
            {
                return turf.booleanWithin(geojson1, geojson2)
            },
            getCoords: function (geojson) {
                return turf.getCoords(geojson);
            }

        },
        extend:{
            ant: {//动画边线
                antGeometry: function (route,option) {
                    //var route = [[39.91667, 116.41667], [34.50000, 121.43333], [44.2584, 125.8154]]
                    path = L.polyline.antPath(route, option);
                    return path;
                }

            },
            symbol: {
                getSingleArrow: function (polyline,style) {//根据一条线获取线的三角型
                    var arrow = L.polylineDecorator(polyline, {
                        patterns: [
                            { offset: '100%', repeat: 0, symbol: L.Symbol.arrowHead({ pixelSize: 15, polygon: false, pathOptions: style }) }
                        ]
                    })
                    return arrow;
                },
                getPolygonBorderDash: function (polygon, style) {//根据一个已知面获取面的边框
                    var pd = L.polylineDecorator(polygon, {
                        patterns: [
                            { offset: 0, repeat: 10, symbol: L.Symbol.dash({ pixelSize: 1, pathOptions: { color: "#000000" } }) }
                        ]
                    })
                    return pd;
                },
                getLineDashs: function (coords, style1, style2) {//根据坐标数组，生成间隔样式的符号
                    var pathPattern = L.polylineDecorator(
                        coords,
                        {
                            patterns: [
                                { offset: 12, repeat: 25, symbol: L.Symbol.dash({ pixelSize: 10, pathOptions: style1 }) },
                                { offset: 0, repeat: 25, symbol: L.Symbol.dash({ pixelSize: 2, pathOptions: style2 }) }
                            ]
                        }
                    )
                    return;
                },
                getLineMark: function (polyline, mark) {//根据已知一条直线，按比例插入多个图片

                    var markerPatterns = L.polylineDecorator(polyline, {
                        patterns: [
                            { offset: '5%', repeat: '5%', symbol: L.Symbol.marker() }
                        ]
                    });
                    return markerPatterns
                } ,
                getLineMarkRotate: function (coord, mark) {//根据坐标生成线，并且插入旋转的图片

                    var pathPattern = L.polylineDecorator(
                            coord,
                            {
                                patterns: [
                                    { offset: 0, repeat: 10, symbol: L.Symbol.dash({ pixelSize: 5, pathOptions: { color: '#000', weight: 2, opacity: 1 } }) },
                                    {
                                        offset: '16%', repeat: '10%', symbol: L.Symbol.marker({
                                            rotate: true,
                                        })
                                    }
                                ]
                            }
                        )
                    return pathPattern
                },
                getmultiArrowLines: function (coords,style) {//在线上显示多个箭头
                    var arrows = L.polylineDecorator(coords, {
                        patterns: [
                                { offset: 25, repeat: 50, symbol: L.Symbol.arrowHead({ pixelSize: 15, pathOptions:style }) }
                        ]
                    })
                    return arrows;
                }

            },
            dvf: {
                //colorFunctions : {
                //    'Green to Red': new L.HSLHueFunction(new L.Point(1, 120), new L.Point(55, 0)),//根据输入的颜色值进行生成绿色到红色outputSaturation饱和度,outputLuminosity亮度,outputHue 指定颜色
                //    'White to Red': new L.HSLLuminosityFunction(new L.Point(1, 1), new L.Point(56, 0.5), { outputHue: 120, outputSaturation: '100%' }),//通过饱和度来调颜色
                //    'White to Yellow to Red': new L.PiecewiseFunction([new L.HSLLuminosityFunction([1, 1], [20, 0.5], { outputHue: 60 }), new L.HSLHueFunction([20, 60], [55, 0])]),//实现色带
                //    'Grey to Red': new L.HSLSaturationFunction(new L.Point(1, 0.5), new L.Point(55, 1), { outputHue: 120 }),//通过亮度来调颜色
                //    'Blue to Red (HSL)': new L.HSLHueFunction(new L.Point(1, 240), new L.Point(55, 0)),
                //    'Blue to Red (Blend)': new L.RGBColorBlendFunction(1, 55, [0, 0, 255], [255, 0, 0])//通过rgb值输出颜色
                //},
                color:{
                    getHSLHueColor: function (minValue, maxValue, colorValue1, colorValue2) {
                        return new L.HSLHueFunction(new L.Point(minValue, colorValue1), new L.Point(maxValue, colorValue2))
                    },
                    getHSLLuminosityColor: function (minValue, maxValue, lValue1, lValue2, colorValue) {
                        new L.HSLLuminosityFunction(new L.Point(minValue, lValue1), new L.Point(maxValue, lValue2), { outputHue: colorValue, outputSaturation: '100%' })
                    },
                    getHSLSaturationColor: function (minValue, maxValue, sValue1, sValue2, colorValue) {
                        new L.HSLSaturationFunction(new L.Point(minValue, sValue1), new L.Point(maxValue, sValue2), { outputHue: colorValue })
                    },
                    getRGBColorBlendFunction: function (minValue, maxValue, rgb1, rgb2) {
                        new L.RGBColorBlendFunction(minValue, maxValue, rgb1, rgb2)
                    },
                    getPiecewiseFunction: function () {
                        return new L.PiecewiseFunction([new L.HSLLuminosityFunction([1, 1], [20, 0.5], { outputHue: 60 }), new L.HSLHueFunction([20, 60], [55, 0])]);
                    }
                }


            },
        },


  }



