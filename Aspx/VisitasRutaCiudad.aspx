<%@ Page Language="C#" AutoEventWireup="true" CodeFile="VisitasRutaCiudad.aspx.cs" Inherits="Cool.ASPX_RutasPorMes" %>

<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Número de veces realizada 1 ruta por mes.</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Language" content="es-MX" />
    <script src="../Js/Obj/objExportaExcel.js" type="text/javascript"></script>
    <script src="../JS/Init/Init_Comun.js" type="text/javascript"></script>
    <script src="../JS/Fn/Fn_VisitasRutaCiudad.js" type="text/javascript"></script>
    <link href="../Css/Comun.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="../CSS/Reportes.css" />
</head>
<body>
    <ext:ResourceManager ID="z_rsmRutasporMes" runat="server" ShowWarningOnAjaxFailure="true" Theme="Gray" Locale="es-MX"
        DirectMethodNamespace="Cool" Namespace="eds">
        <Listeners>
            <DocumentReady Handler="incializaCalendariosRange(eds.z_dtnInicial,eds.z_dtnFinal);" />
        </Listeners>
    </ext:ResourceManager>
    <ext:Store ID="z_strConsultaRutasxMes" runat="server">
        <Model>
            <ext:Model runat="server">
                <Fields>
                    <ext:ModelField Name="ClaveRuta" Type="Int" />
                    <ext:ModelField Name="Ruta" Type="String" />
                    <ext:ModelField Name="Secuencia" Type="Int" />
                    <ext:ModelField Name="Ciudad" Type="String" />
                    <ext:ModelField Name="Oct2011" Type="Int" />
                    <ext:ModelField Name="Nov2011" Type="Int" />
                    <ext:ModelField Name="Dic2011" Type="Int" />
                    <ext:ModelField Name="Ene2012" Type="Int" />
                    <ext:ModelField Name="Feb2012" Type="Int" />
                    <ext:ModelField Name="Mar2012" Type="Int" />
                    <ext:ModelField Name="Abr2012" Type="Int" />
                    <ext:ModelField Name="May2012" Type="Int" />
                    <ext:ModelField Name="Jun2012" Type="Int" />
                    <ext:ModelField Name="Jul2012" Type="Int" />
                    <ext:ModelField Name="Ago2012" Type="Int" />
                </Fields>

            </ext:Model>
        </Model>
    </ext:Store>
    <ext:Viewport ID="z_viewport1" runat="server" Layout="AnchorLayout">
        <Items>
            <ext:Panel ID="z_pnlbusqueda" runat="server" Title="Busqueda Avanzada" Anchor="100% 0%" MinHeight="100"
                Flex="1" MarginSpec="3 3 3 3">
                <Items>
                    <ext:Container ID="container1" runat="server" Layout="HBoxLayout" MarginSpec="0 0 0">
                        <Items>
                            <ext:FieldSet ID="z_fldset1" runat="server" Title="" Height="75" Border="false" PaddingSpec="0 0 0 0">
                                <Items>
                                    <ext:DateField ID="z_dtnInicial" runat="server" FieldLabel="Fecha Inicial" Width="240" Vtype="daterange">
                                        <CustomConfig>
                                            <ext:ConfigItem Name="endDateField" Value="z_dtnFinal" Mode="Value" />
                                        </CustomConfig>
                                        <Listeners>
                                            <KeyUp Fn="onKeyUp" />
                                        </Listeners>
                                    </ext:DateField>
                                    <ext:DateField ID="z_dtnFinal" runat="server" FieldLabel="Fecha Final" Width="240" Vtype="daterange">
                                        <CustomConfig>
                                            <ext:ConfigItem Name="startDateField" Value="z_dtnInicial" Mode="Value" />
                                        </CustomConfig>
                                        <Listeners>
                                            <KeyUp Fn="onKeyUp" />
                                        </Listeners>
                                    </ext:DateField>
                                </Items>
                            </ext:FieldSet>
                            <ext:FieldSet ID="z_fldset2" runat="server" Title="" Height="75" Layout="VBoxLayout" DefaultAnchor="100%" Border="false"
                                MarginSpec="0 0 0 15" PaddingSpec="0 0 0 0">
                                <Items>
                                    <ext:Button ID="z_btnBuscar" runat="server" Text="Buscar" Icon="Find" IconAlign="Left">
                                        <Listeners>
                                            <Click Handler="conciliaControlesDateRange(eds.z_dtnInicial,eds.z_dtnFinal);buscar();" />
                                        </Listeners>
                                    </ext:Button>
                                    <ext:Button ID="z_btnRefrescar" runat="server" Text="Reestablecer" Icon="Reload" IconAlign="Left">
                                        <Listeners>
                                            <Click Handler="limpiar();incializaCalendariosRange(eds.z_dtnInicial,eds.z_dtnFinal);" />
                                        </Listeners>
                                    </ext:Button>
                                </Items>
                            </ext:FieldSet>
                        </Items>
                    </ext:Container>
                </Items>
            </ext:Panel>
            <ext:GridPanel ID="z_GrdPnl_Detalle" runat="server" StoreID="z_strConsultaRutasxMes" Anchor="100% -103" AutoScroll="true" MarginSpec="3 3 3 3">
                <TopBar>
                    <ext:Toolbar ID="z_tbrArriba" runat="server">
                        <Items>
                            <ext:ToolbarFill ID="z_tbfuno" runat="server"></ext:ToolbarFill>
                            <ext:Button ID="z_btnExportar" runat="server" Text="Exportar" Icon="PageExcel" IconAlign="Left">
                                <Listeners>
                                    <Click Handler="ExportaExcel()"></Click>
                                </Listeners>
                            </ext:Button>
                        </Items>
                    </ext:Toolbar>
                </TopBar>
                <ColumnModel>
                    <Columns>
                        <ext:NumberColumn runat="server" DataIndex="ClaveRuta" Text="ClaveRuta" Format="0" Align="Center" Width="70" />
                        <ext:Column runat="server" DataIndex="Ruta" Text="Ruta" Align="Left" Width="230" />
                        <ext:NumberColumn runat="server" DataIndex="Secuencia" Text="Secuencia" Format="0" Align="Center" Width="70" />
                        <ext:Column runat="server" DataIndex="Ciudad" Text="Ciudad" Align="Left" Width="240" />
                        <ext:NumberColumn runat="server" DataIndex="Oct2011" Text="Oct2011" Format="0" Align="Center" Width="70" />
                        <ext:NumberColumn runat="server" DataIndex="Nov2011" Text="Nov2011" Format="0" Align="Center" Width="70" />
                        <ext:NumberColumn runat="server" DataIndex="Dic2011" Text="Dic2011" Format="0" Align="Center" Width="70" />
                        <ext:NumberColumn runat="server" DataIndex="Ene2012" Text="Ene2012" Format="0" Align="Center" Width="70" />
                        <ext:NumberColumn runat="server" DataIndex="Feb2012" Text="Feb2012" Format="0" Align="Center" Width="70" />
                        <ext:NumberColumn runat="server" DataIndex="Mar2012" Text="Mar2012" Format="0" Align="Center" Width="70" />
                        <ext:NumberColumn runat="server" DataIndex="Abr2012" Text="Abr2012" Format="0" Align="Center" Width="70" />
                        <ext:NumberColumn runat="server" DataIndex="May2012" Text="May2012" Format="0" Align="Center" Width="70" />
                        <ext:NumberColumn runat="server" DataIndex="Jun2012" Text="Jun2012" Format="0" Align="Center" Width="70" />
                        <ext:NumberColumn runat="server" DataIndex="Jul2012" Text="Jul2012" Format="0" Align="Center" Weight="70" />
                        <ext:NumberColumn runat="server" DataIndex="Ago2012" Text="Ago2012" Format="0" Align="Center" Weight="70" />
                    </Columns>
                </ColumnModel>
            </ext:GridPanel>
        </Items>
    </ext:Viewport>
</body>
</html>
