Ext.define('App.view.nivelservicio.Browse', {
    extend: 'Ext.panel.Panel',
    requires: [
        'App.view.nivelservicio.BrowseController',
        'App.view.nivelservicio.BrowseViewModel',
        'App.view.nivelservicio.GridDelivDaily',
        'App.view.nivelservicio.GridDelivMonthly',
        'App.view.nivelservicio.GridDelivRoute',
        'App.view.nivelservicio.GraphDelivRoute',
        'App.view.nivelservicio.GraphDelivDaily'
    ],
    controller: 'nivelserviciobrowse',
    viewModel: { type: 'nivelservicioviewmodel' },
    config: {
        title: 'Nivel de Servicio',
        id: 'zTabRptDiarioViajes'
    },
    constructor: function () {
        this.callParent(arguments);
        this.on({ scope: this });
    },
    header: false,
    items: [
        {
            xtype: "container",
            id: "containerGrid1",
            height: '100%',
            hidden: true,
            layout: "border",
            region: "center",
            style: { borderColor: '#FF4800', borderStyle: 'solid', borderWidth: '3px' },
            items: [
                {
                    xtype: "graphdeliveryroute",
                    id: "zCont_RutaMensual2",
                    bind: { store: '{DeliveryRoute}' },
                    layout: "border",
                    region: "north",
                    height: '50%',
                    width: '100%',
                    style: { borderColor: '#217346', borderStyle: 'solid', borderWidth: '1px' },
                    title: 'Delivery Efficiency by Route (30 mins)',
                },
                {
                    xtype: "graphdeliverydaily",
                    id: "zCont_Dia",
                    bind: { store: '{DeliveryDaily}' },
                    layout: "border",
                    region: "center",
                    height: '50%',
                    width: '100%',
                    style: { borderColor: '#217346', borderStyle: 'solid', borderWidth: '1px' },
                    title:'Delivery Efficiency Daily(30 mins)'
                }
            ]
        },
        {
            xtype: "container",
            id: "containerGrid2",
            height: '100%',
            hidden: true,
            layout: "border",
            region: "center",
            style: { borderColor: '#DF7401', borderStyle: 'solid', borderWidth: '3px' },
            items: [
                {
                    xtype: 'deliverydaily',
                    id: "zGrdPnl_RutaDiario",
                    bind: { store: '{DeliveryDaily}' },
                    region: "west",
                    height: '100%',
                    width: '30%',
                    style: { borderColor: '#217346', borderStyle: 'solid', borderWidth: '1px' }
                },
                {
                    xtype: "graphdeliverydaily",
                    id: "zGrafRutaDia",
                    bind: { store: '{DeliveryDaily}' },
                    layout: "border",
                    region: "center",
                    height: '100%',
                    width: '70%',
                    style: { borderColor: '#217346', borderStyle: 'solid', borderWidth: '1px' },
                    title: 'Delivery Efficiency Route Day (30 mins)'
                }
            ]
        },
        {
            xtype: "container",
            id: "containerGrid3",
            hidden: false,
            layout: "border",
            region: "center",
            style: { borderColor: '#FF4800', borderStyle: 'solid', borderWidth: '3px' },
            items: [
                {
                    xtype: 'deliveryroute',
                    id: 'zGrdPnl_RutaMensual',
                    region: "west",
                    title: 'Delivery Efficiency by Route (30 mins)',
                    width: '40%'
                },
                {
                    xtype: 'deliverydaily',
                    bind: { store: '{DeliveryDaily}' },
                    id: 'zGrdPnl_Diario',
                    region: "center",
                    title: 'Delivery Efficiency Daily (30 mins)',
                    width: '30%'
                },
                {
                    xtype: 'deliverymonthly',
                    id: 'zGrdPnl_Mensual',
                    region: "east",
                    title: 'Delivery Efficiency Monthly (30 mins)',
                    width: '30%'
                }
            ]
        }
    ],
    layout: "border",
    margin: "3 3 3 3",
    tabConfig: {
        tooltip: 'AppRptNivelServicio'
    },
    tbar: {
        xtype: "toolbar",
        items: [
            {
                xtype: 'monthfield',
                format: 'F, Y',
                focusOnShow: true,
                margin: "8 8 5 5",
                submitFormat: "Ymd",
                Width: 150
            },
            {
                iconCls: "fa fa-search",
                margin: "8 8 0 5",
                height: 30,
                width: 90,
                listeners: {
                    click: 'cargaDatos'
                },
                text: "Buscar",
                xtype: "button"
            },
            {
                iconCls: "fa fa-undo",
                height: 30,
                margin: "8 8 0 5",
                width: 105,
                listeners: { click: 'restablecer'},
                text: "Reestablecer",
                xtype: "button"
            },
            {
                /* itemId: "zBtnGraficas", */
                disabled: true,
                height: 40,
                iconCls: "fa fa-bar-chart fa-2x yellowiconcolor",
                listeners: {
                    click: {
                        fn: function (item) {
                            var a = LmApp.containerGrid1;
                            var b = LmApp.containerGrid2;
                            var c = LmApp.containerGrid3;
                            /* var j = me.getCombo(); j[0].reset(); */
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
            },
            {
                /* itemId: "zCBRuta", */
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
                    data: []
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
                    click: { fn: 'cargaDatosPorRuta', porRuta: '0' }
                },
                text: "Diario Ruta",
                xtype: "button"
            }
        ]
    },
    xtype: 'nivelservicio'
});