using System;
using System.Web.UI.WebControls;
using Ext.Net;
using ImageButton = Ext.Net.ImageButton;
using Panel = Ext.Net.Panel;

namespace CustomControlsAndPlugins.Components
{
    public class UiPanelOesteEjecutivo : Panel
    {
        protected override void OnInit(EventArgs e)
        {
            ID = "z_Pnl_Oeste";
            Title = string.IsNullOrWhiteSpace(Title)
                ? "Menú Principal"
                : Title;
            Region = Region.West;
            Layout = "Fit";
            Collapsible = true;
            Split = true;
            PaddingSpec = "0 0 0 0";
            MarginSpec = "0 0 5 0";
            Width = 140;
            Layout = "AccordionLayout";
            BackColor = System.Drawing.Color.Teal;
            Items.Add(new ItemCollection
            {
                new Panel
                {
                    ID = "z_Pnl_Oeste_Cont00",
                    Title = "Aplicaciones",
                    /*ToolTips =
                    {
                        new ToolTip {Html = "<h4>Aplicaciones</h4>"}
                    }, */
                    Icon = Icon.ReportUser,
                    Width = 150,
                    Border = false,
                    AutoScroll = true,
                    BodyStyle = "text-align:center;",
                    Margin = 0,
                    LayoutConfig =
                    {
                      new VBoxLayoutConfig
                      {
                          Align = VBoxAlign.Stretch
                      }  
                    },
                    Items =
                    {
                        CreaMenu("zPnlOesteCont0_Opc0", "zPnlOesteCont0_BtnImg0","Imagenes/Rabon02.png",
                            "Imagenes/Rabon03.png",
                            "Eds.Eds.addTab(eds.z_TabPnl_Centro, 'z_Tab_RastreoEmbarque', 'Aspx/DWHRastreoEmbarques.aspx','Rastreo de Embarques','" +
                            "algo" + "')", "Rastreo de Embarques")
                    }
                },
                new Panel
                {
                    ID = "z_Pnl_Oeste_Cont01",
                    Title = "DashBoard",
                    /*ToolTips =
                    {
                        new ToolTip {Html = "<h4>DashBoard</h4>"}
                    },*/
                    Icon = Icon.ChartBar,
                    Width = 150,
                    Border = false,
                    AutoScroll = true,
                    BodyStyle = "text-align:center;",
                    Margin = 1,
                     LayoutConfig =
                    {
                      new VBoxLayoutConfig
                      {
                          Align = VBoxAlign.Stretch
                          }  
                    },
                    Items =
                    {
                        CreaMenu("zPnlOesteCont1_Opc0", "zPnlOesteCont1_BtnImg0","Imagenes/Agenda01.png",
                            "Imagenes/Agenda02.png",
                            "Eds.addTab(eds.z_TabPnl_Centro, 'z_Tab_PnlOeste00', 'Aspx/DWHDiarioDeViajes.aspx','Diario de Viajes','" +
                            "algo" + "')", "Diario de Viajes"),
                        CreaMenu("zPnlOesteCont1_Opc1", "zPnlOesteCont1_BtnImg1","Imagenes/Rabon05.png", "Imagenes/Rabon06.png",
                            "Eds.addTab(eds.z_TabPnl_Centro, 'z_Tab_PnlOeste01', 'Aspx/DWHMensualDeViajes.aspx','Desempeño X Ruta (1 Vista)','" +
                            "algo" + "')", "Desempeño X Ruta (1 Vista)"),
                        CreaMenu("zPnlOesteCont1_Opc2", "zPnlOesteCont1_BtnImg2","Imagenes/AcrobatDoc3.png",
                            "Imagenes/AcrobatDoc4.png",
                            "Eds.addTab(eds.z_TabPnl_Centro, 'z_Tab_PnlOeste02', 'Aspx/DWHViajesCarga.aspx','Desempeño X Ruta (3 Vistas)','" +
                            "algo" + "')", "Desempeño X Ruta (3 Vistas)"),
                        CreaMenu("zPnlOesteCont1_Opc3", "zPnlOesteCont1_BtnImg3","Imagenes/Velocimetro.png",
                            "Imagenes/Velocimetro.png",
                            "Eds.addTab(eds.z_TabPnl_Centro, 'z_Tab_PnlOeste03', 'Aspx/DWHMensualEficienciaEntrega.aspx','Delivery Performance','" +
                            "algo" + "')", "Delivery Performance")
                    }
                }
            });
            base.OnInit(e);
        }

        private static Panel CreaMenu(string zParstridpanel, string zParstridimgbtn, string zParstrurlbtn, string zParstrurlbtnFondo, string zParstrParametros, string zToolTip)
        {
            // var zImagebutton = ;
            var zControl = new Panel
            {
                ID = zParstridpanel,
                Border = false,
                Width = 80,
                Height = 140,
                BackColor = System.Drawing.Color.Transparent,
                BodyStyle = "padding-top:25px;",
                Layout = "VBoxLayout",
                Padding = 0,
                Items =
                {
                    new ImageButton
                    {
                        ID = zParstridimgbtn,
                        ImageUrl = zParstrurlbtn,
                        OverImageUrl = zParstrurlbtnFondo,
                        Width = Unit.Pixel(80),
                        Height = Unit.Pixel(80),
                        IconAlign = IconAlign.Bottom,
                        BackColor = System.Drawing.Color.Transparent,
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
                        Width = 80,
                       
                        Html =
                            "<p style='color:#002D5A; font-family: Arial, Helvetica, sans-serif;font-size: 10px;text-align:center;background-color:#CCCCCC;'>" +
                            zToolTip + "</p>"
                    }
                }
            };

            return zControl;
        }

        public void ClickOnEvent(object sender, DirectEventArgs directEventArgs)
        {
            var algo = directEventArgs.ExtraParams["Param0"];
        }
    }
}