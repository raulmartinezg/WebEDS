/**
 * @class App.AppRptSatisSrv
 * Está clase defina la funcinalidad del Módulo llamado:
 * Resultado de satisfacción en el Servicio (Encuestas)
 */
Ext.define("App.AppRptSatisSrv",
    {
        buildApp: function(id) {
            var me = this;
            return {
                closable: true,
                id: id,
                items: [
                    me.buildPanelNorte(),
                    {
                        xtype: "container",
                        layout: "border",
                        region: "center",
                        style: { borderColor: '#FF4800', borderStyle: 'solid', borderWidth: '1px' },
                        items: [
                            {
                                xtype: "container",
                                layout: "border",
                                region: "north",
                                height: 400,
                                style: { borderColor: '#FFAE00', borderStyle: 'solid', borderWidth: '1px' },
                                items: [
                                    {
                                        region: "center",
                                        columns: [
                                            {
                                                width: 50,
                                                dataIndex: "ClavePregunta",
                                                text: "No"
                                            },
                                            {
                                                flex: 1,
                                                dataIndex: "Pregunta",
                                                text: "Pregunta",
                                                summaryRenderer: function() {
                                                    return 'Porcentaje';
                                                }
                                            },
                                            {
                                                width: 90,
                                                dataIndex: "Excelente",
                                                text: "Excelente",
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return me.calculaPromedio(dataIndex,0);
                                                },
                                                xtype: 'numbercolumn',
                                                format: '0'
                                            },
                                            {
                                                width: 90,
                                                dataIndex: "Bueno",
                                                text: "Bueno",
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return me.calculaPromedio(dataIndex,0);
                                                },
                                                xtype: 'numbercolumn',
                                                format: '0'
                                            },
                                            {
                                                width: 90,
                                                dataIndex: "Regular",
                                                text: "Regular",
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return me.calculaPromedio(dataIndex,0);
                                                },
                                                xtype: 'numbercolumn',
                                                format: '0'
                                            },
                                            {
                                                width: 90,
                                                dataIndex: "Deficiente",
                                                text: "Deficiente",
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return me.calculaPromedio(dataIndex,0);
                                                },
                                                xtype: 'numbercolumn',
                                                format: '0'
                                            },
                                            {
                                                dataIndex: 'total',
                                                text: 'Total',
                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                    return me.calculaPromedio(dataIndex,0);
                                                },
                                                xtype: 'numbercolumn',
                                                format: '0',
                                                width: 90
                                            }
                                        ],
                                        margin: "3 3 3 3",
                                        features: [
                                            {
                                                ftype: 'summary',
                                                dock: 'bottom'
                                            }
                                        ],
                                        store: {
                                            fields: [
                                                'ClavePregunta', 'Pregunta',
                                                { name: 'Excelente', type: 'int' },
                                                { name: 'Bueno', type: 'int' },
                                                { name: 'Regular', type: 'int' },
                                                { name: 'Deficiente', type: 'int' },
                                                {
                                                    name: 'total',
                                                    type: 'int',
                                                    convert: function(val, row) {
                                                        return row.data.Excelente + row.data.Bueno + row.data.Regular + row.data.Deficiente;
                                                    }
                                                }
                                            ],
                                            proxy: {
                                                type: 'memory'
                                            }
                                        },
                                        xtype: "grid"
                                    },
                                    {
                                        // todo: construcción de gráfica 1
                                        xtype: 'polar',
                                        width: 400,
                                        region: "east",
                                        animate: true,
                                        interactions: ['rotate', 'itemhighlight'],
                                        gradients: [{
                                            id: 'pie-excelente',
                                            angle: -90,
                                            stops: {
                                                0: {
                                                    color: '#c6e232'
                                                },
                                                100: {
                                                    color: '#54a810'
                                                }
                                            }
                                        }, {
                                            id: 'pie-bueno',
                                            angle: -90,
                                            stops: {
                                                0: {
                                                    color: '#54a810'
                                                },
                                                100: {
                                                    color: '#FF0000'
                                                }
                                            }
                                        }, {
                                            id: 'pie-regular',
                                            angle: -90,
                                            stops: {
                                                0: {
                                                    color: '#0000CC'
                                                },
                                                100: {
                                                    color: '#00CC00'
                                                }
                                            }
                                        }, {
                                            id: 'pie-deficiente',
                                            angle: -90,
                                            stops: {
                                                0: {
                                                    color: '#660000'
                                                },
                                                100: {
                                                    color: '#990000'
                                                }
                                            }
                                        }],
                                        colors: ['url(#pie-excelente)', 'url(#pie-bueno)', 'url(#pie-regular)', 'url(#pie-deficiente)'],
                                        store: {
                                            fields: ['name', 'percent']
                                            /*data: [{
                                                "name": "Excelente",
                                                "percent": "60"
                                            }, {
                                                "name": "Bueno",
                                                "percent": "10"
                                            }, {
                                                "name": "Regular",
                                                "percent": "10"
                                            }, {
                                                "name": "Deficiente",
                                                "percent": "10"
                                            }]*/
                                        },
                                        legend: {
                                            toggleable: true,
                                            position: 'bottom'
                                        },
                                        series: [{
                                            type: 'pie',
                                            label: {
                                                field: 'name',
                                                display: 'rotate',
                                                fillStyle: '#fff',
                                                strokeStyle: '#fff'
                                            },
                                            style: {
                                                stroke: '#fff',
                                                lineWidth: 2
                                            },
                                            xField: 'percent',
                                            donut: 15,
                                            renderer: function (sprite, config) {
                                                return {
                                                    text: config.text + '%'
                                                };
                                            }
                                        }],
                                        listeners: {

                                        }
                                    }
                                ]
                            },
                            {
                                xtype: "container",
                                layout: "border",
                                region: "center",
                                style: { borderColor: '#00DE74', borderStyle: 'solid', borderWidth: '1px' },
                                items: [
                                    {
                                        region: "center",
                                        columns: [
                                            {
                                                hidden: false,
                                                width: 50,
                                                dataIndex: "ClavePregunta",
                                                text: "No"
                                            },
                                            {
                                                hidden: false,
                                                flex:1,
                                                dataIndex: "Pregunta",
                                                text: "Pregunta"

                                            },
                                            {
                                                hidden: false,
                                                width: 100,
                                                dataIndex: "SI",
                                                text: "SI",
                                                summaryRenderer: function (value, summaryData, dataIndex) {
                                                    return me.calculaPromedio(dataIndex, 1);
                                                },
                                                xtype: 'numbercolumn',
                                                format: '0'
                                            },
                                            {
                                                hidden: false,
                                                width: 100,
                                                dataIndex: "NO",
                                                text: "NO",
                                                summaryRenderer: function (value, summaryData, dataIndex) {
                                                    return me.calculaPromedio(dataIndex, 1);
                                                },
                                                xtype: 'numbercolumn',
                                                format: '0'

                                            },
                                            {
                                                dataIndex: 'total',
                                                text: 'Total',
                                                summaryRenderer: function (value, summaryData, dataIndex) {
                                                    return me.calculaPromedio(dataIndex, 1);
                                                },
                                                xtype: 'numbercolumn',
                                                format: '0',
                                                width: 90
                                            }
                                        ],
                                        margin: "3 3 3 3",
                                        features: [{
                                            ftype: 'summary',
                                                dock: 'bottom'
                                        }],
                                        store: {
                                            fields: ['ClavePregunta', 'Pregunta', 'SI', 'NO', {
                                                name: 'total',
                                                type: 'int',
                                                convert: function (val, row) {
                                                    return row.data.SI + row.data.NO ;
                                                }
                                            }]
                                        },
                                        xtype: "grid"
                                    },
                                    {
                                        // todo: construcción de gráfica 2
                                        xtype: 'polar',
                                        width: 500,
                                        region:"east",
                                        animate: true,
                                        interactions: ['rotate', 'itemhighlight'],
                                        gradients: [{
                                            id: 'pie-no',
                                            angle: -90,
                                            stops: {
                                                0: {
                                                    color: '#c6e232'
                                                },
                                                100: {
                                                    color: '#54a810'
                                                }
                                            }
                                        }, {
                                            id: 'pie-si',
                                            angle: -90,
                                            stops: {
                                                0: {
                                                    color: '#660000'
                                                },
                                                100: {
                                                    color: '#990000'
                                                }
                                            }
                                        }],
                                        colors: ['url(#pie-si)', 'url(#pie-no)'],
                                        store: {
                                            fields: ['name', 'percent']
                                            /*data: [{
                                                "name": "SI",
                                                "percent": "80"
                                            }, {
                                                "name": "NO",
                                                "percent": "20"
                                            }]*/
                                        },
                                        legend: {
                                            toggleable: true,
                                            position: 'bottom'
                                        },
                                        series: [{
                                            type: 'pie',
                                            label: {
                                                field: 'name',
                                                display: 'rotate',
                                                fillStyle: '#fff',
                                                strokeStyle: '#fff'
                                            },
                                            style: {
                                                stroke: '#fff',
                                                lineWidth: 2
                                            },
                                            xField: 'percent',
                                            donut: 15,
                                            renderer: function (sprite, config) {
                                                return {
                                                    text: config.text + '%'
                                                };
                                            }
                                        }],
                                        listeners: {

                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ],
                layout: "border",
                tabConfig: {
                    tooltip: 'AppRptSatisSrv'
                },
                title: 'Calidad Servicio',
                xtype: 'panel'
            }
        },
        buildPanelNorte: function() {
            var me = this;
            return {
                border: true,
                collapsible: true,
                padding: 4,
                items: [
                    
                        {
                            xtype: 'monthfield',
                            format: 'F, Y',
                            editable: false,
                            fieldLabel: "Mes",
                            value: me.getFechaActual(),
                            selectMonth: me.getFechaActual(),
                            submitFormat: "d/m/Y",
                            Width:260
                        },
                    , {
                        border: false,
                        height: 50,
                        margin: "0 0 0 15",
                        padding: "0 0 0 0",
                        xtype: "fieldset",
                        items: [
                            {
                                iconCls: "fa fa-search",
                                listeners: {
                                    click: {
                                        fn: function() {
                                            App.AppRptSatisSrv.cargaDatos();
                                        }
                                    }
                                },
                                text: "Buscar",
                                defaultAnchor: "100%",
                                xtype: "button"
                            }, {
                                "margins": "5 0 0 0",
                                iconCls: "fa fa-undo",
                                text: "Reestablecer",
                                listeners: {
                                    click: {
                                        fn: function() {
                                            App.AppRptSatisSrv.restablecer();
                                        }
                                    }
                                },
                                defaultAnchor: "100%",
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
                                        fn: function(item) {
                                            var a = App.AppRptSatisSrv.getGrid();
                                            var b = Ext.ComponentQuery.query('#zTabRptRptSatisfaccionServicio #zPanelGraficas')[0];
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
        calculaPromedio: function(field, idxStore) {
            var a = this.getGrids()[idxStore].getStore();
            var p = ((a.sum(field) / a.sum('total')) * 100).toFixed(2);
            return Ext.isNumeric(p) ? p.toString() + '%' : "-";
        },
        cargaDatos: function () {
            var me = this;
            try {
                var a = me.getCalendarios();
                var b = me.getGrids();
                var c = me.getGraficas();
                b[0].getStore().removeAll();
                b[1].getStore().removeAll();
                c[0].getStore().removeAll();
                c[1].getStore().removeAll();
                var fecSel = new Date(a[0].getValue().getUTCFullYear(), a[0].getValue().getMonth(), 1);
                var fecIni = Ext.Date.format(fecSel, "Y-m-d");
                var fecFin = Ext.Date.format(Ext.Date.add(fecSel, Ext.Date.MONTH, 1), 'Y-m-d');
                window.Datum.LumaData.getDmJsonResult("Default.Aspx", "Calidad", "dbo", "SPCALL_Calidad",
                    {inicio: fecIni,fin: fecFin}, function(resultado) {
                    b[0].getStore().loadData(resultado.table);
                    b[1].getStore().loadData(resultado.table1);
                    var st1 = b[0].getStore();
                    var st2 = b[1].getStore();
                    var x = [
                        { name: "Excelente", percent: ((st1.sum("Excelente") / st1.sum('total')) * 100).toFixed(2) },
                        { name: "Bueno", percent: ((st1.sum("Bueno") / st1.sum('total')) * 100).toFixed(2) },
                        { name: "Regular", percent: ((st1.sum("Regular") / st1.sum('total')) * 100).toFixed(2) },
                        { name: "Deficiente", percent: ((st1.sum("Deficiente") / st1.sum('total')) * 100).toFixed(2) }
                    ];
                    //debugger;
                    // todo: construye store para gráfica 2


                    // new Ext.XTemplate('[{Excelente:{res}]').apply({res: 10});
                    c[0].getStore().loadData(x);
                    var y = [
                        { name: "NO", percent: ((st2.sum("NO") / st2.sum('total')) * 100).toFixed(2) },
                        { name: "SI", percent: ((st2.sum("SI") / st2.sum('total')) * 100).toFixed(2) }
                    ];


                    c[1].getStore().loadData(y);
                    // c.setDisabled(false);
                    //d.setDisabled(false); 
                });
            } catch (bsError) {
                window.Datum.Tools.msgSistema('App.AppRptSatisSrv.cargaDatos', bsError, 0);
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
        constructor: function(config) {
            this.initConfig(config);
            return this;
        },
        getCalendarios: function() {
            return Ext.ComponentQuery.query('#zTabRptRptSatisfaccionServicio datefield');
        },
        getExcel: function() {
            return Ext.ComponentQuery.query('#zTabRptRptSatisfaccionServicio #zBtnExcel')[0];
        },
        getGraficas: function() {
            return Ext.ComponentQuery.query('#zTabRptRptSatisfaccionServicio polar');
        },
        getGrids: function() {
            return Ext.ComponentQuery.query('#zTabRptRptSatisfaccionServicio grid');
        },
        panelGraficas: {
            build: function() {
                var a = App.AppRptSatisSrv.panelGraficas;
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
                axes: function() {
                    return [
                        {
                            fields: ["Promedio"],
                            grid: true,
                            maximum: 100.0,
                            minimum: 50.0,
                            position: "left",
                            renderer: function(label, layout) {
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
                    var a = App.AppRptSatisSrv.panelGraficas.grafPromCarga;
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
                series: function() {
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
                                renderer: function(storeItem) {
                                    this.setHtml(storeItem.get('Mes') + ': ' + storeItem.get('Promedio') + '%');
                                }
                            },
                            xField: "Mes",
                            yField: "Promedio",
                            type: "line"
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
                            text: "Comparativo de Porcentaje de Carga por Mes"
                        }
                    ];
                },
                store: function() {
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
                axes: function() {
                    return [
                        {
                            fields: ["NumViajes"],
                            grid: true,
                            minimum: 0.0,
                            position: "left",
                            renderer: function(label) {
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
                build: function() {
                    var a = App.AppRptSatisSrv.panelGraficas.grafNumViajes;
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
                gradients: function() {
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
                series: function() {
                    return [
                        {
                            highlight: {
                                fillStyle: "yellow"
                            },
                            label: {
                                type: "text",
                                renderer: function() {
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
                                renderer: function(storeItem, item) {
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
                store: function() {
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
                                    name: "NumViajes",
                                    type: "int"
                                }, {
                                    name: "Rebotes",
                                    type: "int"
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
            }
        },
        restablecer: function() {
            var a = App.AppRptSatisSrv.getGrid();
            var c = App.AppRptSatisSrv.getExcel();
            a.getStore().removeAll();
            c.setDisabled(true);
        },
        setFechaHora: function () {
            var me = this;
            try {
                window.Datum.LumaData.getDmFechaHora("Default.Aspx", "SpGetFechaHora", function (resultado) {
                    var dt = (window.Ext.isEmpty(resultado)) ? new Date() : new Date(resultado);
                    me.setFechaActual(dt);
                    var a = window.App.AppRptSatisSrv.getCalendarios();
                    a[0].setValue(new Date(dt.getUTCFullYear(), dt.getMonth(), 1));
                    /* a[0].setMinValue(Ext.Date.add(new Date(dt.getUTCFullYear(), dt.getMonth(), 1), Ext.Date.MONTH, -3));
                    a[0].setMaxValue(a[1].getValue());*/
                });
            } catch (bsError) {
                window.Datum.Tools.msgSistema('App.AppRptSatisSrv.setFechaHora', bsError, 0);
            }
        },
        singleton: true
    }
);


/*   App.AppRptNivelServicio     */