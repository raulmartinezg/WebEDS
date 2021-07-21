using System.Collections.Generic;
using Ext.Net;
// using Ext.Net.Utilities;

public class DiarioDeViajes
{
    private const int InitialPageSize = 10;

    // public Store StoreGrid { get; set; }

    public GridPanel Build()
    {
        return new GridPanel
        {
            ID = "z_GrdPnl_Detalle",
            MarginSpec = "3 3 3 3",
            Title = "Diario de Viajes",
            Region = Region.Center,
            Store = { BuildStore() },
            ColumnModel =
            {
                Columns = { BuildColumnModel() }
            },
            SelectionModel =
            {
                new RowSelectionModel()
            },
            BottomBar = { new PagingToolbar() },
            Features =
            {
                new GroupingSummary
                {
                    ID = "Group1",
                    GroupHeaderTplString = "{name}",
                    HideGroupedHeader = false,
                    ShowGroupsText="Agrupar",
                    StartCollapsed = true,
                    Width = 100
                }
            },
            DockedItems =
            {
                new Container
                {
                   ID = "Container2",
                    Layout = "HBoxLayout",
                    Dock = Dock.Bottom,
                    StyleSpec = "margin-top:2px;",
                    Defaults =
                    {
                        new Parameter
                        {
                            Name = "height",
                            Value = "22"
                        }
                    },
                    Items =
                    {
                        new DisplayField
                        {
                            Cls = "total-field",
                            Name = "FolioViaje",
                            Text = "-"
                        },
                        new DisplayField
                        {
                            Cls = "total-field",
                            Name = "Concesionarios",
                            Text = "-"
                        },
                        new DisplayField
                        {
                            Cls = "total-field",
                            Name = "Embarques",
                            Text = "-"
                        },
                        new DisplayField
                        {
                            Cls = "total-field",
                            Name = "Items",
                            Text = "-"
                        },
                        new DisplayField
                        {
                            Cls = "total-field",
                            Name = "PorcentajeCarga",
                            Text = "-"
                        }
                    }
                }
            }

        };
    }

    private static Store BuildStore()
    {
        return new Store
        {
            ID = "z_strConsulta",
            GroupField = "RutaClasificada",
            PageSize = InitialPageSize,
            Model =
            {
                new Model
                {
                    Fields =
                    {
                        new ModelField("RutaClasificada", ModelFieldType.String),
                        new ModelField("FolioViaje", ModelFieldType.String),
                        new ModelField("Fecha", ModelFieldType.Date),
                        new ModelField("Unidad", ModelFieldType.String),
                        new ModelField("Nombre", ModelFieldType.String),
                        new ModelField("Concesionarios", ModelFieldType.Int),
                        new ModelField("Embarques", ModelFieldType.Int),
                        new ModelField("Items", ModelFieldType.Int),
                        new ModelField("PorcentajeCarga", ModelFieldType.Int),
                        new ModelField("UltimaCiudad", ModelFieldType.String),
                        new ModelField("NumeroConcesionario", ModelFieldType.String),
                    }
                }
            },
            Sorters =
            {
                new DataSorter
                {
                    Property = "Fecha",
                    Direction = SortDirection.ASC
                }
            }
        };
    }

    private static IEnumerable<ColumnBase> BuildColumnModel()
    {
        return new ItemsCollection<ColumnBase>
        {
            new Column
            {
                DataIndex = "RutaClasificada",
                Hidden = true,
                Text = "RutaClasificada",
                Width = 120
                //Renderer = {Format = RendererFormat.UsMoney}
            },
            new Column
            {
                ID = "SC001",
                DataIndex = "FolioViaje",
                Flex = 1,
                Hideable = false,
                TdCls = "Rutas",
                Text = "Viajes",
                Sortable = true,
                Width = 80,
                SummaryType = SummaryType.Count,
                SummaryRenderer =
                {
                    Handler = "return ((value === 0 || value > 1) ? '(' + value +' Viajes)' : '(1 Viaje)');"
                }
            },

            new DateColumn
            {
                DataIndex = "Fecha",
                Groupable = false,
                Text = "Fecha",
                Width = 80
            },
            new Column
            {
                DataIndex = "Unidad",
                Hidden = true,
                Text = "Unidad",
                Width = 80
            },
            new Column
            {
                DataIndex = "Nombre",
                Hidden = true,
                Text = "Operador",
                Width = 200
            },
            new Column
            {
                DataIndex = "Concesionarios",
                Flex = 1,
                Hideable = false,
                Text = "Concesionarios",
                Sortable = true,
                Width = 100,
                SummaryType = SummaryType.Sum,
                SummaryRenderer =
                {
                    Handler = "return value +' Conc';"
                }
            },
            new Column
            {
                DataIndex = "Embarques",
                Flex = 1,
                Groupable = false,
                Hideable = false,
                Text = "Embarques",
                Sortable = true,
                Width = 100,
                SummaryType = SummaryType.Sum,
                SummaryRenderer =
                {
                    Handler = "return value +' Emb.';"
                }
            },
            new Column
            {
                DataIndex = "Items",
                Flex = 1,
                Groupable = false,
                Hideable = false,
                Text = "Items",
                Sortable = true,
                Width = 75,
                SummaryType = SummaryType.Sum,
                SummaryRenderer =
                {
                    Handler = "return value +' Items';"
                }
            },
            new Column
            {
                DataIndex = "PorcentajeCarga",
                Flex = 1,
                Groupable = false,
                Hideable = false,
                Text = "% Carga",
                Sortable = true,
                Width = 75,
                SummaryType = SummaryType.Average,
                SummaryRenderer =
                {
                    Handler = "return value +' Items';"
                },
                Renderer =
                {
                    Handler = "return value +' %';"
                }        
            },
            new Column
            {
                DataIndex = "UltimaCiudad",
                Hidden = true,
                Text = "Última Ciudad",
                Width = 120
            },
            new Column
            {
                DataIndex = "NumeroConcesionario",
                Hidden = true,
                Text = "Último Concesionario",
                Width = 200
            }
        };
    }
}