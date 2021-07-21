using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Ext.Net;
using Ext.Net.Utilities;

public partial class Aspx_DWHEficienciaTiempoEntregaRutas : System.Web.UI.Page
{
    readonly UoMetodos _zMetodos = new UoMetodos();
    private string _perfil = string.Empty;
    private string _usuario = string.Empty;

    protected void Page_Load(object sender, EventArgs e)
    {
        if (X.IsAjaxRequest) return;
        _perfil = Request.QueryString["param1"];
        _usuario = Request.QueryString["param2"];


        z_dtnInicial.MinDate = DateTime.Parse("2015-01-01");
        z_dtnInicial.MaxDate = DateTime.Now;
        z_dtnInicial.SetValue(DateTime.Parse("2015-01-01"));
        z_dtnFinal.SetValue(DateTime.Now);
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
    public string ZMetMensualDeViajesGrid(string zparInicio, string zparFinal)
    {
        string zVarstrresultado;

        try
        {
            var zDtsDiarioDeViajes = _zMetodos.ZMetEficienciaTiemposEntrega(zparInicio, zparFinal);

            if (!zDtsDiarioDeViajes.IsNull())
            {
                if (zDtsDiarioDeViajes.Tables["EficienciaTiempoEntrega"].Rows.Count > 0)
                {
                    if (zDtsDiarioDeViajes.Tables["EficienciaTiempoEntrega"].Rows[0][1].ToString() != "SQL_ERROR")
                    {
                        z_GrdPnl_Detalle.GetStore().DataSource = zDtsDiarioDeViajes.Tables[0];
                        z_GrdPnl_Detalle.GetStore().DataBind();
                        // -------------------------------------------------------------------------------------------
                        /* Chart1.RemoveAll();
                        Chart2.RemoveAll();
                        Chart1.GetStore().DataSource = zDtsDiarioDeViajes.Tables[1];
                        Chart1.GetStore().DataBind();
                        Chart2.GetStore().DataSource = zDtsDiarioDeViajes.Tables[2];
                        Chart2.GetStore().DataBind();*/
                        // -------------------------------------------------------------------------------------------
                        zVarstrresultado = _zMetodos.JsonResulEjec(1, "SQL_OK", "Embarques", "");
                    }
                    else
                    {
                        zVarstrresultado = _zMetodos.JsonResulEjec(0, "SQL_ERROR", "Embarques", "Error en ejecución SQL...");
                    }
                }
                else
                {
                    zVarstrresultado = _zMetodos.JsonResulEjec(0, "SQL_VACIO", "Embarques", "Error en ejecución SQL...");
                }

            }
            else
            {
                zVarstrresultado = _zMetodos.JsonResulEjec(0, "SQL_NULL", "Embarques", "Servidor de SQL no disponible...");
            }

        }
        catch
        {
            zVarstrresultado = _zMetodos.JsonResulEjec(0, "SQL_ERROR", "Embarques", "Error en ejecución SQL...");
        }

        return zVarstrresultado;
    }

}