using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Web;
using System.Web.UI;
using System.Xml;
using System.Xml.Xsl;
using System.Xml.Linq;
using Ext.Net;
using Ext.Net.Utilities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NETDataLuma;
using System.Linq;
using Formatting = Newtonsoft.Json.Formatting;


namespace Aspx
{
    public partial class AspxReporteTerminales : System.Web.UI.Page
    {

        private static readonly ExecStoreSql ZConexion = new ExecStoreSql();
        private static DataSet _zDataset = new DataSet();
        static readonly UoMetodos ZMetodos = new UoMetodos();
        private string _perfil = string.Empty;


        protected void Page_Load(object sender, EventArgs e)
        {
            if (X.IsAjaxRequest) return;
            _perfil = Request.QueryString["param1"];
            // _perfil = "NISSAN_USUARIO";
            // _usuario = Request.QueryString["param2"];
          try
            {
                switch (_perfil)
                {
                    case "NISSAN_USUARIO2":
                        break;
                    default:
                        Response.Redirect(@"~/Aspx/UsuarioNoVal.aspx");
                        break;
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


        #region DirectMethod


        [DirectMethod(ClientProxy = ClientProxy.Ignore)]
        public static string SpGetJsonResult(string esquema, string procedimiento, string jsonParams, string servidorBd, string catalogo)
        {
            string zVarstrresultado;
            try
            {
                ZConexion.NoConexion = ConfigurationManager.AppSettings["SIDTUMCon"];
                //ZConexion.RutaArchivoConexiones = "http://" + HttpContext.Current.Request.Url.Host.ToLower() + "/datum/Universal.xml";
                 ZConexion.RutaArchivoConexiones = "D:/web/datum/Universal.xml";
                ZConexion.Catalogo = ConfigurationManager.AppSettings["SIDTUM_Cat"];
                ZConexion.Open();
                var tmpDomNvoXml = jsonParams.Replace("&gt;", ">").Replace("&lt;", "<");
                tmpDomNvoXml = tmpDomNvoXml.Replace("&", "AND").Replace("&lt;", "<");
                var zDataset = ZConexion.ExecuteSpDs(esquema, procedimiento, "Table", ParametrosSp(tmpDomNvoXml));

                if (!zDataset.IsNull())
                {
                    if (zDataset.Tables[0].Rows.Count > 0)
                    {
                        if (zDataset.Tables[0].Columns[0].ColumnName != "CtlCod")
                        {
                            zVarstrresultado = JsonConvert.SerializeObject(zDataset, new JsonSerializerSettings
                            {
                                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                                Formatting = Formatting.None,
                                DateFormatHandling = DateFormatHandling.IsoDateFormat,
                                DateTimeZoneHandling = DateTimeZoneHandling.Local,
                            });
                        }
                        else
                        {
                            zVarstrresultado = ZMetodos.JsonResulEjec(0, "SQL_ERROR", "ZdirmeTcargarViajes",
                                                                     zDataset.Tables[0].Rows[0][3].ToString());
                        }
                    }
                    else
                    {
                        zVarstrresultado = ZMetodos.JsonResulEjec(0, "SQL_VACIO", "ZdirmeTcargarViajes",
                                                                  "No existe información de la unidad seleccionada***");
                    }
                }
                else
                {
                    zVarstrresultado = ZMetodos.JsonResulEjec(0, "SQL_NULL", "ZdirmeTcargarViajes",
                                                              "Servidor de SQL no disponible...");
                }
            }
            catch (Exception ex)
            {
                zVarstrresultado = ZMetodos.JsonResulEjec(0, "IIS_ERROR", "ZdirmeTcargarViajes", ex.Message);
                ResourceManager.AjaxErrorMessage = ex.Message;
            }
            return zVarstrresultado;
        }


        //[DirectMethod]
        //public string ZConsulta()
        //{
        //    var zVarstrresultado = string.Empty;
        //    try
        //    {
        //        ZConexion.NoConexion = ConfigurationManager.AppSettings["SIDTUMCon"];
        //        ZConexion.RutaArchivoConexiones = "http://" + HttpContext.Current.Request.Url.Host.ToLower() + "/datum/Universal.xml";
        //        ZConexion.Catalogo = ConfigurationManager.AppSettings["SIDTUM_Cat"];
        //        ZConexion.Open();
        //        _zDataset = ZConexion.ExecuteSpDs("dbo", "SPQRY_ReporteTerminales", "SPQRY_ReporteTerminales", "2016-01-01 00:00:01.000", "2016-05-08 17:14:39.000");

        //        if (_zDataset.Tables[0].Rows.Count > 0)
        //        {
        //            zVarstrresultado = ZMetodos.JsonResulEjec(1, "SQL_OK", "ZConsulta", "");
        //            zStore_GridDetalle.DataSource = _zDataset.Tables[2];
        //            zStore_GridDetalle.DataBind();

        //        }
        //        else
        //        {
        //            zVarstrresultado = ZMetodos.JsonResulEjec(1, "SQL_OK", "ZConsulta", "");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        zVarstrresultado = ZMetodos.JsonResulEjec(0, "IIS_ERROR", "ZConsulta", ex.Message);

        //    }
        //    return zVarstrresultado;
        //}
        #endregion

        #region private Method
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
            return lista.ToArray();
        }

        #endregion



    }
}