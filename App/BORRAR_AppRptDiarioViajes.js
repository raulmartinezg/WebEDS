/**
 * @class App.AppRptDiarioViajes
 * Está clase defina la funcinalidad del Módulo llamado:
 * Diario de Viajes
 */
Ext.define("App.AppRptDiarioViajes2",
    {
        alias: 'widget.diarioviajes2',
        buildApp: function (id) {
            return {
                id: id,
                closable: true,
                items: [
                    window.App.AppRptDiarioViajes.buildPanelNorte(),
                    window.App.AppRptDiarioViajes.buildPanelCentro.build()
                ],
                layout: 'border',
                tabConfig: {
                    tooltip: 'AppRptDiarioViajes'
                },
                title: 'Diario de Viajes',
                xtype: 'panel'
            }
        },
        buildPanelCentro: {
            build: function () {
                var a = window.App.AppRptDiarioViajes.buildPanelCentro;
                return {
                    id: "zGrdPnl_RptDiarioViaje",
                    columns: a.columns(),
                    dockedItems: a.dockedItems(),
                    header: false,
                    features: [
                        window.LmApp.zFeatGrp_DvSumario = Ext.create("Ext.grid.feature.GroupingSummary", {
                            proxyId: "zFeatGrp_DvSumario",
                            ftype: "groupingsummary",
                            groupHeaderTpl: "{name}",
                            showGroupsText: "Agrupar",
                            startCollapsed: true
                        })
                    ],
                    margin: "3 3 3 3",
                    multiColumnSort: false,
                    region: "center",
                    store: a.store(),
                    tbar: a.tbar(),
                    xtype: "grid"
                }
            },
            columns: function () {
                return {
                    items: [
                        {
                            hidden: true,
                            width: 120,
                            dataIndex: "RutaClasificada",
                            text: "RutaClasificada"
                        }, {
                            width: 80,
                            dataIndex: "FolioViaje",
                            hideable: false,
                            sortable: true,
                            tdCls: "Rutas",
                            text: "Viaje",
                            summaryType: "count",
                            summaryRenderer: function (value) {
                                return ((value === 0 || value > 1) ? '(' + value + ' Viajes)' : '(1 Viaje)');
                            }
                        }, {
                            width: 60,
                            dataIndex: "Unidad",
                            text: "Unidad"
                        }, {
                            width: 75,
                            dataIndex: "TipoUnidad",
                            text: "Tipo"
                        }, {
                            width: 200,
                            dataIndex: "Nombre",
                            text: "Operador"
                        }, {
                            width: 90,
                            dataIndex: "Concesionarios",
                            groupable: false,
                            sortable: true,
                            text: "Concesionarios </br> Visitados",
                            summaryType: "sum",
                            summaryRenderer: function (value) {
                                return value + ' Conc';
                            }
                        }, {
                            width: 80,
                            dataIndex: "Embarques",
                            groupable: false,
                            sortable: true,
                            text: "No de</br>Guías",
                            summaryType: "sum",
                            summaryRenderer: function (value) {
                                return value + ' Guías.';
                            }
                        }, {
                            width: 75,
                            dataIndex: "Items",
                            groupable: false,
                            sortable: true,
                            text: "Paquetes",
                            summaryType: "sum",
                            summaryRenderer: function (value) {
                                return value + ' Paquetes';
                            }
                        }, {
                            width: 80,
                            dataIndex: "PorcentajeCarga",
                            renderer: function (value) {
                                return value + ' %';
                            },
                            sortable: true,
                            text: "% Carga",
                            summaryType: "average",
                            summaryRenderer: function (value) {
                                return value + ' %';
                            }
                        }, {
                            width: 75,
                            dataIndex: "Rebotes",
                            groupable: false,
                            sortable: true,
                            text: "Rebotes",
                            summaryType: "sum",
                            summaryRenderer: function (value) {
                                return value + ' Rebotes';
                            }
                        }, {
                            width: 120,
                            dataIndex: "DiasTransito",
                            text: "Días de Tránsito."
                        }, {
                            width: 90,
                            dataIndex: "NumeroConcesionario",
                            text: "Última</br>Entrega"
                        }, {
                            width: 120,
                            dataIndex: "UltimaCiudad",
                            text: "Última Ciudad"
                        }, {
                            width: 120,
                            dataIndex: "Dealer",
                            text: "Descripción</br>Última Entrega"
                        }
                    ]
                }
            },
            dockedItems: function() {
                return [
                    {
                        dock: "bottom",
                        style: "margin-top:2px;",
                        xtype: "container",
                        defaults: {
                            "height": 22
                        },
                        items: [
                            {
                                cls: "total-field",
                                xtype: "displayfield",
                                name: "FolioViaje",
                                value: "-"
                            }, {
                                cls: "total-field",
                                xtype: "displayfield",
                                name: "Concesionarios",
                                value: "-"
                            }, {
                                cls: "total-field",
                                xtype: "displayfield",
                                name: "Embarques",
                                value: "-"
                            }, {
                                cls: "total-field",
                                xtype: "displayfield",
                                name: "Items",
                                value: "-"
                            }, {
                                cls: "total-field",
                                xtype: "displayfield",
                                name: "PorcentajeCarga",
                                value: "-"
                            }, {
                                cls: "total-field",
                                xtype: "displayfield",
                                name: "Rebotes",
                                value: "-"
                            }
                        ],
                        layout: "hbox"
                    }
                ];
            },
            exportaExcel: function () {
                var a = window.Ext.JSON.encode({ records: { record: window.LmApp.zGrdPnl_RptDiarioViaje.getRowsValues({ selectedOnly: false }) } });
                /* var a = Ext.JSON.encode({ records: { record: LmApp.zGrdPnl_RptDiarioViaje.getStore().getRecordsValues() } }); */
                var b = window.Ext.JSON.encode({ params: { param: { parametro1: "" } } });
                window.Datum.AppExportaExcel.creaDocExcel('Aspx/Rpt_Excel.aspx', '../xslt/DWHDiarioDeViajes.xslt','DiarioViajes',a,b);
            },
            model: function () {
                return window.Ext.define("EDS.model.DiarioViajes", {
                    extend: "Ext.data.Model",
                    fields: [
                        {
                            name: "RutaClasificada",
                            type: "string"
                        }, {
                            name: "FolioViaje",
                            type: "string"
                        }, {
                            name: "Unidad",
                            type: "string"
                        }, {
                            name: "TipoUnidad",
                            type: "string"
                        }, {
                            name: "Nombre",
                            type: "string"
                        }, {
                            name: "Concesionarios",
                            type: "int"
                        }, {
                            name: "Embarques",
                            type: "int"
                        }, {
                            name: "Items",
                            type: "int"
                        }, {
                            name: "PorcentajeCarga",
                            type: "int"
                        }, {
                            name: "UltimaCiudad",
                            type: "string"
                        }, {
                            name: "NumeroConcesionario",
                            type: "string"
                        }, {
                            name: "Rebotes",
                            type: "int"
                        }, {
                            name: "DiasTransito",
                            type: "string"
                        }, {
                            name: "Dealer",
                            type: "string"
                        }
                    ]
                });
            },
            store: function () {
                return {
                    model: window.App.AppRptDiarioViajes.buildPanelCentro.model(),
                    "parameters": "",
                    autoLoad: true,
                    groupField: "RutaClasificada",
                    sorters: [
                        {
                            direction: "ASC",
                            property: "Fecha"
                        }
                    ],
                    proxy: {
                        type: 'memory'
                    }
                }
            },
            tbar: function() {
                return {
                    xtype: "toolbar",
                    items: [
                        {
                            xtype: "netlabel",
                            text: "Diario de Viajes"
                        }, {
                            xtype: "tbfill"
                        }, {
                            id: "btnToggleGroups",
                            "style": "margin-left: 6px;",
                            iconCls: "fa fa-list-ol",
                            text: "Expande/Collapsa Grupos",
                            listeners: {
                                click: {
                                // ReSharper disable once UnusedParameter
                                    fn: function (item, e) {
                                        window.LmApp.zFeatGrp_DvSumario[window.LmApp.zFeatGrp_DvSumario.expanded ? 'collapseAll' : 'expandAll']();
                                        window.LmApp.zFeatGrp_DvSumario.expanded = !window.LmApp.zFeatGrp_DvSumario.expanded;
                                    }
                                }
                            }
                        }, {
                            iconCls: "fa fa-arrows-h",
                            text: "Auto Ajuste Ancho",
                            listeners: {
                                click: {
                                    fn: function (item, e) {
                                        window.Ext.each(window.LmApp.zGrdPnl_RptDiarioViaje.columns, function (column) {
                                            column.autoSize();
                                        });
                                    }
                                }
                            }
                        }, {
                            id: "zBtn_DvReporteExcel",
                            disabled: true,
                            iconCls: "fa fa-file-excel-o",
                            text: "Excel",
                            listeners: {
                                click: {
                                    fn: function(item, e) {
                                        window.App.AppRptDiarioViajes.buildPanelCentro.exportaExcel();
                                    }
                                }
                            }
                        }
                    ]
                } 
            }
        },
        buildPanelNorte: function () {
            return {
                border: true,
                margin: "0 5 5 5",
                padding: "4 4 4 4",
                xtype: "fieldset",
                region: "north",
                items: [
                    {
                        border: false,
                        height: 45,
                        padding: "0 0 0 0",
                        xtype: "fieldset",
                        items: [
                            {
                                id: "zDteFld_DvFechaDiario",
                                width: 180,
                                xtype: "datefield",
                                fieldLabel: "Fecha",
                                labelWidth: 45,
                                enableKeyEvents: true,
                                format: "d-M-Y",
                                submitFormat: "d/m/Y"
                            }
                        ]
                    }, {
                        border: false,
                        height: 45,
                        margin: "0 0 0 15",
                        padding: "0 0 0 0",
                        xtype: "fieldset",
                        defaultAnchor: "100%",
                        items: [
                            {
                                id: "zBtn_DvResultado",
                                width: 130,
                                xtype: "button",
                                iconAlign: "right",
                                iconCls: "fa fa-search",
                                text: "Buscar",
                                listeners: {
                                    click: {
                                        fn: function (item, e) {
                                            window.App.AppRptDiarioViajes.cargaDatos();
                                        }
                                    }
                                }
                            }, {
                                id: "zBtn_DvRestablecer",
                                padding: "5 0 0 0",
                                width: 130,
                                xtype: "button",
                                iconCls: "fa fa-undo",
                                text: "Restablecer",
                                listeners: {
                                    click: {
                                        fn: function (item, e) {
                                            window.App.AppRptDiarioViajes.restablecer();;
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
        cargaDatos: function () {
            try {
                var me = this,
                var a = window.LmApp.zGrdPnl_RptDiarioViaje.getStore();
                a.removeAll();
                window.Datum.LumaData.getDmJsonResult("Default.Aspx", "SpGetJsonResult", "DWH", "SPQRY_DiarioDeViajes", { Fecha: window.Datum.Tools.toDateSQLRango(window.LmApp.zDteFld_DvFechaDiario.getValue(), "inicio") }, function (resultado) {
                    a.loadData(resultado.Table);
                    window.LmApp.zFeatGrp_DvSumario.collapseAll();
                    window.LmApp.zBtn_DvReporteExcel.setDisabled(false);
                });
            } catch (bsError) {
                window.Datum.Tools.msgSistema('App.AppRptDiarioViajes.cargaDatos', bsError, 0);
            }
        },
        config: {
            fechaActual: null
        },
        constructor: function (config) {
            this.initConfig(config);
            /* Datum.LumaData.getDmFechaHora("Default.Aspx", "SpGetFechaHora", function (resultado) {
                App.AppRptDiarioViajes.setFechaActual(resultado);
            });*/

            return this;
        },
        setFechaHora: function () {
            window.Datum.LumaData.getDmFechaHora("Default.Aspx", "SpGetFechaHora", function (resultado) {
                var a = new Date(resultado);
                window.LmApp.zDteFld_DvFechaDiario.setValue(window.Ext.Date.add(a, window.Ext.Date.DAY, -1));
                window.LmApp.zDteFld_DvFechaDiario.setMaxValue(a);
                window.App.AppRptDiarioViajes.setFechaActual(resultado);
            });
        },
        restablecer: function () {
            window.App.AppRptDiarioViajes.setFechaHora();
            window.LmApp.zBtn_DvReporteExcel.setDisabled(true);
            window.LmApp.zGrdPnl_RptDiarioViaje.getStore().removeAll();
        },
        xtype:'diarioviajes2'
    }
);
