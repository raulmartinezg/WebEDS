<%@ WebHandler Language="C#" Class="DownloadFile" %>

using System;
using System.Web;

public class DownloadFile : IHttpHandler {
    
    public void ProcessRequest (HttpContext context)
    {

        var a = "Manual_Concesionario.pdf";
       

        var response = HttpContext.Current.Response;
        response.ClearContent();
        response.Clear();
        response.ContentType = "text/plain";
        response.AddHeader("Content-Disposition", "attachment; filename=" + "ManualUsuario.pdf" + ";");
           response.TransmitFile("~/Pdf/Manual_Concesionario.pdf");
        response.Flush();
        response.End();
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}