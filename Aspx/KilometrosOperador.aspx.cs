using System;
using System.Data;
using Ext.Net;


namespace Cool
{
    public partial class Aspx_KilometrosOperador : System.Web.UI.Page
    {
        private string _perfil = string.Empty;
        private string _usuario = string.Empty;

        protected void Page_Load(object sender, EventArgs e)
        {
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
        public string zMetConsultaKmXOperador(string zparInicial, string zparFinal)
        {
            string z_varstrresultado = "";
            UoMetodos z_metodos= new UoMetodos();

            try
            {

                DataSet z_dtsKmOperador = z_metodos.ZMetConsultaKmOperador(zparInicial, zparFinal);

                if(z_dtsKmOperador!=null)
                {
                    if (z_dtsKmOperador.Tables["KmOperador"].Rows.Count > 0)
                    {
                        if (z_dtsKmOperador.Tables["KmOperador"].Rows[0][1].ToString() != "SQL_ERROR")
                        {
                            z_varstrresultado = z_metodos.JsonResulEjec(1, "SQL_OK", "Embarques", "");
                            z_strBusqueda.DataSource = z_dtsKmOperador.Tables["KmOperador"];
                            z_strBusqueda.DataBind();
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