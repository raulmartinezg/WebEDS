Ext.define('App.view.diario.BrowseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.diarioviewmodel',
    data: {
        "ClaveFolioViaje": 79723,
        "Fecha": "2021-02-11T00: 00:00-06:00",
        "RutaClasificada": "No Clasificada",
        "FolioViaje": "G0078618",
        "Unidad": 7072,
        "TipoUnidad": "Rabon",
        "Nombre": "MANCILLA ESTRADA CARLOS",
        "Concesionarios": 2,
        "Embarques": 2,
        "Items": 200,
        "PorcentajeCarga": 100,
        "UltimaCiudad": "Guadalajara(JAL)",
        "NumeroConcesionario": "BAN1716",
        "Rebotes": 0,
        "DiasTransito": "14 hrs.",
        "Dealer": "PLANTA JALISCO"
    },
    stores: {
    /* model: Ext.create('App.model.Diario'), */
        DiarioStore: {
            model: Ext.create('App.model.Diario'),
            autoLoad: true,
            groupField: "RutaClasificada",
            sorters: [
                {
                    direction: "ASC",
                    property: "Fecha"
                }
            ],
            proxy: {
                type: 'memory'
            },
        }
    },
});
