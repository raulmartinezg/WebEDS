using System;
using System.Data;
using System.Configuration;
using NETDataLuma;
using Ext.Net;

/// <summary>
/// Summary description for UO_Metodos
/// </summary>
public class UoMetodos
{
    private readonly ExecStoreSql _ejecutorSqlHarvester = new NETDataLuma.ExecStoreSql(ConfigurationManager.AppSettings["CON_PRODUCCION_11"], ConfigurationManager.AppSettings["BD_SIDTUM_PROD"], ConfigurationManager.AppSettings["RutaDatum"]);//OK A PRODUCCION

    public DataSet ZMetConsultaOperadores()
    {
        return _ejecutorSqlHarvester.ExecuteSpDs("SPQRY_OperadorClaveDescripcion", "Operadores", "");
    }

    public DataSet ZMetConsultaEmbarques(string zparFolioViaje, string zparOperador, string zparFechaIni, string zparFechaFin)
    {
        return _ejecutorSqlHarvester.ExecuteSpDs("SPQRY_EmbarquesRegistradosSIDMOVIL", "Embarques", zparFolioViaje, zparOperador, zparFechaIni, zparFechaFin);
    }

    public DataSet ZMetConsultaEmbxOperador(string zparFechaInicial, string zparFechaFinal)
    {
        return _ejecutorSqlHarvester.ExecuteSpDs("SPRPT_EmbarquesPorOperador", "Embarques", zparFechaInicial, zparFechaFinal, "");
    }

    public DataSet ZMetConsultaRutas(string zparInicial, string zparFinal)
    {
        return _ejecutorSqlHarvester.ExecuteSpDs("SPRPT_RutasPorMes", "RutasxMes", zparInicial, zparFinal);
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

    ///METODOS NUEVO
    public DataSet ZMetConsultaClasificacionRuta()
    {
        return _ejecutorSqlHarvester.ExecuteSpDs("DWH", "sp_CatalogoClasificacionRuta", "CatalogRutas");
    }

    public DataSet ZMetConsultaKmOperador(string zparFechaInicial, string zparFechaFinal)
    {
        return _ejecutorSqlHarvester.ExecuteSpDs("DWH", "SPRPT_KilometrosPorOperador", "KmOperador", zparFechaInicial, zparFechaFinal);
    }

    public DataSet ZMetConsultaKmUnidad(string zparFechaInicial, string zparFechaFinal)
    {
        return _ejecutorSqlHarvester.ExecuteSpDs("DWH", "SPRPT_KilometrosPorUnidad", "KmUnidad", zparFechaInicial, zparFechaFinal);
    }

    public DataSet ZMetConsultaKmRuta(string zparFechaInicial, string zparFechaFinal, string zparClaveClasificacionRuta)
    {
        return _ejecutorSqlHarvester.ExecuteSpDs("DWH", "SPRPT_KilometrosPorRuta2", "KmRuta", zparFechaInicial, zparFechaFinal, zparClaveClasificacionRuta);
    }

    public DataSet ZMetConsultaVisitasCiudad(string zparFechaIncial, string zparFechaFinal)
    {
        return _ejecutorSqlHarvester.ExecuteSpDs("SPRPT_VisitasPorCiudad", "VisitasCiudad", zparFechaIncial, zparFechaFinal);
    }

    public DataSet ZMetConsultaDiarioDeViajes(string zparFechaIncial)
    {
        return _ejecutorSqlHarvester.ExecuteSpDs("DWH", "SPQRY_DiarioDeViajes", "DiarioDeViajes", zparFechaIncial);
    }

    public DataSet ZMetConsultaViajesPorcentajeCarga(string zparFechaIncial, string zparFechaFinal)
    {
        return _ejecutorSqlHarvester.ExecuteSpDs("DWH", "SPQRY_PorcentajeCarga", "ViajesPorcCarga", zparFechaIncial, zparFechaFinal);
    }

    public DataSet ZMetConsultaSumarioNivelCargaViajesRebotes(string zparFechaIncial, string zparFechaFinal)
    {
        return _ejecutorSqlHarvester.ExecuteSpDs("DWH", "SPQRY_SumarioNivelCargaViajesRebotes", "SumarioNivelCargaViajesRebotes", zparFechaIncial, zparFechaFinal);
    }

    /* public DataSet ZMetConsultaViajesNumeroResumen(string zparFechaIncial, string zparFechaFinal)
    {
        return _ejecutorSqlHarvester.ExecuteSpDs("DWH", "SPQRY_NumeroViajesResumen", "ViajesCargaResumen", zparFechaIncial, zparFechaFinal);
    }*/

    public DataSet ZMetConsultaViajesCantidad(string zparFechaIncial, string zparFechaFinal)
    {
        return _ejecutorSqlHarvester.ExecuteSpDs("DWH", "SPQRY_MensualPorViajes", "ViajesCantidad", zparFechaIncial, zparFechaFinal);
    }

    public DataSet ZMetConsultaViajesRebotes(string zparFechaIncial, string zparFechaFinal)
    {
        return _ejecutorSqlHarvester.ExecuteSpDs("DWH", "SPQRY_MensualPorRebotes", "ViajesRebotes", zparFechaIncial, zparFechaFinal);
    }

    public DataSet ZMetMensualDeViajes(string zparFechaIncial, string zparFechaFinal)
    {
        return _ejecutorSqlHarvester.ExecuteSpDs("DWH", "SPQRY_MensualDeViajes", "MensualDeViajes", zparFechaIncial, zparFechaFinal);
    }


    public DataSet ZMetEficienciaTiemposEntrega(string zparFechaIncial, string zparFechaFinal)
    {
        return _ejecutorSqlHarvester.ExecuteSpDs("DWH", "SPQRY_Eficiencia_Entrega", "EficienciaTiempoEntrega", zparFechaIncial, zparFechaFinal);
    }

    public DataSet ZMetMensualEficienciaEntrega(string zparFechaIncial, string zparFechaFinal)
    {
        return _ejecutorSqlHarvester.ExecuteSpDs("DWH", "SPQRY_EficienciaEntregas", "MensualEficienciaEntrega", zparFechaIncial, zparFechaFinal);
    }

}


