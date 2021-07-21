Ext.define("App.AppRptTipoEncuesta",
    {
        buildApp: function (id) {
            return {
                id: id,
                closable: true,
                items: [
                    window.App.AppRptTipoEncuesta.buildPanelNorte(),
                    window.App.AppRptTipoEncuesta.buildPanelCentro.build()
                ],
                layout: 'border',
                tabConfig: {
                    tooltip: 'AppRptTipoEncuesta'
                },
                title: 'Tipo Encuesta Por Concesionario',
                xtype: 'panel'
            }
        },
        buildPanelCentro: {
            build: function () {
                var a = window.App.AppRptTipoEncuesta.buildPanelCentro;
                return {
                    id: "zGrdPnl_RptTipoEncuesta",
                    columns: a.columns(),
                    // dockedItems: a.dockedItems(),
                    header: false,
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
                            width: 90,
                            dataIndex: "FolioViaje",
                            text: "FolioViaje"
                        },
                        {
                            width: 65,
                            dataIndex: "Unidad",
                            text: "Unidad"
                        },
                        {
                            width: 160,
                            dataIndex: "Operador",
                            text: "Operador"
                        },
                        {
                            width: 160,
                            xtype: "datecolumn",
                            dataIndex: "SalidaProgramada",
                            text: "SalidaProgramada",
                            format: "d-m-Y G:i:s"

                        },
                        {
                            width: 130,
                            dataIndex: "NumeroConcesionario",
                            text: "NumeroConcesionario"

                        },
                        {
                            width: 320,
                            dataIndex: "RazonSocial",
                            text: "RazonSocial"

                        },
                        {
                            width: 160,
                            xtype: "datecolumn",
                            dataIndex: "FechaEncuesta",
                            text: "FechaEncuesta",
                            format: "d-m-Y G:i:s"
                        },
                        {
                            width: 140,
                            dataIndex: "TipoEncuesta",
                            text: "TipoEncuesta"
                        }
                    ]
                }
            },
            exportaExcel: function () {
                var a = window.Ext.JSON.encode({ records: { record: window.LmApp.zGrdPnl_RptTipoEncuesta.getRowsValues({ selectedOnly: false }) } });
                var b = window.Ext.JSON.encode({ params: { param: { parametro1: "" } } });               
                window.Datum.AppExportaExcel.creaDocExcel('Aspx/Rpt_Excel.aspx', '../xslt/RptTipoEncuesta.xslt', 'TipoEncuesta', a, b);
            },
            model: function () {
                return window.Ext.define("EDS.model.TipoEncuesta", {
                    extend: "Ext.data.Model",
                    fields: [
                        //{
                        //    name: "ClaveFolioViaje",
                        //    type: "int"
                        //},
                        {
                            name: "FolioViaje",
                            type: "string"
                        },
                      {
                            name: "Unidad",
                            type: "int"
                        },
                        {
                            name: "Operador",
                            type: "string"
                        },
                        {
                            name: "SalidaProgramada",
                            type: "date"                           
                        },
                        {
                            name: "NumeroConcesionario",
                            type: "string"
                        },
                        {
                            name: "RazonSocial",
                            type: "string"
                        },
                        {
                            name: "FechaEncuesta",
                            type: "date"
                           
                        },
                        {
                            name: "TipoEncuesta",
                            type: "string"
                        }
                    ]
                });
            },
            store: function () {
                return {
                    model: window.App.AppRptTipoEncuesta.buildPanelCentro.model(),
                    "parameters": "",
                    autoLoad: true,
                    sorters: [
                        {
                            direction: "ASC",
                            property: "FolioViaje"
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
                            text: "Tipo Encuesta"
                        },
                        {
                            xtype: "tbfill"
                        },
                        {
                            id: "zBtn_DvReporteExcel",
                            disabled: true,
                            iconCls: "fa fa-file-excel-o",
                            text: "Excel",
                            listeners: {
                                click: {
                                    fn: function (item, e) {
                                        window.App.AppRptTipoEncuesta.buildPanelCentro.exportaExcel();
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
                                id: "zDteFld_DvFecha",
                                width: 180,
                                xtype: "datefield",
                                fieldLabel: "Fecha",
                                labelWidth: 45,
                                enableKeyEvents: true,
                                format: "d-M-Y",
                                submitFormat: "d/m/Y"
                            }
                        ]
                    },
                    {
                        border: false,
                        height: 55,
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
                                            window.App.AppRptTipoEncuesta.cargaDatos();
                                        }
                                    }
                                }
                            },
                            {
                                id: "zBtn_DvRestablecer",
                                width: 130,
                                xtype: "button",
                                iconCls: "fa fa-undo",
                                text: "Restablecer",
                                listeners: {
                                    click: {
                                        fn: function (item, e) {
                                            window.App.AppRptTipoEncuesta.restablecer();;
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
                var a = window.LmApp.zGrdPnl_RptTipoEncuesta.getStore();
                a.removeAll();
                window.Datum.LumaData.getDmJsonResult("Default.Aspx", "Reporte", "dbo", "SPCALL_Reporte",
                    { Fecha: window.Datum.Tools.toDateSQLRango(window.LmApp.zDteFld_DvFecha.getValue(), "inicio") },
                    function (resultado) {
                        a.loadData(resultado.table);
                        window.LmApp.zBtn_DvReporteExcel.setDisabled(false);
                    });
            } catch (bsError) {
                window.Datum.Tools.msgSistema('App.AppRptTipoEncuesta.cargaDatos', bsError, 0);
            }
        },
        config: {
            fechaActual: null
        },
        constructor: function (config) {
            this.initConfig(config);
            return this;
        },
        setFechaHora: function () {
            window.Datum.LumaData.getDmFechaHora("Default.Aspx", "SpGetFechaHora", function (resultado) {
                var a = new Date(resultado);
                window.LmApp.zDteFld_DvFecha.setValue(window.Ext.Date.add(a, window.Ext.Date.DAY, -1));
                window.LmApp.zDteFld_DvFecha.setMaxValue(a);
                window.App.AppRptTipoEncuesta.setFechaActual(resultado);
            });
        },
        restablecer: function () {
            window.App.AppRptTipoEncuesta.setFechaHora();
            window.LmApp.zBtn_DvReporteExcel.setDisabled(true);
            window.LmApp.zGrdPnl_RptTipoEncuesta.getStore().removeAll();
        },
        singleton: true
    });