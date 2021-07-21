Ext.define('lmApp.AppRastreoEmbarque',
    {
        construyeTabGoogleMap: function () {
            try {
                lmApp.z_TabPnl_RastreoEmbarque.add({
                    autoScroll: false,
                    border: true,
                    /*headerCfg:'display:none;',*/
                    id: 'TabUbicacion',
                    /* iconCls: '#Map', */
                    header: false,
                    bodyPadding: 15,
                    glyph: 42,
                    mapConfOpts: ['enableScrollWheelZoom', 'enableDoubleClickZoom', 'enableDragging', 'streetViewControl'],
                    mapControls: ['rotateControl'],
                    tbar: [
                         {
                             xtype: 'button',
                             text: 'Regresar',
                             id: 'ExecuteSearch',
                             iconCls: 'fa fa-arrow-left iconcolorwhite',
                             width: 100,
                             handler: function () {
                                 var a = lmApp.AppRastreoEmbarque.getTabPrevioId();
                                 if (!Ext.isEmpty(a)) {
                                     lmApp.AppRastreoEmbarque.gestorNavegacionTabuladores(a);
                                 }
                                 lmApp.TabUbicacion.clearMarkers();
                             },
                             ui: 'success'
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
                    setCenter: {
                        lat: 23.019850,
                        lng: -101.156222
                    },
                    style: 'border: solid 2px #FFDD03',
                    title: 'Ubicación Satelital',
                    xtype: 'gmappanel',
                    zoomLevel: 13
                });
                var keyMap = new Ext.util.KeyMap({
                    target: Ext.getBody(),
                    binding: [
                        {
                            key: Ext.event.Event.ESC,
                            fn: function () {
                                var a = lmApp.AppRastreoEmbarque.getTabPrevioId();
                                if (!Ext.isEmpty(a)) {
                                    lmApp.AppRastreoEmbarque.gestorNavegacionTabuladores(a);
                                }
                                lmApp.TabUbicacion.clearMarkers();
                            }
                        }
                    ],
                    scope: this
                });
                /* lmApp.TabUbicacion.removeClass('x-panel-bwrap')*/
            } catch (bsError) {
                MensajeError('lmApp.AppRastreoEmbarque.construyeTabGoogleMap', bsError, 0);
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
                lmApp.z_Store_NivelServicio.removeAll();
                lmApp.z_Store_TiempoEntrega.each(function (item) {
                    if (!Ext.isEmpty(item.data.LlegadaReal)) {
                        totalEntregadas++;
                        /*Con arribo en el mismo día de la fecha Programada*/
                        /* if ((item.data.LlegadaReal.getDate() <= item.data.LlegadaEstimada.getDate()) && (item.data.LlegadaReal.getMonth() == item.data.LlegadaEstimada.getMonth())){*/
                        if (Ext.Date.diff(item.data.LlegadaEstimada, item.data.LlegadaReal, 'd') <= 0) {
                            entregasATiempo++;
                        }
                    }
                });
                lmApp.z_Store_NivelServicio.add({ Nombre: 'En tiempo:' + entregasATiempo + ' (' + Math.round(entregasATiempo * 100 / totalEntregadas) + '%)', Valor: entregasATiempo });
                lmApp.z_Store_NivelServicio.add({ Nombre: 'Destiempo:' + (totalEntregadas - entregasATiempo) + ' (' + Math.round((totalEntregadas - entregasATiempo) * 100 / totalEntregadas) + '%)', Valor: totalEntregadas - entregasATiempo });
            } catch (bserror) {
                MensajeError('cargaDatoChartServicio', bserror, 0);
            }
        },
        cargaDatoViajes: function () {
            try {
                window.lmApp.LumaData.getDmJsonResult("DWH", "SPQRY_RastreabilidadViajes", this.tools.paramsCargarViajes(), function (resultado) {
                    window.lmApp.z_Store_Resultado.removeAll();
                    window.lmApp.z_Store_Resultado.loadData(resultado.Table);
                    window.lmApp.z_Btn_ReporteExcel.setDisabled(false);
                });
            } catch (bsError) {
                MensajeError('cargaDatoViajes', bsError, 0);
                window.lmApp.z_viewPort_Principal.el.unmask();
            }
        },
        cargaDetalleViaje: function (a) {
            try {
                window.lmApp.AppRastreoEmbarque.gestorNavegacionTabuladores('TabDetalles');
                window.lmApp.AppRastreoEmbarque.reiniciaForma('Detalle');
                this.setFVSeleccionado(a);
                window.lmApp.lbl_NombreOperador.setText(a.Operador);
                window.lmApp.lbl_NumeroViaje.setText(a.FolioViaje);
                window.lmApp.lbl_NumeroUnidad.setText(a.Unidad);
                window.lmApp.lbl_PlacaUnidad.setText(a.Placas);
                window.lmApp.lbl_Ruta.setText(a.Ruta);
                window.lmApp.txt_Arribos.setText(a.NoParadas);
                window.lmApp.txt_Items.setText(a.Bultos);
                /* lmApp.txt_ItemsDev.setValue(a.Devolucion); */
                window.lmApp.Progress4.updateProgress(a.Porciento / 100, "Avance de Servicio " + a.Porciento + "%", true);
                window.lmApp.LumaData.getDmJsonResult("DWH", "SPQRY_TiemposViajeEvaluacion", { ClaveCliente: 3, ClaveFolioViaje: a.ClaveFolioViaje }, function (b) {
                    window.lmApp.z_Btn_ReporteExcel.setDisabled(false);
                    window.lmApp.AppRastreoEmbarque.setFvDetalleCabecero(a);
                    window.lmApp.zTxtFld_FInicioCarga.setValue(Ext.Date.format(new Date(b.Table[0].FInicioCarga), 'd-M-Y G:i'));
                    window.lmApp.zTxtFld_FFinCarga.setValue(Ext.Date.format(new Date(b.Table[0].FFinCarga), 'd-M-Y G:i'));
                    window.lmApp.zTxtFld_FSalidaProgramada.setValue(Ext.Date.format(new Date(b.Table[0].FSalidaProgramada), 'd-M-Y G:i'));
                    window.lmApp.zTxtFld_FSalidaReal.setValue(Ext.Date.format(new Date(b.Table[0].FSalidaReal), 'd-M-Y G:i'));
                    window.lmApp.zTxtFld_FFinServicio.setValue(Ext.Date.format(new Date(b.Table[0].FFinServicio), 'd-M-Y G:i'));
                    window.lmApp.txt_TiempoRutaReal.setValue(b.Table[0].TiempoRutaReal);
                    window.lmApp.txt_TiempoRutaProgramado.setValue(b.Table[0].TiempoViaje);
                    window.lmApp.z_Store_TiempoEntrega.removeAll();
                    window.lmApp.z_Store_TiempoEntrega.loadData(b.Table1);
                    window.lmApp.z_Store_TiempoEntrega.sort("Secuencia", "ASC");
                    if (a.EstatusFolio > 5 || (a.Latitud === 0 || a.Longitud === 0)) {
                        window.lmApp.z_btn_DetalleVerMapa.setDisabled(true);
                        window.lmApp.z_Mnu_UltPos.setDisabled(true);
                        window.lmApp.z_Mnu_UltPos.setChecked(false);
                    } else {
                        window.lmApp.z_btn_DetalleVerMapa.setDisabled(false);
                        window.lmApp.z_Mnu_UltPos.setDisabled(false);
                        window.lmApp.z_Mnu_UltPos.setChecked(true);
                        window.lmApp.z_Mnu_SecSis.setChecked(false);
                        window.lmApp.z_Mnu_SecReal.setChecked(false);
                    }
                });

            } catch (bsError) {
                MensajeError('cargaDetalleViaje', bsError, 0);
                window.lmApp.z_viewPort_Principal.el.unmask();
            }
        },
        cargaDetalleEmbarque: function (item, command, record) {
            try {
                lmApp.z_Store_DetGuia.removeAll();
                Cool.ZdirmetCargarDetGuia(record.data.ClaveFolioViaje, record.data.NumeroConcesionario, {
                    success: function (resultado) {
                        //lmApp.z_Win_DetGuia.show();
                        lmApp.Pnldet.hide();
                        lmApp.PnlDan.hide();
                        lmApp.Window2.show();
                        lmApp.GrdPnl_DetGuia.body.applyStyles('border: solid 4px red');
                        lmApp.GrdPnl_DetDan.body.applyStyles('border: solid 4px red');
                        lmApp.lbl_DetConcesionario.setText('(' + record.data.NumeroConcesionario + ') - ' + record.data.Concesionario);
                        lmApp.lbl_DanConcesionario.setText('(' + record.data.NumeroConcesionario + ') - ' + record.data.Concesionario);
                        var jsnResultado = (resultado == '') ? { 'Rows': [{ 'CtlCod': '', 'CtlCve': 'SQL_OK', 'CtlObj': '', 'CtlObs': '' }] } : eval('(' + resultado + ')');
                        lmApp.z_GrdPnl_DetGuia.body.applyStyles('border: solid 4px red');
                        lmApp.z_lbl_DetConcesionario.setText('(' + record.data.NumeroConcesionario + ') - ' + record.data.Concesionario);
                        var jsnResultado = (resultado == '') ? { 'Rows': [{ 'CtlCod': '', 'CtlCve': 'SQL_OK', 'CtlObj': '', 'CtlObs': '' }] } : eval('(' + resultado + ')');
                        if (jsnResultado.Rows[0].CtlCve == "SQL_OK") {
                            lmApp.Gruping1.startCollapsed = true;
                        } else if (jsnResultado.Rows[0].CtlCve == "SQL_ERROR") {
                            MensajeError("cargaDetalleEmbarque", jsnResultado.Rows[0].CtlObs, 1);
                        } else if (jsnResultado.Rows[0].CtlCve == "SQL_VACIO") {
                            MensajeError("cargaDetalleEmbarque", 'No existe información bajo los criterios seleccionados', 1);
                        } else {
                            MensajeError("cargaDetalleEmbarque", 'Error de comunicación con el Servidor', 1);
                        }
                    },
                    failure: function (err) {
                        MensajeError('cargaDetalleEmbarque', err, 0);
                    }
                });
            } catch (bsError) {
                MensajeError('cargaDetalleEmbarque', bsError, 0);
            }
        },
        cargaMenuContextualViajes: function (view, record, item, index, e) {
            e.stopEvent();
            var menu = new Ext.menu.Menu({
                modal: true,
                items: [
                    {
                        iconCls: 'icon-notebook-streamline orangeiconcolor',
                        text: 'Ver Servicios',
                        handler: function () {
                            lmApp.AppRastreoEmbarque.cargaDetalleViaje(record.data);
                        }
                    }, {
                        icon: 'action',
                        text: 'Operador',
                        handler: function () {
                            Ext.Msg.show({
                                title: 'Mensaje del Sistema',
                                message: '<b>' + record.data.Operador + '</b>'
                            })
                        }
                    }]
            }).showAt(e.getXY());
        },
        constructor: function () {
            return this;
        },
        estiloEtiquetaProgress: function (value, meta) {
            var me = this,
                text,
                cls = me.progressCls,
                pCls,
                percent,
                cWidth = me.getWidth(true) - 2;

            if (me.hideIfEmpty && (!value && value !== 0 || value < 0)) {
                return "";
            }
            percent = Math.round(value * 100);
            value = value || 0;
            text = Ext.String.format(me.progressText, percent);

            pCls = cls + ' ' + cls + '-' + me.ui;

            if (percent >= 0 && percent < 20) {
                pCls += " progress-0-20";
            }

            if (percent >= 20 && percent < 100) {
                pCls += " progress-20-60";
            }

            if (percent == 100) {
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
        gestorNavegacionTabuladores: function (idxTabActivo) {
            try {
                var a = lmApp.z_TabPnl_RastreoEmbarque;
                var tabActivar = a.getComponent(idxTabActivo);
                if (tabActivar.id === "TabRastreoEmbarque") {
                    this.setTabPrevioId(null);
                } else {
                    this.setTabPrevioId(a.getActiveTab().id);
                }
                a.setActiveTab(idxTabActivo);
                a.items.each(function (z) {
                    z.setDisabled((Ext.isObject(z) && z.id !== a.getActiveTab().id));
                });
            } catch (bsError) {
                MensajeError('lmApp.AppRastreoEmbarque.gestorNavegacionTabuladores', bsError, 0);
            }
        },
        iconoEstatusViaje: function (value) {
            switch (value) {
                case 1:
                    /*Cargando*/
                    return "<img src='../Imagenes/truck_Rampa.ico' style='padding:0;margin:0;' />";
                case 2:
                    /*Tránsito*/
                    return "<img src='../Imagenes/truck_atiempo.ico' style='padding:0;margin:0;'/>";
                case 3:
                    /*Fin de Reparto*/
                    return "<img src='../Imagenes/truck_vacio.ico' style='padding:0;margin:0;'/>";
                case 4:
                    /*Viaje Terminado*/
                    return "<img src='../Imagenes/truck_finish.ico' style='padding:0;margin:0;'/>";
                default:
                    return null;
            }
        },
        inicializaControles: function () {
            try {
                //this.construyeTabGoogleMap();
                lmApp.z_TabPnl_RastreoEmbarque.tabBar.setHidden(true);
                lmApp.TabUbicacion.show();
                lmApp.z_TabPnl_RastreoEmbarque.setActiveTab(0);
                lmApp.z_Btn_ReporteExcel.setDisabled(true);
                lmApp.TabDetalles.setDisabled(true);
                lmApp.TabUbicacion.setDisabled(true);
                
            } catch (bsError) {
                MensajeError('lmApp.AppRastreoEmbarque.inicializaControles', bsError, 0);
            }
        },
        setEstiloCelda01: function (value, record) {
            return Ext.String.format('<span style="color:green;" class="{0}"></span>', !Ext.isEmpty(record.record.data.LlegadaReal) ? 'fa fa-check' : '');
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
            if (command.command == 'Ubicacion' && record.data.EstatusFolio > 5) {
                command.hidden = true;
                command.hideMode = 'visibility';
            }
            if (record.data.Longitud == 0 && record.data.Latitud == 0) {
                command.hidden = true;
                command.hideMode = 'visibility';
            }
        },
        preparaComandoArriboServicio: function (grid, command, record) {
            if (/*command.command == 'cmdEntregado' &&*/ Ext.isEmpty(record.data.LlegadaReal)) {
                command.hidden = true;
                command.hideMode = 'visibility';
            }
        },
        preparaComandoEntregaElectronica: function (grid, command, record) {
            /* command.iconCls = (record.data.Entregado == 0) ? "icon-calculator rediconcolor" : "icon-barcode blackiconcolor"; */
            if (Ext.isEmpty(record.data.LlegadaReal)) {
                command.iconCls = "fa fa-search yellowiconcolor";
                command.qtext = "Por realizar";
            } else {
                command.iconCls = (record.data.Entregado === 0) ? "fa fa-file-text-o orangeiconcolor" : "fa fa-tablet greeniconcolor";
                command.qtext = (record.data.Entregado === 0) ? "Servicio Manual" : "Servicio electrónico";
            }
        },
        preparaComandoDannado: function (claveFolioViaje) {
            lmApp.Window1.show();
            try {
                lmApp.z_Store_DetDev.removeAll();
                Cool.ZdirmetDetDevolucion(claveFolioViaje, {
                    success: function (resultado) {
                        var jsnResultado = (resultado == '') ? { 'Rows': [{ 'CtlCod': '', 'CtlCve': 'SQL_OK', 'CtlObj': '', 'CtlObs': '' }] } : eval('(' + resultado + ')');
                        if (jsnResultado.Rows[0].CtlCve == "SQL_OK") {
                            lmApp.Window1.show();
                        } else if (jsnResultado.Rows[0].CtlCve == "SQL_ERROR") {
                            MensajeError("ZdirmetDetDevolucion", jsnResultado.Rows[0].CtlObs, 1);
                        } else if (jsnResultado.Rows[0].CtlCve == "SQL_VACIO") {
                            MensajeError("ZdirmetDetDevolucion", 'No existe información bajo los criterios seleccionados', 1);
                        } else {
                            MensajeError("ZdirmetDetDevolucion", 'Error de comunicación con el Servidor', 1);
                        }
                    },
                    failure: function (err) {
                        MensajeError('ZdirmetDetDevolucion', err, 0);
                    }
                });
            } catch (bserror) {
                MensajeError('preparaComandoDannado', bserror, 0);
            }
        },
        reiniciaForma: function (modo) {
            switch (modo) {
                case 'Filtros':
                    window.lmApp.txtfld_NumeroGuia.reset();
                    window.lmApp.txtFld_NumeroPlacas.reset();
                    window.lmApp.txt_CA_Viaje.reset();
                    window.lmApp.txt_CA_Unidad.reset();
                    window.lmApp.txt_CA_Concesionario.reset();
                    window.lmApp.txt_CA_NoOperador.reset();
                    window.lmApp.dtefld_CA_RangoInicial.reset();
                    window.lmApp.dtefld_CA_RangoFinal.reset();
                    window.lmApp.z_Store_Resultado.removeAll();
                    break;
                case 'Detalle':
                    window.lmApp.z_Store_TiempoEntrega.removeAll();
                    /* lmApp.z_Store_PorcientoEntrega.removeAll();
                    lmApp.z_Store_NivelServicio.removeAll(); */
                    window.lmApp.lbl_NombreOperador.setText('-');
                    /* lmApp.lbl_NumeroViaje.reset();*/
                    window.lmApp.lbl_NumeroViaje.setText('-');
                    window.lmApp.lbl_NumeroUnidad.setText('-');
                    window.lmApp.lbl_PlacaUnidad.setText('-');
                    window.lmApp.lbl_Ruta.setText('-');


                    window.lmApp.zTxtFld_FInicioCarga.setValue('-');
                    window.lmApp.zTxtFld_FFinCarga.setValue('-');
                    window.lmApp.zTxtFld_FSalidaProgramada.setValue('-');
                    window.lmApp.zTxtFld_FSalidaReal.setValue('-');
                    window.lmApp.zTxtFld_FFinServicio.setValue('-');


                    window.lmApp.txt_Arribos.setText('-');
                    window.lmApp.txt_Items.setText('-');
                    /* lmApp.txt_ItemsDev.setText('-'); */
                    window.lmApp.z_Btn_ReporteExcel.setDisabled(true);
                    break;
                case 'DetalleEmbarque':
                    window.lmApp.z_GrdPnl_Tiempos.show();
                    //lmApp.z_GrdPnl_DetGuia.hide();
                    window.lmApp.z_Store_DetGuia.removeAll();
                    break;
                default:
                    window.lmApp.txtfld_NumeroGuia.reset();
                    window.lmApp.txtFld_NumeroPlacas.reset();
                    window.lmApp.txt_CA_Viaje.reset();
                    window.lmApp.txt_CA_Unidad.reset();
                    window.lmApp.txt_CA_Concesionario.reset();
                    window.lmApp.txt_CA_NoOperador.reset();
                    window.lmApp.dtefld_CA_RangoInicial.reset();
                    window.lmApp.dtefld_CA_RangoFinal.reset();
                    window.lmApp.z_Store_Resultado.removeAll();
                    ////////////////////
                    window.lmApp.z_Store_TiempoEntrega.removeAll();
                    // lmApp.z_Store_Embarques.removeAll();
                    /*lmApp.z_Store_PorcientoEntrega.removeAll();
                    lmApp.z_Store_NivelServicio.removeAll();*/
                    window.lmApp.lbl_NombreOperador.setText('-');
                    window.lmApp.lbl_NumeroViaje.setText('-');
                    window.lmApp.lbl_NumeroUnidad.setText('-');
                    window.lmApp.lbl_PlacaUnidad.setText('-');
                    window.lmApp.lbl_Ruta.setText('-');

                    window.lmApp.txt_Arribos.setText('-');
                    window.lmApp.txt_Items.setText('-');

                    Luma.zTxtFld_FInicioCarga.setValue('-');
                    Luma.zTxtFld_FFinCarga.setValue('-');
                    Luma.zTxtFld_FSalidaProgramada.setValue('-');
                    Luma.zTxtFld_FSalidaReal.setValue('-');
                    Luma.zTxtFld_FFinServicio.setValue('-');


                    /* lmApp.txt_ItemsDev.setText('-'); */
            }
        },
        renderColItemDannados: function (value, meta, record) {
            return (value > 0) ? Ext.String.format("<a style='color:#0997D7; text-decoration:underline; Font-size:18px; font-weight:bold;' 'href='#' onclick='lmApp.AppRastreoEmbarque.preparaComandoDannado({1});'>{0}</a>", value, record.data.ClaveFolioViaje) : value;
        },
        renderColLlegaTarde: function (value, item, record) {
            return Ext.String.format('<span style="color:{0};">{1}</span>', (Ext.Date.diff(record.data.LlegadaEstimada, record.data.LlegadaReal, 'd') <= 0) ? "green" : "red", Ext.Date.format(value, 'd-M-Y H:i:s'));
        },
        reporteExcel01: function () {
            lmApp.Hidden1.setValue(Ext.encode(lmApp.z_GrdPnl_Tiempos.getRowsValues({ selectedOnly: false })));
            lmApp.Hidden2.setValue(Ext.encode(this.tools.paramsExcel()));
        },
        reporteExcel02: function (grid) {
            grid.submitData(false, { isUpload: true });
        },
        requires: [
          "Ext.ux.GMapPanel"
        ],
        salirRastreoMapa: function () {
        },
        singleton: true,
        mapa: {
            gestorMarcasMapa: function () {
                lmApp.AppRastreoEmbarque.gestorNavegacionTabuladores("TabUbicacion");
                lmApp.menuRastreo.items.items.forEach(function (element) {
                    try {
                        if (element.checked) {
                            switch (element.id) {
                                case 'z_Mnu_UltPos':
                                    lmApp.AppRastreoEmbarque.mapa.marcaPosicionUnidad(lmApp.AppRastreoEmbarque.getFVSeleccionado());
                                    break;
                                case 'z_Mnu_SecSis':
                                    var mrkSecSis = [];
                                    Ext.Array.each(lmApp.z_Store_TiempoEntrega.getRecordsValues(), function (item) {
                                        if (Ext.isNumber(item.Latitud) && Ext.isNumber(item.Longitud)) {
                                            Ext.Array.include(mrkSecSis,
                                            {
                                                lat: item.Latitud,
                                                lng: item.Longitud,
                                                infoWindow: item,
                                                iconPath: "../Imagenes/Secuencia2/" + (!Ext.isEmpty(item.LlegadaReal) ? 'Flag' : 'VD_') + item.Secuencia + '.png',
                                                iconTitle: item.NumeroConcesionario,
                                                clear: false,
                                                center: false,
                                                listener: null
                                            });
                                        }
                                    });
                                    lmApp.TabUbicacion.addMarkers(mrkSecSis);
                                    //lmApp.TabUbicacion.addPolyline(mrkSecSis, {
                                    //    strokeColor: "#237700",
                                    //    strokeOpacity: 0.5,
                                    //    strokeWeight: 6
                                    //});
                                    break;
                                case 'z_Mnu_SecReal':
                                    var mrkSecReal = [];
                                    var idx = 1;
                                    var ultOrdFld = lmApp.z_Store_TiempoEntrega.getSorters().items[0];
                                    lmApp.z_Store_TiempoEntrega.sort("LlegadaReal", "ASC");
                                    lmApp.z_Store_TiempoEntrega.each(function (item, index) {
                                        if (!Ext.isEmpty(item.data.LlegadaReal)) {
                                            Ext.Array.include(mrkSecReal,
                                            {
                                                lat: item.data.Latitud,
                                                lng: item.data.Longitud,
                                                infoWindow: item.data,
                                                iconPath: '../Imagenes/Secuencia2/AI_' + (idx) + '.png',
                                                iconTitle: item.data.NumeroConcesionario,
                                                clear: false,
                                                center: false,
                                                listener: null
                                            });
                                            idx++;
                                        }
                                    });
                                    lmApp.TabUbicacion.addMarkers(mrkSecReal);
                                    //lmApp.TabUbicacion.addPolyline(mrkSecReal, {
                                    //    strokeColor: "#000886",
                                    //    strokeOpacity: 0.5,
                                    //    strokeWeight: 6
                                    //});
                                    lmApp.z_Store_TiempoEntrega.clearFilter(true);
                                    lmApp.z_Store_TiempoEntrega.sort(ultOrdFld._id, ultOrdFld._direction);
                                    break;
                            }
                            lmApp.TabUbicacion.setZoom(7);
                        }
                    } catch (bsError) {
                        MensajeError('lmApp.AppRastreoEmbarque.map.gestorMarcasMapa', bsError, 0);
                    }
                });
            },
            marcaPosicionUltima: function (grid, command, record) {
                if (record.data.Longitud === 0 && record.data.Latitud === 0) {
                    command.hidden = true;
                    command.hideMode = 'visibility';
                }
            },
            marcaPosicionConcesionario: function (location) {
                try {
                    if (Ext.isNumber(location.Latitud) && Ext.isNumber(location.Longitud)) {
                        lmApp.TabUbicacion.addMarker(new google.maps.LatLng(location.Latitud, location.Longitud), {
                            lat: location.Latitud,
                            lng: location.Longitud,
                            infoWindow: new google.maps.InfoWindow({
                                content: lmApp.AppRastreoEmbarque.mapa.toolTipIndividual2(location)
                            })
                        }, '../Imagenes/Nissan1.png', location.NumeroConcesionario, false, true, null);
                        lmApp.TabUbicacion.setZoom(16);
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
                    MensajeError('lmApp.AppRastreoEmbarque.marcaPosicionConcesionario', bsError, 0);
                }
            },
            marcaPosicionUnidad: function (folioViaje) {
                try {
                    if (Ext.isNumber(folioViaje.Latitud) && Ext.isNumber(folioViaje.Longitud)) {
                        lmApp.TabUbicacion.addMarker(new google.maps.LatLng(folioViaje.Latitud, folioViaje.Longitud), {
                            lat: folioViaje.Latitud,
                            lng: folioViaje.Longitud,
                            infoWindow: new google.maps.InfoWindow({
                                content: lmApp.AppRastreoEmbarque.mapa.toolTipIndividual({
                                    NoEconomico: folioViaje.Unidad,
                                    Posicion: folioViaje.Localidad.replace('TUM', 'EDS'),
                                    Latitud: folioViaje.Latitud,
                                    Longitud: folioViaje.Longitud,
                                    Fecha: (!Ext.isEmpty(folioViaje.FechaPosicion) ? Ext.Date.format(new Date(folioViaje.FechaPosicion), 'd/M/Y H:i:s') : '-')
                                })
                            })
                        }, '../Imagenes/Secuencia2/Rabon.png', folioViaje.Unidad, false, true, null);
                        lmApp.TabUbicacion.setZoom(16);
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
                    MensajeError('lmApp.AppRastreoEmbarque.marcaPosicionUnidad', bsError, 0);
                }
            },
            selectorMarcasMapa: function (obj, checked) {
                var resultado = false;
                lmApp.menuRastreo.items.items.forEach(function (element) {
                    if (element.checked) {
                        resultado = true;
                    }
                    lmApp.z_btn_DetalleVerMapa.setDisabled(!resultado);
                });
            },
            toolTipIndividual: function (inputArray) {
                var html = "<table>";
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
        tools: {
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
            paramsExcel: function () {
                return [{
                    Param0: lmApp.lbl_NumeroViaje.getText(),
                    Param1: lmApp.lbl_NumeroUnidad.getText(),
                    Param2: lmApp.lbl_PlacaUnidad.getText(),
                    Param3: lmApp.lbl_NombreOperador.getText(),
                    Param4: lmApp.lbl_Ruta.getText(),
                    // Param5: lmApp.zTxtFld_FFinCarga.getValue(),
                    // Param6: lmApp.zTxtFld_FFinServicio.getValue(),
                    Param5: lmApp.txt_Arribos.getText(),
                    Param6: lmApp.txt_Items.getText(),
                    //Param9: lmApp.txt_TiempoRutaReal.getValue(),
                    Param7: lmApp.txt_TiempoRutaProgramado.value
                    // Param11: lmApp.Progress4.getText()
                }];
            },
            paramsCargarViajes: function () {
                return {
                    Param0: lmApp.txtfld_NumeroGuia.getValue(),
                    Param1: lmApp.txtFld_NumeroPlacas.getValue(),
                    Param2: lmApp.txt_CA_Viaje.getValue(),
                    Param3: lmApp.txt_CA_Unidad.getValue(),
                    Param4: lmApp.txt_CA_Concesionario.getValue(),
                    Param5: lmApp.txt_CA_NoOperador.getValue(),
                    Param6: Ext.isEmpty(lmApp.dtefld_CA_RangoInicial.getValue()) ? '' : lmApp.dtefld_CA_RangoInicial.getValue().toDateSQLRango('Inicio'),
                    Param7: Ext.isEmpty(lmApp.dtefld_CA_RangoFinal.getValue()) ? '' : lmApp.dtefld_CA_RangoFinal.getValue().toDateSQLRango('Fin')
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
                    lmApp.Button1.setText("Más Controles");
                    lmApp.Button1.setIconCls("fa-plus-circle");
                    panel.setHeight(44);
                } else {
                    lmApp.Button1.setText("Menos Controles");
                    lmApp.Button1.setIconCls("fa-minus-circle");
                    panel.setHeight(150);
                }
            }
        }
    });

//Ext.define('lmApp.LumaData',
//    {
//        config: {
//            esquema: 'dbo',
//            servidorBd: 'con02',
//            catalogo: 'PaqueTUM',
//            urlWs: ''
//        },
//        singleton: true,
//        getDmJsonResult: function (esquema, spNombre, jsonParams, fnCallBack) {
//            try {
//                Ext.net.DirectMethod.request("SpGetJsonResult", {
//                    success: function (msgJson) {
//                        var jsnResultado = Ext.decode(msgJson, true);
//                        if (Ext.typeOf(jsnResultado.Rows) !== "array") {
//                            fnCallBack(jsnResultado);
//                        } else {
//                            if (jsnResultado.Rows[0].CtlCve === "SQL_OK") {
//                            } else if (jsnResultado.Rows[0].CtlCve === "SQL_ERROR") {
//                                MensajeError(jsnResultado.Rows[0].CtlCve, jsnResultado.Rows[0].CtlObs, 1);
//                            } else if (jsnResultado.Rows[0].CtlCve === "SQL_VACIO") {
//                                MensajeError(spNombre, 'No existe información bajo los criterios seleccionados', 1);
//                            } else if (jsnResultado.Rows[0].CtlCve === "IIS_ERROR") {
//                                MensajeError(Procedimiento, jsnResultado.Rows[0].CtlCve, 1);
//                            } else {
//                                MensajeError(Procedimiento, 'Error de comunicación con el Servidor', 1);
//                            }
//                        }
//                    },
//                    failure: function (result) {
//                        MensajeError('Error de Comunicación con el Servidor', result, 0);
//                    },
//                    eventMask:
//                        {
//                            msg: 'Obteniendo datos...',
//                            showMask: true
//                        },
//                    params: {
//                        esquema: esquema,
//                        procedimiento: spNombre,
//                        jsonParams: jsonParams,
//                        servidorBd: 'con02',
//                        catalogo: 'PaqueTUM'
//                    },
//                    specifier: "static",
//                    url: "DWHRastreoEmbarques.aspx"
//                });
//            } catch (bsError) {
//                MensajeError(spNombre, bsError, 0);
//            }
//        }
//    });