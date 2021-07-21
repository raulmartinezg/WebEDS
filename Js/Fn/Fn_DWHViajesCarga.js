var tipRenderer = function (storeItem, item) {
    //calculate percentage.
    var total = 0;

    App.Chart1.getStore().each(function (rec) {
        total += rec.get('Kilometros');
    });

    this.setTitle(storeItem.get('Year') + ': ' + Math.round(storeItem.get('Kilometros') / total * 100) + '%');
};


function z_UFN_Consulta() {
    try {
        // Ext.Msg.alert('Alerta', "Alguna vez consultará datos...");
        App.viewport1.el.mask('Buscando...', 'x-loading-mask', false);
        Cool.ZMetViajesCarga(
                Ext.isEmpty(App.z_dtnInicial.getValue()) ? '' : App.z_dtnInicial.getValue().toDateSQLRango('Inicio'),
                Ext.isEmpty(App.z_dtnFinal.getValue()) ? '' : App.z_dtnFinal.getValue().toDateSQLRango('Fin'),
            {
                success: function (resultado) {
                    jsnResultado = eval('(' + resultado + ')');
                    if (jsnResultado.Rows[0].CtlCve == "SQL_OK") {
                        App.viewport1.el.unmask();
                    } else if (jsnResultado.Rows[0].CtlCve == "SQL_VACIO") {
                        App.viewport1.el.unmask();
                        Ext.Msg.alert('Alerta', "No hay informacion con los filtros seleccionados");
                    } else {
                        App.viewport1.el.unmask();
                        Ext.Msg.alert('Alerta', "Error de Comunicación con el Servidor");
                    }
                },
                failure: function (msg) {
                    App.viewport1.el.unmask();
                    Ext.Msg.alert('Alerta', 'Error de Comunicación con el Servidor');

                }
            });
    } catch (ex) {
        App.viewport1.el.unmask();
        Ext.Msg.alert('Alerta', 'Error de Comunicación con el Servidor');
    }
}

function z_UFN_Restablecer() {
    App.z_dtnInicial.clear();
    App.z_strConsulta.removeAll();
}

function z_UFN_ExportaExcel() {
    try {
        var obj_exportaExcel = new objExportaExcel.Exportar();
        obj_exportaExcel.exportaDocExcel('../Aspx/Rpt_Excel.aspx', '../xslt/KilometrosRuta.xslt', Ext.encode(App.z_GrdPnl_Detalle.getStore().getRecordsValues()));
    } catch (ex) {
        MensajeError('ExportaExcel', ex.description);
    }
}

