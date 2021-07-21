Ext.define('App.view.diario.BrowseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.diariobrowse',
    control: {
        '#': {
            reset: 'refresh'
        }
    },
    init: function (view) {
        this.setFechaHora();
    },
    initViewModel: function (vm) {
    },
    autoAjusteAnchoCol: function (item, e) {
        var a = this.getView();
        Ext.each(a.columns, function (column) {
            column.autoSize();
        });
    },
    expandeColapsaCol: function (item, e) {
        var a = this.getView().groupingFeature;
        a[a.expanded ? 'collapseAll' : 'expandAll']();
        a.expanded = !a.expanded;
    },
    exportaExcel: function () {
        a = this.getView().getStore();
        Datum.AppExportaExcel.creaDocExcel('Aspx/Rpt_Excel.aspx',
            '../xslt/DWHDiarioDeViajes.xslt',
            'DiarioViajes',
            Ext.encode({ records: { record: Ext.Array.pluck(a.data.items, 'data') } }),
            Ext.JSON.encode({ params: { param: { parametro1: "" } } }));
    },
    cargaDatos: function () {
        try {
            var a = this.getView().getStore();
            a.removeAll();
            Datum.LumaData.getDmJsonResult("Default.Aspx", "Diario", "dbo", "SPCALL_Diario", {
                Fecha: Datum.Tools.toDateSQLRango(LmApp.zDteFld_DvFechaDiario.getValue(), "inicio")
            }, function (resultado) {
                a.loadData(resultado.table);
                LmApp.zFeatGrp_DvSumario.collapseAll();
                LmApp.zBtn_DvReporteExcel.setDisabled(false);
            });
        } catch (bsError) {
            Datum.Tools.msgSistema('App.view.diario.BrowseController.cargaDatos', bsError, 0);
        }
    },
    setFechaHora: function () {
        Datum.LumaData.getDmFechaHora("Default.Aspx", "SpGetFechaHora", function (resultado) {
            var a = new Date(resultado);
            LmApp.zDteFld_DvFechaDiario.setValue(Ext.Date.add(a, Ext.Date.DAY, -1));
            LmApp.zDteFld_DvFechaDiario.setMaxValue(a);
            /* App.AppRptDiarioViajes.setFechaActual(resultado); */
        });
    },
    restablecer: function () {
        this.setFechaHora();
        LmApp.zBtn_DvReporteExcel.setDisabled(true);
        this.getView().getStore().removeAll();
    },
    refresh: function () {
        var vm = this.getViewModel();
        vm.getStore('diario').reload();
    },
    onCreate: function () {
        this.redirectTo('office/create');
    }
});
