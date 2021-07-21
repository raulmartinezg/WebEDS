Ext.define('App.view.nivelservicio.GridDelivMonthly', {
    extend: 'Ext.grid.Panel',
    config: {
        margin: "3 3 3 3",
    },
    bind: { store: '{DeliveryMonthly}' },
    xtype: 'deliverymonthly',
    style: { borderColor: '#217346', borderStyle: 'solid', borderWidth: '1px' },
    columns: {
        items: [
            {
                dataIndex: "ClaveNivelSerMensual",
                text: " ",
                hidden: true
            },{
                dataIndex: "Anio",
                text: "Año",
                hidden: true
            },{
                dataIndex: "Mes",
                text: "MonthNumber",
                hidden: true
            },{
                dataIndex: "MesL",
                text: "Months",
                width: 82,
                summaryRenderer: function (v, params) {
                    return ((v === 0 || v > 1) ? '(' + v + ' Months)' : '(1 Month)');;
                },
                summaryType: "count",
            },{
                dataIndex: "Total",
                text: "Total",
                width: 60,
                summaryType: "sum",
                xtype: 'numbercolumn',
                format: '0'
            },{
                dataIndex: "Atiempo",
                text: "OnTime",
                width: 75,
                summaryType: "sum",
                xtype: 'numbercolumn',
                format: '0'
            },{
                dataIndex: "Tarde",
                text: "Late",
                width: 60,
                summaryType: "sum",
                xtype: 'numbercolumn',
                format: '0'
            },{
                dataIndex: "Sindatos",
                text: "Empty",
                width: 66,
                summaryType: "sum",
                xtype: 'numbercolumn',
                format: '0'
            },{
                dataIndex: "PorcAtiempo",
                text: "% OnTime",
                width: 90,
                renderer: function (value) {
                    return Ext.String.format(value + " %");
                }
            }
        ]
    },
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
});
