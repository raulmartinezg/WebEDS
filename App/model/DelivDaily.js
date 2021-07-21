Ext.define('App.model.DelivDaily', {
    extend: 'Ext.data.Model',
    idProperty: 'ClaveNivelSerDiario',
    schema: {
        namespace: 'EdsNew.model'
    },
    fields: [
        { name: 'ClaveNivelSerDiario', type: 'int' },
        { name: 'Anio', type: 'int' },
        { name: 'Mes', type: 'int' },
        { name: 'Dia', type: 'int' },
        { name: 'Total', type: 'int' },
        { name: 'ATiempo', type: 'int' },
        { name: 'Tarde', type: 'int' },
        { name: 'SinDatos', type: 'int' },
        { name: 'PorcATiempo', type: 'int' },
        { name: 'Target', type: 'int' }
    ]
});
