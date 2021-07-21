Ext.define('App.model.DelivMonthly', {
    extend: 'Ext.data.Model',
    idProperty: 'ClaveNivelSerMensual',
    schema: {
        namespace: 'EdsNew.model'
    },
    fields: [
        { name: 'ClaveNivelSerMensual', type: 'int' },
        { name: 'Anio', type: 'int' },
        { name: 'Mes', type: 'int' },
        { name: 'MesL', type: 'string' },
        { name: 'Total', type: 'int' },
        { name: 'ATiempo', type: 'int' },
        { name: 'Tarde', type: 'int' },
        { name: 'SinDatos', type: 'int' },
        { name: 'PorcATiempo', type: 'int' },
        { name: 'Target', type: 'int' }
    ]
});
