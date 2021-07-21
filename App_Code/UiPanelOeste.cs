using System.Web.UI.WebControls;
using Ext.Net;
using ImageButton = Ext.Net.ImageButton;
using Panel = Ext.Net.Panel;

public static class UiPanelOeste
{
    static UiPanelOeste()
    {
        NombrePerfil = "No Definido";
        TituloPanel = "No Definido";
        UsuarioPortal = "No Definido";
    }

    #region Propiedades

    public static string NombrePerfil { get; set; }

    public static string TituloPanel { get; set; }

    public static string UsuarioPortal { get; set; }

    #endregion

    #region Métodos Públicos

    public static Panel ConstruyePanel(string nombrePerfil)
    {
        NombrePerfil = nombrePerfil;
        return BuildPanel();
    }

    public static Panel ConstruyePanel(string nombrePerfil, string usuarioPortal)
    {
        NombrePerfil = nombrePerfil;
        TituloPanel = nombrePerfil;
        return BuildPanel();
    }

    public static Panel ConstruyePanel(string nombrePerfil, string usuarioPortal, string tituloPanel)
    {
        NombrePerfil = nombrePerfil;
        TituloPanel = tituloPanel;
        UsuarioPortal = usuarioPortal;
        return BuildPanel();
    }

    #endregion

    #region Métodos Privados

    private static Panel BuildPanel()
    {
        Panel resultado = null;
        switch (NombrePerfil)
        {
            case "NISSAN_USUARIO":
                resultado = new Panel
                {
                    Title = TituloPanel,
                    IconCls = "fa fa-user",
                    Border = true,
                    AutoScroll = true,
                    BodyStyle = "text-align:center;",
                    LayoutConfig =
                    {
                        new VBoxLayoutConfig
                        {
                            Align = VBoxAlign.Stretch,
                            /* DefaultMargins = "2" */
                        }
                    },
                    Items =
                    {
                        CreaMenu("Imagenes/RabonMono.png",
                            "Imagenes/RabonMono5.png",
                            "Eds.addAppRptDiarioViajes(LmApp.zTabPnl_Centro, 'Luma1');", "Prueba")
                    }
                };
                break;

            case "NISSAN_USUARIO1":
                resultado = new Panel
                {
                    Title = TituloPanel,
                    IconCls = "fa fa-user",
                    Border = true,
                    AutoScroll = true,
                    BodyStyle = "text-align:center;",
                    LayoutConfig =
                    {
                        new VBoxLayoutConfig
                        {
                            Align = VBoxAlign.Stretch,
                            /* DefaultMargins = "2" */
                        }
                    },
                    Items =
                    {
                        CreaMenu("Imagenes/RabonMono.png",
                            "Imagenes/RabonMono5.png",
                            "Eds.addTab(LmApp.zTabPnl_Centro, 'z_Tab_Aplicaciones000', 'Aspx/DWHRastreoEmbarques.aspx','Rastreo de Embarques','" +
                            NombrePerfil + "','" + UsuarioPortal + "')", "Rastreo de Embarques"),
                        CreaMenu("Imagenes/Rep2.png",
                            "Imagenes/Rep3.png",
                            "Eds.addTab(LmApp.zTabPnl_Centro, 'z_Tab_Aplicaciones001', 'Aspx/RepGuias.aspx','Reparación Guías','" +
                            NombrePerfil + "','" + UsuarioPortal + "')", "Reparación Guías")
                    }
                };
                break;
            case "NISSAN_USUARIO_REPORTES":
                resultado = new Panel
                {
                    Title = TituloPanel,
                    IconCls = "fa fa-user",
                    Border = true,
                    AutoScroll = true,
                    BodyStyle = "text-align:center;",
                    LayoutConfig =
                    {
                        new VBoxLayoutConfig
                        {
                            Align = VBoxAlign.StretchMax,
                            /* DefaultMargins = "2" */
                        }
                    },
                    Items =
                    {
                        CreaMenu("Imagenes/Agenda01.png",
                            "Imagenes/Agenda02.png",
                            "Eds.addTab(LmApp.zTabPnl_Centro, 'z_Tab_Reportes000', 'Aspx/DWHDiarioDeViajes.aspx','Diario de Viajes','" +
                            NombrePerfil + "','" + UsuarioPortal + "')", "Diario de Viajes"),
                        CreaMenu("Imagenes/Rabon05.png", "Imagenes/Rabon06.png",
                            "Eds.addTab(LmApp.zTabPnl_Centro, 'z_Tab_Reportes001', 'Aspx/DWHMensualDeViajes.aspx','Desempeño X Ruta (1 Vista)','" +
                            NombrePerfil + "','" + UsuarioPortal + "')", "Desempeño X Ruta (1 Vista)"),
                        CreaMenu("Imagenes/AcrobatDoc3.png",
                            "Imagenes/AcrobatDoc4.png",
                            "Eds.addTab(LmApp.zTabPnl_Centro, 'z_Tab_Reportes002', 'Aspx/DWHViajesCarga.aspx','Desempeño X Ruta (3 Vistas)','" +
                            NombrePerfil + "','" + UsuarioPortal + "')", "Desempeño X Ruta (3 Vistas)"),
                        /* CreaMenu("Imagenes/report.png",
                            "Imagenes/xmlCfg.png",
                            "Eds.addTab(LmApp.zTabPnl_Centro, 'z_Tab_Reportes003', 'Aspx/DWHEficienciaTiempoEntregaRutas.aspx','Eficiencia en Tiempo','" +
                            NombrePerfil + "','" + UsuarioPortal + "')", "Eficiencia en Tiempo") */
                    }
                };
                break;
        }
        return resultado;
    }


    private static
        Container CreaMenu
        (string zParstrurlbtn, string zParstrurlbtnFondo,
            string zParstrParametros, string zToolTip)
    {
        var zControl = new Container
        {
            Border = false,
            Width = 120,
            Height = 140,
            AnchorVertical = "100%",
            Layout = "VBoxLayout",
            Padding = 10,
            Items =
            {
                new ImageButton
                {
                    ImageUrl = zParstrurlbtn,
                    OverImageUrl = zParstrurlbtnFondo,
                    Width = Unit.Pixel(100),
                    Height = Unit.Pixel(70),
                    ToolTips =
                    {
                        new ToolTip
                        {
                            Html = zToolTip,
                            Padding = 0
                        }
                    },
                    OnClientClick = zParstrParametros,
                },
                new Ext.Net.Label
                {
                    Width = 100,
                    Html =
                        "<p style='color:#ffffff; font-family: Arial, Helvetica, sans-serif;font-size:11px;text-align:center;background-color:#7DCD40;'>" +
                        zToolTip + "</p>"
                }
            }
        };
        return zControl;
    }

    #endregion
}

