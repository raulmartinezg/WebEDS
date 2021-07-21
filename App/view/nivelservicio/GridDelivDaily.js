Ext.define('App.view.nivelservicio.GridDelivDaily', {
    extend: 'Ext.grid.Panel',
    config: {
        margin: "3 3 3 3"
    },
    xtype: 'deliverydaily',
    style: { borderColor: '#217346', borderStyle: 'solid', borderWidth: '1px' },
    columns: {
        items: [
            {
                dataIndex: "ClaveNivelSerDiario",
                text: "ClaveNivelSerDiario",
                hidden: true
            },
            {
                dataIndex: "Anio",
                text: "Year",
                hidden: true
            },
            {
                dataIndex: "Mes",
                text: "Month",
                hidden: true
            },
            {
                dataIndex: "Dia",
                text: "Days",
                width: 75,
                summaryRenderer: function (v, params) {
                    return ((v === 0 || v > 1) ? '(' + v + ' Days)' : '(1 Day)');;
                },
                summaryType: "count",
            },
            {
                dataIndex: "Total",
                text: "Total",
                width: 55,
                summaryType: "sum",
                xtype: 'numbercolumn',
                format: '0'
            },
            {
                dataIndex: "Atiempo",
                text: "OnTime",
                width: 71,
                summaryType: "sum",
                xtype: 'numbercolumn',
                format: '0'
            },
            {
                dataIndex: "Tarde",
                text: "Late",
                width: 50,
                summaryType: "sum",
                xtype: 'numbercolumn',
                format: '0'
            },
            {
                dataIndex: "SinDatos",
                text: "Empty",
                width: 60,
                summaryType: "sum",
                xtype: 'numbercolumn',
                format: '0'
            },
            {
                dataIndex: "PorcAtiempo",
                text: "% OnTime",
                width: 86,
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
});
