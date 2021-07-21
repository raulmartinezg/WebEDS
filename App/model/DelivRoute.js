Ext.define('App.model.DelivRoute', {
    extend: 'Ext.data.Model',
    idProperty: 'ClaveNivelRutaMes',
    schema: {
        namespace: 'EdsNew.model'
    },
    fields: [
        { name: 'ClaveNivelRutaMes', type: 'int' },
        { name: 'Anio', type: 'int' },
        { name: 'Mes', type: 'int' },
        { name: 'Prefijo', type: 'string' },
        { name: 'Ruta', type: 'string' },
        { name: 'Total', type: 'int' },
        { name: 'ATiempo', type: 'int' },
        { name: 'Tarde', type: 'int' },
        { name: 'SinDatos', type: 'int' },
        { name: 'PorcATiempo', type: 'int' },
        { name: 'Target', type: 'int' }
    ]
});
