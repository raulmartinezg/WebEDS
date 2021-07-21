using Ext.Net;
using Ext.Net.Utilities;
using NETDataLuma;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Net;
using System.Net.Http;
using Formatting = Newtonsoft.Json.Formatting;
//using System.Text;
/* [DirectMethodProxyID(IDMode = DirectMethodProxyIDMode.Alias, Alias = "UC")]*/

public partial class Default : System.Web.UI.Page
{
    const string WebApiURL = "http://200.52.73.110:8085/TRIGGER";
    private static HttpClient Client = new HttpClient()
    {
        BaseAddress = new Uri(WebApiURL)
    };

    private static readonly ExecStoreSql ZConexion = new ExecStoreSql(ConfigurationManager.AppSettings["SIDTUMCon"], ConfigurationManager.AppSettings["SIDTUM_Cat"], ConfigurationManager.AppSettings["RutaDatum"]);
    
    private static DataSet _zDataset = new DataSet();

    protected void Page_Load(object sender, EventArgs e)
    {
        /*
        if (X.IsAjaxRequest) return;
        
        if (Cookies.GetCookie("name") == null)
        {
            Response.Redirect("http://200.52.73.110:8085/LOGIN");
        }*/
        
        const string str = "D4E17F25-60C0-4984-950E-38D77E5BEB92|NISSAN_AVANZADOS|lgonzalez|";
        //  const string str = "D4E17F25-60C0-4984-950E-38D77E5BEB92|NISSAN_CONCESIONARIO|363|";
        //  const string str = "D4E17F25-60C0-4984-950E-38D77E5BEB92|NISSAN_EJECUTIVO|lgonzalez|";
        //  const string str = "D4E17F25-60C0-4984-950E-38D77E5BEB92|NISSAN_USUARIO|lgonzalez|";

        // var str = Request.Form.Get("param2");

        /* X.Msg.Show(new MessageBoxConfig
         {
             Buttons = MessageBox.Button.OK,
             Icon = MessageBox.Icon.INFO,
             Title = "Información",
             Message = str
         }); */

        var accesoValido = false;
        if (!str.IsNull())
        {
            var dataParam = str.Split('|');
            // var strOidSesion = dataParam[0];
            zLbl_UsrAcceso.Text = dataParam[dataParam.Length - 2];

            for (var i = 1; i < dataParam.Length - 1; i++)
            {
                var strResultado = dataParam[i];
                // z_Pnl_Oeste.Title = UiPanelOeste.UsuarioPortal;
                switch (strResultado)
                {
                    case "NISSAN_USUARIO": /* Ejecutivos EDS */
                        zMenuRepOP.Add(new MenuItem { Icon = Icon.Report, Handler = "Eds.addAppRptEntregas(LmApp.zTabPnl_Centro, 'zTabRptEntregas');", Text = "Entrega de Viaje" });
                        zMenuRepOP.Add(new MenuItem { Icon = Icon.ReportAdd, Handler = "Eds.addAppRptTipoEncuesta(LmApp.zTabPnl_Centro, 'zTabRptTipoEncuesta');", Text = "Tipo Encuesta" });
                        // zMenuRepOP.Add(new MenuItem { Icon = Icon.ReportMagnify, Handler = "Eds.addAppRptNivelServicio(LmApp.zTabPnl_Centro, 'zTabRptNivelServicio');", Text = "Nivel Servicio", Hidden = true });
                        // ----------------------------------------------------------------------------------------------------------------
                        zMenuRepCli.Add(new MenuItem { Icon = Icon.PageHeaderFooter, Handler = "Eds.addAppTab('diarioviajes','zTabRptDiarioViajes','Diario de Viajes');", Text = "Diario de Viaje" });
                        zMenuRepCli.Add(new MenuItem { Icon = Icon.ReportStart, Handler = "Eds.addAppRptSatisSrv(LmApp.zTabPnl_Centro, 'zTabRptRptSatisfaccionServicio');", Text = "Calidad de Servicio" });
                        zMenuRepCli.Add(new MenuItem { Icon = Icon.PageAttach, Handler = "Eds.addAppRptViajesCarga2(LmApp.zTabPnl_Centro, 'zTabRptViajesCarga1vista');", Text = "Desempeño (1 Vista)" });
                        zMenuRepCli.Add(new MenuItem { Icon = Icon.ReportGo, Handler = "Eds.addAppRptViajesCarga(LmApp.zTabPnl_Centro, 'zTabRptViajesCarga3vistas');", Text = "Desempeño (3 Vistas)" });
                        zMenuRepCli.Add(new MenuItem { Icon = Icon.ReportUser, Handler = "Eds.addAppRptEficiencia(LmApp.zTabPnl_Centro, 'zTabRptViajesEficiencia')", Text = "Eficiencia de Entrega" });
                        zMenuRepCli.Add(new MenuItem { Icon = Icon.ReportMagnify, Handler = "Eds.addAppTab('nivelservicio', 'zTabRptNivelServicio', 'Nivel de Servicio');", Text = "Nivel Servicio" });

                        zBtn_MnuReportesOperacion.Visible = true;
                        zBtn_MnuReportesCliente.Visible = true;
                        zBtn_MnuHerramientaOperacion.Visible = false;                        
                        accesoValido = true;              
                        break;

                    case "NISSAN_EJECUTIVO": /* Ejecutivos NISSAN */
                        zMenuRepCli.Add(new MenuItem { Icon = Icon.PageHeaderFooter, Handler = "Eds.addAppTab('diarioviajes','zTabRptDiarioViajes','Diario de Viajes');", Text = "Diario de Viaje" });
                        zMenuRepCli.Add(new MenuItem { Icon = Icon.ReportStart, Handler = "Eds.addAppRptSatisSrv(LmApp.zTabPnl_Centro, 'zTabRptRptSatisfaccionServicio');", Text = "Calidad de Servicio" });
                        zMenuRepCli.Add(new MenuItem { Icon = Icon.PageAttach, Handler = "Eds.addAppRptViajesCarga2(LmApp.zTabPnl_Centro, 'zTabRptViajesCarga1vista');", Text = "Desempeño (1 Vista)" });
                        zMenuRepCli.Add(new MenuItem { Icon = Icon.ReportGo, Handler = "Eds.addAppRptViajesCarga(LmApp.zTabPnl_Centro, 'zTabRptViajesCarga3vistas');", Text = "Desempeño (3 Vistas)" });
                        zMenuRepCli.Add(new MenuItem { Icon = Icon.ReportUser, Handler = "Eds.addAppRptEficiencia(LmApp.zTabPnl_Centro, 'zTabRptViajesEficiencia')", Text = "Eficiencia de Entrega" });
                        zMenuRepCli.Add(new MenuItem { Icon = Icon.ReportMagnify, Handler = "Eds.addAppTab('nivelservicio', 'zTabRptNivelServicio', 'Nivel de Servicio');", Text = "Nivel Servicio" });

                        zBtn_MnuReportesOperacion.Visible = false;
                        zBtn_MnuReportesCliente.Visible = true;
                        zBtn_MnuHerramientaOperacion.Visible = false;
                        accesoValido = true;
                        break;

                    case "NISSAN_AVANZADOS": /* Operación EDS */
                        zHidden_Perfil.Value = strResultado;
                        zMenuHOP.Add(new MenuItem { Icon = Icon.PageWhiteGear, Handler = "Eds.addTab(LmApp.zTabPnl_Centro, 'z_Tab_Aplicaciones001', 'Aspx/RepGuias.aspx','Reparación Guías','NISSAN_USUARIO_REPORTES','');", Text = "Reparación Guías" });
                        zMenuRepOP.Add(new MenuItem { Icon = Icon.Report, Handler = "Eds.addAppRptEntregas(LmApp.zTabPnl_Centro, 'zTabRptEntregas');", Text = "Entrega de Viaje" });
                        zMenuRepOP.Add(new MenuItem { Icon = Icon.ReportAdd, Handler = "Eds.addAppRptTipoEncuesta(LmApp.zTabPnl_Centro, 'zTabRptTipoEncuesta');", Text = "Tipo Encuesta" });
                        zMenuRepCli.Add(new MenuItem { Icon = Icon.PageHeaderFooter, Handler = "Eds.addAppTab('diarioviajes','zTabRptDiarioViajes','Diario de Viajes');", Text = "Diario de Viaje" });
                        zMenuRepCli.Add(new MenuItem { Icon = Icon.ReportStart, Handler = "Eds.addAppRptSatisSrv(LmApp.zTabPnl_Centro, 'zTabRptRptSatisfaccionServicio');", Text = "Calidad de Servicio" });
                        zMenuRepCli.Add(new MenuItem { Icon = Icon.PageAttach, Handler = "Eds.addAppRptViajesCarga2(LmApp.zTabPnl_Centro, 'zTabRptViajesCarga1vista');", Text = "Desempeño (1 Vista)" });
                        zMenuRepCli.Add(new MenuItem { Icon = Icon.ReportGo, Handler = "Eds.addAppRptViajesCarga(LmApp.zTabPnl_Centro, 'zTabRptViajesCarga3vistas');", Text = "Desempeño (3 Vistas)" });
                        zMenuRepCli.Add(new MenuItem { Icon = Icon.ReportUser, Handler = "Eds.addAppRptEficiencia(LmApp.zTabPnl_Centro, 'zTabRptViajesEficiencia')", Text = "Eficiencia de Entrega" });
                        zMenuRepCli.Add(new MenuItem { Icon = Icon.ReportMagnify, Handler = "Eds.addAppTab('nivelservicio', 'zTabRptNivelServicio', 'Nivel de Servicio');", Text = "Nivel Servicio" });
                        zBtn_MnuReportesOperacion.Visible = true;
                        zBtn_MnuReportesCliente.Visible = true;
                        zBtn_MnuHerramientaOperacion.Visible = true;
                        accesoValido = true;						 
                        break;

                    case "NISSAN_CONCESIONARIO": /* Red de Concesionarios NISSAN*/
                        zHidden_Perfil.Value = strResultado;
                        zHidden_Concesionario.Value = dataParam[dataParam.Length - 2];
                        zBtn_MnuReportesOperacion.Visible = false;
                        zBtn_MnuReportesCliente.Visible = false;
                        zBtn_MnuHerramientaOperacion.Visible = false;
                        txt_CA_Viaje.Disabled = true;
                        txt_CA_Unidad.Disabled = true;
                        txt_CA_Concesionario.Disabled = true;
                        txt_CA_NoOperador.Disabled = true;
                        zDomServRegEven.Disabled = true;
						accesoValido = true;						 
                        break;
                }
            }
        }

        if (!accesoValido)
        {
            Response.Redirect("http://200.52.73.110:8085/LOGIN");
        }

        /* LUMA Comentado para debug*/
       // ConsultaContactos();
    }

