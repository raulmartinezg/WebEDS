Ext.define('App.AppReporteTerminales',
 {

     cargaDatos: function () {
         try {
             window.lmApp.LumaData.getDmJsonResult("dbo", "SPQRY_ReporteTerminales", this.tools.paramsCargarDatos(), function (resultado) {

                 App.AppReporteTerminales.reiniciaForma("Busqueda");
                 window.lmApp.lbl_OpTerminal.setText(resultado.Table[0].Op);
                 window.lmApp.lbl_TotViajes.setText(resultado.Table1[0].TotFolios);
                 window.lmApp.lbl_TotEntregas.setText(resultado.Table1[0].TotalEntregas);
                 window.lmApp.lbl_Guias.setText(resultado.Table1[0].TotalGuias);
                 window.lmApp.lbl_TotCaptura.setText(resultado.Table1[0].TotCapturaOptica);
                 window.lmApp.lbl_TotSinCap.setText(resultado.Table1[0].TotSinCaptura);
                 window.lmApp.lbl_TerUtilizada.setText(resultado.Table4[0].Noterminales);
                 //--------------
                 window.lmApp.lbl_OpTerminal1.setText(resultado.Table[0].Op);
                 window.lmApp.lbl_TotViajes1.setText(resultado.Table1[0].TotFolios);
                 window.lmApp.lbl_TotEntregas1.setText(resultado.Table1[0].TotalEntregas);
                 window.lmApp.lbl_Guias1.setText(resultado.Table1[0].TotalGuias);
                 window.lmApp.lbl_TotCaptura1.setText(resultado.Table1[0].TotCapturaOptica);
                 window.lmApp.lbl_TotSinCap1.setText(resultado.Table1[0].TotSinCaptura);
                 window.lmApp.lbl_TerUtilizada1.setText(resultado.Table4[0].Noterminales);
                 //---------
                 window.lmApp.zStore_GridDetalle.loadData(resultado.Table2);
                 window.lmApp.zStore_UsoTer.loadData(resultado.Table3);
                 

             });
         } catch (bsError) {
             MensajeError('cargaDatos', bsError, 0);
             window.lmApp.viewport1.el.unmask();
         }
     },
     cargaGcaOP: function () {
         try {
             window.lmApp.LumaData.getDmJsonResult("dbo", "SPQRY_GraficaOP", function (resultado) {

                 window.lmApp.zStore_GcaOP.loadData(resultado.Table);
                 window.lmApp.zPnlGraficaOP.show();
                 
             });
         } catch (bsError) {
             MensajeError('cargaGcaOP', bsError, 0);
             window.lmApp.viewport1.el.unmask();
         }
     },
     init: function () {
// ReSharper disable once InconsistentNaming
         var Fecha = new Date();
         var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() + 1) + "/" + Fecha.getFullYear());
         var sep = sFecha.indexOf('/') != -1 ? '/' : '-';
         var aFecha = sFecha.split(sep);
         var fecha = aFecha[2] + '/' + aFecha[1] + '/' + aFecha[0];
         fecha = new Date(fecha);
         fecha.setDate(fecha.getDate() - parseInt(15));
         var anno = fecha.getFullYear();
         var mes = fecha.getMonth() + 1;
         var dia = fecha.getDate();
         mes = (mes < 10) ? ("0" + mes) : mes;
         dia = (dia < 10) ? ("0" + dia) : dia;
         var fechaini = dia + sep + mes + sep + anno;
         
         window.lmApp.zdtnInicial.setValue(fechaini);
         window.lmApp.zdtnFinal.setValue(Fecha);
         
         window.lmApp.LumaData.getDmJsonResult("dbo", "SPQRY_GraficaOP", {}, function (resultado) {

             window.lmApp.zStore_GcaOP.loadData(resultado.Table);
             window.lmApp.zPnlGraficaOP.show();

         });

         

     },
     reiniciaForma: function (modo) {
         switch (modo) {
             case 'Filtros':
                 window.App.AppReporteTerminales.init();
                 window.lmApp.zStore_GridDetalle.removeAll();
                 window.lmApp.zStore_UsoTer.removeAll();
                 window.lmApp.lbl_OpTerminal.setText('-');
                 window.lmApp.lbl_TotViajes.setText('-');
                 window.lmApp.lbl_TotEntregas.setText('-');
                 window.lmApp.lbl_Guias.setText('-');
                 window.lmApp.lbl_TotCaptura.setText('-');
                 window.lmApp.lbl_TotSinCap.setText('-');
                 window.lmApp.zbtn_SwitchGraficaGrid.setDisabled(true);
          break;
             case 'Busqueda':
                 window.lmApp.zStore_GridDetalle.removeAll();
                 window.lmApp.zStore_UsoTer.removeAll();
                 window.lmApp.lbl_OpTerminal.setText('-');
                 window.lmApp.lbl_TotViajes.setText('-');
                 window.lmApp.lbl_TotEntregas.setText('-');
                 window.lmApp.lbl_Guias.setText('-');
                 window.lmApp.lbl_TotCaptura.setText('-');
                 window.lmApp.lbl_TotSinCap.setText('-');
                 window.lmApp.zbtn_SwitchGraficaGrid.setDisabled(false);
                 window.lmApp.zPnlGrafica.show();
                 window.lmApp.zPnlGraficaOP.hide();
                 break;
             default:
                 window.App.AppReporteTerminales.init();
                 window.lmApp.zStore_GridDetalle.removeAll();
                 window.lmApp.zStore_UsoTer.removeAll();
                 window.lmApp.lbl_OpTerminal.setText('-');
                 window.lmApp.lbl_TotViajes.setText('-');
                 window.lmApp.lbl_TotEntregas.setText('-');
                 window.lmApp.lbl_Guias.setText('-');
                 window.lmApp.lbl_TotCaptura.setText('-');
                 window.lmApp.lbl_TotSinCap.setText('-');
                 window.lmApp.zbtn_SwitchGraficaGrid.setDisabled(true);
                 window.lmApp.zReporte.hide();
                 window.lmApp.zPnlGrafica.hide();
                 
         }
     },
     singleton: true,
     SwitchGraficaGrid: function () {
         try {
             with (window.App) {
                 if (!window.lmApp.zPnlGrafica.hidden) {
                     window.lmApp.zPnlGrafica.hide();
                     window.lmApp.zReporte.show();
                 } else {
                     window.lmApp.zReporte.hide();
                     window.lmApp.zPnlGrafica.show();
                 }
             }
         } catch (ex) {
             MensajeError("SwitchGraficaGrid", ex, 0);
         }
     },
     tools: {
         onKeyUp: function (field) {
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
         },
         paramsCargarDatos: function () {
             return {
                 Param0: Ext.isEmpty(window.lmApp.zdtnInicial.getValue()) ? '' : window.lmApp.zdtnInicial.getValue().toDateSQLRango('Inicio'),
                 Param1: Ext.isEmpty(window.lmApp.zdtnFinal.getValue()) ? '' : window.lmApp.zdtnFinal.getValue().toDateSQLRango('Fin')
             };
         }
     }
 });

