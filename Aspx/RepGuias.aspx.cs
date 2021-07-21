using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using Ext.Net;
using Ext.Net.Utilities;
using NETDataLuma;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


namespace Aspx
{
    public partial class AspxRepGuias : System.Web.UI.Page
    {
        private static readonly ExecStoreSql ZConexion = new ExecStoreSql(ConfigurationManager.AppSettings["SIDTUMCon"], ConfigurationManager.AppSettings["SIDTUM_Cat"], ConfigurationManager.AppSettings["RutaDatum"]);
        private DataSet _zDataset = new DataSet();
        //UoMetodos z_metodos = new UoMetodos();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (X.IsAjaxRequest) return;
            ZdirmeLlenaCombo();
        }

        [DirectMethod]
        public string ZdirmeCargarGuia(string jsonParams)
        {
            var zVarstrresultado = string.Empty;
            try
            {
        _zDataset = ZConexion.ExecuteSpDs("SPQRY_Buscaguias", "sidtum_Buscaguias", ParametrosSp(jsonParams));

                if (!_zDataset.IsNull())
                {
                    if (_zDataset.Tables[0].Rows.Count > 0)
                    {

                        if (_zDataset.Tables[0].Columns[0].ColumnName != "CtlCod")
                        {
                            zVarstrresultado = JsonResulEjec(1, "SQL_OK", "ZdirmeCargarGuia", "");
                            z_Store_Resultado.DataSource = _zDataset.Tables[0];
                            z_Store_Resultado.DataBind();
                        }
                        else
                        {
                            zVarstrresultado = JsonResulEjec(0, "SQL_ERROR", "ZdirmeCargarGuia",
                                                                      "Error en ejecución SQL...");
                        }
                    }
                    else
                    {
                        zVarstrresultado = JsonResulEjec(0, "SQL_VACIO", "ZdirmeCargarGuia",
                                                                  "Error en ejecución SQL...");
                    }
                }
                else
                {
                    zVarstrresultado = JsonResulEjec(0, "SQL_NULL", "ZdirmeCargarGuia",
                                                              "Servidor de SQL no disponible...");
                }


            }
            catch (Exception ex)
            {
                zVarstrresultado = JsonResulEjec(0, "IIS_ERROR", "ZdirmeCargarGuia", ex.Message);

            }
            return zVarstrresultado;
        }

        
        [DirectMethod]
        public string ZdirViajeRuta()
        {
            var zVarstrresultado1 = string.Empty;
            
            try
            {
                ZConexion.NoConexion = ConfigurationManager.AppSettings["SID_autocarga_con"];
               ZConexion.RutaArchivoConexiones = ConfigurationManager.AppSettings["RutaDatum"];
                //  ZConexion.RutaArchivoConexiones = "D:/web/datum/Universal.xml";
                ZConexion.Catalogo = ConfigurationManager.AppSettings["SID_autocarga_cat"];
                ZConexion.Open();
                _zDataset = ZConexion.ExecuteSpDs("SPQRY_VericaRutasConcesionarios", "sidtum_VerificaRuta");

                if (!_zDataset.IsNull())
                {
                    if (_zDataset.Tables[0].Rows.Count > 0)
                    {

                        if (_zDataset.Tables[0].Columns[0].ColumnName != "CtlCod")
                        {
                            zVarstrresultado1 = JsonResulEjec(1, "SQL_OK", "ZdirViajeRuta", "");

                           
                            z_Store_ViajeRuta.DataSource = _zDataset.Tables[0];
                            z_Store_ViajeRuta.DataBind();
                        }
                        else
                        {
                            zVarstrresultado1 = JsonResulEjec(0, "SQL_ERROR", "ZdirViajeRuta",
                                                                      "Error en ejecución SQL...");
                        }
                    }
                    else
                    {
                        zVarstrresultado1 = JsonResulEjec(0, "SQL_VACIO", "ZdirViajeRuta",
                                                                  "Error en ejecución SQL...");
                    }
                }
                else
                {
                    zVarstrresultado1 = JsonResulEjec(0, "SQL_NULL", "ZdirViajeRuta",
                                                              "Servidor de SQL no disponible...");
                }
            }
            catch (Exception ex)
            {
                zVarstrresultado1 = JsonResulEjec(0, "IIS_ERROR", "ZdirViajeRuta", ex.Message);

            }
            return zVarstrresultado1;
        }


        [DirectMethod]
        public string ZdirmeModificaGuia(string jsonParams)
        {
            var zVarstrresultado = string.Empty;
            try
            {
                ZConexion.NoConexion = ConfigurationManager.AppSettings["SID_autocarga_con"];
                 ZConexion.RutaArchivoConexiones = ConfigurationManager.AppSettings["RutaDatum"];
                //  ZConexion.RutaArchivoConexiones = "D:/web/datum/Universal.xml";
                ZConexion.Catalogo = ConfigurationManager.AppSettings["SID_autocarga_cat"];
                ZConexion.Open();
               // _zDataset = ZConexion.ExecuteSpDs("SPUPD_DesAisgnaGuias", "sidtum_DesAisgnaGuias", ParametrosSp(jsonParams));
                _zDataset = ZConexion.ExecuteSpDs("SPUPD_DesAisgnaGuias1", "sidtum_DesAisgnaGuias", ParametrosSp(jsonParams));

                if (!_zDataset.IsNull())
                {
                    if (_zDataset.Tables[0].Rows.Count > 0)
                    {

                        if (_zDataset.Tables[0].Rows[0][1].ToString() != "SQL_ERROR")
                        {
                            zVarstrresultado = JsonResulEjec(1, "SQL_OK", "ZdirmeModificaGuia", "");
                        }
                        else
                        {
                            zVarstrresultado = JsonResulEjec(0, "SQL_ERROR", "ZdirmeModificaGuia",
                                                                      "Error en ejecución SQL...");
                        }
                    }
                    else
                    {
                        zVarstrresultado = JsonResulEjec(0, "SQL_VACIO", "ZdirmeModificaGuia",
                                                                  "Error en ejecución SQL...");
                    }
                }
                else
                {
                    zVarstrresultado = JsonResulEjec(0, "SQL_NULL", "ZdirmeModificaGuia",
                                                              "Servidor de SQL no disponible...");
                }

            }
            catch (Exception ex)
            {
                zVarstrresultado = JsonResulEjec(0, "IIS_ERROR", "ZdirmeModificaGuia", ex.Message);

            }
            return zVarstrresultado;
        }