    private static string RastreoService()
    {
        var objText = string.Empty;
        HttpWebRequest request = (HttpWebRequest)WebRequest.Create("http://200.52.73.110:8085/TRIGGER/api/Rastreo/service");
        request.ContentType = "application/json";
        request.Method = "GET";
        request.ContentLength = 0;
        request.Credentials = CredentialCache.DefaultCredentials;
        HttpWebResponse response = (HttpWebResponse)request.GetResponse();

        using (var reader = new StreamReader(response.GetResponseStream()))
        {
            objText = reader.ReadToEnd();
        }
        response.Close();
        return objText;
    }

    private static string TiempoVIajeService()
    {
        var objText = string.Empty;
        HttpWebRequest request = (HttpWebRequest)WebRequest.Create("http://200.52.73.110:8085/TRIGGER/api/TiempoViaje/service?cf=");
        request.ContentType = "application/json";
        request.Method = "GET";
        request.ContentLength = 0;
        request.Credentials = CredentialCache.DefaultCredentials;
        HttpWebResponse response = (HttpWebResponse)request.GetResponse();

        using (var reader = new StreamReader(response.GetResponseStream()))
        {
            objText = reader.ReadToEnd();
        }
        response.Close();
        return objText;
    }

    public  void Logout()
    {
        Cookies.Clear("name");
        Response.Redirect("http://200.52.73.110:8086/");
    }