Ext.define('lmApp.LumaData',
    {
        config: {
            esquema: 'dbo',
            servidorBd: 'con02',
            catalogo: 'PaqueTUM',
            urlWs: ''
        },
        singleton: true,
        getDmJsonResult: function (esquema, spNombre, jsonParams, fnCallBack) {
            try {
                Ext.net.DirectMethod.request("SpGetJsonResult", {
                    success: function (msgJson) {
                        var jsnResultado = Ext.decode(msgJson, true);
                        if (Ext.typeOf(jsnResultado.Rows) !== "array") {
                            fnCallBack(jsnResultado);
                        } else {
                            if (jsnResultado.Rows[0].CtlCve === "SQL_OK") {
                            } else if (jsnResultado.Rows[0].CtlCve === "SQL_ERROR") {
                                MensajeError(jsnResultado.Rows[0].CtlCve, jsnResultado.Rows[0].CtlObs, 1);
                            } else if (jsnResultado.Rows[0].CtlCve === "SQL_VACIO") {
                                MensajeError(spNombre, 'No existe información bajo los criterios seleccionados', 1);
                            } else if (jsnResultado.Rows[0].CtlCve === "IIS_ERROR") {
                                MensajeError(Procedimiento, jsnResultado.Rows[0].CtlCve, 1);
                            } else {
                                MensajeError(Procedimiento, 'Error de comunicación con el Servidor', 1);
                            }
                        }
                    },
                    failure: function (result) {
                        MensajeError('Error de Comunicación con el Servidor', result, 0);
                    },
                    eventMask:
                        {
                            msg: 'Obteniendo datos...',
                            showMask: true
                        },
                    params: {
                        esquema: esquema,
                        procedimiento: spNombre,
                        jsonParams: jsonParams,
                        servidorBd: 'con02',
                        catalogo: 'PaqueTUM'
                    },
                    specifier: "static",
                    url: "ReporteTerminales.aspx"
                });
            } catch (bsError) {
                MensajeError(spNombre, bsError, 0);
            }
        }
    });