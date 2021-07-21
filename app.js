Ext.Loader.loadScript("http://portal.tum.com.mx/dateds/Tools.js");
Ext.Loader.loadScript("https://unpkg.com/leaflet@1.5.1/dist/leaflet.js");
Ext.Loader.loadScript("http://portal.tum.com.mx/dateds/leaflet/PolylineDecorator/leaflet.polylineDecorator.js");
Ext.Loader.loadScript("http://portal.tum.com.mx/dateds/LumaData.js");
Ext.Loader.loadScript("http://portal.tum.com.mx/dateds/AppExportaExcel.js");

Ext.define('Person', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'placas', 'claveFolioViaje', 'folioViaje']
});

Ext.define("Eds",
    {
        /**
         * /agrega dinámicamente controles TAB a la página principal
         * @param {any} zXtype
         * @param {any} zId
         * @param {any} zTitle
         */
        addAppTab: function (zXtype, zId, zTitle) {
            var tabPanel = LmApp.zTabPnl_Centro;
            var tab = tabPanel.getComponent(zId);
            if (!tab) {
                tab = tabPanel.add({ xtype: zXtype, title: zTitle, id: zId })
            }
            tabPanel.setActiveTab(tab);
        },
        requires: [
            'Ext.ux.LeafletMap',
            'Ext.ux.LumaMonthField',
            'App.view.diario.Browse',
            'App.view.nivelservicio.Browse',
            'App.AppRptViajesCarga',
            'App.AppRptMensualViajes',
            'App.AppRptEntregas',
            'App.AppRptEficienciaEntrega',
            'App.AppRptSatisSrv',
            'App.AppRptTipoEncuesta'
        ],
        addAppRptViajesCarga: function (tabPanel, id) {
            var tab = tabPanel.getComponent(id);
            if (!tab) {
                tab = tabPanel.add(App.AppRptViajesCarga.buildApp(id));
                App.AppRptViajesCarga.setFechaHora();
            }
            tabPanel.setActiveTab(tab);
        },
        addAppRptSatisSrv: function (tabPanel, id) {
            var tab = tabPanel.getComponent(id);
            if (!tab) {
                tab = tabPanel.add(App.AppRptSatisSrv.buildApp(id));
                App.AppRptSatisSrv.setFechaHora();
            }
            tabPanel.setActiveTab(tab);
        },
        addAppRptNivelServicio: function (tabPanel, id) {
            var tab = tabPanel.getComponent(id);
            if (!tab) {
                tab = tabPanel.add(App.AppRptNivelServicio.buildApp(id));
                App.AppRptNivelServicio.setFechaHora();
            }
            tabPanel.setActiveTab(tab);
        },
        addAppRptViajesCarga2: function (tabPanel, id) {
            var tab = tabPanel.getComponent(id);
            if (!tab) {
                tab = tabPanel.add(App.AppRptMensualViajes.buildApp(id));
                /* tab = tabPanel.add(Ext.create('App.AppRptMensualViajes')); */
            }
            tabPanel.setActiveTab(tab);
            App.AppRptMensualViajes.setFechaHora();
        },
        addAppRptEficiencia: function (tabPanel, id) {
            var tab = tabPanel.getComponent(id);
            if (!tab) {
                tab = tabPanel.add(App.AppRptEficienciaEntrega.buildApp(id));
            }
            tabPanel.setActiveTab(tab);
            App.AppRptEficienciaEntrega.setFechaHora();
        },
        addAppRptEntregas: function (tabPanel, id) {
            var tab = tabPanel.getComponent(id);
            if (!tab) {
                tab = tabPanel.add(App.AppRptEntregas.buildApp(id));
                App.AppRptEntregas.setFechaHora();
            }
            tabPanel.setActiveTab(tab);
        },
        addAppRptTipoEncuesta: function (tabPanel, id) {
            var tab = tabPanel.getComponent(id);
            if (!tab) {
                tab = tabPanel.add(App.AppRptTipoEncuesta.buildApp(id));
                App.AppRptTipoEncuesta.setFechaHora();
            }
            tabPanel.setActiveTab(tab);
        },
        addTab: function (tabPanel, id, url, nombre, parametro1, parametro2) {
            var tab = tabPanel.getComponent(id);
            if (!tab) {
                tab = tabPanel.add({
                    id: id,
                    title: nombre,
                    closable: true,
                    loader: {
                        url: url,
                        renderer: "frame",
                        method: 'Post',
                        loadMask: {
                            showMask: true,
                            msg: "Ensamblando Módulo.. "
                        },
                        params: { param1: parametro1, param2: parametro2 }
                    },
                    tabConfig: {
                        tooltip: url
                    }
                });
            }
            tabPanel.setActiveTab(tab);
        },
        construyeTabGoogleMap: function () {
            try {
                LmApp.zTabPnl_RastreoEmbarque.add({
                    autoMapCenter: true,
                    autoScroll: false,
                    border: true,
                    id: 'zTabPnl_Ubicacion',
                    header: false,
                    bodyPadding: 15,
                    glyph: 42,
                    mapOptions: {
                        zoom: 15
                    },
                    tbar: [
                        {
                            xtype: 'button',
                            text: 'Regresar',
                            id: 'ExecuteSearch',
                            iconCls: 'fa fa-arrow-left iconcolorwhite',
                            width: 100,
                            handler: function () {
                                Eds.gestorNavegacionTabuladores(null);
                                /*var a = Eds.getTabPrevioId();
                                if (!Ext.isEmpty(a)) {
                                    Eds.gestorNavegacionTabuladores(a);
                                }*/
                                /// LUMA LmApp.zTabPnl_Ubicacion.clearMarkers();
                            },
                            ui: 'success'
                        },
                        {
                            xtype: 'label',
                            text: 'Unidad 100 se encuentra en chinches bravas! ',
                            id: 'z_btn_UbicacionRegresar',
                            iconCls: 'icon-reply-mail blackiconcolor',
                            /* style: 'border: solid 2px #FFDD03' */
                        },
                        { xtype: 'tbfill' },
                        {
                            xtype: 'label',
                            text: 'Presiona la tecla ESC para regresar a la pantalla anterior',
                            id: 'z_btn_UbicacionRegresar',
                            iconCls: 'icon-reply-mail blackiconcolor',
                            style: 'border: solid 2px #FFDD03'
                        }
                    ],
                    /*setCenter: {
                        lat: 23.019850,
                        lng: -101.156222
                    },*/
                    style: 'border: solid 2px #FFDD03',
                    title: 'Ubicación Satelital',
                    xtype: 'leafletmap',
                    useCurrentLocation: true
                });
                /*var keyMap = new Ext.util.KeyMap({
                    target: Ext.getBody(),
                    binding: [
                        {
                            key: Ext.event.Event.ESC,
                            fn: function () {
                                var a = Eds.getTabPrevioId();
                                if (!Ext.isEmpty(a)) {
                                    Eds.gestorNavegacionTabuladores(a);
                                }
                            }
                        }
                    ],
                    scope: this
                });*/
                LmApp.zTabPnl_Ubicacion.show();
            } catch (bsError) {
                Datum.Tools.msgSistema('Eds.construyeTabGoogleMap', bsError, 0);
            }
        },
        config: {
            fVSeleccionado: null,
            fvDetalleCabecero: null,
            tabPrevioId: null
        },
        cargaDatoChartServicio: function () {
            var entregasATiempo = 0;
            var totalEntregadas = 0;
            try {
                LmApp.z_Store_NivelServicio.removeAll();
                LmApp.z_Store_TiempoEntrega.each(function (item) {
                    if (!Ext.isEmpty(item.data.LlegadaReal)) {
                        totalEntregadas++;
                        /*Con arribo en el mismo día de la fecha Programada*/
                        /* if ((item.data.LlegadaReal.getDate() <= item.data.LlegadaEstimada.getDate()) && (item.data.LlegadaReal.getMonth() == item.data.LlegadaEstimada.getMonth())){*/
                        if (Ext.Date.diff(item.data.LlegadaEstimada, item.data.LlegadaReal, 'd') <= 0) {
                            entregasATiempo++;
                        }
                    }
                });
                LmApp.z_Store_NivelServicio.add({ Nombre: 'En tiempo:' + entregasATiempo + ' (' + Math.round(entregasATiempo * 100 / totalEntregadas) + '%)', Valor: entregasATiempo });
                LmApp.z_Store_NivelServicio.add({ Nombre: 'Destiempo:' + (totalEntregadas - entregasATiempo) + ' (' + Math.round((totalEntregadas - entregasATiempo) * 100 / totalEntregadas) + '%)', Valor: totalEntregadas - entregasATiempo });
            } catch (bserror) {
                Datum.Tools.msgSistema('cargaDatoChartServicio', bserror, 0);
            }
        },
        cargaDatoViaje: function () {
            try {
                    Datum.LumaData.getDmJsonResult("Default.Aspx", "Rastreo", "dbo", "SPCALL_Rastreo", this.tools.paramsCargarViajes(), function (resultado) {
                        LmApp.z_Store_Resultado.removeAll();
                        LmApp.z_Store_Resultado.loadData(resultado.table);
                        LmApp.z_Btn_ReporteExcel.setDisabled(false);
                    });
                
            } catch (bsError) {
                Datum.Tools.msgSistema('Eds.cargaDatoViaje', bsError, 0);
            }
        },
        cargaExit: function () {
            try {
                Datum.LumaData.getDmJsonResult("Default.Aspx", "Logout", "dbo", "SPCALL_Rastreo", this.tools.paramsCargarViajes(), function (resultado) {
                    LmApp.z_Store_Resultado.removeAll();
                    LmApp.z_Store_Resultado.loadData(resultado.table);
                    LmApp.z_Btn_ReporteExcel.setDisabled(false);
                });

            } catch (bsError) {
                Datum.Tools.msgSistema('Eds.cargaDatoViaje', bsError, 0);
            }
        },
        cargaDetalleViaje: function (a) {
            try {
                var p = (a.pictograma >= 3) ? 100 : a.porciento;
                LmApp.zBtn_ExportaDetalleViaje.setDisabled(true);
                LmApp.z_Store_TiempoEntrega.removeAll();
                Eds.gestorNavegacionTabuladores('TabDetalles');
                Eds.reiniciaForma('Detalle');
                this.setFVSeleccionado(a);
                LmApp.lbl_NombreOperador.setText(a.operador);
                LmApp.lbl_NumeroViaje.setText(a.folioViaje);
                LmApp.lbl_NumeroUnidad.setText(a.unidad);
                LmApp.lbl_PlacaUnidad.setText(a.placas);
                LmApp.lbl_Ruta.setText(a.ruta);
                LmApp.txt_Arribos.setText(a.noParadas);
                LmApp.txt_Items.setText(a.bultos);
                LmApp.Progress4.updateProgress(p / 100, "Avance de Servicio " + p + "%", true);
                Datum.LumaData.getDmJsonResult("Default.Aspx", "TiempoViaje", "dbo", "SPCALL_TiempoViaje",
                    { claveFolio: a.claveFolioViaje },
                    function (b) {
                        LmApp.zBtn_ExportaDetalleViaje.setDisabled(false);
                        Eds.setFvDetalleCabecero(a);
                        LmApp.zTxtFld_FInicioCarga.setValue(Ext.Date.format(new Date(b.table1[0].fInicioCarga), 'd-M-Y G:i'));
                        LmApp.zTxtFld_FFinCarga.setValue(Ext.Date.format(new Date(b.table1[0].fFinCarga), 'd-M-Y G:i'));
                        LmApp.zTxtFld_FSalidaProgramada.setValue(Ext.Date.format(new Date(b.table1[0].fSalidaProgramada), 'd-M-Y G:i'));
                        LmApp.zTxtFld_FSalidaReal.setValue(Ext.Date.format(new Date(b.table1[0].fSalidaReal), 'd-M-Y G:i'));
                        LmApp.zTxtFld_FFinServicio.setValue(Ext.Date.format(new Date(b.table1[0].fFinServicio), 'd-M-Y G:i'));
                        LmApp.txt_TiempoRutaReal.setValue(b.table1[0].tiempoRutaReal);
                        LmApp.txt_TiempoRutaProgramado.setValue(b.table1[0].tiempoViaje);
                        LmApp.z_Store_TiempoEntrega.loadData(b.table);
                        LmApp.z_Store_TiempoEntrega.sort("secuencia", "ASC");
                        var con = !Ext.isEmpty(LmApp.zHidden_Concesionario.getValue()) ? LmApp.zHidden_Concesionario.getValue() : '';

                        if (con > 0) {
                            LmApp.MenuButton.setHidden(true);
                            LmApp.z_btn_DetalleVerMapa.setHidden(true);
                        } else {

                            if (a.estatusFolio > 5 || (a.latitud === 0 || a.longitud === 0)) {
                                LmApp.z_btn_DetalleVerMapa.setDisabled(true);
                                LmApp.z_Mnu_UltPos.setDisabled(true);
                                LmApp.z_Mnu_UltPos.setChecked(false);
                            } else {
                                LmApp.z_btn_DetalleVerMapa.setDisabled(false);
                                LmApp.z_Mnu_UltPos.setDisabled(false);
                                LmApp.z_Mnu_UltPos.setChecked(true);
                                LmApp.z_Mnu_SecSis.setChecked(false);
                                LmApp.z_Mnu_SecReal.setChecked(false);
                            }
                        }
                    });
            } catch (bsError) {
                Datum.Tools.msgSistema('cargaDetalleViaje', bsError, 0);
                LmApp.z_viewPort_Principal.el.unmask();
            }
        },
        cargaReporteCalidad: function (grid) {
            try {
                var fv = grid.ClaveFolioViaje;
                Datum.LumaData.getDmJsonResult("Default.Aspx", "SpGetJsonResult", "DWH", "SPQRY_CabeceroEncuesta",
                    { ClaveFolioViaje: fv, NoCon: !Ext.isEmpty(LmApp.zHidden_Concesionario.getValue()) ? LmApp.zHidden_Concesionario.getValue() : '' },
                    function (b) {
                        LmApp.zlbl_NomCon.setText(b.table[0].RazonSocial);
                        LmApp.zlbl_NumCon.setText(b.table[0].NumeroConcesionario);
                        LmApp.zlbl_NumCon.setText(b.table[0].NumeroConcesionario);
                        LmApp.zlbl_NomOpe.setText(b.table[0].Nombre);
                        LmApp.zlbl_FV.setText(b.table[0].FolioViaje);
                        LmApp.zlbl_Unidad.setText(b.table[0].Numero);
                        LmApp.zlbl_Placa.setText(b.table[0].Placa);
                        LmApp.ztxt_CVFV.setValue(b.table[0].ClaveFolioViaje);
                        LmApp.ztxt_CVcon.setValue(b.table[0].ClaveConcesionario);
                        LmApp.zLbl_Tguias.setText(b.table[0].Guias);
                    });
            } catch (bsError) {
                Datum.Tools.msgSistema('cargaReporteCalidad', bsError, 0);

            }
        },
        cargaDetalleEmbarque: function (item, command, record) {
            Eds.gestorNavegacionTabuladores('zTabDetSKU');
            try {
                LmApp.zLbl_DetConcesionario.setText('(' + record.data.numeroConcesionario + ') - ' + record.data.concesionario);
                Datum.LumaData.getDmJsonResult("Default.Aspx", "ViajeDetalle", "dbo", "SPCALL_VIajeDetalle", { claveFolio: record.data.claveFolioViaje, noConcesionario: record.data.numeroConcesionario }, function (b) {
                    LmApp.Grouping1.startCollapsed = true;
                    LmApp.z_store_DetSKU.loadData(b.table);
                    LmApp.zLbl_guias.setText(b.table1[0].guias);
                    LmApp.zLbl_item.setText(b.table1[0].items);
                    LmApp.zLbl_TiempoR.setText(b.table1[0].tiempo);
                });
            } catch (bsError) {
                Datum.Tools.msgSistema('EDS.cargaDetalleEmbarque', bsError, 0);
            }
        },
        cargaMenuContextualViajes: function (view, record, item, index, e) {
            e.stopEvent();
            // ReSharper disable once UnusedLocals
            var menu = new Ext.menu.Menu({
                modal: true,
                items: [
                    {
                        iconCls: 'icon-notebook-streamline orangeiconcolor',
                        text: 'Ver Servicios',
                        handler: function () {
                            Eds.cargaDetalleViaje(record.data);
                        }
                    }, {
                        icon: 'action',
                        text: 'Operador',
                        handler: function () {
                            Ext.Msg.show({
                                title: 'Mensaje del Sistema',
                                message: '<b>' + record.data.operador + '</b>'
                            });
                        }
                    }
                ]
            }).showAt(e.getXY());
        },
        constructor: function () {
            return this;
        },
        enviaEncuestaCalidad: function () {
            try {
                // ReSharper disable once UnusedParameter
                Datum.LumaData.getDmJsonResult("Default.Aspx", "SpGetJsonResult", "DWH", "SPINS_EncuestaConcesionario", Eds.pQ.DatosEncuestaCalidad(), function (b) {
                    Eds.tools.msgDatos('Resultado');
                    Eds.cargaDatoViaje();
                    Eds.reiniciaForma('Encuesta');
                    Eds.gestorNavegacionTabuladores('zTab_RastreoEmbarque');

                });
            } catch (bsError) {
                Eds.tools.msgSistema("DatosEncuestaCalidad", bsError, 0);
                LmApp.z_viewPort_Principal.el.unmask();
            }
        },
        estiloEtiquetaProgress: function (value, meta) {
            if (meta.record.data.Pictograma >= 3) {
                value = 1;
            }
            var me = this,
                cls = me.progressCls,
                pCls,
                cWidth = me.getWidth(true) - 2;
            if (me.hideIfEmpty && (!value && value !== 0 || value < 0)) {
                return "";
            }
            var percent = Math.round(value * 100);
            value = value || 0;
            var text = Ext.String.format(me.progressText, percent);
            pCls = cls + ' ' + cls + '-' + me.ui;
            if (percent >= 0 && percent < 20) {
                pCls += " progress-0-20";
            }
            if (percent >= 20 && percent < 100) {
                pCls += " progress-20-60";
            }
            if (percent === 100) {
                pCls += " progress-60-100";
            }
            meta.tdCls = "x-progress-column-cell";
            meta.style = "padding:0px;margin:0px;";
            return '<div class="' + pCls + '" style="margin:1px 1px 1px 1px;width:' + cWidth + 'px;"><div class="' + cls + '-text ' + cls + '-text-back" style="width:' + (cWidth - 2) + 'px;">' +
                text +
                '</div>' +
                '<div class="' + cls + '-bar ' + cls + '-bar-' + me.ui + '" style="width: ' + value * 100 + '%;">' +
                '<div class="' + cls + '-text" style="width:' + (cWidth - 2) + 'px;">' +
                '<div>' + text + '</div>' +
                '</div>' +
                '</div></div>';
        },
        gestorNavegacionTabuladores: function (idTabDestino) {
            try {
                var a = LmApp.zTabPnl_RastreoEmbarque;
                idTabDestino = !Ext.isEmpty(idTabDestino) ? idTabDestino : this.getTabPrevioId();
                var idTabOrigen = a.getActiveTab().id;
                // var tabActivar = a.getComponent(idTabDestino);
                if (idTabDestino === "zTab_RastreoEmbarque" /* || idTabOrigen == 'zTab_RastreoEmbarque' */) {
                    this.setTabPrevioId(null);
                } else {
                    this.setTabPrevioId(idTabOrigen);
                }
                // a.setActiveTab(Ext.isEmpty(this.getTabPrevioId()) ? idTabDestino : this.getTabPrevioId());
                a.setActiveTab(idTabDestino);
                a.items.each(function (z) {
                    z.setDisabled((Ext.isObject(z) && z.id !== idTabDestino));
                });

            } catch (bsError) {
                Datum.Tools.msgSistema('Eds.gestorNavegacionTabuladores', bsError, 0);
            }
        },
        iconoEstatusViaje: function (value) {
            switch (value) {
                case 1:
                    /*Cargando*/
                    return "<img src='Imagenes/truck_Rampa.ico' style='padding:0;margin:0;' />";
                case 2:
                    /*Tránsito*/
                    return "<img src='Imagenes/truck_atiempo.ico' style='padding:0;margin:0;'/>";
                case 3:
                    /*Fin de Reparto*/
                    return "<img src='Imagenes/truck_vacio.ico' style='padding:0;margin:0;'/>";
                case 4:
                    /*Viaje Terminado*/
                    return "<img src='Imagenes/truck_finish.ico' style='padding:0;margin:0;'/>";
                default:
                    return null;
            }
        },
        init: function () {
            try {
                var me = this;
                var a = LmApp.zTabPnl_RastreoEmbarque;
                a.tabBar.setHidden(true);
                var con = !Ext.isEmpty(LmApp.zHidden_Concesionario.getValue()) ? LmApp.zHidden_Concesionario.getValue() : '';
                if (con <= 0) {
                    me.construyeTabGoogleMap();
                    LmApp.zTabPnl_Ubicacion.setDisabled(true);
                }
                LmApp.z_Btn_ReporteExcel.setDisabled(true);
                LmApp.TabDetalles.setDisabled(true);
                a.setActiveTab(0);
                Ext.get(document).on('contextmenu', function (e) {
                    e.preventDefault();
                    return false;
                });
                Eds.tools.msgDealer();
            } catch (bsError) {
                Datum.Tools.msgSistema('Eds.init', bsError, 0);
            }
        },
        mapa: {
            gestorMarcasMapa: function () {
                var f = LmApp.zTabPnl_Ubicacion;
                f.removeMarks();
                Eds.gestorNavegacionTabuladores("zTabPnl_Ubicacion");
                LmApp.menuRastreo.items.items.forEach(function (element) {
                    try {
                        if (element.checked) {
                            switch (element.id) {
                                case 'z_Mnu_UltPos':
                                    Eds.mapa.marcaPosicionUnidad(Eds.getFVSeleccionado(), false);
                                    break;
                                case 'z_Mnu_SecSis':
                                    var mrkPolSecSis = [];
                                    var mrkGrpSecSis = new L.FeatureGroup();
                                    LmApp.z_Store_TiempoEntrega.each(function (a) {
                                        Ext.Array.include(mrkPolSecSis, new L.LatLng(a.data.Latitud, a.data.Longitud));
                                        mrkGrpSecSis.addLayer(L.marker(new L.LatLng(a.data.Latitud, a.data.Longitud), {
                                            icon: L.icon({
                                                iconUrl: "Imagenes/Secuencia2/" + (!Ext.isEmpty(a.data.LlegadaReal) ? 'Flag' : 'VD_') + a.data.Secuencia + '.png',
                                                iconSize: [52, 37],
                                                /* iconAnchor: [0, 0],*/
                                                popupAnchor: [-3, -76],
                                                shadowAnchor: [22, 94]
                                            })
                                        }).bindPopup(f.toolTipLlegadaReal(a.data), {
                                            showOnMouseOver: true
                                        }));
                                    });
                                    f.addPolyLine(mrkPolSecSis, '#237700');
                                    f.addPolyLineAnimated(mrkPolSecSis, 'orange');
                                    f.addMarkGroup(mrkGrpSecSis);
                                    break;
                                case 'z_Mnu_SecReal':
                                    var idx = 1;
                                    var mrkPolSecReal = [];
                                    var mrkGrpSecReal = new L.FeatureGroup();
                                    var ultOrdFld = LmApp.z_Store_TiempoEntrega.getSorters().items[0];
                                    LmApp.z_Store_TiempoEntrega.sort("LlegadaReal", "ASC");
                                    LmApp.z_Store_TiempoEntrega.each(function (a) {
                                        Ext.Array.include(mrkPolSecReal, new L.LatLng(a.data.Latitud, a.data.Longitud));
                                        mrkGrpSecReal.addLayer(L.marker(new L.LatLng(a.data.Latitud, a.data.Longitud), {
                                            icon: L.icon({
                                                iconUrl: 'Imagenes/Secuencia2/AI_' + (idx) + '.png',
                                                iconSize: [52, 37],
                                                /* iconAnchor: [0, 0],*/
                                                popupAnchor: [-3, -76],
                                                shadowAnchor: [22, 94]
                                            })
                                        }).bindPopup(f.toolTipLlegadaReal(a.data), {
                                            showOnMouseOver: true
                                        }));
                                        idx++;
                                    });
                                    f.addPolyLine(mrkPolSecReal, "#000886");
                                    f.addPolyLineAnimated(mrkPolSecReal, 'orange');
                                    f.addMarkGroup(mrkGrpSecReal);
                                    LmApp.z_Store_TiempoEntrega.clearFilter(true);
                                    LmApp.z_Store_TiempoEntrega.sort(ultOrdFld._id, ultOrdFld._direction);
                                    break;
                            }
                        }
                    } catch (bsError) {
                        Datum.Tools.msgSistema('Eds.map.gestorMarcasMapa', bsError, 0);
                    }
                });
            },
            marcaPosicionUltima: function (grid, command, record) {
                var con = !Ext.isEmpty(LmApp.zHidden_Concesionario.getValue()) ? LmApp.zHidden_Concesionario.getValue() : '';
                if (con > 0) {
                    command.hidden = true;
                    command.hideMode = 'visibility';
                }
                if (record.data.EstatusFolio < 5) { /*Longitud === 0 && record.data.Latitud === 0*/
                    command.hidden = true;
                    command.hideMode = 'visibility';
                }
            },
            marcaPosicionConcesionario: function (location) {
                try {
                    var a = LmApp.zTabPnl_Ubicacion;
                    a.removeMarks();
                    if (Ext.isNumber(location.Latitud) && Ext.isNumber(location.Longitud)) {
                        a.addMarker(location.Latitud, location.Longitud, Eds.mapa.toolTipIndividual2(location), 'Imagenes/Nissan1.png', 15);
                    } else {
                        Ext.net.Notification.show({
                            iconCls: 'icon-exclamation',
                            html: '</br><b>No Existe Posición para esta Unidad</b>',
                            title: 'Mensaje: ',
                            hideDelay: 4000,
                            width: 200,
                            height: 100
                        });
                    }
                } catch (bsError) {
                    Datum.Tools.msgSistema('Eds.marcaPosicionConcesionario', bsError, 0);
                }
            },
            marcaPosicionUnidad: function (fv, removeMarks) {
                try {
                    // Eds.gestorNavegacionTabuladores(LmApp.zTabPnl_Ubicacion.id);
                    Datum.LumaData.getDmJsonResult("Default.Aspx", "SpGetJsonResult", "DWH", "SPQRY_UltimaPosicionUnidad", { ClaveUnidad: fv.ClaveUnidad, ClaveFolioViaje: fv.ClaveFolioViaje }, function (resultado) {
                        if (Ext.isArray(resultado.Table) && resultado.Table.length > 0) {
                            var a = LmApp.zTabPnl_Ubicacion;
                            var p = resultado.Table[0];
                            if (removeMarks) a.removeMarks();
                            a.addMarker(p.Latitud, p.Longitud, Eds.mapa.toolTipIndividual({
                                NoEconomico: fv.Unidad,
                                Posicion: p.Ubicacion,
                                Latitud: p.Latitud,
                                Longitud: p.Longitud,
                                Fecha: (!Ext.isEmpty(p.FUPosicion) ? Ext.Date.format(new Date(p.FUPosicion), 'd/M/Y H:i:s') : '-')
                            }), 'Imagenes/Secuencia2/Rabon.png', 15);
                        } else {
                            Ext.net.Notification.show({
                                iconCls: 'icon-exclamation',
                                html: '</br><b>No Existe Posición para esta Unidad</b>',
                                title: 'Mensaje: ',
                                hideDelay: 4000,
                                width: 200,
                                height: 100
                            });
                        }
                    });
                } catch (bsError) {
                    Datum.Tools.msgSistema('Eds.marcaPosicionUnidad', bsError, 0);
                }
            },
            selectorMarcasMapa: function () {
                var resultado = false;
                LmApp.menuRastreo.items.items.forEach(function (element) {
                    if (element.checked) {
                        resultado = true;
                    }
                    LmApp.z_btn_DetalleVerMapa.setDisabled(!resultado);
                });
            },
            toolTipIndividual: function (inputArray) {
                var html = "<table class='card'>";
                html += "<tr><td class='tit01'>Unidad No.:</td><td class='des01'>" + inputArray.NoEconomico + "</td></tr>";
                html += "<tr><td class='tit01'>Posición:</td><td class='des01'>" + inputArray.Posicion + "</td></tr>";
                html += "<tr><td class='tit01'>Latitud:</td><td class='des01'>" + inputArray.Latitud + "</td></tr>";
                html += "<tr><td class='tit01'>Longitud:</td><td class='des01'>" + inputArray.Longitud + "</td></tr>";
                html += "<tr><td class='tit01'>Fecha de Ubicación:</td><td class='des01'>" + inputArray.Fecha + "</td></tr>";
                html += "</table>";
                return html;
            },
            toolTipIndividual2: function (infoMarca) {
                var html = "<table>";
                html += "<tr><td style='color:#001749;font-weight:bold;'>Numero Conc.:</td><td class='des01'>" + infoMarca.NumeroConcesionario + "</td></tr>";
                html += "<tr><td style='color:#001749;font-weight:bold;'>Concesionario:</td><td class='des01'>" + infoMarca.Concesionario + "</td></tr>";
                html += "<tr><td style='color:#001749;font-weight:bold;'>Ciudad:</td><td class='des01'>" + infoMarca.Ciudad + "</td></tr>";
                html += "</table>";
                return html;
            }
        },
        ocultaEncuesta: function (grid, command, record) {
            var con = !Ext.isEmpty(LmApp.zHidden_Concesionario.getValue()) ? LmApp.zHidden_Concesionario.getValue() : '';

            if (con <= 0) {
                command.hidden = true;
                command.hideMode = 'visibility';
            }

            if (record.data.CvEncuesta > 0) {
                command.hidden = true;
                command.hideMode = 'visibility';
            }
        },
        pQ: {
            DatosEncuestaCalidad: function () {
                var m = LmApp.zTabPnlEncuesta;
                var resultado;
                if (m.isValid()) {
                    var values = m.getForm().getFieldValues();
                    resultado = Ext.encode(values).replace(/<([^<>]*)>/g, "&lt;$1&gt;");
                }
                // ReSharper disable once UsageOfPossiblyUnassignedValue
                return resultado;
            }
        },
        preparaComandoCapturaOptica: function (grid, command, record) {
            command.hidden = Ext.isEmpty(record.data.FechaProcesada);
            command.iconCls = (record.data.CapturaOptica) ? "fa fa-barcode blackiconcolor" : "fa fa-barcode rediconcolor";
            command.qtext = (record.data.CapturaOptica) ? "Captura optica de código de barras" : "Captura desde pantalla terminal";
        },
        preparaComandoCapturaDanno: function (grid, command, record) {
            command.hidden = !record.data.Danno;
            command.qtext = record.data.Observaciones;
            command.iconCls = (record.data.Danno) ? "fa fa-commenting rediconcolor" : "";
        },
        preparaComandoPosConc: function (grid, command, record) {
            var con = !Ext.isEmpty(LmApp.zHidden_Concesionario.getValue()) ? LmApp.zHidden_Concesionario.getValue() : '';

            if (con > 0) {
                command.hidden = true;
                command.hideMode = 'visibility';
            }

            if (command.command === 'Ubicacion' && record.data.EstatusFolio > 5) {
                command.hidden = true;
                command.hideMode = 'visibility';
            }
            if (record.data.Longitud === 0 && record.data.Latitud === 0) {
                command.hidden = true;
                command.hideMode = 'visibility';
            }
        },
        preparaComandoArriboServicio: function (grid, command, record) {
            if ( /*command.command == 'cmdEntregado' &&*/ Ext.isEmpty(record.data.LlegadaReal)) {
                command.hidden = true;
                command.hideMode = 'visibility';
            }
        },
        preparaComandoEntregaElectronica: function (grid, command, record) {
            //todo: corregir icono de entrega efectiva
            var a = record.data;
            if (Ext.isEmpty(a.LlegadaReal)) {
                command.iconCls = "fa fa-search yellowiconcolor";
                command.qtext = "Por realizar";
            } else {
                command.iconCls = (a.Entregado === 0) ? "fa fa-file-text-o orangeiconcolor" : "fa fa-tablet greeniconcolor";
                command.qtext = (a.Entregado === 0) ? "Servicio Entrega Impreso" : "Servicio Electrónico";
            }
        },
        preparaComandoDannado: function (claveFolioViaje) {
            LmApp.Window1.show();
            try {
                LmApp.z_Store_DetDev.removeAll();
                Cool.ZdirmetDetDevolucion(claveFolioViaje, {
                    success: function (resultado) {
                        var jsnResultado = (resultado === '') ? { 'Rows': [{ 'CtlCod': '', 'CtlCve': 'SQL_OK', 'CtlObj': '', 'CtlObs': '' }] } : eval('(' + resultado + ')');
                        if (jsnResultado.Rows[0].CtlCve === "SQL_OK") {
                            LmApp.Window1.show();
                        } else if (jsnResultado.Rows[0].CtlCve === "SQL_ERROR") {
                            Datum.Tools.msgSistema("ZdirmetDetDevolucion", jsnResultado.Rows[0].CtlObs, 1);
                        } else if (jsnResultado.Rows[0].CtlCve === "SQL_VACIO") {
                            Datum.Tools.msgSistema("ZdirmetDetDevolucion", 'No existe información bajo los criterios seleccionados', 1);
                        } else {
                            Datum.Tools.msgSistema("ZdirmetDetDevolucion", 'Error de comunicación con el Servidor', 1);
                        }
                    },
                    failure: function (err) {
                        Datum.Tools.msgSistema('ZdirmetDetDevolucion', err, 0);
                    }
                });
            } catch (bserror) {
                Datum.Tool.sets.msgSistema('preparaComandoDannado', bserror, 0);
            }
        },
        reiniciaForma: function (modo) {
            switch (modo) {
                case 'Filtros':
                    LmApp.txtfld_NumeroGuia.reset();
                    LmApp.txtFld_NumeroPlacas.reset();
                    LmApp.txt_CA_Viaje.reset();
                    LmApp.txt_CA_Unidad.reset();
                    LmApp.txt_CA_Concesionario.reset();
                    LmApp.txt_CA_NoOperador.reset();
                    LmApp.dtefld_CA_RangoInicial.reset();
                    LmApp.dtefld_CA_RangoFinal.reset();
                    LmApp.z_Store_Resultado.removeAll();
                    break;
                case 'Detalle':
                    LmApp.z_Store_TiempoEntrega.removeAll();
                    LmApp.lbl_NombreOperador.setText('-');
                    LmApp.lbl_NumeroViaje.setText('-');
                    LmApp.lbl_NumeroUnidad.setText('-');
                    LmApp.lbl_PlacaUnidad.setText('-');
                    LmApp.lbl_Ruta.setText('-');
                    LmApp.zTxtFld_FInicioCarga.setValue('-');
                    LmApp.zTxtFld_FFinCarga.setValue('-');
                    LmApp.zTxtFld_FSalidaProgramada.setValue('-');
                    LmApp.zTxtFld_FSalidaReal.setValue('-');
                    LmApp.zTxtFld_FFinServicio.setValue('-');
                    LmApp.txt_Arribos.setText('-');
                    LmApp.txt_Items.setText('-');
                    LmApp.zBtn_ExportaDetalleViaje.setDisabled(true);
                    break;

                case 'Encuesta':
                    LmApp.zTabPnlEncuesta.getForm().reset();
                    break;

            }
        },
        renderColItemDannados: function (value, meta, record) {
            return (value > 0) ? ("<a style='color:#0997D7; text-decoration:underline; Font-size:18px; font-weight:bold;' 'href='#' onclick='Eds.preparaComandoDannado({1});'>{0}</a>", value, record.data.ClaveFolioViaje) : value;
        },
        renderColLlegaTarde: function (value, item, record) {
            var a = record.data.llegadaEstimada;
            var b = record.data.llegadaReal;
            var start = new Date(a.getFullYear(), a.getMonth(), a.getDate(), 9, 0, 0);
            var end = new Date(a.getFullYear(), a.getMonth(), a.getDate(), 18, 0, 0);
            return Ext.String.format('<span style="color:{0};">{1}</span>', !Ext.isEmpty(b) && (b <= a || Ext.Date.between(b, start, end)) ? "green" : "red", Ext.Date.format(value, 'd-M-Y H:i:s'));

        },
        resetFormulario: function () {
            var me = this;
            me.up('form').getForm().reset();
        },
        rptExportaDetGuia: function () {
            var a = Ext.JSON.encode({ records: { record: LmApp.zGrdPnl_DetEmbArt.getRowsValues({ selectedOnly: false }) } });
            var b = Ext.JSON.encode(Eds.tools.paramsDetGuiaExcel());
            Datum.AppExportaExcel.creaDocExcel('Aspx/Rpt_Excel.aspx', '../xslt/RptDetalleGuias.xslt', 'Detalle de Guia', a, b);
        },
        // ReSharper disable once UnusedParameter
        rptExportaDatoViaje: function (grid) {
            var a = Ext.JSON.encode({ records: { record: LmApp.zGrdPnl_RastreoEmbarque.getRowsValues({ selectedOnly: false }) } });
            var b = Ext.JSON.encode({ params: { param: { parametro1: "" } } });
            Datum.AppExportaExcel.creaDocExcel('Aspx/Rpt_Excel.aspx', '../xslt/DWHRastreoEmbarques.xslt', 'RastreoDeEmbarques', a, b);
        },
        rptExportaDetalleViaje: function () {
            var a = Ext.JSON.encode({ records: { record: LmApp.z_GrdPnl_Tiempos.getRowsValues({ selectedOnly: false }) } });
            var b = Ext.JSON.encode(Eds.tools.paramsExcel());
            Datum.AppExportaExcel.creaDocExcel('Aspx/Rpt_Excel.aspx', '../xslt/DWHRastreoTiemposEm.xslt', 'RastreoTiemposEmbarques', a, b);
        },
        salirRastreoMapa: function () {
        },
        setEstiloCelda01: function (value, record) {
            return Ext.String.format('<span style="color:green;" class="{0}"></span>', !Ext.isEmpty(record.record.data.LlegadaReal) ? 'fa fa-check' : '');
        },
        singleton: true,
        tools: {
            setFechaHora: function () {
                Datum.LumaData.getDmFechaHora("Default.Aspx", "SpGetFechaHora", function (resultado) {
                    var dt = new Date(resultado);
                    App.AppModEncSatis.setFechaActual(dt);
                    LmApp.zTxtFldFechaEncuesta.setValue(Ext.Date.format(dt, 'F j, Y, H:i:s'));
                });
            },
            msgDatos: function (titulo) {
                var zMensaje = "<b>Los Datos se han guardado Correctamente.</b></br></br> " +
                    "<b>    Gracias por su participación </b>";
                Ext.Msg.show({ title: +titulo, msg: zMensaje, buttons: Ext.Msg.OK, iconCls: 'fa fa-floppy-o iconColorGray' });
            },
            msgDealer: function () {
                if (LmApp.zHidden_Perfil.getValue() === 'NISSAN_CONCESIONARIO') {
                    var task = new Ext.util.DelayedTask(function () {
                        LmApp.zBtnMnuSoporteAyuda.el.frame('#00ff77', 6);
                    });
                    task.delay(8000);
                    Ext.net.Notification.show({
                        autoHide: true,
                        closeVisible: true,
                        height: 200,
                        html: "<body style='font-family: Arial, Helvetica, sans-serif;'><h1 style='color:;'>Amigo Distribuidor!</h1><p>Si requiere ayuda inmediata para el uso de este Portal Web no olvide que puede obtenerla en línea presionando el botón 'Soporte y Ayuda' que se localiza en la parte superior derecha</p><body>",
                        hideFx: {
                            fxName: 'ghost',
                            args: ['tr', { duration: 6000 }]
                        },
                        iconCls: 'icon-information',
                        showFx: {
                            fxName: 'slideIn',
                            args: [
                                'tr', {
                                    easing: 'bounceOut',
                                    duration: 2000
                                }
                            ]
                        },
                        title: 'Aviso del Sistema',
                        ui: 'warning',
                        width: 400
                    });
                }
            },
            msgSistema: function (titulo, mensaje, tipoMensaje) {
                try {
                    var formatoMsj = '<span style="color:{0};">{1}</span>';
                    var zTitulo = '';
                    var zMensaje = '';
                    var iconMsg = "";
                    switch (tipoMensaje) {
                        case 0:
                            zTitulo = Ext.String.format(formatoMsj, "red", titulo);
                            zMensaje = "<b>Excepción en: </b></br>" + mensaje;
                            iconMsg = "fa fa-exclamation-triangle iconcolorred";
                            break;
                        case 1:
                            zTitulo = Ext.String.format(formatoMsj, "green", titulo);
                            zMensaje = "<b>Mensaje: </b></br>" + mensaje;
                            iconMsg = "fa fa-terminal";
                    }
                    Ext.net.Notification.show({
                        autoScroll: true,
                        closeVisible: true,
                        html: zMensaje,
                        bodyStyle: 'padding:10px',
                        hideDelay: 3000,
                        height: 200,
                        hideFx: {
                            args: [
                                'r', {
                                    duration: 1000,
                                    endOpacity: 0.50
                                }
                            ],
                            fxName: 'slideOut'
                        },
                        iconCls: iconMsg,
                        pinEvent: 'click',
                        showFx: {
                            args: ['r', { duration: 300 }],
                            fxName: 'slideIn'
                        },
                        shadow: true,
                        title: zTitulo,
                        width: 400
                    });
                } catch (bsError) {
                    Ext.Msg.alert('Error en fn:ACT.tools.msgSistema', bsError.description);
                }
            },
            onKeyUp: function (field) {
                if (this.startDateField) {
                    field = Ext.getCmp(this.startDateField);
                    field.setMaxValue();
                    this.dateRangeMax = null;
                } else if (this.endDateField) {
                    field = Ext.getCmp(this.endDateField);
                    field.setMinValue();
                    this.dateRangeMin = null;
                }
                field.validate();
            },
            paramsCargarViajes: function () {
                Datum.Tools.conciliaControlesDateRange(LmApp.dtefld_CA_RangoInicial, LmApp.dtefld_CA_RangoFinal);
                var a = {
                    Param0: LmApp.txtfld_NumeroGuia.getValue(),
                    Param1: LmApp.txtFld_NumeroPlacas.getValue(),
                    Param2: LmApp.txt_CA_Viaje.getValue(),
                    Param3: LmApp.txt_CA_Unidad.getValue(),
                    Param4: Ext.isEmpty(LmApp.txt_CA_Concesionario.getValue()) ? LmApp.zHidden_Concesionario.getValue() : LmApp.txt_CA_Concesionario.getValue(),
                    Param5: LmApp.txt_CA_NoOperador.getValue(),
                    Param6: Ext.isEmpty(LmApp.dtefld_CA_RangoInicial.getValue()) ? '' : Datum.Tools.toDateSQLRango(LmApp.dtefld_CA_RangoInicial.getValue(), "inicio"),
                    Param7: Ext.isEmpty(LmApp.dtefld_CA_RangoFinal.getValue()) ? '' : Datum.Tools.toDateSQLRango(LmApp.dtefld_CA_RangoFinal.getValue(), "fin")
                };
                return a;
            },
            paramsDetGuiaExcel: function () {
                return {
                    params:
                    {
                        param: [
                            {
                                concesionario: LmApp.zLbl_DetConcesionario.getText(),
                                numeroGuias: LmApp.zLbl_guias.getText(),
                                numeroPaquetes: LmApp.zLbl_item.getText(),
                                tiempodescarga: LmApp.zLbl_TiempoR.getText()
                            }
                        ]
                    }
                };
            },
            paramsExcel: function () {
                return {
                    params:
                    {
                        param: [
                            {
                                numeroViaje: LmApp.lbl_NumeroViaje.getText(),
                                numeroUnidad: LmApp.lbl_NumeroUnidad.getText(),
                                placaUnidad: LmApp.lbl_PlacaUnidad.getText(),
                                nombreOperador: LmApp.lbl_NombreOperador.getText(),
                                ruta: LmApp.lbl_Ruta.getText(),
                                arribos: LmApp.txt_Arribos.getText(),
                                paquetes: LmApp.txt_Items.getText(),
                                tiempoRuta: LmApp.txt_TiempoRutaProgramado.value
                            }
                        ]
                    }
                };
            },
            redimAnchoColGrid: function (gridPanelMide) {
                Ext.each(gridPanelMide.columns, function (column) {
                    column.autoSize();
                });
            },
            obtieneAnchoColGrid: function (gridPanelMide) {
                var arr = [];
                Ext.each(gridPanelMide.columns, function (column) {
                    arr.push(column.width);
                });
                return Ext.encode(arr);
            },
            redimFiltroPanel: function (panel) {
                if (panel.getHeight() > 44) {
                    LmApp.Button1.setText("Más Controles");
                    LmApp.Button1.setIconCls("fa fa-plus-square-o");
                    panel.setHeight(44);
                } else {
                    LmApp.Button1.setText("Menos Controles");
                    LmApp.Button1.setIconCls("fa fa-minus-square-o");
                    panel.setHeight(150);
                }
            }
        }
    });
