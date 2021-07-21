var linkRenderer = function (value, meta, record) {
    return window.Ext.String.format("<a class='embarques-link' href='#' onclick='linkClick({1},{2});'>{0}</a>", value, record.data.ClaveRuta, record.data.ClaveCiudad);
};

var linkClick = function (ClaveRuta, ClaveCiudad) {    
    //alert(ClaveRuta + ' ,' + ClaveCiudad);
    
    try {      
        //window.App.z_store_CiudadConcesionario.clearFilter(true);       
        window.App.z_store_CiudadConcesionario.filter("ClaveRuta", ClaveRuta);
        window.App.z_store_CiudadConcesionario.filter("ClaveCiudad", ClaveCiudad);       


        var embarques = "";
        for (var i = 0; i < window.App.z_store_CiudadConcesionario.data.length; i++) {
            embarques += '<b>' + window.App.z_store_CiudadConcesionario.data.items[i].data.NumeroConcesionario + '</b></br>';
        }

        window.Ext.net.Notification.show({
            iconCls: 'icon-exclamation',
            html: embarques,
            title: "Concesionarios" ,
            autoScroll: true,
            hideDelay: 3000,
            width: 160,
            height: 200,
            alignToCfg: {
                offset: [20, 20],
                el: window.Ext.net.getEl('Column33'),
                position: 'b-r'
            },
            hideFx: {
                args: ['r', {}],
                fxName: 'slideOut'
            },
            showFx: {
                args: ['tr', {
                    easing: 'bounceOut',
                    duration: 1000
                }],
                fxName: 'slideIn'
            },
            pinEvent: 'click',
            bodyStyle: 'padding:10px',
            shadow: true
        });
        window.App.z_store_CiudadConcesionario.clearFilter(true);
    } catch (bserror) {
        MensajeError('linkClick', bserror, 0);
    }
};


var paramCargarGuia = function () {
    return {
        Param0: window.App.txtfld_NumeroGuia.getValue()
       
    };
};

function ZUfn_CargarGuia() {
    try {
        window.App.z_TabPnl_RepGuias.body.mask("Cargando Datos...", "x-mask-loading");
        window.Cool.ZdirmeCargarGuia(paramCargarGuia(),
            {
                success: function (resultado) {
                    window.App.z_TabPnl_RepGuias.body.unmask();
                    var jsnResultado = eval('(' + resultado + ')');
                    if (jsnResultado.Rows[0].CtlCve === "SQL_OK") {

                    } else if (jsnResultado.Rows[0].CtlCve === "SQL_ERROR") {
                        window.MensajeError("ZUfn_CargarGuia", jsnResultado.Rows[0].CtlObs, 1);
                    } else if (jsnResultado.Rows[0].CtlCve === "SQL_VACIO") {
                        window.MensajeError("ZUfn_CargarGuia", 'No existe información bajo los criterios seleccionados', 1);
                    }
                    else {
                        window.MensajeError("ZUfn_CargarGuia", 'Error de comunicación con el Servidor', 1);
                    }
                }, failure: function (msg) {
                    window.App.z_TabPnl_RepGuias.body.unmask();
                    MensajeError('ZUfn_CargarGuia', 'Error de Comunicación con el Servidor', 0);
                }
            });
    } catch (bsError) {
        window.App.z_TabPnl_RepGuias.body.unmask();
        MensajeError('ZUfn_CargarGuia', bsError, 0);
    }
}


function reinicioControlesFiltro(modo) {
    switch (modo) {
        case 'Filtros':
            window.App.txtfld_NumeroGuia.reset();
            window.App.z_Store_Resultado.removeAll();
            return;
        case 'Detalle':
            window.App.lbl_Guia.reset();
            window.App.lbl_Dist.reset();
            window.App.lbl_Rampa.reset();
            window.App.lbl_Folio.reset();
            window.App.lbl_Unidad.reset();
            return;
        case 'Consulta':
            window.App.lbl_Guia.reset();
            window.App.lbl_Dist.reset();
            window.App.lbl_Rampa.reset();
            window.App.lbl_Folio.reset();
            window.App.lbl_Unidad.reset();
            window.App.txtfld_NumeroGuia.reset();
            window.App.z_Store_Resultado.removeAll();
            return;
        case 'Consulta1':
            window.App.lbl_NumeroViaje.reset();
            window.App.lbl_Operador.reset();
            window.App.lbl_NumUnidad.reset();
            window.App.lbl_Ayudante.reset();
            window.App.z_store_InfoGral.removeAll();
            window.App.z_store_RutaCiudad.removeAll();
            window.App.z_store_CiudadConcesionario.removeAll();
            window.App.z_cmbViaje.reset();

            return;
        default:
            window.App.txtfld_NumeroGuia.reset();
            window.App.z_Store_Resultado.removeAll();
            window.App.z_store_InfoGral.removeAll();
            window.App.z_store_RutaCiudad.removeAll
            window.App.z_store_CiudadConcesionario.removeAll();
            ////////////////////
            window.App.lbl_Guia.reset();
            window.App.lbl_Dist.reset();
            window.App.lbl_Rampa.reset();
            window.App.lbl_Folio.reset();
            window.App.lbl_Unidad.reset();
            window.App.lbl_NumeroViaje.reset();
            window.App.lbl_Operador.reset();
            window.App.lbl_NumUnidad.reset();
            window.App.lbl_Ayudante.reset();
            
    }
}

