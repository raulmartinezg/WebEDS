var tipRenderer = function (storeItem, item) {
    //calculate percentage.
    var total = 0;

    App.Chart1.getStore().each(function (rec) {
        total += rec.get('Kilometros');
    });

    this.setTitle(storeItem.get('Year') + ': ' + Math.round(storeItem.get('Kilometros') / total * 100) + '%');
};

var colorBarSeries = function() {
    var colors = ['url(#v-1)', 'url(#v-2)', 'url(#v-3)', 'url(#v-4)', 'url(#v-5)', 'url(#v-6)', 'url(#v-7)'];
    return { fill: colors[index % colors.length] };
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

var customSummaryTypeFunction = function (v, record, colName, data, rowIdx) {
    var total = 0.0;
    var contador = 0;
    record.forEach(function (element, index, array) {
        if (element != 0) {
            total += element;
            contador++;
        }
    });
    return total / contador;
};

function z_UFN_consultaGrid() {
    try {
        App.viewport1.el.mask('Buscando...', 'x-loading-mask', false);
        Cool.ZMetMensualDeViajesGrid(
                Ext.isEmpty(App.z_dtnInicial.getValue()) ? '' : App.z_dtnInicial.getValue().toDateSQLRango('Inicio'),
                Ext.isEmpty(App.z_dtnFinal.getValue()) ? '' : App.z_dtnFinal.getValue().toDateSQLRango('Fin'),
            {
                success: function (resultado) {
                    /* App.z_btn_SwitchGraficaGrid.setDisabled(false);*/
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
    App.z_GrdPnl_Detalle.getStore().removeAll();
    App.z_dtnInicial.reset();
    App.z_dtnFinal.reset();
    /* App.Chart1.getStore().removeAll();*/
    /* App.z_btn_SwitchGraficaGrid.setDisabled(true);*/
}

function z_UFN_ExportaExcel(grid) {
    grid.submitData(false, { isUpload: true });
    /* Cool.ZMetConstruyeReporteExcel(
    {
        success: function (resultado) {
        },
        failure: function (msg) {
        }
    });
    */
}


