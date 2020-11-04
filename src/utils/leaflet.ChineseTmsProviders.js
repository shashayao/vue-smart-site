// GMap = {}
// GMap.GoogleSubdomains = ["1"];
var module = (function () {
    L.TileLayer.ChinaProvider = L.TileLayer.extend({

        initialize: function (type, options) { // (type, Object)
            var providers = L.TileLayer.ChinaProvider.providers;

            var parts = type.split('.');

            var providerName = parts[0];
            var mapName = parts[1];
            var mapType = parts[2];

            var url = providers[providerName][mapName][mapType];
            options.subdomains = providers[providerName].Subdomains;
            options.key = options.key || providers[providerName].key;
            options.maptype = mapType;
            L.TileLayer.prototype.initialize.call(this, url, options);
        }
    });
    L.TileLayer.ChinaProvider.providers = {
        DownLoadImages: {
            satellite: {
                Map: "images/satellite/{z}/{x}/{y}.jpg",
            },
            roadmap: {
                Map: "images/roadmap/{z}/{x}/{y}.png",
            },
            overlay: {
                Map: "images/overlay/{z}/{x}/{y}.png",
            }
            , Subdomains: []
        },
        OffLineTms: {
            department: {
                ArcGIS: "images/jingjie/{z}/{x}/{y}.png",
            }
            , Subdomains: []

        }
        ,
        TianDiTu: {
            Normal: {
                 Map: "http://t{s}.tianditu.com/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk={key}",
                 Annotion: "http://t{s}.tianditu.com/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk={key}",
                //  Map: "http://192.168.1.99:8081/jeecg-boot/sys/common/static/temp/mapImg/overlay/{z}/{x}/{y}.png",
            },
            Satellite: {
                  Map: "http://t{s}.tianditu.com/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk={key}",
                  // Map: "http://192.168.1.99:8081/jeecg-boot/sys/common/static/temp/mapImg/satellite/{z}/{x}/{y}.jpg",
                  //Annotion: "http://192.168.1.99:8081/jeecg-boot/sys/common/static/temp/mapImg/satellite/{z}/{x}/{y}.jpg",
                 Annotion: "http://t{s}.tianditu.com/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk={key}"
            },
            Terrain: {
                 Map: "http://t{s}.tianditu.com/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk={key}",
                //  Map: "http://192.168.1.99:8081/jeecg-boot/sys/common/static/temp/mapImg/roadmap/{z}/{x}/{y}.png",
                Annotion: "http://t{s}.tianditu.com/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk={key}"
            },
            Subdomains: ["0"],
            key: "32710cae151156a384728e97d76d6468"
        },

        GaoDe: {
            Normal: {
                Map: 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
            },
            Satellite: {
                Map: 'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
                Annotion: 'http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
            },
            Subdomains: ["1", "2", "3", "4"]
        },

        //Google: {
        //    Normal: {
        //        Map: "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
        //    },
        //    Satellite: {
        //        Map: "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
        //        Annotion: "http://www.google.cn/maps/vt?lyrs=h@189&gl=cn&x={x}&y={y}&z={z}"
        //    },
        //    Subdomains: []
        //},
        Google: {
            Normal: {
                Map: "http://mt{s}.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
            },
            Satellite: {
                Map: "http://mt{s}.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
                Annotion: "http://mt{s}.google.cn/maps/vt?lyrs=h@189&gl=cn&x={x}&y={y}&z={z}"
            },
            //Subdomains: G.Subdomains
            // Subdomains: GMap.GoogleSubdomains
          Subdomains:[1]
        },
        Geoq: {
            Normal: {
                Map: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
                PurplishBlue: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
                Gray: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
                Warm: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}",
            },
            Theme: {
                Hydro: "http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}"
            },
            Subdomains: []
        },

        OSM: {
            Normal: {
                Map: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
            },
            Subdomains: ['a', 'b', 'c']
        }

    };

    L.tileLayer.chinaProvider = function (type, options) {
        return new L.TileLayer.ChinaProvider(type, options);
    };
    return {
        ChinaProvider:L.TileLayer.ChinaProvider,
        providers : L.TileLayer.ChinaProvider.providers,
        chinaProvider : L.tileLayer.chinaProvider
    }
})();

