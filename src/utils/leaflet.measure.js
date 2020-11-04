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
        onAdd: function (map) {
            //可在此添加控件内容
            var container = L.DomUtil.create('div', 'divMeasure');
            var btnDistance = L.DomUtil.create('button', "btnDistance", container);
            btnDistance.innerHTML = "测距";
            L.DomEvent
          .on(btnDistance, 'click', L.DomEvent.stopPropagation)
          .on(btnDistance, 'click', L.DomEvent.preventDefault)
          .on(btnDistance, 'click', this._measureDistance, this)
          .on(btnDistance, 'dblclick', L.DomEvent.stopPropagation)

            return container;

        },
        measureDistance: function (map) {
            this._map = map;
            this._measureDistance();
        },
        clearMeasuring: function () {
            if (this._layerPaint) {
                this._layerPaint.clearLayers()
            }
        },

        _measureDistance: function () {

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
            if (this._tooltip) {
                if (!this._distance) {
                    this._distance = 0
                }
                this._updateTooltipPosition(e.latlng)
                var distance = e.latlng.distanceTo(this._lastPoint)
                this._updateTooltipDistance(this._distance + distance, distance)
            }



        },

        _mouseClick: function (e) {
            if (!e.latlng) {
                return
            }

                if (this._isRestarted) {
                    this._isRestarted = false
                    return
                }

                if (this._lastPoint && this._tooltip) {
                    if (!this._distance) {
                        this._distance = 0
                    }

                    this._updateTooltipPosition(e.latlng)
                    var distance = e.latlng.distanceTo(this._lastPoint)
                    this._updateTooltipDistance(this._distance + distance, distance)

                    this._distance += distance
                }

                this._createTooltip(e.latlng)

                //  main layer add to layerPaint
                if (this._lastPoint && !this._layerPaintPath) {

                    this._layerPaintPath = L.polyline([this._lastPoint], {
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

                if (this._lastPoint) {
                    if (this._lastCircle) {
                        this._lastCircle.off('click', this._finishPath, this)
                    }
                    this._lastCircle = this._createCircle(e.latlng).addTo(this._layerPaint)
                    this._lastCircle.on('click', this._finishPath, this)
                }

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
                    iconAnchor: [-5, 12], // point of the icon which will correspond to marker's location

                });


                var marker = L.marker([e.latlng.lat, e.latlng.lng], { icon: greenIcon, attr: { "UID": this._UID } }).addTo(this._layerPaint);
                marker.on("mouseover", function (e) {
                    // $("#map").css("cursor", "default");
                  document.getElementById("map").style.cursor = 'default';
                })
                marker.on("mouseout", function (e) {
                  document.getElementById("map").style.cursor = '-webkit-grab';
                    // $("#map").css("cursor", "-webkit-grab");
                })
                //  clear everything
                L.DomEvent
                 .on(marker, 'click', this._onclickMark, this)
                this._restartPath()
                this._stopMeasuring();




        },
        disable: function () {
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
            var text = "面积:" + L.GeometryUtil.readableArea(area, true);
            this._tooltip._icon.innerHTML = text;
        },
        _updateTooltipDistance: function (total, difference) {
            if (!this._tooltip._icon) {
                return
            }
            var totalRound = this._formatDistance(total)
            var differenceRound = this._formatDistance(difference)
          // ' + this.options.textColor + '
            var text = '<div class="leaflet-measure-tooltip-total" style="' + this.options.textColor + '">' + totalRound + '</div>'
            if (differenceRound > 0 && totalRound !== differenceRound) {
                text += '<div class="leaflet-measure-tooltip-difference" style="' + this.options.textColor + '">(+' + differenceRound + ')</div>'
            }
            this._tooltip._icon.innerHTML = text
        },

        _formatDistance: function (val) {
            if (typeof this.options.formatDistance === 'function') {
                return this.options.formatDistance(val);
            }
            if (val < 1000) {
                return Math.round(val) + 'm'
            } else {
                return Math.round((val / 1000) * 100) / 100 + 'km'
            }
        },
        _getUID: function() { // 获取唯一值
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        }
    }