    [DirectMethod(ClientProxy = ClientProxy.Ignore)]
    public static string Rastreo(string esquema, string procedimiento, string jsonParams)
    {
        if(jsonParams == "{\"Param0\":\"\",\"Param1\":\"\",\"Param2\":\"\",\"Param3\":\"\",\"Param4\":\"\",\"Param5\":\"\",\"Param6\":\"\",\"Param7\":\"\"}")
        {
            return RastreoService();
        }
        else
        {
            return SpGetJsonResult(esquema,procedimiento,jsonParams);
        }
    }



    [DirectMethod(ClientProxy = ClientProxy.Ignore)]
    public static string TiempoViaje(string esquema, string procedimiento, string jsonParams)
    {
        return SpGetJsonResult(esquema,procedimiento,jsonParams);
    }


    [DirectMethod(ClientProxy = ClientProxy.Ignore)]
    public static string ViajeDetalle(string esquema, string procedimiento, string jsonParams)
    {
        return SpGetJsonResult(esquema, procedimiento, jsonParams);
    }

    [DirectMethod(ClientProxy = ClientProxy.Ignore)]
    public static string Entrega(string esquema, string procedimiento, string jsonParams)
    {
        return SpGetJsonResult(esquema, procedimiento, jsonParams);
    }

    [DirectMethod(ClientProxy = ClientProxy.Ignore)]
    public static string Reporte(string esquema, string procedimiento, string jsonParams)
    {
        return SpGetJsonResult(esquema, procedimiento, jsonParams);
    }

