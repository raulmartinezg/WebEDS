Ext.define('App.view.nivelservicio.BrowseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.nivelserviciobrowse',
    control: {
        '#': {
            reset: 'refresh'
        }
    },
    config: {
    },
    init: function (view) {
        /* Ext.Msg.alert('Mensaje', 'iniciador de Controlador nivel servicio'); */
        this.setFechaHora();

        var column = Ext.create('Ext.grid.column.Column', {
            dataIndex: "Prefijo",
            text: "Prefix",
            width: 50
        });
        var grid = Ext.ComponentQuery.query('#zTabRptNivelServicio #zGrdPnl_RutaDiario')[0];
        grid.headerCt.insert(grid.columns.length, column);
        
    },
    cargaDatos: function (e, t, options) {
        try {
            var a = Ext.ComponentQuery.query('#zTabRptNivelServicio monthfield')[0];
            var btns = Ext.ComponentQuery.query('#zTabRptNivelServicio button');
            var grids = Ext.ComponentQuery.query('#zTabRptNivelServicio gridpanel')
            var graphs = Ext.ComponentQuery.query('#zTabRptNivelServicio cartesian')
            var cbo = Ext.ComponentQuery.query('#zTabRptNivelServicio combobox')[0];
            cbo.reset();
            Ext.Array.each(grids, function (name, index, gridsItSelf) {
                name.getStore().removeAll();
            });
            var fecIni = Ext.Date.format(a.getValue(), "Ym") + '01';;
            window.Datum.LumaData.getDmJsonResult("Default.Aspx", "Nivel", "dbo", "SPCALL_NivelServicio",
                { date: fecIni, clav: 0 }, function (resultado) {
                    grids[1].getStore().loadData(resultado.table);
                    graphs[0].getAxes()[0].setMinimum(grids[1].getStore().min('PorcAtiempo'))
                    graphs[0].getStore().loadData(resultado.table);
                    grids[2].getStore().loadData(resultado.table1);
                    graphs[1].getAxes()[0].setMinimum(grids[2].getStore().min('PorcAtiempo'))
                    graphs[1].getStore().loadData(resultado.table1);
                    grids[3].getStore().loadData(resultado.table2);
                    cbo.getStore().loadData(resultado.table3);
                    btns[2].setDisabled(false);
                    cbo.setHidden(false);
                    btns[3].setHidden(false);
                });
        } catch (bsError) {
            window.Datum.Tools.msgSistema('App.AppRptNivelServicio.cargaDatos', bsError, 0);
        }
    },
    cargaDatosPorRuta: function () {
        var cbo = Ext.ComponentQuery.query('#zTabRptNivelServicio combobox')[0].getValue();
        if (Ext.isEmpty(cbo)) {
            Ext.Msg.show({
                title: 'Mensaje del Sistema',
                message: '<b>Seleccione Una Ruta</b>'
            })
        } else {
            var a = Ext.ComponentQuery.query('#zTabRptNivelServicio monthfield')[0];
            var grid = Ext.ComponentQuery.query('#zTabRptNivelServicio #zGrdPnl_RutaDiario')[0];
            var graph = Ext.ComponentQuery.query('#zTabRptNivelServicio #zGrafRutaDia')[0];
            var cbo = Ext.ComponentQuery.query('#zTabRptNivelServicio combobox')[0];
            grid.getStore().removeAll();
            var fecIni = Ext.Date.format(a.getValue(), "Ym") + '01';;
            window.Datum.LumaData.getDmJsonResult("Default.Aspx", "Nivel", "dbo", "SPCALL_NivelServicio",
                { date: fecIni, clav: cbo.getValue() }, function (resultado) {
                    grid.getStore().loadData(resultado.table1);
                    graph.getStore().loadData(resultado.table1);
                    graph.getAxes()[0].setMinimum(grid.getStore().min('PorcAtiempo'))
                    Ext.ComponentQuery.query('#zTabRptNivelServicio #containerGrid1')[0].setHidden(true);
                    Ext.ComponentQuery.query('#zTabRptNivelServicio #containerGrid3')[0].setHidden(true);
                    Ext.ComponentQuery.query('#zTabRptNivelServicio #containerGrid2')[0].setHidden(false);
                });
        }
    },
    restablecer: function () {
        var btns = Ext.ComponentQuery.query('#zTabRptNivelServicio button');
        var grids = Ext.ComponentQuery.query('#zTabRptNivelServicio gridpanel')
        var graphs = Ext.ComponentQuery.query('#zTabRptNivelServicio cartesian')
        var cbo = window.Ext.ComponentQuery.query('#zTabRptNivelServicio combobox')[0];
        Ext.Array.each(grids, function (name, index, gridsItSelf) {
            name.getStore().removeAll();
        });
        graphs[0].getStore().removeAll();
        graphs[1].getStore().removeAll();
        LmApp.containerGrid1.setHidden(true);
        LmApp.containerGrid2.setHidden(true);
        LmApp.containerGrid3.setHidden(false);
        btns[2].setDisabled(true);
        cbo.setHidden(true);
        cbo.reset();
        btns[3].setHidden(true);
    },
/* initViewModel: function (vm) {Ext.Msg.alert('Mensaje', 'initViewModel de Controlador nivel servicio');} */
    setFechaHora: function () {
        var me = this;
        Datum.LumaData.getDmFechaHora("Default.Aspx", "SpGetFechaHora", function (resultado) {
            var a = new Date(resultado);
            Ext.ComponentQuery.query('#zTabRptNivelServicio monthfield')[0].setValue(a);
        });
    },
    onClickGrid: function(iView, iCellEl, iColIdx, iStore, iRowEl, iRowIdx, iEvent) {
        iEvent.preventDefault();
        if (LmApp.zHidden_Perfil.getValue() === 'NISSAN_AVANZADOS') {
            this.cargaDatosDetalle(iStore.data.ClaveNivelRutaMes);
        }
    },
    cargaDatosDetalle: function (cvr) {
        try {
            var b = LmApp.zGrdPnl_DetNivSer.getStore();
            b.removeAll();
            Datum.LumaData.getDmJsonResult("Default.Aspx", "Nivel", "dbo", "SPCALL_NivelServicio",
                { Ruta: cvr }, function (resultado) {
                    b.loadData(resultado.table);
                    LmApp.zWinDetalle.show();
                });
        } catch (bsError) {
            Datum.Tools.msgSistema('App.AppRptNivelServicio.cargaDatosDetalle', bsError, 0);
        }
    },
});
