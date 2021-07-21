function redimensionarControles(ParentControl,ControlRedim) {
    try {
        ParentControl.setWidth(parseInt(TamVentana()[0]));
        ParentControl.setHeight(parseInt(TamVentana()[1]));//160        
        /*var altoItems = 0;
        for (var i = 0; i <= ParentControl.items.length - 1; i++) {
            altoItems += (ParentControl.items.items[i].id != 'z_GrdPnl_Detalle') ? ParentControl.items.items[i].getHeight() : 0;
        }
        ControlRedim.setHeight(ParentControl.getHeight() - (altoItems + 5));*/
    } catch (bsError) {
        MensajeError('redimensionarControles', bsError);
    }
}

function buscar() {
    try {
        eds.Viewport1.el.mask('Buscando...', 'x-loading-mask', false);
        Cool.zMetConsultaEmbarques(eds.z_txtFolioViaje.getValue(),
            (eds.z_cbxOperador.getValue() ==null) ? '': eds.z_cbxOperador.getValue(),
            (eds.z_dtnFechaInicial.getValue() == null) ? '' : eds.z_dtnFechaInicial.getValue().toDateSQLRango('Inicio'),
            (eds.z_dtnFechaFinal.getValue() == null) ? '' : eds.z_dtnFechaFinal.getValue().toDateSQLRango('Fin'),
               {
                   timout: 300000,
                   method: 'GET',
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
                           Ext.Msg.alert('Alerta', 'Error de Comunicación con el Servidor');
                       }

                   },
                   failure: function (msg) {
                       //eds.z_GrdPnl_Detalle.el.unmask();
                       Ext.Msg.alert('Alerta', 'Error de Comunicación con el Servidor');

                   }
               });
        //}
    } catch (ex) {
        Ext.Msg.alert('Error', ex);
    }
}

function limpiar() {
    eds.z_txtFolioViaje.setValue('');
    eds.z_cbxOperador.clear();
    eds.z_dtnFechaInicial.clear();
    eds.z_dtnFechaFinal.clear();
    eds.z_strBusqueda.removeAll();
    // eds.z_GrdPnl_Detalle.remove();
}

function incializaCalendariosRange(calInicia, calFinal) {
    var fechaActual = new Date();
    calInicia.setValue(fechaActual);
    calFinal.setValue(fechaActual);

    calInicia.setMaxValue(calFinal.getValue());
    calFinal.setMaxValue(fechaActual);
    calFinal.setMinValue(calInicia.getValue());
}

var onKeyUp = function (field) {
    var v = this.getRawValue(),
        field;

    if (this.startDateField) {
        field = Ext.getCmp(this.startDateField);
        field.setMaxValue();
        this.dateRangeMax = null;
    } else if (this.endDateField) {
        field = Ext.getCmp(this.endDateField);
        field.setMinValue();
        this.dateRangeMin = null;
    }

    field.validate();
};

function ExportaExcel() {
    try{
        var obj_exportaExcel = new objExportaExcel.Exportar();
        obj_exportaExcel.exportaDocExcel('../Aspx/Rpt_Excel.aspx', '../xslt/OE_SmarthPhone.xslt', Ext.encode(eds.z_GrdPnl_Detalle.getStore().getRecordsValues()));
    } catch (ex) {
        MensajeError('ExportaExcel', ex.description);
    }
}