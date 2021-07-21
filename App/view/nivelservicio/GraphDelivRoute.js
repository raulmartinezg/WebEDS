Ext.define('App.view.nivelservicio.GraphDelivRoute', {
    extend: 'Ext.chart.CartesianChart',
    config: {
        width: '40%'
    },
    xtype: 'graphdeliveryroute',
    animation: {
        duration: 500,
        easing: "easeOut"
    },
    axes: [
        {
            fields: ["PorcAtiempo", "Target"],
            grid: true,
            maximum: 100.0,
            minimum: 50,
            position: "left",
            renderer: function (label, layout, lastLabel) {
                return layout.renderer(label) + '%';
            },
            type: "numeric"
        }, {
            fields: ["Prefijo"],
            grid: true,
            label: {
                type: "text",
                fontSize: "15"
            },
            position: "bottom",
            type: "category"
        }
    ],
    innerPadding: "10 20 6 20",
    insetPadding: 8,
    interactions: [
        {
            type: "panzoom",
            zoomOnPanGesture: true
        }
    ],
    series: [
        {
            highlight:
            {
                fillStyle: "#47819E",
                lineWidth: 10.0,
                strokeStyle: "#3CCBE5",
                r: 4
            },
            label:
            {
                type: "text",
                display: "over",
                field: "PorcAtiempo"
            },
            marker:
            {
                fillStyle: '#34716E',
                lineWidth: 0.0,
                strokeStyle: '#34716E',
                strokeOpacity: .6,
                r: 4
            },
            style:
            {
                stroke: '#34716E',
                strokeOpacity: .6,
                lineWidth: 4.0
            },
            tooltip:
            {
                style: "background: #fff;",
                dismissDelay: 0,
                hideDelay: 0,
                showDelay: 0,
                trackMouse: true,
                renderer: function (storeItem, item) {
                    this.setHtml(storeItem.get('Ruta') + ': ' + storeItem.get('PorcAtiempo') + '%');
                }
            },
            xField: "Prefijo",
            yField: "PorcAtiempo",
            type: "line"
        }, {
            highlight:
            {
                scaling: 2
            },
            marker:
            {
                fillStyle: "#008000",
                strokeStyle: "#008000",
                strokeOpacity: .6,
                type: 'triangle',
                animation: {
                    duration: 200,
                    easing: 'backOut'
                }
            },
            style:
            {
                //fill: '#96D4C6',
                //fillOpacity: .6,
                stroke: '#008000',
                strokeOpacity: .6,
                lineWidth: 2.0
            },
            tooltip:
            {
                style: "background: #fff;",
                dismissDelay: 0,
                hideDelay: 0,
                showDelay: 0,
                trackMouse: true,
                renderer: function (storeItem, item) {
                    this.setHtml('Target' + ': ' + storeItem.get('Target') + '%');
                }
            },
            xField: "Prefijo",
            yField: "Target",
            type: "line"
        }
    ],
    sprites: [
        {
            type: "text",
            height: 30,
            width: 100,
            x: 40,
            y: 20,
            fontSize: "22"
        }
    ],
});
