
var addTab = function(tabPanel, id, url, nombre, parametro1, parametro2) {
    var tab = tabPanel.getComponent(id);

    if (!tab) {
        tab = tabPanel.add({
            id: id,
            title: nombre,
            closable: true,
            loader: {
                url: url,
                renderer: "frame",
                method: 'Post',
                loadMask: {
                    showMask: true ,
                    msg: "Ensamblando Módulo.. "
                },
                params: { param1: parametro1, param2: parametro2 }
            },
            tabConfig: {
                tooltip: url
            }
        });
    }
    tabPanel.setActiveTab(tab);
};