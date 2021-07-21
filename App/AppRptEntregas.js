Ext.define("App.AppRptEntregas",
    {
        buildApp: function (id) {
            return {
                id: id,
                closable: true,
                items: [
                    window.App.AppRptEntregas.buildPanelNorte(),
                    window.App.AppRptEntregas.buildPanelCentro.build()
                ],
                layout: 'border',
                tabConfig: {
                    tooltip: 'AppRptEntregas'
                },
                title: 'Entregas de Viajes',
                xtype: 'panel'
            }
        },
        buildPanelCentro: {
            build: function () {
                var a = window.App.AppRptEntregas.buildPanelCentro;
                return {
                    id: "zGrdPnl_RptEntregas",
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
                            hidden: true,
                            width: 80,
                            dataIndex: "ClaveFolioViaje",
                            text: "ClaveFolioViaje"
                        },
                        {
                            width: 85,
                            dataIndex: "FolioViaje",
                            text: "Viaje"
                        },
                        {
                            width: 130,
                            xtype: "datecolumn",
                            dataIndex: "FechaEmbarque",
                            text: "Fecha Embarque",
                            format: "d-m-Y G:i:s"
                            
                        },
                        {
                            width: 130,
                            xtype: "datecolumn",
                            dataIndex: "InicioViaje",
                            text: "Inicio Viaje",
                            format: "d-m-Y G:i:s"
                        },
                        {
                            width: 70,
                            dataIndex: "Unidad",
                            text: "Unidad"
                        },
                        {
                            width: 230,
                            dataIndex: "Operador",
                            text: "Operador"
                        },
                        {
                            hidden: true,
                            width: 190,
                            dataIndex: "Operador2",
                            text: "Operador2"
                        },
                        {
                            width: 190,
                            dataIndex: "Ayudante1",
                            text: "Ayudante1"
                        },
                        {
                            hidden: true,
                            width: 190,
                             dataIndex: "Ayudante2",
                             text: "Ayudante2"
                         },
                        {
                            width: 220,
                            dataIndex: "Ruta",
                            text: "Ruta"
                         },
                        {
                            width: 110,
                            dataIndex: "NumeroConcesionario",
                            text: "Num Concesionario"
                            
                        },
                        {
                            width: 150,
                            dataIndex: "NombreConcesionario",
                            text: "Nombre Concesionario"

                        },
                        {
                            width: 130,
                            xtype: "datecolumn",
                            dataIndex: "LlegadaEstimada",
                            text: "Llegada Estimada",
                            format: "d-m-Y G:i:s"
                        },
                        {
                            width: 130,
                            xtype: "datecolumn",
                            dataIndex: "LlegadaReal",
                            text: "Llegada Real",
                            format: "d-m-Y G:i:s"
                        },
                        {
                            width: 130,
                            xtype: "datecolumn",
                            dataIndex: "SalidaEstimada",
                            text: "Salida Estimada",
                            format: "d-m-Y G:i:s"
                        },
                        {
                            width: 130,
                            xtype: "datecolumn",
                            dataIndex: "SalidaReal",
                            text: "Salida Real",
                            format: "d-m-Y G:i:s"
                        },
                        {
                              width: 150,
                              dataIndex: "Estatus",
                              text: "Estatus"
                          }
                    ]
                }
            },
            exportaExcel: function () {
                var a = window.Ext.JSON.encode({ records: { record: window.LmApp.zGrdPnl_RptEntregas.getRowsValues({ selectedOnly: false }) } });
                var b = window.Ext.JSON.encode({ params: { param: { parametro1: "" } } });
                window.Datum.AppExportaExcel.creaDocExcel('Aspx/Rpt_Excel.aspx', '../xslt/DWHEntregaViaje.xslt', 'EntregasViaje', a, b);
            },
            model: function () {
                return window.Ext.define("EDS.model.Entregas", {
                    extend: "Ext.data.Model",							
                    fields: [
                        {
                            name: "ClaveFolioViaje",
                            type: "int"
                        },
                        {
                            name: "FolioViaje",
                            type: "string"
                        },
                        {
                            name: "FechaEmbarque",
                            type: "date"
                        },
                        {
                            name: "InicioViaje",
                            type: "date"            
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
                            name: "Operador2",
                            type: "string"
                        },
                        {
                            name: "Ayudante1",
                            type: "string"
                        },
                        {
                            name: "Ayudante2",
                            type: "string"
                        },
                        {
                            name: "Ruta",
                            type: "string"
                        },
                        {
                            name: "NumeroConcesionario",
                            type: "string"
                        },
                        {
                            name: "NombreConcesionario",
                            type: "string"
                        },
                        {
                            name: "LlegadaEstimada",
                            type: "date",
                            DateFormat: "M/d hh:mmtt"
                        },
                        {
                            name: "LlegadaReal",
                            type: "date",
                            DateFormat: "M/d hh:mmtt"
                        },
                        {
                            name: "SalidaEstimada",
                            type: "date",
                            DateFormat: "M/d hh:mmtt"
                        },
                        {
                            name: "SalidaReal",
                            type: "date"
                        },
                        {
                            name: "Estatus",
                            type: "string"
                        }
                    ]
                });
            },
            store: function () {
                return {
                    model: window.App.AppRptEntregas.buildPanelCentro.model(),
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
                            text: "Entregas de Viajes"
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
						                window.App.AppRptEntregas.buildPanelCentro.exportaExcel();
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
                                             window.App.AppRptEntregas.cargaDatos();
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
							                 window.App.AppRptEntregas.restablecer();;
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
                var a = window.LmApp.zGrdPnl_RptEntregas.getStore();
                a.removeAll();
                window.Datum.LumaData.getDmJsonResult("Default.Aspx", "Entrega", "dbo", "SPCALL_Entrega",
                    { Fecha: window.Datum.Tools.toDateSQLRango(window.LmApp.zDteFld_DvFecha.getValue(), "inicio") },
                  function (resultado) {
				    a.loadData(resultado.table);
				    window.LmApp.zBtn_DvReporteExcel.setDisabled(false);
				});
            } catch (bsError) {
                window.Datum.Tools.msgSistema('App.AppRptEntregas.cargaDatos', bsError, 0);
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
                window.App.AppRptEntregas.setFechaActual(resultado);
            });
        },
        restablecer: function () {
            window.App.AppRptEntregas.setFechaHora();
            window.LmApp.zBtn_DvReporteExcel.setDisabled(true);
            window.LmApp.zGrdPnl_RptEntregas.getStore().removeAll();
        },
        singleton: true
    });