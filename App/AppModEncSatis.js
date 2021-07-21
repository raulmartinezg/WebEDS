

Ext.define("App.AppModEncSatis",
    {
        buildApp: function (id) {
            var a = {};
            try {
                a = {
                    xtype: 'panel',
                    layout: 'border',
                    id: id,
                    title: 'Encuesta de Satisfacción',
                    closable: false,
                    items: [
                        this.buildPanelNorte(),
                        App.AppModEncSatis.buildPanelCentro() 
                    ]
                };
            } catch (bsError) {
                Datum.Tools.msgSistema('App.AppModEncSatis.buildApp', bsError, 0);
            }
            return a;
        },
        buildPanelNorte: function() {
            return {
                padding: 2,
                items: [
                    {
                        height: 70,
                        itemId: 'img2',
                        padding: "0 0 0 40",
                        src: './Imagenes/Nissan_logo.png',
                        width: 120,
                        xtype: "image"
                    }, {
                        border: true,
                        html: "<h2 style='font-family:Montserrat,Verdana,Arial,Helvetica,sans-serif;font-size:2em;color:#FE6100'>Satisfacción del cliente</h2>",
                        flex: 1,
                        margin: "0 0 0 15",
                        padding: "0 0 0 40",
                        xtype: "fieldset"
                    }, {
                        height: 75,
                        itemId: 'img1',
                        src: './Imagenes/eds_logo.png',
                        width: 120,
                        xtype: "image"
                    }
                ],
                layout: "hbox",
                margin: "0 5 5 5",
                xtype: "fieldset",
                region: "north"
            }
        },
        buildPanelCentro: function() {
            return {
                style: "background-color:#ED9200;",
                bodyPadding: 10,
                region: "center",
                scrollable: 'y',
                items: [
                {
                    title: 'Ayúdenos a mejorar',
                    frame: true,
                        bodyPadding: 5,
                        layout: "anchor",
                        /* url: 'save-form.php', */
                        items: [
                            {
                                layout: 'hbox',
                                title: 'Control de Calidad en el Servicio',
                                bodyPadding: 10,
                                defaults: {
                                    labelWidth: 400,
                                    layout: 'vbox',
                                    defaultType: 'textfield',
                                    width:800
                                },

                                items: [
                                    {
                                        xtype: 'fieldset',
                                        padding:8,
                                        flex:1,
                                        layout: 'anchor',
                                        defaults: {
                                            allowBlank: false,
                                            anchor: '100%',
                                            labelWidth: 160,
                                            defaultType: 'textfield'
                                        },
                                        items: [
                                            {
                                                name: 'name',
                                                fieldLabel: 'Nombre del Distribuidor',
                                            }, {
                                                name: 'name',
                                                fieldLabel: 'Número de Distribuidor',
                                            }, {
                                                name: 'name',
                                                fieldLabel: 'Correo Electrónico',
                                                vtype: 'email'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        padding: 8,
                                        flex: 1,
                                        layout:'anchor',
                                        defaults: {
                                            allowBlank: false,
                                            anchor:'100%',
                                            labelWidth: 160,
                                            defaultType: 'textfield'
                                        },
                                        items: [
                                            {
                                                id:'zTxtFldFechaEncuesta',
                                                name: 'name',
                                                fieldLabel: 'Fecha de Registro',
                                                readOnly:true
                                            }, {
                                                name: 'name',
                                                fieldLabel: 'Número de Unidad',
                                            }, {
                                                name: 'name',
                                                fieldLabel: 'Nombre del Operador',
                                                vtype: 'email'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                bodyPadding: 10,
                                defaultType: 'fieldcontainer',
                                xtype: 'fieldset',
                                title: 'Evaluación de entrega por viaje',
                                checkboxToggle: true,
                                collapsed: false, // fieldset initially collapsed
                                layout: 'anchor',
                                defaults: {
                                    labelWidth: 400,
                                    layout: 'hbox',
                                    defaultType: 'radiofield'
                                },
                                items: [
                                    {
                                        fieldLabel: '¿Se cumple con el horario de Entrega?',
                                        items: [
                                            { boxLabel: 'SI', name: 'rb1', inputValue: true, checked: true },
                                            { boxLabel: 'NO', name: 'rb1', inputValue: false }
                                        ]
                                    },
                                    {
                                        fieldLabel: '¿La Unidad cuenta con Equipo logístico?',
                                        items: [
                                            { boxLabel: 'SI', name: 'rb2', inputValue: true, checked: true },
                                            { boxLabel: 'NO', name: 'rb2', inputValue: false }
                                        ]
                                    },
                                    {
                                        fieldLabel: '¿El Operador coloca de nuevo el equipo logístico al término de su entrega?',
                                        items: [
                                            { boxLabel: 'SI', name: 'rb3', inputValue: true, checked: true },
                                            { boxLabel: 'NO', name: 'rb3', inputValue: false }
                                        ]
                                    },
                                    {
                                        fieldLabel: '¿Documentación completa que ampara le entrega?',
                                        items: [
                                            { boxLabel: 'SI', name: 'rb4', inputValue: true, checked: true },
                                            { boxLabel: 'NO', name: 'rb4', inputValue: false }
                                        ]
                                    },
                                    {
                                        fieldLabel: '¿Condiciones en que recibe las autopartes?',
                                        items: [
                                            { boxLabel: 'Excelente', name: 'rb5', inputValue: 1, checked: true },
                                            { boxLabel: 'Bueno', name: 'rb5', inputValue: 2 },
                                            { boxLabel: 'Regular', name: 'rb5', inputValue: 3 },
                                            { boxLabel: 'Deficiente', name: 'rb5', inputValue: 4 }
                                        ]
                                    },
                                    {
                                        fieldLabel: '¿La actitud del personal de su servicio fue?',
                                        items: [
                                            { boxLabel: 'Excelente', name: 'rb6', inputValue: 1, checked: true },
                                            { boxLabel: 'Bueno', name: 'rb6', inputValue: 2 },
                                            { boxLabel: 'Regular', name: 'rb6', inputValue: 3 },
                                            { boxLabel: 'Deficiente', name: 'rb6', inputValue: 4 }
                                        ]
                                    },
                                    {
                                        fieldLabel: '¿Presentación e higiene del personal al servicio?',
                                        items: [
                                            { boxLabel: 'Excelente', name: 'rb7', inputValue: 1, checked: true },
                                            { boxLabel: 'Bueno', name: 'rb7', inputValue: 2 },
                                            { boxLabel: 'Regular', name: 'rb7', inputValue: 3 },
                                            { boxLabel: 'Deficiente', name: 'rb7', inputValue: 4 }
                                        ]
                                    }
                                ]
                            },
                            {
                                layout: 'hbox',
                                title: 'La calificación que usted otorgue será tomada en cuenta para evaluar el desempeño del Operador',
                                bodyPadding: 10,
                                items: [
                                    {
                                        xtype: 'textareafield',
                                        padding:'8 20 0 0 ',
                                        grow: true,
                                        name: 'message',
                                        fieldLabel: 'Comentarios',
                                        width: '700'
                                    },
                                    {
                                        flex: 1,
                                        xtype: 'fieldset',
                                        title: 'Registre sus datos para contacto:',
                                        layout: 'vbox',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                name: 'name',
                                                fieldLabel: 'Distribuidor',
                                                allowBlank: false
                                            }, {
                                                xtype: 'textfield',
                                                name: 'name',
                                                fieldLabel: 'Correo Electrónico',
                                                allowBlank: false,
                                                vtype: 'email'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        // Reset and Submit buttons
                        buttons: [
                            {
                                text: 'Restablecer',
                                handler: function() {
                                    this.up('form').getForm().reset();
                                }
                            }, {
                                text: 'Enviar',
                                formBind: true, //only enabled once the form is valid
                                disabled: true,
                                handler: function() {
                                    var form = this.up('form').getForm();
                                    if (form.isValid()) {
                                        Ext.Msg.alert('Mensaje del Sistema', "Información guardada");
                                        /*form.submit({
                                            success: function(form, action) {
                                                Ext.Msg.alert('Success', action.result.msg);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert('Failed', action.result.msg);
                                            }
                                        });*/
                                    }
                                }
                            }
                        ],
                        xtype: "form"
                    }
                ]
            }
        },
        cargaDatos: function () {
            try {
                var a = App.AppModEncSatis.getGrid();
                var b = App.AppModEncSatis.getCalendarios();
                var c = App.AppModEncSatis.getExcel();
                var d = Ext.ComponentQuery.query('#zTabRptViajesEficiencia #zBtnGraficas')[0];
                var e = Ext.ComponentQuery.query('#zTabRptViajesEficiencia #zGrafPromCarga')[0];
                var f = Ext.ComponentQuery.query('#zTabRptViajesEficiencia #zGrafCompViaje')[0];
                a.getStore().removeAll();
                /*e.getStore().removeAll();
                f.getStore().removeAll();*/
                Datum.LumaData.getDmJsonResult("Default.Aspx", "SpGetJsonResult", "DWH", "SPQRY_EficienciaEntregas", {
                    FechaInicial: Ext.isEmpty(b[0].getValue()) ? '' : Datum.Tools.toDateSQLRango(b[0].getValue(), "inicio"),
                    FechaFinal: Ext.isEmpty(b[1].getValue()) ? '' : Datum.Tools.toDateSQLRango(b[1].getValue(), "fin")
                }, function (resultado) {
                    a.getStore().loadData(resultado.Table);
                    /*e.getStore().loadData(resultado.Table1);
                    f.getStore().loadData(resultado.Table2);*/
                    c.setDisabled(false);
                    d.setDisabled(false);
                });
            } catch (bsError) {
                Datum.Tools.msgSistema('App.AppModEncSatis.cargaDatos', bsError, 0);
            }
        },
        config: {
            fechaActual: null
        },
        constructor: function (config) {
            this.initConfig(config);
            return this;
        },
        getExcel: function () {
            return Ext.ComponentQuery.query('#zTabRptViajesEficiencia #zBtnExcel')[0];
        },
        restablecer: function () {
            var a = App.AppModEncSatis.getGrid();
            var c = App.AppModEncSatis.getExcel();
            a.getStore().removeAll();
            c.setDisabled(true);
        },
        setFechaHora: function () {
            Datum.LumaData.getDmFechaHora("Default.Aspx", "SpGetFechaHora", function (resultado) {
                var dt = new Date(resultado);
                 App.AppModEncSatis.setFechaActual(dt);
                LmApp.zTxtFldFechaEncuesta.setValue(Ext.Date.format(dt, 'F j, Y, H:i:s'));
            });
        },
        singleton: true
    }
);