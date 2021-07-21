Ext.define('App.view.nivelservicio.BrowseViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nivelservicioviewmodel',
    stores: {
        DeliveryDaily: {
            model: Ext.create('App.model.DelivDaily'),
            /* sorters: [
                {direction: "ASC",property: "Dia"}
            ], */
            proxy: {
                type: 'memory'
            },
        },
        DeliveryRoute: {
            model: Ext.create('App.model.DelivRoute'),
            sorters: [
                { direction: "ASC", property: "Anio" }, { direction: "ASC", property: "Mes" }, { direction: "ASC", property: "Nombre" }
            ],
            proxy: {
                type: 'memory'
            },
        },
        DeliveryMonthly: {
            model: Ext.create('App.model.DelivMonthly'),
            sorters: [
                { direction: "ASC", property: "Anio" }, { direction: "ASC", property: "Mes" }, { direction: "ASC", property: "Dia" }, { direction: "ASC", property: "Nombre" }
            ],
            proxy: {
                type: 'memory'
            },
        }
    },
});
