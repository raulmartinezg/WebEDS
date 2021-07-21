var z_UFN_eficienRender = function (value) {
    var color = '#085627';
    if (value > .50 && value < .75) {
        color = '#dd5824';
    } else if (value <= .50) {
        color = '#e60d0d';
    }
    return  (value==0) ? 0: '<span style="color:' + color + '";>' + Ext.util.Format.round(value * 100,0) + '%</span>';
};



var tipRenderer = function (storeItem, item) {
    //calculate percentage.
    var total = 0;

    App.Chart1.getStore().each(function (rec) {
        total += rec.get('Kilometros');
    });

    this.setTitle(storeItem.get('Year') + ': ' + Math.round(storeItem.get('Kilometros') / total * 100) + '%');
};

function z_UFN_SwitchGraficaGrid() {
    try {
        with (window.App){
            if (!z_Grid_MensualDeViajes.hidden) {
                z_Grid_MensualDeViajes.hide();
                z_pnl_Graficas.show();
            } else {
                z_pnl_Graficas.hide();
                z_Grid_MensualDeViajes.show();
            }
        }
    } catch (ex) {
        MensajeError("z_UFN_SwitchGraficaGrid", ex, 0);
    }
}

function z_UFN_consultaGrid() {
    try {
        App.viewport1.el.mask('Buscando...', 'x-loading-mask', false);
        Cool.ZMetMensualEficienciaEntregaGrid(
                Ext.isEmpty(App.z_dtnInicial.getValue()) ? '' : App.z_dtnInicial.getValue().toDateSQLRango('Inicio'),
                Ext.isEmpty(App.z_dtnFinal.getValue()) ? '' : App.z_dtnFinal.getValue().toDateSQLRango('Fin'),
            {
                success: function (resultado) {
                    App.z_btn_SwitchGraficaGrid.setDisabled(false);
                    jsnResultado = eval('(' + resultado + ')');
                    if (jsnResultado.Rows[0].CtlCve == "SQL_OK") {
                        App.viewport1.el.unmask();
                    } else if (jsnResultado.Rows[0].CtlCve == "SQL_VACIO") {
                        App.viewport1.el.unmask();
                        MensajeError("z_UFN_consultaGrid", 'No existe información bajo los criterios seleccionados', 1);
                    } else {
                        App.viewport1.el.unmask();
                        MensajeError("z_UFN_consultaGrid", 'Error de comunicación con el Servidor', 1);
                    }
                },
                failure: function (msg) {
                    App.viewport1.el.unmask();
                    MensajeError("z_UFN_consultaGrid", msg,0);
                }
            });
    } catch (ex) {
        App.viewport1.el.unmask();
        MensajeError('z_UFN_consultaGrid', ex, 0);
    }
}

function z_UFN_Restablecer() {
}

function z_UFN_ExportaExcel() {
    try {
        var obj_exportaExcel = new objExportaExcel.Exportar();
        obj_exportaExcel.exportaDocExcel('../Aspx/Rpt_Excel.aspx', '../xslt/KilometrosRuta.xslt', Ext.encode(App.z_GrdPnl_Detalle.getStore().getRecordsValues()));
    } catch (ex) {
        MensajeError('ExportaExcel', ex.description);
    }
}

