using System;
using System.Collections.Generic;
using Ext.Net;

namespace CustomControlsAndPlugins.Components
{
    public class UiGridMensualEficienciaEntrega : GridPanel
    {
        protected override void OnInit(EventArgs e)
        {
            Title = string.IsNullOrWhiteSpace(Title)
                ? "Comparación de Rubros de Viaje"
                : Title;
            Store.Add(BuildStore());
            ColumnModel.Columns.Add(BuildColumnModel());
            SelectionModel.Add(new RowSelectionModel());
            Features.Add(new GroupingSummary
            {
                ID = "group",
                GroupHeaderTplString = "{name}",
                HideGroupedHeader = true,
                EnableGroupingMenu = false
            });
            // BottomBar.Add(new PagingToolbar());
            base.OnInit(e);
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
                            new ModelField("ClaveClasificacionRuta", ModelFieldType.Int),
                            new ModelField("RutaClasificada", ModelFieldType.String),
                            new ModelField("EntregasEne", ModelFieldType.Float),
                            new ModelField("EntregasFeb", ModelFieldType.Float),
                            new ModelField("EntregasMar", ModelFieldType.Float),
                            new ModelField("EntregasAbr", ModelFieldType.Float),
                            new ModelField("EntregasMay", ModelFieldType.Float),
                            new ModelField("EntregasJun", ModelFieldType.Float),
                            new ModelField("EntregasJul", ModelFieldType.Float),
                            new ModelField("EntregasAgo", ModelFieldType.Float),
                            new ModelField("EntregasSep", ModelFieldType.Float),
                            new ModelField("EntregasOct", ModelFieldType.Float),
                            new ModelField("EntregasNov", ModelFieldType.Float),
                            new ModelField("EntregasDic", ModelFieldType.Float),
                            new ModelField("EnTiempoEne", ModelFieldType.Float),
                            new ModelField("EnTiempoFeb", ModelFieldType.Float),
                            new ModelField("EnTiempoMar", ModelFieldType.Float),
                            new ModelField("EnTiempoAbr", ModelFieldType.Float),
                            new ModelField("EnTiempoMay", ModelFieldType.Float),
                            new ModelField("EnTiempoJun", ModelFieldType.Float),
                            new ModelField("EnTiempoJul", ModelFieldType.Float),
                            new ModelField("EnTiempoAgo", ModelFieldType.Float),
                            new ModelField("EnTiempoSep", ModelFieldType.Float),
                            new ModelField("EnTiempoOct", ModelFieldType.Float),
                            new ModelField("EnTiempoNov", ModelFieldType.Float),
                            new ModelField("EnTiempoDic", ModelFieldType.Float)/*,
                            new ModelField("FueraTiempoEne", ModelFieldType.Float),
                            new ModelField("FueraTiempoFeb", ModelFieldType.Float),
                            new ModelField("FueraTiempoMar", ModelFieldType.Float),
                            new ModelField("FueraTiempoAbr", ModelFieldType.Float),
                            new ModelField("FueraTiempoMay", ModelFieldType.Float),
                            new ModelField("FueraTiempoJun", ModelFieldType.Float),
                            new ModelField("FueraTiempoJul", ModelFieldType.Float),
                            new ModelField("FueraTiempoAgo", ModelFieldType.Float),
                            new ModelField("FueraTiempoSep", ModelFieldType.Float),
                            new ModelField("FueraTiempoOct", ModelFieldType.Float),
                            new ModelField("FueraTiempoNov", ModelFieldType.Float),
                            new ModelField("FueraTiempoDic", ModelFieldType.Float),*/
                        }
                    }
                },
                Sorters =
                {
                    new DataSorter
                    {
                        Property = "RutaClasificada",
                        Direction = SortDirection.ASC
                    }
                }
            };
        }

        private static IEnumerable<ColumnBase> BuildColumnModel()
        {
            const int anchoColumna1 = 50;
            const int anchoColumna2 = 55;
            //const int anchoColumna3 = 54;

            var coleccionColumnas = new ItemsCollection<ColumnBase>
            {
                new Column
                {
                    DataIndex = "Anio",
                    Hidden = false,
                    Text = "Año",
                    Width = 50,
                    Locked = true,
                    Lockable = false
                },
                new Column
                {
                    DataIndex = "RutaClasificada",
                    Hidden = false,
                    Text = "Ruta",
                    Width = 150,
                    Locked = true,
                    Lockable = false
                }
            };

            var mesesDiccionario = new Dictionary<string, string>
            {
                {"Ene", "Enero"},
                {"Feb", "Febrero"},
                {"Mar", "Marzo"},
                {"Abr", "Abril"},
                {"May", "Mayo"},
                {"Jun", "Junio"},
                {"Jul", "Julio"},
                {"Ago", "Agosto"},
                {"Sep", "Septiembre"},
                {"Oct", "Octubre"},
                {"Nov", "Noviembre"},
                {"Dic", "Diciembre"}
            };

            foreach (var mes in mesesDiccionario)
            {
                coleccionColumnas.Add(new Column
                {
                    ID = "z_ColMes" + mes.Key,
                    Text = mes.Value,
                    Lockable = false,
                    Columns =
                    {
                        new Column
                        {
                            DataIndex = "Entregas" + mes.Key,
                            Hidden = false,
                            Text = "Arribos",
                            Width = anchoColumna1,
                            SummaryType = SummaryType.Sum,
                            Align = Alignment.Right
                        },
                        new Column
                        {
                            DataIndex = "EnTiempo" + mes.Key,
                            Hidden = false,
                            Text = "Eficiencia",
                            Width = anchoColumna2,
                            SummaryType = SummaryType.Average,
                            Align = Alignment.Right,
                            Renderer =
                            {
                                Handler = "z_UFN_eficienRender"
                            }
                        }/*,
                        new SummaryColumn
                        {
                            DataIndex = "FueraTiempo" + mes.Key,
                            Hidden = false,
                            Text = "Fuera de Tiempo",
                            Width = anchoColumna3,
                            SummaryType = SummaryType.Average,
                            Align = Alignment.Right,
                            Renderer =
                            {
                                Handler = "return (value * 100) +' %';"
                            }
                        }*/
                    }
                }
                    );
            }

            return coleccionColumnas;
        }
    }
}