function MostrarDetalleEmbarque() {
    try {
        reinicioControlesFiltro('Detalle');
        window.App.z_viewPort_Principal.el.mask('Obteniendo Datos...', 'x-loading-mask', false);
        window.App.lbl_ClaveGuia.setValue(window.App.z_GrdPnl_Resultado.selModel.selected.items[0].data.ClaveGuia);
        window.App.lbl_ClaveFV.setValue(window.App.z_GrdPnl_Resultado.selModel.selected.items[0].data.ClaveFolioViaje);
        window.App.lbl_Guia.setValue(window.App.z_GrdPnl_Resultado.selModel.selected.items[0].data.Guia);
        window.App.lbl_Dist.setValue(window.App.z_GrdPnl_Resultado.selModel.selected.items[0].data.NumeroConcCte);
        window.App.lbl_Rampa.setValue(window.App.z_GrdPnl_Resultado.selModel.selected.items[0].data.Rampa);
        window.App.lbl_Folio.setValue(window.App.z_GrdPnl_Resultado.selModel.selected.items[0].data.FolioViaje);
        window.App.lbl_Unidad.setValue(window.App.z_GrdPnl_Resultado.selModel.selected.items[0].data.Numero);

        window.App.TabDetalles.enable();
        window.App.TabDetalles.show();
       
    } catch (bsError) {
        MensajeError('MostrarDetalleEmbarque', bsError, 0);
        window.App.z_viewPort_Principal.el.unmask();
    }

    window.App.z_viewPort_Principal.el.unmask();
}


var paramModificaGuia = function () {
    return {
       // Param0: window.App.lbl_Guia.getValue()
        Param0: window.App.lbl_ClaveGuia.getValue(),
        Param1: window.App.lbl_ClaveFV.getValue()
        

    };
};


function ZUfn_ModificaGuia() {
    try {
        window.App.z_TabPnl_RepGuias.body.mask("Cargando Datos...", "x-mask-loading");
        window.Cool.ZdirmeModificaGuia(paramModificaGuia(),
            {
                success: function (resultado) {
                    window.App.z_TabPnl_RepGuias.body.unmask();
                    var jsnResultado = eval('(' + resultado + ')');
                    if (jsnResultado.Rows[0].CtlCve == "SQL_OK") {
                        MensajeError("ZUfn_ModificaGuia", "La Guia se DesAsigno Correctamente", 1);

                    } else if (jsnResultado.Rows[0].CtlCve == "SQL_ERROR") {
                        MensajeError("ZUfn_ModificaGuia", jsnResultado.Rows[0].CtlObs, 1);
                    } else {
                        MensajeError("ZUfn_ModificaGuia", 'Error de comunicación con el Servidor', 1);
                    }
                }, failure: function (msg) {
                    window.App.z_TabPnl_RepGuias.body.unmask();
                    MensajeError('ZUfn_ModificaGuia', 'Error de Comunicación con el Servidor', 0);
                }
            });

        reinicioControlesFiltro('Consulta');
        //window.Ext.Msg.alert('Mensaje', "Transaccion exitosa");
        window.App.Panel1.enable();
        window.App.Panel1.show();
       

    } catch (bsError) {
        window.App.z_TabPnl_RepGuias.body.unmask();
        MensajeError('ZUfn_ModificaGuia', bsError, 0);
    }
}


