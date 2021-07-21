<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DWHViajesCarga.aspx.cs" Inherits="Aspx_DWHViajesCarga" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>D</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Language" content="es-MX" />
        <link rel="stylesheet" href="../CSS/Comun.css" />
    <ext:XScript ID="XScript1" runat="server">  
        <script src="../JS/Init/Init_Comun.js" type="text/javascript"></script>
        <script src="../Js/Obj/objExportaExcel.js" type="text/javascript"></script>
        <script src="../Js/Fn/Fn_DWHViajesCarga.js" type="text/javascript"></script>
    </ext:XScript>
</head>
<body>
    <ext:ResourceManager ID="z_rsmEmbOpe" runat="server" DirectMethodNamespace="Cool" Theme="Gray">
    </ext:ResourceManager>
    <%-- <ext:ChartTheme ID="ChartTheme1" runat="server" ThemeName="CustomBlue">
        <Axis Stroke="#084594" />
        <AxisLabelLeft Fill="rgb(8,69,148)" Font="12px Arial" FontFamily="Arial" />
        <AxisLabelBottom Fill="rgb(8,69,148)" Font="12px Arial" FontFamily="Arial" />
        <AxisTitleLeft Font="bold 18px Arial" />
        <AxisTitleBottom Font="bold 18px Arial" />
    </ext:ChartTheme>--%>
    <ext:Viewport ID="viewport1" runat="server" Layout="BorderLayout">
        <Items>
            <ext:FieldSet ID="Container1" runat="server" Layout="HBoxLayout" MarginSpec="0 5 5 5" Padding="4" Region="North" Border="True" Collapsible="True">
                <Items>
                    <ext:FieldSet ID="FieldSet1" runat="server" Title="" Height="50" Border="false" PaddingSpec="0 0 0 0">
                        <Items>
                            <ext:DateField ID="z_dtnInicial" runat="server" FieldLabel="Fecha Inicial" Vtype="daterange"
                                EnableKeyEvents="true" Format="dd-MMMM-yyyy" Width="240">
                                <CustomConfig>
                                    <ext:ConfigItem Name="endDateField" Value="z_dtnFinal" Mode="Value" />
                                </CustomConfig>
                                <Listeners>
                                    <KeyUp Fn="onKeyUp" />
                                </Listeners>
                            </ext:DateField>

                            <ext:DateField ID="z_dtnFinal" runat="server" FieldLabel="Fecha Final" Vtype="daterange"
                                EnableKeyEvents="true" Format="dd-MMMM-yyyy" Width="240">
                                <CustomConfig>
                                    <ext:ConfigItem Name="startDateField" Value="z_dtnInicial" Mode="Value" />
                                </CustomConfig>
                                <Listeners>
                                    <KeyUp Fn="onKeyUp" />
                                </Listeners>

                            </ext:DateField>
                        </Items>
                    </ext:FieldSet>
                    <ext:FieldSet ID="fieldset2" runat="server" Height="50" Layout="VBoxLayout" DefaultAnchor="100%" Border="false"
                        MarginSpec="0 0 0 15" PaddingSpec="0 0 0 0">
                        <Items>
                            <ext:Button ID="z_btnBuscar" runat="server" Text="Buscar" Width="100" IconAlign="Right" Icon="Find">
                                <Listeners>
                                    <Click Handler="z_UFN_Consulta()" />
                                </Listeners>
                            </ext:Button>
                            <ext:Button ID="z_btnlimpiar" runat="server" Text="Reestablecer" Width="100" Icon="Reload" IconAlign="Left" Margins="5 0 0 0">
                                <Listeners>
                                    <Click Handler="z_UFN_Restablecer();;" />
                                </Listeners>
                            </ext:Button>
                        </Items>
                    </ext:FieldSet>
                </Items>
            </ext:FieldSet>
            <ext:Panel runat="server" Region="Center" StyleSpec="background-color:#ED9200;" Layout="Accordion">
                <%--                <LayoutConfig>
                    <ext:VBoxLayoutConfig Align="Stretch" DefaultMargins="2" />
                </LayoutConfig>--%>
                <Items>
                    <ext:Panel Icon="ChartPie" ID="Panel1" Layout="AnchorLayout" runat="server" Title="<b style='font-family: tahoma, arial, verdana, sans-serif; color: #006dc2;'>Porcentaje de Carga</b>">
                        <Items>
                            <ext:GridPanel runat="server" ID="zGrdPnl_PorcCarga" ColumnWidth="0.50" AnchorHorizontal="50%" AnchorVertical="100%">
                                <Store>
                                    <ext:Store runat="server" GroupField="Anio">
                                        <Model>
                                            <ext:Model ID="Model" runat="server">
                                                <Fields>
                                                    <ext:ModelField Name="Anio" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="RutaClasificada" Type="String"></ext:ModelField>
                                                    <ext:ModelField Name="Ene" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Feb" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Mar" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Abr" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="May" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Jun" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Jul" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Ago" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Sep" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Oct" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Nov" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Dic" Type="Int"></ext:ModelField>
                                                </Fields>
                                            </ext:Model>
                                        </Model>
                                        <Sorters>
                                            <ext:DataSorter Property="Anio" Direction="ASC"></ext:DataSorter>
                                            <ext:DataSorter Property="RutaClasificada" Direction="ASC"></ext:DataSorter>
                                        </Sorters>
                                    </ext:Store>
                                </Store>
                                <ColumnModel>
                                    <Columns>
                                        <ext:Column Width="50" runat="server" Text="Año" DataIndex="Anio"></ext:Column>
                                        <ext:Column Width="140" ID="Column1" runat="server" Text="Ruta Clasificada" DataIndex="RutaClasificada"></ext:Column>
                                        <ext:Column Width="44" ID="Column2" runat="server" Text="Ene" DataIndex="Ene" SummaryType="Average">
                                            <Renderer Handler="return value +' %';" />
                                            <SummaryRenderer Handler="function(v, params){return Ext.util.Format.number(v,'0')  + '%';}" />
                                        </ext:Column>
                                        <ext:Column Width="44" ID="Column3" runat="server" Text="Feb" DataIndex="Feb" SummaryType="Average">
                                            <Renderer Handler="return value +' %';" />
                                            <SummaryRenderer Handler="function(v, params){return Ext.util.Format.number(v,'0')  + '%';}" />
                                        </ext:Column>
                                        <ext:Column Width="44" ID="Column4" runat="server" Text="Mar" DataIndex="Mar" SummaryType="Average">
                                            <Renderer Handler="return value +' %';" />
                                            <SummaryRenderer Handler="function(v, params){return Ext.util.Format.number(v,'0')  + '%';}" />
                                        </ext:Column>
                                        <ext:Column Width="44" ID="Column5" runat="server" Text="Abr" DataIndex="Abr" SummaryType="Average">
                                            <Renderer Handler="return value +' %';" />
                                            <SummaryRenderer Format="Percent" Handler="function(v, params){return Ext.util.Format.number(v,'0')  + '%';}" />
                                        </ext:Column>
                                        <ext:Column Width="44" ID="Column6" runat="server" Text="May" DataIndex="May" SummaryType="Average">
                                            <Renderer Handler="return value +' %';" />
                                            <SummaryRenderer Handler="function(v, params){return Ext.util.Format.number(v,'0')  + '%';}" />
                                        </ext:Column>
                                        <ext:Column Width="44" ID="Column7" runat="server" Text="Jun" DataIndex="Jun" SummaryType="Average">
                                            <Renderer Handler="return value +' %';" />
                                            <SummaryRenderer Handler="function(v, params){return Ext.util.Format.number(v,'0')  + '%';}" />
                                        </ext:Column>
                                        <ext:Column Width="44" ID="Column8" runat="server" Text="Jul" DataIndex="Jul" SummaryType="Average">
                                            <Renderer Handler="return value +' %';" />
                                            <SummaryRenderer Handler="function(v, params){return Ext.util.Format.number(v,'0')  + '%';}" />
                                        </ext:Column>
                                        <ext:Column Width="44" ID="Column9" runat="server" Text="Ago" DataIndex="Ago" SummaryType="Average">
                                            <Renderer Handler="return value +' %';" />
                                            <SummaryRenderer Handler="function(v, params){return Ext.util.Format.number(v,'0')  + '%';}" />
                                        </ext:Column>
                                        <ext:Column Width="44" ID="Column10" runat="server" Text="Sep" DataIndex="Sep" SummaryType="Average">
                                            <Renderer Handler="return value +' %';" />
                                            <SummaryRenderer Handler="function(v, params){return Ext.util.Format.number(v,'0')  + '%';}" />
                                        </ext:Column>
                                        <ext:Column Width="44" ID="Column11" runat="server" Text="Oct" DataIndex="Oct" SummaryType="Average">
                                            <Renderer Handler="return value +' %';" />
                                            <SummaryRenderer Handler="function(v, params){return Ext.util.Format.number(v,'0')  + '%';}" />
                                        </ext:Column>
                                        <ext:Column Width="44" ID="Column12" runat="server" Text="Nov" DataIndex="Nov" SummaryType="Average">
                                            <Renderer Handler="return value +' %';" />
                                            <SummaryRenderer Handler="function(v, params){return Ext.util.Format.number(v,'0')  + '%';}" />
                                        </ext:Column>
                                        <ext:Column Width="44" ID="Column13" runat="server" Text="Dic" DataIndex="Dic" SummaryType="Average">
                                            <Renderer Handler="return value +' %';" />
                                            <SummaryRenderer Handler="function(v, params){return Ext.util.Format.number(v,'0')  + '%';}" />
                                        </ext:Column>
                                    </Columns>
                                </ColumnModel>
                                <Features>
                                    <ext:GroupingSummary runat="server" GroupHeaderTplString="{name}" Width="100" HideGroupedHeader="True" EnableGroupingMenu="false">
                                    </ext:GroupingSummary>
                                </Features>
                            </ext:GridPanel>
                            <ext:Panel runat="server" AnchorHorizontal="50%"  Layout="Fit">
                                <Items>
                                    <ext:CartesianChart ID="zCartChart_PorcCarga" InnerPadding="0 40 0 40" InsetPadding="40" runat="server" Title="En Construcción">
                                        <AnimationConfig Duration="500" Easing="EaseOut" />
                                        <Store>
                                            <ext:Store runat="server">
                                                <Model>
                                                    <ext:Model runat="server">
                                                        <Fields>
                                                            <ext:ModelField Name="Anio" />
                                                            <ext:ModelField Name="MesNo" Type="Int" />
                                                            <ext:ModelField Name="Mes" />
                                                            <ext:ModelField Name="Promedio" />
                                                        </Fields>
                                                    </ext:Model>
                                                </Model>
                                                <Sorters>
                                                    <ext:DataSorter Property="MesNo" Direction="ASC"></ext:DataSorter>
                                                </Sorters>
                                            </ext:Store>
                                        </Store>
                                        <Interactions>
                                            <ext:PanZoomInteraction ZoomOnPanGesture="true" />
                                        </Interactions>
                                        <Items>
                                            <ext:TextSprite
                                                Text="Comparativo de Porcentaje de Carga por Mes"
                                                FontSize="22"
                                                Width="100"
                                                Height="30"
                                                X="40"
                                                Y="20" />
                                        </Items>
                                        <Axes>
                                            <ext:NumericAxis
                                                Position="Left"
                                                Fields="Promedio"
                                                Grid="true"
                                                Minimum="50"
                                                Maximum="100">
                                                <Renderer Handler="return layout.renderer(label) + '%';" />
                                            </ext:NumericAxis>
                                            <ext:CategoryAxis
                                                Position="Bottom"
                                                Fields="Mes"
                                                Grid="true">
                                                <Label RotationDegrees="-45"></Label>
                                            </ext:CategoryAxis>
                                        </Axes>
                                        <Series>
                                            <ext:LineSeries XField="Mes" YField="Promedio">
                                                <StyleSpec>
                                                    <ext:Sprite LineWidth="4" />
                                                </StyleSpec>
                                                <HighlightConfig>
                                                    <ext:Sprite FillStyle="#000" Radius="5" LineWidth="2" StrokeStyle="#fff" />
                                                </HighlightConfig>
                                                <Marker>
                                                    <ext:Sprite Radius="5" LineWidth="0" FillStyle="#38B8BF" StrokeStyle="#38B8BF" />
                                                </Marker>
                                                <Label Field="Promedio" Display="Over"></Label>
                                                <Tooltip runat="server" TrackMouse="true" StyleSpec="background: #fff;" ShowDelay="0" DismissDelay="0" HideDelay="0">
                                                    <Renderer Handler="this.setHtml(storeItem.get('Mes') + ': ' + storeItem.get('Promedio') + '%');" />
                                                </Tooltip>
                                            </ext:LineSeries>
                                        </Series>
                                    </ext:CartesianChart>
                                </Items>
                            </ext:Panel>
                        </Items>
                    </ext:Panel>
                    <ext:Panel Icon="Lorry" ID="Panel2" Layout="BorderLayout" runat="server" Title="<b style='font-family: tahoma, arial, verdana, sans-serif; color: #d18600;'>Número de Viajes</b>">
                        <Items>
                            <ext:GridPanel runat="server" ID="z_grdPnl_PorViaje" Region="West" Flex="1" Collapsible="True" CollapseMode="Mini" MinWidth="700">
                                <Store>
                                    <ext:Store ID="z_str_ViajesCantidad" runat="server" GroupField="Anio">
                                        <Model>
                                            <ext:Model ID="Model11" runat="server">
                                                <Fields>
                                                    <ext:ModelField Name="Anio" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="RutaClasificada" Type="String"></ext:ModelField>
                                                    <ext:ModelField Name="Ene" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Feb" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Mar" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Abr" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="May" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Jun" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Jul" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Ago" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Sep" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Oct" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Nov" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Dic" Type="Int"></ext:ModelField>
                                                </Fields>
                                            </ext:Model>
                                        </Model>
                                        <Sorters>
                                            <ext:DataSorter Property="Anio" Direction="ASC"></ext:DataSorter>
                                            <ext:DataSorter Property="RutaClasificada" Direction="ASC"></ext:DataSorter>
                                        </Sorters>
                                    </ext:Store>
                                </Store>
                                <ColumnModel>
                                    <Columns>
                                        <ext:Column ID="Column14" Width="40" runat="server" Text="Año" DataIndex="Anio"></ext:Column>
                                        <ext:Column Width="140" ID="Column15" runat="server" Text="Ruta Clasificada" DataIndex="RutaClasificada"></ext:Column>
                                        <ext:Column Width="40" ID="Column16" runat="server" Text="Ene" DataIndex="Ene" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="40" ID="Column17" runat="server" Text="Feb" DataIndex="Feb" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="50" ID="Column18" runat="server" Text="Mar" DataIndex="Mar" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="40" ID="Column19" runat="server" Text="Abr" DataIndex="Abr" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="40" ID="Column20" runat="server" Text="May" DataIndex="May" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="40" ID="Column21" runat="server" Text="Jun" DataIndex="Jun" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="40" ID="Column22" runat="server" Text="Jul" DataIndex="Jul" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="40" ID="Column23" runat="server" Text="Ago" DataIndex="Ago" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="40" ID="Column24" runat="server" Text="Sep" DataIndex="Sep" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="40" ID="Column25" runat="server" Text="Oct" DataIndex="Oct" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="40" ID="Column26" runat="server" Text="Nov" DataIndex="Nov" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="40" ID="Column27" runat="server" Text="Dic" DataIndex="Dic" SummaryType="Sum"></ext:Column>
                                    </Columns>
                                </ColumnModel>
                                <Features>
                                    <ext:GroupingSummary runat="server" GroupHeaderTplString="{name}" Width="100" HideGroupedHeader="True" EnableGroupingMenu="false">
                                    </ext:GroupingSummary>
                                </Features>
                            </ext:GridPanel>
                            <%--<ext:Chart
                                ID="Chart2"
                                runat="server"
                                Shadow="true"
                                Theme="CustomBlue"
                                Animate="true"
                                Region="Center"
                                Flex="1">
                                <Store>
                                    <ext:Store ID="z_str_graficaViajesCantidad"
                                        runat="server">
                                        <Model>
                                            <ext:Model ID="Model3" runat="server">
                                                <Fields>
                                                    <ext:ModelField Name="Mes" />
                                                    <ext:ModelField Name="Promedio" />

                                                </Fields>
                                            </ext:Model>
                                        </Model>
                                        <Sorters>
                                            <ext:DataSorter Property="Mes" Direction="ASC"></ext:DataSorter>
                                        </Sorters>
                                    </ext:Store>
                                </Store>

                                <Background>
                                    <Gradient GradientID="backgroundGradient" Angle="45">
                                        <Stops>
                                            <ext:GradientStop Offset="0" Color="#ffffff" />
                                            <ext:GradientStop Offset="100" Color="#eaf1f8" />
                                        </Stops>
                                    </Gradient>
                                </Background>

                                <Axes>
                                    <ext:NumericAxis
                                        Fields="Promedio"
                                        Position="Bottom"
                                        Grid="true"
                                        Title="Promedio de Viajes"
                                        Minimum="70">
                                        <Label>
                                            <Renderer Handler="return Ext.util.Format.number(value, '0,0');" />
                                        </Label>
                                    </ext:NumericAxis>

                                    <ext:CategoryAxis
                                        Fields="Mes"
                                        Position="Left"
                                        Title="Meses del Año" />
                                </Axes>
                                <Series>
                                    <ext:BarSeries
                                        Axis="Bottom"
                                        Highlight="true"
                                        XField="Mes"
                                        YField="Promedio">
                                        <Tips ID="Tips1" runat="server" TrackMouse="true" Width="140" Height="28">
                                            <Renderer Handler="this.setTitle(storeItem.get('Mes') + ': ' + storeItem.get('Promedio') + ' views');" />
                                        </Tips>
                                        <Label
                                            Display="InsideEnd"
                                            Field="Promedio"
                                            Orientation="Horizontal"
                                            Color="#333"
                                            TextAnchor="middle" />
                                    </ext:BarSeries>
                                </Series>
                            </ext:Chart>--%>
                        </Items>
                    </ext:Panel>
                    <ext:Panel Icon="Basket" ID="Panel3" Layout="BorderLayout" runat="server" Title="<b style='font-family: tahoma, arial, verdana, sans-serif; color: #00d123;'>Número de Rebotes</b>">
                        <Items>
                            <ext:GridPanel runat="server" ID="GridPanel1" Region="West" Flex="1" Collapsible="True" CollapseMode="Mini" MinWidth="700">
                                <Store>
                                    <ext:Store ID="z_str_ViajesRebotes" runat="server" GroupField="Anio">
                                        <Model>
                                            <ext:Model ID="Model2" runat="server">
                                                <Fields>
                                                    <ext:ModelField Name="Anio" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="RutaClasificada" Type="String"></ext:ModelField>
                                                    <ext:ModelField Name="Ene" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Feb" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Mar" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Abr" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="May" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Jun" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Jul" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Ago" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Sep" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Oct" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Nov" Type="Int"></ext:ModelField>
                                                    <ext:ModelField Name="Dic" Type="Int"></ext:ModelField>
                                                </Fields>
                                            </ext:Model>
                                        </Model>
                                        <Sorters>
                                            <ext:DataSorter Property="Anio" Direction="ASC"></ext:DataSorter>
                                            <ext:DataSorter Property="RutaClasificada" Direction="ASC"></ext:DataSorter>
                                        </Sorters>
                                    </ext:Store>
                                </Store>
                                <ColumnModel>
                                    <Columns>
                                        <ext:Column ID="Column28" Width="40" runat="server" Text="Año" DataIndex="Anio"></ext:Column>
                                        <ext:Column Width="140" ID="Column29" runat="server" Text="Ruta Clasificada" DataIndex="RutaClasificada"></ext:Column>
                                        <ext:Column Width="40" ID="Column30" runat="server" Text="Ene" DataIndex="Ene" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="40" ID="Column31" runat="server" Text="Feb" DataIndex="Feb" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="50" ID="Column32" runat="server" Text="Mar" DataIndex="Mar" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="40" ID="Column33" runat="server" Text="Abr" DataIndex="Abr" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="40" ID="Column34" runat="server" Text="May" DataIndex="May" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="40" ID="Column35" runat="server" Text="Jun" DataIndex="Jun" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="40" ID="Column36" runat="server" Text="Jul" DataIndex="Jul" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="40" ID="Column37" runat="server" Text="Ago" DataIndex="Ago" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="40" ID="Column38" runat="server" Text="Sep" DataIndex="Sep" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="40" ID="Column39" runat="server" Text="Oct" DataIndex="Oct" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="40" ID="Column40" runat="server" Text="Nov" DataIndex="Nov" SummaryType="Sum"></ext:Column>
                                        <ext:Column Width="40" ID="Column41" runat="server" Text="Dic" DataIndex="Dic" SummaryType="Sum"></ext:Column>
                                    </Columns>
                                </ColumnModel>
                                <Features>
                                    <ext:GroupingSummary runat="server" GroupHeaderTplString="{name}" Width="100" HideGroupedHeader="True" EnableGroupingMenu="false">
                                    </ext:GroupingSummary>
                                </Features>
                            </ext:GridPanel>
                            <%--<ext:Chart
                                ID="Chart3"
                                runat="server"
                                Shadow="true"
                                Theme="CustomBlue"
                                Animate="true"
                                Region="Center"
                                Flex="1">
                                <Store>
                                    <ext:Store ID="Store2"
                                        runat="server">
                                        <Model>
                                            <ext:Model ID="Model4" runat="server">
                                                <Fields>
                                                    <ext:ModelField Name="Mes" />
                                                    <ext:ModelField Name="Promedio" />

                                                </Fields>
                                            </ext:Model>
                                        </Model>
                                        <Sorters>
                                            <ext:DataSorter Property="Mes" Direction="ASC"></ext:DataSorter>
                                        </Sorters>
                                    </ext:Store>
                                </Store>

                                <Background>
                                    <Gradient GradientID="backgroundGradient" Angle="45">
                                        <Stops>
                                            <ext:GradientStop Offset="0" Color="#ffffff" />
                                            <ext:GradientStop Offset="100" Color="#eaf1f8" />
                                        </Stops>
                                    </Gradient>
                                </Background>

                                <Axes>
                                    <ext:NumericAxis
                                        Fields="Promedio"
                                        Position="Bottom"
                                        Grid="true"
                                        Title="Promedio de Rebotes"
                                        Minimum="70">
                                        <Label>
                                            <Renderer Handler="return Ext.util.Format.number(value, '0,0');" />
                                        </Label>
                                    </ext:NumericAxis>

                                    <ext:CategoryAxis
                                        Fields="Mes"
                                        Position="Left"
                                        Title="Meses del Año" />
                                </Axes>
                                <Series>
                                    <ext:BarSeries
                                        Axis="Bottom"
                                        Highlight="true"
                                        XField="Mes"
                                        YField="Promedio">
                                        <Tips ID="Tips2" runat="server" TrackMouse="true" Width="140" Height="28">
                                            <Renderer Handler="this.setTitle(storeItem.get('Mes') + ': ' + storeItem.get('Promedio') + ' views');" />
                                        </Tips>
                                        <Label
                                            Display="InsideEnd"
                                            Field="Promedio"
                                            Orientation="Horizontal"
                                            Color="#333"
                                            TextAnchor="middle" />
                                    </ext:BarSeries>
                                </Series>
                            </ext:Chart>--%>
                        </Items>
                    </ext:Panel>
                </Items>
            </ext:Panel>
        </Items>
    </ext:Viewport>
    <form id="form1" runat="server">
    </form>
</body>
</html>
