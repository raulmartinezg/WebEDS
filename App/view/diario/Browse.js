Ext.define('App.view.diario.Browse', {
    extend: 'Ext.grid.Panel',
    fields: {
        country: {
            property: 'diario'
        }
    },
    viewModel: { type: 'diarioviewmodel' },
    bind: { store: '{DiarioStore}' },
    requires: ['App.view.diario.BrowseController', 'App.view.diario.BrowseModel'],
    controller: 'diariobrowse',
    config: {
        title: 'Diario Viajes!',
        id: 'zTabRptDiarioViajes'
    },
    fields: {
        country: {
            property: 'country'
        }
    },
    constructor: function () {
        this.callParent(arguments);
        this.on({ scope: this });
    },
    columns: {
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
    },
    dockedItems: [
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
    ],
    header: false,
    features: [
        LmApp.zFeatGrp_DvSumario = Ext.create("Ext.grid.feature.GroupingSummary", {
            ftype: "groupingsummary",
            groupHeaderTpl: "{name}",
            showGroupsText: "Agrupar",
            startCollapsed: true
        })
    ],
    margin: "3 3 3 3",
    multiColumnSort: false,
    tbar: {
        xtype: "toolbar",
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
            },
            {
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
                            click: 'cargaDatos'
                        }
                    }, {
                        id: "zBtn_DvRestablecer",
                        padding: "5 0 0 0",
                        width: 130,
                        xtype: "button",
                        iconCls: "fa fa-undo",
                        text: "Restablecer",
                        listeners: {
                            click: 'restablecer'
                        }
                    }
                ],
                layout: "vbox"
            },
            {
                xtype: "tbfill"
            },
            {
                id: "btnToggleGroups",
                "style": "margin-left: 6px;",
                iconCls: "fa fa-list-ol",
                text: "Expande/Collapsa Grupos",
                listeners: {
                    click: 'expandeColapsaCol'
                }
            },
            {
                iconCls: "fa fa-arrows-h",
                text: "Auto Ajuste Ancho",
                listeners: {
                    click: 'autoAjusteAnchoCol'
                }
            },
            {
                id: "zBtn_DvReporteExcel",
                disabled: true,
                iconCls: "fa fa-file-excel-o",
                text: "Excel",
                listeners: {
                    click: 'exportaExcel'
                }
            }
        ]
    },
    xtype: 'diarioviajes'
});

