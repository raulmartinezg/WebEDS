using System;
using System.Data;
using Ext.Net;


namespace Cool
{
    public partial class Aspx_VisitasCiudad : System.Web.UI.Page
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
        public string zMetConsultaVistasCiudad(string zparInicial, string zparFinal)
        {
            string z_varstrresultado = "";
            UoMetodos z_metodos = new UoMetodos();
            try
            {
                DataSet z_dtsVisitasCiudad = z_metodos.ZMetConsultaVisitasCiudad(zparInicial, zparFinal);
                if(z_dtsVisitasCiudad!=null)
                {
                    if(z_dtsVisitasCiudad.Tables["VisitasCiudad"].Rows.Count>0)
                    {
                        if(z_dtsVisitasCiudad.Tables["VisitasCiudad"].Rows[0][1].ToString()!="SQL_ERROR")
                        {
                            z_strConsulta.DataSource = z_dtsVisitasCiudad.Tables["VisitasCiudad"];
                            z_strConsulta.DataBind();
                            z_varstrresultado = z_metodos.JsonResulEjec(1, "SQL_OK", "Embarques", "");
                        }
                        else
                        {
                            z_varstrresultado = z_metodos.JsonResulEjec(0, "SQL_ERROR", "Embarques", "Error en ejecución SQL...");
                        }
                    }
                    else
                    {
                        z_varstrresultado = z_metodos.JsonResulEjec(0, "SQL_VACIO", "Embarques", "Error en ejecución SQL...");
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