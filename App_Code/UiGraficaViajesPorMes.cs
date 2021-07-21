using System;
using Ext.Net;
using System.Collections.Generic;
namespace CustomControlsAndPlugins.Components
{
    /*
    public class UiGraficaViajesPorMes : Chart
    {
        protected override void OnInit(EventArgs e)
        {
            Store.Add(BuildStore());
            // Background.Gradient.Stops.AddRange(BuildGradient());
            Background.Gradient.Stops.Add(new GradientStop
            {
                Offset = 0,
                Color = "#ffffff"
            });
            Background.Gradient.Stops.Add(new GradientStop
            {
                Offset = 100,
                Color = "#eaf1f8"
            });
            Background.Gradient.Angle = 45;
            Axes.AddRange(BuildAxes());
            Series.AddRange(BuildSeries());
            base.OnInit(e);

        }

        private static IEnumerable<AbstractSeries> BuildSeries()
        {
            return new ItemsCollection<AbstractSeries>
            {
                new BarSeries
                {
                    Axis = Position.Bottom,
                    Highlight = true,
                    XField = new[] {"Mes"},
                    YField = new[] {"Promedio"},
                    Tips = new ChartTip
                    {
                        TrackMouse = true,
                        Width = 140,
                        Height = 28,
                        RenderTo = "this.setTitle(storeItem.get('Mes') + ': ' + storeItem.get('Promedio') + ' Viajes')"
                    },
                    Label = new SeriesLabel
                    {
                        Display = SeriesLabelDisplay.InsideEnd,
                        Field = new[] {"Promedio"},
                        Orientation = Orientation.Horizontal,
                        Color = "#333",
                        TextAnchor = "middle"
                    }

                }
            };
        }

        private static IEnumerable<AbstractAxis> BuildAxes()
        {
            return new ItemsCollection<AbstractAxis>
            {
                new NumericAxis
                {
                    Fields = new[] {"Promedio"},
                    Position = Position.Bottom,
                    Grid = true,
                    Title = "Promedio de Carga",
                    Minimum = 7
                },
                new CategoryAxis
                {
                    Fields = new[] {"Mes"},
                    Position = Position.Left,
                    Title = "Meses del año"
                }
            };
        }

        private static IEnumerable<GradientStop> BuildGradient()
        {
            return new ItemsCollection<GradientStop>
            {
                new GradientStop
                {
                    Offset = 0,
                    Color = "#ffffff"
                },
                new GradientStop
                {
                    Offset = 100,
                    Color = "#eaf1f8"
                }
            };
        }

        private static Store BuildStore()
        {
            return new Store
            {
                ID = "z_str_ComparaRubrosMes",
                GroupField = "Anio",
                Model =
                {
                    new Model
                    {
                        Fields =
                        {
                            new ModelField("Anio", ModelFieldType.Int),
                            new ModelField("Mes", ModelFieldType.Int),
                            new ModelField("Promedio", ModelFieldType.String),
                        }
                    }
                },
                Sorters =
                {
                    new DataSorter
                    {
                        Property = "Mes",
                        Direction = SortDirection.ASC
                    }
                }
            };
        }

    }
     */
}