    [DirectMethod(ClientProxy = ClientProxy.Ignore)]
    public static string Diario(string esquema, string procedimiento, string jsonParams)
    {
        return SpGetJsonResult(esquema, procedimiento, jsonParams);
    }

    [DirectMethod(ClientProxy = ClientProxy.Ignore)]
    public static string Eficiencia(string esquema, string procedimiento, string jsonParams)
    {
        return SpGetJsonResult(esquema, procedimiento, jsonParams);
    }
    

    [DirectMethod(ClientProxy = ClientProxy.Ignore)]
    public static string MensualDeViaje(string esquema, string procedimiento, string jsonParams)
    {
        return SpGetJsonResult(esquema, procedimiento, jsonParams);
    }

    [DirectMethod(ClientProxy = ClientProxy.Ignore)]
    public static string MensualCVR(string esquema, string procedimiento, string jsonParams)
    {
        return SpGetJsonResult(esquema, procedimiento, jsonParams);
    }

    [DirectMethod(ClientProxy = ClientProxy.Ignore)]
    public static string Calidad(string esquema, string procedimiento, string jsonParams)
    {
        return SpGetJsonResult(esquema, procedimiento, jsonParams);
    }

    [DirectMethod(ClientProxy = ClientProxy.Ignore)]
    public static string Nivel(string esquema, string procedimiento, string jsonParams)
    {
        return SpGetJsonResult(esquema, procedimiento, jsonParams);
    }


    /// <summary>
    /// Método Web para ejecucción de SQL Sp
    /// </summary>
    /// <param name="esquema">Esquema de BD</param>
    /// <param name="procedimiento">Nombre SP</param>
    /// <param name="jsonParams">Objeto JSCON con Parametros de SP</param>
    /// <returns>Cadena con la Representación JSON de un DataSet</returns>

    public static string SpGetJsonResult(string esquema, string procedimiento, string jsonParams)
    {
        string zVarstrresultado;
        try
        {
            /* se haga la llamada al WS ? */


            ZConexion.Open();
            var tmpDomNvoXml = jsonParams.Replace("&gt;", ">").Replace("&lt;", "<").Replace("&", "AND");
            
            var zDataset = ZConexion.ExecuteSpDs(esquema, procedimiento, "table", ParametrosSp(tmpDomNvoXml));
            zVarstrresultado = EvaluaResultadoDataset(ref zDataset);
        }
        catch (Exception ex)
        {
            zVarstrresultado = JsonResulEjec(0, "IIS_ERROR", "SpGetJsonResult", ex.Message);
        }
        return zVarstrresultado;
    }   

    [DirectMethod(ClientProxy = ClientProxy.Ignore)]
    public static DateTime SpGetFechaHora()
    {
        var zVarstrresultado = new DateTime();
        try
        {
            zVarstrresultado = DateTime.Now;
        }
        catch (Exception ex)
        {
            ResourceManager.AjaxErrorMessage = ex.Message;
        }
        return zVarstrresultado;
    }

