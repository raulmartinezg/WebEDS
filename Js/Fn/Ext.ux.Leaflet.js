Ext.define('Ext.ux.LeafletMap', {
    addMarker: function (lat, lon, txtPopup, iconUrl, zoom) {
        var map = this.getMap();
        map.setView([lat, lon], zoom);
        var marker = L.marker(new L.LatLng(lat, lon), {
            icon: L.icon({
                iconUrl: iconUrl,
                iconSize: [52, 37],
                /* iconAnchor: [52, 37],*/
                popupAnchor: [-3, -76],
                shadowAnchor: [22, 94]
            })
        }).bindPopup(txtPopup, {
            showOnMouseOver: true
        });
        L.circle(new L.LatLng(lat, lon), {
            radius: 200
        }).addTo(map);
        map.addLayer(marker);
    },
    addMarkGroup: function (markers) {
        var map = this.getMap();
        map.addLayer(markers);
    },
    addPolyLine: function (latlngs, color) {
        var map = this.getMap();
        var polyline = L.polyline(latlngs, {
            color: color,
            weight: 8,
            opacity: .8,
            dashArray: '1,1',
            lineJoin: 'round'
        }).addTo(map);
        map.fitBounds(polyline.getBounds());
    },
    addPolyLineAnimated: function (latlngs, color) {
        var map = this.getMap();
        var arrowHead = L.polylineDecorator(L.polyline(latlngs, {
            color: color
        }).addTo(map)).addTo(map);
        var arrowOffset = 0;
        setInterval(function () {
            arrowHead.setPatterns([{
                offset: arrowOffset + '%',
                repeat: 0,
                symbol: L.Symbol.arrowHead({
                    pixelSize: 15,
                    polygon: false,
                    pathOptions: {
                        stroke: true
                    }
                })
            }]);
            if (++arrowOffset > 100) arrowOffset = 0;
        }, 100);
    },
    alias: 'widget.lumagmappanel',
    applyMapOptions: function (options) {
        return Ext.merge({}, this.options, options);
    },
    afterRender: function () {
        this.superclass.afterRender.apply(this, arguments);
    },
    buildScriptTag: function (filename) {
        var script = document.createElement('script'),
            head = document.getElementsByTagName("head")[0];
        script.type = "text/javascript";
        script.src = filename;
        return head.appendChild(script);
    },
    config: {
        /**
         * @cfg {Boolean} autoMapCenter
         * Define si el mapa debe centrarse automáticamente en un evento geoupdate.
         * Unicamente aplica si {@link Ext.ux.LeafletMap#useCurrentLocation} se establece en 'true'.
         * @accessor
         */
        autoMapCenter: false,

        /**
         * @cfg {String} baseCls
         * La clase CSS base que aplica a elementos del mapa
         * @accessor
         */
        baseCls: Ext.baseCSSPrefix + 'llmap',

        /**
         * @cfg {Boolean} enableOwnPositionMarker
         * Define si se debe colocar un marcador en la posición actual.
         * Este marcador actualiza automáticamente su posición en un evento de actualización de ubicación.
         * Sólo funciona si useCurrentLocation se establece en 'true'.
         * @accessor
         */
        enableOwnPositionMarker: false,

        /**
         * @cfg {Ext.util.Geolocation} geo
         * Proveedor de geolocalización del mapa.
         * @accessor
         */
        geo: null,

        /**
         * @cfg {Boolean} initialCenter
         * Define si el mapa debe centrarse inicialmente en la ubicación actual.
         * @accessor
         */
        initialCenter: true,

        /**
         * @cfg {L.Map} map
         *    envoltura del mapa.
         * @accessor
         */
        map: null,

        /**
         * @cfg {Object} mapOptions
         * MapOptions como se especifica en la documentación del folleto:
         * [http://leafletjs.com/reference.html#map-class](http://leafletjs.com/reference.html#map-class)
         * @accessor
         */
        mapOptions: {},

        /**
         * @cfg {L.Marker} ownPositionMarker
         * Objeto Marcador que muestra la ubicación actual.
         * @accessor
         */
        ownPositionMarker: null,

        /**
         * @cfg {Object} ownPositionMarkerIcon
         * Opciones para el icono del propio marcador de posición.
         * Ver [L.Icon](http://leafletjs.com/reference.html#icon) la documentación para posibles opciones.
         * @accessor
         */
        ownPositionMarkerIcon: {
            iconAnchor: [20 / 2, 20 / 2],
            iconSize: [20, 20],
            iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5MzU1NTA1QkVCOEJFMTExOURCNTg1MjVEMTZGRkZFNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4QjhBOThCNjhCRUMxMUUxQjI0RUVFOTMxQkJCQjcxQyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4QjhBOThCNThCRUMxMUUxQjI0RUVFOTMxQkJCQjcxQyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjkzNTU1MDVCRUI4QkUxMTE5REI1ODUyNUQxNkZGRkU1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjkzNTU1MDVCRUI4QkUxMTE5REI1ODUyNUQxNkZGRkU1Ii8+IDwvcmRmOkRlc2NyaXB0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'
        },

        /**
         * @cfg {Object} ownPositionMarkerOptions
         * Opciones de marcador de posición propia.
         * ver [L.Marker](http://leafletjs.com/reference.html#marker) la documentación para posibles opciones.
         * @accessor
         */
        ownPositionMarkerOptions: {
            clickable: false
        },

        /**
         * @cfg {L.TileLayer} tileLayer
         * La envoltura de la Capa.
         * @accessor
         */
        tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        /**
         * @event zoomend
         * Se dispara cuando el enfoque del mapa finaliza.
         * @param {Ext.ux.LeafletMap} this
         * @param {L.Map} map instancia renderizada de L.Map
         * @param {L.TileLayer} tileLayer instancia renderizada de L.TileLayer
         * @param {Number} zoom El actual nivel de enforque de el mapa
         */
        ,

        /**
         * @cfg {Object} tileLayerOptions
         * Opciones de la capa de mosaico que deben usarse en el constructor L.TileLayer.
         * @accessor
         */
        tileLayerOptions: {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        },

        /**
         * @cfg {String} [tileLayerUrl="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"]
         * URL template for tile-layer in the following form
         *
         *         'http://{s}.somedomain.com/blabla/{z}/{x}/{y}.png'
         *
         * {s} means one of the randomly chosen subdomains (their range is specified in options; a, b or c by default,
         * can be omitted), {z} — zoom level, {x} and {y} — tile coordinates.
         *
         * Puedes utilizar claves personalizadas en la plantilla, que se evaluarán desde {@link Ext.ux.LeafletMap#tileLayerOptions}, observa esto:
         *
         *         tileLayerUrl: 'http://{s}.somedomain.com/{foo}/{z}/{x}/{y}.png', tileLayerOptions: {foo: 'bar'};
         *
         * @accessor
         */
        tileLayerUrl: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

        /**
         * @event maprender
         * Se dispara cuando el mapa carga de manera inicial.
         * @param {Ext.ux.LeafletMap} this
         * @param {L.Map} map    instancia renderizada de L.Map
         * @param {L.TileLayer} tileLayer instancia renderizada de L.TileLayer
         */

        /**
         * @event movestart
         * Se dispara cuando comienza una panorámica en el mapa.
         * @param {Ext.ux.LeafletMap} this
         * @param {L.Map} map instancia renderizada de L.Map
         * @param {L.TileLayer} tileLayer instancia renderizada de L.TileLayer
         */

        /**
         * @event moveend
         * Se dispara cuando finaliza una panorámica en el mapa.
         * @param {Ext.ux.LeafletMap} this
         * @param {L.Map} map instancia renderizada de L.Map
         * @param {L.TileLayer} tileLayer instancia renderizada de L.TileLayer
         */

        /**
         * @cfg {Boolean/Ext.util.Geolocation} useCurrentLocation
         * Pasa en 'true' para centrar el mapa basado en las coordenadas de geolocalización o pasar una
         * {@link Ext.util.Geolocation GeoLocation} configuración para tener más control sobre opciónes de GeoLocation
         * @accessor
         */
        useCurrentLocation: false
    },
    constructor: function () {
        this.callParent(arguments);
        this.on({
            resize: 'doResize',
            scope: this
        });
        var ll = L;

        if (!ll) {
            this.setHtml('Leaflet library is required');
        } //this.renderMap();
    },
    // @private
    destroy: function () {
        Ext.destroy(this.getGeo());
        var map = this.getMap(),
            layer = this.getTileLayer();

        if (map) {
            map = null;
        }

        if (layer) {
            layer = null;
        }

        this.callParent();
    },
    doResize: function () {
        var ll = L,
            map = this.getMap();

        if (ll && map) {
            map.invalidateSize();
        }
    },
    extend: 'Ext.Panel',
    getElementConfig: function () {
        return {
            reference: 'element',
            className: 'x-container',
            children: [{
                reference: 'innerElement',
                className: 'x-inner',
                children: [{
                    reference: 'mapContainer',
                    className: Ext.baseCSSPrefix + 'map-container'
                }]
            }]
        };
    },
    getLocType: function (model) {
        return false;
    },
    getMapOptions: function () {
        return Ext.merge({}, this.options || this.getInitialConfig('mapOptions'));
    },
    getMarkerImage: function (type) {
        return 'src/demos/leaflet/images/marker.png';
    },
    getRandomLatLng: function (map) {
        var bounds = map.getBounds(),
            southWest = bounds.getSouthWest(),
            northEast = bounds.getNorthEast(),
            lngSpan = northEast.lng - southWest.lng,
            latSpan = northEast.lat - southWest.lat;
        return new L.LatLng(southWest.lat + latSpan * Math.random(), southWest.lng + lngSpan * Math.random());
    },
    getTileLayerOptions: function () {
        return Ext.merge({}, this.options || this.getInitialConfig('tileLayerOptions'));
    },
    initComponent: function () {
        L.DefaultIcon = L.Icon.extend({
            iconUrl: 'Imagenes/Nissan11.png',
            shadowUrl: 'Imagenes/Nissan12.png',
            iconSize: new L.Point(25, 41),
            shadowSize: new L.Point(41, 41),
            iconAnchor: new L.Point(13, 41),
            popupAnchor: new L.Point(0, -33)
        });
        this.superclass.initComponent.call(this);
    },
    layout: {
        type: 'fit'
    },
    onMarkerClick: function (marker) {
        console.log('empty marker click');
    },
    // @private
    onMoveEnd: function () {
        var map = this.getMap(),
            tileLayer = this.getTileLayer();
        this.fireEvent('moveend', this, map, tileLayer);
    },
    // @private
    onMoveStart: function () {
        var map = this.getMap(),
            tileLayer = this.getTileLayer();
        this.fireEvent('movestart', this, map, tileLayer);
    },
    // @private	     
    onRender: function () {
        this.callParent(arguments); // llama el método onRender de la superclass

        var me = this,
            ll = L,
            mapOptions = me.getMapOptions(),
            map = me.getMap(),
            tileLayer;
        var renderTo = me.getId() + '-body';

        if (ll) {
            // Si no se da la propiedad de centrado -> usa la posición por defecto
            if (!mapOptions.hasOwnProperty('center') || !(mapOptions.center instanceof ll.LatLng)) {
                mapOptions.center = new ll.LatLng(19.546393, -99.178883); // default: tumtum
            }

            me.setTileLayer(new ll.TileLayer(me.getTileLayerUrl(), me.getTileLayerOptions()));
            tileLayer = me.getTileLayer();
            mapOptions.layers = [tileLayer];
            me.setMap(new ll.Map(renderTo, mapOptions));
            map = me.getMap(); // Seguimiento de eventos del mapa

            map.on('zoomend', me.onZoomEnd, me);
            map.on('movestart', me.onMoveStart, me);
            map.on('moveend', me.onMoveEnd, me);
            me.fireEvent("maprender", me, map, tileLayer);
        }
    },
    // @private

    /* onResize: function (w, h) {
     Ext.ux.LeafletMap.superclass.onResize.call(this, w, h);
    if (this.map) {
    if (Ext.is.Android) {
    this.map._onResize.call(this.map);
    this.map.on('invalidateSizeEnd', ActiveSupport.bind(function () {
    	this.zoomToMarkers();
    }, this));
    }
    }
    },*/
    // @private
    onZoomEnd: function () {
        var mapOptions = this.getMapOptions(),
            map = this.getMap(),
            tileLayer = this.getTileLayer(),
            zoom;
        zoom = map.getZoom() || 5;
        this.options = Ext.apply(mapOptions, {
            zoom: zoom
        });
        this.fireEvent('zoomend', this, map, tileLayer, zoom);
    },
    removeMarks: function () {
        var map = this.getMap();
        map.eachLayer(function (layer) {
            if (layer.options.pane === "markerPane" || layer.options.pane === "overlayPane") {
                map.removeLayer(layer);
            }
        });
    },
    requires: ['Ext.window.MessageBox'],
    selectMarker: function (id) {
        for (var i = 0, len = this.markerList.length; i < len; i++) {
            if (this.markerList[i].model.get('id') == id) {
                this.markerList[i].openPopup.call(this.markerList[i]);
            }
        }
    },

    /**
     * Moves the map center to the designated coordinates hash of the form:
     *
     *         { latitude: 47.36865, longitude: 8.539183 }
     *
     * or a L.LatLng object representing to the target location.
     *
     * @param {Object/L.LatLng} coordinates Object representing the desired longitude and
     * latitude upon which to center the map.
     */
    setMapCenter: function (coordinates) {
        var me = this,
            map = me.getMap(),
            ll = L;

        if (ll) {
            if (!me.isPainted()) {
                me.un('painted', 'setMapCenter', this);
                me.on('painted', 'setMapCenter', this, {
                    delay: 150,
                    single: true,
                    args: [coordinates]
                });
                return;
            }

            coordinates = coordinates || new ll.LatLng(47.36865, 8.539183);

            if (coordinates && !(coordinates instanceof ll.LatLng) && coordinates.hasOwnProperty('latitude')) {
                coordinates = new ll.LatLng(coordinates.latitude, coordinates.longitude);
            }

            if (!map) {
                me.renderMap();
                map = me.getMap();
            }

            if (map && coordinates instanceof ll.LatLng) {
                map.panTo(coordinates);
            } else {
                this.options = Ext.apply(this.getMapOptions(), {
                    center: coordinates
                });
            }
        }
    },
    toolTipLlegadaReal: function (infoMarca) {
        var html = '';
        html += "<table>";
        html += "<tr><td style='color:#001749;font-weight:bold;'>Numero Conc.:</td><td class='des01'>" + infoMarca.NumeroConcesionario + "</td></tr>";
        html += "<tr><td style='color:#001749;font-weight:bold;'>Concesionario:</td><td class='des01'>" + infoMarca.Concesionario + "</td></tr>";
        html += "<tr><td style='color:#001749;font-weight:bold;'>Ciudad:</td><td class='des01'>" + infoMarca.Ciudad + "</td></tr>";
        html += "<tr><td style='color:#001749;font-weight:bold;'>Llegada Estimada:</td><td class='des01'>" + (!Ext.isEmpty(infoMarca.LlegadaEstimada) ? Ext.Date.format(new Date(infoMarca.LlegadaEstimada), 'd/M/Y H:i:s') : '-') + "</td></tr>";
        html += "<tr><td style='color:#001749;font-weight:bold;'>Llegada Real:</td><td class='des01'>" + (!Ext.isEmpty(infoMarca.LlegadaReal) ? Ext.Date.format(new Date(infoMarca.LlegadaReal), 'd/M/Y H:i:s') : '-') + "</td></tr>";
        html += "<tr><td style='color:#001749;font-weight:bold;'>Latitud:</td><td class='des01'>" + infoMarca.Latitud + "</td></tr>";
        html += "<tr><td style='color:#001749;font-weight:bold;'>Longitud:</td><td class='des01'>" + infoMarca.Longitud + "</td></tr>";
        html += "</table>";
        return html;
    },
    updateMapOptions: function (newOptions) {
        var me = this,
            ll = L,
            map = this.getMap();

        if (ll && map) {
            map.setOptions(newOptions);
        }

        if (newOptions.center && !me.isPainted()) {
            me.un('painted', 'setMapCenter', this);
            me.on('painted', 'setMapCenter', this, {
                delay: 150,
                single: true,
                args: [newOptions.center]
            });
        }
    },
    xtype: 'leafletmap',
    zoomToMarkers: function () {
        var bound = new L.LatLngBounds();

        for (var i = 0, len = this.markerList.length; i < len; i++) {
            bound.extend(this.markerList[i].getLatLng());
        }

        this.map.setView(bound.getCenter(), this.map.getBoundsZoom(bound));
    }
});