using System;
using System.Configuration;
using System.Data;
using NETDataLuma;
using Ext.Net;


namespace Cool
{
    public partial class ASPX_EmbarquesOperador : System.Web.UI.Page
    {

        private ExecStoreSql _ejecutorSqlHarvester = new ExecStoreSql(ConfigurationManager.AppSettings["CON_PRODUCCION_11"], ConfigurationManager.AppSettings["BD_SIDTUM_PROD"], "http://www.tum.com.mx/datum/universal.xml");//OK A PRODUCCION
        private string _perfil = string.Empty;
        private string _usuario = string.Empty;

        protected void Page_Load(object sender, EventArgs e)
        {
            _perfil = Request.QueryString["param1"];
            _usuario = Request.QueryString["param2"];
            try
            {
                switch (_perfil)
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
       
        [DirectMethod]
        public string zMetConsultaEmbarques(string zparFechaInicial, string zparFechaFinal)
        {
            DataSet z_dtsEmbarques = new DataSet();
            string z_varstrresultado = "";
            UoMetodos z_metodos = new UoMetodos();
            try
            {                
                z_dtsEmbarques = z_metodos.ZMetConsultaEmbxOperador(zparFechaInicial, zparFechaFinal);
                if (z_dtsEmbarques != null)
                {
                    if (z_dtsEmbarques.Tables["Embarques"].Rows.Count > 0)
                    {
                        if (z_dtsEmbarques.Tables["Embarques"].Rows[0][1].ToString() != "SQL_ERROR")
                        {
                            z_varstrresultado = z_metodos.JsonResulEjec(1, "SQL_OK", "Embarques", "");
                            z_strConsulta.DataSource = z_dtsEmbarques.Tables["Embarques"];
                            z_strConsulta.DataBind();
                        }
                        else
                        {
                            z_varstrresultado = z_metodos.JsonResulEjec(0, "SQL_ERROR", "Embarques", "Error en ejecución SQL...");
                        }
                    }
                    else
                    {
                        z_varstrresultado = z_metodos.JsonResulEjec(3, "SQL_VACIO", "Embarques", "No existen datos ...");
                    }
                   
                }
                else
                {
                    z_varstrresultado = z_metodos.JsonResulEjec(0, "SQL_NULL", "Embarques", "Servidor de SQL no disponible...");
                }
            }
            catch
            {
                z_varstrresultado = z_metodos.JsonResulEjec(0, "SQL_ERROR", "Embarques", "Error en ejecución SQL...");
            }

            return z_varstrresultado;
        }
        
    }
}