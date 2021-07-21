var tipRenderer = function (storeItem, item) {
    //calculate percentage.
    var total = 0;

    eds.Chart1.getStore().each(function (rec) {
        total += rec.get('Kilometros');
    });

    this.setTitle(storeItem.get('Year') + ': ' + Math.round(storeItem.get('Kilometros') / total * 100) + '%');
};


function buscar() {
    try
    {
        if (Ext.isEmpty(eds.z_cboBox_ClasificacionRuta.getValue())) {
            Ext.Msg.alert('Alerta', "Selecciona una Ruta...");
            return;
        }


        eds.viewport1.el.mask('Buscando...', 'x-loading-mask', false);
        Cool.zMetConsultaKmRuta(
                Ext.isEmpty(eds.z_dtnInicial.getValue()) ? '' : eds.z_dtnInicial.getValue().toDateSQLRango('Inicio'),
                        Ext.isEmpty(eds.z_dtnFinal.getValue()) ? '' : eds.z_dtnFinal.getValue().toDateSQLRango('Fin'),
                        Ext.isEmpty(eds.z_cboBox_ClasificacionRuta.getValue()) ? '' : eds.z_cboBox_ClasificacionRuta.getValue(),
                        {
                            success: function (resultado) {
                                jsnResultado = eval('(' + resultado + ')');
                                if (jsnResultado.Rows[0].CtlCve == "SQL_OK") {
                                    eds.viewport1.el.unmask();
                                }
                                else if (jsnResultado.Rows[0].CtlCve == "SQL_VACIO") {
                                    eds.viewport1.el.unmask();
                                    Ext.Msg.alert('Alerta', "No hay informacion con los filtros seleccionados");
                                }

                                else {
                                    eds.viewport1.el.unmask();
                                    Ext.Msg.alert('Alerta', "Error de Comunicación con el Servidor");
                                }
                            },
                            failure: function (msg) {
                                eds.viewport1.el.unmask();
                                Ext.Msg.alert('Alerta', 'Error de Comunicación con el Servidor');

                            }
                        });
    }
    catch(ex)
    {
        eds.viewport1.el.unmask();
        Ext.Msg.alert('Alerta', 'Error de Comunicación con el Servidor');
    }
}

function limpiar()
{
    eds.z_dtnInicial.clear();
    eds.z_dtnFinal.clear();
    eds.z_strConsulta.removeAll();
}

function ExportaExcel() {
    try {
        var obj_exportaExcel = new objExportaExcel.Exportar();
        obj_exportaExcel.exportaDocExcel('../Aspx/Rpt_Excel.aspx', '../xslt/KilometrosRuta.xslt', Ext.encode(eds.z_GrdPnl_Detalle.getStore().getRecordsValues()));
    } catch (ex) {
        MensajeError('ExportaExcel', ex.description);
    }
}