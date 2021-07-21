<%@ Page Language="C#" AutoEventWireup="true" CodeFile="OE_SmarthPhone.aspx.cs" Inherits="Cool.ASPX_OE_SmarthPhone" %>

<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>

<!DOCTYPE html>
<html lang="es-mx">
<head id="Head1" runat="server">
    <title>Sistema de reportes EDS</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Language" content="es-MX" />
    <link href="../Css/Comun.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="../CSS/Reportes.css" />
    <ext:ResourcePlaceHolder ID="rp" runat="server">
        <script src="../JS/Init/Init_Comun.js" type="text/javascript"></script>
        <script src="../Js/Obj/objExportaExcel.js" type="text/javascript"></script>
        <script src="../JS/Fn/Fn_OE_SmarthPhone.js" type="text/javascript"></script>
    </ext:ResourcePlaceHolder>
</head>
<body>
    <ext:ResourceManager ID="resourcemanager" runat="server" ShowWarningOnAjaxFailure="true" Theme="Gray"
        Locale="es-MX" DirectMethodNamespace="Cool" Namespace="eds">
        <Listeners>
            <DocumentReady Handler="incializaCalendariosRange(eds.z_dtnFechaInicial,eds.z_dtnFechaFinal);" />
        </Listeners>
    </ext:ResourceManager>
    <ext:Store ID="z_strOperadores" runat="server">
        <Model>
            <ext:Model runat="server">
                <Fields>
                    <ext:ModelField Name="ClaveOperador" />
                    <ext:ModelField Name="Nombre" />
                </Fields>
            </ext:Model>
        </Model>
        <Sorters>
            <ext:DataSorter Property="Nombre" Direction="ASC" />
        </Sorters>
        <%--<Sorters Field="Nombre" Direction="ASC" />--%>
        <%--<Sorters ModelField="Nombre" />--%>
    </ext:Store>
    <%--<ext:KeyMap ID="KeyMap2" runat="server" Target="={document.body}">
        <ext:KeyBinding StopEvent="true">
            <Keys>
                <ext:Key Code="ENTER" />
            </Keys>
            <Listeners>
                <Event Handler="buscar();conciliaControlesDateRange(eds.z_dtnFechaInicial,eds.z_dtnFechaFinal);" />
            </Listeners>
        </ext:KeyBinding>
    </ext:KeyMap>--%>
    <ext:Viewport ID="Viewport1" runat="server" Layout="Anchor">
        <Items>
            <ext:Panel ID="z_FldSet_Cabecero" runat="server" Title="Evaluación del uso de SmartPhone en Operación" Anchor="100% 0%" MinHeight="100"
                Flex="1" MarginSpec="3 3 3 3">
                <Items>
                    <ext:Container ID="Container1" runat="server" Layout="HBoxLayout" MarginSpec="0 0 0">
                        <Items>
                            <ext:FieldSet ID="FieldSet1" runat="server" Title="" Height="75" Border="false" PaddingSpec="0 0 0 0">
                                <Items>
                                    <ext:ComboBox ID="z_cbxOperador" runat="server" Width="250" StoreID="z_strOperadores" FieldLabel="Operador"
                                        ValueField="ClaveOperador" DisplayField="Nombre">
                                    </ext:ComboBox>
                                    <ext:TextField ID="z_txtFolioViaje" runat="server" Width="150" FieldLabel="Folio de Viaje"></ext:TextField>
                                </Items>
                            </ext:FieldSet>
                            <ext:FieldSet ID="FieldSet2" runat="server" Title="" Height="75" DefaultAnchor="100%" Border="false" PaddingSpec="0 0 0 0">
                                <Items>
                                    <ext:DateField ID="z_dtnFechaInicial" runat="server" FieldLabel="Fecha Inicial" Vtype="daterange"
                                        EnableKeyEvents="true" Format="dd-MMMM-yyyy" Width="240">
                                        <CustomConfig>
                                            <ext:ConfigItem Name="endDateField" Value="z_dtnFechaFinal" Mode="Value" />
                                        </CustomConfig>
                                        <Listeners>
                                            <KeyUp Fn="onKeyUp" />
                                        </Listeners>
                                    </ext:DateField>
                                    <ext:DateField ID="z_dtnFechaFinal" Format="dd-MMMM-yyyy" runat="server" FieldLabel="FechaFinal" Vtype="daterange"
                                        EnableKeyEvents="true" Width="240">
                                        <CustomConfig>
                                            <ext:ConfigItem Name="startDateField" Value="z_dtnFechaInicial" Mode="Value" />
                                        </CustomConfig>
                                        <Listeners>
                                            <KeyUp Fn="onKeyUp" />
                                        </Listeners>
                                    </ext:DateField>
                                </Items>
                            </ext:FieldSet>
                            <ext:FieldSet ID="FieldSet3" runat="server" Title="" Height="75" Layout="VBoxLayout" DefaultAnchor="100%" Border="false" MarginSpec="0 0 0 15" PaddingSpec="0 0 0 0">
                                <Items>
                                    <ext:Button ID="z_btnBuscar" runat="server" Width="100" Text="Buscar" Icon="Find" IconAlign="Left">
                                        <Listeners>
                                            <Click Handler="buscar();conciliaControlesDateRange(eds.z_dtnFechaInicial,eds.z_dtnFechaFinal);" />
                                        </Listeners>
                                    </ext:Button>
                                    <ext:Button ID="z_btnlimpiar" runat="server" Width="100" Text="Restablecer" Icon="Reload" IconAlign="Left" PaddingSpec="5 0 0 0">
                                        <Listeners>
                                            <Click Handler="limpiar()" />
                                        </Listeners>
                                    </ext:Button>
                                </Items>
                            </ext:FieldSet>
                        </Items>
                    </ext:Container>
                </Items>
            </ext:Panel>
            <ext:GridPanel ID="z_GrdPnl_Detalle" runat="server" Anchor="100% -103" AutoScroll="true" MarginSpec="3 3 3 3">
                <Store>
                    <ext:Store ID="z_strBusqueda" runat="server" >
                        <Model>
                            <ext:Model ID="Model1" runat="server">
                                <Fields>
                                    <ext:ModelField Name="ClaveFolioViaje" Type="Int" />
                                    <ext:ModelField Name="FolioViaje" Type="String" />
                                    <ext:ModelField Name="Nombre" Type="String" />
                                    <ext:ModelField Name="Fecha" Type="Date" />
                                    <ext:ModelField Name="EmbarquesSIDTUM" Type="Int" />
                                    <ext:ModelField Name="EmbarquesSIDMOVIL" Type="Int" />
                                    <ext:ModelField Name="EmbarquesPendientes" Type="Int" />
                                    <ext:ModelField Name="ArticulosSIDTUM" Type="Int" />
                                    <ext:ModelField Name="ArticulosSIDMOVIL" Type="Int" />
                                    <ext:ModelField Name="ArticulosPendientes" Type="Int" />
                                </Fields>
                            </ext:Model>
                        </Model>
                        <Sorters>
                            <ext:DataSorter Property="Nombre" Direction="ASC"></ext:DataSorter>
                        </Sorters>
                    </ext:Store>
                </Store>
                <TopBar>
                    <ext:Toolbar ID="barraarriba" runat="server">
                        <Items>
                            <ext:ToolbarFill ID="toolfill" runat="server" />
                            <ext:Button ID="z_btnExportar" runat="server" Width="120" Text="Exportar" Icon="PageExcel" IconAlign="Left">
                                <Listeners>
                                    <Click Handler="ExportaExcel();" />
                                </Listeners>
                            </ext:Button>
                        </Items>
                    </ext:Toolbar>
                </TopBar>
                <ColumnModel ID="ColumnModel1" runat="server">
                    <Columns>
                        <ext:RowNumbererColumn runat="server" ID="RowNumbererColumn1" Width="25" />
                        <ext:NumberColumn runat="server" DataIndex="ClaveFolioViaje" Text="Folio de Viaje" Hidden="true" />
                        <ext:Column runat="server" DataIndex="FolioViaje" Text="Folio Viaje" Width="80" Align="Center" />
                        <ext:Column runat="server" DataIndex="Nombre" Text="Operador" Width="220" Align="Left" />
                        <ext:DateColumn runat="server" DataIndex="Fecha" Text="Fecha" Width="200" Align="Center" Format="dd-MMMM-yyyy HH:mm:ss" />
                        <ext:NumberColumn runat="server" DataIndex="EmbarquesSIDTUM" Text="Embarques SIDTUM" Width="120" Align="Center" Format="0" />
                        <ext:NumberColumn runat="server" DataIndex="EmbarquesSIDMOVIL" Text="Embarques SIDMOVIL" Width="130" Align="Center" Format="0" />
                        <ext:NumberColumn runat="server" DataIndex="EmbarquesPendientes" Text="EmbarquesPendientes" Width="130" Align="Center" Format="0" />
                        <ext:NumberColumn runat="server" DataIndex="ArticulosSIDTUM" Text="Articulos SIDTUM" Width="100" Align="Center" Format="0" />
                        <ext:NumberColumn runat="server" DataIndex="ArticulosSIDMOVIL" Text="Articulos SIDMOVIL" Width="110" Align="Center" Format="0" />
                        <ext:NumberColumn runat="server" DataIndex="ArticulosPendientes" Text="Articulos Pendientes" Width="115" Align="Center" Format="0" />
                    </Columns>
                </ColumnModel>
                <View>
                    <ext:GridView ID="GridView1" runat="server" StripeRows="true" />
                </View>
            </ext:GridPanel>
        </Items>
    </ext:Viewport>
</body>
</html>
