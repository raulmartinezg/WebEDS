Ext.define('App.model.Diario', {
    extend: 'Ext.data.Model',
    idProperty: 'ClaveFolioViaje',
    schema: {
        namespace: 'EdsNew.model'
    },
    fields: [
        { name: 'ClaveFolioViaje', type: 'int' },
        { name: 'Fecha', type: 'date' },
        { name: 'RutaClasificada', type: 'string' },
        { name: 'FolioViaje', type: 'string' },
        { name: 'Unidad', type: 'int' },
        { name: 'TipoUnidad', type: 'string' },
        { name: 'Nombre', type: 'string' },
        { name: 'Concesionarios', type: 'int' },
        { name: 'Embarques', type: 'int' },
        { name: 'Items', type: 'int' },
        { name: 'PorcentajeCarga', type: 'int' },
        { name: 'UltimaCiudad', type: 'string' },
        { name: 'NumeroConcesionario', type: 'string' },
        { name: 'Rebotes', type: 'int' },
        { name: 'DiasTransito', type: 'string' },
        { name: 'Dealer', type: 'string' }
        /* {name: 'location', type: 'auto', defaultValue: {"latitude": 37.4256448,"longitude": -122.1703694}} */
    ]
});
