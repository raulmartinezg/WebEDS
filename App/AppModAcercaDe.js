Ext.define("App.AppModAcercaDe",
    {
        buildApp: function (id) {
            var a = {};
            try {
                a = {
                    xtype: 'window',
                    layout: 'border',
                    id: id,
                    title: 'Desempeño (1 Vista)',
                    closable: true,
                    items: [
                        this.buildPanelNorte(),
                        App.AppRptMensualViajes.buildPanelCentro()
                    ]
                };
            } catch (bsError) {
                Datum.Tools.msgSistema('App.AppRptMensualViajes.buildApp', bsError, 0);
            }
            return a;
        },

    }
);