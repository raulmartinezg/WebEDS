/**
 * @class App.AppRptMensualViajes
 * Está clase defina la funcinalidad del Módulo llamado:
 * Desempeño (1 Vista)
 */

Ext.define("App.AppRptMensualViajes",
    {
        buildApp: function (id) {
            var me = this;
            return {
                closable: true,
                id: id,
                items: [
                    me.buildPanelNorte(),
                    me.buildPanelCentro()
                ],
                layout: "border",
                tabConfig: {
                    tooltip: 'AppRptMensualViajes'
                },
                title: 'Desempeño (1 Vista)',
                xtype: 'panel'
            }
        },
        buildPanelNorte: function () {
            return {
                border: true,
                collapsible: true,
                padding: 4,
                items: [
                    {
                        border: false,
                        height: 50,
                        padding: "0 0 0 0",
                        xtype: "fieldset",
                        items: [
                            {
                                itemId: 'fechaInicial',
                                width: 240,
                                xtype: "datefield",
                                fieldLabel: "Fecha Inicial",
                                vtype: "daterange",
                                editable: false,
                                format: "d-F-Y",
                                submitFormat: "d/m/Y"
                            }, {
                                itemId: 'fechaFinal',
                                width: 240,
                                xtype: "datefield",
                                fieldLabel: "Fecha Final",
                                vtype: "daterange",
                                editable: false,
                                format: "d-F-Y",
                                submitFormat: "d/m/Y"
                            }
                        ]
                    }, {
                        border: false,
                        height: 50,
                        margin: "0 0 0 15",
                        padding: "0 0 0 0",
                        xtype: "fieldset",
                        /* defaultAnchor: "100%", */
                        items: [
                            {
                                iconCls: "fa fa-search",
                                listeners: {
                                    click: {
                                        fn: function () {
                                            App.AppRptMensualViajes.cargaDatos();
                                        }
                                    }
                                },
                                text: "Buscar",
                                /* width: 100, */
                                xtype: "button"
                            }, {
                                "margins": "5 0 0 0",
                                iconCls: "fa fa-undo",
                                text: "Reestablecer",
                                listeners: {
                                    click: {
                                        fn: function () {
                                            App.AppRptMensualViajes.restablecer();
                                        }
                                    }
                                },
                                /* width: 100, */
                                xtype: "button"
                            }
                        ],
                        layout: "vbox",
                        width: 150
                    }, {
                        border: false,
                        height: 50,
                        margin: "0 0 0 15",
                        padding: "0 0 0 0",
                        xtype: "fieldset",
                        defaultAnchor: "100%",
                        items: [
                            {
                                itemId: "zBtnGraficas",
                                disabled: true,
                                height: 48,
                                iconCls: "fa fa-bar-chart fa-2x yellowiconcolor",
                                listeners: {
                                    click: {
                                        fn: function (item) {
                                            var a = App.AppRptMensualViajes.getGrid();
                                            var b = Ext.ComponentQuery.query('#zTabRptViajesCarga1vista #zPanelGraficas')[0];
                                            if (!a.hidden) {
                                                item.setIconCls("fa fa-table fa-2x orangeiconcolor");
                                                a.hide();
                                                b.show();
                                            } else {
                                                item.setIconCls("fa fa-bar-chart fa-2x yellowiconcolor");
                                                b.hide();
                                                a.show();
                                            }
                                        }
                                    }
                                },
                                padding: 5,
                                scale: "large",
                                width: 48,
                                xtype: "button"
                            }
                        ],
                        layout: "vbox"
                    }
                ],
                layout: "hbox",
                margin: "0 5 5 5",
                xtype: "fieldset",
                region: "north"
            }
        },
        buildPanelCentro: function () {
            return {
                style: "background-color:#ED9200;",
                region: "center",
                items: [
                    App.AppRptMensualViajes.gridComparaRubrosMes.build(),
                    App.AppRptMensualViajes.panelGraficas.build()
                ],
                layout: "fit"
            }
        },
        cargaDatos: function () {
            try {
                var a = App.AppRptMensualViajes.getGrid();
                var b = App.AppRptMensualViajes.getCalendarios();
                var c = App.AppRptMensualViajes.getExcel();
                var d = Ext.ComponentQuery.query('#zTabRptViajesCarga1vista #zBtnGraficas')[0];
                var e = Ext.ComponentQuery.query('#zTabRptViajesCarga1vista #zGrafPromCarga')[0];
                var f = Ext.ComponentQuery.query('#zTabRptViajesCarga1vista #zGrafCompViaje')[0];
                a.getStore().removeAll();
                e.getStore().removeAll();
                f.getStore().removeAll();
                Datum.LumaData.getDmJsonResult("Default.Aspx", "MensualDeViaje", "dbo", "SPCALL_MensualDeViaje", {
                    inicio: Ext.isEmpty(b[0].getValue()) ? '' : Datum.Tools.toDateSQLRango(b[0].getValue(), "inicio"),
                    fin: Ext.isEmpty(b[1].getValue()) ? '' : Datum.Tools.toDateSQLRango(b[1].getValue(), "fin")
                }, function (resultado) {
                    a.getStore().loadData(resultado.table);
                    e.getStore().loadData(resultado.table1);
                    f.getStore().loadData(resultado.table2);
                    c.setDisabled(false);
                    d.setDisabled(false);
                });
            } catch (bsError) {
                Datum.Tools.msgSistema('App.AppRptMensualViajes.cargaDatos', bsError, 0);
            }
        },
        config: {
            fechaActual: null,
            mes: [
                ["Ene", "Enero"], ["Feb", "Febrero"], ["Mar", "Marzo"], ["Abr", "Abril"], ["May", "Mayo"], ["Jun", "Junio"],
                ["Jul", "Julio"], ["Ago", "Agosto"], ["Sep", "Septiembre"], ["Oct", "Octubre"], ["Nov", "Noviembre"], ["Dic", "Diciembre"]
            ],
            rubro: [
                ["Viajes", "Viajes"], ["Rebotes", "Rebotes"], ["PorcentajeCarga", "% Carga"]
            ],
            wColMes: 60,
            wColRuta: 250
        },
        constructor: function (config) {
            this.initConfig(config);
            return this;
        },
        getCalendarios: function () {
            return Ext.ComponentQuery.query('#zTabRptViajesCarga1vista datefield');
        },
        getExcel: function () {
            return Ext.ComponentQuery.query('#zTabRptViajesCarga1vista #zBtnExcel')[0];
        },
        getGrid: function () {
            return Ext.ComponentQuery.query('#zTabRptViajesCarga1vista #zGrid')[0];
        },
        panelGraficas: {
            build: function () {
                var a = App.AppRptMensualViajes.panelGraficas;
                return {
                    itemId: "zPanelGraficas",
                    innerPadding: "10 40 40 40",
                    insetPadding: 40,
                    hidden: true,
                    items: [
                        a.grafPromCarga.build(),
                        a.grafNumViajes.build()
                    ],
                    layout: "accordion"
                }
            },
            grafPromCarga: {
                axes: function () {
                    return [
                        {
                            fields: ["Promedio"],
                            grid: true,
                            maximum: 100.0,
                            minimum: 50.0,
                            position: "left",
                            renderer: function (label, layout) {
                                return layout.renderer(label) + '%';
                            },
                            type: "numeric"
                        }, {
                            fields: ["Mes"],
                            grid: true,
                            label: {
                                type: "text",
                                rotationRads: Ext.draw.Draw.rad(-45)
                            },
                            position: "bottom",
                            type: "category"
                        }
                    ];
                },
                build: function() {
                    var a = App.AppRptMensualViajes.panelGraficas.grafPromCarga;
                    return {
                        layout: "fit",
                        title: "Promedio de Carga",
                        items: [
                            {
                                itemId: "zGrafPromCarga",
                                animation: {
                                    duration: 500,
                                    easing: "easeOut"
                                },
                                axes: a.axes(),
                                innerPadding: "0 40 0 40",
                                insetPadding: 40,
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
                                renderer: function (storeItem) {
                                    this.setHtml(storeItem.get('Mes') + ': ' + storeItem.get('Promedio') + '%');
                                }
                            },
                            xField: "Mes",
                            yField: "Promedio",
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
                            fontSize: "22",
                            text: "Comparativo de Porcentaje de Carga por Mes"
                        }
                    ];
                },
                store: function () {
                    return {
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
                    }
                }
            },
            grafNumViajes: {
                axes: function () {
                    return [
                        {
                            fields: ["NumViajes"],
                            grid: true,
                            minimum: 0.0,
                            position: "left",
                            renderer: function (label) {
                                return label.toFixed(label < 10 ? 1 : 0);
                            },
                            type: "numeric"
                        }, {
                            fields: ["Mes"],
                            grid: true,
                            label: {
                                type: "text",
                                rotationRads: Ext.draw.Draw.rad(-45)
                            },
                            position: "bottom",
                            type: "category"
                        }
                    ];
                },
                build: function () {
                    var a = App.AppRptMensualViajes.panelGraficas.grafNumViajes;
                    return {
                        layout: "fit",
                        title: "Numero de Viajes",
                        items: [
                            {
                                itemId: "zGrafCompViaje",
                                xtype: "cartesian",
                                gradients: a.gradients(),
                                sprites: a.sprites(),
                                animation: {
                                    duration: 500,
                                    easing: "easeOut"
                                },
                                axes: a.axes(),
                                legend: {
                                    docked: "bottom"
                                },
                                series: a.series(),
                                store: a.store()
                            }
                        ]
                    }
                },
                gradients: function () {
                    return [
                        {
                            id: "v-1",
                            stops: [
                                {
                                    offset: 0.0,
                                    color: "rgb(212, 40, 40)"
                                }, {
                                    offset: 100.0,
                                    color: "rgb(137, 24, 24)"
                                }
                            ],
                            type: "linear"
                        }, {
                            id: "v-2",
                            stops: [
                                {
                                    offset: 0.0,
                                    color: "rgb(180, 216, 42)"
                                }, {
                                    offset: 100.0,
                                    color: "rgb(94, 114, 13)"
                                }
                            ],
                            type: "linear"
                        }, {
                            id: "v-3",
                            stops: [
                                {
                                    offset: 0.0,
                                    color: "rgb(43, 221, 115)"
                                }, {
                                    offset: 100.0,
                                    color: "rgb(14, 117, 56)"
                                }
                            ],
                            type: "linear"
                        }, {
                            id: "v-4",
                            stops: [
                                {
                                    offset: 0.0,
                                    color: "rgb(45, 117, 226)"
                                }, {
                                    offset: 100.0,
                                    color: "rgb(14, 56, 117)"
                                }
                            ],
                            type: "linear"
                        }, {
                            id: "v-5",
                            stops: [
                                {
                                    offset: 0.0,
                                    color: "rgb(187, 45, 222)"
                                }, {
                                    offset: 100.0,
                                    color: "rgb(85, 10, 103)"
                                }
                            ],
                            type: "linear"
                        }, {
                            id: "v-6",
                            stops: [
                                {
                                    offset: 0.0,
                                    color: "rgb(249, 249, 29)"
                                }, {
                                    offset: 100.0,
                                    color: "rgb(210, 210, 23)"
                                }
                            ],
                            type: "linear"
                        }, {
                            id: "v-7",
                            stops: [
                                {
                                    offset: 0.0,
                                    color: "rgb(255, 128, 0)"
                                }, {
                                    offset: 100.0,
                                    color: "rgb(203, 110, 20)"
                                }
                            ],
                            type: "linear"
                        }
                    ];
                },
                series: function () {
                    return [
                        {
                            highlight: {
                                fillStyle: "yellow"
                            },
                            label: {
                                type: "text",
                                renderer: function () {
                                    return storeItem.get(item.field);
                                }
                            },
                            /* renderer: App.AppMensualDeViajes.colorBarSeries,*/
                            style: {
                                opacity: 0.8
                            },
                            title: ["Viajes", "Rebotes"],
                            tooltip: {
                                style: "background: #fff;",
                                renderer: function (storeItem, item) {
                                    var browser = item.series.getTitle()[Ext.Array.indexOf(item.series.getYField(), item.field)];
                                    this.setHtml(browser + ' para ' + storeItem.get('Mes') + ': ' + storeItem.get(item.field));
                                }
                            },
                            xField: "Mes",
                            yField: ["NumViajes", "Rebotes"],
                            type: "bar"
                        }
                    ];
                },
                sprites: function() {
                    return [
                        {
                            type: "text",
                            height: 30,
                            width: 100,
                            x: 40,
                            y: 20,
                            fontSize: "22",
                            text: "Comparativo de Viajes Efectuados por Mes"
                        }
                    ];
                },
                store: function () {
                    return {
                        model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                            extend: "Ext.data.Model",
                            fields: [{
                                name: "Anio"
                            }, {
                                name: "MesNo",
                                type: "int"
                            }, {
                                name: "Mes"
                            }, {
                                name: "NumViajes",
                                type: "int"
                            }, {
                                name: "Rebotes",
                                type: "int"
                            }
                            ]
                        }),
                        autoLoad: true,
                        sorters: [{
                            direction: "ASC",
                            property: "MesNo"
                        }
                        ],
                        proxy: {
                            type: 'memory'
                        }
                    }
                }
            }
        },
        gridComparaRubrosMes: {
            build: function () {
                var a = App.AppRptMensualViajes.gridComparaRubrosMes;
                return {
                    itemId: "zGrid",
                    columns: a.columnsHeader(),
                    features: a.groupingSummary(),
                    minWidth: 700,
                    multiColumnSort: false,
                    store: a.store(),
                    tbar: a.tbar(),
                    xtype: "grid"
                }
            },
            columnsHeader: function () {
                var a = App.AppRptMensualViajes.getWColRuta();
                var c = App.AppRptMensualViajes.getWColMes();
                var b = [];
                Ext.Array.push(b, {
                    dataIndex: "Anio",
                    lockable: false,
                    locked: true,
                    text: "Año",
                    width: c
                });
                Ext.Array.push(b, {
                    dataIndex: "RutaClasificada",
                    lockable: false,
                    locked: true,
                    text: "Ruta Clasificada",
                    summaryRenderer: function (v) {
                        return ((v === 0 || v > 1) ? '(' + v + ' Rutas)' : '(1 Ruta)');
                    },
                    summaryType: "count",
                    width: a
                });
                Ext.Array.each(App.AppRptMensualViajes.getMes(), function (name1) {
                    Ext.Array.push(b, {
                        lockable: false,
                        columns: App.AppRptMensualViajes.gridComparaRubrosMes.columnSubHeader(name1),
                        text: name1[1]
                    });
                });
                return b;
            },
            columnSubHeader: function (name1) {
                var c = App.AppRptMensualViajes.getWColMes();
                var d = [];
                Ext.Array.each(App.AppRptMensualViajes.getRubro(), function (name2) {
                    Ext.Array.push(d, {
                        dataIndex: name2[0] + name1[0],
                        lockable: false,
                        renderer: function (value, metadata) {
                            if (metadata.column.dataIndex.substring(0, 10) === "Porcentaje") {
                                return value + " %";
                            } else {
                                return value;
                            }
                        },
                        summaryType: (name2[0] === "PorcentajeCarga") ? "average" : "sum",
                        summaryRenderer: (name2[0] === "PorcentajeCarga") ? function (v) {
                            return Ext.util.Format.number(v, '0') + '%';
                        } : function (v) { return Ext.util.Format.number(v, '0'); },
                        text: name2[1],
                        tooltip: name2[1],
                        width: c
                    });
                });
                return d;
            },
            exportaExcel: function () {
                var c = App.AppRptMensualViajes.getGrid();
                var a = Ext.JSON.encode({
                    records: {
                        record: c.getRowsValues({ selectedOnly: false })
                    }
                });
                var b = Ext.JSON.encode({ params: { param: { parametro1: "" } } });
                Datum.AppExportaExcel.creaDocExcel('./Aspx/Rpt_Excel.aspx', '../xslt/DWHMensualDeViajes.xslt', 'Desempenno_1_Vista', a, b);
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
            modelGrids: function () {
                var b = [];
                Ext.Array.push(b, {
                    name: "Anio",
                    type: "int"
                });
                Ext.Array.push(b, {
                    name: "RutaClasificada",
                    type: "string"
                });
                Ext.Array.each(App.AppRptMensualViajes.getMes(), function (name1) {
                    Ext.Array.each(App.AppRptMensualViajes.getRubro(), function (name2) {
                        Ext.Array.push(b, {
                            name: name2[0] + name1[0],
                            type: "int"
                        });
                    });
                });
                return Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                    extend: "Ext.data.Model",
                    fields: b
                });
            },
            store: function () {
                return {
                    model: App.AppRptMensualViajes.gridComparaRubrosMes.modelGrids(),
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
            },
            tbar: function () {
                return {
                    xtype: "toolbar",
                    items: [
                        {
                            xtype: "netlabel",
                            text: "Comparación de Rubros de Viaje"
                        }, {
                            xtype: "tbfill"
                        }, {
                            itemId: "zBtnExcel",
                            disabled: true,
                            handler: function () {
                                App.AppRptMensualViajes.gridComparaRubrosMes.exportaExcel();
                            },
                            iconCls: "fa fa-file-excel-o",
                            text: "Excel"
                        }, {
                            handler: function () {
                                var a = App.AppRptMensualViajes.getGrid();
                                Datum.Tools.redimAnchoColGrid(a[0]);
                            },
                            iconCls: "#ArrowEw",
                            text: "Ajustar"
                        }
                    ]
                };
            }
        },
        restablecer: function () {
            var a = App.AppRptMensualViajes.getGrid();
            var c = App.AppRptMensualViajes.getExcel();
            a.getStore().removeAll();
            c.setDisabled(true);
        },
        setFechaHora: function () {
            Datum.LumaData.getDmFechaHora("Default.Aspx", "SpGetFechaHora", function (resultado) {
                var dt = new Date(resultado);
                App.AppRptMensualViajes.setFechaActual(dt);
                var a = App.AppRptMensualViajes.getCalendarios();
                a[0].setValue(new Date(dt.getUTCFullYear(), 0, 1));
                a[1].setValue(dt);
                a[0].endDateField = a[1].getId();
                a[1].startDateField = a[0].getId();
                a[0].setMinValue(a[0].getValue());
                a[0].setMaxValue(a[1].getValue());
                a[1].setMinValue(a[0].getValue());
                a[1].setMaxValue(dt);
            });
        },
        singleton: true
    }
);