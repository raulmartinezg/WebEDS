using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Ext.Net;
using Ext.Net.Utilities;

public partial class Aspx_DWHViajesCarga : System.Web.UI.Page
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
                /*default:
                    Response.Redirect(@"~/AccesoNoAutorizado.html");
                    break;*/
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
    public string ZMetViajesCarga(string zparInicio, string zparFinal)
    {
        var zVarstrresultado = "";

        try
        {
            var zDtsPorcentajeCarga = _zMetodos.ZMetConsultaViajesPorcentajeCarga(zparInicio, zparFinal);
            zGrdPnl_PorcCarga.GetStore().DataSource = zDtsPorcentajeCarga.Tables["ViajesPorcCarga"];
            zGrdPnl_PorcCarga.GetStore().DataBind();

            /*var zDtsPorcentajeCargaResumen = _zMetodos.ZMetConsultaViajesPorcentajeCargaResumen(zparInicio, zparFinal);

            zCartChart_PorcCarga.GetStore().RemoveAll();
            zCartChart_PorcCarga.GetStore().DataSource = zDtsPorcentajeCargaResumen.Tables["ViajesCargaResumen"];
            zCartChart_PorcCarga.GetStore().DataBind();*/

            /*---------------------*/
            var zDtsViajesCantidad = _zMetodos.ZMetConsultaViajesCantidad(zparInicio, zparFinal);

            z_str_ViajesCantidad.DataSource = zDtsViajesCantidad.Tables["ViajesCantidad"];
            z_str_ViajesCantidad.DataBind();
            /*---------------------*/
            var zDtsViajesRebotes = _zMetodos.ZMetConsultaViajesRebotes(zparInicio, zparFinal);

            z_str_ViajesRebotes.DataSource = zDtsViajesRebotes.Tables["ViajesRebotes"];
            z_str_ViajesRebotes.DataBind();

            zVarstrresultado = _zMetodos.JsonResulEjec(1, "SQL_OK", "Embarques", "");

        }
        catch (Exception ex)
        {
            zVarstrresultado = _zMetodos.JsonResulEjec(0, "SQL_ERROR", "Embarques", "Error en ejecución SQL...");
        }

        return zVarstrresultado;
    }


    private DataTable Transformar(IEnumerable<IGrouping<string, DataRow>> datos)
    {
        //
        // Se define la estructura del DataTable
        //
        var dt = new DataTable();
        dt.Columns.Add("Mes");
        dt.Columns.Add("Total");

        //
        // Se recorre cada valor agruparo por linq y se vuelca el resultado 
        // en un nuevo registro del datatable
        //
        foreach (var item in datos)
        {
            var row2 = dt.NewRow();
            row2["Mes"] = item.Key;
            row2["CantRegistros"] = item.Count();
            row2["Total"] = item.Sum<DataRow>(x => Convert.ToInt32(x["Total"]));

            dt.Rows.Add(row2);
        }

        return dt;
    }

}