     private static string EvaluaResultadoDataset(ref DataSet dsEvaluar)
    {
        string zVarstrresultado;

        if (!dsEvaluar.IsNull())
        {
            if (dsEvaluar.Tables[0].Rows.Count > 0)
            {
                zVarstrresultado = JsonConvert.SerializeObject(dsEvaluar, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                    Formatting = Formatting.None,
                    DateFormatHandling = DateFormatHandling.IsoDateFormat,
                    DateTimeZoneHandling = DateTimeZoneHandling.Local,
                });
            }
            else
            {
                zVarstrresultado = JsonResulEjec(0, "SQL_VACIO", "ZdirmeTcargarViajes",
                                                          "No existe información de la unidad seleccionada***");
            }
        }
        else
        {
            zVarstrresultado = JsonResulEjec(0, "SQL_NULL", "ZdirmeTcargarViajes",
                                                      "Servidor de SQL no disponible...");
        }
        return zVarstrresultado;
    }

    private static string JsonResulEjec(short codigo, string clave, string objeto, string observaciones)
    {
        try
        {
            return
                JSON.Serialize(
                    new
                    {
                        TableError =
                            new
                            {
                                CtlCod = codigo.ToString(),
                                CtlCve = clave,
                                CtlObj = objeto,
                                CtlObs = observaciones
                            }
                    });
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
        return null;
    }

    private static object[] ParametrosSp(string jsonParams)
    {
        var dynObj = (JObject)JsonConvert.DeserializeObject(jsonParams);
        var lista = new List<string>();
        foreach (var al in dynObj)
        {
            lista.Add((string)al.Value);
        }
        // ReSharper disable once CoVariantArrayConversion
        return lista.ToArray();
    }


    protected void DescargaManual(object sender, DirectEventArgs e)
    {
        Response.Redirect("~/Ashx/DownloadFile.ashx");
    }

    [DirectMethod]
    public void ConsultaContactos()
    {
        try
        {
            // ZConexion.NoConexion = ConfigurationManager.AppSettings["SIDTUMCon"];
            // ZConexion.RutaArchivoConexiones = "http://" + HttpContext.Current.Request.Url.Host.ToLower() + "/dateds/Universal.xml";
            // ZConexion.RutaArchivoConexiones = ConfigurationManager.AppSettings["RutaDatum"];
            // ZConexion.Open(); ;
            //ZConexion.Catalogo = ConfigurationManager.AppSettings["SIDTUM_Cat"];
            ZConexion.Open();           
            var zDataset = ZConexion.ExecuteSpDs("[DWH]","[SPQRY_ContactosPortal]", "[ContactosPortal]","");

            if (zDataset.Tables["[ContactosPortal]"].Rows.Count != 0)
            {
                z_store_Contactos.DataSource = zDataset.Tables[0];
                z_store_Contactos.DataBind();
                //----------------------------------------------------------------------------------
                TituloTUM.Text = zDataset.Tables["[ContactosPortal]"].Rows[1]["Titulo"].ToString();
                TelTUM.Text = "Oficina: " +  zDataset.Tables["[ContactosPortal]"].Rows[1]["Telefono1"].ToString();
                HyperLink2.Text = zDataset.Tables["[ContactosPortal]"].Rows[1]["Titulo"].ToString();
                HyperLink2.NavigateUrl = "mailto:" + zDataset.Tables["[ContactosPortal]"].Rows[1]["Email"].ToString();
                lbl_atencionTUM1.Text = zDataset.Tables["[ContactosPortal]"].Rows[1]["Descripcion1"].ToString();
                lbl_atencionTUM2.Text = zDataset.Tables["[ContactosPortal]"].Rows[1]["Descripcion2"].ToString();               
                TelTUM1.Text = "Nextel: " + zDataset.Tables["[ContactosPortal]"].Rows[1]["Nombre"].ToString() + ' ' +
                zDataset.Tables["[ContactosPortal]"].Rows[1]["Telefono2"].ToString();
                //---------------------------------------------------------------------------------
                TituloSoporte.Text = zDataset.Tables["[ContactosPortal]"].Rows[0]["Titulo"].ToString();               
                HyperLink3.Text = zDataset.Tables["[ContactosPortal]"].Rows[0]["Titulo"].ToString();
                HyperLink3.NavigateUrl = "mailto:" + zDataset.Tables["[ContactosPortal]"].Rows[0]["Email"].ToString();
                lbl_AtencionSoporte1.Text = zDataset.Tables["[ContactosPortal]"].Rows[0]["Descripcion1"].ToString();
                lbl_AtencionSoporte2.Text = zDataset.Tables["[ContactosPortal]"].Rows[0]["Descripcion2"].ToString();               
                //---------------------------------------------------------------------------------
            }
            else
            {
                X.Msg.Show(new MessageBoxConfig
                {
                    Buttons = MessageBox.Button.OK,
                    Icon = MessageBox.Icon.INFO,
                    Title = "Informacion",
                    Message = "No se encontraron registros"
                });
            }


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





    protected void Unnamed_DirectClick(object sender, DirectEventArgs e)
    {
        if(Request.Cookies["name"] != null)
        {
            Response.Cookies["name"].Expires = DateTime.Now.AddDays(-1);
        }
        Session.Abandon();
        Response.Redirect("http://200.52.73.110:8085/LOGIN");
    }
}

