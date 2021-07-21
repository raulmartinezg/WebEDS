Ext.define("App.AppRptViajesCarga",
    {
        buildApp: function (id) {
            var a = {};
            try {
                a = {
                    xtype: 'panel',
                    layout: 'border',
                    id: id,
                    title: 'Desempeño (3 Vistas)',
                    closable: true,
                    items: [
                        App.AppRptViajesCarga.buildPanelNorte(), App.AppRptViajesCarga.buildPanelCentro()
                    ]
                }
            } catch (bsError) {
                Datum.Tools.msgSistema('App.AppRptDiarioViajes.buildApp', bsError, 0);
            }
            return a;
        },
        buildPanelNorte: function () {
            return {
                border: true,
                margin: "0 5 5 5",
                padding: 4,
                xtype: "fieldset",
                region: "north",
                items: [
                    {
                        border: false,
                        height: 50,
                        padding: "0 0 0 0",
                        xtype: "fieldset",
                        items: [
                            {
                                id: "z_dtnInicial",
                                "endDateField": "z_dtnFinal",
                                width: 240,
                                xtype: "datefield",
                                fieldLabel: "Fecha Inicial",
                                vtype: "daterange",
                                enableKeyEvents: true,
                                format: "d-F-Y",
                                submitFormat: "d/m/Y"
                                /*listeners: {
                                    keyup: {
                                        fn: onKeyUp
                                    }
                                }*/
                            }, {
                                id: "z_dtnFinal",
                                "startDateField": "z_dtnInicial",
                                width: 240,
                                xtype: "datefield",
                                fieldLabel: "Fecha Final",
                                /* value: new Date(dt.getUTCFullYear(), 5, 7, 9, 56, 20, 605), */
                                vtype: "daterange",
                                enableKeyEvents: true,
                                format: "d-F-Y",
                                submitFormat: "d/m/Y"
                                /*listeners: {
                                    keyup: {
                                        fn: onKeyUp
                                    }
                                }*/
                            }
                        ]
                    }, {
                        border: false,
                        height: 50,
                        margin: "0 0 0 15",
                        padding: "0 0 0 0",
                        xtype: "fieldset",
                        defaultAnchor: "100%",
                        items: [
                            {
                                width: 100,
                                xtype: "button",
                                iconAlign: "right",
                                iconCls: "fa fa-search",
                                text: "Buscar",
                                listeners: {
                                    click: {
                                        fn: function (item, e) {
                                            App.AppRptViajesCarga.cargaDatos();
                                        }
                                    }
                                }
                            }, {
                                "margins": "5 0 0 0",
                                width: 100,
                                xtype: "button",
                                iconCls: "fa fa-undo",
                                text: "Reestablecer",
                                listeners: {
                                    click: {
                                        fn: function (item, e) {
                                            App.AppRptViajesCarga.restablecer();
                                        }
                                    }
                                }
                            }
                        ],
                        layout: "vbox"
                    },
                    {
                        border: false,
                        height: 50,
                        margin: "0 0 0 15",
                        padding: "0 0 0 0",
                        xtype: "fieldset",
                        defaultAnchor: "100%",
                        items: [
                            {
                                id: 'zBtn_VcExportar',
                                disabled: true,
                                width: 100,
                                xtype: "button",
                                iconAlign: "right",
                                iconCls: "fa fa-file-excel-o",
                                text: "Exportar",
                                listeners: {
                                    click: {
                                        fn: function(item, e) {
                                            var a = Ext.JSON.encode({
                                                records: {
                                                    record: LmApp.zGrdPnl_PorcCarga.getRowsValues({ selectedOnly: false }),
                                                    record1: LmApp.zGrdPnl_PorViaje.getRowsValues({ selectedOnly: false }),
                                                    record2: LmApp.zGrdPnl_PorRebote.getRowsValues({ selectedOnly: false })
                                                }
                                            });
                                            var b = Ext.JSON.encode({ params: { param: { parametro1: "" } } });
                                            Datum.AppExportaExcel.creaDocExcel('./Aspx/Rpt_Excel.aspx', '../xslt/3VistasDes.xslt', '3VistasDes', a, b);
                                        }
                                    }
                                }
                            }
                        ],
                        layout: "vbox"
                    }
                ],
                layout: "hbox",
                collapsible: true
            }
        },
        buildPanelCentro: function () {
            return {
                style: "background-color:#ED9200;",
                region: "center",
                items: [
                    App.AppRptViajesCarga.GridPorcentajeCarga.build(),
                    App.AppRptViajesCarga.GridNumeroViajes.build(),
                    App.AppRptViajesCarga.GridNumeroRebotes.build()
                ],
                layout: "accordion"
            }
        },
        buildGraficos: function() {
            return {
                anchor: "50%",
                items: [
                    {
                        id: "zCartChart_PorcCarga",
                        xtype: "cartesian",
                        title: "En Construcción",
                        sprites: [
                            {
                                type: "text",
                                height: 30,
                                width: 100,
                                x: 40,
                                y: 20,
                                fontSize: "22",
                                text: "Comparativo de Porcentaje de Carga por Mes"
                            }
                        ],
                        animation: {
                            duration: 500,
                            easing: "easeOut"
                        },
                        axes: [
                            {
                                fields: ["Promedio"],
                                grid: true,
                                maximum: 100.0,
                                minimum: 50.0,
                                position: "left",
                                renderer: function (label, layout, lastLabel) {
                                    return layout.renderer(label) + '%';
                                },
                                type: "numeric"
                            }, {
                                fields: ["Mes"],
                                grid: true,
                                label: {
                                    type: "text",
                                    /* rotationRads: Ext.draw.Draw.rad(-45) */
                                },
                                position: "bottom",
                                type: "category"
                            }
                        ],
                        insetPadding: 40,
                        interactions: [
                            {
                                type: "panzoom",
                                zoomOnPanGesture: true
                            }
                        ],
                        series: [
                            {
                                highlight: {
                                    fillStyle: "#000",
                                    lineWidth: 2.0,
                                    strokeStyle: "#fff",
                                    r: 5
                                },
                                label: {
                                    type: "text",
                                    display: "over",
                                    field: "Promedio"
                                },
                                marker: {
                                    fillStyle: "#38B8BF",
                                    lineWidth: 0.0,
                                    strokeStyle: "#38B8BF",
                                    r: 5
                                },
                                style: {
                                    lineWidth: 4.0
                                },
                                tooltip: {
                                    style: "background: #fff;",
                                    dismissDelay: 0,
                                    hideDelay: 0,
                                    showDelay: 0,
                                    trackMouse: true,
                                    renderer: function (storeItem, item) {
                                        this.setHtml(storeItem.get('Mes') + ': ' + storeItem.get('Promedio') + '%');
                                    }
                                },
                                xField: "Mes",
                                yField: "Promedio",
                                type: "line"
                            }
                        ],
                        store: {
                            model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                extend: "Ext.data.Model",
                                fields: [
                                    {
                                        name: "Anio"
                                    }, {
                                        name: "MesNo",
                                        type: "int"
                                    }, {
                                        name: "Mes"
                                    }, {
                                        name: "Promedio"
                                    }
                                ]
                            }),
                            autoLoad: true,
                            sorters: [
                                {
                                    direction: "ASC",
                                    property: "MesNo"
                                }
                            ],
                            proxy: {
                                type: 'memory'
                            }
                        },
                        innerPadding: "0 40 0 40"
                    }
                ],
                layout: "fit"
            }
        },
        cargaDatos: function() {
            try {
                var a = LmApp.zGrdPnl_PorcCarga.getStore();
                var b = LmApp.zGrdPnl_PorViaje.getStore();
                var c = LmApp.zGrdPnl_PorRebote.getStore();
                a.removeAll();
                b.removeAll();
                c.removeAll();
                Datum.LumaData.getDmJsonResult("Default.Aspx", "MensualCVR", "dbo", "SPCALL_MensualCVR", {
                    inicio: Ext.isEmpty(LmApp.z_dtnInicial.getValue()) ? '' : Datum.Tools.toDateSQLRango(LmApp.z_dtnInicial.getValue(), "inicio"),
                    fin: Ext.isEmpty(LmApp.z_dtnFinal.getValue()) ? '' : Datum.Tools.toDateSQLRango(LmApp.z_dtnFinal.getValue(), "fin")
                }, function(resultado) {
                    a.loadData(resultado.table);
                    b.loadData(resultado.table1);
                    c.loadData(resultado.table2);
                    LmApp.zBtn_VcExportar.setDisabled(false);
                });
            } catch (bsError) {
                Datum.Tools.msgSistema('App.AppRptDiarioViajes.cargaDatos', bsError, 0);
            }
        },
        config: {
            fechaActual: null,
            mes: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            wColMes: 60,
            wColRuta: 250
        },
        constructor: function (config) {
            this.initConfig(config);
            /* Datum.LumaData.getDmFechaHora("Default.Aspx", "SpGetFechaHora", function (resultado) {
                App.AppRptDiarioViajes.setFechaActual(resultado);
            });*/

            return this;
        },
        GridPorcentajeCarga: {
            build: function () {
                return {
                    id: "zGrdPnl_PorcCarga",
                    columns: App.AppRptViajesCarga.GridPorcentajeCarga.columns(),
                    features: App.AppRptViajesCarga.GridPorcentajeCarga.groupingSummary(),
                    minWidth: 700,
                    multiColumnSort: false,
                    store: App.AppRptViajesCarga.GridPorcentajeCarga.store(),
                    title: "Promedio de Carga en Viajes",
                    xtype: "grid"
                }
            },
            columns: function () {
                var a = App.AppRptViajesCarga.getWColRuta();
                var c = App.AppRptViajesCarga.getWColMes();
                var b = [];
                Ext.Array.push(b, {
                    dataIndex: "Anio",
                    text: "Año",
                    width: c
                });
                Ext.Array.push(b, {
                    dataIndex: "Id",
                    text: "Ruta Clasificada",
                    summaryRenderer: function (v, params) {
                        return ((v === 0 || v > 1) ? '(' + v + ' Rutas)' : '(1 Ruta)');;
                    },
                    summaryType: "count",
                    width: a
                });
                Ext.Array.each(App.AppRptViajesCarga.getMes(), function (name, index, allitems) {
                    Ext.Array.push(b, {
                        dataIndex: name,
                        renderer: function (value) {
                            return value + ' %';
                        },
                        summaryType: "average",
                        summaryRenderer: function (v, params) {
                            return Ext.util.Format.number(v, '0') + '%';
                        },
                        text: name,
                        width: c
                    });
                });
                return b;
            },
            groupingSummary: function () {
                return [
                    Ext.create("Ext.grid.feature.GroupingSummary", {
                        ftype: "groupingsummary",
                        enableGroupingMenu: false,
                        groupHeaderTpl: "{name}",
                        hideGroupedHeader: true
                    })
                ];
            },
            store: function () {
                return {
                    model: App.AppRptViajesCarga.modelGrids("EDS.model.PorcentajeCarga"),
                    autoLoad: true,
                    groupField: "Anio",
                    sorters: [
                        {
                            direction: "ASC",
                            property: "Anio"
                        }, {
                            direction: "ASC",
                            property: "RutaClasificada"
                        }
                    ],
                    proxy: {
                        type: 'memory'
                    }
                }
            }
        },
        GridNumeroViajes: {
            build: function () {
                return {
                    id: "zGrdPnl_PorViaje",
                    columns: App.AppRptViajesCarga.GridNumeroViajes.columns(),
                    features: App.AppRptViajesCarga.GridPorcentajeCarga.groupingSummary(),
                    multiColumnSort: false,
                    store: App.AppRptViajesCarga.GridNumeroViajes.store(),
                    title: "Número de Viajes",
                    xtype: "grid"
                }
            },
            columns: function () {
                var a = App.AppRptViajesCarga.getWColRuta();
                var c = App.AppRptViajesCarga.getWColMes();
                var b = [];
                Ext.Array.push(b, {
                    width: c,
                    dataIndex: "Anio",
                    text: "Año"
                });
                Ext.Array.push(b, {
                    width: a,
                    dataIndex: "Id",
                    text: "Ruta Clasificada"
                });
                Ext.Array.each(App.AppRptViajesCarga.getMes(), function (name, index, allitems) {
                    Ext.Array.push(b, {
                        width: c,
                        dataIndex: name,
                        summaryType: "sum",
                        text: name
                    });
                });
                return b;
            },
            store: function () {
                return {
                    model: App.AppRptViajesCarga.modelGrids("EDS.model.NumeroViajes"),
                    autoLoad: true,
                    groupField: "Anio",
                    sorters: [
                        {
                            direction: "ASC",
                            property: "Anio"
                        }, {
                            direction: "ASC",
                            property: "RutaClasificada"
                        }
                    ],
                    proxy: {
                        type: 'memory'
                    }
                }
            }
        },
        GridNumeroRebotes: {
            build: function () {
                return {
                    id: "zGrdPnl_PorRebote",
                    columns: App.AppRptViajesCarga.GridNumeroViajes.columns(),
                    minWidth: 700,
                    multiColumnSort: false,
                    features: App.AppRptViajesCarga.GridPorcentajeCarga.groupingSummary(),
                    store: App.AppRptViajesCarga.GridNumeroRebotes.store(),
                    title: "Número de Rebotes",
                    xtype: "grid"
                }
            },
            store: function () {
                return {
                    model: App.AppRptViajesCarga.modelGrids("EDS.model.NumeroRebotes"),
                    autoLoad: true,
                    groupField: "Anio",
                    sorters: [
                        {
                            direction: "ASC",
                            property: "Anio"
                        }, {
                            direction: "ASC",
                            property: "RutaClasificada"
                        }
                    ],
                    proxy: {
                        type: 'memory'
                    }
                }
            }
        },
        modelGrids: function (a) {
            var b = [];
            Ext.Array.push(b, {
                name: "Anio",
                type: "int"
            });
            Ext.Array.push(b, {
                name: "RutaClasificada",
                type: "string"
            });
            Ext.Array.each(App.AppRptViajesCarga.getMes(), function (name, index, allitems) {
                Ext.Array.push(b, {
                    name: name,
                    type: "int"
                });
            });
            return Ext.define(a, {
                extend: "Ext.data.Model",
                fields: b
            });
        },
        restablecer: function () {
            /*App.AppRptDiarioViajes.setFechaHora();*/
            LmApp.zBtn_VcExportar.setDisabled(true);
            LmApp.zGrdPnl_PorcCarga.getStore().removeAll();
            LmApp.zGrdPnl_PorViaje.getStore().removeAll();
            LmApp.zGrdPnl_PorRebote.getStore().removeAll();
        },
        setFechaHora: function () {
            Datum.LumaData.getDmFechaHora("Default.Aspx", "SpGetFechaHora", function (resultado) {
                var dt = new Date(resultado);
                var a = LmApp.z_dtnInicial;
                var b = LmApp.z_dtnFinal;

                b.setValue(dt);
                b.setMaxValue(dt);
                a.setValue(new Date(dt.getUTCFullYear(), 0, 1));
                a.setMinValue(a.getValue());
                b.setMinValue(a.getValue());
                App.AppRptDiarioViajes.setFechaActual(dt);
            });
        },
        singleton: true
    }
);