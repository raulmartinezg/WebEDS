
function conciliaControlesDateRange(zDatFldRangoInicial, zDatFldRangoFinal) {
    if (zDatFldRangoInicial.getValue() == null && zDatFldRangoFinal.getValue() != null) {
        zDatFldRangoInicial.setValue(zDatFldRangoFinal.getValue());
    }
    if (zDatFldRangoFinal.getValue() == null && zDatFldRangoInicial.getValue() != null) {
        zDatFldRangoFinal.setValue(zDatFldRangoInicial.getValue());
    }
}

if (!Date.toDateSQLRango)
    Date.prototype.toDateSQLRango = function(tipo) {
        // var dtDate;
        var resultado;
        if (typeof(this) == "object") {
            resultado =
            (new String(
                this.getFullYear() + '-'
                    + (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1) + '-'
                    + (this.getDate() < 10 ? '0' : '') + this.getDate() + ' '));
            switch (tipo) {
            case 'Inicio':
                resultado += '00:00:00';
                break;
            case 'Fin':
                resultado += '23:59:59';
                break;
            default:
                resultado += (new String(
                    (this.getHours() < 9 ? '0' : '') + this.getHours() + ':'
                        + (this.getMinutes() < 9 ? '0' : '') + this.getMinutes() + ':'
                        + (this.getSeconds() < 9 ? '0' : '') + this.getSeconds()));
                break;
            }
        } else {
            resultado = "undefined";
        }
        return resultado;
    };

if (!Date.toDateSQLRepServ)
    Date.prototype.toDateSQLRepServ = function () {
        var resultado;
        if (typeof (this) == "object") {
            resultado =
            (new String(
                (this.getDate() < 10 ? '0' : '') + this.getDate() + ' ')) + '/'
                    + (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1) + '/'
                    + this.getFullYear();
        } else {
            resultado = "undefined";
        }
        return resultado;
    };

function MensajeError(titulo, mensaje, tipoMensaje) {
    try {

        var formatoMsj = '<span style="color:{0};">{1}</span>';
        var zTitulo = '';
        var zMensaje = '';

        switch (tipoMensaje) {
            case 0:
                zTitulo = Ext.String.format(formatoMsj, "red", "Excepción de ejecución");
                zMensaje = Ext.String.format(formatoMsj, "red", "<b>Excepción en:</b><br>" + titulo) + mensaje;
                break;
            case 1:
                zTitulo = Ext.String.format(formatoMsj, "green", "Mensaje del Sistema");
                zMensaje = Ext.String.format(formatoMsj, "green", "<strong>Mensaje de Sistema:</strong><br>", titulo) + ': ' + mensaje;
        }

        window.Ext.net.Notification.show({
            iconCls: 'chart2',
            title: zTitulo,
            html: zMensaje,
            autoScroll: true,
            hideDelay: 3000,
            width: 400,
            height: 200,
            hideFx: {
                args: ['r', {}],
                fxName: 'slideOut'
            },
            showFx: {
                args: ['r', {}],
                fxName: 'slideIn'
            },
            pinEvent: 'click',
            bodyStyle: 'padding:10px',
            shadow: true
        });

    } catch (bsError) {
        Ext.Msg.alert('Error en fn:MensajeError', bsError.description);
    }

}
function menucont() {
    function disableselect(e) { return false }
    function reEnable() { return true }
    document.oncontextmenu = new Function("return false");
    document.onselectstart = new Function("return false");
    if (window.sidebar) { document.onmousedown = disableselect; document.onclick = reEnable; }
}

function TamVentana() {
    var Tamanyo = [0, 0];
    if (typeof window.innerWidth != 'undefined') { Tamanyo = [window.innerWidth, window.innerHeight]; }
    else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
        Tamanyo = [document.documentElement.clientWidth, document.documentElement.clientHeight];
    } else {
        Tamanyo = [document.getElementsByTagName('body')[0].clientWidth, document.getElementsByTagName('body')[0].clientHeight];
    }
    return Tamanyo; 
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

function incializaCalendariosRange(calInicia, calFinal) {
    var fechaActual = new Date();
    calInicia.setValue(fechaActual);
    calFinal.setValue(fechaActual);

    calInicia.setMaxValue(calFinal.getValue());
    calFinal.setMaxValue(fechaActual);
    calFinal.setMinValue(calInicia.getValue());
}