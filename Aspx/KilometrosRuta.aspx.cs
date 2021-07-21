using System;
using System.Collections.Generic;
using System.Data;
using Ext.Net;
using Ext.Net.Utilities;

namespace Cool
{
    public partial class Aspx_KilometrosRuta : System.Web.UI.Page
    {
        readonly UoMetodos _zMetodos = new UoMetodos();
        private string _perfil = string.Empty;
        private string _usuario = string.Empty;

        protected void Page_Load(object sender, EventArgs e)
        {
            _perfil = Request.QueryString["param1"];
            _usuario = Request.QueryString["param2"];
            var zDtsCataloRutas = _zMetodos.ZMetConsultaClasificacionRuta();
            z_str_ClasificacionRuta.DataSource = zDtsCataloRutas.Tables["CatalogRutas"];
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
        public string zMetConsultaKmRuta(string zparInicio, string zparFin, string zparClaveClasificacionRuta)
        {
            string z_varstrresultado = "";

            try
            {
                var z_dtsKmRuta = _zMetodos.ZMetConsultaKmRuta(zparInicio, zparFin, zparClaveClasificacionRuta);

                if(!z_dtsKmRuta.IsNull())
                {
                    if (z_dtsKmRuta.Tables["KmRuta"].Rows.Count > 0)
                    {
                        if (z_dtsKmRuta.Tables["KmRuta"].Rows[0][1].ToString() != "SQL_ERROR")
                        {
                            z_strConsulta.DataSource = z_dtsKmRuta.Tables["KmRuta"];
                            z_strConsulta.DataBind();

                            var resultadoAnnio = new List<object>();

                            foreach (DataRow row in z_dtsKmRuta.Tables["KmRuta"].Rows)
                            {
                                var totalKilometros = 0;
                                //foreach (var item in row.ItemArray)
                                //{
                                    for (var i = 3; i < 15; i++)
                                    {
                                        totalKilometros += ( DBNull.Value.Equals(row.ItemArray[i])) ? 0 : (int)row.ItemArray[i];
                                    }

                                    resultadoAnnio.Add(new { Year = (string) row["Year"], Kilometros = totalKilometros });
                               // }
                            }
                            /* Chart1.RemoveAll();
                            z_str_grafiaAnnio.DataSource = resultadoAnnio;
                            z_str_grafiaAnnio.DataBind();*/

                            
                            z_varstrresultado = _zMetodos.JsonResulEjec(1, "SQL_OK", "Embarques", "");
                        }
                        else
                        {
                            z_varstrresultado = _zMetodos.JsonResulEjec(0, "SQL_ERROR", "Embarques", "Error en ejecución SQL...");
                        }
                    }
                    else
                    {
                        z_varstrresultado = _zMetodos.JsonResulEjec(0, "SQL_VACIO", "Embarques", "Error en ejecución SQL...");
                    }

                }
                else
                {
                    z_varstrresultado = _zMetodos.JsonResulEjec(0, "SQL_NULL", "Embarques", "Servidor de SQL no disponible...");
                }

            }
            catch (Exception ex)
            {
                z_varstrresultado = _zMetodos.JsonResulEjec(0, "SQL_ERROR", "Embarques", "Error en ejecución SQL...");
            }

            return z_varstrresultado;
        }
    }
}