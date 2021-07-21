function buscar() {
    try
    {
        eds.z_viewport1.el.mask('Buscando...', 'x-loading-mask', false);
        Cool.zMetConsultaRutasxMes
            ((eds.z_dtnInicial.getValue() == null) ? '' : eds.z_dtnInicial.getValue().toDateSQLRango('Inicio'),
                (eds.z_dtnFinal.getValue() == null) ? '' : eds.z_dtnFinal.getValue().toDateSQLRango('Fin'),
            {
                success: function (resultado) {
                    jsnResultado = eval('(' + resultado + ')');
                    if (jsnResultado.Rows[0].CtlCve == "SQL_OK") {
                        eds.z_viewport1.el.unmask();
                    }
                    else if (jsnResultado.Rows[0].CtlCve == "SQL_VACIO") {
                        eds.z_viewport1.el.unmask();
                        Ext.Msg.alert('Alerta', "No hay informacion con los filtros seleccionados");
                    }

                    else {
                        eds.z_viewport1.el.unmask();
                        Ext.Msg.alert('Alerta', "Error al procesar tu solicitud");
                    }

                },
                failure: function (msg) {
                    eds.z_viewport1.el.unmask();
                    Ext.Msg.alert('Alerta', 'Error de Comunicación con el Servidor');
                }
            });
    }
    catch(ex)
    {
        eds.z_viewport1.el.unmask();
        Ext.Msg.alert('Alerta', 'Error de Comunicación con el Servidor');    
    }
}

function limpiar() {
    eds.z_dtnInicial.clear();
    eds.z_dtnFinal.clear();
    eds.z_strConsultaRutasxMes.removeAll();
}


function ExportaExcel() {
    try {
        var obj_exportaExcel = new objExportaExcel.Exportar();
        obj_exportaExcel.exportaDocExcel('../Aspx/Rpt_Excel.aspx', '../xslt/VisistasRutaCiudad.xslt', Ext.encode(eds.z_GrdPnl_Detalle.getStore().getRecordsValues()));
    } catch (ex) {
        MensajeError('ExportaExcel', ex.description);
    }
}