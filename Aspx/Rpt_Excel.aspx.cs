using System;
using System.IO;
using System.Web;
using System.Xml;
using System.Xml.Xsl;
using Ext.Net;
using Newtonsoft;

namespace Aspx
{
    public partial class AspxRptExcel : System.Web.UI.Page
    {
        public struct DatosRequest
        {
            public XmlDocument ParamXml;
            public XmlDocument DatosXml;
            public string XslDocRuta;
            public string NombreReporte;
        }

        private DatosRequest _datosRequestClient;

        protected void Page_Load(object sender, EventArgs e)
        {
            _datosRequestClient.XslDocRuta = Context.Request["nmXslDocRuta"];
            _datosRequestClient.DatosXml = (XmlDocument) JSON.DeserializeXmlNode(Context.Request["nmDatosJson"]);
            _datosRequestClient.ParamXml = (XmlDocument) JSON.DeserializeXmlNode(Context.Request["nmParamJson"]);
            _datosRequestClient.NombreReporte = Context.Request["nmNombreReporte"];
            GeneraReporte();
        }

        private void GeneraReporte()
        {
            Response.Clear();
            var strFechaDocumento = DateTime.Now.ToString("s");
            var xslParametros = new XsltArgumentList();
            xslParametros.AddParam("FechaDocumento", "", strFechaDocumento);
            xslParametros.AddParam("ParametrosCliente", "", _datosRequestClient.ParamXml);
            var algo =
                new StringReader(@"<?xml version='1.0' encoding='iso-8859-1'?><ds>" +
                                 _datosRequestClient.DatosXml.OuterXml + _datosRequestClient.ParamXml.OuterXml + "</ds>");
            var tr =
                new XmlTextReader(algo
                    );
            var xsltTransform = new XslCompiledTransform();
            var xmlReader = System.Xml.XmlReader.Create(Server.MapPath(_datosRequestClient.XslDocRuta));
            xmlReader.ReadToDescendant("xsl:stylesheet");
            xsltTransform.Load(xmlReader, new XsltSettings {EnableScript = false, EnableDocumentFunction = false},
                new XmlUrlResolver());
            Response.ContentType = "application/vnd.ms-excel";
            Response.AddHeader("Content-Disposition", "attachment; filename=" + _datosRequestClient.NombreReporte + ".xls");
            Response.Charset = "iso-8859-1";
            xsltTransform.Transform(tr, xslParametros, Response.OutputStream);
            Response.End();
            HttpContext.Current.ApplicationInstance.CompleteRequest();
        }
    }
}
    