function ZUfn_ViajeRuta() {
    try {
        window.App.z_TabPnl_RepGuias.body.mask("Cargando Datos...", "x-mask-loading");
        window.Cool.ZdirViajeRuta(
            {
                success: function (resultado) {
                    window.App.z_TabPnl_RepGuias.body.unmask();
                    var jsnResultado = eval('(' + resultado + ')');
                    if (jsnResultado.Rows[0].CtlCve == "SQL_OK") {

                    } else if (jsnResultado.Rows[0].CtlCve == "SQL_ERROR") {
                        MensajeError("ZUfn_ViajeRuta", jsnResultado.Rows[0].CtlObs, 1);
                    } else if (jsnResultado.Rows[0].CtlCve == "SQL_VACIO") {
                        MensajeError("ZUfn_ViajeRuta", 'No existe información bajo los criterios seleccionados', 1);
                    }
                    else {
                        MensajeError("ZUfn_ViajeRuta", 'Error de comunicación con el Servidor', 1);
                    }
                }, failure: function (msg) {
                    window.App.z_TabPnl_RepGuias.body.unmask();
                    MensajeError('ZUfn_ViajeRuta', 'Error de Comunicación con el Servidor', 0);
                }
            });
      
    } catch (bsError) {
        window.App.z_TabPnl_RepGuias.body.unmask();
        MensajeError('ZUfn_ViajeRuta', bsError, 0);
    }   
}


function ZUfn_ComboViaje() {
    try {
        window.Cool.ZdirmeLlenaCombo(
            {
                success: function (resultado) {                    
                    var jsnResultado = eval('(' + resultado + ')');
                    if (jsnResultado.Rows[0].CtlCve == "SQL_OK") {
                    } else if (jsnResultado.Rows[0].CtlCve == "SQL_ERROR") {
                        MensajeError("ZUfn_ComboViaje", jsnResultado.Rows[0].CtlObs, 1);
                    } else if (jsnResultado.Rows[0].CtlCve == "SQL_VACIO") {
                        MensajeError("ZUfn_ComboViaje", 'No existe información bajo los criterios seleccionados', 1);
                    }
                    else {
                        MensajeError("ZUfn_ComboViaje", 'Error de comunicación con el Servidor', 1);
                    }
                }, failure: function (msg) {
                    
                    MensajeError('ZUfn_ComboViaje', 'Error de Comunicación con el Servidor', 0);
                }
            });

    } catch (bsError) {
       
        MensajeError('ZUfn_ComboViaje', bsError, 0);
    }
}

function ZUfn_Act_ComboViaje() {
    try {
        window.Cool.ZdirmeLlenaCombo(
            {
                success: function (resultado) {
                    var jsnResultado = eval('(' + resultado + ')');
                    if (jsnResultado.Rows[0].CtlCve == "SQL_OK") {
                    } else if (jsnResultado.Rows[0].CtlCve == "SQL_ERROR") {
                        MensajeError("ZUfn_ComboViaje", jsnResultado.Rows[0].CtlObs, 1);
                    } else if (jsnResultado.Rows[0].CtlCve == "SQL_VACIO") {
                        MensajeError("ZUfn_ComboViaje", 'No existe información bajo los criterios seleccionados', 1);
                    }
                    else {
                        MensajeError("ZUfn_ComboViaje", 'Error de comunicación con el Servidor', 1);
                    }
                }, failure: function (msg) {

                    MensajeError('ZUfn_ComboViaje', 'Error de Comunicación con el Servidor', 0);
                }
            });

    } catch (bsError) {

        MensajeError('ZUfn_ComboViaje', bsError, 0);
    }
}


function ZUfn_Sec_ComboViaje(CveViaje) {
    try {
        window.Cool.ZdirmeRutaCiudad(CveViaje,
            {
                success: function (resultado) {
                    var jsnResultado = eval('(' + resultado + ')');
                    if (jsnResultado.Rows[0].CtlCve == "SQL_OK") {
                    } else if (jsnResultado.Rows[0].CtlCve == "SQL_ERROR") {
                        MensajeError("ZUfn_ComboViaje", jsnResultado.Rows[0].CtlObs, 1);
                    } else if (jsnResultado.Rows[0].CtlCve == "SQL_VACIO") {
                        MensajeError("ZUfn_ComboViaje", 'No existe información bajo los criterios seleccionados', 1);
                    }
                    else {
                        MensajeError("ZUfn_ComboViaje", 'Error de comunicación con el Servidor', 1);
                    }
                }, failure: function (msg) {

                    MensajeError('ZUfn_ComboViaje', 'Error de Comunicación con el Servidor', 0);
                }
            });

    } catch (bsError) {

        MensajeError('ZUfn_ComboViaje', bsError, 0);
    }
}




