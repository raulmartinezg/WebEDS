using System;
using System.Configuration;
using CustomControlsAndPlugins.Components;
using Ext.Net;
using Ext.Net.Utilities;

public partial class Aspx_DWHMensualDeViajes : System.Web.UI.Page
{

    readonly UoMetodos _zMetodos = new UoMetodos();
    private string _perfil = string.Empty;
    private string _usuario = string.Empty;

    protected void Page_Load(object sender, EventArgs e)
    {
        if (X.IsAjaxRequest) return;
        _perfil = Request.QueryString["param1"];
        _usuario = Request.QueryString["param2"];
        z_dtnInicial.MinDate = DateTime.Parse("2015-01-01");
        z_dtnInicial.MaxDate = DateTime.Now;
        z_dtnInicial.SetValue(DateTime.Parse("2015-01-01"));
        z_dtnFinal.SetValue(DateTime.Now);
        try
        {
            /*switch (_perfil)
            {
                case "NISSAN_USUARIO":
                    break;
                case "NISSAN_EJECUTIVO":
                    break;
                case "NISSAN_USUARIO_REPORTES":
                    break;
                default:
                    Response.Redirect(@"~/AccesoNoAutorizado.html");
                    break;
            }*/
        }
        catch (Exception ex)
        {
            X.Msg.Show(new MessageBoxConfig
            {
                Buttons = MessageBox.Button.OK,
                Icon = MessageBox.Icon.ERROR,
                Title = "Error",
                Message = "No es posible conectarse al servidor, intente de nuevo"
            });

            ResourceManager.AjaxSuccess = false;
            ResourceManager.AjaxErrorMessage = ex.Message;
        }
    }

    protected void MostrarReporte(object sender, DirectEventArgs e)
    {
        var nuevotab = new UiPanelReporteRs();
        var sbResultado = new System.Text.StringBuilder();
        try
        {
            const string zNombreReporte = "EficienciaViajes";
            sbResultado.Append("{'Parametros':[{'FechaInicial':'" + e.ExtraParams["Param0"] + "','FechaFinal':'" + e.ExtraParams["Param1"] + "'}]}");
            nuevotab.Loader = new ComponentLoader
            {
                Url = "ReportViewer.aspx",
                Mode = LoadMode.Frame,
                LoadMask =
                {
                    ShowMask = true,
                    Msg = "Cargando Módulo..."
                },
                Params =
                {
                     new Parameter("zReportServerUrl", ConfigurationManager.AppSettings
                    ["zReportServerUrl"], ParameterMode.Value),
                     new Parameter("zReportPath", ConfigurationManager.AppSettings
                    ["zReportPath"] + "/" + zNombreReporte, ParameterMode.Value),
                     new Parameter("zParametros", sbResultado.ToString(), ParameterMode.Value)
                }
            };
            // Panel1.Items.RemoveRange(0,1);
            // nuevotab.AddTo(Panel1);
            Panel1.Items.Add(nuevotab);
            Panel1.Render();
        }
        catch (Exception ex)
        {
            X.Msg.Show(new MessageBoxConfig
            {
                Buttons = MessageBox.Button.OK,
                Icon = MessageBox.Icon.INFO,
                Title = "Error",
                Message = "Error no Tipificado"
            });
            ResourceManager.AjaxSuccess = false;
            ResourceManager.AjaxErrorMessage = ex.Message;
        }

        /*new Window("Server time", Icon.Time)
        {
            ID = "MyWindow",
            Html = DateTime.Now.ToString()
        }.Render();*/
    }

}