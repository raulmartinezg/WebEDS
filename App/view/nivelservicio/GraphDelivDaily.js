Ext.define('App.view.nivelservicio.GraphDelivDaily', {
    extend: 'Ext.chart.CartesianChart',
    config: {
        title: 'Delivery Efficiency Daily (30 mins)',
    },
    xtype: 'graphdeliverydaily',
    animation: {
        duration: 500,
        easing: "easeOut"
    },
    axes: [
        {
            fields: ["PorcAtiempo", "Target"],
            grid: true,
            maximum: 100,
            minimum: 45.0,
            position: "left",
            renderer: function (label, layout, lastLabel) {
                return layout.renderer(label) + '%';
            },
            type: "numeric"
        },

        {
            fields: ["Dia"],
            grid: true,
            label: {
                type: "text",
                rotationRads: Ext.draw.Draw.rad(-5),
                fontSize: "15"
            },
            position: "bottom",
            type: "category"
        }
    ],
    innerPadding: "10 10 8 10",
    insetPadding: 10,
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
                field: "PorcATiempo"
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
            tooltip: {
                style: "background: #fff;",
                dismissDelay: 0,
                hideDelay: 0,
                showDelay: 0,
                trackMouse: true,
                renderer: function (storeItem, item) {
                    this.setHtml('Día  ' + storeItem.get('Dia') + ': ' + storeItem.get('PorcATiempo') + '%');
                }
            },
            xField: "Dia",
            yField: "PorcATiempo",
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
            xField: "Dia",
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
    ]
});
