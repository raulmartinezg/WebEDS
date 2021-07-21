using System;
using System.Data;
using Ext.Net;

namespace Cool
{
    public partial class Aspx_KilometrosUnidad : System.Web.UI.Page
    {
        private string _perfil = string.Empty;
        private string _usuario = string.Empty;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (X.IsAjaxRequest) return;
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
        public string zMetConsultaKmUnidad(string zparInicio, string zparFin)
        {
            string z_varstrresultado = "";
            UoMetodos z_metodos= new UoMetodos();
            string z_varstrSP = "MISP";

            try
            {
                DataSet z_dtsKmUnidad = z_metodos.ZMetConsultaKmUnidad(zparInicio, zparFin);

                if(z_dtsKmUnidad!=null)
                {
                    if (z_dtsKmUnidad.Tables["KmUnidad"].Rows.Count > 0)
                    {
                        if (z_dtsKmUnidad.Tables["KmUnidad"].Rows[0][1].ToString() != "SQL_ERROR")
                        {
                            z_varstrresultado = z_metodos.JsonResulEjec(1, "SQL_OK", "Embarques", "");
                            z_strConsulta.DataSource = z_dtsKmUnidad.Tables["KmUnidad"];
                            z_strConsulta.DataBind();
                        }
                        else
                        {
                            z_varstrresultado = z_metodos.JsonResulEjec(0, "SQL_ERROR", "Embarques", "Error en ejecución SQL...");
                        }

                    }
                    else
                    {
                        z_varstrresultado = z_metodos.JsonResulEjec(3, "SQL_VACIO", z_varstrSP, "No existen datos ...");
                    }
                }
                else
                {
                    z_varstrresultado = z_metodos.JsonResulEjec(0, "SQL_NULL", z_varstrSP, "Servidor de SQL no disponible...");
                }

            }
            catch
            {
                z_varstrresultado = z_metodos.JsonResulEjec(0, "SQL_ERROR", z_varstrSP, "Error en ejecución SQL...");
            }

            return z_varstrresultado;
        }
    }
}