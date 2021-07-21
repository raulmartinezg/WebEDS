<%@ Page Language="C#" AutoEventWireup="true" CodeFile="KilometrosOperador.aspx.cs" Inherits="Cool.Aspx_KilometrosOperador" %>

<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>

<!DOCTYPE html>
<html lang="es-mx">
<head id="Head1" runat="server">
    <title>Kilometros por Operador</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Language" content="es-MX" />
    <link href="../Css/Comun.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="../CSS/Reportes.css" />
    <ext:ResourcePlaceHolder ID="rp" runat="server">
        <script src="../JS/Init/Init_Comun.js" type="text/javascript"></script>
        <script src="../Js/Obj/objExportaExcel.js" type="text/javascript"></script>
        <script src="../Js/Fn/Fn_KilometrosOperador.js" type="text/javascript"></script>
    </ext:ResourcePlaceHolder>
</head>
<body>

    <ext:ResourceManager ID="resourcemanager" runat="server" ShowWarningOnAjaxFailure="true" Theme="Gray"
        Locale="es-MX" DirectMethodNamespace="Cool" Namespace="eds">
        <Listeners>
            <DocumentReady Handler="incializaCalendariosRange(eds.z_dtnInicio,eds.z_dtnFin);" />
        </Listeners>
    </ext:ResourceManager>

    <ext:Store ID="z_strBusqueda" runat="server">
        <Model>
            <ext:Model ID="Model1" runat="server">
                <Fields>
                    <ext:ModelField Name="NumeroOperador" Type="Int" />
                    <ext:ModelField Name="Operador" Type="String" />
                    <ext:ModelField Name="Operacion" Type="String" />
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
        <Sorters>
            <ext:DataSorter Property="Operador" Direction="ASC"></ext:DataSorter>
            <ext:DataSorter Property="Operacion" Direction="ASC"></ext:DataSorter>
        </Sorters>
    </ext:Store>

   <%-- <ext:KeyMap ID="KeyMap2" runat="server" Target="={document.body}">
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
            <ext:Panel ID="z_FldSet_Cabecero" runat="server" Title="Búsqueda Avanzada" Anchor="100% 0%" MinHeight="100"
                Flex="1" MarginSpec="3 3 3 3">
                <Items>
                    <ext:Container ID="Container1" runat="server" Layout="HBoxLayout" MarginSpec="0 0 0">
                        <Items>
                            <ext:FieldSet ID="FieldSet1" runat="server" Title="" Height="75" Border="false" PaddingSpec="0 0 0 0">
                                <Items>
                                    <ext:DateField ID="z_dtnInicio" runat="server" FieldLabel="Fecha Inicial" Vtype="daterange"
                                        EnableKeyEvents="true" Format="dd-MMMM-yyyy" Width="240">
                                        <CustomConfig>
                                            <ext:ConfigItem Name="endDateField" Value="z_dtnFin" Mode="Value" />
                                        </CustomConfig>
                                        <Listeners>
                                            <KeyUp Fn="onKeyUp" />
                                        </Listeners>
                                    </ext:DateField>
                                    <ext:DateField ID="z_dtnFin" runat="server" FieldLabel="Fecha Final" Vtype="daterange"
                                        EnableKeyEvents="true" Format="dd-MMMM-yyyy" Width="240">
                                        <CustomConfig>
                                            <ext:ConfigItem Name="startDateField" Value="z_dtnInicio" Mode="Value" />
                                        </CustomConfig>
                                        <Listeners>
                                            <KeyUp Fn="onKeyUp" />
                                        </Listeners>
                                    </ext:DateField>
                                </Items>
                            </ext:FieldSet>
                            <ext:FieldSet ID="FieldSet2" runat="server" Title="" Height="75" Layout="VBoxLayout" DefaultAnchor="100%"
                                Border="false" MarginSpec="0 0 0 15" PaddingSpec="0 0 0 0">
                                <Items>

                                    <ext:Button ID="z_btnBuscar" runat="server" Text="Buscar" Icon="Find" IconAlign="Left">
                                        <Listeners>
                                            <Click Handler="conciliaControlesDateRange(eds.z_dtnInicio,eds.z_dtnFin);buscar();" />
                                        </Listeners>
                                    </ext:Button>

                                    <ext:Button ID="z_btnReestablecer" runat="server" Text="Reestablecer" Icon="Reload" IconAlign="Left">
                                        <Listeners>
                                            <Click Handler="limpiar();incializaCalendariosRange(eds.z_dtnInicio,eds.z_dtnFin);" />
                                        </Listeners>
                                    </ext:Button>

                                </Items>
                            </ext:FieldSet>
                        </Items>
                    </ext:Container>
                </Items>
            </ext:Panel>
            <ext:GridPanel ID="z_GrdPnl_Detalle" runat="server" Anchor="100% -103" AutoScroll="true" MarginSpec="3 3 3 3" StoreID="z_strBusqueda">
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
                        <ext:NumberColumn runat="server" DataIndex="NumeroOperador" Text="Número Operdor" Format="0" Width="100" Align="Center"/>
                        <ext:Column runat="server" DataIndex="Operador" Text="Operador" Width="250" Align="Center" />
                        <ext:Column runat="server" DataIndex="Operacion" Text="Operación" Width="130" Align="Center" />
                        <ext:NumberColumn runat="server" DataIndex="Oct2011" Text="Oct2011" Width="70" Align="Center" Format="0" />
                        <ext:NumberColumn runat="server" DataIndex="Nov2011" Text="Nov2011" Width="70" Align="Center" Format="0" />
                        <ext:NumberColumn runat="server" DataIndex="Dic2011" Text="Dic2011" Width="70" Align="Center" Format="0" />
                        <ext:NumberColumn runat="server" DataIndex="Ene2012" Text="Ene2012" Width="70" Align="Center" Format="0" />
                        <ext:NumberColumn runat="server" DataIndex="Feb2012" Text="Feb2012" Width="70" Align="Center" Format="0" />
                        <ext:NumberColumn runat="server" DataIndex="Mar2012" Text="Mar2012" Width="70" Align="Center" Format="0" />
                        <ext:NumberColumn runat="server" DataIndex="Abr2012" Text="Abr2012" Width="70" Align="Center" Format="0" />
                        <ext:NumberColumn runat="server" DataIndex="May2012" Text="May2012" Width="70" Align="Center" Format="0" />
                        <ext:NumberColumn runat="server" DataIndex="Jun2012" Text="Jun2012" Width="70" Align="Center" Format="0" />
                        <ext:NumberColumn runat="server" DataIndex="Jul2012" Text="Jul2012" Width="70" Align="Center" Format="0" />
                        <ext:NumberColumn runat="server" DataIndex="Ago2012" Text="Ago2012" Width="70" Align="Center" Format="0" />
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
