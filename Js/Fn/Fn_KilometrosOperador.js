function buscar()
{
    try
    {
        eds.Viewport1.el.mask('Buscando...', 'x-loading-mask', false);
        Cool.zMetConsultaKmXOperador(
            (eds.z_dtnInicio.getValue() == '') ? '' : eds.z_dtnInicio.getValue().toDateSQLRango('Inicio'),
                    (eds.z_dtnFin.getValue() == '') ? '' : eds.z_dtnFin.getValue().toDateSQLRango('Fin'),
            {
                success: function (resultado) {
                    jsnResultado = eval('(' + resultado + ')');
                    if (jsnResultado.Rows[0].CtlCve == "SQL_OK") {
                        eds.Viewport1.el.unmask();
                    }
                    else if (jsnResultado.Rows[0].CtlCve == "SQL_VACIO") {
                        eds.Viewport1.el.unmask();
                        Ext.Msg.alert('Alerta', "No hay informacion con los filtros seleccionados");
                    }

                    else {
                        eds.Viewport1.el.unmask();
                        Ext.Msg.alert('Alerta', "Error de Comunicación con el Servidor");
                    }
                },
                failure: function (msg) {
                    eds.Viewport1.el.unmask();
                    Ext.Msg.alert('Alerta', 'Error de Comunicación con el Servidor');

                }
            });
    }
    catch(ex)
    {
        eds.Viewport1.el.unmask();
        Ext.Msg.alert('Alerta', 'Error de Comunicación con el Servidor');
    }
}

function limpiar()
{
    eds.z_dtnInicio.clear();
    eds.z_dtnFin.clear();
    eds.z_strBusqueda.removeAll();
}


function ExportaExcel() {
    try {
        var obj_exportaExcel = new objExportaExcel.Exportar();
        obj_exportaExcel.exportaDocExcel('../Aspx/Rpt_Excel.aspx', '../xslt/KilometrosOperador.xslt', Ext.encode(eds.z_GrdPnl_Detalle.getStore().getRecordsValues()));
    } catch (ex) {
        MensajeError('ExportaExcel', ex.description);
    }
}