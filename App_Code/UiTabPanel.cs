using System;
using System.Collections.Generic;
using Ext.Net;

namespace CustomControlsAndPlugins.Components
{
    public class UiTabPanel : Panel
    {
        protected override void OnInit(EventArgs e)
        {
            Title = string.IsNullOrWhiteSpace(Title)
                ? "Nuevo Tab"
                : Title;
            Closable = true;
            Layout = "Fit";
            Loader = new ComponentLoader
            {
                Url = "Aspx/ReportViewer.aspx",
                Mode = LoadMode.Frame,
                LoadMask =
                {
                    ShowMask = true,
                    Msg = "Cargando Módulo..."
                },
                Params =
                {
                     new Parameter("Param1", "algo", ParameterMode.Value),
                     new Parameter("Param2", "14/10/2013", ParameterMode.Value)
                }
                
            };
            /*Loader.Params.Add(new ParameterCollection
            {
                new Ext.Net.Parameter("myparam", "Parameter from parent page", ParameterMode.Value)
            });*/
            base.OnInit(e);
        }
    }
}