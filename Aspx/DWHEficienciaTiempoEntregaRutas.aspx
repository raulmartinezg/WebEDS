<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DWHEficienciaTiempoEntregaRutas.aspx.cs" Inherits="Aspx_DWHEficienciaTiempoEntregaRutas" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <title>Diario de viajes</title>
    <ext:XScript ID="XScript1" runat="server">        
        <script src="../JS/Init/Init_Comun.js" type="text/javascript"></script>
        <script src="../Js/Obj/objExportaExcel.js" type="text/javascript"></script>
        <script src="../Js/Fn/Fn_DWHEficienciaTiempoEntregaRutas.js" type="text/javascript"></script>
    </ext:XScript>
    <link rel="stylesheet" href="../CSS/Comun.css" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Language" content="es-MX" />
    <style type="text/css">
      .x-progress-default .x-progress-bar-default {
            /* background: transparent url(../imagenes/pbsample.png) repeat-x left center;*/
            background: repeat-x left center;
            background-color: #6b8e23 ;
            height: 19px;
            -ms-border-radius: 6px;
          -moz-border-radius: 6px -ms-box-sizing border-box;
            border-radius: 6px;
            -moz-box-sizing: border-box;
            -o-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        </style>
</head>
<body>
    <form id="form1" runat="server">
        <ext:ResourceManager ID="z_rsmEmbOpe" runat="server" DirectMethodNamespace="Cool" Theme="Gray" Locale="es-MX">
            <Listeners>
                <DocumentReady Handler="" />
            </Listeners>
        </ext:ResourceManager>
        <ext:Viewport ID="viewport1" runat="server" Layout="BorderLayout">
            <Items>
                <ext:FieldSet Border="True" Collapsible="True" ID="Container1" Layout="HBoxLayout" MarginSpec="0 5 5 5" Padding="4" Region="North" runat="server">
                    <Items>
                        <ext:FieldSet ID="z_fldSet_Calendarios" runat="server" Title="" Height="50" Border="false" PaddingSpec="0 0 0 0">
                            <Items>
                                <ext:DateField Editable="False" EnableKeyEvents="true" FieldLabel="Fecha Inicial" Format="dd-MMMM-yyyy" ID="z_dtnInicial" runat="server" Vtype="daterange" Width="240">
                                    <CustomConfig>
                                        <ext:ConfigItem Name="endDateField" Value="z_dtnFinal" Mode="Value" />
                                    </CustomConfig>
                                    <Listeners>
                                        <KeyUp Fn="onKeyUp" />
                                    </Listeners>
                                </ext:DateField>
                                <ext:DateField Editable="False" EnableKeyEvents="true" FieldLabel="Fecha Final" Format="dd-MMMM-yyyy" ID="z_dtnFinal" runat="server" Vtype="daterange" Width="240">
                                    <CustomConfig>
                                        <ext:ConfigItem Name="startDateField" Value="z_dtnInicial" Mode="Value" />
                                    </CustomConfig>
                                    <Listeners>
                                        <KeyUp Fn="onKeyUp" />
                                    </Listeners>
                                </ext:DateField>
                            </Items>
                        </ext:FieldSet>
                        <ext:FieldSet Border="false" DefaultAnchor="100%" Height="50" ID="z_fldSet_Botones1" Layout="VBoxLayout" MarginSpec="0 0 0 15" PaddingSpec="0 0 0 0" runat="server">
                            <Items>
                                <ext:Button Icon="Find" IconAlign="Right" ID="z_btnBuscar" runat="server" Text="Buscar" Width="100">
                                    <Listeners>
                                        <Click Handler="z_UFN_consultaGrid()" />
                                    </Listeners>
                                </ext:Button>
                                <ext:Button Icon="Reload" IconAlign="Left" ID="z_btnlimpiar" Margins="5 0 0 0" runat="server" Text="Reestablecer" Width="100">
                                    <Listeners>
                                        <Click Handler="z_UFN_Restablecer();;" />
                                    </Listeners>
                                </ext:Button>
                            </Items>
                        </ext:FieldSet>

                    </Items>
                </ext:FieldSet>
                <ext:GridPanel ID="z_GrdPnl_Detalle" Header="false" runat="server" MarginSpec="3 3 3 3" Region="Center">
                    <TopBar>
                        <ext:Toolbar ID="Toolbar1" runat="server">
                            <Items>
                                <ext:Label runat="server" Text="Eficiencia en Entregas" />
                                <ext:ToolbarFill ID="z_tbrfill" runat="server"></ext:ToolbarFill>
                                <ext:Button ID="z_btn_ReporteExcel" runat="server" Text="Excel" Icon="PageExcel" Disabled="True">
                                    <Listeners>
                                        <Click Handler="z_UFN_ExportaExcel(#{z_GrdPnl_Detalle});"></Click>
                                    </Listeners>
                                </ext:Button>
                            </Items>
                        </ext:Toolbar>
                    </TopBar>
                    <Store>
                        <ext:Store ID="z_strConsulta" runat="server" GroupField="Anio">
                            <Model>
                                <ext:Model ID="Model" runat="server">
                                    <Fields>
                                        <ext:ModelField Name="Anio" Type="Int"></ext:ModelField>
                                        <ext:ModelField Name="Ruta" Type="String"></ext:ModelField>
                                        <ext:ModelField Name="Entregas" Type="Int"></ext:ModelField>
                                        <ext:ModelField Name="A_Tiempo" Type="Int"></ext:ModelField>
                                        <ext:ModelField Name="Tarde" Type="Int"></ext:ModelField>
                                        <ext:ModelField Name="PCT_a_Tiempo" Type="Float"></ext:ModelField>
                                        <ext:ModelField Name="Dias_Ruta" Type="Int"></ext:ModelField>
                                    </Fields>
                                </ext:Model>
                            </Model>
                            <Sorters>
                                <ext:DataSorter Property="Fecha" Direction="ASC"></ext:DataSorter>
                            </Sorters>
                        </ext:Store>
                    </Store>
                    <ColumnModel ID="ColumnModel1" runat="server">
                        <Columns>
                            <ext:Column ID="Column1" runat="server" Text="RutaClasificada" DataIndex="Ruta" Width="120" Align="Left"></ext:Column>
                            <ext:Column
                                Align="Right"
                                runat="server"
                                Width="90"
                                Text="Total </br> Entregas"
                                Sortable="true"
                                DataIndex="Entregas"
                                SummaryType="Sum"
                                Groupable="False">
                            </ext:Column>
                            <ext:Column
                                Align="Right"
                                runat="server"
                                Width="90"
                                Text="A tiempo"
                                Sortable="true"
                                DataIndex="A_Tiempo"
                                SummaryType="Sum"
                                Groupable="False">
                            </ext:Column>
                            <ext:Column
                                Align="Right"
                                runat="server"
                                Width="80"
                                Text="Tarde"
                                Sortable="true"
                                DataIndex="Tarde"
                                SummaryType="Sum"
                                Groupable="False">
                            </ext:Column>
                            <ext:ProgressBarColumn 
                                runat="server" 
                                DataIndex="PCT_a_Tiempo" 
                                Text="Porcentaje </br> a tiempo" 
                                SummaryType="Average" >
                                 <SummaryRenderer Handler="function(v, params){return Ext.util.Format.number(v*100,'0')  + '%';}" />
                                </ext:ProgressBarColumn>
                           <%-- <ext:Column
                                runat="server"
                                Width="75"
                                Text="Porcentaje </br> tarde"
                                Sortable="true"
                                DataIndex="PCT_Tarde"
                                SummaryType="Average"
                                Groupable="False">
                                <Renderer Handler="return value +' %';" />
                                <SummaryRenderer Handler="function(v, params){return Ext.util.Format.number(v,'0')  + '%';}" />
                            </ext:Column>--%>
                            <ext:Column
                                runat="server"
                                Width="80"
                                Text="Días de Ruta"
                                Sortable="true"
                                DataIndex="Dias_Ruta">
                            </ext:Column>
                        </Columns>
                    </ColumnModel>
                    <Features>
                        <ext:GroupingSummary ID="Group1" runat="server" GroupHeaderTplString="{name}" Width="100" HideGroupedHeader="True" EnableGroupingMenu="false">
                        </ext:GroupingSummary>
                    </Features>
                </ext:GridPanel>
            </Items>
        </ext:Viewport>
    </form>
</body>
</html>
