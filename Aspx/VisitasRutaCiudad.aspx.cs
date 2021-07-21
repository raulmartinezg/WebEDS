using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using Ext.Net;


namespace Cool
{
    public partial class ASPX_RutasPorMes : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [DirectMethod]
        public string zMetConsultaRutasxMes(string zparFechaInicial, string zparFechaFinal)
        {
            UoMetodos z_metodos = new UoMetodos();
            string z_varstrresultado = "";
            string spNombre = "SPRPT_RutasPorMes";

            try
            {

                DataSet z_dtsRutas = z_metodos.ZMetConsultaRutas(zparFechaInicial, zparFechaFinal);

                if (z_dtsRutas != null)
                {
                    if (z_dtsRutas.Tables["RutasxMes"].Rows.Count > 0)
                    {
                        if (z_dtsRutas.Tables["RutasxMes"].Rows[0][1].ToString() != "SQL_ERROR")
                        {

                            z_strConsultaRutasxMes.DataSource = z_dtsRutas.Tables["RutasxMes"];
                            z_strConsultaRutasxMes.DataBind();
                            z_varstrresultado = z_metodos.JsonResulEjec(1, "SQL_OK", spNombre, "");
                        }
                        else
                        {
                            z_varstrresultado = z_metodos.JsonResulEjec(0, "SQL_ERROR", spNombre, "Error en ejecución SQL...");
                        }
                    }
                    else
                    {
                        z_varstrresultado = z_metodos.JsonResulEjec(3, "SQL_VACIO", spNombre, "No existen datos ...");
                    }
                }
                else
                {
                    z_varstrresultado = z_metodos.JsonResulEjec(0, "SQL_NULL", spNombre, "Servidor de SQL no disponible...");

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