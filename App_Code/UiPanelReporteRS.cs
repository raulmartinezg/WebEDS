using System;
using Ext.Net;

namespace CustomControlsAndPlugins.Components
{
    public class UiPanelReporteRs : Panel
    {
        protected override void OnInit(EventArgs e)
        {
            Title = string.IsNullOrWhiteSpace(Title)
                ? "Nuevo Reporte"
                : Title;
            Padding = 0;
            Header = false;
            Margin = 0;
            Layout = "Fit";
            Padding = 5;
            Margin = 0;
            Border = false;
            AutoScroll = false;
            base.OnInit(e);
        }
    }
}