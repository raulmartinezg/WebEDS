using System;
using Ext.Net;

namespace CustomControlsAndPlugins.Components
{
    public class UiWindowReporteRs : Window
    {
        protected override void OnInit(EventArgs e)
        {
            Title = string.IsNullOrWhiteSpace(Title)
                ? "Nuevo Reporte"
                : Title;
            Closable = true;
            Layout = "Fit";
            Collapsible = true;
            Maximizable = true;
            Padding = 5;
            Margin = 0;
            Width = 800;
            Height = 300;
            base.OnInit(e);
        }
    }
}