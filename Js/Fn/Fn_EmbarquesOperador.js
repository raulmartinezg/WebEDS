function buscar() {
    try {        
        eds.viewport1.el.mask('Buscando...', 'x-loading-mask', false);
        Cool.zMetConsultaEmbarques(
            (eds.z_dtnInicial.getValue() == '') ? '' : eds.z_dtnInicial.getValue().toDateSQLRango('Inicio'),
                (eds.z_dtnFinal.getValue() == '') ? '' : eds.z_dtnFinal.getValue().toDateSQLRango('Fin'),
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
                        Ext.Msg.alert('Alerta', "Error al procesar tu solicitud");
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
        Ext.Msg.alert('Alerta', 'Error al procesar la solicitud');
    }
}

function limpiar() {        
    eds.z_dtnInicial.clear();
    eds.z_dtnFinal.clear();
    eds.z_strConsulta.removeAll();
}


function ExportaExcel() {
    try {
        var obj_exportaExcel = new objExportaExcel.Exportar();
        obj_exportaExcel.exportaDocExcel('../Aspx/Rpt_Excel.aspx', '../xslt/EmbarquesOperador.xslt', Ext.encode(eds.z_GrdPnl_Detalle.getStore().getRecordsValues()));
    } catch (ex) {
        MensajeError('ExportaExcel', ex.description);
    }
}