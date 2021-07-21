using System;
using System.Configuration;
using System.Data;
//using Microsoft.Reporting.WebForms;
using NETDataLuma;
using Ext.Net;


namespace Cool
{

    public partial class ASPX_OE_SmarthPhone : System.Web.UI.Page
    {
        private string _perfil = string.Empty;
        private string _usuario = string.Empty;

        private DataSet z_dtsEmbaques;
        private ExecStoreSql _ejecutorSqlHarvester = new ExecStoreSql(ConfigurationManager.AppSettings["CON_PRODUCCION_11"], ConfigurationManager.AppSettings["BD_SIDTUM_PROD"], "http://www.tum.com.mx/datum/universal.xml");//OK A PRODUCCION

        protected void Page_Load(object sender, EventArgs e)
        {
            if (X.IsAjaxRequest) return;
            _perfil = Request.QueryString["param1"];
            _usuario = Request.QueryString["param2"];
            // var fechaActual = DateTime.Now;

            try
            {
               /* switch (_perfil)
                {
                    case "NISSAN_USUARIO":
                        z_strOperadores.DataSource = zMetConsultaOperadores();
                        z_strOperadores.DataBind();
                        break;
                    case "NISSAN_EJECUTIVO":
                        z_strOperadores.DataSource = zMetConsultaOperadores();
                        z_strOperadores.DataBind();
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

        [DirectMethod]
        public string zMetConsultaEmbarques(string zparFolioViaje, string zparOperador, string zparFechaIni, string zparFechaFin)
        {
            string z_varstrresultado = "";
            string spNombre = "ConsultaEmbarques";
            try
            {
                               
                z_dtsEmbaques = _ejecutorSqlHarvester.ExecuteSpDs("SPQRY_EmbarquesRegistradosSIDMOVIL", "Embarques", zparFolioViaje, zparOperador, zparFechaIni, zparFechaFin);

                if (z_dtsEmbaques != null)
                {
                    if (z_dtsEmbaques.Tables["Embarques"].Rows.Count > 0)
                    {
                        if (z_dtsEmbaques.Tables["Embarques"].Rows[0][1].ToString() != "SQL_ERROR")
                        {

                            z_strBusqueda.DataSource = z_dtsEmbaques.Tables["Embarques"];
                            z_strBusqueda.DataBind();
                            z_GrdPnl_Detalle.ReRender();
                            z_varstrresultado = JsonResulEjec(1, "SQL_OK", spNombre, "");
                        }
                        else
                        {
                            z_varstrresultado = JsonResulEjec(0, "SQL_ERROR", spNombre, "Error en ejecución SQL...");
                        }
                    }
                    else
                    {
                        z_varstrresultado = JsonResulEjec(3, "SQL_VACIO", spNombre, "No existen datos ...");
                    }
                }
                else
                {
                    z_varstrresultado = JsonResulEjec(0, "SQL_NULL", spNombre, "Servidor de SQL no disponible...");

                }
            }

            catch (Exception ex)
            {
                ExtNet.Msg.Show(new MessageBoxConfig
                {
                    Buttons = MessageBox.Button.OK,
                    Icon = MessageBox.Icon.INFO,
                    Title = "Error",
                    Message = JsonResulEjec(0, "SQL_ERROR", spNombre, "Error en ejecución SQL..."),
                });
                ResourceManager.AjaxSuccess = false;
                ResourceManager.AjaxErrorMessage = ex.Message;
            }

            return z_varstrresultado;


        }

        protected void Store1_RefreshData(object sender, StoreReadDataEventArgs e)
        {
            if (z_dtsEmbaques!=null){
                z_strBusqueda.DataSource = z_dtsEmbaques.Tables["Embarques"];
                z_strBusqueda.DataBind();
            }
        }

        private static string JsonResulEjec(Int16 codigo, string clave, string objeto, string observaciones)
        {
            var sbResultado = new System.Text.StringBuilder();
            try
            {

                sbResultado.Append("{\"Rows\":[{");
                sbResultado.Append("\"CtlCod\":" + codigo.ToString() + ",");
                sbResultado.Append("\"CtlCve\":\"" + clave + "\",");
                sbResultado.Append("\"CtlObj\":\"" + objeto + "\",");
                sbResultado.Append("\"CtlObs\":\"" + observaciones + "\"}]}");
            }
            catch (Exception ex)
            {
                ExtNet.Msg.Show(new MessageBoxConfig
                {
                    Buttons = MessageBox.Button.OK,
                    Icon = MessageBox.Icon.INFO,
                    Title = "Error",
                    Message = "Error no Tipificado"
                });
                ResourceManager.AjaxSuccess = false;
                ResourceManager.AjaxErrorMessage = ex.Message;
            }
            return sbResultado.ToString();

        }

        private DataSet zMetConsultaOperadores()
        {
            DataSet z_dtsOperadores = new DataSet();
            z_dtsOperadores = _ejecutorSqlHarvester.ExecuteSpDs("SPQRY_OperadorClaveDescripcion", "Operadores", "");
            return z_dtsOperadores;
        }

    }
}