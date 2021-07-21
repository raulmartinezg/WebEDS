<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DWHMensualEficienciaEntrega.aspx.cs" Inherits="Aspx_DWHMensualDeViajes" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Comparación Mensual de Viajes, Repotes y % de Volumen</title>
    <ext:XScript ID="XScript1" runat="server">
        <script src="../JS/Init/Init_Comun.js" ></script>
   </ext:XScript>

    <link rel="stylesheet" href="../CSS/Comun.css" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Language" content="es-MX" />
    <style type="text/css">
        .icon-paste-large {
            background-image: url(../imagenes/pie_chart.png);
        }
    </style>
</head>
<body>
    <ext:ResourceManager DirectMethodNamespace="Cool" ID="z_rsmEmbOpe" runat="server" Theme="Gray">
        <CustomDirectEvents>
            <ext:DirectEvent Target="z_btnBuscar" OnEvent="MostrarReporte">
                <ExtraParams>
                    <ext:Parameter Name="Param0" Value="#{z_dtnInicial}.getValue().toDateSQLRepServ()" Mode="Raw" />
                    <ext:Parameter Name="Param1" Value="#{z_dtnFinal}.getValue().toDateSQLRepServ()" Mode="Raw" />
                </ExtraParams>
            </ext:DirectEvent>
        </CustomDirectEvents>
    </ext:ResourceManager>
   <%-- <ext:ChartTheme ID="ChartTheme1" runat="server" ThemeName="CustomBlue">
        <Axis Stroke="#084594" />
        <AxisLabelLeft Fill="rgb(8,69,148)" Font="12px Arial" FontFamily="Arial" />
        <AxisLabelBottom Fill="rgb(8,69,148)" Font="12px Arial" FontFamily="Arial" />
        <AxisTitleLeft Font="bold 18px Arial" />
        <AxisTitleBottom Font="bold 18px Arial" />
    </ext:ChartTheme>--%>
    <ext:Viewport ID="viewport1" Layout="BorderLayout" runat="server">
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
                            </ext:Button>
                            <ext:Button Icon="Reload" IconAlign="Left" ID="z_btnlimpiar" Margins="5 0 0 0" runat="server" Text="Reestablecer" Width="100">
                                <Listeners>
                                    <Click Handler="z_UFN_Restablecer();" />
                                </Listeners>
                            </ext:Button>
                        </Items>
                    </ext:FieldSet>
                </Items>
            </ext:FieldSet>
            <ext:Panel ID="Panel1" runat="server" Region="Center" Layout="Fit" Header="False" Margin="0" Padding="0" AutoScroll="false">
            </ext:Panel>
        </Items>
    </ext:Viewport>
    <form id="form1" runat="server">
    </form>
</body>
</html>
