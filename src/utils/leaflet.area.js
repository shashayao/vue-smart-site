
export default {
    //在此定义参数
    options: {
      position: 'topright', //初始位置
      lineColor: 'black',
      //  line weight
      lineWeight: 2,
      //  line dash
      lineDashArray: '20, 20',
      //  line opacity
      lineOpacity: 1,
      //  format distance method
      formatDistance: null,
      //  define text color
      textColor: 'black'
    },
    //在此初始化
    initialize: function (options) {
      L.Util.extend(this.options, options);
    },
    measureArea: function (map) {
      this._map = map;
      this._measureArea();
    },
    clearMeasuring: function () {
      if (this._layerPaint) {
        this._layerPaint.clearLayers()
      }
    },
    disable: function () {
      this._stopMeasuring();
    },
    _measureArea: function () {

      this._startMeasuring();
      this._toggleMeasure();
    },

    _toggleMeasure: function () {
      this._UID = this._getUID();
      this._measuring = !this._measuring

    },
    _startMeasuring: function () {
      this._oldCursor = this._map._container.style.cursor
      this._map._container.style.cursor = 'crosshair'
      this._doubleClickZoom = this._map.doubleClickZoom.enabled()
      this._map.doubleClickZoom.disable()
      this._isRestarted = false

      L.DomEvent
        .on(this._map, 'mousemove', this._mouseMove, this)
        .on(this._map, 'click', this._mouseClick, this)
        .on(this._map, 'dblclick', this._finishPath, this)

      if (!this._layerPaint) {
        this._layerPaint = L.layerGroup().addTo(this._map)
      }

      if (!this._points) {
        this._points = []
      }
    },

    _stopMeasuring: function () {

      this._map._container.style.cursor = this._oldCursor

      L.DomEvent
        .off(this._map, 'mousemove', this._mouseMove, this)
        .off(this._map, 'click', this._mouseClick, this)
        .off(this._map, 'dblclick', this._finishPath, this)

      if (this._doubleClickZoom) {
        this._map.doubleClickZoom.enabled()
      }
      //if (this._layerPaint) {
      //    this._layerPaint.clearLayers()
      //}

      this._restartPath()
    },
    _mouseDown:function(e){
      //if (e.originalEvent.button == 2) {
      //    this._map.off("dbclick",this._finishPath);
      //}

      //this._map.off('dbclick', this._finishPath)

    },
    _mouseMove: function (e) {
      if (!e.latlng || !this._lastPoint) {
        return
      }

      if (!this._layerPaintPathTemp) {
        //  customize style
        this._layerPaintPathTemp = L.polyline([this._lastPoint, e.latlng], {
          color: this.options.lineColor,
          weight: this.options.lineWeight,
          opacity: this.options.lineOpacity,
          clickable: false,
          dashArray: this.options.lineDashArray,
          interactive: false
        }).addTo(this._layerPaint)
      } else {
        //  replace the current layer to the newest draw points
        this._layerPaintPathTemp.getLatLngs().splice(0, 2, this._lastPoint, e.latlng)
        //  force path layer update
        this._layerPaintPathTemp.redraw()
      }

      //  tooltip
      //if (this._tooltip) {
      //	if (!this._distance) {
      //		this._distance = 0
      //	}
      //	this._updateTooltipPosition(e.latlng)
      //	var distance = e.latlng.distanceTo(this._lastPoint)
      //	this._updateTooltipDistance(this._distance + distance, distance)
      //}



    },

    _mouseClick: function (e) {
      if (!e.latlng) {
        return
      }

      if (this._isRestarted) {
        this._isRestarted = false
        return
      }




      //  main layer add to layerPaint
      if (this._lastPoint && !this._layerPaintPath) {
        this._layerPaintPath = L.polygon([this._lastPoint], {
          color: this.options.lineColor,
          weight: this.options.lineWeight,
          opacity: this.options.lineOpacity,
          clickable: false,
          interactive: false,
          attr: { "UID": this._UID }
        }).addTo(this._layerPaint)
      }

      //  push current point to the main layer
      if (this._layerPaintPath) {
        this._layerPaintPath.addLatLng(e.latlng)
      }

      //if (this._lastPoint) {
      //	if (this._lastCircle) {
      //		this._lastCircle.off('click', this._finishPath, this)
      //	}
      //	this._lastCircle = this._createCircle(e.latlng).addTo(this._layerPaint)
      //	this._lastCircle.on('click', this._finishPath, this)
      //}


      this._lastPoint = e.latlng;


    },

    _finishPath: function (e) {


      if (e) {
        L.DomEvent.preventDefault(e)
      }
      if (this._lastCircle) {
        this._lastCircle.off('click', this._finishPath, this)
      }
      if (this._tooltip) {
        //  when remove from map, the _icon property becomes null
        this._layerPaint.removeLayer(this._tooltip)

      }
      if (this._layerPaint && this._layerPaintPathTemp) {
        this._layerPaint.removeLayer(this._layerPaintPathTemp)
      }
      var greenIcon = L.icon({
        iconUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590060346039&di=749c4fb337f9496fa1c92102f902729a&imgtype=0&src=http%3A%2F%2Fimg.16pic.com%2F00%2F12%2F34%2F16pic_1234295_s.jpg',


        iconSize: [15, 15], // size of the icon
        iconAnchor: [-5, 14], // point of the icon which will correspond to marker's location

      });


      var marker = L.marker([e.latlng.lat, e.latlng.lng], { icon: greenIcon, attr: { "UID": this._UID } }).addTo(this._layerPaint);

      marker.on("mouseover", function (e) {
        document.getElementById("map").style.cursor = 'default';
        // $("#map").css("cursor", "default");
      })
      marker.on("mouseout", function (e) {
        document.getElementById("map").style.cursor = '-webkit-grab';
        // $("#map").css("cursor", "-webkit-grab");
      })
      var centerPoint = this._layerPaintPath._bounds.getCenter();
      this._createTooltip(centerPoint)
      var area = L.GeometryUtil.geodesicArea(this._layerPaintPath._latlngs[0])
      this._updateTooltipArea(area);

      //  clear everything
      L.DomEvent
        .on(marker, 'click', this._onclickMark, this)
      this._restartPath()
      this._stopMeasuring();




    },

    _restartPath: function () {
      this._distance = 0
      this._lastCircle = undefined
      this._lastPoint = undefined
      this._tooltip = undefined
      this._layerPaintPath = undefined
      this._layerPaintPathTemp = undefined

      //  flag to stop propagation events...
      this._isRestarted = true
      this._UID = this._getUID();
    },
    _onclickMark: function (e) {
      var paintLayers = this._layerPaint.getLayers();
      for (var i = 0; i < paintLayers.length; i++) {
        if (paintLayers[i].options.attr.UID == e.target.options.attr.UID) {
          this._layerPaint.removeLayer(paintLayers[i]);
        }
      }
    },

    _createCircle: function (latlng) {
      return new L.CircleMarker(latlng, {
        color: 'black',
        opacity: 1,
        weight: 1,
        fillColor: 'white',
        fill: true,
        fillOpacity: 1,
        radius: 4,
        clickable: Boolean(this._lastCircle),
        attr: { "UID": this._UID }
      })
    },

    _createTooltip: function (position) {
      var icon = L.divIcon({
        className: 'leaflet-measure-tooltip',
        iconAnchor: [-5, -5]
      })
      this._tooltip = L.marker(position, {
        icon: icon,
        clickable: false,
        attr: { "UID": this._UID }
      }).addTo(this._layerPaint)
    },

    _updateTooltipPosition: function (position) {
      this._tooltip.setLatLng(position)
    },
    _updateTooltipArea: function (area) {
      var text = "面积:" + readableArea(area, true);
      this._tooltip._icon.innerHTML = text;
    },

    _getUID: function () { // 获取唯一值
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  }

function readableArea(area, isMetric) {

  var areaStr;
  if (isMetric) {
    if (area >= 1000000) {
      areaStr = (area * 0.000001).toFixed(4) + '平方公里';
    } else {
      areaStr = area.toFixed(4) + '平方米';
    }
  } else {
    area /= 0.836127; // Square yards in 1 meter
    if (area >= 3097600) { // 3097600 square yards in 1 square mile
      areaStr = (area / 3097600).toFixed(2) + ' mi&sup2;';
    } else if (area >= 4840) {// 48040 square yards in 1 acre
      areaStr = (area / 4840).toFixed(2) + ' acres';
    } else {
      areaStr = Math.ceil(area) + ' yd&sup2;';
    }
  }
  return areaStr;
}
