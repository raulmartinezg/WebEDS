Ext.define("App.AppRptNivelServicio",
    {
        buildApp: function (id) {
            var me = this;
            return {
                closable: true,
                id: id,
                items: [
                    /*gráficas*/ 
                    App.AppRptNivelServicio.buildPanelA(),
                    /*VistaporRuta*/
                    App.AppRptNivelServicio.buildPanelB(),
                    /*General*/
                    App.AppRptNivelServicio.buildPanelC(),
                    me.buildPanelNorte()                    
                                   ],
                layout: "border",
                tabConfig: {
                    tooltip: 'AppRptNivelServicio'
                },
                title: 'Nivel Servicio',
                xtype: 'panel'
            }
        },
        buildPanelA: function () {
            return {
                xtype: "container",
                id: "containerGrid1",
                height: '100%',
                hidden: true,
                layout: "border",
                region: "center",
                style: { borderColor: '#FF4800', borderStyle: 'solid', borderWidth: '3px' },
                items: [
                    {
                        xtype: "container",
                        id: "zCont_RutaMensual2",
                        layout: "border",
                        region: "north",
                        height: '50%',
                        width: '100%',
                        style: { borderColor: '#217346', borderStyle: 'solid', borderWidth: '1px' },
                        items: [
                            App.AppRptNivelServicio.panelGraficas.build()
                        ]
                    },
                    {
                        xtype: "container",
                        id: "zCont_Dia",
                        layout: "border",
                        region: "center",
                        height: '50%',
                        width: '100%',
                        style: { borderColor: '#217346', borderStyle: 'solid', borderWidth: '1px' },
                        items: [
                            App.AppRptNivelServicio.panelGraficaDia.build()
                        ]
                    }
                ]
            }
        },
        buildPanelB: function () {
            return {
                xtype: "container",
                id: "containerGrid2",
                height: '100%',
                hidden: true,
                layout: "border",
                region: "center",
                style: { borderColor: '#FF4800', borderStyle: 'solid', borderWidth: '3px' },
                items: [
                    {
                        xtype: "container",
                        id: "zCont_RutaDiario",
                        layout: "border",                       
                        region: "west",
                        height: '100%',
                        width: '30%',
                        style: { borderColor: '#217346', borderStyle: 'solid', borderWidth: '1px' },
                        items: [
                            App.AppRptNivelServicio.gridRutaDiario.build()
                        ]
                    },
                    {
                        xtype: "container",
                        layout: "border",
                        region: "east",
                        height: '100%',
                        width: '70%',
                        style: { borderColor: '#217346', borderStyle: 'solid', borderWidth: '1px' },
                        items: [                           
                            App.AppRptNivelServicio.panelGraficaRutaDia.build()
                        ]

                    }

                ]
            }
        },
        buildPanelC: function () {
            return {  
                xtype: "container",    
                id: "containerGrid3",
                height: '100%',
                hidden: false,
                layout: "border",
                region: "center",
                style: { borderColor: '#FF4800', borderStyle: 'solid', borderWidth: '3px' },
                items: [
                    {
                        xtype: "container",
                        id: "zCont_RutaMensual", 
                        layout: "border",                       
                        region: "west",
                        height: '100%',
                        width: '40%',
                        style: { borderColor: '#217346', borderStyle: 'solid', borderWidth: '1px' },
                        items: [
                            App.AppRptNivelServicio.gridRutaMensual.build()                            
                        ]
                    }
                    ,
                    {
                        xtype: "container",
                        layout: "border",
                        region: "east",
                        height: '100%',
                        width: '60%',
                        style: { borderColor: '#217346', borderStyle: 'solid', borderWidth: '1px' },
                        items: [                            
                            App.AppRptNivelServicio.gridDiario.build(),
                            App.AppRptNivelServicio.gridMensual.build()
                        ]

                    }

                ]


            }
        },
        buildPanelNorte: function () {
            var me = this;
            return {                
                collapsible: false,
                padding: 1,
                items: [
                    {
                        xtype: 'monthfield',                       
                        format: 'F, Y',
                        editable: false,                        
                        margin: "8 8 5 5", 
                        value: me.getFechaActual(),
                        selectMonth: me.getFechaActual(),
                        submitFormat: "d/m/Y",                        
                        Width: 150
                    },
                    {
                        border: false,
                        height: 50,
                        margin: "8 8 0 5",                       
                        xtype: "fieldset",
                        items: [
                            {
                                iconCls: "fa fa-search",
                                height: 30,
                                width: 90,                              
                                listeners: {
                                    click: {
                                        fn: function () {
                                            App.AppRptNivelServicio.cargaDatos();
                                        }
                                    }
                                },
                                text: "Buscar",                                
                                xtype: "button"
                            }
                        ],
                        layout: "hbox",
                        width: 110
                    },
                    {
                        border: false,
                        height: 50,
                        margin: "8 8 0 5",
                        xtype: "fieldset",
                        items: [
                            {
                                iconCls: "fa fa-undo",
                                height: 30,
                                width: 105,                                
                                listeners: {
                                    click: {
                                        fn: function () {
                                            App.AppRptNivelServicio.restablecer();
                                        }
                                    }
                                },                               
                                text: "Reestablecer",
                                xtype: "button"
                            }
                        ],
                        layout: "hbox",
                        width: 125
                    },
                    {
                        border: false,
                        height: 50,
                        margin: "8 8 0 10",
                        padding: "0 0 0 0",
                        xtype: "fieldset",
                        defaultAnchor: "80%",
                        items: [
                            {
                                itemId: "zBtnGraficas",
                                disabled: true,
                                height: 40,
                                iconCls: "fa fa-bar-chart fa-2x yellowiconcolor",
                                listeners: {
                                    click: {
                                        fn: function (item) {                                  
                                            
                                            var a = LmApp.containerGrid1;     
                                            var b = LmApp.containerGrid2; 
                                            var c = LmApp.containerGrid3; 
                                            var j = me.getCombo();
                                            j[0].reset();
                                            if (!c.hidden) {                                              
                                                item.setIconCls("fa fa-table fa-2x orangeiconcolor");                                                                                               
                                                a.setHidden(false);  
                                                b.setHidden(true); 
                                                c.setHidden(true); 
                                            } else {
                                                item.setIconCls("fa fa-bar-chart fa-2x yellowiconcolor");                                                                                
                                                a.setHidden(true);  
                                                b.setHidden(true);       
                                                c.setHidden(false);       
                                                
                                            }
                                        }
                                    }
                                },
                                padding: 1,
                                scale: "large",
                                width: 40,
                                xtype: "button"
                            }
                        ],
                        layout: "vbox"
                    },
                    {
                        border: true,
                        height: 50,
                        margin: "8 8 0 8",
                        xtype: "fieldset",                       
                        items: [
                            {                             
                                itemId: "zCBRuta",
                                hidden: true,
                                height: 30,
                                width: 190,
                                xtype: 'combobox',
                                editable: false,
                                queryMode: 'local',
                                emptyText: 'Seleccione Ruta',
                                margins: "0 5 0 5",
                                forceSelection: true,
                                displayField: 'Ruta',
                                valueField: 'Clave',
                                store: {
                                    fields: ['Ruta', 'Clave'],
                                    data: [ ]
                                }                       
                            },
                            {
                                itemId: "zBtnRuta",
                                hidden: true,
                                iconCls: "fa fa-road",
                                height: 30,
                                width: 115,
                                margins: "0 5 0 0",                               
                                listeners: {
                                    click: {
                                        fn: function () {
                                            var j = me.getCombo();
                                            var rut = j[0].getValue();                                   
                                           
                                            if (Ext.isEmpty(rut)) { 
                                                Ext.Msg.show({
                                                    title: 'Mensaje del Sistema',
                                                    message: '<b>' + ' Seleccione Una Ruta' + '</b>'
                                                })
                                            } else { 
                                                //var name1 = j[0].getSelection().data.Ruta;
                                                App.AppRptNivelServicio.cargaDatosRuta();  
                                                  }
                                        }
                                    }
                                },          
                                    text: "Diario Ruta",
                                xtype: "button"
                            }
                        ],
                        layout: "hbox",
                        width: 500
                    },
               ],
                layout: "hbox",
                margin: "5 8 5 5",
                xtype: "fieldset",
                region: "north",
               // style: { borderColor: '#E6C950', borderStyle: 'solid', borderWidth: '3px' },
            }
        },
        cargaDatos: function () {
            var me = this;
            try {
                var a = me.getCalendarios();
                var b = LmApp.zGrdPnl_RutaMensual.getStore();
                var c = LmApp.zGrdPnl_Mensual.getStore();
                var d = window.Ext.ComponentQuery.query('#zTabRptNivelServicio #zBtnGraficas')[0];
                var e = LmApp.zGrdPnl_Diario.getStore();
                var f = window.Ext.ComponentQuery.query('#zTabRptNivelServicio #zGrafPromCarga')[0];  
                var g = window.Ext.ComponentQuery.query('#zTabRptNivelServicio #zgrafCargaDia')[0]; 
                var j = window.Ext.ComponentQuery.query('#zTabRptNivelServicio #zCBRuta')[0];
                var k = window.Ext.ComponentQuery.query('#zTabRptNivelServicio #zBtnRuta')[0];
                b.removeAll();
                var fecSel = new Date(a[0].getValue().getUTCFullYear(), a[0].getValue().getMonth(), 1);
                var fecIni = Ext.Date.format(fecSel, "Ymd");              
                window.Datum.LumaData.getDmJsonResult("Default.Aspx", "SpGetJsonResult", "DWH", "SPQRY_NivelServicio1",
                    { FechaInicial: fecIni, ClaveRuta: 0}, function (resultado) {  
                        b.loadData(resultado.Table);
                        c.loadData(resultado.Table3);
                        d.setDisabled(false);
                        e.loadData(resultado.Table1);
                        f.getStore().loadData(resultado.Table);
                        g.getStore().loadData(resultado.Table1);  
                        j.getStore().loadData(resultado.Table4);                        
                        j.setHidden(false);
                        k.setHidden(false); 
                    });
           } catch (bsError) {
                window.Datum.Tools.msgSistema('App.AppRptNivelServicio.cargaDatos', bsError, 0);
            }
        },
        cargaDatosDetalle: function (cvr) {
            var me = this;
            try {
               
               var a = me.getCalendarios();
               var b = LmApp.zGrdPnl_DetNivSer.getStore();
                b.removeAll();
                // var fecSel = new Date(a[0].getValue().getUTCFullYear(), a[0].getValue().getMonth(), 1);
               // var fecIni = Ext.Date.format(fecSel, "Ymd");
                window.Datum.LumaData.getDmJsonResult("Default.Aspx", "SpGetJsonResult", "DWH", "SPQRY_NivelServicioDet1",
                    { Ruta: cvr }, function (resultado) {
                        b.loadData(resultado.Table);
                        LmApp.zWinDetalle.show();

                        });
               
            } catch (bsError) {
                window.Datum.Tools.msgSistema('App.AppRptNivelServicio.cargaDatosDetalle', bsError, 0);
            }
        },
        cargaDatosRuta: function () {
            var me = this;
            try {
                var a = me.getCalendarios();
                var d = LmApp.containerGrid1;
                var b = LmApp.containerGrid2;
                 var c = LmApp.containerGrid3;
                var h = LmApp.zGrdPnl_RutaDiario.getStore();
                var i = window.Ext.ComponentQuery.query('#zTabRptNivelServicio #zGrafRutaDia')[0];
                var j = me.getCombo();
                h.removeAll();
                var fecSel = new Date(a[0].getValue().getUTCFullYear(), a[0].getValue().getMonth(), 1);
                var fecIni = Ext.Date.format(fecSel, "Ymd");               
                var rut = j[0].getValue();
                var name1 = j[0].getSelection().data.Ruta;
                window.Datum.LumaData.getDmJsonResult("Default.Aspx", "SpGetJsonResult", "DWH", "SPQRY_NivelServicio1",
                    { FechaInicial: fecIni, ClaveRuta: rut}, function (resultado) {
                        h.loadData(resultado.Table2);
                        i.getStore().loadData(resultado.Table2);
                        d.setHidden(true);                        
                        c.setHidden(true); 
                        b.setHidden(false);

                    });
            } catch (bsError) {
                window.Datum.Tools.msgSistema('App.AppRptNivelServicio.cargaDatosRuta', bsError, 0);
            }
        },
        config: {
            fechaActual: null
        },
        constructor: function (config) {
            this.initConfig(config);
            return this;
        },
        getCalendarios: function () {
            return Ext.ComponentQuery.query('#zTabRptNivelServicio datefield');
        },
        getCombo: function () {
            return Ext.ComponentQuery.query('#zTabRptNivelServicio combobox');
        },
        getGraficas: function () {
            return Ext.ComponentQuery.query('#zTabRptNivelServicio polar');
        },
        getGrids: function () {
            return Ext.ComponentQuery.query('#zTabRptNivelServicio grid');

        },
        gridDiario: {
            build: function () {
                return {
                    id: "zGrdPnl_Diario",
                    region: "west",
                    margin: "3 3 3 3",
                    height: '100%',
                    width: '50%',
                    columns: App.AppRptNivelServicio.gridDiario.columns(),
                    features: [{
                        ftype: 'summary',
                        dock: 'bottom'
                    }],
                    store: App.AppRptNivelServicio.gridDiario.store(),
                    title: 'Delivery Efficiency Daily  (30 mins)',
                    xtype: "grid"
                }
            },
            columns: function () {
                var b = [];
                Ext.Array.push(b, {
                    dataIndex: "ClaveNivelSerDiario",
                    text: " ",
                    hidden: true
                });
                Ext.Array.push(b, {
                    dataIndex: "Anio",
                    text: "Año",
                    hidden: true
                });
                Ext.Array.push(b, {
                    dataIndex: "Mes",
                    text: "Mes",
                    hidden: true
                });
                Ext.Array.push(b, {
                    dataIndex: "Dia",
                    text: "Dia",
                    width: 75,
                    summaryRenderer: function (v, params) {
                        return ((v === 0 || v > 1) ? '(' + v + ' Dias)' : '(1 Dia)');;
                    },
                    summaryType: "count",

                });
                Ext.Array.push(b, {
                    dataIndex: "Total",
                    text: "Total",
                    width: 60,
                    summaryType: "sum",
                    xtype: 'numbercolumn',
                    format: '0'
                });
                Ext.Array.push(b, {
                    dataIndex: "ATiempo",
                    text: "OnTime",
                    width: 75,
                    summaryType: "sum",
                    xtype: 'numbercolumn',
                    format: '0'
                });
                Ext.Array.push(b, {
                    dataIndex: "Tarde",
                    text: "Late",
                    width: 60,
                    summaryType: "sum",
                    xtype: 'numbercolumn',
                    format: '0'
                });
                Ext.Array.push(b, {
                    dataIndex: "SinDatos",
                    text: "Empty",
                    width: 66,
                    summaryType: "sum",
                    xtype: 'numbercolumn',
                    format: '0'
                });
                Ext.Array.push(b, {
                    dataIndex: "PorcATiempo",
                    text: "% OnTime",
                    width: 90,
                    renderer: function (value) {
                       //return Ext.String.format(value + " %");
                        return Ext.String.format('<span style="color:{0};">{1}</span>', (value > 96) ? "green" : "red", value + "%");
                    }
                });
                return b
            },
            store: function () {
                return {
                    autoLoad: true,
                    fields: [
                        'ClaveNivelSerDiario',
                        'Anio',
                        'Mes',
                        'Dia',
                        'Total',
                        'ATiempo',
                        'Tarde',
                        'SinDatos',
                        'PorcATiempo'
                    ],
                    proxy: {
                        type: 'memory'
                    }
                }
            }
        },
        gridMensual: {
            build: function () {
                return {
                    id: "zGrdPnl_Mensual",
                    region: "west",
                    margin: "3 3 3 3",
                    height: '100%',
                    width: '50%',
                    columns: App.AppRptNivelServicio.gridMensual.columns(),
                    features: [{
                        ftype: 'summary',
                        dock: 'bottom'
                    }],
                    store: App.AppRptNivelServicio.gridMensual.store(),
                    title: 'Delivery Efficiency Monthly  (30 mins)',
                    xtype: "grid"
                }
            },
            columns: function () {
                var b = [];
                Ext.Array.push(b, {
                    dataIndex: "ClaveNivelSerMensual",
                    text: " ",
                    hidden: true
                });
                Ext.Array.push(b, {
                    dataIndex: "Anio",
                    text: "Año",
                    hidden: true
                });
                Ext.Array.push(b, {
                    dataIndex: "Mes",
                    text: "Mes",
                    hidden: true
                });
                Ext.Array.push(b, {
                    dataIndex: "MesL",
                    text: "Mes",
                    width: 82,
                    summaryRenderer: function (v, params) {
                        return ((v === 0 || v > 1) ? '(' + v + ' Meses)' : '(1 Mes)');;
                    },
                    summaryType: "count",

                });
                Ext.Array.push(b, {
                    dataIndex: "Total",
                    text: "Total",
                    width: 60,
                    summaryType: "sum",
                    xtype: 'numbercolumn',
                    format: '0'
                });
                Ext.Array.push(b, {
                    dataIndex: "ATiempo",
                    text: "OnTime",
                    width: 75,
                    summaryType: "sum",
                    xtype: 'numbercolumn',
                    format: '0'
                });
                Ext.Array.push(b, {
                    dataIndex: "Tarde",
                    text: "Late",
                    width: 60,
                    summaryType: "sum",
                    xtype: 'numbercolumn',
                    format: '0'
                });
                Ext.Array.push(b, {
                    dataIndex: "SinDatos",
                    text: "Empty",
                    width: 66,
                    summaryType: "sum",
                    xtype: 'numbercolumn',
                    format: '0'
                });
                Ext.Array.push(b, {
                    dataIndex: "PorcATiempo",
                    text: "% OnTime",
                    width: 90,
                    renderer: function (value) {
                        return Ext.String.format(value + " %");
                        //return Ext.String.format('<span style="color:{0};">{1}</span>', (value > 80) ? "green" : "red", value + "%");
                    }
                });
                return b
            },
            store: function () {
                return {
                    autoLoad: true,
                    fields: [
                        'ClaveNivelSerMensual',
                        'Anio',
                        'Mes',
                        'MesL',
                        'Total',
                        'ATiempo',
                        'Tarde',
                        'SinDatos',
                        'PorcATiempo'
                    ],
                    proxy: {
                        type: 'memory'
                    }
                }
            }
        },
        gridRutaDiario: {
            build: function () {             

                return {
                   
                    id: "zGrdPnl_RutaDiario",
                    region: "center",
                    margin: "3 3 3 3",
                    columns: App.AppRptNivelServicio.gridRutaDiario.columns(),
                    features: [{
                        ftype: 'summary',
                        dock: 'bottom'
                    }],
                    store: App.AppRptNivelServicio.gridRutaDiario.store(),
                    title: 'Delivery Efficiency Route (30 mins)',
                    xtype: "grid"
                }
            },
            columns: function () {
                var b = [];
                Ext.Array.push(b, {
                    dataIndex: "ClaveNivelRutaDia",
                    text: " ",
                    hidden: true
                });
                Ext.Array.push(b, {
                    dataIndex: "Anio",
                    text: "Año",
                    hidden: true
                });
                Ext.Array.push(b, {
                    dataIndex: "Mes",
                    text: "Mes",
                    hidden: true
                });
                Ext.Array.push(b, {
                    dataIndex: "Dia",
                    text: "Day",
                    width: 46                   
                });
                Ext.Array.push(b, {
                    dataIndex: "Prefijo",
                    text: " ",
                    width: 50
                });
                Ext.Array.push(b, {
                    dataIndex: "Ruta",
                    text: "Route",
                    width: 194,
                    hidden: true
                    //,
                    //summaryRenderer: function (v, params) {
                    //    return ((v === 0 || v > 1) ? '(' + v + ' Rutas)' : '(1 Ruta)');;
                    //},
                    //summaryType: "count"
                });
                Ext.Array.push(b, {
                    dataIndex: "Total",
                    text: "Total",
                    width: 55,
                    summaryType: "sum",
                    xtype: 'numbercolumn',
                    format: '0'
                });
                Ext.Array.push(b, {
                    dataIndex: "ATiempo",
                    text: "OnTime",
                    width: 71,
                    summaryType: "sum",
                    xtype: 'numbercolumn',
                    format: '0'
                });
                Ext.Array.push(b, {
                    dataIndex: "Tarde",
                    text: "Late",
                    width: 50,
                    summaryType: "sum",
                    xtype: 'numbercolumn',
                    format: '0'
                });
                Ext.Array.push(b, {
                    dataIndex: "SinDatos",
                    text: "Empty",
                    width: 60,
                    summaryType: "sum",
                    xtype: 'numbercolumn',
                    format: '0'
                });
                Ext.Array.push(b, {
                    dataIndex: "PorcATiempo",
                    text: "% OnTime",
                    width: 86,
                    renderer: function (value) {
                        //return Ext.String.format(value + " %");
                        return Ext.String.format('<span style="color:{0};">{1}</span>', (value > 96) ? "green" : "red", value + "%");
                    }
                    //,
                    //summaryType: "average"
                });
                return b
            },
            store: function () {
                return {
                    autoLoad: true,
                    fields: [
                        'ClaveNivelRutaDia',
                        'Anio',
                        'Mes',
                        'Dia',
                        'Prefijo',
                        'Ruta',
                        'Total',
                        'ATiempo',
                        'Tarde',
                        'SinDatos',
                        'PorcATiempo'
                    ],
                    proxy: {
                        type: 'memory'
                    }
                }
            }
        },
        gridRutaMensual: {
            build: function () {
                return {
                    id: "zGrdPnl_RutaMensual",                    
                    region: "center",
                    margin: "3 3 3 3",
                    columns: App.AppRptNivelServicio.gridRutaMensual.columns(),                   
                    features: [{
                        ftype: 'summary',
                        dock: 'bottom'
                    }],
                    store: App.AppRptNivelServicio.gridRutaMensual.store(),
                    title: 'Delivery Efficiency Route  (30 mins)',
                    listeners: {
                        'cellclick': function (iView, iCellEl, iColIdx, iStore, iRowEl, iRowIdx, iEvent) {
                            iEvent.preventDefault();

                            if (LmApp.zHidden_Perfil.getValue() === 'NISSAN_AVANZADOS') {         
                            var zRec = iView.getRecord(iRowEl);
                            if (iColIdx === 7) {
                                var rt = zRec.data.Ruta;
                                var td = zRec.data.Tarde;
                                var cvr = zRec.data.ClaveNivelRutaMes;

                                if (td != 0) {
                                    window.App.AppRptNivelServicio.cargaDatosDetalle(cvr);

                                } else {

                                    // alert('No Existen Datos Para la Ruta:  ' + zRec.data.Ruta); 
                                    // Datum.Tools.msgSistema('No Existen Datos Para la Ruta:  ' + zRec.data.Ruta, zRec.data.Ruta, 0);

                                    Ext.net.Notification.show({
                                        iconCls: 'icon-exclamation',
                                        html: '</br><b>No Existen Datos</b>',
                                        title: 'Ruta: ' + zRec.data.Ruta,
                                        hideDelay: 3000,
                                        width: 400,
                                        height: 200
                                    });

                                }
                            }

                        }

                        }
                    },
                    xtype: "grid"
                }
            },
            columns: function () {
                var b = [];
                Ext.Array.push(b, {
                    dataIndex: "ClaveNivelRutaMes",
                    text: " ",
                    hidden: true
                });
                Ext.Array.push(b, {
                    dataIndex: "Anio",
                    text: "Año",
                    hidden: true
                });
                Ext.Array.push(b, {
                    dataIndex: "Mes",
                    text: "Mes",
                    hidden: true
                });
                Ext.Array.push(b, {
                    dataIndex: "Prefijo",
                    text: " ",
                    width: 57

                });
                Ext.Array.push(b, {
                    dataIndex: "Ruta",
                    text: "Route",
                    width: 197,
                    summaryRenderer: function (v, params) {
                        return ((v === 0 || v > 1) ? '(' + v + ' Rutas)' : '(1 Ruta)');
                    },
                    summaryType: "count"
                });
                Ext.Array.push(b, {
                    dataIndex: "Total",
                    text: "Total",                     
                    width: 60,
                    summaryType: "sum",
                    xtype: 'numbercolumn',
                    format: '0'
                });
                Ext.Array.push(b, {
                    dataIndex: "ATiempo",
                    text: "OnTime",
                    width: 75,
                    summaryType: "sum",
                    xtype: 'numbercolumn',
                    format: '0'
                });
                Ext.Array.push(b, {
                    dataIndex: "Tarde",
                    text: "Late",
                    width: 60,
                    summaryType: "sum",
                    xtype: 'numbercolumn',
                    format: '0',
                    renderer: function (value) {  
                        if (LmApp.zHidden_Perfil.getValue() === 'NISSAN_AVANZADOS') {
                            // alert('No Existen Datos Para NISSAN_AVANZADOS:  ');
                            return ((value > 0) ? '<a href="#' + value + '">' + value + '</a>' : value);
                        }
                        else {
                            return (value);

                        }                       
                       
                        //return '<a href="#' + value + '">' + value + '</a>'  ;
                    }
                });
                Ext.Array.push(b, {
                    dataIndex: "SinDatos",
                    text: "Empty",
                    width: 66,
                    summaryType: "sum",
                    xtype: 'numbercolumn',
                    format: '0'
                });
                Ext.Array.push(b, {
                    dataIndex: "PorcATiempo",
                    text: "% OnTime",
                    width: 90,
                    renderer: function (value) {
                        //return Ext.String.format(value + " %");
                        return Ext.String.format('<span style="color:{0};">{1}</span>', (value > 96) ? "green" : "red", value + "%");
                    }
                    //,
                    //summaryType: "average"
                });
                return b
            },
            store: function () {
                return {
                    autoLoad: true,
                    fields: [
                        'c',
                        'Anio',
                        'Mes',
                        'Prefijo',
                        'Ruta',
                        'Total',
                        'ATiempo',
                        'Tarde',
                        'SinDatos',
                        'PorcATiempo'
                    ],
				    	proxy: {
                        type: 'memory'
                    }
                }
            }
        },
        panelGraficaDia:
        {
            build: function () {
                var a = App.AppRptNivelServicio.panelGraficaDia;
                return {
                    itemId: "zPanelGraficaDia",
                    innerPadding: "10 10 10 10",
                    insetPadding: 10,
                    region: "center",                   
                    items: [
                        a.grafCargaDia.build()
                    ],
                    layout: "border"
                }
            },
            grafCargaDia: {
                axes: function () {
                    return [
                        {
                            fields: ["PorcATiempo", "Target"],
                            grid: true,
                            maximum: 105.0,
                            minimum: 45.0,
                            position: "left",
                            renderer: function (label, layout, lastLabel) {
                                return layout.renderer(label) + '%';
                            },
                            type: "numeric"
                        },

                        {
                            fields: ["Dia"],
                            grid: true,
                            label: {
                                type: "text",
                                rotationRads: Ext.draw.Draw.rad(-5),
                                fontSize: "15"
                            },
                            position: "bottom",
                            type: "category"
                        }                        
                    ];
                },
                build: function () {
                    var a = window.App.AppRptNivelServicio.panelGraficaDia.grafCargaDia;                   
                    return {
                        layout: "fit",
                        region: "center",
                        title: "Delivery Efficiency Daily (30 mins)",                       
                        items: [
                            {
                                itemId: "zgrafCargaDia",
                                animation: {
                                    duration: 500,
                                    easing: "easeOut"
                                },
                                axes: a.axes(),
                                innerPadding: "10 10 8 10",
                                insetPadding: 10,
                                interactions: [
                                    {
                                        type: "panzoom",
                                        zoomOnPanGesture: true
                                    }
                                ],
                                series: a.series(),
                                sprites: a.sprites(),
                                store: a.store(),
                                xtype: "cartesian"
                            }
                        ]
                    }
                },
                series: function () {
                    return [
                        {
                            highlight:
                            {
                                fillStyle: "#47819E",
                                lineWidth: 10.0,
                                strokeStyle: "#3CCBE5",
                                r: 4
                            },
                            label:
                            {
                                type: "text",
                                display: "over",
                                field: "PorcATiempo"
                            },
                            marker:
                            {
                                fillStyle: '#34716E',
                                lineWidth: 0.0,
                                strokeStyle: '#34716E',
                                strokeOpacity: .6,
                                r: 4
                            },
                            style:
                            {
                                stroke: '#34716E',
                                strokeOpacity: .6,
                                lineWidth: 4.0
                            },
                            tooltip: {
                                style: "background: #fff;",
                                dismissDelay: 0,
                                hideDelay: 0,
                                showDelay: 0,
                                trackMouse: true,
                                renderer: function (storeItem, item) {
                                    this.setHtml('Día  ' + storeItem.get('Dia') + ': ' + storeItem.get('PorcATiempo') + '%');
                                }
                            },
                            xField: "Dia",
                            yField: "PorcATiempo",                           
                            type: "line"
                        }, {
                            highlight:
                            {
                                scaling: 2
                            },
                            marker:
                            {
                                fillStyle: "#008000",
                                strokeStyle: "#008000",
                                strokeOpacity: .6,
                                type: 'triangle',
                                animation: {
                                    duration: 200,
                                    easing: 'backOut'
                                }
                            },
                            style:
                            {
                                //fill: '#96D4C6',
                                //fillOpacity: .6,
                                stroke: '#008000',
                                strokeOpacity: .6,
                                lineWidth: 2.0
                            },
                            tooltip:
                            {
                                style: "background: #fff;",
                                dismissDelay: 0,
                                hideDelay: 0,
                                showDelay: 0,
                                trackMouse: true,
                                renderer: function (storeItem, item) {
                                    this.setHtml('Target' + ': ' + storeItem.get('Target') + '%');
                                }
                            },
                            xField: "Dia",
                            yField: "Target",
                            type: "line"
                        }

                    ];
                },
                sprites: function () {
                    return [
                        {
                            type: "text",
                            height: 30,
                            width: 100,
                            x: 40,
                            y: 20,
                            fontSize: "22"

                        }
                    ];
                },
                store: function () {
                    return {
                        model: window.Ext.ClassManager.isCreated(window.Ext.id()) ? window.Ext.id() : window.Ext.define(window.Ext.id(), {
                            extend: "Ext.data.Model",
                            fields: [
                                {
                                    name: "ClaveNivelSerDiario"
                                }, {
                                    name: "Anio",
                                    type: "int"
                                }, {
                                    name: "Mes",
                                    type: "int"
                                }, {
                                    name: "Dia"
                                }, {
                                    name: "Total",
                                    type: "int"
                                }, {
                                    name: "ATiempo",
                                    type: "int"
                                }, {
                                    name: "Tarde",
                                    type: "int"
                                }, {
                                    name: "SinDatos",
                                    type: "int"
                                }, {
                                    name: "PorcATiempo",
                                    type: "int"
                                }, {
                                    name: "Target",
                                    type: "int"
                                }                                
                            ]
                        }),
                        autoLoad: true,
                        sorters: [
                            {
                                direction: "ASC",
                                property: "Dia"
                            }
                        ],
                        proxy: {
                            type: 'memory'
                        }
                    }
                }
            },

        },
        panelGraficas:
        {
            build: function () {
                var a = App.AppRptNivelServicio.panelGraficas;
                return {
                    itemId: "zPanelGraficas",
                    innerPadding: "10 10 10 10",
                    insetPadding: 10,
                    region: "center",                  
                    items: [
                        a.grafPromCarga.build()
                    ],
                    layout: "border"
                }
            },
            grafPromCarga: {
                axes: function () {
                    return [
                        {
                            fields: ["PorcATiempo","Target"],
                            grid: true,
                            maximum: 105.0,
                            minimum: 45.0,
                            position: "left",
                            renderer: function (label, layout, lastLabel) {
                                return layout.renderer(label) + '%';
                            },
                            type: "numeric"
                        }, {
                            fields: ["Prefijo"],
                            grid: true,
                            label: {
                                type: "text",                               
                                fontSize: "15"
                            },
                            position: "bottom",
                            type: "category"
                        }
                    ];
                },
                build: function () {
                    var a = window.App.AppRptNivelServicio.panelGraficas.grafPromCarga;
                    return {
                        layout: "fit",
                        region: "center",
                        title: "Delivery Efficiency Route (30 mins)",
                        items: [
                            {
                                itemId: "zGrafPromCarga",
                                animation: {
                                    duration: 500,
                                    easing: "easeOut"
                                },
                                axes: a.axes(),
                                innerPadding: "10 20 6 20",
                                insetPadding: 8,
                                interactions: [
                                    {
                                        type: "panzoom",
                                        zoomOnPanGesture: true
                                    }
                                ],
                                series: a.series(),
                                sprites: a.sprites(),
                                store: a.store(),
                                xtype: "cartesian"
                            }
                        ]
                    }
                },
                series: function () {
                    return [
                        {
                            highlight:
                            {
                                fillStyle: "#47819E",
                                lineWidth: 10.0,
                                strokeStyle: "#3CCBE5",
                                r: 4
                            },
                            label:
                            {
                                type: "text",
                                display: "over",
                                field: "PorcATiempo"
                            },
                            marker:
                            {
                                fillStyle: '#34716E',
                                lineWidth: 0.0,
                                strokeStyle: '#34716E',
                                strokeOpacity: .6,
                                r: 4
                            },
                            style:
                            {
                                stroke: '#34716E',
                                strokeOpacity: .6,
                                lineWidth: 4.0
                            },
                            tooltip:
                            {
                                style: "background: #fff;",
                                dismissDelay: 0,
                                hideDelay: 0,
                                showDelay: 0,
                                trackMouse: true,
                                renderer: function (storeItem, item) {
                                    this.setHtml(storeItem.get('Ruta') + ': ' + storeItem.get('PorcATiempo') + '%');
                                }
                            },
                            xField: "Prefijo",
                            yField: "PorcATiempo",
                            type: "line"
                        },{
                            highlight:
                            {
                                scaling: 2
                            },     
                            marker:
                            {
                                fillStyle: "#008000",
                                strokeStyle: "#008000",
                                strokeOpacity: .6,
                                type: 'triangle',
                                animation: {
                                    duration: 200,
                                    easing: 'backOut'
                                }
                            },
                            style:
                            {
                                //fill: '#96D4C6',
                                //fillOpacity: .6,
                                stroke: '#008000',
                                strokeOpacity: .6,
                                lineWidth: 2.0
                            },
                            tooltip:
                            {
                                style: "background: #fff;",
                                dismissDelay: 0,
                                hideDelay: 0,
                                showDelay: 0,
                                trackMouse: true,
                                renderer: function (storeItem, item) {
                                    this.setHtml('Target' + ': ' + storeItem.get('Target') + '%');
                                }
                            },
                            xField: "Prefijo",
                            yField: "Target",
                            type: "line"
                        }
                    ];
                },
                sprites: function () {
                    return [
                        {
                            type: "text",
                            height: 30,
                            width: 100,
                            x: 40,
                            y: 20,
                            fontSize: "22"
                        }
                    ];
                },
                store: function () {
                    return {
                        model: window.Ext.ClassManager.isCreated(window.Ext.id()) ? window.Ext.id() : window.Ext.define(window.Ext.id(), {
                            extend: "Ext.data.Model",
                            fields: [
                                {
                                    name: "ClaveNivelSerRutaMes"
                                }, {
                                    name: "Anio",
                                    type: "int"
                                }, {
                                    name: "Mes",
									 type: "int"
                                }, {
                                    name: "Prefijo"
                                },{
                                    name: "Ruta"
                                }, {
                                    name: "Total",
                                    type: "int"
                                }, {
                                    name: "ATiempo",
									 type: "int"
                                }, {
                                    name: "Tarde",
									 type: "int"
                                }, {
                                    name: "SinDatos",
									 type: "int"
                                }, {
                                    name: "PorcATiempo",
									 type: "int"
                                }, {
                                    name: "Target",
                                    type: "int"
                                } 
                            ]
                        }),
                        autoLoad: true,
                        sorters: [
                            {
                                direction: "ASC",
                                property: "Ruta"
                            }
                        ],
                        proxy: {
                            type: 'memory'
                        }
                    }
                }
            },
        },
        panelGraficaRutaDia:
        {
            build: function () {
                var a = App.AppRptNivelServicio.panelGraficaRutaDia;
                return {
                    itemId: "zPanelGraficaRutaDia",
                    innerPadding: "20 40 40 40",
                    insetPadding: 10,
                    region: "center",
                    items: [
                        a.grafRutaDia.build()
                    ],
                    layout: "border"
                }
            },
            grafRutaDia: {
                axes: function () {
                    return [
                        {
                            fields: ["PorcATiempo", "Target"],
                            grid: true,
                            maximum: 105.0,
                            minimum: 0.0,
                            position: "left",
                            renderer: function (label, layout, lastLabel) {
                                return layout.renderer(label) + '%';
                            },
                            type: "numeric"
                        }, {
                            fields: ["Dia"],
                            grid: true,
                            label: {
                                type: "text",
                                fontSize: "15"
                            },
                            position: "bottom",
                            type: "category"
                        }
                    ];
                },
                build: function () {
                    var a = window.App.AppRptNivelServicio.panelGraficaRutaDia.grafRutaDia;
                    return {
                        layout: "fit",
                        region: "center",
                        title: "Delivery Efficiency Route Day (30 mins)",
                        items: [
                            {
                                itemId: "zGrafRutaDia",
                                animation: {
                                    duration: 500,
                                    easing: "easeOut"
                                },
                                axes: a.axes(),
                                innerPadding: "5 15 4 9",
                                insetPadding: 8,
                                interactions: [
                                    {
                                        type: "panzoom",
                                        zoomOnPanGesture: true
                                    }
                                ],
                                series: a.series(),
                                sprites: a.sprites(),
                                store: a.store(),
                                xtype: "cartesian"
                            }
                        ]
                    }
                },
                series: function () {
                    return [
                        {
                            highlight:
                            {
                                fillStyle: "#47819E",
                                lineWidth: 10.0,
                                strokeStyle: "#3CCBE5",
                                r: 4
                            },
                            label:
                            {
                                type: "text",
                                display: "over",
                                field: "PorcATiempo"
                            },
                            marker:
                            {
                                fillStyle: '#34716E',
                                lineWidth: 0.0,
                                strokeStyle: '#34716E',
                                strokeOpacity: .6,
                                r: 4
                            },
                            style:
                            {
                                stroke: '#34716E',
                                strokeOpacity: .6,                               
                                lineWidth: 4.0
                            },
                            tooltip:
                            {
                                style: "background: #fff;",
                                dismissDelay: 0,
                                hideDelay: 0,
                                showDelay: 0,
                                trackMouse: true,
                                renderer: function (storeItem, item) {
                                    this.setHtml('Día  ' + storeItem.get('Dia') + ':  ' + storeItem.get('PorcATiempo') + '%');
                                }
                            },
                            xField: "Dia",
                            yField: "PorcATiempo",
                            type: "line"
                        },
                        {
                            highlight:
                            {
                               
                                scaling: 2
                            },
                            marker:
                            {
                                fillStyle: "#008000",                               
                                strokeStyle: "#008000",
                                strokeOpacity: .6,
                                type: 'triangle',
                                animation: {
                                    duration: 200,
                                    easing: 'backOut'
                                }
                            },
                            style:
                            {
                                //fill: '#96D4C6',
                                //fillOpacity: .6,
                                stroke: '#008000',
                                strokeOpacity: .6,
                                lineWidth: 2.0
                            },
                            tooltip:
                            {
                                style: "background: #fff;",
                                dismissDelay: 0,
                                hideDelay: 0,
                                showDelay: 0,
                                trackMouse: true,
                                renderer: function (storeItem, item) {
                                    this.setHtml('Target' + ': ' + storeItem.get('Target') + '%');
                                }
                            },
                            xField: "Dia",
                            yField: "Target",
                            type: "line"
                        }
                    ];
                },
                sprites: function () {
                    return [
                        {
                            type: "text",
                            height: 30,
                            width: 100,
                            x: 40,
                            y: 20,
                            fontSize: "16"
                        }
                    ];
                },
                store: function () {
                    return {
                        model: window.Ext.ClassManager.isCreated(window.Ext.id()) ? window.Ext.id() : window.Ext.define(window.Ext.id(), {
                            extend: "Ext.data.Model",
                            fields: [
                                {
                                    name: "ClaveNivelSerRutaDia"
                                }, {
                                    name: "Anio",
                                    type: "int"
                                }, {
                                    name: "Mes",
                                    type: "int"
                                }, {
                                    name: "Dia",
                                    type: "int"
                                }, {
                                    name: "Prefijo"
                                }, {
                                    name: "Ruta"
                                }, {
                                    name: "Total",
                                    type: "int"
                                }, {
                                    name: "ATiempo",
                                    type: "int"
                                }, {
                                    name: "Tarde",
                                    type: "int"
                                }, {
                                    name: "SinDatos",
                                    type: "int"
                                }, {
                                    name: "PorcATiempo",
                                    type: "int"
                                }, {
                                    name: "Target",
                                    type: "int"
                                }
                            ]
                        }),
                        autoLoad: true,
                        sorters: [
                            {
                                direction: "ASC",
                                property: "Dia"
                            }
                        ],
                        proxy: {
                            type: 'memory'
                        }
                    }
                }
            },
        },
        restablecer: function () {
            var f = window.Ext.ComponentQuery.query('#zTabRptNivelServicio #zGrafPromCarga')[0];  
            var g = window.Ext.ComponentQuery.query('#zTabRptNivelServicio #zgrafCargaDia')[0]; 
            var d = window.Ext.ComponentQuery.query('#zTabRptNivelServicio #zBtnGraficas')[0];
            var j = window.Ext.ComponentQuery.query('#zTabRptNivelServicio #zCBRuta')[0];
            var k = window.Ext.ComponentQuery.query('#zTabRptNivelServicio #zBtnRuta')[0];
            LmApp.zGrdPnl_RutaMensual.getStore().removeAll();
            LmApp.zGrdPnl_RutaDiario.getStore().removeAll();
            LmApp.zGrdPnl_Mensual.getStore().removeAll();
            LmApp.zGrdPnl_Diario.getStore().removeAll();
            f.getStore().removeAll();
            g.getStore().removeAll();
            var a = LmApp.containerGrid1;
            var b = LmApp.containerGrid2;   
            var c = LmApp.containerGrid3;                            
            c.setHidden(false);
            a.setHidden(true); 
            b.setHidden(true); 
            d.setDisabled(true);
            j.setHidden(true); 
            j.reset();
            k.setHidden(true); 

        },
        setFechaHora: function () {
            var me = this;
            try {
                window.Datum.LumaData.getDmFechaHora("Default.Aspx", "SpGetFechaHora", function (resultado) {
                    var dt = (window.Ext.isEmpty(resultado)) ? new Date() : new Date(resultado);
                    me.setFechaActual(dt);
                    var a = window.App.AppRptNivelServicio.getCalendarios();
                    a[0].setValue(new Date(dt.getUTCFullYear(), dt.getMonth(), 1));
                });
            } catch (bsError) {
                window.Datum.Tools.msgSistema('App.AppRptNivelServicio.setFechaHora', bsError, 0);
            }
        },
        /* singleton: true, */
        xtype: 'nivelservicio'
         });