        [DirectMethod]
        public string ZdirmeLlenaCombo()
        {
            var zVarstrresultado = string.Empty;
            try
            {
                ZConexion.NoConexion = ConfigurationManager.AppSettings["SIDTUMCon"];
                ZConexion.RutaArchivoConexiones = ConfigurationManager.AppSettings["RutaDatum"];
                // ZConexion.RutaArchivoConexiones = "D:/web/datum/Universal.xml";
                ZConexion.Catalogo = ConfigurationManager.AppSettings["SIDTUM_Cat"];
                ZConexion.Open();
                _zDataset = ZConexion.ExecuteSpDs("SPQRY_Combo_FolioViaje", "sidtum_ComboViaje");

                if (_zDataset.Tables[0].Rows.Count > 0)
                {
                    zVarstrresultado = JsonResulEjec(1, "SQL_OK", "ZdirmeLlenaCombo", "");
                    z_Store_Combo.DataSource = _zDataset.Tables[0];
                    z_Store_Combo.DataBind();
                    
                }
                else
                {
                    z_cmbViaje.Disabled = true;
                    z_reestablecer.Disabled = true;
                    zVarstrresultado = JsonResulEjec(1, "SQL_OK", "ZdirmeLlenaCombo", "");
                }
            }
            catch (Exception ex)
            {
                zVarstrresultado = JsonResulEjec(0, "IIS_ERROR", "ZdirmeLlenaCombo", ex.Message);

            }
            return zVarstrresultado;
        }


        [DirectMethod]
        public string ZdirmeRutaCiudad(string jsonParams)
        {
            var zVarstrresultado = string.Empty;
            try
            {
                ZConexion.NoConexion = ConfigurationManager.AppSettings["SIDTUMCon"];
                //ZConexion.RutaArchivoConexiones = ConfigurationManager.AppSettings["RutaDatum"];
                 ZConexion.RutaArchivoConexiones = "D:/web/datum/Universal.xml";
                ZConexion.Catalogo = ConfigurationManager.AppSettings["SIDTUM_Cat"];
                ZConexion.Open();
                _zDataset = ZConexion.ExecuteSpDs( "dbo","SPQRY_FolioViajeRutaCiudad", "sidtum_Consulta", jsonParams.ToString());

                if (!_zDataset.IsNull())
                {
                    if (_zDataset.Tables["sidtum_Consulta"].Rows.Count > 0)
                    {

                        if (_zDataset.Tables["sidtum_Consulta"].Columns[0].ColumnName != "CtlCod")
                        {
                            zVarstrresultado = JsonResulEjec(1, "SQL_OK", "ZdirmeRutaCiudad", "");

                            z_store_InfoGral.DataSource = _zDataset.Tables["sidtum_Consulta"];
                            z_store_InfoGral.DataBind();
                            z_store_RutaCiudad.DataSource = _zDataset.Tables["sidtum_Consulta1"];
                            z_store_RutaCiudad.DataBind();
                            z_store_CiudadConcesionario.DataSource = _zDataset.Tables["sidtum_Consulta2"];
                            z_store_CiudadConcesionario.DataBind();                          

                            lbl_NumeroViaje.Text = _zDataset.Tables["sidtum_Consulta"].Rows[0]["FolioViaje"].ToString();
                            lbl_Operador.Text = _zDataset.Tables["sidtum_Consulta"].Rows[0]["Operador"].ToString();
                            lbl_NumUnidad.Text = _zDataset.Tables["sidtum_Consulta"].Rows[0]["Unidad"].ToString();
                            lbl_Ayudante.Text = _zDataset.Tables["sidtum_Consulta"].Rows[0]["Ayudante"].ToString();
                        }
                        else
                        {
                            zVarstrresultado = JsonResulEjec(0, "SQL_ERROR", "ZdirmeRutaCiudad",
                                                                      "Error en ejecución SQL...");
                        }
                    }
                    else
                    {
                        zVarstrresultado = JsonResulEjec(0, "SQL_VACIO", "ZdirmeRutaCiudad",
                                                                  "Error en ejecución SQL...");
                    }
                }
                else
                {
                    zVarstrresultado = JsonResulEjec(0, "SQL_NULL", "ZdirmeRutaCiudad",
                                                              "Servidor de SQL no disponible...");
                }
            }
            catch (Exception ex)
            {
                zVarstrresultado = JsonResulEjec(0, "IIS_ERROR", "ZdirmeRutaCiudad", ex.Message);

            }
            return zVarstrresultado;
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

        public string JsonResulEjec(short codigo, string clave, string objeto, string observaciones)
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
            return sbResultado.ToString();

        }



    }
}



