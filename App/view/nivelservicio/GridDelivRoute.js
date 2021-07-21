Ext.define('App.view.nivelservicio.GridDelivRoute', {
    extend: 'Ext.grid.Panel',
    config: {

    },
    bind: { store: '{DeliveryRoute}' },
    xtype: 'deliveryroute',
    style: { borderColor: '#217346', borderStyle: 'solid', borderWidth: '1px' },
    margin: "3 3 3 3",
    columns: {
        items: [
            {
                dataIndex: "ClaveNivelRutaMes",
                text: "ClaveNivelRutaMes",
                hidden: true
            },
            {
                dataIndex: "Anio",
                text: "Año",
                hidden: true
            },
            {
                dataIndex: "Mes",
                text: "Mes",
                hidden: true
            },
            {
                dataIndex: "Prefijo",
                text: " ",
                width: 57
            },
            {
                dataIndex: "Ruta",
                text: "Routes",
                width: 197,
                summaryRenderer: function (v, params) {
                    return ((v === 0 || v > 1) ? '(' + v + ' Routes)' : '(1 Route)');
                },
                summaryType: "count"
            },
            {
                dataIndex: "Total",
                text: "Total",
                width: 60,
                summaryType: "sum",
                xtype: 'numbercolumn',
                format: '0'
            },
            {
                dataIndex: "Atiempo",
                text: "OnTime",
                width: 75,
                summaryType: "sum",
                xtype: 'numbercolumn',
                format: '0'
            },
            {
                dataIndex: "Tarde",
                text: "Late",
                width: 60,
                summaryType: "sum",
                xtype: 'numbercolumn',
                format: '0',
                renderer: function (value) {
                    if (LmApp.zHidden_Perfil.getValue() === 'NISSAN_AVANZADOS') {
                        return ((value > 0) ? '<a href="#' + value + '">' + value + '</a>' : value);
                    }
                    else {
                        return (value);

                    }
                }
            },
            {
                dataIndex: "SinDatos",
                text: "Empty",
                width: 66,
                summaryType: "sum",
                xtype: 'numbercolumn',
                format: '0'
            },
            {
                dataIndex: "PorcAtiempo",
                text: "% OnTime",
                width: 90,
                renderer: function (value) {
                    return Ext.String.format('<span style="color:{0};">{1}</span>', (value > 96) ? "green" : "red", value + "%");
                }
            }
        ]
    },
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
     listeners: {
         cellclick: 'onClickGrid'
    },
});
