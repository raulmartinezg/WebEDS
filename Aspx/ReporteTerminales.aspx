<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ReporteTerminales.aspx.cs" Inherits="Aspx.AspxReporteTerminales" %>


<!DOCTYPE html>

<html lang="es-mx">
<head id="Head1" runat="server">
    <title>Reporte Uso Terminales</title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta http-equiv="Content-Language" content="es-MX" />
    <ext:XScript ID="XScript1" runat="server">  
        <script src="../JS/Init/Init_Comun.js" type="text/javascript"></script>
        <script src="../lmApp/AppRepTerminales.js" type="text/javascript"></script>
        <script src="../JS/highcharts.js"></script>
<script src="../JS/customEvents.js"></script>
    </ext:XScript>
    <style type="text/css">
       .progress-0-20 .x-progress-text {
            color: red;
        }

        .progress-20-60 .x-progress-text {
            color: #FE6100;
        }

        .progress-60-100 .x-progress-text {
            color: green;
        }

        .x-progress-default .x-progress-bar-default {
            background: transparent url(../imagenes/pbsample.png) repeat-x left center;
            height: 19px;
            -ms-border-radius: 6px;
            -moz-border-radius: 6px -ms-box-sizing: border-box;
            border-radius: 6px;
            -moz-box-sizing: border-box;
            -o-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        .label_CabDetTitulo {
            font-size: 1em;
            text-align: left;
        }

        .label_CabDetValor {
            font-size: 1em;
            /* font-weight: bold;*/
            border-bottom: 1px solid #191970;
            color: #0073c6;
            padding-bottom: 5px;
            margin: 0;
            text-align: center;
        }

        .custom .x-progress-bar {
            height: 18px;
            -ms-border-radius: 6px;
            -moz-border-radius: 6px -ms-box-sizing: border-box;
            border-radius: 6px;
            -moz-box-sizing: border-box;
            -o-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border: 1px solid #0073c6;
        }

        .icon-paste-large {
            background-image: url(../imagenes/pie_chart.png);
        }
    </style>

    <script>
        var tipRenderer = function (storeItem, item) {
            var total = 0;
            window.lmApp.Chart1.getStore().each(function (rec) {
                total += rec.get('Noterminales');
            });
            this.setTitle(storeItem.get('Descripcion') + ': ' + Math.round(storeItem.get('Noterminales') / total * 100) + '%');
        };
        
    </script>
</head>

<body>
    <ext:ResourceManager runat="server" ID="rm" DirectMethodNamespace="Coolite"
        ShowWarningOnAjaxFailure="true" Locale="es-MX" Namespace="lmApp" Theme="Gray">
        <Listeners>
            <DocumentReady Handler="App.AppReporteTerminales.init();" />
        </Listeners>
    </ext:ResourceManager>

    <ext:Viewport ID="viewport1" runat="server" Layout="FitLayout">
        <Items>
            <ext:Panel ID="Panel1" runat="server" Region="Center" Layout="FitLayout">
                <TopBar>
                    <ext:Toolbar runat="server" ID="Toolbar2" StyleSpec="background-color:white;" Height="85">
                        <Items>
                            <ext:FieldSet Border="True" ID="Container1" Layout="HBoxLayout" MarginSpec="0 5 5 5" Padding="4" Region="North" runat="server">
                                <Items>
                                    <ext:FieldSet ID="z_fldSet_Calendarios" runat="server" Title="" Height="50" Border="false" PaddingSpec="0 0 0 0">
                                        <Items>
                                            <ext:DateField Editable="False" EnableKeyEvents="true" FieldLabel="Fecha Inicial" Format="dd-MMMM-yyyy" ID="zdtnInicial" runat="server" Vtype="daterange" Width="240">
                                                <CustomConfig>
                                                    <ext:ConfigItem Name="endDateField" Value="zdtnFinal" Mode="Value" />
                                                </CustomConfig>
                                            </ext:DateField>
                                            <ext:DateField Editable="False" EnableKeyEvents="true" FieldLabel="Fecha Final" Format="dd-MMMM-yyyy" ID="zdtnFinal" runat="server" Vtype="daterange" Width="240">
                                                <CustomConfig>
                                                    <ext:ConfigItem Name="startDateField" Value="zdtnInicial" Mode="Value" />
                                                </CustomConfig>
                                            </ext:DateField>
                                        </Items>
                                    </ext:FieldSet>
                                    <ext:FieldSet Border="false" DefaultAnchor="100%" Height="50" ID="z_fldSet_Botones1" Layout="VBoxLayout" MarginSpec="0 0 0 15" PaddingSpec="0 0 0 0" runat="server">
                                        <Items>
                                            <ext:Button Icon="Find" IconAlign="Right" ID="z_btnBuscar" runat="server" Text="Buscar" Width="100">
                                                <Listeners>
                                                    <Click Handler="App.AppReporteTerminales.cargaDatos()" />
                                                </Listeners>
                                            </ext:Button>
                                            <ext:Button Icon="Reload" IconAlign="Left" ID="z_btnlimpiar" Margins="5 0 0 0" runat="server" Text="Reestablecer" Width="100">
                                                <Listeners>
                                                    <Click Handler="App.AppReporteTerminales.reiniciaForma();" />
                                                </Listeners>
                                            </ext:Button>
                                        </Items>
                                    </ext:FieldSet>
                                    <ext:FieldSet ID="zfldSet_Botones2" runat="server" Height="50" Layout="VBoxLayout" DefaultAnchor="100%" Border="false"
                                        MarginSpec="0 0 0 15" PaddingSpec="0 0 0 0">
                                        <Items>
                                            <ext:Button Disabled="True" Height="48" IconCls="icon-paste-large" ID="zbtn_SwitchGraficaGrid" Padding="5" runat="server" Scale="Large" Width="48">
                                                <Listeners>
                                                    <Click Handler="App.AppReporteTerminales.SwitchGraficaGrid();" />
                                                </Listeners>
                                            </ext:Button>
                                        </Items>
                                    </ext:FieldSet>
                                </Items>
                            </ext:FieldSet>
                        </Items>
                    </ext:Toolbar>
                </TopBar>
                <Items>
                    <ext:Panel AutoScroll="True" Header="False" Height="500" ID="zPnlGrafica" MaxHeight="550" Region="North" Resizable="false" runat="server" Hidden="true">
                        <TopBar>
                            <ext:Toolbar ID="Toolbar3" runat="server" ClassicButtonStyle="false">
                                <Items>
                                    <ext:FieldSet runat="server" Region="North" Padding="2" MarginSpec="2 2 2 2" Layout="HBoxLayout" Title="Datos Generales">
                                        <Items>
                                            <ext:FieldSet runat="server" Layout="VBoxLayout" Padding="1" Border="True" Width="500" MarginSpec="1 1 1 1">
                                                <Items>
                                                    <ext:FieldContainer runat="server" Layout="HBoxLayout" AnchorHorizontal="100%">
                                                        <Items>
                                                            <ext:Label runat="server" Text="Terminales Asignadas: " Cls="label_CabDetTitulo" />
                                                            <ext:Label runat="server" ID="lbl_OpTerminal1" Width="50" Text="-" Cls="label_CabDetValor" />
                                                            <ext:Label runat="server" Text="Total de Viajes: " Cls="label_CabDetTitulo" />
                                                            <ext:Label runat="server" ID="lbl_TotViajes1" Width="50" Text="-" Cls="label_CabDetValor" />
                                                            <ext:Label runat="server" Text="Terminales Utilizadas: " Cls="label_CabDetTitulo" />
                                                            <ext:Label runat="server" ID="lbl_TerUtilizada1" Width="50" Text="-" Cls="label_CabDetValor" />
                                                        </Items>
                                                    </ext:FieldContainer>
                                                    <ext:FieldContainer runat="server" Layout="HBoxLayout" AnchorHorizontal="100%">
                                                        <Items>
                                                            <ext:Label runat="server" Text="Total Entregas: " Cls="label_CabDetTitulo" />
                                                            <ext:Label runat="server" ID="lbl_TotEntregas1" Width="50" Text="-" Cls="label_CabDetValor" />
                                                            <ext:Label runat="server" Text="Total de Guías: " Cls="label_CabDetTitulo" />
                                                            <ext:Label runat="server" ID="lbl_Guias1" Width="50" Text="-" Cls="label_CabDetValor" />
                                                            <ext:Label runat="server" Text="Capturados: " Cls="label_CabDetTitulo" />
                                                            <ext:Label runat="server" ID="lbl_TotCaptura1" Width="50" Text="-" Cls="label_CabDetValor" />
                                                            <ext:Label runat="server" Text="Sin Captura: " Cls="label_CabDetTitulo" />
                                                            <ext:Label runat="server" ID="lbl_TotSinCap1" Width="50" Text="-" Cls="label_CabDetValor" />
                                                        </Items>
                                                    </ext:FieldContainer>
                                                </Items>
                                            </ext:FieldSet>
                                        </Items>
                                    </ext:FieldSet>
                                </Items>
                            </ext:Toolbar>
                        </TopBar>
                        <Items>
                            <ext:PolarChart ID="Chart1" runat="server" Shadow="true" Height="410" InsetPadding="20" InnerPadding="20">
                                <LegendConfig runat="server" Dock="Right" />
                                <Store>
                                    <ext:Store runat="server" AutoDataBind="true" ID="zStore_UsoTer">
                                        <Model>
                                            <ext:Model runat="server">
                                                <Fields>
                                                    <ext:ModelField Name="Descripcion" />
                                                    <ext:ModelField Name="Noterminales" />
                                                </Fields>
                                            </ext:Model>
                                        </Model>
                                    </ext:Store>
                                </Store>
                                <Interactions>
                                    <ext:ItemHighlightInteraction />
                                    <ext:RotateInteraction />
                                </Interactions>
                                <Series>
                                    <ext:PieSeries XField="Noterminales" Donut="5" Rotation="70" HighlightMargin="20" ShowInLegend="true" Colors="#B13A46,#A9BE3B,#FFDA65">
                                        <Label Field="Descripcion" Display="Rotate" FontSize="18" FontFamily="Arial" />
                                        <StyleSpec>
                                            <ext:Sprite Opacity="0.8" LineWidth="1" StrokeStyle="#fff" />
                                        </StyleSpec>
                                        <HighlightConfig>
                                            <ext:Sprite FillStyle="#48C9B0" />
                                        </HighlightConfig>
                                        <Tooltip runat="server" TrackMouse="true" Width="130" Height="23">
                                            <Renderer Fn="tipRenderer" />
                                        </Tooltip>
                                    </ext:PieSeries>
                                </Series>
                            </ext:PolarChart>
                        </Items>
                    </ext:Panel>
                    <ext:Panel AutoScroll="True" Header="False" Height="500" ID="zReporte" MaxHeight="550" Region="North" Resizable="false" runat="server" Hidden="true">
                        <TopBar>
                            <ext:Toolbar ID="Toolbar1" runat="server" ClassicButtonStyle="false">
                                <Items>
                                    <ext:FieldSet runat="server" Region="North" Padding="2" MarginSpec="2 2 2 2" Layout="HBoxLayout" Title="Datos Generales">
                                        <Items>
                                            <ext:FieldSet runat="server" Layout="VBoxLayout" Padding="1" Border="True" Width="500" MarginSpec="1 1 1 1">
                                                <Items>
                                                    <ext:FieldContainer runat="server" Layout="HBoxLayout" AnchorHorizontal="100%">
                                                        <Items>
                                                            <ext:Label runat="server" Text="Terminales Asignadas: " Cls="label_CabDetTitulo" />
                                                            <ext:Label runat="server" ID="lbl_OpTerminal" Width="50" Text="-" Cls="label_CabDetValor" />
                                                            <ext:Label runat="server" Text="Total de Viajes: " Cls="label_CabDetTitulo" />
                                                            <ext:Label runat="server" ID="lbl_TotViajes" Width="50" Text="-" Cls="label_CabDetValor" />
                                                            <ext:Label runat="server" Text="Terminales Utilizadas: " Cls="label_CabDetTitulo" />
                                                            <ext:Label runat="server" ID="lbl_TerUtilizada" Width="50" Text="-" Cls="label_CabDetValor" />
                                                        </Items>
                                                    </ext:FieldContainer>
                                                    <ext:FieldContainer runat="server" Layout="HBoxLayout" AnchorHorizontal="100%">
                                                        <Items>
                                                            <ext:Label runat="server" Text="Total Entregas: " Cls="label_CabDetTitulo" />
                                                            <ext:Label runat="server" ID="lbl_TotEntregas" Width="50" Text="-" Cls="label_CabDetValor" />
                                                            <ext:Label runat="server" Text="Total de Guías: " Cls="label_CabDetTitulo" />
                                                            <ext:Label runat="server" ID="lbl_Guias" Width="50" Text="-" Cls="label_CabDetValor" />
                                                            <ext:Label runat="server" Text="Capturados: " Cls="label_CabDetTitulo" />
                                                            <ext:Label runat="server" ID="lbl_TotCaptura" Width="50" Text="-" Cls="label_CabDetValor" />
                                                            <ext:Label runat="server" Text="Sin Captura: " Cls="label_CabDetTitulo" />
                                                            <ext:Label runat="server" ID="lbl_TotSinCap" Width="50" Text="-" Cls="label_CabDetValor" />
                                                        </Items>
                                                    </ext:FieldContainer>
                                                </Items>
                                            </ext:FieldSet>
                                        </Items>
                                    </ext:FieldSet>
                                </Items>
                            </ext:Toolbar>
                        </TopBar>
                        <Items>
                            <ext:GridPanel runat="server" ID="z_GrdPnl_Detalle" Region="Center" AutoScroll="True">
                                <Store>
                                    <ext:Store runat="server" ID="zStore_GridDetalle" RemoteSort="False">
                                        <Model>
                                            <ext:Model runat="server" ID="Model1">
                                                <Fields>
                                                    <ext:ModelField Name="FolioViaje" Type="String" />
                                                    <ext:ModelField Name="FechaMovimiento" Type="Date" />
                                                    <ext:ModelField Name="NumOperador" Type="Int" />
                                                    <ext:ModelField Name="NombreOp" Type="String" />
                                                    <ext:ModelField Name="Terminal" Type="String" />
                                                    <ext:ModelField Name="TotalEntregas" Type="Int" />
                                                    <ext:ModelField Name="TotalGuias" Type="Int" />
                                                    <ext:ModelField Name="CapturaOptica" Type="Int" />
                                                    <ext:ModelField Name="SinCaptura" Type="Int" />
                                                    <ext:ModelField Name="%_Uso" Type="Float" />
                                                    <ext:ModelField Name="%_NoUso" Type="Float" />
                                                </Fields>
                                            </ext:Model>
                                        </Model>
                                    </ext:Store>
                                </Store>
                                <ColumnModel>
                                    <Columns>
                                        <ext:RowNumbererColumn ID="RowNumbererColumn1" runat="server" Width="35" />
                                        <ext:Column ID="Column1" runat="server" DataIndex="FolioViaje" Text="Viaje" Width="90" Hidden="false" />
                                        <ext:DateColumn ID="DateColumn1" runat="server" DataIndex="FechaMovimiento" Text="Fecha Movimiento" Width="130" Format="dd/MMM/Y H:m:s" />
                                        <ext:Column ID="Column2" runat="server" DataIndex="NumOperador" Text="No.Operador" Width="90" />
                                        <ext:Column ID="Column3" runat="server" DataIndex="NombreOp" Text="Nombre Operador" Width="180" />
                                        <ext:Column ID="Column4" runat="server" DataIndex="Terminal" Text="No.Terminal" Width="80" />
                                        <ext:Column ID="Column5" runat="server" DataIndex="TotalEntregas" Text="Total Entregas" Width="90" />
                                        <ext:Column ID="Column6" runat="server" DataIndex="TotalGuias" Text="Total Guias" Width="80" />
                                        <ext:Column ID="Column7" runat="server" DataIndex="CapturaOptica" Text="Capturados" Width="80" />
                                        <ext:ProgressBarColumn runat="server" DataIndex="%_Uso" Text="Progress" />
                                        <ext:Column ID="Column8" runat="server" DataIndex="SinCaptura" Text="No Capturados" Width="80" />
                                        <ext:Column ID="Column9" runat="server" DataIndex="%_Uso" Text="% Uso" Width="80" Hidden="True" />
                                        <ext:Column ID="Column10" runat="server" DataIndex="%_NoUso" Text="% No Uso" Width="80" Hidden="true" />
                                    </Columns>
                                </ColumnModel>
                            </ext:GridPanel>
                        </Items>
                    </ext:Panel>
                    <ext:Panel AutoScroll="True" Header="False" Height="550" ID="zPnlGraficaOP" MaxHeight="550" Region="North" Resizable="false" runat="server" Hidden="true">
                        <Items>
                            <ext:CartesianChart ID="CarChart1" runat="server" Height="500" InsetPadding="50">
                                <Store>
                                    <ext:Store runat="server" ID="zStore_GcaOP" AutoDataBind="true">
                                        <Model>
                                            <ext:Model runat="server">
                                                <Fields>
                                                    <ext:ModelField Name="NumOperador" />
                                                    <ext:ModelField Name="Uso_Completo" />
                                                    <ext:ModelField Name="No_Utiliza" />
                                                    <ext:ModelField Name="Uso_Parcial" />
                                                    <ext:ModelField Name="total" />
                                                </Fields>
                                            </ext:Model>
                                        </Model>
                                    </ext:Store>
                                </Store>
                                <LegendConfig runat="server" Dock="Bottom" />
                                <Items>
                                    <ext:TextSprite Text="Entrega Electronica x Operador" FontSize="22" Width="100" Height="30" X="40" Y="20" />
                                </Items>
                                <Axes>
                                    <ext:NumericAxis Position="Left" AdjustByMajorUnit="true" Fields="Uso_Completo" Grid="true" Minimum="0">
                                        <Renderer Handler="return label.toFixed(label < 10 ? 1: 0) + '%';" />
                                    </ext:NumericAxis>
                                    <ext:CategoryAxis Position="Bottom" Fields="NumOperador" Grid="true">
                                        <Label RotationDegrees="-75" />
                                    </ext:CategoryAxis>
                                </Axes>
                                <Series>
                                    <ext:BarSeries XField="NumOperador" YField="No_Utiliza,Uso_Parcial,Uso_Completo"
                                        Stacked="true" Titles="No Utiliza,Uso Parcial,Uso Completo" Colors="#B13A46,#FFDA65,#A9BE3B">
                                        <StyleSpec>
                                            <ext:Sprite Opacity="0.8" />
                                        </StyleSpec>
                                        <HighlightConfig>
                                            <ext:Sprite FillStyle="#48C9B0" StrokeStyle="yellow" />
                                        </HighlightConfig>
                                        <Tooltip runat="server" StyleSpec="background: #fff; ">
                                            <Renderer Handler="var browser = item.series.getTitle()[Ext.Array.indexOf(item.series.getYField(), item.field)]; this.setHtml(browser + ' Oper:' + storeItem.get('NumOperador') + ', ' + storeItem.get(item.field) + '%, ' + ' Viajes Realizados: ' + storeItem.get('total'));" />
                                        </Tooltip>
                                       
                                    </ext:BarSeries>
                                </Series>
                               
                            </ext:CartesianChart>
                        </Items>
                    </ext:Panel>
                </Items>
            </ext:Panel>
        </Items>
    </ext:Viewport>
</body>
</html>
